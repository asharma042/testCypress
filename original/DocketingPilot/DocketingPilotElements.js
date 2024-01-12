/// <reference types="cypress" />

export default class DocketingPilotElements {
  blockUI() {
    return cy.get("div").should("have.class", "blockUI blockMsg blockPage");
  }

  myCaseIdSearch() {
    return cy.get("[id^=docketEntrySearchByCaseId_");
  }

  searchResultCaseId(id) {
    return cy.get("a[class*='caseNumDocketEntry']").contains(id);
  }

  //Case Summary
  caseSummaryCaseName() {
    return cy.get(".col-xs-3 > strong");
  }

  caseSummaryPartiesButton() {
    return cy.get("#caseSummaryPartiesButton");
  }

  caseSummaryPartiesDefendant() {
    return cy.get("a[class*='linkToPersonSummary']");
  }

  caseSummaryHearingsScheduledButton() {
    return cy.get("#caseSummaryHearingsButton");
  }

  caseSummaryHearingsScheduled() {
    return cy.get("#caseSummaryHearingsDiv");
  }

  caseSummaryChargesButton() {
    return cy.get("#caseSummaryChargesButton");
  }

  caseSummaryChargesChargeCode() {
    return cy.get("div.col-xs-3.breakChargeCode");
  }

  caseSummarySentenceButton() {
    return cy.get("#caseSummarySentenceButton");
  }

  caseSummarySentenceType() {
    return cy.get("#caseSummarySentenceDiv");
  }

  caseSummaryDocketEntriesButton() {
    return cy.get("#caseSummaryDocketButton");
  }
  caseSummaryDocketEntriesTable() {
    return cy.get("#caseSummaryDocketDiv");
  }
  ///Financial
  searchResultFinancialCaseButton() {
    return cy.get("a[title='Financial Case Summary']");
  }

  financialSummaryCaseName() {
    return cy.get(".caseDescFont > strong");
  }
}
