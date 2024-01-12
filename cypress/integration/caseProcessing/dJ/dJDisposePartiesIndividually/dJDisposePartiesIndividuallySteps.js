/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJDisposePartiesIndividuallyActions from "./DJDisposePartiesIndividuallyActions";
const dJDisposePartiesIndividuallyActions =
  new DJDisposePartiesIndividuallyActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/dJ/dJDisposePartiesIndividually/dJDisposePartiesIndividuallyFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "dJDisposePartiesIndividually";
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

  let harPath = "caseProcessing/dJ/dJDisposePartiesIndividually";
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

Given("Civil Case with litigant party types", () => {
  dJDisposePartiesIndividuallyActions.civilCaseWithLitigantPartyTypes();
});

Given("Continue with civil case with litigant party types", () => {
  dJDisposePartiesIndividuallyActions.continueWithCivilCaseWithLitigantPartyTypes();
});

Given("Click on Civil from Case Processing", () => {
  dJDisposePartiesIndividuallyActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Disposition Judgment", () => {
  dJDisposePartiesIndividuallyActions.clickOnDispositionJudgment();
});

Then("Case ID radio button is selected", () => {
  dJDisposePartiesIndividuallyActions.caseIDRadioButtonIsSelected();
});

Given("Enter Civil Case ID in My Case ID Search", () => {
  dJDisposePartiesIndividuallyActions.enterCivilCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJDisposePartiesIndividuallyActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJDisposePartiesIndividuallyActions.casesDisplayInTheCasesSection();
});

Given("Click check box next to one party", () => {
  dJDisposePartiesIndividuallyActions.clickCheckBoxNextToOneParty();
});

Then("Enables Party Disposition drop down list", () => {
  dJDisposePartiesIndividuallyActions.enablesPartyDispositionDropDownList();
});

Given("Select value from Party Disposition dropdown list", () => {
  dJDisposePartiesIndividuallyActions.selectValueFromPartyDispositionDropdownList();
});

Given("Click Checkmark icon for the same case party record", () => {
  dJDisposePartiesIndividuallyActions.clickCheckmarkIconForTheSameCasePartyRecord();
});

Then("Populates Party Diposition code for Petitioner", () => {
  dJDisposePartiesIndividuallyActions.populatesPartyDipositionCodeForPetitioner();
});

Given("Click Save Case Parties Disposition button", () => {
  dJDisposePartiesIndividuallyActions.clickSaveCasePartiesDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save",
  () => {
    dJDisposePartiesIndividuallyActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }
);

Then("Case Party Disposition code is saved for selected case party", () => {
  dJDisposePartiesIndividuallyActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
});

Then("Unable to proceed to case disposition", () => {
  dJDisposePartiesIndividuallyActions.unableToProceedToCaseDisposition();
});

Given("Refresh Case", () => {
  dJDisposePartiesIndividuallyActions.refreshCase();
});

Then("Populates Party Diposition code for Respondent", () => {
  dJDisposePartiesIndividuallyActions.populatesPartyDipositionCodeForRespondent();
});

Given("Continue with civil case with all parties disposed", () => {
  dJDisposePartiesIndividuallyActions.continueWithCivilCaseWithAllPartiesDisposed();
});

Given(
  "Case Disposition populates with DTRCT Tried by Court Civil DISPLAY ONLY",
  () => {
    dJDisposePartiesIndividuallyActions.caseDispositionPopulatesWithDTRCTTriedByCourtCivilDISPLAYONLY();
  }
);

Given("Case Disposition Date auto fills DISPLAY ONLY", () => {
  dJDisposePartiesIndividuallyActions.caseDispositionDateAutoFillsDISPLAYONLY();
});

Given("Time field auto fills DISPLAY ONLY", () => {
  dJDisposePartiesIndividuallyActions.timeFieldAutoFillsDISPLAYONLY();
});

Given("Enter text in Predefined Text field in Case Disposition section", () => {
  dJDisposePartiesIndividuallyActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
});

Then("text displays in free text field", () => {
  dJDisposePartiesIndividuallyActions.textDisplaysInFreeTextField();
});

Given("Click Save Disposition button", () => {
  dJDisposePartiesIndividuallyActions.clickSaveDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save docket code and case id",
  () => {
    dJDisposePartiesIndividuallyActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }
);

Then("Case Disposition code is saved for the case", () => {
  dJDisposePartiesIndividuallyActions.caseDispositionCodeIsSavedForTheCase();
});

Given("Civil Disposition Event Closure Window opens", () => {
  dJDisposePartiesIndividuallyActions.civilDispositionEventClosureWindowOpens();
});

Given("Event Description display only", () => {
  dJDisposePartiesIndividuallyActions.eventDescriptionDisplayOnly();
});

Given("Event Date display only", () => {
  dJDisposePartiesIndividuallyActions.eventDateDisplayOnly();
});

Given("Time display only", () => {
  dJDisposePartiesIndividuallyActions.timeDisplayOnly();
});

Given("Event Outcome HRCANHEARINGTRIAL CANCELLED", () => {
  dJDisposePartiesIndividuallyActions.eventOutcomeHRCANHEARINGTRIALCANCELLED();
});

Given("Event Closing date displays current date", () => {
  dJDisposePartiesIndividuallyActions.eventClosingDateDisplaysCurrentDate();
});

Given("Event Closing Time displays current time", () => {
  dJDisposePartiesIndividuallyActions.eventClosingTimeDisplaysCurrentTime();
});

Given("Click Save to save Event information", () => {
  dJDisposePartiesIndividuallyActions.clickSaveToSaveEventInformation();
});

Then("Green noty displays confirming disposition saved", () => {
  dJDisposePartiesIndividuallyActions.greenNotyDisplaysConfirmingDispositionSaved();
});

Then("Green noty displays confirming HRCAN saved", () => {
  dJDisposePartiesIndividuallyActions.greenNotyDisplaysConfirmingHRCANSaved();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DJDisposePartiesIndividuallyActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "civilCaseWithLitigantPartyTypes"
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
    (funcName) => funcName !== "clickCheckBoxNextToOneParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enablesPartyDispositionDropDownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectValueFromPartyDispositionDropdownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCheckmarkIconForTheSameCasePartyRecord"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "populatesPartyDipositionCodeForPetitioner"
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
    (funcName) => funcName !== "unableToProceedToCaseDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "refreshCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "populatesPartyDipositionCodeForRespondent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "continueWithCivilCaseWithAllPartiesDisposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseDispositionPopulatesWithDTRCTTriedByCourtCivilDISPLAYONLY"
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
    (funcName) => funcName !== "civilDispositionEventClosureWindowOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventDescriptionDisplayOnly"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventDateDisplayOnly"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "timeDisplayOnly"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventOutcomeHRCANHEARINGTRIALCANCELLED"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventClosingDateDisplaysCurrentDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventClosingTimeDisplaysCurrentTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveToSaveEventInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyDisplaysConfirmingDispositionSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyDisplaysConfirmingHRCANSaved"
  );
  cy.writeFile(
    "./differences/DJDisposePartiesIndividuallyActions.tmp",
    propertyNames
  );
}
