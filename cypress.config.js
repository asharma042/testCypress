const { defineConfig } = require("cypress");
const xlsx = require("xlsx");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
  beforeRunHandler,
  afterRunHandler,
} = require("@badeball/cypress-cucumber-preprocessor");

const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const fs = require("fs");
const os = require("os");

const path = require("path");

const { install } = require("@neuralegion/cypress-har-generator");

const oracledb = require("oracledb");

const OracleService = require("./cypress/scripts/oracleService");

oracledb.initOracleClient({
  libDir: "C:\\cypress\\oracle\\instantclient_21_6",
});

//Start w/ fresh empty json
const jsonHandlerFileName = "cypress\\temp\\jsonHandler.json";

const pdf = require("pdf-parse");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      install(on);

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config, {
        omitBeforeRunHandler: true,
        omitAfterRunHandler: true,
      });

      emptyDir = function (dirPath, extension) {
        const dirContents = fs.readdirSync(dirPath); // List dir content

        for (const fileOrDirPath of dirContents) {
          try {
            // Get Full path
            const fullPath = path.join(dirPath, fileOrDirPath);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
              // It's a sub directory
              if (fs.readdirSync(fullPath).length)
                emptyDir(fullPath, extension);
              // If the dir is not empty then remove it's contents too(recursively)
              fs.rmdirSync(fullPath);
            } else {
              if (fullPath.endsWith(extension)) {
                fs.unlinkSync(fullPath);
              }
            }
          } catch (ex) {
            console.error(ex.message);
          }
        }
      };

      on("before:run", async () => {
        await beforeRunHandler(config);
        var folder = "./cypress/hars";
        emptyDir(folder, "har");
        if (fs.existsSync(jsonHandlerFileName)) {
          fs.unlinkSync(jsonHandlerFileName);
        }
      });

      on("after:run", async (results) => {
        if (results) {
          await afterRunHandler(config);
          fs.writeFileSync(
            "cypress/reports/results.json",
            JSON.stringify(
              {
                browserName: results.browserName,
                browserVersion: results.browserVersion,
                osName: results.osName,
                osVersion: results.osVersion,
                nodeVersion: results.config.resolvedNodeVersion,
                cypressVersion: results.cypressVersion,
                startedTestsAt: results.startedTestsAt,
                endedTestsAt: results.endedTestsAt,
              },
              null,
              "\t"
            )
          );
        }
      });

      on("task", {
        hostName() {
          return os.hostname();
        },

        deleteFilesInFolder(obj) {
          let folder = obj.dirName;
          let ext = obj.extension;
          emptyDir(folder, ext);
          return null;
        },

        /**
         * Expect obj to be formed like
      {
        pdfFileName: this.pdfFileName,
        caseId: $case.caseId,
        judgeName: judgeName,
      }
         * @param {} obj
         */
        validateDoc(obj) {
          const WordExtractor = require("word-extractor");
          const extractor = new WordExtractor();

          let fullPath = `${process.cwd()}/${obj.fileName}`;
          const extracted = extractor.extract(fullPath);

          try {
            return extracted.then(function (doc) {
              let text = doc.getBody();
              //Get the keys but ignore pdfFileName
              let keys = Object.keys(obj).filter((key) => key !== "fileName");

              let response = {};

              for (let key = 0; key < keys.length; key++) {
                let keyName = keys[key];
                let value = obj[keyName];
                let result = text.includes(value);
                response[keyName] = { value, result };
              }
              return response;
            });
          } catch (e) {
            console.log(`error validateDoc ${e.message}`);
            return e;
          }
        },
        /**
         * Expect obj to be formed like
      {
        pdfFileName: this.pdfFileName,
        caseId: $case.caseId,
        judgeName: judgeName,
      }
         * @param {} obj
         */
        validatePDF(obj) {
          try {
            let dataBuffer = fs.readFileSync(obj.pdfFileName);

            return pdf(dataBuffer).then(function ($pdf) {
              //Get the keys but ignore pdfFileName
              let keys = Object.keys(obj).filter(
                (key) => key !== "pdfFileName"
              );

              let response = {};

              for (let key = 0; key < keys.length; key++) {
                let keyName = keys[key];
                let value = obj[keyName];
                let result = $pdf.text.includes(value);
                response[keyName] = { value, result };
              }
              return response;
            });
          } catch (e) {
            console.log(`error validatePDF ${e.message}`);
            return e;
          }
        },
        /**
         *
         * @param {*} obj - {directory: "foo", extension: "foo"}
         * @returns
         */
        readFirstFileInDir(obj) {
          let filenames = fs.readdirSync(obj.dirName);
          for (let i = 0; i < filenames.length; i++) {
            if (filenames[i].endsWith(obj.extension)) {
              return `${obj.dirName}/${filenames[i]}`;
            }
          }
          return null;
        },

        deleteCase(caseId) {
          return (async function (caseId) {
            let oracleService = new OracleService(false);
            return await oracleService.deleteCase(caseId);
          })(caseId);
        },

        deleteCaseTypeDocketCodes() {
          return (async function () {
            let oracleService = new OracleService(false);
            return await oracleService.deleteCaseTypeDocketCodes();
          })();
        },

        setupOfficers() {
          return (async function () {
            let oracleService = new OracleService(false);
            return await oracleService.setupOfficers();
          })();
        },

        deleteOfficers() {
          return (async function () {
            let oracleService = new OracleService(false);
            return await oracleService.deleteOfficers();
          })();
        },

        getJsonHandlerFile() {
          if (!fs.existsSync(jsonHandlerFileName)) {
            fs.writeFileSync(jsonHandlerFileName, JSON.stringify({}, null, 2));
          }
          return JSON.parse(fs.readFileSync(jsonHandlerFileName, "utf8"));
        },

        writeJsonHandlerFile(json) {
          fs.writeFileSync(jsonHandlerFileName, JSON.stringify(json, null, 2));
          return true;
        },

        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            if (filename.endsWith(".json")) {
              return JSON.parse(fs.readFileSync(filename, "utf8"));
            }
            return fs.readFileSync(filename, "utf8");
          }
          return null;
        },

        writeFile(obj) {
          fs.writeFileSync(obj.fileName, obj.text);
          return true;
        },

        appendToFile(obj) {
          fs.appendFileSync(obj.fileName, obj.line);
          return true;
        },

        deleteFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
          return null;
        },

        createHarsDirectories(harsPath) {
          try {
            fs.mkdirSync(harsPath, { recursive: true });
          } catch (e) {
            throw e;
          } finally {
            return null;
          }
        },

        runCurlCommand(obj) {
          const outputFile = obj.outputFile;
          const remoteURL = obj.remoteURL;
          const cmd = `curl -o ${process.cwd()}${outputFile} ${remoteURL}`;
          require("child_process").execSync(cmd);
          return null;
        },
      });

      return config;
    },
    experimentalInteractiveRunEvents: true,
    specPattern: "cypress/integration/**/*.feature",
    supportFile: "cypress/support/index.js",
    watchForFileChanges: false,
    numTestsKeptInMemory: 0,
    defaultCommandTimeout: 30000,
    execTimeout: 30000,
    taskTimeout: 30000,
    pageLoadTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    video: false,
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      runMode: 2,
      // Configure retry attempts for `cypress open`
      // Default is 0
      openMode: 0,
    },
  },
});
