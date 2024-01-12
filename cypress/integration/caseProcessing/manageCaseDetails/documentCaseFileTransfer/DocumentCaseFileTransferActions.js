/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DocumentCaseFileTransferElements from "./DocumentCaseFileTransferElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class DocumentCaseFileTransferActions {
  constructor() {
    this.utils = new Utils();
    this.criminalCaseService = new CriminalCaseService();
    this.tempDefendent1FileName =
      "cypress\\temp\\documentCaseFileTransferDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\documentCaseFileTransferDefendant2.json";
    this.documentCaseFileTransferElements =
      new DocumentCaseFileTransferElements();
    this.scenario = "scenario1";
  }

  readRunTimeFile() {
    cy.wrap({}).as("defendant1");
    this.utils.readRunTimeFile(this.tempDefendent1FileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant1");
      }
    });
    cy.wrap({}).as("defendant2");
    this.utils.readRunTimeFile(this.tempDefendent2FileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant2");
      }
    });
  }
  /**
   * Scenario: Search for Case and Transfer Files to different location
   */
  casesWithCaseFileTransferInformationAndAnyTypeNewCases() {
    const defendant1 = this.utils.getRandomDefendantData();
    const defendant2 = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      "scenario1",
      defendant1,
      this.tempDefendent1FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();

    this.criminalCaseService.createGenericCase(
      "scenario1",
      defendant2,
      this.tempDefendent2FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();

    this.readRunTimeFile();
  }

  clickOnCaseProcessingButton() {
    cy.login();
    cy.clickLink("Case Processing");
  }

  clickOnManageCaseDetailsFromLeftMenu() {
    cy.clickMenu("Manage Case Details");
  }

  clickOnCaseFileTransferInquiry() {
    cy.clickMenu("Case File Transfer & Inquiry");
  }

  navigateToCaseFileTransferAndInquiry() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Manage Case Details");
    cy.clickMenu("Case File Transfer & Inquiry");
  }

  caseFileTransferInquiryTabDisplays() {
    this.documentCaseFileTransferElements
      .caseFileTransferDiv()
      .should("be.visible");
    this.documentCaseFileTransferElements
      .caseFileInquiryDiv()
      .should("be.visible");
  }

  verifyCaseFileTransferTableColumns() {
    const columnNames = [
      "Select All",
      "Case Id",
      "Style of Case",
      "Current File Location",
      "File Location",
      "Text",
      "Reason",
      "Checkout Date & Time",
      "Sealed Reason",
      "Last Modified",
    ];
    cy.wrap(columnNames).each((value) => {
      this.documentCaseFileTransferElements
        .caseFileTransferTableHeaderRow()
        .find("td")
        .contains(value)
        .should("exist");
    });
  }

  systemShouldDisplayAllColumnNames() {
    // no op
  }

  enterCaseIDInCaseIDFieldAndClickTabButton() {
    cy.intercept("smc-web/caseTransferSearchCaseById*").as(
      "caseTransferSearchCaseById"
    );
    cy.get("@defendant1").then(($def1) => {
      this.documentCaseFileTransferElements
        .caseFileTransferCaseIdInput(-1)
        .type(`${$def1.caseId}`)
        .realPress("Tab");
    });
    cy.wait(["@caseTransferSearchCaseById"]);
  }

  validateCaseInformationIsDiplayed() {
    cy.get("@defendant1").then(($def1) => {
      this.documentCaseFileTransferElements
        .caseFileTransferStyleOfCase(0)
        .invoke("prop", "innerText")
        .should("contain", $def1.lastName.toUpperCase());
    });
  }

  enterFileLocationValue() {
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation1");
    cy.intercept("smc-web/enterCase/fileLocationById*").as(
      "enterCasefileLocationById"
    );
    this.documentCaseFileTransferElements
      .caseFileTransferFileLocationInput(0)
      .clear()
      .type(`${fileLocation}`);
    cy.wait("@enterCasefileLocationById");
    this.documentCaseFileTransferElements
      .caseFileTransferFileLocationInput(0)
      .realPress("Tab");
  }

  verifyFileLocationIsDiplayed() {
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation1");
    this.documentCaseFileTransferElements
      .caseFileTransferFileLocationInput(0)
      .invoke("prop", "value")
      .should("contain", fileLocation);
  }

  enterTextInformationIntoTextField() {
    // const value = jsonHandler.getValue("defaults", "textInput1");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferTextInput(0)
    //   .type(`${value}`)
    //   .realPress("Tab");
  }

  verifyUserAbleToEnterText() {
    // const value = jsonHandler.getValue("defaults", "textInput1");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferTextInput(0)
    //   .invoke("prop", "value")
    //   .should("eq", value);
  }

  enterCharacterOfAnyReasonValueIntoReasonFields() {
    // const reason = jsonHandler.getValue("defaults", "reason1");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferReasonInput(0)
    //   .type(`${reason}`)
    //   .realPress("Tab");
  }

  verifyReasonValueIsDisplayed() {
    // const reason = jsonHandler.getValue("defaults", "reason1");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferReasonInput(0)
    //   .invoke("prop", "value")
    //   .should("eq", reason);
  }

  enterSecondCaseIDInCaseIDField() {
    cy.intercept("smc-web/caseTransferSearchCaseById*").as(
      "caseTransferSearchCaseById"
    );
    cy.get("@defendant2").then(($def) => {
      this.documentCaseFileTransferElements
        .caseFileTransferCaseIdInput()
        .type(`${$def.caseId}`)
        .realPress("Tab");
    });
    cy.wait(["@caseTransferSearchCaseById"]);
  }

  validateNewCaseInformationIsDiplayed() {
    cy.get("@defendant2").then(($def) => {
      this.documentCaseFileTransferElements
        .caseFileTransferStyleOfCase(1)
        .invoke("prop", "innerText")
        .should("contain", $def.lastName.toUpperCase());
    });
  }

  enterDifferentFileLocationValue() {
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation2");
    cy.intercept("smc-web/enterCase/fileLocationById*").as(
      "enterCasefileLocationById"
    );
    this.documentCaseFileTransferElements
      .caseFileTransferFileLocationInput(1)
      .clear()
      .type(`${fileLocation}`);

    cy.wait(["@enterCasefileLocationById"]);
    this.documentCaseFileTransferElements
      .caseFileTransferFileLocationInput(1)
      .realPress("Tab");
  }

  verifyNewFileLocationIsDiplayed() {
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation2");
    this.documentCaseFileTransferElements
      .caseFileTransferFileLocationInput(1)
      .invoke("prop", "value")
      .should("contain", fileLocation);
  }

  enterDifferentTextInformationIntoTextField() {
    // const value = jsonHandler.getValue("defaults", "textInput2");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferTextInput(1)
    //   .type(`${value}`)
    //   .realPress("Tab");
  }

  verifyNewTextInformationIsDisplayed() {
    // const value = jsonHandler.getValue("defaults", "textInput2");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferTextInput(1)
    //   .invoke("prop", "value")
    //   .should("eq", value);
  }

  enterDifferentCharacterOfAnyReasonValueIntoReasonFields() {
    // const reason = jsonHandler.getValue("defaults", "reason2");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferReasonInput(1)
    //   .type(`${reason}`)
    //   .realPress("Tab");
  }

  verifyNewReasonValueIsDisplayed() {
    // const reason = jsonHandler.getValue("defaults", "reason2");
    // this.documentCaseFileTransferElements
    //   .caseFileTransferReasonInput(1)
    //   .invoke("prop", "value")
    //   .should("eq", reason);
  }

  selectTransferCaseFilesButton() {
    this.documentCaseFileTransferElements.transferCaseFilesButton().click();
  }

  userAbleToEnterTransferCaseFileSButton() {
    // no op
  }

  systemDisplaysASuccessfulMessageAboutSuccessfulTransferFile() {
    this.utils.clearNotyMessages();
    this.documentCaseFileTransferElements.getTabCloseIcon().click();
    this.documentCaseFileTransferElements.smartAlertBoxYesButton().click();
  }
  /**
   * Scenario: Validate Case transfer
   */
  enterACaseIDIntoCaseIDFieldUnderCaseFileInquiry() {
    this.readRunTimeFile();
    this.navigateToCaseFileTransferAndInquiry();
    cy.get(`@defendant1`).then(($def) => {
      this.documentCaseFileTransferElements
        .caseFileInquiryCaseId()
        .type(`${$def.caseId}`);
    });
  }

  userAbleToEnterACaseID() {
    // no op
  }

  queryCaseFileLocationButtonGetActive() {
    // no op
  }

  selectQueryCaseFileLocationButton() {
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.documentCaseFileTransferElements
      .caseFileInquiryQueryCaseFileLocationButton()
      .click();
    cy.wait([
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@saveUserNotyMessages",
    ]);
  }

  queryResultDisplaysUnderViewFileInquiryRecords() {
    this.documentCaseFileTransferElements
      .caseFileInquiryTable()
      .should("exist");
    cy.get(`@defendant1`).then(($def) => {
      this.documentCaseFileTransferElements
        .caseFileInquiryCaseIdInput()
        .invoke("text")
        .should("contain", `${$def.caseId}`);
    });
  }

  verifyLocationDescriptionMustDisplayAnUpdatedValue() {
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation1");
    this.documentCaseFileTransferElements
      .caseFileInquiryLocationDescriptionField()
      .invoke("prop", "textContent")
      .should("contain", fileLocation);
  }

  validateCaseTransferForAnotherCaseId() {
    const fileLocation = jsonHandler.getValue("defaults", "fileLocation2");
    cy.get(`@defendant2`).then(($def) => {
      this.documentCaseFileTransferElements
        .caseFileInquiryCaseId()
        .clear()
        .type(`${$def.caseId}`);
      this.selectQueryCaseFileLocationButton();
      this.documentCaseFileTransferElements
        .caseFileInquiryCaseIdInput()
        .invoke("text")
        .should("contain", `${$def.caseId}`);
    });
    this.documentCaseFileTransferElements
      .caseFileInquiryLocationDescriptionField()
      .invoke("prop", "textContent")
      .should("contain", fileLocation);
    this.documentCaseFileTransferElements.getTabCloseIcon().click();
  }
  /**
   * Scenario: ResetButton
   */
  enterMultipleCaseIDInCaseIDField() {
    this.readRunTimeFile();
    this.navigateToCaseFileTransferAndInquiry();
  }

  userAbleToEnterMultipleCaseID() {
    cy.get("@defendant1").then(($def) => {
      cy.intercept("smc-web/caseTransferSearchCaseById*").as(
        "caseTransferSearchCaseById"
      );
      this.documentCaseFileTransferElements
        .caseFileTransferCaseIdInput()
        .type(`${$def.caseId}`)
        .realPress("Tab");
      cy.wait("@caseTransferSearchCaseById");
    });
    cy.get("@defendant2").then(($def) => {
      cy.intercept("smc-web/caseTransferSearchCaseById*").as(
        "caseTransferSearchCaseById"
      );
      this.documentCaseFileTransferElements
        .caseFileTransferCaseIdInput()
        .type(`${$def.caseId}{enter}`)
        .realPress("Tab");
      cy.wait("@caseTransferSearchCaseById");
    });
  }

  useTabButtonFromKeyboard() {
    // no op
  }

  existingInformationDisplays() {
    // no op
  }

  enterFileLocationTextReasonValue() {
    this.enterFileLocationValue();
    this.enterDifferentFileLocationValue();
    // this.enterTextInformationIntoTextField();
    // this.enterDifferentTextInformationIntoTextField();
    // this.enterCharacterOfAnyReasonValueIntoReasonFields();
    // this.enterDifferentCharacterOfAnyReasonValueIntoReasonFields();
  }

  userAbleToEnterFileLocationTextReasonFieldValue() {
    // no op
  }

  selectResetButton() {
    this.documentCaseFileTransferElements.caseFileTransferResetButton().click();
  }

  systemAskPermission() {
    // no op
  }

  selectYesOption() {
    this.documentCaseFileTransferElements.smartAlertBoxYesButton().click();
  }

  systemWillRemoveAllEnteredInformationFormEnteredFields() {
    this.documentCaseFileTransferElements
      .caseFileTransferCaseIdInput(-1)
      .invoke("prop", "value")
      .should("eq", "");
    this.documentCaseFileTransferElements.getTabCloseIcon().click();
  }
  /**
   * Scenario: Process ContinuationButton
   */
  enterAnyCaseIDIntoCaseIDField() {
    this.readRunTimeFile();
    this.navigateToCaseFileTransferAndInquiry();
    cy.intercept("smc-web/caseTransferSearchCaseById*").as(
      "caseTransferSearchCaseById"
    );
    cy.get("@defendant1").then(($def) => {
      this.documentCaseFileTransferElements
        .caseFileTransferCaseIdInput(-1)
        .type(`${$def.caseId}`)
        .realPress("Tab");
    });
    cy.wait(["@caseTransferSearchCaseById"]);
    this.documentCaseFileTransferElements
      .caseFileTransferCaseIdInput(-1)
      .type("  ");
  }

  processContinuationButtonGetActive() {
    // no op
  }

  systemDisplaysProcessContinuationOptionList() {
    // no op
  }

  selectOptionFromTheOptionList() {
    const ddOptions = ["Action Queue", "Add Docket Entry", "Generate Document"];
    cy.wrap(ddOptions).each((value) => {
      this.selectProcessContinuationOption(value);
      this.validateEachWindowSystemOpenForEachProcessContinuationOption(value);
    });
    this.documentCaseFileTransferElements.getTabCloseIcon().click();
    this.documentCaseFileTransferElements.smartAlertBoxYesButton().click();
  }

  systemWillOpenSeparateWindowForEachFunctionalityListedUnderProcessContinuationOptions() {
    // no opo
  }

  selectProcessContinuationOption(option) {
    cy.intercept("smc-web/populateActionQueueAssigneeList*").as(
      "populateActionQueueAssigneeList"
    );
    cy.intercept("smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );
    this.documentCaseFileTransferElements
      .caseFileTransferProcessContinuationButton()
      .click();
    this.documentCaseFileTransferElements
      .caseFileTransferSearchBoxInput()
      .type(option)
      .realPress("Enter");
    cy.wait(["@myPredefinedTextSearch", "@populateActionQueueAssigneeList"]);
  }

  validateEachWindowSystemOpenForEachProcessContinuationOption(option) {
    const tileOfPage = new Map();
    tileOfPage.set("Action Queue", "Add Action");
    tileOfPage.set("Add Docket Entry", "Docketing");
    tileOfPage.set("Generate Document", "Document Generation");
    this.documentCaseFileTransferElements
      .processContinuationActionResultPageBreadCrumbUI()
      .invoke("text")
      .should("eq", `${tileOfPage.get(option)}`);
    this.documentCaseFileTransferElements.getTabCloseIcon().click();
  }
}
