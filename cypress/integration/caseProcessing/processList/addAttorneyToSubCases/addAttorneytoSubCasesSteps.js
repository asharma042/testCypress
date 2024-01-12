/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AddAttorneytoSubCasesActions from "./AddAttorneytoSubCasesActions";
const addAttorneytoSubCasesActions = new AddAttorneytoSubCasesActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/processList/addAttorneyToSubCases/addAttorneytoSubCasesFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "addAttorneytoSubCases";
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

  let harPath = "caseProcessing/processList/addAttorneyToSubCases";
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

Given("Create subcases", () => {
  addAttorneytoSubCasesActions.createSubcases();
});

Given("Open SMC", () => {
  addAttorneytoSubCasesActions.openSMC();
});

Then("The application launches", () => {
  addAttorneytoSubCasesActions.theApplicationLaunches();
});

Given("Click on Case Processing Tab", () => {
  addAttorneytoSubCasesActions.clickOnCaseProcessingTab();
});

Then("The business process unit", () => {
  addAttorneytoSubCasesActions.theBusinessProcessUnit();
});

Given("Click on Process List", () => {
  addAttorneytoSubCasesActions.clickOnProcessList();
});

Then("The submenu items", () => {
  addAttorneytoSubCasesActions.theSubmenuItems();
});

Given("Select Input Case", () => {
  addAttorneytoSubCasesActions.selectInputCase();
});

Then("Input Case Tab opens", () => {
  addAttorneytoSubCasesActions.inputCaseTabOpens();
});

Given("Enter Case Id into the Enter Case Id field and press enter", () => {
  addAttorneytoSubCasesActions.enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter();
});

Then("Case Id should display in the field", () => {
  addAttorneytoSubCasesActions.caseIdShouldDisplayInTheField();
});

Given("Select Add Attorney from the process Now drop down button", () => {
  addAttorneytoSubCasesActions.selectAddAttorneyFromTheProcessNowDropDownButton();
});

Then("Add Attorney", () => {
  addAttorneytoSubCasesActions.addAttorney();
});

Given("Change party description field to APA", () => {
  addAttorneytoSubCasesActions.changePartyDescriptionFieldToAPA();
});

Then("APA should be displayed", () => {
  addAttorneytoSubCasesActions.aPAShouldBeDisplayed();
});

Given("Enter Attorney PIDM into the Attorney Search", () => {
  addAttorneytoSubCasesActions.enterAttorneyPIDMIntoTheAttorneySearch();
});

Then("The name of the attorney and the PIDM should be displaying", () => {
  addAttorneytoSubCasesActions.theNameOfTheAttorneyAndThePIDMShouldBeDisplaying();
});

Given("Backdate the start date in the start field", () => {
  addAttorneytoSubCasesActions.backdateTheStartDateInTheStartField();
});

Then("The start date should be backdated", () => {
  addAttorneytoSubCasesActions.theStartDateShouldBeBackdated();
});

Given("Click on Save Apply to All", () => {
  addAttorneytoSubCasesActions.clickOnSaveApplyToAll();
});

Then(
  "A green confirmation noty should appear mentioning the Case Id and the",
  () => {
    addAttorneytoSubCasesActions.aGreenConfirmationNotyShouldAppearMentioningTheCaseIdAndThe();
  }
);

Given("Verify if the Add Judicial Officer Dialogue window closes", () => {
  addAttorneytoSubCasesActions.verifyIfTheAddJudicialOfficerDialogueWindowCloses();
});

Then("The window should close", () => {
  addAttorneytoSubCasesActions.theWindowShouldClose();
});

Given("Click on x in the tab", () => {
  addAttorneytoSubCasesActions.clickOnXInTheTab();
});

Then("The Process Closes", () => {
  addAttorneytoSubCasesActions.theProcessCloses();
});

Given("Access SMC", () => {
  addAttorneytoSubCasesActions.accessSMC();
});

Then("SMC app should load", () => {
  addAttorneytoSubCasesActions.sMCAppShouldLoad();
});

Then("The left navigation menu bar loads", () => {
  addAttorneytoSubCasesActions.theLeftNavigationMenuBarLoads();
});

Given("Click on Parties main menu option", () => {
  addAttorneytoSubCasesActions.clickOnPartiesMainMenuOption();
});

Given("Select Maintain Case Parties from sub menu", () => {
  addAttorneytoSubCasesActions.selectMaintainCasePartiesFromSubMenu();
});

Given("Enter Case ID into My Parties search and press enter", () => {
  addAttorneytoSubCasesActions.enterCaseIDIntoMyPartiesSearchAndPressEnter();
});

Then("Table sorter loads", () => {
  addAttorneytoSubCasesActions.tableSorterLoads();
});

Given("Expand Sub Case", () => {
  addAttorneytoSubCasesActions.expandSubCase();
});

Given("Expand Case Parties Section and Validate the party name", () => {
  addAttorneytoSubCasesActions.expandCasePartiesSectionAndValidateThePartyName();
});

Then("Party name and description must match to the previously added", () => {
  addAttorneytoSubCasesActions.partyNameAndDescriptionMustMatchToThePreviouslyAdded();
});

Given("Enter second case Id into My Parties search and press enter", () => {
  addAttorneytoSubCasesActions.enterSecondCaseIdIntoMyPartiesSearchAndPressEnter();
});

Given("Close Open tab", () => {
  addAttorneytoSubCasesActions.closeOpenTab();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AddAttorneytoSubCasesActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createSubcases"
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
  cy.writeFile("./differences/AddAttorneytoSubCasesActions.tmp", propertyNames);
}
