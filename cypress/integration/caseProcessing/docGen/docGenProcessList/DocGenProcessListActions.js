/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DocGenProcessListElements from "./DocGenProcessListElements";
import jsonHandler from "../../../../fixtures/jsonHandler";
import CivilCaseService from "../../../pom/caseProcessing/civil/CivilCaseService";
import InputCasesService from "../../../pom/caseProcessing/processLists/InputCasesService";
import DocGenUtility from "../../../pom/caseProcessing/documentGeneration/DocGenUtility";

export default class DocGenProcessListActions {
  constructor() {
    this.utils = new Utils();
    this.docGenProcessListElements = new DocGenProcessListElements();
    this.tempFileName = "cypress\\temp\\docGenProcessList.json";
    this.civilCaseService = new CivilCaseService();
    this.inputCasesService = new InputCasesService(this.tempFileName);
    this.docGenUtility = new DocGenUtility();
    this.processListName = this.utils.getRandomProcessListName();
  }

  readRunTimeFile() {
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        cy.wrap($json.case).as("case");
      }
    });
  }
  createCivilCase() {
    //Create the civil case
    this.civilCaseService.createCivilCase("scenario1", this.tempFileName);
  }

  /**
   * Scenario: Create a Process List
   */
  createProcessList() {
    this.readRunTimeFile();
    cy.get("@case").then(($case) => {
      this.inputCasesService.createProcessList(this.processListName, [
        $case.caseId,
      ]);
    });
  }

  /**
   * Scenario: DocGen With Process List
   */
  clickOnDocumentGenerationFromCaseProcessing() {
    cy.task("deleteFilesInFolder", {
      dirName: "cypress/downloads",
      extension: "pdf",
    });

    cy.login();
    cy.clickLink("Case Processing");
    cy.get(".smc-sbl-process.new-tab-req.requestSmcProcess")
      .contains("Document Generation")
      .click();
  }

  clickOnTemplateDropDownBox() {
    this.docGenProcessListElements.clickTemplateDropdown().click();
  }

  selectATemplateOtherThanALabel() {
    let selectedTemplate = jsonHandler.getValue("scenario1", "template");

    this.docGenProcessListElements
      .selectTemplate()
      .type(`${selectedTemplate}{enter}`);
  }

  searchFieldsAreDisplayed() {
    this.docGenProcessListElements
      .selectSearchByProcessList()
      .should("be.visible");
  }

  searchOptionIsByProcessList() {
    this.docGenProcessListElements.selectSearchByProcessList().click();
  }

  processListRadioButtonIsSelected() {
    this.docGenProcessListElements
      .selectSearchByProcessList()
      .should("be.checked");
  }

  enterProcessListName() {
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.docGenProcessListElements
      .enterProcessListNameForSearch()
      .type(this.processListName);
    cy.wait(2000);
    cy.realPress(`ArrowDown`);
    cy.realPress(`Enter`);

    cy.wait(["@saveUserNotyMessages"]);
  }

  checkDocGenSelectAllBox() {
    this.docGenProcessListElements.checkDocGenSelectAllBox().click();
  }

  pressContinueWithSelectedCasesButton() {
    this.docGenProcessListElements
      .pressContinueWithSelectedCasesButton()
      .click();
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

  generateDocumentButtonIsPressed() {
    this.docGenProcessListElements.clickGenerateDocumentButton().click();
  }

  generateFinalDocumentDMSIsSelected() {
    cy.intercept("smc-web/getDmsProcessWindow*").as("getDmsProcessWindow");

    this.docGenProcessListElements.clickGenerateDocumentNODMSOption(1).click();

    cy.wait(["@getDmsProcessWindow"]).then(($response) => {
      this.responseBody = $response.response.body;
    });
  }

  pressOk() {
    this.docGenProcessListElements.clickOK().click();
    this.docGenProcessListElements.CloseDocGenTab().click();
    this.utils.clearNotyMessages();
  }

  waitForPdfDownload(time = 0) {
    this.docGenUtility.waitForDownload(
      time,
      "cypress/downloads",
      "pdf",
      (fileName) => {
        cy.wrap(fileName).as("downloadedFile");
      }
    );
  }

  validateGeneratedPdf() {
    this.readRunTimeFile();
    cy.getMany(["@case", "@downloadedFile"]).then(
      ([$case, $downloadedFile]) => {
        let judgeName = jsonHandler.getValue("scenario1", "judgeName");
        this.docGenUtility.validate("validatePDF", {
          pdfFileName: $downloadedFile,
          caseId: $case.caseId,
          judgeName: judgeName,
        });
      }
    );
  }
}
