/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJCloseFutureEventsonlyActions from "./DJCloseFutureEventsonlyActions";
const dJCloseFutureEventsonlyActions = new DJCloseFutureEventsonlyActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/dj/dJCloseFutureEventsOnly/dJCloseFutureEventsonlyFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "dJCloseFutureEventsonly";
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

  let harPath = "caseProcessing/dj/dJCloseFutureEventsOnly";
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

Given("Civil Case with litigant party types and add Future Event", () => {
  dJCloseFutureEventsonlyActions.civilCaseWithLitigantPartyTypesAndAddFutureEvent();
});

Given("Continue with civil case with litigant party types", () => {
  dJCloseFutureEventsonlyActions.continueWithCivilCaseWithLitigantPartyTypes();
});

Given("Click on Civil from Case Processing", () => {
  dJCloseFutureEventsonlyActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Disposition Judgment", () => {
  dJCloseFutureEventsonlyActions.clickOnDispositionJudgment();
});

Then("Case ID radio button is selected", () => {
  dJCloseFutureEventsonlyActions.caseIDRadioButtonIsSelected();
});

Given("Enter Civil Case ID in My Case ID Search", () => {
  dJCloseFutureEventsonlyActions.enterCivilCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJCloseFutureEventsonlyActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJCloseFutureEventsonlyActions.casesDisplayInTheCasesSection();
});

Given("Click Select All check box", () => {
  dJCloseFutureEventsonlyActions.clickSelectAllCheckBox();
});

Then("Enables Party Disposition drop down list", () => {
  dJCloseFutureEventsonlyActions.enablesPartyDispositionDropDownList();
});

Given("Click Pencil icon next to a case party record", () => {
  dJCloseFutureEventsonlyActions.clickPencilIconNextToACasePartyRecord();
});

Given("Select value from Party Disposition dropdown list", () => {
  dJCloseFutureEventsonlyActions.selectValueFromPartyDispositionDropdownList();
});

Given("Click Checkmark icon for the same case party record", () => {
  dJCloseFutureEventsonlyActions.clickCheckmarkIconForTheSameCasePartyRecord();
});

Then("Populates Party Diposition code for all case party records", () => {
  dJCloseFutureEventsonlyActions.populatesPartyDipositionCodeForAllCasePartyRecords();
});

Given("Click Save Case Parties Disposition button", () => {
  dJCloseFutureEventsonlyActions.clickSaveCasePartiesDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save",
  () => {
    dJCloseFutureEventsonlyActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }
);

Then("Case Party Disposition code is saved for selected case party", () => {
  dJCloseFutureEventsonlyActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
});

Given("Continue with civil case with all parties disposed", () => {
  dJCloseFutureEventsonlyActions.continueWithCivilCaseWithAllPartiesDisposed();
});

Given(
  "Case Disposition populates with DJV Jury Verdict Civil DISPLAY ONLY",
  () => {
    dJCloseFutureEventsonlyActions.caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY();
  }
);

Given("Case Disposition Date auto fills DISPLAY ONLY", () => {
  dJCloseFutureEventsonlyActions.caseDispositionDateAutoFillsDISPLAYONLY();
});

Given("Time field auto fills DISPLAY ONLY", () => {
  dJCloseFutureEventsonlyActions.timeFieldAutoFillsDISPLAYONLY();
});

Given("Enter text in Predefined Text field in Case Disposition section", () => {
  dJCloseFutureEventsonlyActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
});

Then("text displays in free text field", () => {
  dJCloseFutureEventsonlyActions.textDisplaysInFreeTextField();
});

Given("Click Save Disposition button", () => {
  dJCloseFutureEventsonlyActions.clickSaveDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save docket code and case id",
  () => {
    dJCloseFutureEventsonlyActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }
);

Then("Case Disposition code is saved for the case", () => {
  dJCloseFutureEventsonlyActions.caseDispositionCodeIsSavedForTheCase();
});

Then(
  "Civil Disposition Event Closure window displays with open future events",
  () => {
    dJCloseFutureEventsonlyActions.civilDispositionEventClosureWindowDisplaysWithOpenFutureEvents();
  }
);

Given("Click Close All Open Future Events button", () => {
  dJCloseFutureEventsonlyActions.clickCloseAllOpenFutureEventsButton();
});

Then(
  "Future event displays HRCAN Hearing Trial Cancelled with current date and time Past events remain open",
  () => {
    dJCloseFutureEventsonlyActions.futureEventDisplaysHRCANHearingTrialCancelledWithCurrentDateAndTimePastEventsRemainOpen();
  }
);

Given("Click Save", () => {
  dJCloseFutureEventsonlyActions.clickSave();
});

Then("green noty displays confirmation for events", () => {
  dJCloseFutureEventsonlyActions.greenNotyDisplaysConfirmationForEvents();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DJCloseFutureEventsonlyActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "civilCaseWithLitigantPartyTypesAndAddFutureEvent"
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
    "./differences/DJCloseFutureEventsonlyActions.tmp",
    propertyNames
  );
}
