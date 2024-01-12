/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AddAttorneyDisposedCaseActions from "./AddAttorneyDisposedCaseActions";
const addAttorneyDisposedCaseActions = new AddAttorneyDisposedCaseActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/processList/addAttorneyDisposedCase/addAttorneyDisposedCaseFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "addAttorneyDisposedCase";
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

  let harPath = "caseProcessing/processList/addAttorneyDisposedCase";
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

Given("Create or more disposed cases", () => {
  addAttorneyDisposedCaseActions.createOrMoreDisposedCases();
});

Given("Click on Case Processing Tab", () => {
  addAttorneyDisposedCaseActions.clickOnCaseProcessingTab();
});

Then("The business process unit", () => {
  addAttorneyDisposedCaseActions.theBusinessProcessUnit();
});

Given("Click on Process List", () => {
  addAttorneyDisposedCaseActions.clickOnProcessList();
});

Then("The submenu items", () => {
  addAttorneyDisposedCaseActions.theSubmenuItems();
});

Given("Select Input Case", () => {
  addAttorneyDisposedCaseActions.selectInputCase();
});

Then("Input Case Tab opens", () => {
  addAttorneyDisposedCaseActions.inputCaseTabOpens();
});

Given("Enter Case Id into the Enter Case Id field and press enter", () => {
  addAttorneyDisposedCaseActions.enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter();
});

Then("Case Id should display in the field", () => {
  addAttorneyDisposedCaseActions.caseIdShouldDisplayInTheField();
});

Given("Select Add Attorney from the process Now drop down button", () => {
  addAttorneyDisposedCaseActions.selectAddAttorneyFromTheProcessNowDropDownButton();
});

Then("Add Attorney should be highlighted", () => {
  addAttorneyDisposedCaseActions.addAttorneyShouldBeHighlighted();
});

Given("Change party description field to APA", () => {
  addAttorneyDisposedCaseActions.changePartyDescriptionFieldToAPA();
});

Then("APA should be displayed", () => {
  addAttorneyDisposedCaseActions.aPAShouldBeDisplayed();
});

Given("Enter Attorney PIDM into the Attorney Search", () => {
  addAttorneyDisposedCaseActions.enterAttorneyPIDMIntoTheAttorneySearch();
});

Then("The name of the attorney and the PIDM should be displaying", () => {
  addAttorneyDisposedCaseActions.theNameOfTheAttorneyAndThePIDMShouldBeDisplaying();
});

Given("Backdate the start date in the start field", () => {
  addAttorneyDisposedCaseActions.backdateTheStartDateInTheStartField();
});

Then("The start date should be backdated", () => {
  addAttorneyDisposedCaseActions.theStartDateShouldBeBackdated();
});

Given("Click on Save Apply to All", () => {
  addAttorneyDisposedCaseActions.clickOnSaveApplyToAll();
});

Then(
  "A green confirmation noty should appear mentioning the Case Id and the",
  () => {
    addAttorneyDisposedCaseActions.aGreenConfirmationNotyShouldAppearMentioningTheCaseIdAndThe();
  }
);

Given("Verify if the Add Judicial Officer Dialogue window closes", () => {
  addAttorneyDisposedCaseActions.verifyIfTheAddJudicialOfficerDialogueWindowCloses();
});

Then("The window should close", () => {
  addAttorneyDisposedCaseActions.theWindowShouldClose();
});

Given("Click on x in the tab", () => {
  addAttorneyDisposedCaseActions.clickOnXInTheTab();
});

Then("The Process Closes", () => {
  addAttorneyDisposedCaseActions.theProcessCloses();
});

Given("Access SMC", () => {
  addAttorneyDisposedCaseActions.accessSMC();
});

Then("SMC app should load", () => {
  addAttorneyDisposedCaseActions.sMCAppShouldLoad();
});

Then("The left navigation menu bar loads", () => {
  addAttorneyDisposedCaseActions.theLeftNavigationMenuBarLoads();
});

Given("Click on Parties main menu option", () => {
  addAttorneyDisposedCaseActions.clickOnPartiesMainMenuOption();
});

Given("Select Maintain Case Parties from sub menu", () => {
  addAttorneyDisposedCaseActions.selectMaintainCasePartiesFromSubMenu();
});

Given("Enter Case ID into My Parties search and press enter", () => {
  addAttorneyDisposedCaseActions.enterCaseIDIntoMyPartiesSearchAndPressEnter();
});

Then("Table sorter loads", () => {
  addAttorneyDisposedCaseActions.tableSorterLoads();
});

Given("Expand Case Parties Section and Validate the party name", () => {
  addAttorneyDisposedCaseActions.expandCasePartiesSectionAndValidateThePartyName();
});

Then("Party name and description must match to the previously added", () => {
  addAttorneyDisposedCaseActions.partyNameAndDescriptionMustMatchToThePreviouslyAdded();
});

Given("Close Open tab", () => {
  addAttorneyDisposedCaseActions.closeOpenTab();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AddAttorneyDisposedCaseActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createOrMoreDisposedCases"
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
    (funcName) => funcName !== "addAttorneyShouldBeHighlighted"
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
    (funcName) => funcName !== "expandCasePartiesSectionAndValidateThePartyName"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "partyNameAndDescriptionMustMatchToThePreviouslyAdded"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeOpenTab"
  );
  cy.writeFile(
    "./differences/AddAttorneyDisposedCaseActions.tmp",
    propertyNames
  );
}
