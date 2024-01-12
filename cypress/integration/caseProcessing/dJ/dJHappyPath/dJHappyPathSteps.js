/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJHappyPathActions from "./DJHappyPathActions";
const dJHappyPathActions = new DJHappyPathActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`caseProcessing/dJ/dJHappyPath/dJHappyPathFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "dJHappyPath";
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

  let harPath = "caseProcessing/dJ/dJHappyPath";
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
  dJHappyPathActions.civilCaseWithLitigantPartyTypes();
});

Given("Continue with civil case with litigant party types", () => {
  dJHappyPathActions.continueWithCivilCaseWithLitigantPartyTypes();
});

Given("Click on Civil from Case Processing", () => {
  dJHappyPathActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Disposition Judgment", () => {
  dJHappyPathActions.clickOnDispositionJudgment();
});

Then("Case ID radio button is selected", () => {
  dJHappyPathActions.caseIDRadioButtonIsSelected();
});

Given("Enter Civil Case ID in My Case ID Search", () => {
  dJHappyPathActions.enterCivilCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJHappyPathActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJHappyPathActions.casesDisplayInTheCasesSection();
});

Given("Click Select All check box", () => {
  dJHappyPathActions.clickSelectAllCheckBox();
});

Then("Enables Party Disposition drop down list", () => {
  dJHappyPathActions.enablesPartyDispositionDropDownList();
});

Given("Click Pencil icon next to a case party record", () => {
  dJHappyPathActions.clickPencilIconNextToACasePartyRecord();
});

Given("Select value from Party Disposition dropdown list", () => {
  dJHappyPathActions.selectValueFromPartyDispositionDropdownList();
});

Given("Click Checkmark icon for the same case party record", () => {
  dJHappyPathActions.clickCheckmarkIconForTheSameCasePartyRecord();
});

Then("Populates Party Diposition code for all case party records", () => {
  dJHappyPathActions.populatesPartyDipositionCodeForAllCasePartyRecords();
});

Given("Click Save Case Parties Disposition button", () => {
  dJHappyPathActions.clickSaveCasePartiesDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save",
  () => {
    dJHappyPathActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }
);

Then("Case Party Disposition code is saved for selected case party", () => {
  dJHappyPathActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
});

Given("Continue with civil case with all parties disposed", () => {
  dJHappyPathActions.continueWithCivilCaseWithAllPartiesDisposed();
});

Given(
  "Case Disposition populates with DJV Jury Verdict Civil DISPLAY ONLY",
  () => {
    dJHappyPathActions.caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY();
  }
);

Given("Case Disposition Date auto fills DISPLAY ONLY", () => {
  dJHappyPathActions.caseDispositionDateAutoFillsDISPLAYONLY();
});

Given("Time field auto fills DISPLAY ONLY", () => {
  dJHappyPathActions.timeFieldAutoFillsDISPLAYONLY();
});

Given("Enter text in Predefined Text field in Case Disposition section", () => {
  dJHappyPathActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
});

Then("text displays in free text field", () => {
  dJHappyPathActions.textDisplaysInFreeTextField();
});

Given("Click Save Disposition button", () => {
  dJHappyPathActions.clickSaveDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save docket code and case id",
  () => {
    dJHappyPathActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }
);

Then("Case Disposition code is saved for the case", () => {
  dJHappyPathActions.caseDispositionCodeIsSavedForTheCase();
});

Given("Click Close if event window opens", () => {
  dJHappyPathActions.clickCloseIfEventWindowOpens();
});

Given("Civil Case with all parties disposed and case disposed", () => {
  dJHappyPathActions.civilCaseWithAllPartiesDisposedAndCaseDisposed();
});

Given("Click Judgment section triangle icon", () => {
  dJHappyPathActions.clickJudgmentSectionTriangleIcon();
});

Then("Expands Judgment section", () => {
  dJHappyPathActions.expandsJudgmentSection();
});

Given("Select party from Case Party dropdown list petitioner", () => {
  dJHappyPathActions.selectPartyFromCasePartyDropdownListPetitioner();
});

Then("Selects only the one case party", () => {
  dJHappyPathActions.selectsOnlyTheOneCaseParty();
});

Given("Click Add Judgment button", () => {
  dJHappyPathActions.clickAddJudgmentButton();
});

Then("Opens Add Judgment", () => {
  dJHappyPathActions.opensAddJudgment();
});

Given("Judgment AgainstFor field click {string}", (option0) => {
  dJHappyPathActions.judgmentAgainstForFieldClick(option0);
});

Given("Judgment For field", () => {
  dJHappyPathActions.judgmentForField();
});

Then("Displays party name in Judgment Against field", () => {
  dJHappyPathActions.displaysPartyNameInJudgmentAgainstField();
});

Given("Judgment MonetaryNonMonetary select Monetary", () => {
  dJHappyPathActions.judgmentMonetaryNonMonetarySelectMonetary();
});

Then("Monetary displays", () => {
  dJHappyPathActions.monetaryDisplays();
});

Given("enter 15000 in Amount field", () => {
  dJHappyPathActions.enter15000InAmountField();
});

Then("amount displays", () => {
  dJHappyPathActions.amountDisplays();
});

Given("enter JCLAM in Judgment description field", () => {
  dJHappyPathActions.enterJCLAMInJudgmentDescriptionField();
});

Given("Judgment date auto fills with current date", () => {
  dJHappyPathActions.judgmentDateAutoFillsWithCurrentDate();
});

Given("Time auto fills with current time", () => {
  dJHappyPathActions.timeAutoFillsWithCurrentTime();
});

Given("Click Save button", () => {
  dJHappyPathActions.clickSaveButton();
});

Given("Judgment For record dispalys in the View Update Judgment table", () => {
  dJHappyPathActions.judgmentForRecordDispalysInTheViewUpdateJudgmentTable();
});

Given(
  "Civil Case with all parties disposed and case disposed and Petitioner judged",
  () => {
    dJHappyPathActions.civilCaseWithAllPartiesDisposedAndCaseDisposedAndPetitionerJudged();
  }
);

Given("Select party from Case Party dropdown list respondent", () => {
  dJHappyPathActions.selectPartyFromCasePartyDropdownListRespondent();
});

Given(
  "Civil Case with all parties and case disposed with judgment entered",
  () => {
    dJHappyPathActions.civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEntered();
  }
);

Given("click + next to judgment record to be updated", () => {
  dJHappyPathActions.clickNextToJudgmentRecordToBeUpdated();
});

Then("record expands", () => {
  dJHappyPathActions.recordExpands();
});

Given("click pencil icon", () => {
  dJHappyPathActions.clickPencilIcon();
});

Given("enter 500 in Amount field", () => {
  dJHappyPathActions.enter500InAmountField();
});

Then("amount updates", () => {
  dJHappyPathActions.amountUpdates();
});

Given("enter ERR Entered in Error in Reason for Judgment Change field", () => {
  dJHappyPathActions.enterERREnteredInErrorInReasonForJudgmentChangeField();
});

Given("Select Update Judgment Entry button", () => {
  dJHappyPathActions.selectUpdateJudgmentEntryButton();
});

Then("success noty displays", () => {
  dJHappyPathActions.successNotyDisplays();
});

Then("Update displays in table", () => {
  dJHappyPathActions.updateDisplaysInTable();
});

Given(
  "Civil Case with all parties and case disposed with judgment entered after update",
  () => {
    dJHappyPathActions.civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEnteredAfterUpdate();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(DJHappyPathActions.prototype);
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
    (funcName) => funcName !== "clickCloseIfEventWindowOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "civilCaseWithAllPartiesDisposedAndCaseDisposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickJudgmentSectionTriangleIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandsJudgmentSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartyFromCasePartyDropdownListPetitioner"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectsOnlyTheOneCaseParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAddJudgmentButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "opensAddJudgment"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "judgmentAgainstForFieldClick"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "judgmentForField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "displaysPartyNameInJudgmentAgainstField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "judgmentMonetaryNonMonetarySelectMonetary"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "monetaryDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enter15000InAmountField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "amountDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterJCLAMInJudgmentDescriptionField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "judgmentDateAutoFillsWithCurrentDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "timeAutoFillsWithCurrentTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "judgmentForRecordDispalysInTheViewUpdateJudgmentTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "civilCaseWithAllPartiesDisposedAndCaseDisposedAndPetitionerJudged"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartyFromCasePartyDropdownListRespondent"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickNextToJudgmentRecordToBeUpdated"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "recordExpands"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPencilIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enter500InAmountField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "amountUpdates"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterERREnteredInErrorInReasonForJudgmentChangeField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectUpdateJudgmentEntryButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "successNotyDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "updateDisplaysInTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEnteredAfterUpdate"
  );
  cy.writeFile("./differences/DJHappyPathActions.tmp", propertyNames);
}
