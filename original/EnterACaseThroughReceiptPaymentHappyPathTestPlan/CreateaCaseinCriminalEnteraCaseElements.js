/// <reference types="cypress" />

export default class CreateaCaseinCriminalEnteraCaseElements {
  getUserName() {
    return cy.get("input[name='username']");
  }

  getPassword() {
    return cy.get("input[name='password']");
  }

  getSubmitButton() {
    return cy.get("input[name=submit]");
  }

  getProcessingTab(value) {
    return cy.get("a:contains(" + value + ")");
  }

  getLeftSideMenu(value) {
    return cy.get(".menu-text").contains(value);
  }

  defendantLastName() {
    return cy.get("#lastName");
  }

  defendantFirstName() {
    return cy.get("#firstName");
  }

  demographicsSection() {
    return cy.get(".onFocusTriggerValPrev-Demographics");
  }

  dateOfBirth() {
    return cy.get("[id^=birthDate_]");
  }

  addressSection() {
    return cy.get(".onFocusTriggerValPrev-Address");
  }

  addressSectionStreetAddress() {
    return cy.get("[id^=streetLine1_]");
  }

  addressSectionCity() {
    return cy.get("#city");
  }

  addressSectionZip() {
    return cy.get("#zip");
  }
  saveDefendant() {
    return cy.get("button").contains("Save Defendant");
  }
}
