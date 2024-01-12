const OracleService = require(".\\oracleService");

let oracleService = new OracleService(true);

oracleService.deleteAllCases(process.argv[2]);
