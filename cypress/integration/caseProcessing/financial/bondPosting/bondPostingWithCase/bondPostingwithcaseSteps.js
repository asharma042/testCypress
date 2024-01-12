/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import BondPostingwithcaseActions from "./BondPostingwithcaseActions";
const bondPostingwithcaseActions = new BondPostingwithcaseActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/bondPosting/bondPostingWithCase/bondPostingwithcaseFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "bondPostingwithcase";
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

  let harPath = "caseProcessing/financial/bondPosting/bondPostingWithCase";
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

Given("Criminal case not sentence not disposed", () => {
  bondPostingwithcaseActions.criminalCaseNotSentenceNotDisposed();
});

Given("Use Case from previous scenario", () => {
  bondPostingwithcaseActions.useCaseFromPreviousScenario();
});

Given("Click on Bond Posting", () => {
  bondPostingwithcaseActions.clickOnBondPosting();
});

Then("Bond Posting tab opens", () => {
  bondPostingwithcaseActions.bondPostingTabOpens();
});

Given("From the Financial Location Drop Down select Location X", () => {
  bondPostingwithcaseActions.fromTheFinancialLocationDropDownSelectLocationX();
});

Given("In Case Search Block tick Case ID radio button", () => {
  bondPostingwithcaseActions.inCaseSearchBlockTickCaseIDRadioButton();
});

Given("In My Case ID Search text box enter the case ID", () => {
  bondPostingwithcaseActions.inMyCaseIDSearchTextBoxEnterTheCaseID();
});

Then("Case should display in the Cases block", () => {
  bondPostingwithcaseActions.caseShouldDisplayInTheCasesBlock();
});

Given(
  "In Cases Block tick the check box for the case under Select Case",
  () => {
    bondPostingwithcaseActions.inCasesBlockTickTheCheckBoxForTheCaseUnderSelectCase();
  }
);

Given(
  "In Manage Bond Posting Block Bond Information subsection Select the Payor drop down and choose the defendants name",
  () => {
    bondPostingwithcaseActions.inManageBondPostingBlockBondInformationSubsectionSelectThePayorDropDownAndChooseTheDefendantsName();
  }
);

Then("Defendant from the case should be listed in the drop down", () => {
  bondPostingwithcaseActions.defendantFromTheCaseShouldBeListedInTheDropDown();
});

Given("In Party Name drop down select the defendants name", () => {
  bondPostingwithcaseActions.inPartyNameDropDownSelectTheDefendantsName();
});

Given(
  "In Manage Bond Posting Block Bond Amount subsection in Bond Amount Ordered Field enter 1000",
  () => {
    bondPostingwithcaseActions.inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnter1000();
  }
);

Then("The field Bond Amount to Post should go from blank to 1000", () => {
  bondPostingwithcaseActions.theFieldBondAmountToPostShouldGoFromBlankTo1000();
});

Then("Bond Payments sub section Amount to Collect should be 1000", () => {
  bondPostingwithcaseActions.bondPaymentsSubSectionAmountToCollectShouldBe1000();
});

Given("In Bond Percentage field enter 25", () => {
  bondPostingwithcaseActions.inBondPercentageFieldEnter25();
});

Then("The field Bond Amount to Post should go from 1000 00 to 250 00", () => {
  bondPostingwithcaseActions.theFieldBondAmountToPostShouldGoFrom100000To25000();
});

Then("Bond Payments sub section Amount to Collect should be 250 00", () => {
  bondPostingwithcaseActions.bondPaymentsSubSectionAmountToCollectShouldBe25000();
});

Given(
  "In Manage Bond Posting block Bond Payment sub section Bond Pay type drop down select Check Bond 1401",
  () => {
    bondPostingwithcaseActions.inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectCheckBond1401();
  }
);

Then(
  "Manage Bond Posting block Bond Payments sub section CK MO CC Identifier should should see a name change to Check Number and go from gray disabled to an active entry field",
  () => {
    bondPostingwithcaseActions.manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldShouldSeeANameChangeToCheckNumberAndGoFromGrayDisabledToAnActiveEntryField();
  }
);

Given("In Check Number enter 1001", () => {
  bondPostingwithcaseActions.inCheckNumberEnter1001();
});

Given("In Amount Tendered enter 250", () => {
  bondPostingwithcaseActions.inAmountTenderedEnter250();
});

Given("Click Save button", () => {
  bondPostingwithcaseActions.clickSaveButton();
});

Then(
  "Manage Bond Posting Block Bond ID Should populate with the ID of the Bond just Saved",
  () => {
    bondPostingwithcaseActions.manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved();
  }
);

Then(
  "Receipt Number should populate with the recipt number of the payment for the bond just posted",
  () => {
    bondPostingwithcaseActions.receiptNumberShouldPopulateWithTheReciptNumberOfThePaymentForTheBondJustPosted();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    BondPostingwithcaseActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "criminalCaseNotSentenceNotDisposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useCaseFromPreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnBondPosting"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "bondPostingTabOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "fromTheFinancialLocationDropDownSelectLocationX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inCaseSearchBlockTickCaseIDRadioButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inMyCaseIDSearchTextBoxEnterTheCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseShouldDisplayInTheCasesBlock"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "inCasesBlockTickTheCheckBoxForTheCaseUnderSelectCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inManageBondPostingBlockBondInformationSubsectionSelectThePayorDropDownAndChooseTheDefendantsName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "defendantFromTheCaseShouldBeListedInTheDropDown"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inPartyNameDropDownSelectTheDefendantsName"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnter1000"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFieldBondAmountToPostShouldGoFromBlankTo1000"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "bondPaymentsSubSectionAmountToCollectShouldBe1000"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inBondPercentageFieldEnter25"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theFieldBondAmountToPostShouldGoFrom100000To25000"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "bondPaymentsSubSectionAmountToCollectShouldBe25000"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectCheckBond1401"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldShouldSeeANameChangeToCheckNumberAndGoFromGrayDisabledToAnActiveEntryField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inCheckNumberEnter1001"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inAmountTenderedEnter250"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "receiptNumberShouldPopulateWithTheReciptNumberOfThePaymentForTheBondJustPosted"
  );
  cy.writeFile("./differences/BondPostingwithcaseActions.tmp", propertyNames);
}
