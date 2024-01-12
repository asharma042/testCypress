/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AddDocketEntryBuildProcessActions from "./AddDocketEntryBuildProcessActions";
const addDocketEntryBuildProcessActions =
  new AddDocketEntryBuildProcessActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/scheduling/addDocketEntryBuildProcess/addDocketEntryBuildProcessFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "addDocketEntryBuildProcess";
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

  let harPath = "caseProcessing/scheduling/addDocketEntryBuildProcess";
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

Given("Must  build a list in Process List", () => {
  addDocketEntryBuildProcessActions.mustBuildAListInProcessList();
});

Given("Click on List Process radio button in the tab", () => {
  addDocketEntryBuildProcessActions.clickOnListProcessRadioButtonInTheTab();
});

Then("The radio button should fill", () => {
  addDocketEntryBuildProcessActions.theRadioButtonShouldFill();
});

Given("Enter a list in process list Search and press enter", () => {
  addDocketEntryBuildProcessActions.enterAListInProcessListSearchAndPressEnter();
});

Then("A table should open displaying lists called {string}", (option0) => {
  addDocketEntryBuildProcessActions.aTableShouldOpenDisplayingListsCalled(
    option0
  );
});

Given(
  "Verify that new table sorter is displaying with the following columns",
  () => {
    addDocketEntryBuildProcessActions.verifyThatNewTableSorterIsDisplayingWithTheFollowingColumns();
  }
);

Then(
  "A new table will open displaying the information about the Case ID",
  () => {
    addDocketEntryBuildProcessActions.aNewTableWillOpenDisplayingTheInformationAboutTheCaseID();
  }
);

Given("Click on Build process list", () => {
  addDocketEntryBuildProcessActions.clickOnBuildProcessList();
});

Then(
  "The same tablesorter in the previous step will generate as a pop up window",
  () => {
    addDocketEntryBuildProcessActions.theSameTablesorterInThePreviousStepWillGenerateAsAPopUpWindow();
  }
);

Given("Click Select All checkbox", () => {
  addDocketEntryBuildProcessActions.clickSelectAllCheckbox();
});

Then("Every row should have a checkbox checked", () => {
  addDocketEntryBuildProcessActions.everyRowShouldHaveACheckboxChecked();
});

Given("Click on Process now drop down button", () => {
  addDocketEntryBuildProcessActions.clickOnProcessNowDropDownButton();
});

Then("A drop down menu should appear", () => {
  addDocketEntryBuildProcessActions.aDropDownMenuShouldAppear();
});

Given("Click on Add Docket under Manage Docket Entry", () => {
  addDocketEntryBuildProcessActions.clickOnAddDocketUnderManageDocketEntry();
});

Then("A tablesorter should appear", () => {
  addDocketEntryBuildProcessActions.aTablesorterShouldAppear();
});

Given("Verify if the tablesorter has a following Columns", () => {
  addDocketEntryBuildProcessActions.verifyIfTheTablesorterHasAFollowingColumns();
});

Then("The tablesorter should contain certain and specific column", () => {
  addDocketEntryBuildProcessActions.theTablesorterShouldContainCertainAndSpecificColumn();
});

Given(
  "Verify that Case IDs that are not eligible for the additon of a docket code has a message displaying in the message field",
  () => {
    addDocketEntryBuildProcessActions.verifyThatCaseIDsThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField();
  }
);

Then("The message field should a message regarding a reason", () => {
  addDocketEntryBuildProcessActions.theMessageFieldShouldAMessageRegardingAReason();
});

Given("Enter in the Docket Description and press enter", () => {
  addDocketEntryBuildProcessActions.enterInTheDocketDescriptionAndPressEnter();
});

Then("The Docket Code should display in the Docket Description field", () => {
  addDocketEntryBuildProcessActions.theDocketCodeShouldDisplayInTheDocketDescriptionField();
});

Given("Enter 250000 in the Unsecured Bond Amount", () => {
  addDocketEntryBuildProcessActions.enter250000InTheUnsecuredBondAmount();
});

