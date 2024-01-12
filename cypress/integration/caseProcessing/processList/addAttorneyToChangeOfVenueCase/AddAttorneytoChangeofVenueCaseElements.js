/// <reference types="cypress" />

export default class AddAttorneytoChangeofVenueCaseElements {
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

  closeTabIcon() {
    return cy.get(".close-tab-span").eq(-1);
  }

  saveTheListPopUpYesButton() {
    return cy.get("div.smartAlertButton[data-id=yes]");
  }

  maintainCasePartiesCaseIdRadioButton() {
    return cy.get("input#caseIdPartiesRadio");
  }

  manageCasePartiesMyPartiesSearchInput() {
    return cy.get('input[id^="partiesCasesSearchById_"]');
  }

  manageCasePartiesCasePartiesHeader() {
    return cy.get('div[data-target ^= "#collapseCaseParties_"]');
  }

  casePartiesTable() {
    return cy
      .get(
        "table.smcMuniTrfcCasePartiesTable[data-process-name=casePartyResults]"
      )
      .first();
  }

  casePartiesSubCaseToggle() {
    return cy
      .get("table[data-process-name=partiesVC]>tbody>tr.partyCaseResultRow")
      .eq(-1);
  }

  casePartiesExpandCollapseChevron() {
    return cy
      .get(`div[data-target ^= "#collapseCaseParties_"]`)
      .contains("Case Parties");
  }

  casePartiesTable() {
    return cy
      .get(
        "table.smcMuniTrfcCasePartiesTable[data-process-name=casePartyResults]"
      )
      .first();
  }
}
