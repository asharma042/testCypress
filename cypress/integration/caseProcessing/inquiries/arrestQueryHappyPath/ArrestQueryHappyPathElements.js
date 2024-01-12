/// <reference types="cypress" />

export default class ArrestQueryHappyPathElements {
  arrestQueryDiv() {
    return cy.get("div[data-smcprocesstoload=ArrestQuery]");
  }

  arrestQueryArrestReportInput() {
    return this.arrestQueryDiv().find('input[id ^= "arrestReportNum_"]');
  }

  arrestQueryCaseIdInput() {
    return this.arrestQueryDiv().find('input[id ^= "arrestQueryCaseId_"]');
  }

  arrestQyeryRunArrestReportButton() {
    return this.arrestQueryDiv().find("button#arrestQuery");
  }

  arrestQuerySearchResultsTable() {
    return this.arrestQueryDiv().find(
      "table[data-process-name=arrestQuerySearchResults] > tbody"
    );
  }

  arrestQueryProcessContinuationDiv() {
    return cy.get("div.processContinuation");
  }

  arrestQueryProcessContinuationButton() {
    return this.arrestQueryProcessContinuationDiv()
      .find("button")
      .contains("Process Continuation...");
  }

  arrestQueryProcessContinuationSearchBox() {
    return this.arrestQueryProcessContinuationDiv().find(
      "div.bs-searchbox > input"
    );
  }

  arrestQueryToSchedulingDiv() {
    return cy.get("div.schedulingSearchWrapper");
  }

  arrestQueryToSchedulingcollapseAddEventSectionBtn() {
    return this.arrestQueryToSchedulingDiv().find(
      "button.collapseAddEventSectionBtn"
    );
  }

  arrestQueryToSchedulingReturnToInitiatingTabButton() {
    return this.arrestQueryToSchedulingDiv().find(
      "button.returnToInitiatingTab"
    );
  }

  closeTabIcon() {
    return cy.get(".close-tab-span");
  }
}
