/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DocGenActions from "./DocGenActions";
const docGenActions = new DocGenActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseProcessing/docGen/docGen/docGenFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "docGen";
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

  let harPath = "caseProcessing/docGen/docGen";
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
  docGenActions.createCivilCase();
});

Given("Add parties", () => {
  docGenActions.addParties();
});

Given("Clear downloads", () => {
  docGenActions.clearDownloads();
});

Given("Click on Document Generation from Case Processing", () => {
  docGenActions.clickOnDocumentGenerationFromCaseProcessing();
});

Given("Click on Template drop down box", () => {
  docGenActions.clickOnTemplateDropDownBox();
});

Given("Select a template", () => {
  docGenActions.selectATemplate();
});

Then("Search fields are displayed", () => {
  docGenActions.searchFieldsAreDisplayed();
});

Given("Search option is by Case ID", () => {
  docGenActions.searchOptionIsByCaseID();
});

Then("Case ID radio button is selected", () => {
  docGenActions.caseIDRadioButtonIsSelected();
});

Given("Case ID is entered", () => {
  docGenActions.caseIDIsEntered();
});

Then("Case appears in Cases results table", () => {
  docGenActions.caseAppearsInCasesResultsTable();
});

Given("Generate Document button is pressed", () => {
  docGenActions.generateDocumentButtonIsPressed();
});

Given("Generate Document NO DMS is selected", () => {
  docGenActions.generateDocumentNODMSIsSelected();
});

Then("Wait for doc download", () => {
  docGenActions.waitForDocDownload();
});

Given("Press Ok", () => {
  docGenActions.pressOk();
});

Then("Validate generated doc", () => {
  docGenActions.validateGeneratedDoc();
});

Then("Select a template other than a label", () => {
  docGenActions.selectATemplateOtherThanALabel();
});

Then("Prepare for DMS window", () => {
  docGenActions.prepareForDMSWindow();
});

Then("Generate Final Document DMS is selected", () => {
  docGenActions.generateFinalDocumentDMSIsSelected();
});

Then("Wait for pdf download", () => {
  docGenActions.waitForPdfDownload();
});

Then("Validate generated pdf", () => {
  docGenActions.validateGeneratedPdf();
});

Then("Select a service document template", () => {
  docGenActions.selectAServiceDocumentTemplate();
});

Given("Enter Service Document Docket Description", () => {
  docGenActions.enterServiceDocumentDocketDescription();
});

Given("Select a summons template", () => {
  docGenActions.selectASummonsTemplate();
});

Given("Click to open Service Case Parties field", () => {
  docGenActions.clickToOpenServiceCasePartiesField();
});

Given("Select all service parties", () => {
  docGenActions.selectAllServiceParties();
});

Given("Generate a non tracked document for a case using service", () => {
  docGenActions.generateANonTrackedDocumentForACaseUsingService();
});

Given(
  "Generate a regular non tracked document for a case using service",
  () => {
    docGenActions.generateARegularNonTrackedDocumentForACaseUsingService();
  }
);

Given("Generate a service document for a case using service", () => {
  docGenActions.generateAServiceDocumentForACaseUsingService();
});

Given("Generate a summons for a case using service", () => {
  docGenActions.generateASummonsForACaseUsingService();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(DocGenActions.prototype);
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createCivilCase"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "addParties");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clearDownloads"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocumentGenerationFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnTemplateDropDownBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectATemplate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchFieldsAreDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchOptionIsByCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDRadioButtonIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDIsEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseAppearsInCasesResultsTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateDocumentButtonIsPressed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateDocumentNODMSIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "waitForDocDownload"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "pressOk");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateGeneratedDoc"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectATemplateOtherThanALabel"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "prepareForDMSWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateFinalDocumentDMSIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "waitForPdfDownload"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateGeneratedPdf"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAServiceDocumentTemplate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterServiceDocumentDocketDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectASummonsTemplate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToOpenServiceCasePartiesField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAllServiceParties"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateANonTrackedDocumentForACaseUsingService"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "generateARegularNonTrackedDocumentForACaseUsingService"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateAServiceDocumentForACaseUsingService"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateASummonsForACaseUsingService"
  );
  cy.writeFile("./differences/DocGenActions.tmp", propertyNames);
}
