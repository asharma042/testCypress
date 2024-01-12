/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import OfficerSetupActions from "./OfficerSetupActions";
const officerSetupActions = new OfficerSetupActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `admin/blockScheduling/officerSetup/officerSetupFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "officerSetup";
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

  let harPath = "admin/blockScheduling/officerSetup";
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

Given("Click on Admin", () => {
  officerSetupActions.clickOnAdmin();
});

Given("Click on Block Scheduling from the business process menu", () => {
  officerSetupActions.clickOnBlockSchedulingFromTheBusinessProcessMenu();
});

Given("Click on Officer Setup from the business process menu", () => {
  officerSetupActions.clickOnOfficerSetupFromTheBusinessProcessMenu();
});

Then("Officer Setup form opens", () => {
  officerSetupActions.officerSetupFormOpens();
});

Given("Click on Create Officer Setup button", () => {
  officerSetupActions.clickOnCreateOfficerSetupButton();
});

Then("Officer Setup window opens", () => {
  officerSetupActions.officerSetupWindowOpens();
});

Given("Enter Create Location", () => {
  officerSetupActions.enterCreateLocation();
});

Then("Required field", () => {
  officerSetupActions.requiredField();
});

Given("Enter Create Arresting Agency", () => {
  officerSetupActions.enterCreateArrestingAgency();
});

Given("Enter Create Last Name", () => {
  officerSetupActions.enterCreateLastName();
});

Given("Enter Create First Name", () => {
  officerSetupActions.enterCreateFirstName();
});

Given("Enter Create Officer Badge", () => {
  officerSetupActions.enterCreateOfficerBadge();
});

Given("Enter Create Group Number", () => {
  officerSetupActions.enterCreateGroupNumber();
});

Given("Click Create button", () => {
  officerSetupActions.clickCreateButton();
});

Then("New record based on information entered is created and saved", () => {
  officerSetupActions.newRecordBasedOnInformationEnteredIsCreatedAndSaved();
});

Given("Officer setup record has been created.", () => {
  officerSetupActions.officerSetupRecordHasBeenCreated();
});

Given(
  "Enter filter criteria to search for exsiting records in Filter Officer Setup Records section",
  () => {
    officerSetupActions.enterFilterCriteriaToSearchForExsitingRecordsInFilterOfficerSetupRecordsSection();
  }
);

Given("Press Search Officers button", () => {
  officerSetupActions.pressSearchOfficersButton();
});

Then(
  "Records based on filter criteria are returned and displayed in the View Update Officer Setup Records",
  () => {
    officerSetupActions.recordsBasedOnFilterCriteriaAreReturnedAndDisplayedInTheViewUpdateOfficerSetupRecords();
  }
);

Given("Press Edit icon for the selected record in the table", () => {
  officerSetupActions.pressEditIconForTheSelectedRecordInTheTable();
});

Then("The fields become editable", () => {
  officerSetupActions.theFieldsBecomeEditable();
});

Given("Update Event Location", () => {
  officerSetupActions.updateEventLocation();
});

Then(
  "Accept button becomes available to the right of the field Cancel button becomes available to the right of the Accept button",
  () => {
    officerSetupActions.acceptButtonBecomesAvailableToTheRightOfTheFieldCancelButtonBecomesAvailableToTheRightOfTheAcceptButton();
  }
);

Given("Press Accept button", () => {
  officerSetupActions.pressAcceptButton();
});

Then("Updated Event item is accepted and saved", () => {
  officerSetupActions.updatedEventItemIsAcceptedAndSaved();
});

Given("Update Arresting Agency", () => {
  officerSetupActions.updateArrestingAgency();
});

Then("Updated Arresting Agency is accepted and saved", () => {
  officerSetupActions.updatedArrestingAgencyIsAcceptedAndSaved();
});

Given("Update Last Name", () => {
  officerSetupActions.updateLastName();
});

Then("Updated Last Name is accepted and saved", () => {
  officerSetupActions.updatedLastNameIsAcceptedAndSaved();
});

Given("Update First Name", () => {
  officerSetupActions.updateFirstName();
});

Then("Updated First Name is accepted and saved", () => {
  officerSetupActions.updatedFirstNameIsAcceptedAndSaved();
});

Given("Update Officer Badge", () => {
  officerSetupActions.updateOfficerBadge();
});

Then("Updated Officer Badge is accepted and saved", () => {
  officerSetupActions.updatedOfficerBadgeIsAcceptedAndSaved();
});

Given("Update Group Number", () => {
  officerSetupActions.updateGroupNumber();
});

Then("Updated Group number is accepted and saved", () => {
  officerSetupActions.updatedGroupNumberIsAcceptedAndSaved();
});

Given("Update End Date", () => {
  officerSetupActions.updateEndDate();
});

Then("Updated End Date is accepted and saved", () => {
  officerSetupActions.updatedEndDateIsAcceptedAndSaved();
});

Then("Enter Location", () => {
  officerSetupActions.enterLocation();
});

Given("Click Clear Button", () => {
  officerSetupActions.clickClearButton();
});

Given("Enter Arresting Agency", () => {
  officerSetupActions.enterArrestingAgency();
});

Given("Enter Last Name", () => {
  officerSetupActions.enterLastName();
});

Given("Enter First Name", () => {
  officerSetupActions.enterFirstName();
});

Given("Enter Officer Badge", () => {
  officerSetupActions.enterOfficerBadge();
});

Given("Enter Group Number", () => {
  officerSetupActions.enterGroupNumber();
});

Given("Finish Test", () => {
  officerSetupActions.finishTest();
});

Given("Press Trash icon for the selected record in the table", () => {
  officerSetupActions.pressTrashIconForTheSelectedRecordInTheTable();
});

Then("Popup message displays {string}", (option0) => {
  officerSetupActions.popupMessageDisplays(option0);
});

Given("Press {string} button in window", (option0) => {
  officerSetupActions.pressButtonInWindow(option0);
});

Then("Officer record is deleted", () => {
  officerSetupActions.officerRecordIsDeleted();
});

Then("Setup Data for Search", () => {
  officerSetupActions.setupDataForSearch();
});

Then("Enter Wildcard Last Name", () => {
  officerSetupActions.enterWildcardLastName();
});

Then("Enter Wildcard First Name", () => {
  officerSetupActions.enterWildcardFirstName();
});

Then("Enter Wildcard Officer Badge", () => {
  officerSetupActions.enterWildcardOfficerBadge();
});

Then("Remove Test Records", () => {
  officerSetupActions.removeTestRecords();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(OfficerSetupActions.prototype);
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnAdmin"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickOnBlockSchedulingFromTheBusinessProcessMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnOfficerSetupFromTheBusinessProcessMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "officerSetupFormOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCreateOfficerSetupButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "officerSetupWindowOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCreateLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "requiredField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCreateArrestingAgency"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCreateLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCreateFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCreateOfficerBadge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCreateGroupNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCreateButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "newRecordBasedOnInformationEnteredIsCreatedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "officerSetupRecordHasBeenCreated"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "enterFilterCriteriaToSearchForExsitingRecordsInFilterOfficerSetupRecordsSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressSearchOfficersButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "recordsBasedOnFilterCriteriaAreReturnedAndDisplayedInTheViewUpdateOfficerSetupRecords"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressEditIconForTheSelectedRecordInTheTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFieldsBecomeEditable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateEventLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "acceptButtonBecomesAvailableToTheRightOfTheFieldCancelButtonBecomesAvailableToTheRightOfTheAcceptButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressAcceptButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedEventItemIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateArrestingAgency"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedArrestingAgencyIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedLastNameIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedFirstNameIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateOfficerBadge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedOfficerBadgeIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateGroupNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedGroupNumberIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateEndDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedEndDateIsAcceptedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickClearButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterArrestingAgency"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterOfficerBadge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterGroupNumber"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "finishTest");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressTrashIconForTheSelectedRecordInTheTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "popupMessageDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressButtonInWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "officerRecordIsDeleted"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "setupDataForSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterWildcardLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterWildcardFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterWildcardOfficerBadge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "removeTestRecords"
  );
  cy.writeFile("./differences/OfficerSetupActions.tmp", propertyNames);
}
