/// <reference types="cypress" />

export default class DocumentCaseFileTransferElements {
  caseFileTransferDiv() {
    return cy.get('div[data-target ^= "#caseFileTransferDiv_"]');
  }

  caseFileInquiryDiv() {
    return cy.get('div[data-target ^= "#caseJackInqRecordsDiv_"]');
  }

  caseFileTransferTable() {
    return cy.get(
      'table[id ^= "tableSorterColumnPreferencesInputCases_"] > tbody'
    );
  }

  caseFileTransferTableHeaderRow() {
    return cy
      .get('table[id ^= "tableSorterColumnPreferencesInputCases_"]')
      .find("tr.input-group-xs.ui-widget-header");
  }

  caseFileTransferCaseIdInput() {
    return this.caseFileTransferTable()
      .find("tr")
      .eq(-1)
      .find('[data-label="Enter Case Id"] > input[name=enterCaseId]');
  }

  caseFileTransferStyleOfCase(rowId) {
    return this.caseFileTransferTable()
      .find('td[data-label="Style of Case"]>span')
      .eq(rowId);
  }

  caseFileTransferFileLocationInput(rowId) {
    return this.caseFileTransferTable()
      .find("tr")
      .eq(rowId)
      .find('[data-label="File Location"] > input[name=fileLocation]');
  }

  caseFileTransferTextInput(rowId) {
    return this.caseFileTransferTable()
      .find("tr")
      .eq(rowId)
      .find('[data-label="Text"] > input[name=text]');
  }

  caseFileTransferReasonInput(rowId) {
    return this.caseFileTransferTable()
      .find("tr")
      .eq(rowId)
      .find('[data-label="Enter transfer reason"] > input[name=enterCaseId]');
  }

  transferCaseFilesButton() {
    return cy.get(" button > strong").contains("Transfer Case File(s)");
  }

  getTabCloseIcon() {
    return cy.get(".close-tab-span").eq(-1);
  }

  smartAlertBoxYesButton() {
    return cy.get(".smartAlertButton[data-id = yes]");
  }

  caseFileInquiryCaseId() {
    return cy.get(`input[id ^= "caseJacketCaseDescSearch_"]`);
  }

  caseFileInquiryQueryCaseFileLocationButton() {
    return cy.get("button > strong").contains("Query Case File Location");
  }

  caseFileInquiryTable() {
    return cy.get('table[data-process-name="caseFileInquiry"]');
  }

  caseFileInquiryCaseIdInput() {
    return this.caseFileInquiryTable().find("tbody").find("td.mcdCaseNum");
  }

  caseFileInquiryLocationDescriptionField() {
    return this.caseFileInquiryTable().find("tbody").find("td.locnName");
  }

  caseFileTransferResetButton() {
    return cy.get("button > strong").contains("Reset");
  }

  caseFileTransferProcessContinuationButton() {
    return cy.get("button > span").contains("Process Continuation...");
  }

  caseFileTransferProcessContinuationDiv() {
    return cy.get('div[class ^= "caseTransferProcess_"]');
  }

  caseFileTransferSearchBoxInput() {
    return this.caseFileTransferProcessContinuationDiv().find(
      "div.bs-searchbox > input"
    );
  }

  processContinuationActionResultPageBreadCrumbUI() {
    return cy.get("li#noBreadCrumbDeliciousUl>span");
  }
}
