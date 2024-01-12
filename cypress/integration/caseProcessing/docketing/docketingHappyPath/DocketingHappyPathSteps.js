/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DocketingActions from "./DocketingHappyPathActions";
const docketingActions = new DocketingActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseProcessing/docketing/docketingFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "docketing";
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

  let harPath = "caseProcessing/docketing";
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
  docketingActions.createCivilCase();
});

Given("Click on Docketing from Case Processing", () => {
  docketingActions.clickOnDocketingFromCaseProcessing();
});

Given("Select search by case id", () => {
  docketingActions.selectSearchByCaseId();
});

Then("Case ID radio button is selected", () => {
  docketingActions.caseIDRadioButtonIsSelected();
});

Given("Enter Case ID in My Case ID Search", () => {
  docketingActions.enterCaseIDInMyCaseIDSearch();
});

Then("Case appears in results", () => {
  docketingActions.caseAppearsInResults();
});

Then("Attorney is validated", () => {
  docketingActions.attorneyIsValidated();
});

Given("Expand case row in table", () => {
  docketingActions.expandCaseRowInTable();
});

Given("Expand Add Docket Entry section", () => {
  docketingActions.expandAddDocketEntrySection();
});

Given("Enter Docket Description", () => {
  docketingActions.enterDocketDescription();
});

Given("Enter Docket Date", () => {
  docketingActions.enterDocketDate();
});

Then("Docket Date entered", () => {
  docketingActions.docketDateEntered();
});

Given("Enter Time", () => {
  docketingActions.enterTime();
});

Given("Select Filing Party", () => {
  docketingActions.selectFilingParty();
});

Then("Filing Party entered", () => {
  docketingActions.filingPartyEntered();
});

Given("Select Filed On Behalf Of", () => {
  docketingActions.selectFiledOnBehalfOf();
});

Then("FOBO entered", () => {
  docketingActions.fOBOEntered();
});

Given("Enter docket text in Search Docket PreDefined Text field", () => {
  docketingActions.enterDocketTextInSearchDocketPreDefinedTextField();
});

Then("Docket Text entered", () => {
  docketingActions.docketTextEntered();
});

Given("Press Save Docket button", () => {
  docketingActions.pressSaveDocketButton();
});

Given("Select Save Docket option", () => {
  docketingActions.selectSaveDocketOption();
});

Given("Expand View Update Docket Entries section", () => {
  docketingActions.expandViewUpdateDocketEntriesSection();
});

Given("Expand docket entry", () => {
  docketingActions.expandDocketEntry();
});

Given("Update Docket Text", () => {
  docketingActions.updateDocketText();
});

Given("Press Update Docket Entry button", () => {
  docketingActions.pressUpdateDocketEntryButton();
});

Given("Press trash cash button", () => {
  docketingActions.pressTrashCashButton();
});

Given("Enter Reason Description", () => {
  docketingActions.enterReasonDescription();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(DocketingActions.prototype);
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createCivilCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocketingFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSearchByCaseId"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDRadioButtonIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIDInMyCaseIDSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseAppearsInResults"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "attorneyIsValidated"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandCaseRowInTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandAddDocketEntrySection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDocketDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDocketDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketDateEntered"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterTime");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectFilingParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "filingPartyEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectFiledOnBehalfOf"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "fOBOEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterDocketTextInSearchDocketPreDefinedTextField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketTextEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressSaveDocketButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSaveDocketOption"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandViewUpdateDocketEntriesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandDocketEntry"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateDocketText"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressUpdateDocketEntryButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressTrashCashButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterReasonDescription"
  );
  cy.writeFile("./differences/DocketingActions.tmp", propertyNames);
}
