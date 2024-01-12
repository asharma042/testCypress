/// <reference types="cypress" />

export default class BondAssociationElements {
  criminalBackButton() {
    return cy.get(".menu-text:contains(Criminal)").filter(`:not(:contains( ))`);
  }

  manageBondAssociationElement() {
    return cy.get(`[id^=bondAsscSearch]`);
  }

  locationDropDown() {
    return cy.get(`.bondLocnCode`);
  }

  bondAssosciationIdRadioButton() {
    return cy.get(`[id^=finBondRadio_]`);
  }

  bondAssosciationIdSearchDiv() {
    return cy.get(`.bondMainSearchDiv`);
  }

  bondAssosciationIdSearchLabel() {
    return this.bondAssosciationIdSearchDiv().find(`label`);
  }

  bondAssosciationIdSearchTextField() {
    return this.bondAssosciationIdSearchDiv().find("[id^=finBondNumberInput]");
  }

  bondAssosciationCaseInfoCaseId() {
    return cy.get(`.caseNumFin`);
  }

  bondAssosciationCaseInfoCheckBox() {
    return cy.get(`.bondAssCase_id_check`);
  }

  bondAssociationProcessContinuationButton() {
    return cy.get(".processContinuation").find("button");
  }

  bondAssociationAssociateBondButton() {
    return cy.get(`.asscBondBtn.saveBondsButton`);
  }

  greenNoty() {
    return cy.get(`.noty_type_success`);
  }

  bondAssociationBondsTable() {
    return cy.get(`.smcBondAsscBondResultsTable`).find(`tbody`);
  }

  bondAssociationManageBondAssociation() {
    return cy.get(`[id^=bondAsscManagement]`);
  }

  closeTab() {
    return cy.get(".close-tab-span");
  }

  BodyForUnsavedChangesAlert() {
    return cy.get(`body`);
  }
}
