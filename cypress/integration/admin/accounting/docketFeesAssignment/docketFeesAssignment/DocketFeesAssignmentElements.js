/// <reference types="cypress" />

export default class DocketFeesAssignmentElements {
  locationDropDown() {
    return cy.get(`[id^=locnCodeSelect_]`);
  }

  docketSearchContainer() {
    return cy.get(`[id^=docketAssignment_]`);
  }

  docketTypeSearchBox() {
    return cy.get(`[id^=docketKeyPhrase_]`);
  }

  docketTypeSearchButton() {
    return cy.get(`[id^=docketFeesSearchButton_]`);
  }

  docketTableRow() {
    return cy.get(`[id^=docketResultRow-]`);
  }

  docketDescription() {
    return cy.get(`[id^=description_]`);
  }

  docketStatus() {
    return cy.get(`[id^=status_]`);
  }

  docketContinuance() {
    return cy.get(`[id^=continuance_]`);
  }

  docketDisposition() {
    return cy.get(`[id^=disposition_]`);
  }

  docketActivityDate() {
    return cy.get(`[id^=activityDate_]`);
  }

  feeRowResult() {
    return cy.get(`[id^=feeResultRow-]`);
  }

  addFeeDropDown() {
    return cy.get("[data-id^=fee_]");
  }

  feeTotal() {
    return cy.get("#feeTotal").then(($ele) => {
      return parseFloat($ele.data("feetotal"));
    });
  }

  newFee() {
    return cy.get("[id^=feeAmount_]").then(($ele) => {
      let foo = $ele.filter(`td`);
      return parseFloat(foo[foo.length - 1].dataset.fee);
    });
  }

  saveButton() {
    return cy.get(`#saveButton`);
  }

  yesButton() {
    return cy.get(`.smartAlertActive`);
  }

  greenNoty() {
    return cy.get(`.noty_type_success`);
  }

  closeTabButton() {
    return cy.get(`.close-tab-btn`);
  }
}
