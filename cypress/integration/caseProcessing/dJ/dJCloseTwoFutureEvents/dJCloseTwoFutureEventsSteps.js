/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJCloseTwoFutureEventsActions from "./DJCloseTwoFutureEventsActions";
const dJCloseTwoFutureEventsActions = new DJCloseTwoFutureEventsActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/dj/dJCloseTwoFutureEvents/dJCloseTwoFutureEventsFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "dJCloseTwoFutureEvents";
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

  let harPath = "caseProcessing/dj/dJCloseTwoFutureEvents";
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

Given("Civil Case with litigant party types and add two Future Events", () => {
  dJCloseTwoFutureEventsActions.civilCaseWithLitigantPartyTypesAndAddTwoFutureEvents();
});

Given("Continue with civil case with litigant party types", () => {
  dJCloseTwoFutureEventsActions.continueWithCivilCaseWithLitigantPartyTypes();
});

Given("Click on Civil from Case Processing", () => {
  dJCloseTwoFutureEventsActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Disposition Judgment", () => {
  dJCloseTwoFutureEventsActions.clickOnDispositionJudgment();
});

Then("Case ID radio button is selected", () => {
  dJCloseTwoFutureEventsActions.caseIDRadioButtonIsSelected();
});

Given("Enter Civil Case ID in My Case ID Search", () => {
  dJCloseTwoFutureEventsActions.enterCivilCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJCloseTwoFutureEventsActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJCloseTwoFutureEventsActions.casesDisplayInTheCasesSection();
});

Given("Click Select All check box", () => {
  dJCloseTwoFutureEventsActions.clickSelectAllCheckBox();
});

Then("Enables Party Disposition drop down list", () => {
  dJCloseTwoFutureEventsActions.enablesPartyDispositionDropDownList();
});

Given("Click Pencil icon next to a case party record", () => {
  dJCloseTwoFutureEventsActions.clickPencilIconNextToACasePartyRecord();
});

Given("Select value from Party Disposition dropdown list", () => {
  dJCloseTwoFutureEventsActions.selectValueFromPartyDispositionDropdownList();
});

Given("Click Checkmark icon for the same case party record", () => {
  dJCloseTwoFutureEventsActions.clickCheckmarkIconForTheSameCasePartyRecord();
});

Then("Populates Party Diposition code for all case party records", () => {
  dJCloseTwoFutureEventsActions.populatesPartyDipositionCodeForAllCasePartyRecords();
});

Given("Click Save Case Parties Disposition button", () => {
  dJCloseTwoFutureEventsActions.clickSaveCasePartiesDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save",
  () => {
    dJCloseTwoFutureEventsActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }
);

Then("Case Party Disposition code is saved for selected case party", () => {
  dJCloseTwoFutureEventsActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
});

Given("Continue with civil case with all parties disposed", () => {
  dJCloseTwoFutureEventsActions.continueWithCivilCaseWithAllPartiesDisposed();
});

Given(
  "Case Disposition populates with DJV Jury Verdict Civil DISPLAY ONLY",
  () => {
    dJCloseTwoFutureEventsActions.caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY();
  }
);

Given("Case Disposition Date auto fills DISPLAY ONLY", () => {
  dJCloseTwoFutureEventsActions.caseDispositionDateAutoFillsDISPLAYONLY();
});

Given("Time field auto fills DISPLAY ONLY", () => {
  dJCloseTwoFutureEventsActions.timeFieldAutoFillsDISPLAYONLY();
});

Given("Enter text in Predefined Text field in Case Disposition section", () => {
  dJCloseTwoFutureEventsActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
});

Then("text displays in free text field", () => {
  dJCloseTwoFutureEventsActions.textDisplaysInFreeTextField();
});

Given("Click Save Disposition button", () => {
  dJCloseTwoFutureEventsActions.clickSaveDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save docket code and case id",
  () => {
    dJCloseTwoFutureEventsActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }
);

Then("Case Disposition code is saved for the case", () => {
  dJCloseTwoFutureEventsActions.caseDispositionCodeIsSavedForTheCase();
});

Then(
  "Civil Disposition Event Closure window displays with open future events",
  () => {
    dJCloseTwoFutureEventsActions.civilDispositionEventClosureWindowDisplaysWithOpenFutureEvents();
  }
);

Given("Click Close All Open Future Events button", () => {
  dJCloseTwoFutureEventsActions.clickCloseAllOpenFutureEventsButton();
});

Then(
  "Future event displays HRCAN Hearing Trial Cancelled with current date and time Past events remain open",
  () => {
    dJCloseTwoFutureEventsActions.futureEventDisplaysHRCANHearingTrialCancelledWithCurrentDateAndTimePastEventsRemainOpen();
  }
);

Given("Click Save", () => {
  dJCloseTwoFutureEventsActions.clickSave();
});

Then("green noty displays confirmation for events", () => {
  dJCloseTwoFutureEventsActions.greenNotyDisplaysConfirmationForEvents();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DJCloseTwoFutureEventsActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "civilCaseWithLitigantPartyTypesAndAddTwoFutureEvents"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "continueWithCivilCaseWithLitigantPartyTypes"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCivilFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnDispositionJudgment"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDRadioButtonIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCivilCaseIDInMyCaseIDSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickMagnifyingGlassIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "casesDisplayInTheCasesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSelectAllCheckBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enablesPartyDispositionDropDownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPencilIconNextToACasePartyRecord"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectValueFromPartyDispositionDropdownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCheckmarkIconForTheSameCasePartyRecord"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "populatesPartyDipositionCodeForAllCasePartyRecords"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveCasePartiesDispositionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "casePartyDispositionCodeIsSavedForSelectedCaseParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "continueWithCivilCaseWithAllPartiesDisposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseDispositionDateAutoFillsDISPLAYONLY"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "timeFieldAutoFillsDISPLAYONLY"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterTextInPredefinedTextFieldInCaseDispositionSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "textDisplaysInFreeTextField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveDispositionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseDispositionCodeIsSavedForTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "civilDispositionEventClosureWindowDisplaysWithOpenFutureEvents"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCloseAllOpenFutureEventsButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "futureEventDisplaysHRCANHearingTrialCancelledWithCurrentDateAndTimePastEventsRemainOpen"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickSave");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyDisplaysConfirmationForEvents"
  );
  cy.writeFile(
    "./differences/DJCloseTwoFutureEventsActions.tmp",
    propertyNames
  );
}