Given("Select a Filing Party", () => {
  addDocketEntryBuildProcessActions.selectAFilingParty();
});

Then("The Filing Party should display", () => {
  addDocketEntryBuildProcessActions.theFilingPartyShouldDisplay();
});

Given("Verify if the Docket Filing Date auto generates", () => {
  addDocketEntryBuildProcessActions.verifyIfTheDocketFilingDateAutoGenerates();
});

Then("The field should auto generate a date", () => {
  addDocketEntryBuildProcessActions.theFieldShouldAutoGenerateADate();
});

Given("Verify if the Docket Time is auto generated", () => {
  addDocketEntryBuildProcessActions.verifyIfTheDocketTimeIsAutoGenerated();
});

Then("Docket Time should display", () => {
  addDocketEntryBuildProcessActions.docketTimeShouldDisplay();
});

Given("Click on browse button", () => {
  addDocketEntryBuildProcessActions.clickOnBrowseButton();
});

Then("The File Explorer window should idsplay from the end users PC", () => {
  addDocketEntryBuildProcessActions.theFileExplorerWindowShouldIdsplayFromTheEndUsersPC();
});

Given("Click on Scan button", () => {
  addDocketEntryBuildProcessActions.clickOnScanButton();
});

Then("A window should pop up containing components for scanning", () => {
  addDocketEntryBuildProcessActions.aWindowShouldPopUpContainingComponentsForScanning();
});

Given("Drag and drop the file", () => {
  addDocketEntryBuildProcessActions.dragAndDropTheFile();
});

Then("The file will upload and the file icon will appear", () => {
  addDocketEntryBuildProcessActions.theFileWillUploadAndTheFileIconWillAppear();
});

Given("Click on Save and Apply to All", () => {
  addDocketEntryBuildProcessActions.clickOnSaveAndApplyToAll();
});

Then("The window should close and a green noty", () => {
  addDocketEntryBuildProcessActions.theWindowShouldCloseAndAGreenNoty();
});

Given("Click on X on the the tab", () => {
  addDocketEntryBuildProcessActions.clickOnXOnTheTheTab();
});

Then("The tab should close", () => {
  addDocketEntryBuildProcessActions.theTabShouldClose();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AddDocketEntryBuildProcessActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "mustBuildAListInProcessList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnListProcessRadioButtonInTheTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theRadioButtonShouldFill"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAListInProcessListSearchAndPressEnter"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aTableShouldOpenDisplayingListsCalled"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "verifyThatNewTableSorterIsDisplayingWithTheFollowingColumns"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "aNewTableWillOpenDisplayingTheInformationAboutTheCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnBuildProcessList"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "theSameTablesorterInThePreviousStepWillGenerateAsAPopUpWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSelectAllCheckbox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "everyRowShouldHaveACheckboxChecked"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnProcessNowDropDownButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aDropDownMenuShouldAppear"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnAddDocketUnderManageDocketEntry"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aTablesorterShouldAppear"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyIfTheTablesorterHasAFollowingColumns"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theTablesorterShouldContainCertainAndSpecificColumn"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "verifyThatCaseIDsThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theMessageFieldShouldAMessageRegardingAReason"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterInTheDocketDescriptionAndPressEnter"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theDocketCodeShouldDisplayInTheDocketDescriptionField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enter250000InTheUnsecuredBondAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAFilingParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFilingPartyShouldDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyIfTheDocketFilingDateAutoGenerates"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFieldShouldAutoGenerateADate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyIfTheDocketTimeIsAutoGenerated"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketTimeShouldDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnBrowseButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theFileExplorerWindowShouldIdsplayFromTheEndUsersPC"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnScanButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "aWindowShouldPopUpContainingComponentsForScanning"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "dragAndDropTheFile"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFileWillUploadAndTheFileIconWillAppear"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnSaveAndApplyToAll"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theWindowShouldCloseAndAGreenNoty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnXOnTheTheTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theTabShouldClose"
  );
  cy.writeFile(
    "./differences/AddDocketEntryBuildProcessActions.tmp",
    propertyNames
  );
}
