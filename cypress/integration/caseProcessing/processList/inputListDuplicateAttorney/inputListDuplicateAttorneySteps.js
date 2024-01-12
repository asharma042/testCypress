/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import InputListDuplicateAttorneyActions from "./InputListDuplicateAttorneyActions";
const inputListDuplicateAttorneyActions =
  new InputListDuplicateAttorneyActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/processList/inputListDuplicateAttorney/inputListDuplicateAttorneyFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "inputListDuplicateAttorney";
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

  let harPath = "caseProcessing/processList/inputListDuplicateAttorney";
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

Given("Create Criminal Cases", () => {
  inputListDuplicateAttorneyActions.createCriminalCases();
});

Given("Click on Case Processing Tab", () => {
  inputListDuplicateAttorneyActions.clickOnCaseProcessingTab();
});

Then("The business process unit", () => {
  inputListDuplicateAttorneyActions.theBusinessProcessUnit();
});

Given("Click on Process List", () => {
  inputListDuplicateAttorneyActions.clickOnProcessList();
});

Then("The submenu items", () => {
  inputListDuplicateAttorneyActions.theSubmenuItems();
});

Given("Select Input Case", () => {
  inputListDuplicateAttorneyActions.selectInputCase();
});

Then("Input Case Tab opens", () => {
  inputListDuplicateAttorneyActions.inputCaseTabOpens();
});

Given("Enter Case Id into the Enter Case Id field and press enter", () => {
  inputListDuplicateAttorneyActions.enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter();
});

Then("Case Id should display in the field", () => {
  inputListDuplicateAttorneyActions.caseIdShouldDisplayInTheField();
});

Given("Select Add Attorney from the process Now drop down button", () => {
  inputListDuplicateAttorneyActions.selectAddAttorneyFromTheProcessNowDropDownButton();
});

Then("Select List Verify Records To Process Table Displays both cases", () => {
  inputListDuplicateAttorneyActions.selectListVerifyRecordsToProcessTableDisplaysBothCases();
});

Given("Click Select All and Click Enter Attrorney Information", () => {
  inputListDuplicateAttorneyActions.clickSelectAllAndClickEnterAttrorneyInformation();
});

Then("Add Attorney Dialog Box display", () => {
  inputListDuplicateAttorneyActions.addAttorneyDialogBoxDisplay();
});

Given("Change party description field to ADFT", () => {
  inputListDuplicateAttorneyActions.changePartyDescriptionFieldToADFT();
});

Then("APA should be displayed", () => {
  inputListDuplicateAttorneyActions.aPAShouldBeDisplayed();
});

Given("Enter Attorney PIDM into the Attorney Search", () => {
  inputListDuplicateAttorneyActions.enterAttorneyPIDMIntoTheAttorneySearch();
});

Then("The name of the attorney and the PIDM should be displaying", () => {
  inputListDuplicateAttorneyActions.theNameOfTheAttorneyAndThePIDMShouldBeDisplaying();
});

Given("Backdate the start date in the start field", () => {
  inputListDuplicateAttorneyActions.backdateTheStartDateInTheStartField();
});

Then("The start date should be backdated", () => {
  inputListDuplicateAttorneyActions.theStartDateShouldBeBackdated();
});

Given("Click on Save Apply to All", () => {
  inputListDuplicateAttorneyActions.clickOnSaveApplyToAll();
});

Then("A green confirmation noty should appear and dialog window closes", () => {
  inputListDuplicateAttorneyActions.aGreenConfirmationNotyShouldAppearAndDialogWindowCloses();
});

Given("Repeat Steps six to ten", () => {
  inputListDuplicateAttorneyActions.repeatStepsSixToTen();
});

Given("Confirm that a table sorter column names", () => {
  inputListDuplicateAttorneyActions.confirmThatATableSorterColumnNames();
});

Then("A table sorter should appear with specific columns", () => {
  inputListDuplicateAttorneyActions.aTableSorterShouldAppearWithSpecificColumns();
});

Given("Verify if a message is being displayed", () => {
  inputListDuplicateAttorneyActions.verifyIfAMessageIsBeingDisplayed();
});

Then("The case XXXXXX already have the party", () => {
  inputListDuplicateAttorneyActions.theCaseXXXXXXAlreadyHaveTheParty();
});

Given("Manually Close the Add Attorney Dialog Window", () => {
  inputListDuplicateAttorneyActions.manuallyCloseTheAddAttorneyDialogWindow();
});

Given("Select Yes on Progress in Add Attorney Entry Pop Up", () => {
  inputListDuplicateAttorneyActions.selectYesOnProgressInAddAttorneyEntryPopUp();
});

Then("Add Attorney Dialog Closes", () => {
  inputListDuplicateAttorneyActions.addAttorneyDialogCloses();
});

Given("Click No on Save the List Pop Up", () => {
  inputListDuplicateAttorneyActions.clickNoOnSaveTheListPopUp();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    InputListDuplicateAttorneyActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createCriminalCases"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseProcessingTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theBusinessProcessUnit"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnProcessList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theSubmenuItems"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectInputCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inputCaseTabOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIdShouldDisplayInTheField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "selectAddAttorneyFromTheProcessNowDropDownButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "selectListVerifyRecordsToProcessTableDisplaysBothCases"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSelectAllAndClickEnterAttrorneyInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addAttorneyDialogBoxDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "changePartyDescriptionFieldToADFT"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aPAShouldBeDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAttorneyPIDMIntoTheAttorneySearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theNameOfTheAttorneyAndThePIDMShouldBeDisplaying"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "backdateTheStartDateInTheStartField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theStartDateShouldBeBackdated"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnSaveApplyToAll"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "aGreenConfirmationNotyShouldAppearAndDialogWindowCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "repeatStepsSixToTen"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "confirmThatATableSorterColumnNames"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aTableSorterShouldAppearWithSpecificColumns"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyIfAMessageIsBeingDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theCaseXXXXXXAlreadyHaveTheParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "manuallyCloseTheAddAttorneyDialogWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectYesOnProgressInAddAttorneyEntryPopUp"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addAttorneyDialogCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickNoOnSaveTheListPopUp"
  );
  cy.writeFile(
    "./differences/InputListDuplicateAttorneyActions.tmp",
    propertyNames
  );
}
