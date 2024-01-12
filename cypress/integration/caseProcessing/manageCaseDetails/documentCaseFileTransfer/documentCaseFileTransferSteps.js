/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DocumentCaseFileTransferActions from "./DocumentCaseFileTransferActions";
const documentCaseFileTransferActions = new DocumentCaseFileTransferActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/manageCaseDetails/documentCaseFileTransfer/documentCaseFileTransferFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "documentCaseFileTransfer";
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

  let harPath = "caseProcessing/manageCaseDetails/documentCaseFileTransfer";
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

Given(
  "Cases with Case File Transfer information and any type new cases",
  () => {
    documentCaseFileTransferActions.casesWithCaseFileTransferInformationAndAnyTypeNewCases();
  }
);

Given("Click on Case Processing button", () => {
  documentCaseFileTransferActions.clickOnCaseProcessingButton();
});

Given("Click on Manage Case Details from left menu", () => {
  documentCaseFileTransferActions.clickOnManageCaseDetailsFromLeftMenu();
});

Given("Click on Case File Transfer Inquiry", () => {
  documentCaseFileTransferActions.clickOnCaseFileTransferInquiry();
});

Then("Case File Transfer Inquiry tab displays", () => {
  documentCaseFileTransferActions.caseFileTransferInquiryTabDisplays();
});

Given("Verify Case File Transfer table columns", () => {
  documentCaseFileTransferActions.verifyCaseFileTransferTableColumns();
});

Then("System should display all column Names", () => {
  documentCaseFileTransferActions.systemShouldDisplayAllColumnNames();
});

Given("Enter Case ID in Case ID field and click Tab Button", () => {
  documentCaseFileTransferActions.enterCaseIDInCaseIDFieldAndClickTabButton();
});

Then("Validate case information is diplayed", () => {
  documentCaseFileTransferActions.validateCaseInformationIsDiplayed();
});

Given("Enter File Location value", () => {
  documentCaseFileTransferActions.enterFileLocationValue();
});

Then("Verify File Location is diplayed", () => {
  documentCaseFileTransferActions.verifyFileLocationIsDiplayed();
});

Given("Enter text information into Text field", () => {
  documentCaseFileTransferActions.enterTextInformationIntoTextField();
});

Then("Verify User able to enter text", () => {
  documentCaseFileTransferActions.verifyUserAbleToEnterText();
});

Given("Enter character of any Reason value into Reason fields", () => {
  documentCaseFileTransferActions.enterCharacterOfAnyReasonValueIntoReasonFields();
});

Then("Verify Reason Value is displayed", () => {
  documentCaseFileTransferActions.verifyReasonValueIsDisplayed();
});

Given("Enter Second Case ID in Case ID field", () => {
  documentCaseFileTransferActions.enterSecondCaseIDInCaseIDField();
});

Then("Validate new case information is diplayed", () => {
  documentCaseFileTransferActions.validateNewCaseInformationIsDiplayed();
});

Given("Enter different File Location value", () => {
  documentCaseFileTransferActions.enterDifferentFileLocationValue();
});

Then("Verify new File Location is diplayed", () => {
  documentCaseFileTransferActions.verifyNewFileLocationIsDiplayed();
});

Given("Enter different text information into Text field", () => {
  documentCaseFileTransferActions.enterDifferentTextInformationIntoTextField();
});

Then("Verify new text information is displayed", () => {
  documentCaseFileTransferActions.verifyNewTextInformationIsDisplayed();
});

Given(
  "Enter different character of any Reason value into Reason fields",
  () => {
    documentCaseFileTransferActions.enterDifferentCharacterOfAnyReasonValueIntoReasonFields();
  }
);

Then("Verify new Reason value is displayed", () => {
  documentCaseFileTransferActions.verifyNewReasonValueIsDisplayed();
});

Given("Select Transfer Case Files button", () => {
  documentCaseFileTransferActions.selectTransferCaseFilesButton();
});

Then("User able to enter Transfer Case File s button", () => {
  documentCaseFileTransferActions.userAbleToEnterTransferCaseFileSButton();
});

Then(
  "System displays a successful message about successful transfer file",
  () => {
    documentCaseFileTransferActions.systemDisplaysASuccessfulMessageAboutSuccessfulTransferFile();
  }
);

Given("Enter a Case ID into Case ID field under Case File Inquiry", () => {
  documentCaseFileTransferActions.enterACaseIDIntoCaseIDFieldUnderCaseFileInquiry();
});

Then("User able to enter a Case ID", () => {
  documentCaseFileTransferActions.userAbleToEnterACaseID();
});

Then("Query Case File Location button get active", () => {
  documentCaseFileTransferActions.queryCaseFileLocationButtonGetActive();
});

