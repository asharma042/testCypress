/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AddDocketEntryInputCasesActions from "./AddDocketEntryInputCasesActions";
const addDocketEntryInputCasesActions = new AddDocketEntryInputCasesActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/processList/addDocketEntryInputCases/addDocketEntryInputCasesFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "addDocketEntryInputCases";
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

  let harPath = "caseProcessing/processList/addDocketEntryInputCases";
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

Given("More than M cases that have a DDFP code Added to them", () => {
  addDocketEntryInputCasesActions.moreThanMCasesThatHaveADDFPCodeAddedToThem();
});

Given("Enter Case Ids under Enter Case Id column in the table", () => {
  addDocketEntryInputCasesActions.enterCaseIdsUnderEnterCaseIdColumnInTheTable();
});

Then("The Case IDs should be displaying in the fields", () => {
  addDocketEntryInputCasesActions.theCaseIDsShouldBeDisplayingInTheFields();
});

Given("Click on Process Now dropdown button", () => {
  addDocketEntryInputCasesActions.clickOnProcessNowDropdownButton();
});

Then("A drop down menu should appear", () => {
  addDocketEntryInputCasesActions.aDropDownMenuShouldAppear();
});

Given("Click on Add Docket under Docket Entries", () => {
  addDocketEntryInputCasesActions.clickOnAddDocketUnderDocketEntries();
});

Then("A Table sorter should display", () => {
  addDocketEntryInputCasesActions.aTableSorterShouldDisplay();
});

Given("Verify the tablesorter column Names", () => {
  addDocketEntryInputCasesActions.verifyTheTablesorterColumnNames();
});

Given("Click on Select All checkbox", () => {
  addDocketEntryInputCasesActions.clickOnSelectAllCheckbox();
});

Then(
  "All Case Id which are eligible should have their checkboxes checked",
  () => {
    addDocketEntryInputCasesActions.allCaseIdWhichAreEligibleShouldHaveTheirCheckboxesChecked();
  }
);

Given(
  "Verify that Case ID that are not eligible for the additon of a docket code has a message displaying in the message field",
  () => {
    addDocketEntryInputCasesActions.verifyThatCaseIDThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField();
  }
);

Then("The message field should a message regarding a reason", () => {
  addDocketEntryInputCasesActions.theMessageFieldShouldAMessageRegardingAReason();
});

Given("Click on Add Docket Information button", () => {
  addDocketEntryInputCasesActions.clickOnAddDocketInformationButton();
});

Then("The Add Docket window should display as a popup", () => {
  addDocketEntryInputCasesActions.theAddDocketWindowShouldDisplayAsAPopup();
});

Given("Enter the Docket Description and press enter", () => {
  addDocketEntryInputCasesActions.enterTheDocketDescriptionAndPressEnter();
});

Then(
  "The Docket Code should display in the Docket Description field and the additonal Docket Data collapsible tab will with a field called Amount of Bond set",
  () => {
    addDocketEntryInputCasesActions.theDocketCodeShouldDisplayInTheDocketDescriptionFieldAndTheAdditonalDocketDataCollapsibleTabWillWithAFieldCalledAmountOfBondSet();
  }
);

Given("Enter the additonal docket data in Unsecured Bond Amount", () => {
  addDocketEntryInputCasesActions.enterTheAdditonalDocketDataInUnsecuredBondAmount();
});

Then(
  "Both Search Docket Predefined and Unsecured bond amount will display the value",
  () => {
    addDocketEntryInputCasesActions.bothSearchDocketPredefinedAndUnsecuredBondAmountWillDisplayTheValue();
  }
);

Given("Enter a Filing Party in Filing Party field", () => {
  addDocketEntryInputCasesActions.enterAFilingPartyInFilingPartyField();
});

Then("The Filing Party will display in the Filing party field", () => {
  addDocketEntryInputCasesActions.theFilingPartyWillDisplayInTheFilingPartyField();
});

Given("Drag and Drop a file into the Drag Drop files Here", () => {
  addDocketEntryInputCasesActions.dragAndDropAFileIntoTheDragDropFilesHere();
});

Then("A file should attach PDF", () => {
  addDocketEntryInputCasesActions.aFileShouldAttachPDF();
});

Given("Click on Scan button", () => {
  addDocketEntryInputCasesActions.clickOnScanButton();
});

Then("The scanning feature should open", () => {
  addDocketEntryInputCasesActions.theScanningFeatureShouldOpen();
});

Given("Verify the Time field is displaying the correct time", () => {
  addDocketEntryInputCasesActions.verifyTheTimeFieldIsDisplayingTheCorrectTime();
});

Then("The time should be displayed in HHMMSSS format", () => {
  addDocketEntryInputCasesActions.theTimeShouldBeDisplayedInHHMMSSSFormat();
});

Given("Verify if the Docket Date is displaying the correct date", () => {
  addDocketEntryInputCasesActions.verifyIfTheDocketDateIsDisplayingTheCorrectDate();
});

Then("The date should be in MM DD YYYY format", () => {
  addDocketEntryInputCasesActions.theDateShouldBeInMMDDYYYYFormat();
});

Given("Click on Save and Apply to All", () => {
  addDocketEntryInputCasesActions.clickOnSaveAndApplyToAll();
});

Then(
  "A green noty will appear an stating the case ID and the Docket Code added to them",
  () => {
    addDocketEntryInputCasesActions.aGreenNotyWillAppearAnStatingTheCaseIDAndTheDocketCodeAddedToThem();
  }
);

Given("Click on X on the top right corner", () => {
  addDocketEntryInputCasesActions.clickOnXOnTheTopRightCorner();
});

Then("The window should close", () => {
  addDocketEntryInputCasesActions.theWindowShouldClose();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AddDocketEntryInputCasesActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "moreThanMCasesThatHaveADDFPCodeAddedToThem"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIdsUnderEnterCaseIdColumnInTheTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theCaseIDsShouldBeDisplayingInTheFields"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnProcessNowDropdownButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aDropDownMenuShouldAppear"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnAddDocketUnderDocketEntries"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aTableSorterShouldDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyTheTablesorterColumnNames"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnSelectAllCheckbox"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "allCaseIdWhichAreEligibleShouldHaveTheirCheckboxesChecked"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "verifyThatCaseIDThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theMessageFieldShouldAMessageRegardingAReason"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnAddDocketInformationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theAddDocketWindowShouldDisplayAsAPopup"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterTheDocketDescriptionAndPressEnter"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "theDocketCodeShouldDisplayInTheDocketDescriptionFieldAndTheAdditonalDocketDataCollapsibleTabWillWithAFieldCalledAmountOfBondSet"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterTheAdditonalDocketDataInUnsecuredBondAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "bothSearchDocketPredefinedAndUnsecuredBondAmountWillDisplayTheValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAFilingPartyInFilingPartyField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFilingPartyWillDisplayInTheFilingPartyField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "dragAndDropAFileIntoTheDragDropFilesHere"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aFileShouldAttachPDF"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnScanButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theScanningFeatureShouldOpen"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyTheTimeFieldIsDisplayingTheCorrectTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theTimeShouldBeDisplayedInHHMMSSSFormat"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyIfTheDocketDateIsDisplayingTheCorrectDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theDateShouldBeInMMDDYYYYFormat"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnSaveAndApplyToAll"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "aGreenNotyWillAppearAnStatingTheCaseIDAndTheDocketCodeAddedToThem"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnXOnTheTopRightCorner"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theWindowShouldClose"
  );
  cy.writeFile(
    "./differences/AddDocketEntryInputCasesActions.tmp",
    propertyNames
  );
}
