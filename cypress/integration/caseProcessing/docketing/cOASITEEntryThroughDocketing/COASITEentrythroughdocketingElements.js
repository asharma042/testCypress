/// <reference types="cypress" />

export default class COASITEentrythroughdocketingElements {
  additionalDocketEntryfilmNumber() {
    return cy.get(`input#FLMNO`);
  }

  additionalDocketEntryFootage() {
    return cy.get(`input#FTGE`);
  }

  addDocketEntryPredefinedTextArea() {
    return cy.get(`textarea[id ^= "preDefinedTextArea_"]`).eq(-1);
  }

  viewUpdateDocketEntriesTable() {
    return cy
      .get("table[data-process-name=docketEntriesOnCaseForDocketing]")
      .first();
  }

  viewUpdateDataEntriesFilmNumber() {
    return cy.get(`input#FLMNO3`);
  }

  viewUpdateDataEntriesFootage() {
    return cy.get(`input#FTGE3`);
  }

  getCloseIcon() {
    return cy.get(".close-tab-span");
  }
}
