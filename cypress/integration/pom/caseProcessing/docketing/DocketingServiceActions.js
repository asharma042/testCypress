/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import DocketingServiceElements from "./DocketingServiceElements";

export default class DocketingServiceActions {
  constructor() {
    this.utils = new Utils();
    this.docketingServiceElements = new DocketingServiceElements();
    this.tempFileName = "cypress\\temp\\docketing.json";
  }

  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }

  deletePreviousCase() {
    this.readRunTimeFile();
    cy.get("@case").then(($case) => {
      if ($case && $case.caseId) {
        cy.task("deleteCase", $case.caseId);
      }
    });
  }

  clickOnDocketingFromCaseProcessing() {
    cy.clickLink("Case Processing");
    cy.get(".smc-sbl-process.new-tab-req.requestSmcProcess")
      .contains("Docketing")
      .click();
  }

  selectSearchByCaseId() {
    this.docketingServiceElements.getSearchByCaseIdRadioButton().click();
  }

  caseIDRadioButtonIsSelected() {
    this.docketingServiceElements
      .getSearchByCaseIdRadioButton()
      .should("be.checked");
  }

  enterCaseIDInMyCaseIDSearch(caseId) {
    this.docketingServiceElements
      .getSearchInputField()
      .type(`${caseId}{enter}`);
  }

  caseAppearsInResults() {
    this.docketingServiceElements.getResultsTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);
    });
  }

  attoryIsValidated(attorneyMoBar) {
    this.docketingServiceElements.getResultsTable().then(($ele) => {
      cy.wrap($ele[0]).contains("td", attorneyMoBar);
    });
  }

  caseFilingDate() {
    let caseFilingDate = this.docketingServiceElements.getCaseFilingDate();
    this.docketingServiceElements.getResultsTable().then(($ele) => {
      cy.wrap($ele[0]).contains("td", caseFilingDate);
    });
  }

  expandCaseRowInTable() {
    //No operation. Expands automatically when one case;
  }

  expandAddDocketEntrySection() {
    cy.log("expandAddDocketEntrySection Step");
    this.docketingServiceElements.getAddDocketEntrySectionExpandIcon().click();
  }

  enterDocketDescription(docketDescription) {
    this.docketingServiceElements.getExpandDocketDescriptionField().click();

    this.docketingServiceElements
      .getExpandDocketDescriptionSearchInput()
      .type(`${docketDescription}{enter}`);
  }

  selectedDocketEntryAppears(docketDescription) {
    this.docketingServiceElements
      .getExpandDocketDescriptionSearchInput()
      .contains(`${docketDescription}`)
      .should("not.be.empty");

    this.docketingServiceElements
      .getExpandDocketDescriptionField()
      .contains(`${docketDescription}`)
      .should("have.text", docketDescription);
  }

  enterDocketDate() {
    this.docketingServiceElements
      .getExpandDocketDate()
      .type(this.utils.formatDate(new Date()));
  }

  docketDateEntered() {
    let docketDate = this.docketingServiceElements
      .getExpandDocketDate()
      .type(this.utils.formatDate(new Date()));

    this.docketingServiceElements
      .getExpandDocketDate()
      .contains(`${docketDate}`)
      .should("not.be.empty");
  }

  enterTime() {
    this.docketingServiceElements.getExpandDocketTime().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  selectFilingParty(filingParty) {
    this.docketingServiceElements.getExpandFilingPartyField().click();

    this.docketingServiceElements
      .getExpandFilingPartyFieldSearchInput()
      .type(`${filingParty}{enter}`);
  }

  filingPartyEntered(filingParty) {
    this.docketingServiceElements.getExpandFilingPartyField().then(($ele) => {
      expect($ele.text().trim()).to.equal(filingParty.trim());
    });
  }

  selectFiledOnBehalfOf(filingOBOParty) {
    this.docketingServiceElements.getExpandFilingOBOPartyField().click();

    this.docketingServiceElements
      .getExpandFilingOBOPartyFieldSearchInput()
      .type(`${filingOBOParty}{enter}`);
  }

  fOBOEntered(filingOBOParty) {
    this.docketingServiceElements
      .getExpandFilingOBOPartyField()
      .then(($ele) => {
        expect($ele.text().trim()).to.equal(filingOBOParty.trim());
      });
  }

  enterDocketTextInSearchDocketPreDefinedTextField(addDocketText) {
    this.docketingServiceElements.getDocketTextData(0).type(addDocketText);
  }

  docketTextEntered(addDocketText) {
    this.docketingServiceElements
      .getDocketTextData()
      .contains(`${addDocketText}`)
      .should("not.be.empty");
  }

  pressSaveDocketButton() {
    this.docketingServiceElements.getExpandSaveDocketButton().click();
  }

  selectSaveDocketOption() {
    cy.intercept("smc-web/saveDocketsOnCase*").as("saveDocketsOnCase");
    cy.intercept("smc-web/hasSmcPilotAndRole3*").as("hasSmcPilotAndRole3");
    cy.intercept("smc-web/validateAddDocket*").as("validateAddDocket");

    this.docketingServiceElements.getExpandSaveDocketButtonOption(0).click();

    cy.wait([
      "@saveDocketsOnCase",
      "@hasSmcPilotAndRole3",
      "@validateAddDocket",
    ]);
    this.docketingServiceElements.getCloseIcon().click();
  }

  expandViewUpdateDocketEntriesSection() {
    this.docketingServiceElements
      .getUpdateDocketEntrySectionExpandIcon()
      .click();
  }

  expandAPTCCDocketEntry() {
    cy.intercept("smc-web/getDocketCaseSecurity*").as("getDocketCaseSecurity");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.docketingServiceElements.getExpandDocketEntryRow().click();

    cy.wait(["@getDocketCaseSecurity", "@saveUserNotyMessages"]);
  }

  updateDocketText(updateDocketText) {
    this.docketingServiceElements.getUpdateDocketText(1).type(updateDocketText);
  }

  pressUpdateDocketEntryButton() {
    this.docketingServiceElements.getUpdateDocketEntryButton().click();
    this.docketingServiceElements.getCloseIcon().click();
  }

  expandDocketEntry() {
    cy.intercept("smc-web/getDocketCaseSecurity*").as("getDocketCaseSecurity");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.docketingServiceElements.getExpandDocketEntryRow().click();

    cy.wait(["@getDocketCaseSecurity", "@saveUserNotyMessages"]);
  }

  pressTrashCashButton() {
    this.docketingServiceElements.getTrashCanIcon().click();
  }

  enterReasonDescription(reasonDescription) {
    this.docketingServiceElements.getReasonDescription().click();

    this.docketingServiceElements
      .getReasonDescription()
      .type(`${reasonDescription}{enter}`);
  }
}
