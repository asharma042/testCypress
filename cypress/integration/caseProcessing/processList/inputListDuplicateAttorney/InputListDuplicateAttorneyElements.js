/// <reference types="cypress" />

export default class InputListDuplicateAttorneyElements {
  enterCaseId() {
    return cy.get(".enterCaseTr > .col-md-3 > .form-control");
  }

  inputCasesProcessNowButton() {
    return cy.get('button[title="Process Now"]');
  }

  selectBusinessProcessDiv() {
    return cy.get('div[id ^= "selectBusinessProcessDropDownSection_"]');
  }

  selectAProcessDropdownSearchBoxInput() {
    return this.selectBusinessProcessDiv().find("div.bs-searchbox > input");
  }

  smcLProcManagePartiesTable() {
    return cy.get(
      'table.hasStickyHeaders[data-process-name="smcLProcManageParties"]'
    );
  }

  smcLProcManagePartiesTableHeaderRow() {
    return this.smcLProcManagePartiesTable().find("tr.tablesorter-headerRow");
  }

  selectAllCheckBox() {
    return this.smcLProcManagePartiesTableHeaderRow().find(
      "input[type=checkbox]"
    );
  }

  enterAttorneyInformationButton() {
    return cy.get("button.listProcAddPartiesBtn");
  }

  addAttorneyDialogWindow() {
    return cy.get("div[aria-describedby=listProcManagePartiesDialog]");
  }

  addAttorneyPartyDescription() {
    return this.addAttorneyDialogWindow().find(
      "button[data-id=addAttorneyPartyDescription]"
    );
  }

  addAttorneyPartyDescriptionSearchBoxInput() {
    return cy
      .get("div.addAttorneyPartyDescription ")
      .find("div.bs-searchbox > input");
  }

  addAttorneyAttorneySearchInput() {
    return this.addAttorneyDialogWindow().find("input#addPartyAttyMobarSearch");
  }

  addAttorneyStartDate() {
    return this.addAttorneyDialogWindow().find(
      'input[id ^= "addPartyAttorneyStartDate_"]'
    );
  }

  addAttorneySaveAndApplyToAllButton() {
    return this.addAttorneyDialogWindow()
      .find("button")
      .contains("Save & Apply to All");
  }

  addAttorneytableRejectedPartiesTable() {
    return cy.get("table[data-process-name=smcLProcRejectedParties]").first();
  }

  addAttorneytableRejectedPartiesTableHeaderRow() {
    return this.addAttorneytableRejectedPartiesTable().find(
      "tr.tablesorter-headerRow"
    );
  }

  addAttorneyDialogWindowXButton() {
    return this.addAttorneyDialogWindow().find(
      "button.ui-dialog-titlebar-close"
    );
  }

  progressInAddAttorneyEntryPopUpYesButton() {
    return cy.get("div.smartAlertButton[data-id=yes]");
  }

  saveThisListPopUpNoButton() {
    return cy.get("div.smartAlertButton").contains("No");
  }

  closeTabIcon() {
    return cy.get(".close-tab-span").eq(-1);
  }
}
