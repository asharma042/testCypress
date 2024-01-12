/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import ReceiptPaymentActions from "./ReceiptPaymentActions";
const receiptPaymentActions = new ReceiptPaymentActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/receiptPayment/receiptPayment/receiptPaymentFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "receiptPayment";
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

  let harPath = "caseProcessing/financial/receiptPayment/receiptPayment";
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
  "Criminal case is created for user X. Case has been disposed, sentence has been included with a fine, costs and fines have been added and saved. Payment Plan has been created.",
  () => {
    receiptPaymentActions.criminalCaseIsCreatedForUserXCaseHasBeenDisposedSentenceHasBeenIncludedWithAFineCostsAndFinesHaveBeenAddedAndSavedPaymentPlanHasBeenCreated();
  }
);

Given("Use case from previous scenario", () => {
  receiptPaymentActions.useCaseFromPreviousScenario();
});

Given("Go to Manage Assessments", () => {
  receiptPaymentActions.goToManageAssessments();
});

Given("Search for previous case", () => {
  receiptPaymentActions.searchForPreviousCase();
});

Then("Case should appear in table", () => {
  receiptPaymentActions.caseShouldAppearInTable();
});

Given("Select Save button", () => {
  receiptPaymentActions.selectSaveButton();
});

Given("Close Tab", () => {
  receiptPaymentActions.closeTab();
});

Given("Use the prior scenario case", () => {
  receiptPaymentActions.useThePriorScenarioCase();
});

Given("Search for case", () => {
  receiptPaymentActions.searchForCase();
});

Then("Case appears in the window", () => {
  receiptPaymentActions.caseAppearsInTheWindow();
});

Given("Click the checkbox to select the case", () => {
  receiptPaymentActions.clickTheCheckboxToSelectTheCase();
});

Given(
  "Click the plus sign in the Apply Payments to the Payment Plan section",
  () => {
    receiptPaymentActions.clickThePlusSignInTheApplyPaymentsToThePaymentPlanSection();
  }
);

Then("Cost Assessments section expands", () => {
  receiptPaymentActions.costAssessmentsSectionExpands();
});

Given("Expand the Enter Payor section", () => {
  receiptPaymentActions.expandTheEnterPayorSection();
});

Then("Enter Payor section expands", () => {
  receiptPaymentActions.enterPayorSectionExpands();
});

Given("Click the checkbox under Defendant is Payor", () => {
  receiptPaymentActions.clickTheCheckboxUnderDefendantIsPayor();
});

Then("Checkmark appears in the checkbox", () => {
  receiptPaymentActions.checkmarkAppearsInTheCheckbox();
});

Then("defendants name autofills in the Last Name and First Name fields", () => {
  receiptPaymentActions.defendantsNameAutofillsInTheLastNameAndFirstNameFields();
});

Given("Expand the Select Payment Type section", () => {
  receiptPaymentActions.expandTheSelectPaymentTypeSection();
});

Then("Select Payment Type sections expands", () => {
  receiptPaymentActions.selectPaymentTypeSectionsExpands();
});

Given("Click the checkbox in the Open Manage Assessments field", () => {
  receiptPaymentActions.clickTheCheckboxInTheOpenManageAssessmentsField();
});

Then("Checkbox appears in the Open Manage Overpayments field", () => {
  receiptPaymentActions.checkboxAppearsInTheOpenManageOverpaymentsField();
});

Given("Click the dropdown arrow in the Pay Type Description field", () => {
  receiptPaymentActions.clickTheDropdownArrowInThePayTypeDescriptionField();
});

Given("Select Cash", () => {
  receiptPaymentActions.selectCash();
});

Given("Click in the Amount Tendered field for cash", () => {
  receiptPaymentActions.clickInTheAmountTenderedFieldForCash();
});

Given("Enter amount for cash", () => {
  receiptPaymentActions.enterAmountForCash();
});

Given(
  "Click Save Payment button on the bottom left of the screen for cash",
  () => {
    receiptPaymentActions.clickSavePaymentButtonOnTheBottomLeftOfTheScreenForCash();
  }
);

Then("Green Noty appears verifying payment is saved", () => {
  receiptPaymentActions.greenNotyAppearsVerifyingPaymentIsSaved();
});

Then("Receipt number shows in the View Payment Summary section", () => {
  receiptPaymentActions.receiptNumberShowsInTheViewPaymentSummarySection();
});

Given("Click on new payment after cash", () => {
  receiptPaymentActions.clickOnNewPaymentAfterCash();
});

Given("Select Credit Card", () => {
  receiptPaymentActions.selectCreditCard();
});