Given("Select Query Case File Location button", () => {
  documentCaseFileTransferActions.selectQueryCaseFileLocationButton();
});

Then("Query result displays under View File Inquiry Records", () => {
  documentCaseFileTransferActions.queryResultDisplaysUnderViewFileInquiryRecords();
});

Then("Verify Location Description must display an updated value", () => {
  documentCaseFileTransferActions.verifyLocationDescriptionMustDisplayAnUpdatedValue();
});

Given("Validate Case Transfer for another case Id", () => {
  documentCaseFileTransferActions.validateCaseTransferForAnotherCaseId();
});

Given("Enter multiple Case ID in Case ID field", () => {
  documentCaseFileTransferActions.enterMultipleCaseIDInCaseIDField();
});

Then("User able to enter multiple Case ID", () => {
  documentCaseFileTransferActions.userAbleToEnterMultipleCaseID();
});

Given("Use tab button from keyboard", () => {
  documentCaseFileTransferActions.useTabButtonFromKeyboard();
});

Then("Existing information displays", () => {
  documentCaseFileTransferActions.existingInformationDisplays();
});

Given("Enter File Location Text Reason value", () => {
  documentCaseFileTransferActions.enterFileLocationTextReasonValue();
});

Then("User able to enter File Location Text Reason field value", () => {
  documentCaseFileTransferActions.userAbleToEnterFileLocationTextReasonFieldValue();
});

Given("Select Reset button", () => {
  documentCaseFileTransferActions.selectResetButton();
});

Then("System ask permission", () => {
  documentCaseFileTransferActions.systemAskPermission();
});

Given("Select Yes option", () => {
  documentCaseFileTransferActions.selectYesOption();
});

Then("System will remove all entered information form entered fields", () => {
  documentCaseFileTransferActions.systemWillRemoveAllEnteredInformationFormEnteredFields();
});

Given("Enter any Case ID into Case ID field", () => {
  documentCaseFileTransferActions.enterAnyCaseIDIntoCaseIDField();
});

Then("Process Continuation button get active", () => {
  documentCaseFileTransferActions.processContinuationButtonGetActive();
});

Then("System displays Process Continuation option list", () => {
  documentCaseFileTransferActions.systemDisplaysProcessContinuationOptionList();
});

Given("Select option from the option list", () => {
  documentCaseFileTransferActions.selectOptionFromTheOptionList();
});

Then(
  "System will open separate window for each functionality listed under Process Continuation options",
  () => {
    documentCaseFileTransferActions.systemWillOpenSeparateWindowForEachFunctionalityListedUnderProcessContinuationOptions();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DocumentCaseFileTransferActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "casesWithCaseFileTransferInformationAndAnyTypeNewCases"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseProcessingButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnManageCaseDetailsFromLeftMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseFileTransferInquiry"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseFileTransferInquiryTabDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyCaseFileTransferTableColumns"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "systemShouldDisplayAllColumnNames"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIDInCaseIDFieldAndClickTabButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseInformationIsDiplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFileLocationValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyFileLocationIsDiplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterTextInformationIntoTextField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyUserAbleToEnterText"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCharacterOfAnyReasonValueIntoReasonFields"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyReasonValueIsDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterSecondCaseIDInCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateNewCaseInformationIsDiplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDifferentFileLocationValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyNewFileLocationIsDiplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDifferentTextInformationIntoTextField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyNewTextInformationIsDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterDifferentCharacterOfAnyReasonValueIntoReasonFields"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyNewReasonValueIsDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectTransferCaseFilesButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userAbleToEnterTransferCaseFileSButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "systemDisplaysASuccessfulMessageAboutSuccessfulTransferFile"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterACaseIDIntoCaseIDFieldUnderCaseFileInquiry"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userAbleToEnterACaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "queryCaseFileLocationButtonGetActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectQueryCaseFileLocationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "queryResultDisplaysUnderViewFileInquiryRecords"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "verifyLocationDescriptionMustDisplayAnUpdatedValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseTransferForAnotherCaseId"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterMultipleCaseIDInCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userAbleToEnterMultipleCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useTabButtonFromKeyboard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "existingInformationDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFileLocationTextReasonValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userAbleToEnterFileLocationTextReasonFieldValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectResetButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "systemAskPermission"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectYesOption"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "systemWillRemoveAllEnteredInformationFormEnteredFields"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAnyCaseIDIntoCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "processContinuationButtonGetActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "systemDisplaysProcessContinuationOptionList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectOptionFromTheOptionList"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "systemWillOpenSeparateWindowForEachFunctionalityListedUnderProcessContinuationOptions"
  );
  cy.writeFile(
    "./differences/DocumentCaseFileTransferActions.tmp",
    propertyNames
  );
}
