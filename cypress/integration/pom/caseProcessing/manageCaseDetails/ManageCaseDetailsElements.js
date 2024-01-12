/// <reference types="cypress" />

export default class ManageCaseDetailsElements {
  manageCaseDetailsSubMenu() {
    return cy
      .get('div[data-label="Manage Case Details"]')
      .find("span.menu-text")
      .contains("Manage Case Details");
  }

  manageCaseDetailsCaseIdRadioButton() {
    return cy.get("input#caseIdMcdRadio");
  }

  manageCaseDetailsSearchInput() {
    return cy.get('input[id ^= "mcdSearchByCaseId_"]');
  }

  manageCaseDetailsArrestInformationTab() {
    return cy.get('li[aria-controls ^= "mcdArrestContainer"]>a');
  }

  manageCaseDetailsArrestInformationDiv() {
    return cy.get('div[id ^= "mcdArrestContainer"]');
  }

  manageCaseDetailsArrestInformationCasePartiesSpan() {
    return this.manageCaseDetailsArrestInformationDiv().find(
      "div.dropdown-casePartiesArrestInfo>button>span"
    );
  }

  manageCaseDetailsAddArrestRecordButton() {
    return this.manageCaseDetailsArrestInformationDiv()
      .find("button")
      .contains("Add Arrest Record");
  }

  addArrestRecordPopUpWindowDiv() {
    return cy.get('div[aria-describedby ^= "addArrestRecordsWindow_"]');
  }

  addArrestRecordPopUpArrestReportInput() {
    return this.addArrestRecordPopUpWindowDiv().find(
      'input[id ^= "arrestReportNum_"]'
    );
  }

  addArrestRecordPopUpArrestDateInput() {
    return this.addArrestRecordPopUpWindowDiv().find(
      'input[id ^= "addPartyArrestDate_"]'
    );
  }

  addArrestRecordPopUpArrestingAgencyInput() {
    return this.addArrestRecordPopUpWindowDiv().find(
      'input[id ^= "arrestingAgencyOri_"]'
    );
  }

  addArrestRecordPopUpSaveArrestRecordButton() {
    return this.addArrestRecordPopUpWindowDiv()
      .find("button")
      .contains("Save Arrest Record");
  }

  manageCaseDetailsArrestRecordTable() {
    return cy.get(
      'table[data-process-name = "arrestRecordsListForMcd"] > tbody'
    );
  }

  closeTabButton() {
    return cy.get(`.close-tab-btn`);
  }
}
