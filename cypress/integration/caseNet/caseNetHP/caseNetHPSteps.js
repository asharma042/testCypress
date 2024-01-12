/// <reference types="cypress" />
import Utils from "../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CaseNetHPActions from "./CaseNetHPActions";
const caseNetHPActions = new CaseNetHPActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseNet/caseNetHP/caseNetHPFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "caseNetHP";
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

  let harPath = "caseNet/caseNetHP";
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

Given("Create a civil case", () => {
  caseNetHPActions.createACivilCase();
});

Given("Use the civil case from previous scenario", () => {
  caseNetHPActions.useTheCivilCaseFromPreviousScenario();
});

Given("Navigate to CaseNet and login", () => {
  caseNetHPActions.navigateToCaseNetAndLogin();
});

Then("User is logged in", () => {
  caseNetHPActions.userIsLoggedIn();
});

Given("Select option to search by case number", () => {
  caseNetHPActions.selectOptionToSearchByCaseNumber();
});

Then("Case number search form appears", () => {
  caseNetHPActions.caseNumberSearchFormAppears();
});

Given("Select location for search", () => {
  caseNetHPActions.selectLocationForSearch();
});

Given("Enter case number in search input", () => {
  caseNetHPActions.enterCaseNumberInSearchInput();
});

Given("Click the Find button", () => {
  caseNetHPActions.clickTheFindButton();
});

Then("Case Header appears", () => {
  caseNetHPActions.caseHeaderAppears();
});

Then("Validate Judge Commissioner Assigned", () => {
  caseNetHPActions.validateJudgeCommissionerAssigned();
});

Then("Validate Date Filed", () => {
  caseNetHPActions.validateDateFiled();
});

Then("Validate Location", () => {
  caseNetHPActions.validateLocation();
});

Then("Validate Case Type", () => {
  caseNetHPActions.validateCaseType();
});

Then("Validate Disposition", () => {
  caseNetHPActions.validateDisposition();
});

Then("Validate Financial Information", () => {
  caseNetHPActions.validateFinancialInformation();
});

Then("Validate Track This Case", () => {
  caseNetHPActions.validateTrackThisCase();
});

Then("Validate Virtual Hearing Room", () => {
  caseNetHPActions.validateVirtualHearingRoom();
});

Given("Click Financial Information button", () => {
  caseNetHPActions.clickFinancialInformationButton();
});

Then("Financial Case Summary Appears", () => {
  caseNetHPActions.financialCaseSummaryAppears();
});

Given("Click Track This Case", () => {
  caseNetHPActions.clickTrackThisCase();
});

Then("New Tab Opens", () => {
  caseNetHPActions.newTabOpens();
});

Given("Click Virtual Hearing Room", () => {
  caseNetHPActions.clickVirtualHearingRoom();
});

Then("Redicts to Virtual Hearing Room Landing Page", () => {
  caseNetHPActions.redictsToVirtualHearingRoomLandingPage();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(CaseNetHPActions.prototype);
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createACivilCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useTheCivilCaseFromPreviousScenario"
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
  cy.writeFile("./differences/CaseNetHPActions.tmp", propertyNames);
}
