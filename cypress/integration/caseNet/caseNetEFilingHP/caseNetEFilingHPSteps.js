/// <reference types="cypress" />
import Utils from "../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CaseNetEFilingHPActions from "./CaseNetEFilingHPActions";
const caseNetEFilingHPActions = new CaseNetEFilingHPActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseNet/caseNetEFilingHP/caseNetEFilingHPFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "caseNetEFilingHP";
        cy.wrap(id).as("id");
        if ($jsonHandlerFile[id] === undefined) {
          $jsonHandlerFile[id] = dataFixture;
          cy.task("writeJsonHandlerFile", $jsonHandlerFile);
        }
      });
    }
  );
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

  let harPath = "caseNet/caseNetEFilingHP";
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

Given("Efile a Case", () => {
  caseNetEFilingHPActions.efileACase();
});

Given("Use the civil case from previous scenario", () => {
  caseNetEFilingHPActions.useTheCivilCaseFromPreviousScenario();
});

Given("Navigate to CaseNet and login", () => {
  caseNetEFilingHPActions.navigateToCaseNetAndLogin();
});

Then("User is logged in", () => {
  caseNetEFilingHPActions.userIsLoggedIn();
});

Given("Select option to search by case number", () => {
  caseNetEFilingHPActions.selectOptionToSearchByCaseNumber();
});

Then("Case number search form appears", () => {
  caseNetEFilingHPActions.caseNumberSearchFormAppears();
});

Given("Select location for search", () => {
  caseNetEFilingHPActions.selectLocationForSearch();
});

Given("Enter case number in search input", () => {
  caseNetEFilingHPActions.enterCaseNumberInSearchInput();
});

Given("Click the Find button", () => {
  caseNetEFilingHPActions.clickTheFindButton();
});

Then("Case Header appears", () => {
  caseNetEFilingHPActions.caseHeaderAppears();
});

Then("Validate Judge or Commissioner Assigned", () => {
  caseNetEFilingHPActions.validateJudgeOrCommissionerAssigned();
});

Then("Validate Date Filed", () => {
  caseNetEFilingHPActions.validateDateFiled();
});

Then("Validate Location", () => {
  caseNetEFilingHPActions.validateLocation();
});

Then("Validate Case Type", () => {
  caseNetEFilingHPActions.validateCaseType();
});

Then("Validate Disposition", () => {
  caseNetEFilingHPActions.validateDisposition();
});

Then("Validate Financial Information", () => {
  caseNetEFilingHPActions.validateFinancialInformation();
});

Then("Validate Track This Case", () => {
  caseNetEFilingHPActions.validateTrackThisCase();
});

Then("Validate Virtual Hearing Room", () => {
  caseNetEFilingHPActions.validateVirtualHearingRoom();
});

Given("Click Financial Information button", () => {
  caseNetEFilingHPActions.clickFinancialInformationButton();
});

Then("Financial Case Summary Appears", () => {
  caseNetEFilingHPActions.financialCaseSummaryAppears();
});

Given("Click Track This Case", () => {
  caseNetEFilingHPActions.clickTrackThisCase();
});

Then("New Tab Opens", () => {
  caseNetEFilingHPActions.newTabOpens();
});

Given("Click Virtual Hearing Room", () => {
  caseNetEFilingHPActions.clickVirtualHearingRoom();
});

Then("Redicts to Virtual Hearing Room Landing Page", () => {
  caseNetEFilingHPActions.redictsToVirtualHearingRoomLandingPage();
});

Given("Click Parties and Attorneys tab", () => {
  caseNetEFilingHPActions.clickPartiesAndAttorneysTab();
});

Then("Party tab appears", () => {
  caseNetEFilingHPActions.partyTabAppears();
});

Then("Validate Petitioner Plaintiff", () => {
  caseNetEFilingHPActions.validatePetitionerPlaintiff();
});

Then("Validate Attorney for Petitioner and Plainiff", () => {
  caseNetEFilingHPActions.validateAttorneyForPetitionerAndPlainiff();
});

Then("Validate Defendant and Respondant", () => {
  caseNetEFilingHPActions.validateDefendantAndRespondant();
});

Given("Click on Docket tab", () => {
  caseNetEFilingHPActions.clickOnDocketTab();
});

Given("Click on Document link", () => {
  caseNetEFilingHPActions.clickOnDocumentLink();
});

Then("Redirects to Fileviewer window", () => {
  caseNetEFilingHPActions.redirectsToFileviewerWindow();
});

Given("SMC must create a Summons", () => {
  caseNetEFilingHPActions.sMCMustCreateASummons();
});

Given("Click Service information", () => {
  caseNetEFilingHPActions.clickServiceInformation();
});

Then("Service Tab appears", () => {
  caseNetEFilingHPActions.serviceTabAppears();
});

