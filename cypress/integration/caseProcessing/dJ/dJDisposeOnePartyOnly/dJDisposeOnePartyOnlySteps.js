/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DJDisposeOnePartyOnlyActions from "./DJDisposeOnePartyOnlyActions";
const dJDisposeOnePartyOnlyActions = new DJDisposeOnePartyOnlyActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/dJ/dJDisposeOnePartyOnly/dJDisposeOnePartyOnlyFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "dJDisposeOnePartyOnly";
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

  let harPath = "caseProcessing/dJ/dJDisposeOnePartyOnly";
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
  dJDisposeOnePartyOnlyActions.civilCaseWithLitigantPartyTypes();
});

Given("Continue with civil case with litigant party types", () => {
  dJDisposeOnePartyOnlyActions.continueWithCivilCaseWithLitigantPartyTypes();
});

Given("Click on Civil from Case Processing", () => {
  dJDisposeOnePartyOnlyActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Disposition Judgment", () => {
  dJDisposeOnePartyOnlyActions.clickOnDispositionJudgment();
});

Then("Case ID radio button is selected", () => {
  dJDisposeOnePartyOnlyActions.caseIDRadioButtonIsSelected();
});

Given("Enter Civil Case ID in My Case ID Search", () => {
  dJDisposeOnePartyOnlyActions.enterCivilCaseIDInMyCaseIDSearch();
});

Given("Click Magnifying Glass icon", () => {
  dJDisposeOnePartyOnlyActions.clickMagnifyingGlassIcon();
});

Then("Cases display in the Cases section", () => {
  dJDisposeOnePartyOnlyActions.casesDisplayInTheCasesSection();
});

Given("Click Select check box next to one party", () => {
  dJDisposeOnePartyOnlyActions.clickSelectCheckBoxNextToOneParty();
});

Then("Enables Party Disposition drop down list", () => {
  dJDisposeOnePartyOnlyActions.enablesPartyDispositionDropDownList();
});

Given("Click Pencil icon next to a case party record", () => {
  dJDisposeOnePartyOnlyActions.clickPencilIconNextToACasePartyRecord();
});

Given("Select value from Party Disposition dropdown list", () => {
  dJDisposeOnePartyOnlyActions.selectValueFromPartyDispositionDropdownList();
});

Given("Click Checkmark icon for the same case party record", () => {
  dJDisposeOnePartyOnlyActions.clickCheckmarkIconForTheSameCasePartyRecord();
});

Then("Populates Party Diposition code for one case party record", () => {
  dJDisposeOnePartyOnlyActions.populatesPartyDipositionCodeForOneCasePartyRecord();
});

Given("Click Save Case Parties Disposition button", () => {
  dJDisposeOnePartyOnlyActions.clickSaveCasePartiesDispositionButton();
});

Then(
  "Green message displays in upper right hand corner stating successful save",
  () => {
    dJDisposeOnePartyOnlyActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }
);

Then("Case Party Disposition code is saved for one selected case party", () => {
  dJDisposeOnePartyOnlyActions.casePartyDispositionCodeIsSavedForOneSelectedCaseParty();
});

Then("UNABLE TO PROCEED TO CASE DISPOSITION", () => {
  dJDisposeOnePartyOnlyActions.uNABLETOPROCEEDTOCASEDISPOSITION();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DJDisposeOnePartyOnlyActions.prototype
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
    (funcName) => funcName !== "clickSelectCheckBoxNextToOneParty"
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
      funcName !== "populatesPartyDipositionCodeForOneCasePartyRecord"
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
      funcName !== "casePartyDispositionCodeIsSavedForOneSelectedCaseParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "uNABLETOPROCEEDTOCASEDISPOSITION"
  );
  cy.writeFile("./differences/DJDisposeOnePartyOnlyActions.tmp", propertyNames);
}
