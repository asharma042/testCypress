const { exec } = require("child_process");
var qjobs = new require("qjobs");
const { str2ab, decryptData } = require("../support/smcCryptoDecrypt");
const oracledb = require("oracledb");
const fs = require("fs");
const ShellCommand = require("./ShellCommand");

class OracleService {
  constructor(initOracle) {
    if (initOracle) {
      oracledb.initOracleClient({
        libDir: "C:\\cypress\\oracle\\instantclient_21_6",
      });
    }
    this.shellCommand = new ShellCommand();
  }

  async execShellCommand(cmd) {
    return await new ShellCommand().execShellCommand(cmd);
  }

  readFile(filename) {
    if (fs.existsSync(filename)) {
      if (filename.endsWith(".json")) {
        return JSON.parse(fs.readFileSync(filename, "utf8"));
      }
      throw `${filename} not found`;
    }
  }
  async deleteCase(caseId) {
    let connection;
    let bindParams = {};
    let options = { autoCommit: true };

    let fileName = `cypress.env.json`;
    let obj = this.readFile(fileName);
    let db = obj.db;

    if (db.hasOwnProperty("secure")) {
      const ab = str2ab(db.secure);
      db.password = JSON.parse(await decryptData(ab))["password"];
    }

    process.env["TNS_ADMIN"] = "c:/cypress/oracle";

    try {
      let query = `select cdbcase_id, cdbcase_locn_code from cdbcase where cdbcase_id = '${caseId}'`;

      connection = await oracledb.getConnection({
        user: db.username,
        password: db.password,
        connectString: db.host,
      });

      let results = await connection.execute(query, bindParams, options);
      if (results.rows.length === 0) {
        return null;
      }
      let locationCode = results.rows[0][1];
      let cmd = `.\\cypress\\scripts\\bothScripts.bat ${db.username} ${
        db.password
      } ${db.host} ${locationCode} ${caseId} ${caseId.replace("-", "")}`;

      await this.execShellCommand(cmd);
    } catch (err) {
      console.log(`err: ${err.message}`);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.log(`error close SQL: ${err.message}`);
        }
      }
      return null;
    }
  }

  async runQueries(query, obj) {
    let connection;
    let options = { autoCommit: true };

    let db = obj.db;

    if (db.hasOwnProperty("secure")) {
      const ab = str2ab(db.secure);
      db.password = JSON.parse(await decryptData(ab))["password"];
    }

    process.env["TNS_ADMIN"] = "c:/cypress/oracle";

    try {
      connection = await oracledb.getConnection({
        user: db.username,
        password: db.password,
        connectString: db.host,
      });

      return await connection.execute(query, {}, options);
    } catch (err) {
      console.log(`err: ${err.message}`);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.log(`error close SQL: ${err.message}`);
        }
      }
    }
  }

  async deleteCaseTypeDocketCodes() {
    let fileName = `cypress.env.json`;
    let obj = this.readFile(fileName);
    let query = `DELETE from DBSMC.CTYP_DTYP_PROCESS_RULES WHERE USER_ID = '${obj.smc.username}'`;

    return await this.runQueries(query, obj);
  }

  async setupOfficers() {
    let fileName = `cypress.env.json`;
    let obj = this.readFile(fileName);

    let officerObj = this.readFile("cypress\\temp\\officerSetup.json");
    if (officerObj == null || officerObj.officer == undefined) {
      officerObj = {
        officer: {
          courtCode: "CA",
          lastName: "MORALES_",
          firstName: "DAVIS_",
          badgeNum: "CYPRESS_",
          groupNum: "00",
        },
      };
      fs.writeFile(
        "cypress\\temp\\officerSetup.json",
        JSON.stringify({
          officer: officerObj.officer,
        })
      );
    }
    let arrestingAgencyArr = [100761, 100295];

    let returnData = [];
    for (let row = 0; row < 2; row++) {
      let query = `insert into DBSMC.OFFICER_SETUP 
        (LOCATION_CODE,ARREST_AGENCY_PIDM,OFCR_LAST_NAME,OFCR_FIRST_NAME,OFCR_BADGE,GROUP_NUM,USER_ID) values (
          '${officerObj.officer.courtCode}',
           ${arrestingAgencyArr[row]},
          '${officerObj.officer.lastName}${row}',
          '${officerObj.officer.firstName}${row}',
          '${officerObj.officer.badgeNum}${row}',
          '${officerObj.officer.groupNum}${row}',
          '${obj.smc.username}'
        )`;

      returnData[row] = await this.runQueries(query, obj);
    }

    return returnData;
  }

  async deleteOfficers() {
    let fileName = `cypress.env.json`;
    let obj = this.readFile(fileName);
    let query = `DELETE from DBSMC.OFFICER_SETUP where USER_ID = '${obj.smc.username}'`;

    return await this.runQueries(query, obj);
  }

  readAllAccounts(env) {
    let machines = ["39", "40", "47", "48"];
    let users = [];
    for (let machine = 0; machine < machines.length; machine++) {
      let fileName = `accounts\\${env}\\cypress.env.oscas00${machines[machine]}.json`;
      let obj = this.readFile(fileName);
      if (!users.includes[obj.smc.username]) {
        users.push(obj.smc.username);
      }
    }

    return users;
  }
  async deleteAllCases(env) {
    if (!env) {
      throw new Error("env is required");
    }
    let users = this.readAllAccounts(env);
    let connection;
    let bindParams = {};
    let options = { autoCommit: true };
    let fileName = `cypress.env.${env}.json`;
    let obj = this.readFile(fileName);
    if (!users.includes(obj.smc.username)) {
      users.push(obj.smc.username);
    }
    //all the usernames to search for
    let userNames = "";
    for (let user = 0; user < users.length; user++) {
      if (user > 0) {
        userNames += ",";
      }
      userNames += `'${users[user]}'`;
    }

    let db = obj.db;

    if (db.hasOwnProperty("secure")) {
      const ab = str2ab(db.secure);
      db.password = JSON.parse(await decryptData(ab))["password"];
    }

    var myjob = function (args, next) {
      (async function (
        execShellCommand,
        userName,
        password,
        connect,
        env,
        caseId
      ) {
        await execShellCommand(
          `.\\cypress\\scripts\\bothScripts.bat ${userName} ${password} ${connect}  ${env} ${caseId} ${caseId.replace(
            "-",
            ""
          )}`
        );
      })(args[0], args[1], args[2], args[3], args[4], args[5]).then(() => {
        next();
      });
    };

    var queueJobs = new qjobs({ maxConcurrency: 25 });
    process.env["TNS_ADMIN"] = "c:/cypress/oracle";

    try {
      let query = `select cdbcase_id, cdbcase_locn_code from cdbcase where CDBCASE_USER_ID in (${userNames}) and CDBCASE_ACTIVITY_DATE < (CURRENT_DATE -1) ORDER BY CDBCASE_ACTIVITY_DATE ASC`;

      connection = await oracledb.getConnection({
        user: db.username,
        password: db.password,
        connectString: db.host,
      });

      let results = await connection.execute(query, bindParams, options);
      if (results.rows.length === 0) {
        process.exit(0);
      }

      for (let i = 0; i < results.rows.length; i++) {
        let caseId = results.rows[i][0];
        let locationCode = results.rows[i][1];
        queueJobs.add(myjob, [
          this.execShellCommand,
          db.username,
          db.password,
          db.host,
          locationCode,
          caseId,
        ]);
      }

      // I want to know when the first job has started
      queueJobs.on("start", function () {
        console.log("starting ...");
        console.log(JSON.stringify(queueJobs.stats()));
      });

      // I want to know when the last job has ended
      queueJobs.on("end", function () {
        clearInterval(statId);
        console.log("end");
        console.log(JSON.stringify(queueJobs.stats()));
      });

      // I want to know when each job has started
      queueJobs.on("jobStart", function (args) {
        console.log("jobStart", args);
      });

      // I want to know when each job has ended
      queueJobs.on("jobEnd", function (args) {
        console.log("jobEnd", args);
      });

      queueJobs.run();

      var statId = setInterval(function () {
        console.log(JSON.stringify(queueJobs.stats()));
      }, 1000);
    } catch (err) {
      console.log(`err: ${err.message}`);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.log(`error close SQL: ${err.message}`);
        }
      }
    }
  }
}
module.exports = OracleService;
