/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CaseImportHappyPathActions from "./CaseImportHappyPathActions";
const caseImportHappyPathActions = new CaseImportHappyPathActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/caseImport/caseImportHappyPath/caseImportHappyPathFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "caseImportHappyPath";
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

  let harPath = "caseProcessing/caseImport/caseImportHappyPath";
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

Given("Create a case with PA Portal", () => {
  caseImportHappyPathActions.createACaseWithPAPortal();
});

Given("Login to the Jobs", () => {
  caseImportHappyPathActions.loginToTheJobs();
});

Given("Run the PA Portal job", () => {
  caseImportHappyPathActions.runThePAPortalJob();
});

Given("Use case created with PA Portal", () => {
  caseImportHappyPathActions.useCaseCreatedWithPAPortal();
});

Given("Click on Case Import from Case Processing", () => {
  caseImportHappyPathActions.clickOnCaseImportFromCaseProcessing();
});

Given(
  "Enter case ID or filing reference number in Filing RefConfirmation NoCase ID field",
  () => {
    caseImportHappyPathActions.enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField();
  }
);

Then("Case ID or filing reference number has been entered", () => {
  caseImportHappyPathActions.caseIDOrFilingReferenceNumberHasBeenEntered();
});

Given("Press Apply button", () => {
  caseImportHappyPathActions.pressApplyButton();
});

Then("Case appears in results", () => {
  caseImportHappyPathActions.caseAppearsInResults();
});

Given("Close tab", () => {
  caseImportHappyPathActions.closeTab();
});

Given("Expand case row in table", () => {
  caseImportHappyPathActions.expandCaseRowInTable();
});

Then("Case Info section displays", () => {
  caseImportHappyPathActions.caseInfoSectionDisplays();
});

Then("Validate Municipal Location", () => {
  caseImportHappyPathActions.validateMunicipalLocation();
});

Then("Validate Filing Date", () => {
  caseImportHappyPathActions.validateFilingDate();
});

Then("Validate Time", () => {
  caseImportHappyPathActions.validateTime();
});

Then("Validate Case Type", () => {
  caseImportHappyPathActions.validateCaseType();
});

Then("Validate Milestone", () => {
  caseImportHappyPathActions.validateMilestone();
});

Then("Validate Style of Case", () => {
  caseImportHappyPathActions.validateStyleOfCase();
});

Then("Validate Agency", () => {
  caseImportHappyPathActions.validateAgency();
});

Then("Validate Case Security", () => {
  caseImportHappyPathActions.validateCaseSecurity();
});

Then("Party tab displays and is selected", () => {
  caseImportHappyPathActions.partyTabDisplaysAndIsSelected();
});

Then("Validate Last Name", () => {
  caseImportHappyPathActions.validateLastName();
});

Then("Validate First Name", () => {
  caseImportHappyPathActions.validateFirstName();
});

Then("Validate Date of Birth", () => {
  caseImportHappyPathActions.validateDateOfBirth();
});

Then("Validate Street Address", () => {
  caseImportHappyPathActions.validateStreetAddress();
});

Then("Validate City", () => {
  caseImportHappyPathActions.validateCity();
});

Then("Validate Zip Code", () => {
  caseImportHappyPathActions.validateZipCode();
});

Given("Press Charge tab", () => {
  caseImportHappyPathActions.pressChargeTab();
});

Then("Validate Date of Violation", () => {
  caseImportHappyPathActions.validateDateOfViolation();
});

Then("Validate Violation Time", () => {
  caseImportHappyPathActions.validateViolationTime();
});

Then("Validate Location", () => {
  caseImportHappyPathActions.validateLocation();
});

Then("Validate Ticket Number", () => {
  caseImportHappyPathActions.validateTicketNumber();
});

Then("Validate Missouri Charge Number", () => {
  caseImportHappyPathActions.validateMissouriChargeNumber();
});

Given("Press Docket tab", () => {
  caseImportHappyPathActions.pressDocketTab();
});

