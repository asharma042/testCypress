/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AddDocketEntrySelectListActions from "./AddDocketEntrySelectListActions";
const addDocketEntrySelectListActions = new AddDocketEntrySelectListActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/processList/addDocketEntrySelectList/addDocketEntrySelectListFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "addDocketEntrySelectList";
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

  let harPath = "caseProcessing/processList/addDocketEntrySelectList";
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
  "Two are more criminal cases are needed and both the cases should be saved in a list",
  () => {
    addDocketEntrySelectListActions.twoAreMoreCriminalCasesAreNeededAndBothTheCasesShouldBeSavedInAList();
  }
);

Given("Select a list to under the Select column", () => {
  addDocketEntrySelectListActions.selectAListToUnderTheSelectColumn();
});

Then("The select checkbox should be active for that list", () => {
  addDocketEntrySelectListActions.theSelectCheckboxShouldBeActiveForThatList();
});

Given("Select Add Docket Entry from the dropdown", () => {
  addDocketEntrySelectListActions.selectAddDocketEntryFromTheDropdown();
});

Then(
  "Add Docket Entry should be displaying in the dropdown list and a table should generate",
  () => {
    addDocketEntrySelectListActions.addDocketEntryShouldBeDisplayingInTheDropdownListAndATableShouldGenerate();
  }
);

Given("Verify that blue noty is displayed", () => {
  addDocketEntrySelectListActions.verifyThatBlueNotyIsDisplayed();
});

Then("A blue noty should display along with a tablesorter", () => {
  addDocketEntrySelectListActions.aBlueNotyShouldDisplayAlongWithATablesorter();
});

Given("Verify the tablesorter column Names", () => {
  addDocketEntrySelectListActions.verifyTheTablesorterColumnNames();
});

Given("Click on Select All checkbox", () => {
  addDocketEntrySelectListActions.clickOnSelectAllCheckbox();
});

Then(
  "All Case Id which are eligible should have their checkboxes checked",
  () => {
    addDocketEntrySelectListActions.allCaseIdWhichAreEligibleShouldHaveTheirCheckboxesChecked();
  }
);

Given(
  "Verify that Case ID that are not eligible for the additon of a docket code has a message displaying in the message field",
  () => {
    addDocketEntrySelectListActions.verifyThatCaseIDThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField();
  }
);

Then("The message field should a message regarding a reason", () => {
  addDocketEntrySelectListActions.theMessageFieldShouldAMessageRegardingAReason();
});

Given("Click on Add Docket Information button", () => {
  addDocketEntrySelectListActions.clickOnAddDocketInformationButton();
});

Then("The Add Docket window should display as a popup", () => {
  addDocketEntrySelectListActions.theAddDocketWindowShouldDisplayAsAPopup();
});

Given("Enter the Docket Description and press enter", () => {
  addDocketEntrySelectListActions.enterTheDocketDescriptionAndPressEnter();
});

Then(
  "The Docket Code should display in the Docket Description field and the additonal Docket Data collapsible tab will with a field called Amount of Bond set",
  () => {
    addDocketEntrySelectListActions.theDocketCodeShouldDisplayInTheDocketDescriptionFieldAndTheAdditonalDocketDataCollapsibleTabWillWithAFieldCalledAmountOfBondSet();
  }
);

Given("Enter the additonal docket data in Unsecured Bond Amount", () => {
  addDocketEntrySelectListActions.enterTheAdditonalDocketDataInUnsecuredBondAmount();
});

Then(
  "Both Search Docket Predefined and Unsecured bond amount will display the value",
  () => {
    addDocketEntrySelectListActions.bothSearchDocketPredefinedAndUnsecuredBondAmountWillDisplayTheValue();
  }
);

Given("Enter a Filing Party in Filing Party field", () => {
  addDocketEntrySelectListActions.enterAFilingPartyInFilingPartyField();
});

Then("The Filing Party will display in the Filing party field", () => {
  addDocketEntrySelectListActions.theFilingPartyWillDisplayInTheFilingPartyField();
});

Given("Drag and Drop a file into the Drag Drop files Here", () => {
  addDocketEntrySelectListActions.dragAndDropAFileIntoTheDragDropFilesHere();
});

Then("A file should attach PDF", () => {
  addDocketEntrySelectListActions.aFileShouldAttachPDF();
});

Given("Click on Scan button", () => {
  addDocketEntrySelectListActions.clickOnScanButton();
});

Then("The scanning feature should open", () => {
  addDocketEntrySelectListActions.theScanningFeatureShouldOpen();
});

Given("Verify the Time field is displaying the correct time", () => {
  addDocketEntrySelectListActions.verifyTheTimeFieldIsDisplayingTheCorrectTime();
});

Then("The time should be displayed in HHMMSSS format", () => {
  addDocketEntrySelectListActions.theTimeShouldBeDisplayedInHHMMSSSFormat();
});

Given("Verify if the Docket Date is displaying the correct date", () => {
  addDocketEntrySelectListActions.verifyIfTheDocketDateIsDisplayingTheCorrectDate();
});

Then("The date should be in MM DD YYYY format", () => {
  addDocketEntrySelectListActions.theDateShouldBeInMMDDYYYYFormat();
});

Given("Click on Save and Apply to All", () => {
  addDocketEntrySelectListActions.clickOnSaveAndApplyToAll();
});

Then(
  "A green noty will appear an stating the case ID and the Docket Code added to them",
  () => {
    addDocketEntrySelectListActions.aGreenNotyWillAppearAnStatingTheCaseIDAndTheDocketCodeAddedToThem();
  }
);

Given("Click on X on the top right corner", () => {
  addDocketEntrySelectListActions.clickOnXOnTheTopRightCorner();
});

Then("The window should close", () => {
  addDocketEntrySelectListActions.theWindowShouldClose();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AddDocketEntrySelectListActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "twoAreMoreCriminalCasesAreNeededAndBothTheCasesShouldBeSavedInAList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAListToUnderTheSelectColumn"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theSelectCheckboxShouldBeActiveForThatList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAddDocketEntryFromTheDropdown"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "addDocketEntryShouldBeDisplayingInTheDropdownListAndATableShouldGenerate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "verifyThatBlueNotyIsDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aBlueNotyShouldDisplayAlongWithATablesorter"
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
    "./differences/AddDocketEntrySelectListActions.tmp",
    propertyNames
  );
}
