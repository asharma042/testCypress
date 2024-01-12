/// <reference types="cypress" />
import DocGenServiceActions from "./DocGenServiceActions";
export default class DocGenService {
  constructor() {
    this.dgsActions = new DocGenServiceActions();
  }

  /**
   *
   * @param {*} caseId
   * @param {*} template
   * @param {*} objToValidate json object w/ key|value pairs
   */
  nonTrackedDocumentForCase(caseId, template, objToValidate) {
    this.dgsActions.clearDownloads();
    this.dgsActions.clickOnDocumentGenerationFromCaseProcessing();
    this.dgsActions.clickOnTemplateDropDownBox();
    this.dgsActions.selectATemplate(template);
    this.dgsActions.searchOptionIsByCaseID();
    this.dgsActions.searchFieldsAreDisplayed();
    this.dgsActions.caseIDRadioButtonIsSelected();
    this.dgsActions.caseIDIsEntered(caseId);
    this.dgsActions.caseAppearsInCasesResultsTable();
    this.dgsActions.generateDocumentButtonIsPressed();
    this.dgsActions.generateDocumentNODMSIsSelected();

    this.dgsActions.waitForDocDownload((fileName) => {
      cy.wrap(fileName).as("serviceFileName");
    });
    this.dgsActions.pressOk();
    cy.get("@serviceFileName").then(($fileName) => {
      this.dgsActions.validateGeneratedDoc($fileName, objToValidate);
    });
  }

  regularNonTrackedDocumentForACase(caseId, template, objToValidate) {
    this.dgsActions.clearDownloads();
    this.dgsActions.clickOnDocumentGenerationFromCaseProcessing();
    this.dgsActions.clickOnTemplateDropDownBox();
    this.dgsActions.selectATemplate(template);
    this.dgsActions.searchOptionIsByCaseID();
    this.dgsActions.searchFieldsAreDisplayed();
    this.dgsActions.caseIDRadioButtonIsSelected();
    this.dgsActions.caseIDIsEntered(caseId);
    this.dgsActions.caseAppearsInCasesResultsTable();
    this.dgsActions.generateDocumentButtonIsPressed();
    this.dgsActions.prepareForDMSWindow();
    this.dgsActions.generateFinalDocumentDMSIsSelected();
    this.dgsActions.waitForPdfDownload((fileName) => {
      cy.wrap(fileName).as("serviceFileName");
    });
    this.dgsActions.pressOk();
    cy.get("@serviceFileName").then(($fileName) => {
      this.dgsActions.validateGeneratedPdf($fileName, objToValidate);
    });
  }

  serviceDocumentForACase(
    caseId,
    template,
    serviceDocumentDocumentDescription,
    objToValidate
  ) {
    this.dgsActions.clearDownloads();
    this.dgsActions.clickOnDocumentGenerationFromCaseProcessing();
    this.dgsActions.clickOnTemplateDropDownBox();
    this.dgsActions.selectAServiceDocumentTemplate(template);
    this.dgsActions.searchOptionIsByCaseID();
    this.dgsActions.searchFieldsAreDisplayed();
    this.dgsActions.caseIDRadioButtonIsSelected();
    this.dgsActions.caseIDIsEntered(caseId);
    this.dgsActions.caseAppearsInCasesResultsTable();
    this.dgsActions.enterServiceDocumentDocketDescription(
      serviceDocumentDocumentDescription
    );
    this.dgsActions.generateDocumentButtonIsPressed();
    this.dgsActions.prepareForDMSWindow();
    this.dgsActions.generateFinalDocumentDMSIsSelected();
    this.dgsActions.waitForPdfDownload((fileName) => {
      cy.wrap(fileName).as("serviceFileName");
    });
    this.dgsActions.pressOk();
    cy.get("@serviceFileName").then(($fileName) => {
      this.dgsActions.validateGeneratedPdf($fileName, objToValidate);
    });
  }

  summonsForACase(
    caseId,
    template,
    serviceDocumentDocumentDescription,
    objToValidate
  ) {
    this.dgsActions.clearDownloads();
    this.dgsActions.clickOnDocumentGenerationFromCaseProcessing();
    this.dgsActions.clickOnTemplateDropDownBox();
    this.dgsActions.selectAServiceDocumentTemplate(template);
    this.dgsActions.searchOptionIsByCaseID();
    this.dgsActions.searchFieldsAreDisplayed();
    this.dgsActions.caseIDRadioButtonIsSelected();
    this.dgsActions.caseIDIsEntered(caseId);
    this.dgsActions.caseAppearsInCasesResultsTable();
    this.dgsActions.enterServiceDocumentDocketDescription(
      serviceDocumentDocumentDescription
    );
    this.dgsActions.clickToOpenServiceCasePartiesField();
    this.dgsActions.selectAllServiceParties();
    this.dgsActions.generateDocumentButtonIsPressed();
    this.dgsActions.prepareForDMSWindow();
    this.dgsActions.generateFinalDocumentDMSIsSelected();
    this.dgsActions.waitForPdfDownload((fileName) => {
      cy.wrap(fileName).as("serviceFileName");
    });
    this.dgsActions.pressOk();
    cy.get("@serviceFileName").then(($fileName) => {
      this.dgsActions.validateGeneratedPdf($fileName, objToValidate);
    });
  }
}
