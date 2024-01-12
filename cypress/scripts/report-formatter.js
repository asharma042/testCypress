const Formatter = require("cucumber-json-report-formatter").Formatter;

const formatter = new Formatter();
const sourceFile = "./cypress/cucumber-json/messages.ndjson";
const outputFile = "./cypress/cucumber-json/cucumber-report.json";

formatter.parseCucumberJson(sourceFile, outputFile);
