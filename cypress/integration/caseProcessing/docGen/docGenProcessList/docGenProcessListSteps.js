/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DocGenProcessListActions from "./DocGenProcessListActions";
const docGenProcessListActions = new DocGenProcessListActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/docGen/docGenProcessList/docGenProcessListFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "docGenProcessList";
      cy.wrap(id).as("id");
      if ($jsonHandlerFile[id] === undefined) {
        $jsonHandlerFile[id] = dataFixture;
        cy.task("writeJsonHandlerFile", $jsonHandlerFile);
      }
    });
  });
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

  let harPath = "caseProcessing/docGen/docGenProcessList";
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
  docGenProcessListActions.createCivilCase();
});

Given("Create process list", () => {
  docGenProcessListActions.createProcessList();
});

Given("Click on Document Generation from Case Processing", () => {
  docGenProcessListActions.clickOnDocumentGenerationFromCaseProcessing();
});

Given("Click on Template drop down box", () => {
  docGenProcessListActions.clickOnTemplateDropDownBox();
});

Given("Select a template other than a label", () => {
  docGenProcessListActions.selectATemplateOtherThanALabel();
});

Then("Search fields are displayed", () => {
  docGenProcessListActions.searchFieldsAreDisplayed();
});

Given("Search option is by Process List", () => {
  docGenProcessListActions.searchOptionIsByProcessList();
});

Then("Process List radio button is selected", () => {
  docGenProcessListActions.processListRadioButtonIsSelected();
});

Given("Enter Process List name", () => {
  docGenProcessListActions.enterProcessListName();
});

Given("Check Doc Gen Select All box", () => {
  docGenProcessListActions.checkDocGenSelectAllBox();
});

Given("Press Continue with Selected Cases button", () => {
  docGenProcessListActions.pressContinueWithSelectedCasesButton();
});

Given("Generate Document button is pressed", () => {
  docGenProcessListActions.generateDocumentButtonIsPressed();
});

Given("Prepare for DMS window", () => {
  docGenProcessListActions.prepareForDMSWindow();
});

Given("Generate Final Document DMS is selected", () => {
  docGenProcessListActions.generateFinalDocumentDMSIsSelected();
});

Given("Press Ok", () => {
  docGenProcessListActions.pressOk();
});

Then("Wait for pdf download", () => {
  docGenProcessListActions.waitForPdfDownload();
});

Then("Validate generated pdf", () => {
  docGenProcessListActions.validateGeneratedPdf();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DocGenProcessListActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createCivilCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createProcessList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocumentGenerationFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnTemplateDropDownBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectATemplateOtherThanALabel"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchFieldsAreDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchOptionIsByProcessList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "processListRadioButtonIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterProcessListName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkDocGenSelectAllBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressContinueWithSelectedCasesButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateDocumentButtonIsPressed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "prepareForDMSWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "generateFinalDocumentDMSIsSelected"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "pressOk");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "waitForPdfDownload"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateGeneratedPdf"
  );
  cy.writeFile("./differences/DocGenProcessListActions.tmp", propertyNames);
}
