/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJEditSavedPartiesDateTimeActions from "./DJEditSavedPartiesDateTimeActions";
const dJEditSavedPartiesDateTimeActions =
  new DJEditSavedPartiesDateTimeActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/dJ/dJEditSavedPartiesDateTime/dJEditSavedPartiesDateTimeFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "dJEditSavedPartiesDateTime";
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

  let harPath = "caseProcessing/dJ/dJEditSavedPartiesDateTime";
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
  dJEditSavedPartiesDateTimeActions.civilCaseWithLitigantPartyTypes();
});

Given("Continue with civil case with litigant party types", () => {
  dJEditSavedPartiesDateTimeActions.continueWithCivilCaseWithLitigantPartyTypes();
});

Given("Click on Civil from Case Processing", () => {
  dJEditSavedPartiesDateTimeActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Disposition Judgment", () => {
  dJEditSavedPartiesDateTimeActions.clickOnDispositionJudgment();
});

Then("Case ID radio button is selected", () => {
  dJEditSavedPartiesDateTimeActions.caseIDRadioButtonIsSelected();
});

Given("Enter Civil Case ID in My Case ID Search", () => {
  dJEditSavedPartiesDateTimeActions.enterCivilCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJEditSavedPartiesDateTimeActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJEditSavedPartiesDateTimeActions.casesDisplayInTheCasesSection();
});

Given("Click check box next to Select All", () => {
  dJEditSavedPartiesDateTimeActions.clickCheckBoxNextToSelectAll();
});

Then("Enables Party Disposition drop down list", () => {
  dJEditSavedPartiesDateTimeActions.enablesPartyDispositionDropDownList();
});

Given("Select value from Party Disposition dropdown list", () => {
  dJEditSavedPartiesDateTimeActions.selectValueFromPartyDispositionDropdownList();
});

Given("Click Checkmark icon for the same case party record", () => {
  dJEditSavedPartiesDateTimeActions.clickCheckmarkIconForTheSameCasePartyRecord();
});

Then("Populates Party Diposition code for Petitioner", () => {
  dJEditSavedPartiesDateTimeActions.populatesPartyDipositionCodeForPetitioner();
});

Given("Click Save Case Parties Disposition button", () => {
  dJEditSavedPartiesDateTimeActions.clickSaveCasePartiesDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save",
  () => {
    dJEditSavedPartiesDateTimeActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }
);

Then("Case Party Disposition code is saved for selected case party", () => {
  dJEditSavedPartiesDateTimeActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
});

Given("Must have a civil case with parties that are disposed.", () => {
  dJEditSavedPartiesDateTimeActions.mustHaveACivilCaseWithPartiesThatAreDisposed();
});

Given("Click Select All In Case Parties section", () => {
  dJEditSavedPartiesDateTimeActions.clickSelectAllInCasePartiesSection();
});

Given("Click pencil icon in Party Disposition Date", () => {
  dJEditSavedPartiesDateTimeActions.clickPencilIconInPartyDispositionDate();
});

Given("Click check mark to confirm", () => {
  dJEditSavedPartiesDateTimeActions.clickCheckMarkToConfirm();
});

Then("new date displays on all parties", () => {
  dJEditSavedPartiesDateTimeActions.newDateDisplaysOnAllParties();
});

Given("Click pencil icon in Time", () => {
  dJEditSavedPartiesDateTimeActions.clickPencilIconInTime();
});

Then("new time displays", () => {
  dJEditSavedPartiesDateTimeActions.newTimeDisplays();
});

Then("Clikc Save Case Parties Disposition", () => {
  dJEditSavedPartiesDateTimeActions.clikcSaveCasePartiesDisposition();
});

Then("new entries display", () => {
  dJEditSavedPartiesDateTimeActions.newEntriesDisplay();
});

Given(
  "Case Disposition populates with DTRCT Tried by Court Civil DISPLAY ONLY",
  () => {
    dJEditSavedPartiesDateTimeActions.caseDispositionPopulatesWithDTRCTTriedByCourtCivilDISPLAYONLY();
  }
);

Given("Case Disposition Date auto fills DISPLAY ONLY", () => {
  dJEditSavedPartiesDateTimeActions.caseDispositionDateAutoFillsDISPLAYONLY();
});

Given("Time field auto fills DISPLAY ONLY", () => {
  dJEditSavedPartiesDateTimeActions.timeFieldAutoFillsDISPLAYONLY();
});

Given("Enter text in Predefined Text field in Case Disposition section", () => {
  dJEditSavedPartiesDateTimeActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
});

Then("text displays in free text field", () => {
  dJEditSavedPartiesDateTimeActions.textDisplaysInFreeTextField();
});

Given("Click Save Disposition button", () => {
  dJEditSavedPartiesDateTimeActions.clickSaveDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save docket code and case id",
  () => {
    dJEditSavedPartiesDateTimeActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }
);

Then("Case Disposition code is saved for the case", () => {
  dJEditSavedPartiesDateTimeActions.caseDispositionCodeIsSavedForTheCase();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DJEditSavedPartiesDateTimeActions.prototype
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
    (funcName) => funcName !== "clickCheckBoxNextToSelectAll"
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
    (funcName) => funcName !== "mustHaveACivilCaseWithPartiesThatAreDisposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSelectAllInCasePartiesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPencilIconInPartyDispositionDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCheckMarkToConfirm"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newDateDisplaysOnAllParties"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPencilIconInTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newTimeDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clikcSaveCasePartiesDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newEntriesDisplay"
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
  cy.writeFile(
    "./differences/DJEditSavedPartiesDateTimeActions.tmp",
    propertyNames
  );
}
