/// <reference types="cypress" />
import Utils from "../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CaseNetEFilingActions from "./CaseNetEFilingActions";
const caseNetEFilingActions = new CaseNetEFilingActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseNet/caseNetEFiling/caseNetEFilingFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "caseNetEFiling";
        cy.wrap(id).as("id");
        if ($jsonHandlerFile[id] === undefined) {
          $jsonHandlerFile[id] = dataFixture;
          cy.task("writeJsonHandlerFile", $jsonHandlerFile);
        }
      });
    }
  );
  cy.recordHar({ content: false });
});

After(function () {
  cy.logout();

  let scenarioName = testState.pickle.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join("-");

  let env = Cypress.env("ENV");
  let browser = Cypress.browser.name;
  let harsFolder = Cypress.env("hars_folders");

  let harPath = "caseNet/caseNetEFiling";
  let harFileName = `${scenarioName}-${env}-${browser}.har`;

  cy.task("createHarsDirectories", `${harsFolder}/${harPath}`);

  cy.saveHar({
    outDir: `${harsFolder}/${harPath}`,
    fileName: harFileName,
  });

  let utils = new Utils();
  let hars_folders = Cypress.env("hars_folders");

  utils.readRunTimeFile(
    `${harsFolder}/${harPath}/${harFileName}`,
    function ($json) {
      if ($json) {
        try {
          let har = JSON.parse($json);
          for (var i = 0; i < har.log.entries.length; i++) {
            if (har.log.entries[i].request.url.includes("login")) {
              delete har.log.entries[i].request.postData;
            }
          }
          let result = JSON.stringify(har, null, 2);

          cy.writeFile(`${harsFolder}/${harPath}/${harFileName}`, result);
        } catch (e) {
          cy.log(`error ${e.message}`);
        }
      }
    }
  );
});

Given("Use Efiling to create case", () => {
  caseNetEFilingActions.useEfilingToCreateCase();
});

Given("Use the case from previous scenario", () => {
  caseNetEFilingActions.useTheCaseFromPreviousScenario();
});

Given("Navigate to CaseNet and login", () => {
  caseNetEFilingActions.navigateToCaseNetAndLogin();
});

Then("User is logged in", () => {
  caseNetEFilingActions.userIsLoggedIn();
});

Given("Select option to search by case number", () => {
  caseNetEFilingActions.selectOptionToSearchByCaseNumber();
});

Then("Case number search form appears", () => {
  caseNetEFilingActions.caseNumberSearchFormAppears();
});

Given("Select location for search", () => {
  caseNetEFilingActions.selectLocationForSearch();
});

Given("Enter case number in search input", () => {
  caseNetEFilingActions.enterCaseNumberInSearchInput();
});

Given("Click the Find button", () => {
  caseNetEFilingActions.clickTheFindButton();
});

Then("Case Header appears", () => {
  caseNetEFilingActions.caseHeaderAppears();
});

Then("Validate Judge Commissioner Assigned", () => {
  caseNetEFilingActions.validateJudgeCommissionerAssigned();
});

Then("Validate Date Filed", () => {
  caseNetEFilingActions.validateDateFiled();
});

Then("Validate Location", () => {
  caseNetEFilingActions.validateLocation();
});

Then("Validate Case Type", () => {
  caseNetEFilingActions.validateCaseType();
});

Then("Validate Disposition", () => {
  caseNetEFilingActions.validateDisposition();
});

Then("Validate Financial Information", () => {
  caseNetEFilingActions.validateFinancialInformation();
});

Then("Validate Track This Case", () => {
  caseNetEFilingActions.validateTrackThisCase();
});

Then("Validate Virtual Hearing Room", () => {
  caseNetEFilingActions.validateVirtualHearingRoom();
});

Given("Click Financial Information button", () => {
  caseNetEFilingActions.clickFinancialInformationButton();
});

Then("Financial Case Summary Appears", () => {
  caseNetEFilingActions.financialCaseSummaryAppears();
});

Given("Click Track This Case", () => {
  caseNetEFilingActions.clickTrackThisCase();
});

Then("New Tab Opens", () => {
  caseNetEFilingActions.newTabOpens();
});

Given("Click Virtual Hearing Room", () => {
  caseNetEFilingActions.clickVirtualHearingRoom();
});

Then("Redicts to Virtual Hearing Room Landing Page", () => {
  caseNetEFilingActions.redictsToVirtualHearingRoomLandingPage();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CaseNetEFilingActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useEfilingToCreateCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useTheCaseFromPreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "navigateToCaseNetAndLogin"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userIsLoggedIn"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectOptionToSearchByCaseNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseNumberSearchFormAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectLocationForSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseNumberInSearchInput"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheFindButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseHeaderAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateJudgeCommissionerAssigned"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDateFiled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFinancialInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTrackThisCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateVirtualHearingRoom"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickFinancialInformationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "financialCaseSummaryAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTrackThisCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newTabOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickVirtualHearingRoom"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "redictsToVirtualHearingRoomLandingPage"
  );
  cy.writeFile("./differences/CaseNetEFilingActions.tmp", propertyNames);
}
