/// <reference types="cypress" />

import Utils from "../../../../utils/utils";
import ReceiptPaymentElements from "./ReceiptPaymentElements";
import jsonHandler from "../../../../../fixtures/jsonHandler";
import ManageAssessmentsService from "../../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsService";

export default class ReceiptPaymentActions {
  constructor() {
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();

    this.rpelements = new ReceiptPaymentElements();

    this.tempFileName = "cypress\\temp\\receiptPayment.json";

    this.maService = new ManageAssessmentsService(
      this.tempFileName,
      this.defendant
    );
  }
  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.defendant = $json.defendant;
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }

  /**
   * Scenario: User receipts a payment on a case with payment plan
   */
  criminalCaseIsCreatedForUserXCaseHasBeenDisposedSentenceHasBeenIncludedWithAFineCostsAndFinesHaveBeenAddedAndSavedPaymentPlanHasBeenCreated() {
    this.scenario = "scenario1";
    this.maService.createGenericCase(this.scenario);
  }
  /**
   * Scenario: Saving case information in manage assessments
   */
  useCaseFromPreviousScenario() {
    this.scenario = "scenario1";
    this.readRunTimeFile();
  }

  goToManageAssessments() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.clickMenu("Manage Assessments");
  }

  searchForPreviousCase() {
    this.rpelements.seachByCaseIdButton().click();
    //enter previous case
    cy.intercept("smc-web/getCourtLocnDispCasesById*").as("LocnDispCasesById");
    cy.get("@defendant").then(($defendant) => {
      this.rpelements.searchInput().type(`${$defendant.caseId}{enter}`);
    });
    cy.wait(["@LocnDispCasesById"]);
  }

  caseShouldAppearInTable() {
    //check that the case appeared in the table
    this.rpelements.resultsTable().then(($table) => {
      cy.get("@defendant").then(($defendant) => {
        cy.wrap($table[0]).contains("td", $defendant.caseId).should("exist");
      });
    });
  }

  selectSaveButton() {
    cy.intercept("smc-web/saveAssessmentsOnCase*").as("saveAssessmentsOnCase");
    cy.intercept("smc-web/getCostAssessmentsOnCase*").as(
      "getCostAssessmentsOnCase"
    );
    cy.intercept("smc-web/getFineAssessmentsOnCaseV2*").as(
      "getFineAssessmentsOnCaseV2"
    );
    cy.intercept("smc-web/validateRoleAsSupervisor*").as(
      "validateRoleAsSupervisor"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.saveButtonOnManageAssessments().click();

    cy.wait([
      "@saveAssessmentsOnCase",
      "@getCostAssessmentsOnCase",
      "@getFineAssessmentsOnCaseV2",
      "@validateRoleAsSupervisor",
      "@saveUserNotyMessages",
    ]);
  }
  closeTab() {
    this.rpelements.getCloseTab().click();
  }

  /**
   * Scenario: Proceed with case
   */
  useThePriorScenarioCase() {
    this.scenario = "scenario1";
    this.readRunTimeFile();
  }

  searchForCase() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.clickMenu("Receipt Payment");

    cy.intercept("smc-web/getCourtLocnDispCasesById*").as(
      "getCourtLocnDispCasesById"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/smcFormRequest/getAssesedCostByCaseId.do*").as(
      "getAssesedCostByCaseId"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/getAssessmentsOnCase*").as("getAssessmentsOnCase");
    cy.intercept("smc-web/getFineAssessmentsOnCase*").as(
      "getFineAssessmentsOnCase"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    cy.get("@defendant").then(($defendant) => {
      this.rpelements.caseIdSearchBox().type(`${$defendant.caseId}{enter}`);
    });
    cy.wait([
      "@getCourtLocnDispCasesById",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getAssesedCostByCaseId",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@getAssessmentsOnCase",
      "@getFineAssessmentsOnCase",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }

  caseAppearsInTheWindow() {
    cy.get("@defendant").then(($defendant) => {
      this.rpelements.caseId().contains($defendant.caseId);
    });
  }

  clickTheCheckboxToSelectTheCase() {
    this.rpelements.caseCheckBox().click();
  }

  clickThePlusSignInTheApplyPaymentsToThePaymentPlanSection() {
    this.rpelements.accordionToggle().click();
  }

  costAssessmentsSectionExpands() {
    this.rpelements.costAssessmentSection().contains("Cost Assessments");
  }

  expandTheEnterPayorSection() {
    this.rpelements.expandPayorSection().click();
  }

  enterPayorSectionExpands() {
    this.rpelements.confirmPayorSectionExpands();
  }

  clickTheCheckboxUnderDefendantIsPayor() {
    //already comes prechecked
  }

  checkmarkAppearsInTheCheckbox() {
    this.rpelements.defendantIsPayorCheckBox().then(($ele) => {
      expect($ele.val() === "on").to.be.true;
    });
  }

  defendantsNameAutofillsInTheLastNameAndFirstNameFields() {
    //confirming last name
    cy.get("@defendant").then(($defendant) => {
      this.rpelements.payorLastName().then(($ele) => {
        expect(
          $ele[0].value === $defendant.lastName.toUpperCase(),
          `expected '${$defendant.lastName.toUpperCase()}' but found '${
            $ele[0].value
          }'`
        ).to.be.true;
      });
    });
    //confirming first name
    cy.get("@defendant").then(($defendant) => {
      this.rpelements.payorFirstName().then(($ele) => {
        expect(
          $ele[0].value === $defendant.firstName.toUpperCase(),
          `expected '${$defendant.firstName.toUpperCase()}' but found '${
            $ele[0].value
          }'`
        ).to.be.true;
      });
    });
  }

  expandTheSelectPaymentTypeSection() {
    //already expands on its own
    this.rpelements.confirmSelectPaymentTypeExpands();
  }

  selectPaymentTypeSectionsExpands() {
    this.rpelements.confirmExpansionOfPaymentTypeSection().should("be.visible");
  }

  clickTheCheckboxInTheOpenManageAssessmentsField() {
    this.rpelements.manageOverpaymentCheckBox().click();
  }

  checkboxAppearsInTheOpenManageOverpaymentsField() {
    //no op
  }

  clickTheDropdownArrowInThePayTypeDescriptionField() {
    //doing this function in the next function
  }

  selectCash() {
    this.rpelements.dropDown().click().type(`1100{enter}`);
  }

  clickInTheAmountTenderedFieldForCash() {
    this.rpelements.amountTenderedField().click();
  }

  enterAmountForCash() {
    let cashAmount = jsonHandler.getValue("scenario3", "cashAmount");

    this.rpelements.amountTenderedField().type(cashAmount);
  }

  clickSavePaymentButtonOnTheBottomLeftOfTheScreenForCash() {
    cy.intercept("smc-web/saveFinancialPayment*").as("saveFinancialPayment");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.savePaymentButton().click();

    cy.wait([
      "@saveFinancialPayment",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }

  greenNotyAppearsVerifyingPaymentIsSaved() {
    this.utils.clearNotyMessages();
  }

  receiptNumberShowsInTheViewPaymentSummarySection() {
    this.rpelements.checkForReceiptNumber().should("be.visible");
  }

  clickOnNewPaymentAfterCash() {
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/getPaymentTypeDescs*").as("getPaymentTypeDescs");
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getCasesInfoWithPaymentPlan*").as(
      "getCasesInfoWithPaymentPlan"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/insertPaymentAppliedForCases*").as(
      "insertPaymentAppliedForCases"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/getAccountingOpenItemsInfo*").as(
      "getAccountingOpenItemsInfo"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.takeNewPaymentButton().click();

    cy.wait([
      "@myDefendantSearch",
      "@getPaymentTypeDescs",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getCasesInfoWithPaymentPlan",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@insertPaymentAppliedForCases",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@getAccountingOpenItemsInfo",
      "@saveUserNotyMessages",
    ]);
  }

  selectCreditCard() {
    this.rpelements.dropDown().click().type(`1103{enter}`);
  }

  clickInTheAmountTenderedFieldForCreditCard() {
    this.rpelements.amountTenderedField().click();
  }

  enterConfirmationNumberForCreditCard() {
    this.rpelements
      .confirmationNumberBox()
      .type(Math.floor(Math.random() * 10000) + 1000);
  }

  enterAmountForCreditCard() {
    let creditCardAmount = jsonHandler.getValue(
      "scenario3",
      "creditCardAmount"
    );

    this.rpelements.amountTenderedField().type(creditCardAmount);

    cy.intercept("smc-web/saveFinancialPayment*").as("saveFinancialPayment");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.savePaymentButton().click();

    cy.wait([
      "@saveFinancialPayment",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }
  clickOnNewPayment() {
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/getPaymentTypeDescs*").as("getPaymentTypeDescs");
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getCasesInfoWithPaymentPlan*").as(
      "getCasesInfoWithPaymentPlan"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/insertPaymentAppliedForCases*").as(
      "insertPaymentAppliedForCases"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/getAccountingOpenItemsInfo*").as(
      "getAccountingOpenItemsInfo"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.takeNewPaymentButton().click();

    cy.wait([
      "@myDefendantSearch",
      "@getPaymentTypeDescs",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getCasesInfoWithPaymentPlan",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@insertPaymentAppliedForCases",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@getAccountingOpenItemsInfo",
      "@saveUserNotyMessages",
    ]);
  }

  selectCheck() {
    this.rpelements.dropDown().click().type(`1101{enter}`);
  }

  enterCheckNumber() {
    this.rpelements
      .confirmationNumberBox()
      .type(Math.floor(Math.random() * 10000) + 1000);
  }

  enterAmountForCheck() {
    let checkAmount = jsonHandler.getValue("scenario3", "checkAmount");
    this.rpelements.amountTenderedField().type(checkAmount);
  }

  clickSavePaymentButtonOnTheBottomLeftOfTheScreenCreditCard() {
    cy.intercept("smc-web/saveFinancialPayment*").as("saveFinancialPayment");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.savePaymentButton().click();

    cy.wait([
      "@saveFinancialPayment",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }

  clickOnNewPaymentAfterCreditCard() {
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/getPaymentTypeDescs*").as("getPaymentTypeDescs");
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getCasesInfoWithPaymentPlan*").as(
      "getCasesInfoWithPaymentPlan"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/insertPaymentAppliedForCases*").as(
      "insertPaymentAppliedForCases"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/getAccountingOpenItemsInfo*").as(
      "getAccountingOpenItemsInfo"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.takeNewPaymentButton().click();

    cy.wait([
      "@myDefendantSearch",
      "@getPaymentTypeDescs",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getCasesInfoWithPaymentPlan",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@insertPaymentAppliedForCases",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@getAccountingOpenItemsInfo",
      "@saveUserNotyMessages",
    ]);
  }

  selectMoneyOrder() {
    this.rpelements.dropDown().click().type(`1102{enter}`);
  }

  enterMoneyOrderNumber() {
    this.rpelements
      .confirmationNumberBox()
      .type(Math.floor(Math.random() * 10000) + 1000);
  }

  enterAmountForMoneyOrder() {
    let moneyOrderAmount = jsonHandler.getValue(
      "scenario3",
      "moneyOrderAmount"
    );

    this.rpelements
      .confirmationNumberBox()
      .type(Math.floor(Math.random() * 10000) + 1000);

    this.rpelements.amountTenderedField().type(moneyOrderAmount);
  }
  clickSavePaymentButtonOnTheBottomLeftOfTheScreenForMoneyOrder() {
    cy.intercept("smc-web/saveFinancialPayment*").as("saveFinancialPayment");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.savePaymentButton().click();

    cy.wait([
      "@saveFinancialPayment",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }

  noticeAppearsOnTheScrrenToVerifyTheAmountOfTheOverpayment() {
    this.rpelements.confirmSmartAlertBox().should("be.visible");
  }

  clickOK() {
    this.rpelements.clickOkOnSmartAlert().click();
  }

  clickSavePaymentButtonOnTheBottomLeftOfTheScreen() {
    cy.intercept("smc-web/saveFinancialPayment*").as("saveFinancialPayment");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.rpelements.savePaymentButton().click();

    cy.wait([
      "@saveFinancialPayment",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }

  overpaymentAmountShowsInTheRefundPayeeFieldInTheManageOverpaymentsSection() {
    this.rpelements.overPaymentAmountBox().should("be.visible");
    this.rpelements.closetab().click();
  }
}
