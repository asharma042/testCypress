/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJScheduleFutureEventsActions from "./DJScheduleFutureEventsActions";
const dJScheduleFutureEventsActions = new DJScheduleFutureEventsActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/civilAndCriminal/dJScheduleFutureEvents/dJScheduleFutureEventsFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "dJScheduleFutureEvents";
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

  let harPath = "caseProcessing/civilAndCriminal/dJScheduleFutureEvents";
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

Given("Civil or Criminal Case", () => {
  dJScheduleFutureEventsActions.civilOrCriminalCase();
});

Given("Initial case must be created with at lease one party type", () => {
  dJScheduleFutureEventsActions.initialCaseMustBeCreatedWithAtLeaseOnePartyType();
});

Given("Click on Case Processing", () => {
  dJScheduleFutureEventsActions.clickOnCaseProcessing();
});

Given("Click on Scheduling", () => {
  dJScheduleFutureEventsActions.clickOnScheduling();
});

Then("Case ID radio button is selected", () => {
  dJScheduleFutureEventsActions.caseIDRadioButtonIsSelected();
});

Given("Enter Case ID in My Case ID Search", () => {
  dJScheduleFutureEventsActions.enterCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJScheduleFutureEventsActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJScheduleFutureEventsActions.casesDisplayInTheCasesSection();
});

Given("Click + to expand case informtion", () => {
  dJScheduleFutureEventsActions.clickToExpandCaseInformtion();
});

Given("expand Add Event section", () => {
  dJScheduleFutureEventsActions.expandAddEventSection();
});

Given("enter Event Description", () => {
  dJScheduleFutureEventsActions.enterEventDescription();
});

Then("CREV displays in event description field", () => {
  dJScheduleFutureEventsActions.cREVDisplaysInEventDescriptionField();
});

Given("enter Event Date", () => {
  dJScheduleFutureEventsActions.enterEventDate();
});

Then("displays in date field", () => {
  dJScheduleFutureEventsActions.displaysInDateField();
});

Given("enter Time", () => {
  dJScheduleFutureEventsActions.enterTime();
});

Then("displays in time field", () => {
  dJScheduleFutureEventsActions.displaysInTimeField();
});

Then("Add to Docket text box is checked", () => {
  dJScheduleFutureEventsActions.addToDocketTextBoxIsChecked();
});

Then("docket filing date displays current date", () => {
  dJScheduleFutureEventsActions.docketFilingDateDisplaysCurrentDate();
});

Then("docket time displays current time", () => {
  dJScheduleFutureEventsActions.docketTimeDisplaysCurrentTime();
});

Then("confirm check box is checked", () => {
  dJScheduleFutureEventsActions.confirmCheckBoxIsChecked();
});

Then("displays assigned judge", () => {
  dJScheduleFutureEventsActions.displaysAssignedJudge();
});

Given("enter room", () => {
  dJScheduleFutureEventsActions.enterRoom();
});

Then("room displays location for judge", () => {
  dJScheduleFutureEventsActions.roomDisplaysLocationForJudge();
});

Then("location displays AK Carter", () => {
  dJScheduleFutureEventsActions.locationDisplaysAKCarter();
});

Given("Click Save Event Information button", () => {
  dJScheduleFutureEventsActions.clickSaveEventInformationButton();
});

Then("noty displays success message", () => {
  dJScheduleFutureEventsActions.notyDisplaysSuccessMessage();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DJScheduleFutureEventsActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "civilOrCriminalCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "initialCaseMustBeCreatedWithAtLeaseOnePartyType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnScheduling"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDRadioButtonIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseIDInMyCaseIDSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickMagnifyingGlassIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "casesDisplayInTheCasesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToExpandCaseInformtion"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandAddEventSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterEventDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "cREVDisplaysInEventDescriptionField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterEventDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "displaysInDateField"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterTime");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "displaysInTimeField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addToDocketTextBoxIsChecked"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketFilingDateDisplaysCurrentDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketTimeDisplaysCurrentTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "confirmCheckBoxIsChecked"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "displaysAssignedJudge"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterRoom");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "roomDisplaysLocationForJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "locationDisplaysAKCarter"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveEventInformationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "notyDisplaysSuccessMessage"
  );
  cy.writeFile(
    "./differences/DJScheduleFutureEventsActions.tmp",
    propertyNames
  );
}
