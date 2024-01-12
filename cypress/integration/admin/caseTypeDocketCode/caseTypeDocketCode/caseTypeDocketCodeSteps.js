/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CaseTypeDocketCodeActions from "./CaseTypeDocketCodeActions";
const caseTypeDocketCodeActions = new CaseTypeDocketCodeActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `admin/caseTypeDocketCode/caseTypeDocketCode/caseTypeDocketCodeFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "caseTypeDocketCode";
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

  let harPath = "admin/caseTypeDocketCode/caseTypeDocketCode";
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
  caseTypeDocketCodeActions.clickOnAdmin();
});

Given("Click on Code Rule Setup in the business process menu", () => {
  caseTypeDocketCodeActions.clickOnCodeRuleSetupInTheBusinessProcessMenu();
});

Given("Click on Case Type Docket Code from the business process menu", () => {
  caseTypeDocketCodeActions.clickOnCaseTypeDocketCodeFromTheBusinessProcessMenu();
});

Then("Case Type Docket Code form opens", () => {
  caseTypeDocketCodeActions.caseTypeDocketCodeFormOpens();
});

Given("Select a Case TypePred Code", () => {
  caseTypeDocketCodeActions.selectACaseTypePredCode();
});

Given("Select a docket code from Docket Description", () => {
  caseTypeDocketCodeActions.selectADocketCodeFromDocketDescription();
});

Given("Select a Process", () => {
  caseTypeDocketCodeActions.selectAProcess();
});

Given("Enter Start Date", () => {
  caseTypeDocketCodeActions.enterStartDate();
});

Given("Click Add Docket Code button", () => {
  caseTypeDocketCodeActions.clickAddDocketCodeButton();
});

Then(
  "A new record is created for the case type pred code and process association",
  () => {
    caseTypeDocketCodeActions.aNewRecordIsCreatedForTheCaseTypePredCodeAndProcessAssociation();
  }
);

Given("Close Tab", () => {
  caseTypeDocketCodeActions.closeTab();
});

Given("Select multiple Case TypesPred Codes", () => {
  caseTypeDocketCodeActions.selectMultipleCaseTypesPredCodes();
});

Then(
  "A new record is created for each case type associated to the process",
  () => {
    caseTypeDocketCodeActions.aNewRecordIsCreatedForEachCaseTypeAssociatedToTheProcess();
  }
);

Then("Select multiple Processes", () => {
  caseTypeDocketCodeActions.selectMultipleProcesses();
});

Then(
  "A new record is created for each case type pred code associated to their respective process es",
  () => {
    caseTypeDocketCodeActions.aNewRecordIsCreatedForEachCaseTypePredCodeAssociatedToTheirRespectiveProcessEs();
  }
);

Given("Expand Filter Case TypeDocket Code Record section", () => {
  caseTypeDocketCodeActions.expandFilterCaseTypeDocketCodeRecordSection();
});

Given("Enter Case TypePred Code", () => {
  caseTypeDocketCodeActions.enterCaseTypePredCode();
});

Given("Enter Docket Description", () => {
  caseTypeDocketCodeActions.enterDocketDescription();
});

Given("Enter Process", () => {
  caseTypeDocketCodeActions.enterProcess();
});

Given("Click Filter Records button", () => {
  caseTypeDocketCodeActions.clickFilterRecordsButton();
});

Then(
  "Correct results based on filter criteria display in View Update Case Type Docket Code Process Rules table",
  () => {
    caseTypeDocketCodeActions.correctResultsBasedOnFilterCriteriaDisplayInViewUpdateCaseTypeDocketCodeProcessRulesTable();
  }
);

Given(
  "Click on Update icon pencil for selected docket code in the table",
  () => {
    caseTypeDocketCodeActions.clickOnUpdateIconPencilForSelectedDocketCodeInTheTable();
  }
);

Then(
  "The fields become editable Accept button check mark becomes available to the right of the field Cancel button {string} button becomes available to the right of the Accept button",
  (option0) => {
    caseTypeDocketCodeActions.theFieldsBecomeEditableAcceptButtonCheckMarkBecomesAvailableToTheRightOfTheFieldCancelButtonButtonBecomesAvailableToTheRightOfTheAcceptButton(
      option0
    );
  }
);

Given(
  "Select new process to associate the docket code to from the Process drop down list",
  () => {
    caseTypeDocketCodeActions.selectNewProcessToAssociateTheDocketCodeToFromTheProcessDropDownList();
  }
);

Given("Press Accept Process Edit button", () => {
  caseTypeDocketCodeActions.pressAcceptProcessEditButton();
});

Then("Updated Process is accepted for the record and saved", () => {
  caseTypeDocketCodeActions.updatedProcessIsAcceptedForTheRecordAndSaved();
});

Given("Select new end date for the edited record", () => {
  caseTypeDocketCodeActions.selectNewEndDateForTheEditedRecord();
});

Given("Press Accept button", () => {
  caseTypeDocketCodeActions.pressAcceptButton();
});

Given("Clear Test Records", () => {
  caseTypeDocketCodeActions.clearTestRecords();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CaseTypeDocketCodeActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnAdmin"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCodeRuleSetupInTheBusinessProcessMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickOnCaseTypeDocketCodeFromTheBusinessProcessMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseTypeDocketCodeFormOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectACaseTypePredCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectADocketCodeFromDocketDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAProcess"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterStartDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAddDocketCodeButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "aNewRecordIsCreatedForTheCaseTypePredCodeAndProcessAssociation"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "closeTab");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectMultipleCaseTypesPredCodes"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "aNewRecordIsCreatedForEachCaseTypeAssociatedToTheProcess"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectMultipleProcesses"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "aNewRecordIsCreatedForEachCaseTypePredCodeAssociatedToTheirRespectiveProcessEs"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandFilterCaseTypeDocketCodeRecordSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseTypePredCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDocketDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterProcess"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickFilterRecordsButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "correctResultsBasedOnFilterCriteriaDisplayInViewUpdateCaseTypeDocketCodeProcessRulesTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickOnUpdateIconPencilForSelectedDocketCodeInTheTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "theFieldsBecomeEditableAcceptButtonCheckMarkBecomesAvailableToTheRightOfTheFieldCancelButtonButtonBecomesAvailableToTheRightOfTheAcceptButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "selectNewProcessToAssociateTheDocketCodeToFromTheProcessDropDownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressAcceptProcessEditButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updatedProcessIsAcceptedForTheRecordAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectNewEndDateForTheEditedRecord"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressAcceptButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clearTestRecords"
  );
  cy.writeFile("./differences/CaseTypeDocketCodeActions.tmp", propertyNames);
}