Given("Expand docket entrys row", () => {
  caseImportHappyPathActions.expandDocketEntrysRow();
});

Then("Validate Docket Sequence", () => {
  caseImportHappyPathActions.validateDocketSequence();
});

Then("Validate Docket Code", () => {
  caseImportHappyPathActions.validateDocketCode();
});

Then("Validate Filed By", () => {
  caseImportHappyPathActions.validateFiledBy();
});

Then("Validate Document Number", () => {
  caseImportHappyPathActions.validateDocumentNumber();
});

Then("Validate Document Title", () => {
  caseImportHappyPathActions.validateDocumentTitle();
});

Given("Press Choose Action button", () => {
  caseImportHappyPathActions.pressChooseActionButton();
});

Then("Correct actions display", () => {
  caseImportHappyPathActions.correctActionsDisplay();
});

Given("Select Accept option", () => {
  caseImportHappyPathActions.selectAcceptOption();
});

Then("Accept Filing window displays", () => {
  caseImportHappyPathActions.acceptFilingWindowDisplays();
});

Given("Press Yes", () => {
  caseImportHappyPathActions.pressYes();
});

Then("Assign Judge Schedule Event window displays", () => {
  caseImportHappyPathActions.assignJudgeScheduleEventWindowDisplays();
});

Given("Change prorated dropdown to manual judge", () => {
  caseImportHappyPathActions.changeProratedDropdownToManualJudge();
});

Given("Select Cypress Judge", () => {
  caseImportHappyPathActions.selectCypressJudge();
});

Given("Press Select Judge button", () => {
  caseImportHappyPathActions.pressSelectJudgeButton();
});

Given("Enter Event Description", () => {
  caseImportHappyPathActions.enterEventDescription();
});

Then("Event Description selected", () => {
  caseImportHappyPathActions.eventDescriptionSelected();
});

Given("Enter future Event Date", () => {
  caseImportHappyPathActions.enterFutureEventDate();
});

Then("Validate event date", () => {
  caseImportHappyPathActions.validateEventDate();
});

Given("Enter Event Time", () => {
  caseImportHappyPathActions.enterEventTime();
});

Then("Validate event time", () => {
  caseImportHappyPathActions.validateEventTime();
});

Given("Enter Room", () => {
  caseImportHappyPathActions.enterRoom();
});

Then("Room selected", () => {
  caseImportHappyPathActions.roomSelected();
});

Given("Press Save Event", () => {
  caseImportHappyPathActions.pressSaveEvent();
});

Then("Assign Judge Schedule Event window closes", () => {
  caseImportHappyPathActions.assignJudgeScheduleEventWindowCloses();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CaseImportHappyPathActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createACaseWithPAPortal"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "loginToTheJobs"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "runThePAPortalJob"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useCaseCreatedWithPAPortal"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseImportFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDOrFilingReferenceNumberHasBeenEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressApplyButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseAppearsInResults"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "closeTab");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandCaseRowInTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseInfoSectionDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMunicipalLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFilingDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMilestone"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateStyleOfCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAgency"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseSecurity"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partyTabDisplaysAndIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDateOfBirth"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateStreetAddress"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCity"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateZipCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressChargeTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDateOfViolation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateViolationTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTicketNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMissouriChargeNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressDocketTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandDocketEntrysRow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocketSequence"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocketCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFiledBy"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocumentNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocumentTitle"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressChooseActionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "correctActionsDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAcceptOption"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "acceptFilingWindowDisplays"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "pressYes");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "assignJudgeScheduleEventWindowDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "changeProratedDropdownToManualJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCypressJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressSelectJudgeButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterEventDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventDescriptionSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFutureEventDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEventDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterEventTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEventTime"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterRoom");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "roomSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressSaveEvent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "assignJudgeScheduleEventWindowCloses"
  );
  cy.writeFile("./differences/CaseImportHappyPathActions.tmp", propertyNames);
}
