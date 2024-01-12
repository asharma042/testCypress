/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DocGenServiceElements from "./DocGenServiceElements";
import DocGenUtility from "./DocGenUtility";

export default class DocGenServiceActions {
  constructor() {
    this.utils = new Utils();
    this.docGenElements = new DocGenServiceElements();
    this.docGenUtility = new DocGenUtility();
  }

  clearDownloads() {
    cy.task("deleteFilesInFolder", {
      dirName: "cypress/downloads",
      extension: "pdf",
    });

    cy.task("deleteFilesInFolder", {
      dirName: "cypress/downloads",
      extension: "doc",
    });
  }

  /**
   * Scenario: Generate a non tracked document for a case
   */
  clickOnDocumentGenerationFromCaseProcessing() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.get(".smc-sbl-process.new-tab-req.requestSmcProcess")
      .contains("Document Generation")
      .click();
  }

  clickOnTemplateDropDownBox() {
    this.docGenElements.clickTemplateDropdown().click();
  }

  selectATemplate(selectedTemplate) {
    this.docGenElements.selectTemplate().type(`${selectedTemplate}{enter}`);
  }

  searchOptionIsByCaseID() {
    this.docGenElements.selectSearchByCaseId().click();
  }

  searchFieldsAreDisplayed() {
    this.docGenElements.selectSearchByCaseId().should("be.visible");
  }

  caseIDRadioButtonIsSelected() {
    this.docGenElements.selectSearchByCaseId().should("be.checked");
  }

  caseIDIsEntered(caseId) {
    this.docGenElements.selectSearchInputField().type(`${caseId}{enter}`);
  }

  caseAppearsInCasesResultsTable() {
    this.docGenElements.caseResultsTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 1);
    });
  }

  clickToOpenServiceCasePartiesField() {
    this.docGenElements.openServiceCasePartiesField().click();
  }

  selectAllServiceParties() {
    this.docGenElements.selectServiceCaseParties().click();
  }

  generateDocumentButtonIsPressed() {
    this.docGenElements.clickGenerateDocumentButton().click();
  }

  generateDocumentNODMSIsSelected() {
    this.docGenElements.clickGenerateDocumentNODMSOption(2).click();
  }

  pressOk() {
    this.docGenElements.clickOK().click();
    this.docGenElements.CloseDocGenTab().click();
    this.utils.clearNotyMessages();
  }

  selectATemplateOtherThanALabel(selectNonGeneratedNonLabelTemplate) {
    this.docGenElements
      .selectNonGeneratedNonLabelTemplate()
      .type(`${selectNonGeneratedNonLabelTemplate}{enter}`);
  }

  selectASummonsTemplate(selectSummonsTemplate) {
    this.docGenElements
      .selectSummonsTemplate()
      .type(`${selectSummonsTemplate}{enter}`);
  }

  prepareForDMSWindow() {
    cy.window().then(($win) => {
      cy.stub($win, "open")
        .as("windowOpen")
        .callsFake(($url) => {
          //ignore - just keep window from displaying
        });
    });
  }

  generateFinalDocumentDMSIsSelected() {
    cy.intercept("smc-web/getDmsProcessWindow*").as("getDmsProcessWindow");

    this.docGenElements.clickGenerateDocumentFinalOption(1).click();

    cy.wait(["@getDmsProcessWindow"]).then(($response) => {
      this.responseBody = $response.response.body;
    });
  }

  waitForDownload(time = 0, dir, extension, cb) {
    this.docGenUtility.waitForDownload(time, dir, extension, (fileName) => {
      if (!fileName) {
        throw new Error("No filename for doc");
      }
      cb(fileName);
    });
  }

  waitForDocDownload(cb) {
    this.waitForDownload(0, "cypress/downloads", "doc", cb);
  }

  waitForPdfDownload(cb) {
    this.waitForDownload(0, "cypress/downloads", "pdf", cb);
  }

  /**
   *
   * @param {*} downloadedFile
   * @param {*} objToValidate jsonObject
   */
  validateGeneratedDoc(downloadedFile, objToValidate) {
    const fileInfo = { fileName: downloadedFile };
    const obj = {
      ...fileInfo,
      ...objToValidate,
    };
    this.docGenUtility.validate("validateDoc", obj);
  }
  /**
   *
   * @param {*} downloadedFile
   * @param {*} objToValidate jsonObject
   */
  validateGeneratedPdf(downloadedFile, objToValidate) {
    const fileInfo = { pdfFileName: downloadedFile };
    const obj = {
      ...fileInfo,
      ...objToValidate,
    };
    this.docGenUtility.validate("validatePDF", obj);
  }

  selectAServiceDocumentTemplate(selectServiceDocument) {
    this.docGenElements
      .selectNonGeneratedNonLabelTemplate()
      .type(`${selectServiceDocument}{enter}`);
  }

  enterServiceDocumentDocketDescription(serviceDocumentDocumentDescription) {
    this.docGenElements.expandServiceDocumentDocket().click();

    this.docGenElements
      .selectServiceDocumentDocket()
      .type(`${serviceDocumentDocumentDescription}{enter}`);
  }
}
