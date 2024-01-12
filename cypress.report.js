const report = require("multiple-cucumber-html-reporter");
const dayjs = require("dayjs");
const fs = require("fs");

const data = fs.readFileSync("cypress/reports/results.json", {
  encoding: "utf8",
  flag: "r",
});
const env = fs.readFileSync("./cypress.env.json", {
  encoding: "utf8",
  flag: "r",
});
const runInfo = JSON.parse(data);
const envInfo = JSON.parse(env);

const osName = () => {
  switch (runInfo["osName"]) {
    case "darwin":
      return "osx";
    case "win32":
      return "windows";
    case "ubuntu":
      return "ubuntu";
    default:
      console.log("Undefined browser");
  }
};

report.generate({
  jsonDir: "cypress/reports/json",
  reportPath: "cypress/reports",
  metadata: {
    browser: {
      name: runInfo["browserName"],
      version: runInfo["browserVersion"],
    },
    device: "osca39848",
    platform: {
      name: osName(),
      version: runInfo["osVersion"],
    },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "OSCA SMC" },
      { label: "Env", value: envInfo["host"] },
      { label: "Cypress Version", value: runInfo["cypressVersion"] },
      { label: "Node Version", value: runInfo["nodeVersion"] },
      {
        label: "Execution Start Time",
        value: dayjs(runInfo["startedTestsAt"]).format(
          "YYYY-MM-DD HH:mm:ss.SSS"
        ),
      },
      {
        label: "Execution End Time",
        value: dayjs(runInfo["endedTestsAt"]).format("YYYY-MM-DD HH:mm:ss.SSS"),
      },
    ],
  },
  disableLog: true,
  pageTitle: "OSCA SMC Automation Testing",
  openReportInBrowser: false,
  displayDuration: true,
});
