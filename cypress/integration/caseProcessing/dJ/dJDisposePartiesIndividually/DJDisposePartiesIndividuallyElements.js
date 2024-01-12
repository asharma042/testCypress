/// <reference types="cypress" />

export default class DJDisposePartiesIndividuallyElements {
  getCasePartiesResultsTable() {
    return cy.get("[data-process-name=dispoJdgmntCasePartyResults");
  }

  getCasePartiesTableRowBasedOnPartyType(partyType) {
    return this.getCasePartiesResultsTable()
      .first()
      .contains(partyType)
      .parents('tr[data-target^= "#dispoJdgmntChangeRemoveParty"]');
  }

  getCasePartiesCheckBoxNextToParty(partyType) {
    return this.getCasePartiesTableRowBasedOnPartyType(partyType).find(
      "#checkboxDispoJdgmntPartiesSelect"
    );
  }

  getCasePartiesPartyDispositionPencilIcon(partyType) {
    return this.getCasePartiesTableRowBasedOnPartyType(partyType).find(
      "#partyDispositionCodeEditable"
    );
  }

  getCasePartiesPartyDispositionDropdownToggleButton(partyType) {
    return this.getCasePartiesTableRowBasedOnPartyType(partyType).find(
      ".editable-input > .btn-group > .btn"
    );
  }

  getCasePartiesPartyDispositionSearchInput(partyType) {
    return this.getCasePartiesTableRowBasedOnPartyType(partyType)
      .find("td.partyDisposition")
      .find("input.form-control");
  }

  getCasePartiesPartyDispositionCodeCell(partyType) {
    return this.getCasePartiesTableRowBasedOnPartyType(partyType).find(
      ".partyDisposition > #partyDispositionCodeEditable"
    );
  }

  getCasePartiesSaveCasePartiesDisposition(value) {
    return cy
      .get("button")
      .contains(value) // span is the subject
      .parent(); // move up to the button
  }

  getCaseDispositionContentHeader() {
    return cy
      .get('[id ^= "dispoJdgmntCaseResults"]')
      .find(".dispoJdgmntCaseDispositionContentAccordionHeader");
  }

  getDispoJdgmntSaveCaseDispositionBtn() {
    return cy
      .get("[id ^= collapseDispoJdgmntCaseDispositionInfoMainDiv]")
      .find(".dispoJdgmntSaveCaseDispositionBtn");
  }

  getCaseDispositionSectionCaseDispositionButton() {
    return cy.get(`.dropdown-toggle[data-id ^= "docketCode"]`);
  }

  getCivilDispositionEventClosureWindowTitlebar() {
    return cy.get(".ui-dialog-titlebar");
  }

  getCloseEventsTableCourtDispo() {
    return cy.get("#closeEventResultsDiv > form > table > tbody");
  }

  getClosureWindowEventDescriptionCell() {
    return this.getCloseEventsTableCourtDispo().find("td").first();
  }

  getClosureWindowEventDateCell() {
    return this.getCloseEventsTableCourtDispo()
      .find("td")
      .then(($elements) => {
        for (let i = 0; i < $elements.length; i++) {
          if ($elements[i].className == "tdEventDate col-md-1 col-sm-1") {
            return $elements[i];
          }
        }
      });
  }

  getClosureWindowTimeCell() {
    return this.getCloseEventsTableCourtDispo().find(".eventShedTime");
  }

  getClosureWindowCourtDispoEventOutcomeButton() {
    return this.getCloseEventsTableCourtDispo().find(
      "button[data-id=courtDispoEventOutcome] > span.filter-option"
    );
  }

  getClosureWindowEventClosingDateInput() {
    return this.getCloseEventsTableCourtDispo().find(
      '[id ^= "eventClosingDate"]'
    );
  }

  getClosureWindowEventClosingTimeInput() {
    return this.getCloseEventsTableCourtDispo().find(
      '[id ^= "eventClosingTime"]'
    );
  }

  getEventClosureWindowSaveButton() {
    return cy
      .get("[aria-describedby=closeEventsDialog]")
      .find(".ui-dialog-buttonpane")
      .contains("Save");
  }

  getDispositionAndJudgementCloseTabIcon() {
    return cy.get(".close-tab-span");
  }
}
