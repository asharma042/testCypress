/// <reference types="cypress" />

export default class BondPostingwithoutCaseElements {
  financialLocationDropdown() {
    return cy.get("[name=locnCode]");
  }

  manageBondPostingPayorSearch() {
    return cy
      .get(`[id^=finBondPostingPayorButton_]`)
      .not(`.bondPartyNameSearch`);
  }

  manageBondPostingPartyNameDropdown() {
    return cy.get(`[id^=bondPartyName_]`);
  }

  manageBondPostingPayorLastNameInputField() {
    return cy.get(`[id^=lastName_]`);
  }

  manageBondPostingPayorFirstNameInputField() {
    return cy.get(`[id^=firstName_]`);
  }

  manageBondPostingMyPayorSearchAddAndCloseButton() {
    return cy.get(`#SaveCloseRefundPayee`);
  }

  manageBondPostingPartyAddressInfoAlert() {
    return cy.get(`.smartAlertActive`);
  }

  manageBondPostingPayorDropdown() {
    return cy.get(`[id^=bondPayor_]`);
  }

  manageBondPostingPayorAndPartyAreTheSameCheckBox() {
    return cy.get(".same_as_payor_check");
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

  manageBondPostingBondPaymentsAddAdditionalPaymentButton() {
    return cy.get(`.additionalPaymentButton`);
  }

  manageBondPostingBondPaymentsBondTypeRow() {
    return cy.get(`[id^=addBondPayRow_]`);
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

  myPayorSearch() {
    return cy.get("[id^=myDefendantSearchText_]");
  }

  myDefendantSearchText() {
    return cy.get("[id^=myDefendantSearchText_]");
  }

  nameSearchType() {
    return cy
      .get("[id^=openSearchFieldsDialog_]")
      .closest("div")
      .find(".dropdown-toggle");
  }

  prefSearchOpt() {
    return cy.get(".prefSearchOpt");
  }

  nameSearchOpt() {
    return cy.get(".nameSearchOpt");
  }
}
