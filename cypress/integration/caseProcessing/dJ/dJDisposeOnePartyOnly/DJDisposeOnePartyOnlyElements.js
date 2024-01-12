/// <reference types="cypress" />

export default class DJDisposeOnePartyOnlyElements {
  getSearchCaseIdButton() {
    return cy.get("#caseIdCivilDispoJdgmntRadio");
  }

  getSearchInput() {
    return cy.get("[id^=civilDispoJdgmntSearchByCaseId_]");
  }

  getCaseTable() {
    return cy.get("#civilDispoJdgmntTable");
  }

  getCaseDispositionJudgmRow() {
    return this.getCaseTable().find('tr[id ^= "dispoJdgmntCaseRow_"]');
  }

  getCasePartiesSelectAllCheckbox(rowNumber) {
    return cy.get("[name=checkboxPartiesSelectAll]").then(($ele) => {
      if ($ele && $ele.length > 1) {
        return $ele[rowNumber];
      }
      return $ele;
    });
  }

  getCasePartiesCheckbox(rowNumber) {
    return cy.get(".checkboxDispoJdgmntPartiesSelect").then(($ele) => {
      if ($ele && $ele.length > 1) {
        return $ele[rowNumber];
      }
      return $ele;
    });
  }

  getCasePartiesPartyDispositionPencilIcon(rowNumber) {
    return cy.get(".partyDispositionCodeEditable").then(($ele) => {
      if ($ele && $ele.length > 1) {
        return $ele[rowNumber];
      }
      return $ele;
    });
  }

  getCasePartiesPartyDispositionInput(value) {
    return cy
      .get("button")
      .contains(value) // span is the subject
      .parent(); // move up to the button
  }

  getCasePartiesPartyDispositionSearchInput() {
    return cy.get(
      "#dispoJdgmntCasePartiesDiv_ > table > tbody > tr.dbsmc.accordion-toggle.noHoverEffect.dispoJdgmntPartiesChangeRemoveRow.odd.ui-state-default.dispoJdgmntPartiesEditableRowDirty > td.partyDisposition > div > span > div > form > div > div:nth-child(2) > div.editable-input.input-group-xs > div > div > div > input"
    );
  }

  getCasePartiesPartyDispositionCheckmarkIcon() {
    return cy.get(".editable-submit > .editable-button-icon");
  }

  getCasePartiesResultsTable() {
    return cy.get("[data-process-name=dispoJdgmntCasePartyResults");
  }

  getCasePartiesSaveCasePartiesDisposition(value) {
    return cy
      .get("button")
      .contains(value) // span is the subject
      .parent(); // move up to the button
  }

  getDispositionAndJudgementCloseTabIcon() {
    return cy.get(".close-tab-span");
  }

  getCaseDispositionUnavaiableAlertText() {
    return cy.get("#smartAlertScrollArea");
  }

  getCaseDispositionUnavailableOkButton() {
    return cy.get(".smartAlertButton");
  }

  getCaseDispositionSectionCaseDispositionButton(rowNumber) {
    return cy.get("[data-id^=docketCode_]").then(($ele) => {
      if ($ele && $ele.length > 1) {
        return $ele[rowNumber];
      }
      return $ele;
    });
  }

  getCaseDispositionSectionExpandIcon() {
    return cy.get(
      ".dispoJdgmntCaseDispositionSection > .smc-sub-process > .form-control > .glyphicon"
    );
  }

  getCaseDispositionSectionDispositionDate() {
    return cy.get("[id^=dispositionDateField_]");
  }

  getCaseDispositionSectionDispositionTime() {
    return cy.get("[id^=dispositionTime_]");
  }

  getCaseDispositionSectionDispositionPreDefinedText() {
    return cy.get("[id^=preDefinedTextArea_]");
  }

  getCaseDispositionSectionSaveDispositionButton() {
    return cy.get(".dispoJdgmntSaveCaseDispositionBtn");
  }
}