Then("Validate Issuance Issued To", () => {
  caseNetEFilingHPActions.validateIssuanceIssuedTo();
});

Then("Validate Document issued", () => {
  caseNetEFilingHPActions.validateDocumentIssued();
});

Then("Date issued", () => {
  caseNetEFilingHPActions.dateIssued();
});

Then("Document ID", () => {
  caseNetEFilingHPActions.documentID();
});

Given("Click on Document ID link", () => {
  caseNetEFilingHPActions.clickOnDocumentIDLink();
});

Given("Validate Due Date", () => {
  caseNetEFilingHPActions.validateDueDate();
});

Given("SMC must return the service document", () => {
  caseNetEFilingHPActions.sMCMustReturnTheServiceDocument();
});

Given("Click on Service Information for return", () => {
  caseNetEFilingHPActions.clickOnServiceInformationForReturn();
});

Then("Validate return", () => {
  caseNetEFilingHPActions.validateReturn();
});

Then("Validate Type of Service", () => {
  caseNetEFilingHPActions.validateTypeOfService();
});

Then("Validate Service Attempt Date", () => {
  caseNetEFilingHPActions.validateServiceAttemptDate();
});

Then("Validate Served To", () => {
  caseNetEFilingHPActions.validateServedTo();
});

Given("SMC must schedule a hearing", () => {
  caseNetEFilingHPActions.sMCMustScheduleAHearing();
});

Given("Click on Scheduled Hearings and Trials tab", () => {
  caseNetEFilingHPActions.clickOnScheduledHearingsAndTrialsTab();
});

Then("Scheduled Hearing and Trials tab appears", () => {
  caseNetEFilingHPActions.scheduledHearingAndTrialsTabAppears();
});

Then("Validate Hearing date", () => {
  caseNetEFilingHPActions.validateHearingDate();
});

Then("Validate Judge or Commissioner", () => {
  caseNetEFilingHPActions.validateJudgeOrCommissioner();
});

Then("Validate Room", () => {
  caseNetEFilingHPActions.validateRoom();
});

Then("Validate Setting may not be one", () => {
  caseNetEFilingHPActions.validateSettingMayNotBeOne();
});

Then("Validate Event", () => {
  caseNetEFilingHPActions.validateEvent();
});

Given("Click on Virtual hearing link", () => {
  caseNetEFilingHPActions.clickOnVirtualHearingLink();
});

Then("Redricts to Virtual Hearing Room Landing Page", () => {
  caseNetEFilingHPActions.redrictsToVirtualHearingRoomLandingPage();
});

Then("Validate Time", () => {
  caseNetEFilingHPActions.validateTime();
});

Then("Validate Day", () => {
  caseNetEFilingHPActions.validateDay();
});

Then("Validate Address", () => {
  caseNetEFilingHPActions.validateAddress();
});

Then("Validate Event Text may not have text", () => {
  caseNetEFilingHPActions.validateEventTextMayNotHaveText();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CaseNetEFilingHPActions.prototype
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "efileACase");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useTheCivilCaseFromPreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "navigateToCaseNetAndLogin"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userIsLoggedIn"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectOptionToSearchByCaseNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseNumberSearchFormAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectLocationForSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseNumberInSearchInput"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheFindButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseHeaderAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateJudgeOrCommissionerAssigned"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDateFiled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFinancialInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTrackThisCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateVirtualHearingRoom"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickFinancialInformationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "financialCaseSummaryAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTrackThisCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newTabOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickVirtualHearingRoom"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "redictsToVirtualHearingRoomLandingPage"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPartiesAndAttorneysTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partyTabAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePetitionerPlaintiff"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAttorneyForPetitionerAndPlainiff"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDefendantAndRespondant"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocketTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocumentLink"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "redirectsToFileviewerWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "sMCMustCreateASummons"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickServiceInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "serviceTabAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateIssuanceIssuedTo"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocumentIssued"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "dateIssued");
  propertyNames = propertyNames.filter((funcName) => funcName !== "documentID");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDocumentIDLink"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDueDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "sMCMustReturnTheServiceDocument"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnServiceInformationForReturn"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateReturn"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTypeOfService"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateServiceAttemptDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateServedTo"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "sMCMustScheduleAHearing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnScheduledHearingsAndTrialsTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "scheduledHearingAndTrialsTabAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateHearingDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateJudgeOrCommissioner"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateRoom"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateSettingMayNotBeOne"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEvent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnVirtualHearingLink"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "redrictsToVirtualHearingRoomLandingPage"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAddress"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEventTextMayNotHaveText"
  );
  cy.writeFile("./differences/CaseNetEFilingHPActions.tmp", propertyNames);
}
