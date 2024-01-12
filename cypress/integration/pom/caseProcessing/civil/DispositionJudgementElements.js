/// <reference types="cypress" />

export default class DispositionJudgementElements {
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

  getCivilDispositionEventClosureWindowSaveButton() {
    return cy
      .get('[aria-describedby="closeEventsDialog"] > div.ui-dialog-buttonpane')
      .find("button")
      .contains("Save");
  }

  getCivilDispositionEventClosureWindowCloseIcon() {
    return cy.get(
      '[aria-describedby="closeEventsDialog"] > .ui-dialog-titlebar > .ui-button > .ui-button-icon-primary'
    );
  }

  getCaseDispositionPreDefinedTextArea() {
    return cy.get("[id^=preDefinedTextArea_]");
  }

  getJudgmentsCasePartyButton() {
    return cy.get("[data-id=dispoJdgmntCasePartiesNames]");
  }

  getJudgmentsCasePartySearchInput() {
    return cy.get(
      "#dispoJdgmntCasePartiesNames > div > div > div.bs-searchbox > input"
    );
  }

  getJudgmentsAddJudgmentButton() {
    return cy.get("[id^=dispoJdgmntAddJudgmentBtn_]");
  }

  getAddJudgmentPopupWindowSelectedPartyText() {
    return cy.get(".dispoJdgmntDisplaySelectedPartyName > strong");
  }

  getAddJudgmentAgainstForButton() {
    return cy.get("[data-id^=dispoJdgmntAddJudgmentAgainstFor_]");
  }

  getAddJudgmentAgainstForInputSearch() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        return $ele[10];
      });
  }

  getAddJudgmentForText(value) {
    return cy
      .get("label")
      .contains(value) // span is the subject
      .parent();
  }

  getAddJudgmentPartyIdText() {
    return cy.get("[name=partyId]");
  }

  getAddJudgmentMonetaryNonMonetaryButton() {
    return cy.get("[data-id^=dispoJdgmntAddJudgmentMontry_]");
  }

  getAddJudgmentMonetaryNonMonetarySearchInput() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        return $ele[11];
      });
  }

  getAddJudgmentAmountInput() {
    return cy.get("[id^=amount_]");
  }

  getAddJudgmentDescriptionButton() {
    return cy.get("[data-id^=dispoJdgmntAddJudgmentDtypCode_]");
  }

  getAddJudgmentDescriptionSearchInput() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        return $ele[12];
      });
  }

  getAddJudgmentDate() {
    return cy.get("[id^=docketDate_]");
  }

  getAddJudgmentTime() {
    return cy.get("[id^=docketTime_]");
  }

  getAddJudgmentSaveButton() {
    return cy.get("#judgmentDialogSaveBtn");
  }

  getViewUpdateJudgmentsTable() {
    return cy.get("[data-process-name=dispoJdgmntJudgmentsTable]");
  }

  getViewUpdateJudgementsTablePlusIcon(rowNumber) {
    return cy.get(".dispoJdgmntCaseJudgementRow").then(($ele) => {
      return $ele[rowNumber];
    });
  }

  getUpdateDeleteJudgmentEntryTitle(value) {
    return cy
      .get("div")
      .contains(value) // span is the subject
      .parent();
  }

  getUpdateDeleteJudgmentEntryPencilEdit(row) {
    return cy.get('[title="Edit Judgment Record"]').then(($ele) => {
      return $ele[row];
    });
  }

  getUpdateDeleteJudgmentEntryAmount() {
    return cy.get("[id^=amount_]");
  }

  getUpdateDeleteJudgmentEntryReasonForJudgmentChangeButton() {
    return cy.get("[data-id^=reasonCodeJudgment_]");
  }

  getUpdateDeleteJudgmentEntryReasonForJudgmentChangeSearchBox() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        return $ele[12];
      });
  }

  getUpdateDeleteJudgmentEntryUpdateJudgmentEntryButton() {
    return cy.get('[title="Click to Update Judgment Docket"]');
  }
}
