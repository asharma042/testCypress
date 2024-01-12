/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import BondPostingwithoutCaseActions from "./BondPostingwithoutCaseActions";
const bondPostingwithoutCaseActions = new BondPostingwithoutCaseActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/bondPosting/bondPostingWithoutCase/bondPostingwithoutCaseFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "bondPostingwithoutCase";
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

  let harPath = "caseProcessing/financial/bondPosting/bondPostingWithoutCase";
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

Given("Click on Bond Posting", () => {
  bondPostingwithoutCaseActions.clickOnBondPosting();
});

Then("Bond Posting tab opens", () => {
  bondPostingwithoutCaseActions.bondPostingTabOpens();
});

Given("From the Financial Location Drop Down select Location X", () => {
  bondPostingwithoutCaseActions.fromTheFinancialLocationDropDownSelectLocationX();
});

Given(
  "Manage Bond Posting block Bond Information sub block Payor dropdown click the search icon",
  () => {
    bondPostingwithoutCaseActions.manageBondPostingBlockBondInformationSubBlockPayorDropdownClickTheSearchIcon();
  }
);

Then("Open My Payor Search Pop up box", () => {
  bondPostingwithoutCaseActions.openMyPayorSearchPopUpBox();
});

Given("In My Payor Search Pop Up box Enter Payor Information", () => {
  bondPostingwithoutCaseActions.inMyPayorSearchPopUpBoxEnterPayorInformation();
});

Given("Click the Add Close button", () => {
  bondPostingwithoutCaseActions.clickTheAddCloseButton();
});

Then(
  "In Manage Bond Posting block Bond Information sub section Payor should now be populated with Person X",
  () => {
    bondPostingwithoutCaseActions.inManageBondPostingBlockBondInformationSubSectionPayorShouldNowBePopulatedWithPersonX();
  }
);

Given("Payor and Party are the same tick the box", () => {
  bondPostingwithoutCaseActions.payorAndPartyAreTheSameTickTheBox();
});

Then("Party Name and Payor is the Same", () => {
  bondPostingwithoutCaseActions.partyNameAndPayorIsTheSame();
});

Given(
  "In Manage Bond Posting Block Bond Amount subsection in Bond Amount Ordered Field enter amount",
  () => {
    bondPostingwithoutCaseActions.inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnterAmount();
  }
);

Then("The field Bond Amount to Post should go from blank to 500 00", () => {
  bondPostingwithoutCaseActions.theFieldBondAmountToPostShouldGoFromBlankTo50000();
});

Then("Bond Payments sub section Amount to Collect should be 500 00", () => {
  bondPostingwithoutCaseActions.bondPaymentsSubSectionAmountToCollectShouldBe50000();
});

Given("In Bond Percentage field enter XXXX", () => {
  bondPostingwithoutCaseActions.inBondPercentageFieldEnterXXXX();
});

Then("The field Bond Amount to Post should go from 500 00 to 50 00", () => {
  bondPostingwithoutCaseActions.theFieldBondAmountToPostShouldGoFrom50000To5000();
});

Then("Bond Payments sub section Amount to Collect should be 50 00", () => {
  bondPostingwithoutCaseActions.bondPaymentsSubSectionAmountToCollectShouldBe5000();
});

Given(
  "In Manage Bond Posting block Bond Payment sub section Bond Pay type drop down select XXXX",
  () => {
    bondPostingwithoutCaseActions.inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectXXXX();
  }
);

Then(
  "Manage Bond Posting block Bond Payments sub section CK MO CC Identifier should see a name change to Money Order Number and go from gray disabled to an active entry field",
  () => {
    bondPostingwithoutCaseActions.manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldSeeANameChangeToMoneyOrderNumberAndGoFromGrayDisabledToAnActiveEntryField();
  }
);

Given("In Money Order Number enter XXXX", () => {
  bondPostingwithoutCaseActions.inMoneyOrderNumberEnterXXXX();
});

Given("In Amount Tendered enter XXXX", () => {
  bondPostingwithoutCaseActions.inAmountTenderedEnterXXXX();
});

Given("click the Add Additional Payment button", () => {
  bondPostingwithoutCaseActions.clickTheAddAdditionalPaymentButton();
});

Then("New row for entering a payment should be added", () => {
  bondPostingwithoutCaseActions.newRowForEnteringAPaymentShouldBeAdded();
});

Given("Bond Pay Type row 2 drop down select XXXX", () => {
  bondPostingwithoutCaseActions.bondPayTypeRow2DropDownSelectXXXX();
});

Given("Amount Tendered row 2 enter XXXX", () => {
  bondPostingwithoutCaseActions.amountTenderedRow2EnterXXXX();
});

Given("Click Save button", () => {
  bondPostingwithoutCaseActions.clickSaveButton();
});

Then(
  "Manage Bond Posting Block Bond ID Should populate with the ID of the Bond just Saved",
  () => {
    bondPostingwithoutCaseActions.manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved();
  }
);

Then(
  "Receipt Number should populate with the receipt number of the payment for the bond just posted",
  () => {
    bondPostingwithoutCaseActions.receiptNumberShouldPopulateWithTheReceiptNumberOfThePaymentForTheBondJustPosted();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    BondPostingwithoutCaseActions.prototype
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
    (funcName) =>
      funcName !==
      "manageBondPostingBlockBondInformationSubBlockPayorDropdownClickTheSearchIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "openMyPayorSearchPopUpBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inMyPayorSearchPopUpBoxEnterPayorInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheAddCloseButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inManageBondPostingBlockBondInformationSubSectionPayorShouldNowBePopulatedWithPersonX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "payorAndPartyAreTheSameTickTheBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partyNameAndPayorIsTheSame"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnterAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theFieldBondAmountToPostShouldGoFromBlankTo50000"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "bondPaymentsSubSectionAmountToCollectShouldBe50000"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inBondPercentageFieldEnterXXXX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFieldBondAmountToPostShouldGoFrom50000To5000"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "bondPaymentsSubSectionAmountToCollectShouldBe5000"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectXXXX"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldSeeANameChangeToMoneyOrderNumberAndGoFromGrayDisabledToAnActiveEntryField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inMoneyOrderNumberEnterXXXX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inAmountTenderedEnterXXXX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheAddAdditionalPaymentButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newRowForEnteringAPaymentShouldBeAdded"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "bondPayTypeRow2DropDownSelectXXXX"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "amountTenderedRow2EnterXXXX"
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
      "receiptNumberShouldPopulateWithTheReceiptNumberOfThePaymentForTheBondJustPosted"
  );
  cy.writeFile(
    "./differences/BondPostingwithoutCaseActions.tmp",
    propertyNames
  );
}
