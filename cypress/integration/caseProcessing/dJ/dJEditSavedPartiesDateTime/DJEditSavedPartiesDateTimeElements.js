/// <reference types="cypress" />

export default class DJEditSavedPartiesDateTimeElements {
  getSelectAllInCasePartiesSectionInput() {
    return cy.get("input#checkboxPartiesSelectAll").first();
  }

  getPencilIconInPartyDispositionDateButton() {
    return cy.get(".partyDispositionDateEditButton").first();
  }

  getPartyDispositionDateEditableLink() {
    return cy.get("#partyDispositionDateEditable");
  }

  getEditableDateFieldInput() {
    return cy.get(
      '[class="form-control smc-date-past date-field partyDispositionDateEditable partyDispositionDate hasDatepicker"]'
    );
  }

  getEditableSubmitCheckButton() {
    return cy.get(".editable-submit");
  }

  getPartyDispositionDateCell() {
    return cy.get(".partyDispositionDate");
  }

  getPencilIconInPartyDispositionTimeEditButton() {
    return cy.get(".partyDispositionTimeEditButton").first();
  }

  getPartyDispositionTimeEditableLink() {
    return cy.get("#partyDispositionTimeEditable");
  }

  getEditableTimeFieldInput() {
    return cy.get(
      '[class="form-control time-field partyDispositionTimeEditable "]'
    );
  }

  getClickToSavePartyDispositionButton() {
    return cy.get('button[title="Click to Save Party Disposition"]');
  }

  getPartyDispositionTimeCell() {
    return cy.get(".partyDispositionTime");
  }

  getCaseDispositionCaseDispositionButton() {
    return cy.get('button[data-id ^= "docketCode_"]').first();
  }

  getCaseDispositionCaseDispositionDate() {
    return cy.get('input[id ^= "dispositionDateField_"]');
  }

  getCaseDispositionCaseDispositionTime() {
    return cy.get('input[id ^= "dispositionTime_"]');
  }

  getCaseDispositionPreDefinedText() {
    return cy.get('textarea[id ^= "preDefinedTextArea_"]');
  }

  getSaveDispositionButton() {
    return cy.get('button[title="Click to Save Disposition"]');
  }

  getCivilDispostionEventCloserWindowSaveButton() {
    return cy
      .get('[aria-describedby="closeEventsDialog"]')
      .find("span")
      .contains("Save");
  }

  getDispositionAndJudgementCloseTabIcon() {
    return cy.get(".close-tab-span");
  }
}
