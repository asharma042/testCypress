/// <reference types="cypress" />

export default class ReceiptPaymentElements {
  caseIdSearchBox() {
    return cy.get(".caseIdSearchInput");
  }
  caseId() {
    return cy.get(".caseNumFin");
  }
  caseCheckBox() {
    return cy.get(`[name=financialCaseSelectRowCheckBox]`);
  }
  accordionToggle() {
    return cy.get(".accordion-toggle");
  }
  costAssessmentSection() {
    return cy.get(".textCostHeader");
  }
  expandPayorSection() {
    return cy.get(".payorReceiptHeaderButton");
  }
  confirmPayorSectionExpands() {
    return cy.get('[aria-expanded="true"]');
  }
  confirmSelectPaymentTypeExpands() {
    return cy.get('[aria-expanded="true"]');
  }
  payorLastName() {
    return cy.get(".smcMuniTrfcFinancialPersonLastName");
  }
  payorFirstName() {
    return cy.get(".smcMuniTrfcFinancialPersonFirstName");
  }
  confirmExpansionOfPaymentTypeSection() {
    return cy.get(".additionalPaymentTypeAddRowParentDiv");
  }
  manageOverpaymentCheckBox() {
    return cy.get(".smcMuniTrfcRefundOpenItemCheckbox");
  }
  selectCash(cash) {
    return cy.get(`span:contains("${cash}")`);
  }
  amountTenderedField() {
    return cy.get(".receiptingAmountTendered");
  }
  savePaymentButton() {
    return cy.get(".receiptingSaveBtn");
  }
  checkForReceiptNumber() {
    return cy.get(".receiptNumberRadioCss");
  }
  clickOkOnSmartAlert() {
    return cy.get("[data-id=ok]");
  }
  saveButtonOnManageAssessments() {
    return cy.get(".manageAssessmsntSaveBtn");
  }
  resultsTable() {
    return cy.get(`[data-process-name=finmanageassessments]`);
  }
  searchInput() {
    return cy.get(`[id^=finCostCaseId]`);
  }
  seachByCaseIdButton() {
    return cy.get(`[id^=finCaseIdRadio]`);
  }
  getCloseTab() {
    return cy.get(".close-tab-span");
  }
  takeNewPaymentButton() {
    return cy.get(".receiptingNewReceiptBtn");
  }
  payTypeDropDown() {
    return cy.get(".smcPayTypeDescSelect").then(($ele) => {
      return $ele[1];
    });
  }
  dropDown() {
    return cy.get("[data-id^=payTypeDesc_]").then(($ele) => {
      return $ele[0];
    });
  }
  selectCreditCard(creditCard) {
    return cy.get(`span:contains("${creditCard}")`).then(($ele) => {
      return $ele[0];
    });
  }
  selectCheck(check) {
    return cy.get(`span:contains("${check}")`);
  }
  addtionalPaymentButton() {
    return cy.get(".additionalPayTypeBtn");
  }
  selectMoneyOrder(moneyOrder) {
    return cy.get(`span:contains("${moneyOrder}")`);
  }
  confirmationNumberBox() {
    return cy.get(".identifierNumber");
  }
  confirmSmartAlertBox() {
    return cy.get(`[id=smartAlertBox]`);
  }
  clickOkOnSmartAlert() {
    return cy.get("[data-id=ok]");
  }
  overPaymentAmountBox() {
    return cy.get(".receiptingOpenItemsAmt");
  }
  closetab() {
    return cy.get(".close-tab-span");
  }
  defendantIsPayorCheckBox() {
    return cy.get(".payorDefendantChkBox");
  }
}
