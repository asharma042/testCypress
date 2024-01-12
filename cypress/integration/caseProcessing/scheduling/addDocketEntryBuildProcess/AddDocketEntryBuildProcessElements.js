/// <reference types="cypress" />

export default class AddDocketEntryBuildProcessElements {
  schedulingProcessListRadioButton() {
    return cy.get("#processListSchedulingRadio");
  }

  schedulingMySchedulingSearchInput() {
    return cy.get('input[id ^= "entrySearchByProcessList_"]');
  }

  processListSchedulingTable() {
    return cy.get("#smcMuniTrfcSchedulingTable");
  }

  processListSchedulingTableHeaderRow() {
    return this.processListSchedulingTable().find("tr.tablesorter-headerRow");
  }

  buildProcessListButton() {
    return cy.get("#buildProcessListButton");
  }

  buildProcessListDialogWindowDiv() {
    return cy.get("div[aria-describedBy=buildProcessListDialog]");
  }

  buildProcessListDialogWindowTitle() {
    return this.buildProcessListDialogWindowDiv()
      .find(".ui-dialog-title")
      .contains("Build Process List");
  }

  buildProcessListDialogWindowSelectAllCheckBox() {
    return this.buildProcessListDialogWindowDiv()
      .find('input[id="blp_select_all_check"]')
      .first();
  }

  buildProcessListDialogWindowSelectCheckBoxesInput() {
    return this.buildProcessListDialogWindowDiv().find(
      ".processListCaseSelectRow >  #blp_case_id_check"
    );
  }

  buildProcessDialogWindowButtons(buttonName) {
    return this.buildProcessListDialogWindowDiv()
      .find("button")
      .contains(buttonName);
  }

  processNowDropdownDiv() {
    return this.buildProcessListDialogWindowDiv().find(
      'div[id ^= "selectBlpBusinessProcessDropDownSection_"]'
    );
  }

  addDocketEntryDropdownTextInput() {
    return this.processNowDropdownDiv().find("div.bs-searchbox > input");
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

  addDocketesDialogWindowdiv() {
    return cy.get('div[aria-describedBy="listProcManageDocketsDialog"]');
  }

  enterDocketCodeButton() {
    return this.addDocketesDialogWindowdiv().find(
      'button[class="btn dropdown-toggle btn-default form-control"][data-id ^= "docketCode_"]'
    );
  }

  enterDocketDescriptionTextInput() {
    return this.addDocketesDialogWindowdiv()
      .find("div.docketCode.bootstrap-select")
      .find("div.dropdown-menu.open > div > input");
  }

  unsecuredBondAmountInput() {
    return cy.get('input.additionalDataField[data-docketcode="BAPBS"]');
  }

  docketFilingPartyDropdownButton() {
    return this.addDocketesDialogWindowdiv().find(
      'button[data-id ^= "docketFilingParty_"]'
    );
  }

  docketFilingPartyDropdownTextInput() {
    return this.addDocketesDialogWindowdiv()
      .find("div.docketFilingParty.bootstrap-select")
      .find("div.dropdown-menu.open > div > input");
  }

  docketDateFieldInput() {
    return this.addDocketesDialogWindowdiv().find(
      "input[id ^= docketDateField_]"
    );
  }

  docketTimeFieldInput() {
    return this.addDocketesDialogWindowdiv().find("input[id ^= docketTime_]");
  }

  addDocketDialogBrowseInput() {
    return this.addDocketesDialogWindowdiv().find(
      "input[id ^= ajax-upload-id]"
    );
  }

  fileUploadStatusBar() {
    return this.addDocketesDialogWindowdiv()
      .find("div.ajax-file-upload-statusbar>div")
      .contains("TestDocument.pdf");
  }

  addDocketDialogSaveApplyToAllButton() {
    return this.addDocketesDialogWindowdiv()
      .find("button > span")
      .contains("Save & Apply to All");
  }

  saveTheListSmartAlertBox() {
    return cy.get("#smartAlertBox");
  }

  selectListTabClose() {
    return cy.get(".close-tab-span");
  }
}
