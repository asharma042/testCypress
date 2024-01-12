/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DocumentCaseFileInquiryElements from "./DocumentCaseFileInquiryElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import jsonHandler from "../../../../fixtures/jsonHandler";
import currentFunction from "current-function";

export default class DocumentCaseFileInquiryActions {
  constructor() {
    this.utils = new Utils();
    this.criminalCaseService = new CriminalCaseService();
    this.tempDefendentFileName = "cypress\\temp\\documentCaseFileInquiry.json";
    this.documentCaseFileInquiryElements =
      new DocumentCaseFileInquiryElements();
    this.scenario = "scenario1";
  }

  readRunTimeFile() {
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempDefendentFileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }

  /**
   * Scenario: Search Case File Inquiry information
   */
  createCriminalCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const defendant = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      "scenario1",
      defendant,
      this.tempDefendentFileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
  }

  navigateToCaseFileTransferAndInquiry() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Manage Case Details");
    cy.clickMenu("Case File Transfer & Inquiry");
    this.readRunTimeFile();
  }

  transferACaseToNewLocation() {
    cy.intercept("smc-web/caseTransferSearchCaseById*").as(
      "caseTransferSearchCaseById"
    );
    cy.get("@defendant").then(($def) => {
      this.documentCaseFileInquiryElements
        .caseFileTransferCaseIdInput(-1)
        .type(`${$def.caseId}`)
        .realPress("Tab");
    });
    cy.wait(["@caseTransferSearchCaseById"]);

    // Enter File Location
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation");
    cy.intercept("smc-web/enterCase/fileLocationById*").as(
      "enterCasefileLocationById"
    );
    this.documentCaseFileInquiryElements
      .caseFileTransferFileLocationInput(0)
      .clear()
      .type(`${fileLocation}`);
    cy.wait("@enterCasefileLocationById");
    this.documentCaseFileInquiryElements
      .caseFileTransferFileLocationInput(0)
      .realPress("Enter");

    this.documentCaseFileInquiryElements.transferCaseFilesButton().click();
    this.utils.clearNotyMessages();
    this.documentCaseFileInquiryElements.getTabCloseIcon().click();
    this.documentCaseFileInquiryElements.smartAlertBoxYesButton().click();
    cy.logout();
  }

  casesWithCaseFileTransferInforrmation() {
    this.createCriminalCase();
    this.readRunTimeFile();
    this.navigateToCaseFileTransferAndInquiry();
    this.transferACaseToNewLocation();
  }

  clickOnCaseProcessingFromCaseProcessing() {
    cy.login();
    cy.clickLink("Case Processing");
  }

  clickOnManageCaseDetails() {
    cy.clickMenu("Manage Case Details");
  }

  manageCaseDetailDisplayOpenWithSubmenu() {
    // no op
  }

  clickOnCaseFileInquiry() {
    cy.clickMenu("Case File Transfer & Inquiry");
  }

  caseFileInquirySectionOpens() {
    this.documentCaseFileInquiryElements
      .caseFileInquiryDiv()
      .should("be.visible");
  }

  enterCaseIDInCaseIDField() {
    cy.get(`@defendant`).then(($def) => {
      this.documentCaseFileInquiryElements
        .caseFileInquiryCaseId()
        .clear()
        .type(`${$def.caseId}`)
        .realPress("Tab");
    });
  }

  caseIDEntered() {
    // no op
  }

  uncheckDisplayOnlyCurrentRecordIfSelected() {
    this.documentCaseFileInquiryElements
      .caseFileInquiryDisplayOnlyCurrentRecordInput()
      .invoke("prop", "checked")
      .then((prop) => {
        if (prop == true) {
          this.documentCaseFileInquiryElements
            .caseFileInquiryDisplayOnlyCurrentRecordInput()
            .click();
        }
      });
  }

  clickOnQueryCaseFileLocationButton() {
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.documentCaseFileInquiryElements
      .caseFileInquiryQueryCaseFileLocationButton()
      .click();
    cy.wait([
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@saveUserNotyMessages",
    ]);
  }

  viewFileInquiryRecordSectionDisplaysRecordsForEnteredCaseID() {
    const location = jsonHandler.getValue("defaults", "fileLocation");
    this.documentCaseFileInquiryElements
      .caseFileInquiryResultsRow()
      .find("td.locnName")
      .contains(location.toUpperCase())
      .should("exist");
    this.documentCaseFileInquiryElements
      .caseFileInquiryResultsRow()
      .should("have.length.greaterThan", 1);
  }

  verifyViewFileInquiryRecordsTable() {
    const columnNames = [
      "Select",
      "Case ID",
      "Style of Case",
      "Location Description",
      "Current Record",
      "Current Check Out Information",
      "Sealed Case Reason Description",
    ];
    cy.wrap(columnNames).each((value) => {
      this.documentCaseFileInquiryElements
        .caseFileInquiryTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  viewFileInquiryRecordsTableDisplaysDesiredColumns() {
    this.documentCaseFileInquiryElements.getTabCloseIcon().click();
  }

  /**
   * Scenario: Display Only Current Record
   */
  enteredSameCaseIDIntoCaseIDField() {
    this.navigateToCaseFileTransferAndInquiry();
    cy.get(`@defendant`).then(($def) => {
      this.documentCaseFileInquiryElements
        .caseFileInquiryCaseId()
        .clear()
        .type(`${$def.caseId}`)
        .realPress("Tab");
    });
  }

  checkedInCheckboxToDisplayOnlyCurrentRecords() {
    this.documentCaseFileInquiryElements
      .caseFileInquiryDisplayOnlyCurrentRecordInput()
      .invoke("prop", "checked")
      .then((prop) => {
        if (prop == false) {
          this.documentCaseFileInquiryElements
            .caseFileInquiryDisplayOnlyCurrentRecordInput()
            .click();
        }
      });
  }

  displayOnlyCurrentRecordsCheckboxCheckedIn() {
    // no op
  }

  displaysOnlyCurrentInformationOfEnteredCaseIDWhereCurrentRecordColumnValueIsYes() {
    this.documentCaseFileInquiryElements
      .caseFileInquiryResultsRow()
      .should("have.length", 1);
    this.documentCaseFileInquiryElements
      .caseFileInquiryResultsRow()
      .find("td.currentVolume")
      .should("have.text", "Yes");
    const location = jsonHandler.getValue("defaults", "fileLocation");
    this.documentCaseFileInquiryElements
      .caseFileInquiryResultsRow()
      .find("td.locnName")
      .invoke("text")
      .should("contain", location.toUpperCase());
    this.documentCaseFileInquiryElements.getTabCloseIcon().click();
  }

  /**
   * Scenario: Save Filter Preference Button
   */
  selectSaveFilterPreferenceButton() {
    this.navigateToCaseFileTransferAndInquiry();
    cy.get(`@defendant`).then(($def) => {
      this.documentCaseFileInquiryElements
        .caseFileInquiryCaseId()
        .clear()
        .type(`${$def.caseId}`)
        .realPress("Tab");
    });
    this.clickOnQueryCaseFileLocationButton();
    this.documentCaseFileInquiryElements
      .caseFileInquirySaveFilterPreferencesButton()
      .click();
  }

  systemWillSaveCurrentCaseID() {
    this.utils.clearNotyMessages();
  }

  closeCaseFileTransferInquiryTab() {
    this.documentCaseFileInquiryElements.getTabCloseIcon().click();
  }

  selectCaseFileTransferInquiryTab() {
    cy.clickMenu("Case File Transfer & Inquiry");
  }

  caseFileTransferInquiryTabOpen() {
    // no op
  }

  verifyThatCaseFileInquiryCaseIDFieldOpensWithLastSavedCaseID() {
    cy.get(`@defendant`).then(($def) => {
      this.documentCaseFileInquiryElements
        .caseFileInquiryCaseId()
        .invoke("prop", "value")
        .should("eq", $def.caseId);
    });
    this.documentCaseFileInquiryElements.caseFileInquiryCaseId().clear();
    this.documentCaseFileInquiryElements
      .caseFileInquirySaveFilterPreferencesButton()
      .click();
    this.documentCaseFileInquiryElements.getTabCloseIcon().click();
  }
}
