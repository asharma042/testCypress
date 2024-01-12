/// <reference types="cypress" />

export default class AgedTrialBalanceReportElements {
  reportSummaryOrDetailRadioButton(type) {
    return cy.get("[id^=" + type + "Radio_]");
  }

  myCaseIdSearch() {
    return cy.get("[id^=agedTrialBalanceReportAdvCaseSearch_");
  }

  courtLocation() {
    return cy.get("#locnCode");
  }

  courtLocationSelection() {
    return cy.get("[data-id='locnCode']");
  }

  moreFiltersButton() {
    return cy.get(".glyphicon.expandCollapseIconChevron");
  }

  detailCodeField() {
    return cy.get("#agedTrialBalanceReportDetailCode");
  }

  accountingMethod() {
    return cy.get("#accountingMethod");
  }

  accountingMethodSelected() {
    return cy.get("[data-id='accountingMethod']");
  }

  runOrClearButton(runOrClearValue) {
    return cy.get(".agedTrialBalanceReport" + runOrClearValue + "Button");
  }

  discardProgressButton(yesOrNoValue) {
    return cy.get("#smartAlertBox [data-id='" + yesOrNoValue + "']");
  }
}
