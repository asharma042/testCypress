/// <reference types="cypress" />

export default class AdditionalDocketDataInputCaseElements {
  criminalCourtDispositionCaseIdRadioButton() {
    return cy.get("#caseIdRadio");
  }

  criminalCourtDispositionMySerachInput() {
    return cy.get('input[id ^= "courtDispSearchById_"]');
  }

  criminalCorutDispositionApplyDispositionToMultipleChargesButton() {
    return cy.get('button[data-target ^= "#applyDispoAllChrg_"]');
  }

  applyDispostionToMultipleChargesDialog() {
    return cy.get("div[aria-describedby=disposeAllChargesDialog]");
  }

  applyDispostionToMultipleChargesDialogChargeDispostionDropDown() {
    return this.applyDispostionToMultipleChargesDialog().find(
      "button[data-id = chargeDisp]"
    );
  }

  applyDispostionToMultipleChargesDialogChargeDispostionDropDownTextInput() {
    return this.applyDispostionToMultipleChargesDialog()
      .find("div.allChrgDispnSelect.bootstrap-select")
      .find("div.dropdown-menu.open > div > input");
  }

  applyDispostionToMultipleChargesDialogApplyButton() {
    return this.applyDispostionToMultipleChargesDialog()
      .find("button")
      .contains("Apply");
  }

  criminalCourtDispostionSaveButton() {
    return cy.get("button.courtDispositionSaveBtn");
  }

  courtDispositonEventClosureDialogSaveButton() {
    return cy
      .get("div[aria-describedby=closeEventsDialog]")
      .find("button")
      .contains("Save");
  }

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
