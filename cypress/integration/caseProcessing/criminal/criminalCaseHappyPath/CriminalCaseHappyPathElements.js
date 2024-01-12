/// <reference types="cypress" />

export default class CriminalCaseHappyPathElements {
  /////////////////////////////
  // Financial - Save Assessments to Case
  ////////////////////////////////////

  financial_floppyDiskSaveIcon() {
    return cy.get(".floppySaveIcon");
  }
  financial_save_button() {
    return cy.get(".manageAssessmsntSaveBtn");
  }

  financial_manageAssest_closeButton() {
    return cy.get(".close-tab-btn");
  }

  /////////////////////////////////////////
  // Financial - Take a Receipt on Case
  ////////////////////////////////////////
  financial_receipt_caseIdRadio() {
    return cy.get("[id^=finCaseIdRadio_]");
  }

  financial_receipt_searchInput() {
    return cy.get("[id^=finCostCaseId-]");
  }

  financial_receipt_selectCaseTdInput() {
    return cy.get('input[name="financialCaseSelectRowCheckBox"]');
  }

  financial_receipt_applyPayments_openCase() {
    return cy.get(".finReceiptPayApplyCase");
  }

  financial_receipt_applyFullAmount() {
    return cy.get("[id^=applyAmt-]");
  }

  financial_receipt_applyAmountToCase() {
    return cy.get("[id^=paymentAmt-]");
  }

  financial_receipt_payTypeDescription() {
    return cy.get("[data-id^=payTypeDesc_]");
  }

  financial_receipt_payTypeDescriptionSearchInput() {
    return cy
      .get("[id^=additionalPaymentTypeAddRowOneId_]")
      .find(
        "div.col-md-3.col-sm-3.form-group.input-group-xs.paddingnarrow > div > div > div > input"
      );
  }

  financial_receipt_amountTenderedInput() {
    return cy.get(".receiptingAmountTendered");
  }

  financial_receipt_savePaymentButton() {
    return cy.get(".receiptingSaveBtn");
  }

  financial_receipt_receiptNumber() {
    return cy.get(".receiptNumber");
  }

  financial_receipt_viewPaymentSummaryTable() {
    return cy.get(".viewSummaryPayment");
  }

  financial_receipt_receiptNumber_link() {
    return cy.get(".printReceiptLink.hyperlink");
  }

  financial_receipt_payment_closeTab() {
    return cy.get(".close-tab-span");
  }
}
