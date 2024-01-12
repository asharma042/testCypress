/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import SubCaseActions from "./SubCaseActions";
const subCaseActions = new SubCaseActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseProcessing/subCase/subCase/subCaseFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "subCase";
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

  let harPath = "caseProcessing/subCase/subCase";
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

Given("Create Civil Case", () => {
  subCaseActions.createCivilCase();
});

Given("Add Docket Entry", () => {
  subCaseActions.addDocketEntry();
});

Given("Add Parties", () => {
  subCaseActions.addParties();
});

Given("Dispose parties", () => {
  subCaseActions.disposeParties();
});

Given("Dispose case", () => {
  subCaseActions.disposeCase();
});

Given("Click on Subsequent Case from Case Processing", () => {
  subCaseActions.clickOnSubsequentCaseFromCaseProcessing();
});

Given("Select Case Id search radio button", () => {
  subCaseActions.selectCaseIdSearchRadioButton();
});

Given("Enter Case Id", () => {
  subCaseActions.enterCaseId();
});

Then("Verify Case ID", () => {
  subCaseActions.verifyCaseID();
});

Given("Enter Case Type", () => {
  subCaseActions.enterCaseType();
});

Given("Click Create Subcase", () => {
  subCaseActions.clickCreateSubcase();
});

Then("Copy Parties tab enabled", () => {
  subCaseActions.copyPartiesTabEnabled();
});

Given("Select parties to copy over", () => {
  subCaseActions.selectPartiesToCopyOver();
});

Given("Click Copy To Review List", () => {
  subCaseActions.clickCopyToReviewList();
});

Given("Click Save Parties To Subcase", () => {
  subCaseActions.clickSavePartiesToSubcase();
});

Then("Copy Charges tab enabled", () => {
  subCaseActions.copyChargesTabEnabled();
});

Given("Click OK for No Charges window", () => {
  subCaseActions.clickOKForNoChargesWindow();
});

Given("Click on Dockets tab", () => {
  subCaseActions.clickOnDocketsTab();
});

Given("Check docket entry to copy over", () => {
  subCaseActions.checkDocketEntryToCopyOver();
});

Given("Click Save Dockets to Subcase", () => {
  subCaseActions.clickSaveDocketsToSubcase();
});

Given("Click Yes in SubCase alert window", () => {
  subCaseActions.clickYesInSubCaseAlertWindow();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(SubCaseActions.prototype);
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createCivilCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addDocketEntry"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "addParties");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "disposeParties"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "disposeCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnSubsequentCaseFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseIdSearchRadioButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseId"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCreateSubcase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "copyPartiesTabEnabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartiesToCopyOver"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCopyToReviewList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSavePartiesToSubcase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "copyChargesTabEnabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOKForNoChargesWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocketsTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkDocketEntryToCopyOver"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveDocketsToSubcase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickYesInSubCaseAlertWindow"
  );
  cy.writeFile("./differences/SubCaseActions.tmp", propertyNames);
}
