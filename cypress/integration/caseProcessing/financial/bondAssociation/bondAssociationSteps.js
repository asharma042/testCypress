/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import BondAssociationActions from "./BondAssociationActions";
const bondAssociationActions = new BondAssociationActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/bondAssociation/bondAssociationFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "bondAssociation";
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

  let harPath = "caseProcessing/financial/bondAssociation";
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

Given("Create simple criminal case", () => {
  bondAssociationActions.createSimpleCriminalCase();
});

Given("Associate a Bond to the Criminal and not the case", () => {
  bondAssociationActions.associateABondToTheCriminalAndNotTheCase();
});

Given(
  "Bond created on Person X Criminal Case Saved with Person X as Defendant at Location X",
  () => {
    bondAssociationActions.bondCreatedOnPersonXCriminalCaseSavedWithPersonXAsDefendantAtLocationX();
  }
);

Given("Click on Bond Association", () => {
  bondAssociationActions.clickOnBondAssociation();
});

Then("Open Bond Association tab is now open", () => {
  bondAssociationActions.openBondAssociationTabIsNowOpen();
});

Given("Financial Location drop down select XXXX", () => {
  bondAssociationActions.financialLocationDropDownSelectXXXX();
});

Given("In Bond Search block tick Bond ID radio button", () => {
  bondAssociationActions.inBondSearchBlockTickBondIDRadioButton();
});

Then("Search field in block becomes labeled as My Bond ID Search", () => {
  bondAssociationActions.searchFieldInBlockBecomesLabeledAsMyBondIDSearch();
});

Given(
  "In My Bond ID Search enter the bond ID from the previously made bond",
  () => {
    bondAssociationActions.inMyBondIDSearchEnterTheBondIDFromThePreviouslyMadeBond();
  }
);

Then("Case X should appear in Case Information block", () => {
  bondAssociationActions.caseXShouldAppearInCaseInformationBlock();
});

Given(
  "In Case Information Block case results Select Case column tick the check box in front of Case X",
  () => {
    bondAssociationActions.inCaseInformationBlockCaseResultsSelectCaseColumnTickTheCheckBoxInFrontOfCaseX();
  }
);

Then("Process Continuation button becomes available", () => {
  bondAssociationActions.processContinuationButtonBecomesAvailable();
});

Then("Associate Bond button becomes active", () => {
  bondAssociationActions.associateBondButtonBecomesActive();
});

Given("Click Associate Bond Button", () => {
  bondAssociationActions.clickAssociateBondButton();
});

Then(
  "Green message indicating that the bond is now associated to the case",
  () => {
    bondAssociationActions.greenMessageIndicatingThatTheBondIsNowAssociatedToTheCase();
  }
);

Then("Bonds block clears", () => {
  bondAssociationActions.bondsBlockClears();
});

Then("Manage Bond Association block clears", () => {
  bondAssociationActions.manageBondAssociationBlockClears();
});

Then("Associate Bond button becomes inactive", () => {
  bondAssociationActions.associateBondButtonBecomesInactive();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    BondAssociationActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createSimpleCriminalCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "associateABondToTheCriminalAndNotTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "bondCreatedOnPersonXCriminalCaseSavedWithPersonXAsDefendantAtLocationX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnBondAssociation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "openBondAssociationTabIsNowOpen"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "financialLocationDropDownSelectXXXX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inBondSearchBlockTickBondIDRadioButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "searchFieldInBlockBecomesLabeledAsMyBondIDSearch"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "inMyBondIDSearchEnterTheBondIDFromThePreviouslyMadeBond"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseXShouldAppearInCaseInformationBlock"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inCaseInformationBlockCaseResultsSelectCaseColumnTickTheCheckBoxInFrontOfCaseX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "processContinuationButtonBecomesAvailable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "associateBondButtonBecomesActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAssociateBondButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "greenMessageIndicatingThatTheBondIsNowAssociatedToTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "bondsBlockClears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "manageBondAssociationBlockClears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "associateBondButtonBecomesInactive"
  );
  cy.writeFile("./differences/BondAssociationActions.tmp", propertyNames);
}
