/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DocumentCaseFileInquiryActions from "./DocumentCaseFileInquiryActions";
const documentCaseFileInquiryActions = new DocumentCaseFileInquiryActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/manageCaseDetails/documentCaseFileInquiry/documentCaseFileInquiryFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "documentCaseFileInquiry";
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

  let harPath = "caseProcessing/manageCaseDetails/documentCaseFileInquiry";
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

Given("Cases with Case File Transfer inforrmation", () => {
  documentCaseFileInquiryActions.casesWithCaseFileTransferInforrmation();
});

Given("Click on Case Processing from Case Processing", () => {
  documentCaseFileInquiryActions.clickOnCaseProcessingFromCaseProcessing();
});

Given("Click on Manage Case Details", () => {
  documentCaseFileInquiryActions.clickOnManageCaseDetails();
});

Then("Manage Case Detail display open with submenu", () => {
  documentCaseFileInquiryActions.manageCaseDetailDisplayOpenWithSubmenu();
});

Given("Click on Case File Inquiry", () => {
  documentCaseFileInquiryActions.clickOnCaseFileInquiry();
});

Then("Case File Inquiry section opens", () => {
  documentCaseFileInquiryActions.caseFileInquirySectionOpens();
});

Given("Enter Case ID in Case ID field", () => {
  documentCaseFileInquiryActions.enterCaseIDInCaseIDField();
});

Then("Case ID entered", () => {
  documentCaseFileInquiryActions.caseIDEntered();
});

Given("Uncheck Display Only Current Record if selected", () => {
  documentCaseFileInquiryActions.uncheckDisplayOnlyCurrentRecordIfSelected();
});

Given("Click on Query Case File Location button", () => {
  documentCaseFileInquiryActions.clickOnQueryCaseFileLocationButton();
});

Then(
  "View File Inquiry Record section displays records for entered Case ID",
  () => {
    documentCaseFileInquiryActions.viewFileInquiryRecordSectionDisplaysRecordsForEnteredCaseID();
  }
);

Given("Verify View File Inquiry Records table", () => {
  documentCaseFileInquiryActions.verifyViewFileInquiryRecordsTable();
});

Then("View File Inquiry Records table displays desired columns", () => {
  documentCaseFileInquiryActions.viewFileInquiryRecordsTableDisplaysDesiredColumns();
});

Given("Entered same case ID into Case ID field", () => {
  documentCaseFileInquiryActions.enteredSameCaseIDIntoCaseIDField();
});

Given("Checked in checkbox to display only current records", () => {
  documentCaseFileInquiryActions.checkedInCheckboxToDisplayOnlyCurrentRecords();
});

Then("Display Only Current Records checkbox checked in", () => {
  documentCaseFileInquiryActions.displayOnlyCurrentRecordsCheckboxCheckedIn();
});

Then(
  "Displays only current information of entered Case ID where Current Record column value is Yes",
  () => {
    documentCaseFileInquiryActions.displaysOnlyCurrentInformationOfEnteredCaseIDWhereCurrentRecordColumnValueIsYes();
  }
);

Given("Select Save Filter Preference button", () => {
  documentCaseFileInquiryActions.selectSaveFilterPreferenceButton();
});

Then("System will save current Case ID", () => {
  documentCaseFileInquiryActions.systemWillSaveCurrentCaseID();
});

Given("Close Case File Transfer Inquiry tab", () => {
  documentCaseFileInquiryActions.closeCaseFileTransferInquiryTab();
});

Given("Select Case File Transfer Inquiry tab", () => {
  documentCaseFileInquiryActions.selectCaseFileTransferInquiryTab();
});

Then("Case File Transfer Inquiry tab open", () => {
  documentCaseFileInquiryActions.caseFileTransferInquiryTabOpen();
});

Then(
  "Verify that Case File Inquiry Case ID field opens with last saved Case ID",
  () => {
    documentCaseFileInquiryActions.verifyThatCaseFileInquiryCaseIDFieldOpensWithLastSavedCaseID();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DocumentCaseFileInquiryActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "casesWithCaseFileTransferInforrmation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseProcessingFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnManageCaseDetails"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "manageCaseDetailDisplayOpenWithSubmenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseFileInquiry"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseFileInquirySectionOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIDInCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "uncheckDisplayOnlyCurrentRecordIfSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnQueryCaseFileLocationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "viewFileInquiryRecordSectionDisplaysRecordsForEnteredCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyViewFileInquiryRecordsTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "viewFileInquiryRecordsTableDisplaysDesiredColumns"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enteredSameCaseIDIntoCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkedInCheckboxToDisplayOnlyCurrentRecords"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "displayOnlyCurrentRecordsCheckboxCheckedIn"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "displaysOnlyCurrentInformationOfEnteredCaseIDWhereCurrentRecordColumnValueIsYes"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSaveFilterPreferenceButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "systemWillSaveCurrentCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeCaseFileTransferInquiryTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseFileTransferInquiryTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseFileTransferInquiryTabOpen"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "verifyThatCaseFileInquiryCaseIDFieldOpensWithLastSavedCaseID"
  );
  cy.writeFile(
    "./differences/DocumentCaseFileInquiryActions.tmp",
    propertyNames
  );
}
