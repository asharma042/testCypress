/// <reference types="cypress" />

export default class BondPostingwithcaseElements {
  financialLocationDropdown() {
    return cy.get("[name=locnCode]");
  }

  caseSearchCaseIdRadioButton() {
    return cy.get("#finCaseIdRadio");
  }

  caseSearchMyCaseIdSearchInput() {
    return cy.get("[id^=finCostCaseId]");
  }

  casesCaseBlockTableRow() {
    return cy.get(`.finBondPostingSelectRow`).closest(`tr`);
  }

  caseSearchCasesSelectCaseCheckBox() {
    return cy.get(`[name=finBondPostingCaseSelectRow]`);
  }

  manageBondPostingPayorDropdown() {
    return cy.get(`[id^=bondPayor_]`);
  }

  manageBondPostingPartyNameDropdown() {
    return cy.get(`[id^=bondPartyName_]`);
  }

  manageBondPostingBondAmountOrderedField() {
    return cy.get(`[id^=totalBondAmtApply_]`);
  }

  manageBondPostingBondAmountToPostField() {
    return cy.get(`#bondAmtToCollect`);
  }

  manageBondPostingBondPaymentsAmountToCollect() {
    return cy.get(`.totalBondAmt`);
  }

  manageBondPostingBondAmountBondPercentage() {
    return cy.get(`[id^=bondPercentage_]`);
  }

  manageBondPostingBondAmountBondPayType() {
    return cy.get(`[data-id^=bondPayTypeDesc_]`);
  }

  manageBondPostingBondPaymentsBondIdentifierNo() {
    return cy.get(`.bondIdentifierNo`);
  }

  manageBondPostingBondPaymentsBondAmountTendered() {
    return cy.get(`.bondAmountTendered`);
  }

  manageBondPostingSaveButton() {
    return cy.get(`.saveBondPostingButton`);
  }

  manageBondPostingBondID() {
    return cy.get(`.bondIdNumber`);
  }

  manageBondPostingReceiptNumber() {
    return cy.get(`.receiptNumber`);
  }

  closeTab() {
    return cy.get(".close-tab-span");
  }

  BodyForUnsavedChangesAlert() {
    return cy.get(`body`);
  }
}
