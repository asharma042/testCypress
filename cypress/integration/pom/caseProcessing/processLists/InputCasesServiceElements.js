/// <reference types="cypress" />

export default class InputCasesServiceElements {
  enterCaseId() {
    return cy.get(".enterCaseTr > .col-md-3 > .form-control");
  }

  clickMultiUseListButton() {
    return cy.get(".col-md-12 > .paddingnarrow > .btn > strong");
  }

  enterProcessListName() {
    return cy.get("#listNameId");
  }

  pressSaveButton() {
    return cy.get(
      ".ui-dialog.lProcCreateNewListDialog > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(1) > .ui-button-text"
    );
  }

  closeTab() {
    return cy.get(".close-tab-span");
  }

  closeExitFromProcessListWindow() {
    return cy.get('[data-id="yes"]');
  }

  // Add Docket Entry
  addDocketesDialogWindowdiv() {
    return cy.get('div[aria-describedBy="listProcManageDocketsDialog"]');
  }

  addDocketsDialogWindowTitle() {
    return this.addDocketesDialogWindowdiv()
      .find(".ui-dialog-title")
      .contains("Add Docket(s)");
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
    return cy.get('input.additionalDataField[data-docketcode="BUSP"]');
  }

  searchDocketPredefinedTextarea() {
    return this.addDocketesDialogWindowdiv().find(
      "textarea.docketText.preDefinedTextArea"
    );
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
}
