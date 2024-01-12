/// <reference types="cypress" />

export default class DocumentCaseFileInquiryElements {
  caseFileTransferTable() {
    return cy.get(
      'table[id ^= "tableSorterColumnPreferencesInputCases_"] > tbody'
    );
  }

  caseFileTransferCaseIdInput() {
    return this.caseFileTransferTable()
      .find("tr")
      .eq(-1)
      .find('[data-label="Enter Case Id"] > input[name=enterCaseId]');
  }

  caseFileTransferFileLocationInput(rowId) {
    return this.caseFileTransferTable()
      .find("tr")
      .eq(rowId)
      .find('[data-label="File Location"] > input[name=fileLocation]');
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

  caseFileInquiryDiv() {
    return cy.get('div[data-target ^= "#caseJackInqRecordsDiv_"]');
  }

  caseFileInquiryCaseId() {
    return cy.get(`input[id ^= "caseJacketCaseDescSearch_"]`);
  }

  caseFileInquiryQueryCaseFileLocationButton() {
    return cy.get("button > strong").contains("Query Case File Location");
  }

  caseFileInquiryDisplayOnlyCurrentRecordInput() {
    return cy.get('input[title="Display only current record"]');
  }

  caseFileInquiryResultsRow() {
    return cy.get(
      'table[data-process-name=caseFileInquiry]>tbody>tr[data-target="#mcdCaseHeaderCaseResults"]'
    );
  }

  caseFileInquiryTableHeaderRow() {
    return cy
      .get(
        "table[data-process-name=caseFileInquiry]>thead>tr.tablesorter-headerRow"
      )
      .first();
  }

  caseFileInquirySaveFilterPreferencesButton() {
    return cy.get('button[title="Save Filter Preferences"]');
  }
}
