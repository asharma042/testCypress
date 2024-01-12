/// <reference types="cypress" />

import ManageCaseDetailsElements from "./ManageCaseDetailsElements";
import Utils from "../../../utils/utils";
import currentFunction from "current-function";

export default class ManageCaseDetailsActions {
  constructor() {
    this.utils = new Utils();
    this.manageCaseDetailsElements = new ManageCaseDetailsElements();
  }

  clickOnManageCaseDetails() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Manage Case Details");
    this.manageCaseDetailsElements.manageCaseDetailsSubMenu().click();
  }

  clickOnCaseIdRadioButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements.manageCaseDetailsCaseIdRadioButton().click();
  }

  workTabDisplays() {
    // no op
  }

  searchForCaseId(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getManageCaseDetailsCaseSearchById*").as(
      "getManageCaseDetailsCaseSearchById"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.manageCaseDetailsElements
      .manageCaseDetailsSearchInput()
      .type(`${caseId}{enter}`);
    cy.wait(["@getManageCaseDetailsCaseSearchById", "@saveUserNotyMessages"]);
  }

  caseDisplays() {
    // no on
  }

  clickOnArrestInformationTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    this.manageCaseDetailsElements
      .manageCaseDetailsArrestInformationTab()
      .click();
    cy.wait(["@getTableSorterPagerHTML"]);
  }

  casePartiesDisplayInCasePartyField(defLastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements
      .manageCaseDetailsArrestInformationCasePartiesSpan()
      .invoke("text")
      .then((val) => {
        expect(val.includes(defLastName.toUpperCase())).to.be.true;
      });
  }

  clickAddArrestRecordButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/smcFormRequest/addArrestRecordsWindow*").as(
      "addArrestRecordsWindow"
    );
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/getCustomSearchParams*").as("getCustomSearchParams");
    this.manageCaseDetailsElements
      .manageCaseDetailsAddArrestRecordButton()
      .click();
    cy.wait([
      "@myDefendantSearch",
      "@addArrestRecordsWindow",
      "@getCustomSearchParams",
    ]);
  }

  popUpWindowDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements
      .addArrestRecordPopUpWindowDiv()
      .should("exist");
  }

  enterArrestReport(arrestReport) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements
      .addArrestRecordPopUpArrestReportInput()
      .should("be.visible");
    this.manageCaseDetailsElements
      .addArrestRecordPopUpArrestReportInput()
      .type(`{enter}${arrestReport}`);
  }

  enterArrestDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const date = this.utils.getValidPastDateStartingFromNow(7);
    this.manageCaseDetailsElements
      .addArrestRecordPopUpArrestDateInput()
      .type(date);
  }

  enterArrestingAgency(arrestingAgency) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements
      .addArrestRecordPopUpArrestingAgencyInput()
      .type(arrestingAgency);
  }

  clickSaveArrestRecord() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.manageCaseDetailsElements
      .addArrestRecordPopUpSaveArrestRecordButton()
      .click();
    cy.wait(["@getTableSorterPagerHTML", "@saveUserNotyMessages"]);
  }

  arrestRecordDisplaysInArrestInformationTab(arrestReport) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements
      .manageCaseDetailsArrestRecordTable()
      .find("td")
      .should("contain", arrestReport);
  }

  closeManageCaseDetailsTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsElements.closeTabButton().click();
  }
}
