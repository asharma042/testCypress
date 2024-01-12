/// <reference types="cypress" />
import jsonHandler from "../../../../fixtures/jsonHandler";
import Utils from "../../../utils/utils";
import CivilCaseService from "../../../pom/caseProcessing/civil/CivilCaseService";
import DocGenServiceActions from "../../../pom/caseProcessing/documentGeneration/DocGenServiceActions";
import DocGenService from "../../../pom/caseProcessing/documentGeneration/DocGenService";
export default class DocGenActions {
  constructor() {
    this.utils = new Utils();

    this.dcActions = new DocGenServiceActions();
    this.civilCaseService = new CivilCaseService();
    this.docGenService = new DocGenService();
    this.tempFileName = "cypress\\temp\\docGen.json";
  }

  readRunTimeFile() {
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        cy.wrap($json.case).as("case");
      }
    });
  }

  /**
   * Scenario: Create a Civil Case
   */
  createCivilCase() {
    this.civilCaseService.createCivilCase("scenario1", this.tempFileName);

    this.readRunTimeFile();
  }

  addParties() {
    this.readRunTimeFile();

    cy.login();
    this.civilCaseService.civilCaseAddParties(
      "scenario1",
      2,
      this.tempFileName
    );
  }

  /**
   * Scenario: Generate a non tracked document for a case
   */
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
    this.dcActions.clickOnDocumentGenerationFromCaseProcessing();
  }

  clickOnTemplateDropDownBox() {
    this.dcActions.clickOnTemplateDropDownBox();
  }

  selectATemplate() {
    let selectedTemplate = jsonHandler.getValue("scenario1", "template");
    this.dcActions.selectATemplate(selectedTemplate);
  }

  searchOptionIsByCaseID() {
    this.dcActions.searchOptionIsByCaseID();
  }

  searchFieldsAreDisplayed() {
    this.dcActions.searchFieldsAreDisplayed();
  }

  caseIDRadioButtonIsSelected() {
    this.dcActions.caseIDRadioButtonIsSelected();
  }

  caseIDIsEntered() {
    this.readRunTimeFile();
    cy.get("@case").then(($case) => {
      this.dcActions.caseIDIsEntered($case.caseId);
    });
  }

  caseAppearsInCasesResultsTable() {
    this.dcActions.caseAppearsInCasesResultsTable();
  }

  selectAllServiceParties() {
    this.dcActions.selectAllServiceParties();
  }

  generateDocumentButtonIsPressed() {
    this.dcActions.generateDocumentButtonIsPressed();
  }

  generateDocumentNODMSIsSelected() {
    this.dcActions.generateDocumentNODMSIsSelected();
  }

  pressOk() {
    this.dcActions.pressOk();
  }

  selectATemplateOtherThanALabel() {
    let selectNonGeneratedNonLabelTemplate = jsonHandler.getValue(
      "scenario1",
      "nonTrackedNotALabel"
    );
    this.dcActions.selectATemplateOtherThanALabel(
      selectNonGeneratedNonLabelTemplate
    );
  }

  selectASummonsTemplate() {
    let selectSummonsTemplate = jsonHandler.getValue("scenario1", "summons");

    this.dcActions.selectASummonsTemplate(selectSummonsTemplate);
  }

  clickToOpenServiceCasePartiesField() {
    this.dcActions.clickToOpenServiceCasePartiesField();
  }

  prepareForDMSWindow() {
    this.dcActions.prepareForDMSWindow();
  }

  generateFinalDocumentDMSIsSelected() {
    this.dcActions.generateFinalDocumentDMSIsSelected();
  }

  waitForDocDownload() {
    this.dcActions.waitForDocDownload((fileName) => {
      cy.wrap(fileName).as("downloadedFile");
    });
  }

  waitForPdfDownload() {
    this.dcActions.waitForPdfDownload((fileName) => {
      cy.wrap(fileName).as("downloadedFile");
    });
  }

  validateGeneratedDoc() {
    this.readRunTimeFile();
    cy.getMany(["@case", "@downloadedFile"]).then(
      ([$case, $downloadedFile]) => {
        this.dcActions.validateGeneratedDoc($downloadedFile, {
          caseId: $case.caseId,
        });
      }
    );
  }

  validateGeneratedPdf() {
    let judgeName = jsonHandler.getValue("scenario1", "judgeName");
    this.readRunTimeFile();
    cy.getMany(["@case", "@downloadedFile"]).then(
      ([$case, $downloadedFile]) => {
        this.dcActions.validateGeneratedPdf($downloadedFile, {
          caseId: $case.caseId,
          judgeName: judgeName,
        });
      }
    );
  }

  selectAServiceDocumentTemplate() {
    let selectServiceDocument = jsonHandler.getValue(
      "scenario1",
      "serviceDocument"
    );
    this.dcActions.selectAServiceDocumentTemplate(selectServiceDocument);
  }

  enterServiceDocumentDocketDescription() {
    let serviceDocumentDocumentDescription = jsonHandler.getValue(
      "scenario1",
      "serviceDocumentDocket"
    );

    this.dcActions.enterServiceDocumentDocketDescription(
      serviceDocumentDocumentDescription
    );
  }

  /**
   * Scenario: Use service to generate a non tracked document for a case
   */
  generateANonTrackedDocumentForACaseUsingService() {
    this.readRunTimeFile();
    let template = jsonHandler.getValue("scenario1", "template");

    cy.get("@case").then(($case) => {
      this.docGenService.nonTrackedDocumentForCase($case.caseId, template, {
        caseId: $case.caseId,
      });
    });
  }

  /**
   * Scenario: Use service to generate a regular non tracked document for a case
   */
  generateARegularNonTrackedDocumentForACaseUsingService() {
    this.readRunTimeFile();
    let template = jsonHandler.getValue("scenario1", "nonTrackedNotALabel");

    let judgeName = jsonHandler.getValue("scenario1", "judgeName");
    cy.get("@case").then(($case) => {
      this.docGenService.regularNonTrackedDocumentForACase(
        $case.caseId,
        template,
        {
          caseId: $case.caseId,
          judge: judgeName,
        }
      );
    });
  }

  /**
   * Scenario: Use service to generate a service document for a case
   */
  generateAServiceDocumentForACaseUsingService() {
    this.readRunTimeFile();
    let template = jsonHandler.getValue("scenario1", "serviceDocument");
    let serviceDocumentDocumentDescription = jsonHandler.getValue(
      "scenario1",
      "serviceDocumentDocket"
    );
    let judgeName = jsonHandler.getValue("scenario1", "judgeName");

    cy.get("@case").then(($case) => {
      this.docGenService.serviceDocumentForACase(
        $case.caseId,
        template,
        serviceDocumentDocumentDescription,
        { caseId: $case.caseId, judge: judgeName }
      );
    });
  }

  /**
   * Scenario: Use service to generate a summons for a case
   */
  generateASummonsForACaseUsingService() {
    this.readRunTimeFile();
    let template = jsonHandler.getValue("scenario1", "summons");
    let serviceDocumentDocumentDescription = jsonHandler.getValue(
      "scenario1",
      "serviceDocumentDocket"
    );
    let judgeName = jsonHandler.getValue("scenario1", "judgeName");

    cy.get("@case").then(($case) => {
      this.docGenService.summonsForACase(
        $case.caseId,
        template,
        serviceDocumentDocumentDescription,
        { caseId: $case.caseId, judge: judgeName }
      );
    });
  }
}