Given("Click in the Amount Tendered field for credit card", () => {
  receiptPaymentActions.clickInTheAmountTenderedFieldForCreditCard();
});

Given("Enter confirmation Number for credit card", () => {
  receiptPaymentActions.enterConfirmationNumberForCreditCard();
});

Given("Enter amount for credit card", () => {
  receiptPaymentActions.enterAmountForCreditCard();
});

Given("Click on new payment", () => {
  receiptPaymentActions.clickOnNewPayment();
});

Given("Select Check", () => {
  receiptPaymentActions.selectCheck();
});

Given("Enter Check Number", () => {
  receiptPaymentActions.enterCheckNumber();
});

Given("Enter amount for check", () => {
  receiptPaymentActions.enterAmountForCheck();
});

Given(
  "Click Save Payment button on the bottom left of the screen credit card",
  () => {
    receiptPaymentActions.clickSavePaymentButtonOnTheBottomLeftOfTheScreenCreditCard();
  }
);

Given("Click on new payment after credit card", () => {
  receiptPaymentActions.clickOnNewPaymentAfterCreditCard();
});

Given("Select Money Order", () => {
  receiptPaymentActions.selectMoneyOrder();
});

Given("Enter Money Order Number", () => {
  receiptPaymentActions.enterMoneyOrderNumber();
});

Given("Enter amount for money order", () => {
  receiptPaymentActions.enterAmountForMoneyOrder();
});

Given(
  "Click Save Payment button on the bottom left of the screen for money order",
  () => {
    receiptPaymentActions.clickSavePaymentButtonOnTheBottomLeftOfTheScreenForMoneyOrder();
  }
);

Then(
  "Notice appears on the scrren to verify the amount of the overpayment",
  () => {
    receiptPaymentActions.noticeAppearsOnTheScrrenToVerifyTheAmountOfTheOverpayment();
  }
);

Given("Click OK", () => {
  receiptPaymentActions.clickOK();
});

Given("Click Save Payment button on the bottom left of the screen", () => {
  receiptPaymentActions.clickSavePaymentButtonOnTheBottomLeftOfTheScreen();
});

Given(
  "Overpayment amount shows in the Refund Payee field in the Manage Overpayments section",
  () => {
    receiptPaymentActions.overpaymentAmountShowsInTheRefundPayeeFieldInTheManageOverpaymentsSection();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    ReceiptPaymentActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "criminalCaseIsCreatedForUserXCaseHasBeenDisposedSentenceHasBeenIncludedWithAFineCostsAndFinesHaveBeenAddedAndSavedPaymentPlanHasBeenCreated"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useCaseFromPreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "goToManageAssessments"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchForPreviousCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseShouldAppearInTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSaveButton"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "closeTab");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useThePriorScenarioCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchForCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseAppearsInTheWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheCheckboxToSelectTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickThePlusSignInTheApplyPaymentsToThePaymentPlanSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "costAssessmentsSectionExpands"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandTheEnterPayorSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterPayorSectionExpands"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheCheckboxUnderDefendantIsPayor"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkmarkAppearsInTheCheckbox"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "defendantsNameAutofillsInTheLastNameAndFirstNameFields"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandTheSelectPaymentTypeSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPaymentTypeSectionsExpands"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheCheckboxInTheOpenManageAssessmentsField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkboxAppearsInTheOpenManageOverpaymentsField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickTheDropdownArrowInThePayTypeDescriptionField"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "selectCash");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickInTheAmountTenderedFieldForCash"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAmountForCash"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickSavePaymentButtonOnTheBottomLeftOfTheScreenForCash"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyAppearsVerifyingPaymentIsSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "receiptNumberShowsInTheViewPaymentSummarySection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnNewPaymentAfterCash"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCreditCard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickInTheAmountTenderedFieldForCreditCard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterConfirmationNumberForCreditCard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAmountForCreditCard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnNewPayment"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCheck"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCheckNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAmountForCheck"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickSavePaymentButtonOnTheBottomLeftOfTheScreenCreditCard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnNewPaymentAfterCreditCard"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectMoneyOrder"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterMoneyOrderNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAmountForMoneyOrder"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickSavePaymentButtonOnTheBottomLeftOfTheScreenForMoneyOrder"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "noticeAppearsOnTheScrrenToVerifyTheAmountOfTheOverpayment"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickOK");
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickSavePaymentButtonOnTheBottomLeftOfTheScreen"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "overpaymentAmountShowsInTheRefundPayeeFieldInTheManageOverpaymentsSection"
  );
  cy.writeFile("./differences/ReceiptPaymentActions.tmp", propertyNames);
}
