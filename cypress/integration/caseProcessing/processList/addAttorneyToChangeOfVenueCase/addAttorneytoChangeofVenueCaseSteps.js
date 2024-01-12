/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AddAttorneytoChangeofVenueCaseActions from "./AddAttorneytoChangeofVenueCaseActions";
const addAttorneytoChangeofVenueCaseActions =
  new AddAttorneytoChangeofVenueCaseActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/processList/addAttorneyToChangeOfVenueCase/addAttorneytoChangeofVenueCaseFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "addAttorneytoChangeofVenueCase";
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

  let harPath = "caseProcessing/processList/addAttorneyToChangeOfVenueCase";
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

Given("Create two criminal cases with change of venue status", () => {
  addAttorneytoChangeofVenueCaseActions.createTwoCriminalCasesWithChangeOfVenueStatus();
});

Given("Open SMC", () => {
  addAttorneytoChangeofVenueCaseActions.openSMC();
});

Then("The application launches", () => {
  addAttorneytoChangeofVenueCaseActions.theApplicationLaunches();
});

Given("Click on Case Processing Tab", () => {
  addAttorneytoChangeofVenueCaseActions.clickOnCaseProcessingTab();
});

Then("The business process unit", () => {
  addAttorneytoChangeofVenueCaseActions.theBusinessProcessUnit();
});

Given("Click on Process List", () => {
  addAttorneytoChangeofVenueCaseActions.clickOnProcessList();
});

Then("The submenu items", () => {
  addAttorneytoChangeofVenueCaseActions.theSubmenuItems();
});

Given("Select Input Case", () => {
  addAttorneytoChangeofVenueCaseActions.selectInputCase();
});

Then("Input Case Tab opens", () => {
  addAttorneytoChangeofVenueCaseActions.inputCaseTabOpens();
});

Given("Enter Case Id into the Enter Case Id field and press enter", () => {
  addAttorneytoChangeofVenueCaseActions.enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter();
});

Then("Case Id should display in the field", () => {
  addAttorneytoChangeofVenueCaseActions.caseIdShouldDisplayInTheField();
});

Given("Select Add Attorney from the process Now drop down button", () => {
  addAttorneytoChangeofVenueCaseActions.selectAddAttorneyFromTheProcessNowDropDownButton();
});

Then("Add Attorney", () => {
  addAttorneytoChangeofVenueCaseActions.addAttorney();
});

Given("Change party description field to APA", () => {
  addAttorneytoChangeofVenueCaseActions.changePartyDescriptionFieldToAPA();
});

Then("APA should be displayed", () => {
  addAttorneytoChangeofVenueCaseActions.aPAShouldBeDisplayed();
});

Given("Enter Attorney PIDM into the Attorney Search", () => {
  addAttorneytoChangeofVenueCaseActions.enterAttorneyPIDMIntoTheAttorneySearch();
});

Then("The name of the attorney and the PIDM should be displaying", () => {
  addAttorneytoChangeofVenueCaseActions.theNameOfTheAttorneyAndThePIDMShouldBeDisplaying();
});

Given("Backdate the start date in the start field", () => {
  addAttorneytoChangeofVenueCaseActions.backdateTheStartDateInTheStartField();
});

Then("The start date should be backdated", () => {
  addAttorneytoChangeofVenueCaseActions.theStartDateShouldBeBackdated();
});

Given("Click on Save Apply to All", () => {
  addAttorneytoChangeofVenueCaseActions.clickOnSaveApplyToAll();
});

Then(
  "A green confirmation noty should appear mentioning the Case Id and the",
  () => {
    addAttorneytoChangeofVenueCaseActions.aGreenConfirmationNotyShouldAppearMentioningTheCaseIdAndThe();
  }
);

Given("Verify if the Add Judicial Officer Dialogue window closes", () => {
  addAttorneytoChangeofVenueCaseActions.verifyIfTheAddJudicialOfficerDialogueWindowCloses();
});

Then("The window should close", () => {
  addAttorneytoChangeofVenueCaseActions.theWindowShouldClose();
});

Given("Click on x in the tab", () => {
  addAttorneytoChangeofVenueCaseActions.clickOnXInTheTab();
});

Then("The Process Closes", () => {
  addAttorneytoChangeofVenueCaseActions.theProcessCloses();
});

Given("Access SMC", () => {
  addAttorneytoChangeofVenueCaseActions.accessSMC();
});

Then("SMC app should load", () => {
  addAttorneytoChangeofVenueCaseActions.sMCAppShouldLoad();
});

Then("The left navigation menu bar loads", () => {
  addAttorneytoChangeofVenueCaseActions.theLeftNavigationMenuBarLoads();
});

Given("Click on Parties main menu option", () => {
  addAttorneytoChangeofVenueCaseActions.clickOnPartiesMainMenuOption();
});

Given("Select Maintain Case Parties from sub menu", () => {
  addAttorneytoChangeofVenueCaseActions.selectMaintainCasePartiesFromSubMenu();
});

Given("Enter Case ID into My Parties search and press enter", () => {
  addAttorneytoChangeofVenueCaseActions.enterCaseIDIntoMyPartiesSearchAndPressEnter();
});

Then("Table sorter loads", () => {
  addAttorneytoChangeofVenueCaseActions.tableSorterLoads();
});

Given("Expand Sub Case", () => {
  addAttorneytoChangeofVenueCaseActions.expandSubCase();
});

Given("Expand Case Parties Section and Validate the party name", () => {
  addAttorneytoChangeofVenueCaseActions.expandCasePartiesSectionAndValidateThePartyName();
});

Then("Party name and description must match to the previously added", () => {
  addAttorneytoChangeofVenueCaseActions.partyNameAndDescriptionMustMatchToThePreviouslyAdded();
});

Given("Enter second case Id into My Parties search and press enter", () => {
  addAttorneytoChangeofVenueCaseActions.enterSecondCaseIdIntoMyPartiesSearchAndPressEnter();
});

Given("Close Open tab", () => {
  addAttorneytoChangeofVenueCaseActions.closeOpenTab();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AddAttorneytoChangeofVenueCaseActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createTwoCriminalCasesWithChangeOfVenueStatus"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "openSMC");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theApplicationLaunches"
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
    (funcName) => funcName !== "addAttorney"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "changePartyDescriptionFieldToAPA"
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
      funcName !== "aGreenConfirmationNotyShouldAppearMentioningTheCaseIdAndThe"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "verifyIfTheAddJudicialOfficerDialogueWindowCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theWindowShouldClose"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnXInTheTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theProcessCloses"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "accessSMC");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "sMCAppShouldLoad"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theLeftNavigationMenuBarLoads"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnPartiesMainMenuOption"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectMaintainCasePartiesFromSubMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIDIntoMyPartiesSearchAndPressEnter"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "tableSorterLoads"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandSubCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandCasePartiesSectionAndValidateThePartyName"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "partyNameAndDescriptionMustMatchToThePreviouslyAdded"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterSecondCaseIdIntoMyPartiesSearchAndPressEnter"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeOpenTab"
  );
  cy.writeFile(
    "./differences/AddAttorneytoChangeofVenueCaseActions.tmp",
    propertyNames
  );
}
