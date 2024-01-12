/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import COASITEentrythroughdocketingActions from "./COASITEentrythroughdocketingActions";
const cOASITEentrythroughdocketingActions =
  new COASITEentrythroughdocketingActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/docketing/cOASITEEntryThroughDocketing/cOASITEentrythroughdocketingFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "cOASITEentrythroughdocketing";
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

  let harPath = "caseProcessing/docketing/cOASITEEntryThroughDocketing";
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

Given(
  "Criminal Case is created Case has a defendant Case is not disposed",
  () => {
    cOASITEentrythroughdocketingActions.criminalCaseIsCreatedCaseHasADefendantCaseIsNotDisposed();
  }
);

Given("Enter Case in My Docketing Search", () => {
  cOASITEentrythroughdocketingActions.enterCaseInMyDocketingSearch();
});

Given("Click the Magnifying glass search button", () => {
  cOASITEentrythroughdocketingActions.clickTheMagnifyingGlassSearchButton();
});

Then(
  "Case is pulled up in Cases subsection Case Id coulumn will show Preexisting Case ID",
  () => {
    cOASITEentrythroughdocketingActions.caseIsPulledUpInCasesSubsectionCaseIdCoulumnWillShowPreexistingCaseID();
  }
);

Given("Click the Add Docket Entry tilte", () => {
  cOASITEentrythroughdocketingActions.clickTheAddDocketEntryTilte();
});

Then("Add Docket Entry section expands", () => {
  cOASITEentrythroughdocketingActions.addDocketEntrySectionExpands();
});

Given(
  "In the Add Docket Entry Section Docket Description drop down select a docket entry",
  () => {
    cOASITEentrythroughdocketingActions.inTheAddDocketEntrySectionDocketDescriptionDropDownSelectADocketEntry();
  }
);

Then(
  "Additional Docket Data section expands with Film Number and Footage entry text boxes",
  () => {
    cOASITEentrythroughdocketingActions.additionalDocketDataSectionExpandsWithFilmNumberAndFootageEntryTextBoxes();
  }
);

Given(
  "In the Add Docket Entry Section Docket Description Additional Docket Data Film Number text box enter the film number",
  () => {
    cOASITEentrythroughdocketingActions.inTheAddDocketEntrySectionDocketDescriptionAdditionalDocketDataFilmNumberTextBoxEnterTheFilmNumber();
  }
);

Then("Film Number and Docket Text box displays the entered values", () => {
  cOASITEentrythroughdocketingActions.filmNumberAndDocketTextBoxDisplaysTheEnteredValues();
});

Given(
  "In the Add Docket Entry Section Docket Description Additional Docket Data Footage text box enter the film number",
  () => {
    cOASITEentrythroughdocketingActions.inTheAddDocketEntrySectionDocketDescriptionAdditionalDocketDataFootageTextBoxEnterTheFilmNumber();
  }
);

Then("Footage text box and Docket Text box displays the entered values", () => {
  cOASITEentrythroughdocketingActions.footageTextBoxAndDocketTextBoxDisplaysTheEnteredValues();
});

Given("Click Save Docket Button", () => {
  cOASITEentrythroughdocketingActions.clickSaveDocketButton();
});

Then("Save Docket drop down list appears", () => {
  cOASITEentrythroughdocketingActions.saveDocketDropDownListAppears();
});

Given("select Save Dockets", () => {
  cOASITEentrythroughdocketingActions.selectSaveDockets();
});

Then(
  "Green Noty appears and indicates it was successfully saved The Add Docket Entry section resets",
  () => {
    cOASITEentrythroughdocketingActions.greenNotyAppearsAndIndicatesItWasSuccessfullySavedTheAddDocketEntrySectionResets();
  }
);

Given("Click ViewUpdate Docket Entries", () => {
  cOASITEentrythroughdocketingActions.clickViewUpdateDocketEntries();
});

Then(
  "Update Docket Entries sub section opend Lists the existing dockets on the case",
  () => {
    cOASITEentrythroughdocketingActions.updateDocketEntriesSubSectionOpendListsTheExistingDocketsOnTheCase();
  }
);

Given("Click the + sign next to FFILM Micro Film record", () => {
  cOASITEentrythroughdocketingActions.clickTheSignNextToFFILMMicroFilmRecord();
});

Then(
  "FFILM docket opens Validate the text for the following fields Docket textFootage and Film Number",
  () => {
    cOASITEentrythroughdocketingActions.fFILMDocketOpensValidateTheTextForTheFollowingFieldsDocketTextFootageAndFilmNumber();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    COASITEentrythroughdocketingActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "criminalCaseIsCreatedCaseHasADefendantCaseIsNotDisposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseInMyDocketingSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheMagnifyingGlassSearchButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseIsPulledUpInCasesSubsectionCaseIdCoulumnWillShowPreexistingCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheAddDocketEntryTilte"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addDocketEntrySectionExpands"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inTheAddDocketEntrySectionDocketDescriptionDropDownSelectADocketEntry"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "additionalDocketDataSectionExpandsWithFilmNumberAndFootageEntryTextBoxes"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inTheAddDocketEntrySectionDocketDescriptionAdditionalDocketDataFilmNumberTextBoxEnterTheFilmNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "filmNumberAndDocketTextBoxDisplaysTheEnteredValues"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inTheAddDocketEntrySectionDocketDescriptionAdditionalDocketDataFootageTextBoxEnterTheFilmNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "footageTextBoxAndDocketTextBoxDisplaysTheEnteredValues"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveDocketButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "saveDocketDropDownListAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSaveDockets"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "greenNotyAppearsAndIndicatesItWasSuccessfullySavedTheAddDocketEntrySectionResets"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickViewUpdateDocketEntries"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "updateDocketEntriesSubSectionOpendListsTheExistingDocketsOnTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheSignNextToFFILMMicroFilmRecord"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "fFILMDocketOpensValidateTheTextForTheFollowingFieldsDocketTextFootageAndFilmNumber"
  );
  cy.writeFile(
    "./differences/COASITEentrythroughdocketingActions.tmp",
    propertyNames
  );
}
