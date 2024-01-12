/// <reference types="cypress" />

export default class AddDocketEntrySelectListElements {
  manageDocketTable() {
    return cy.get(
      'table.hasStickyHeaders[data-process-name="smcLProcManageDockets"]'
    );
  }

  manageDocketTableHeaderRow() {
    return this.manageDocketTable().find("tr.tablesorter-headerRow");
  }

  selectAllCheckBox() {
    return this.manageDocketTableHeaderRow().find("input[type=checkbox]");
  }

  enterDocketInformationButton() {
    return cy.get("button.listProcAddDocketsBtn.listProcManageDocketsBtn");
  }

  saveTheListSmartAlertBox() {
    return cy.get("#smartAlertBox");
  }

  saveTheListSmartAlertBoxButtons(buttonName) {
    return this.saveTheListSmartAlertBox()
      .find("#smartAlertButtons > div")
      .contains(buttonName);
  }

  selectListTabClose() {
    return cy.get(".close-tab-span");
  }
}
