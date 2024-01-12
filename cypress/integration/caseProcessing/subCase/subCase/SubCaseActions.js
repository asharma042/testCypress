/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import SubCaseElements from "./SubCaseElements";
import jsonHandler from "../../../../fixtures/jsonHandler";
import DispositionJudgementActions from "../../../pom/caseProcessing/civil/DJ_DispositionJudgementActions";
import DispostionJudgementService from "../../../pom/caseProcessing/civil/DispositionJudgementService";
import CivilCaseService from "../../../pom/caseProcessing/civil/CivilCaseService";
import DocketingService from "../../../pom/caseProcessing/docketing/DocketingService";

export default class SubCaseActions {
  constructor() {
    this.utils = new Utils();
    this.tempFileName = "cypress\\temp\\subCase.json";
    this.subCaseElements = new SubCaseElements();
    this.civilCaseService = new CivilCaseService();
    this.docketingService = new DocketingService();
    this.djActions = new DispositionJudgementActions(this.tempFileName);
    this.djService = new DispostionJudgementService(this.tempFileName);
  }

  readRunTimeFile() {
    var that = this;
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
  }

  /**
   * Scenario: Add Docket Entry
   */
  addDocketEntry() {
    this.readRunTimeFile();

    cy.login();
    this.docketingService.setupAddDocketEntry("scenario1");
  }

  /**
   * Scenario: Add Parties
   */
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
   * Scenario: Dispose case
   */
  disposeParties() {
    this.djService.disposeAllParties("scenario1", 0);
    cy.logout();
  }

  disposeCase() {
    this.djService.disposeCase("scenario1", 2);
    this.djActions.clickCloseIfEventWindowOpens();
  }

  /**
   * Scenario: Create SubCase
   */
  clickOnSubsequentCaseFromCaseProcessing() {
    this.readRunTimeFile();
    cy.login();

    cy.clickLink("Case Processing");
    cy.get(".smc-sbl-process.new-tab-req.requestSmcProcess")
      .contains("Subsequent Case")
      .click();
  }

  selectCaseIdSearchRadioButton() {
    this.subCaseElements.getSearchByCaseIdRadioButton().click();
  }

  enterCaseId() {
    cy.get("@case").then(($case) => {
      cy.intercept(`smc-web/smcFormRequest/subcaseCreate*`).as(`subcaseCreate`);

      this.subCaseElements
        .getCaseSearchInputField()
        .type(`${$case.caseId}{enter}`);

      cy.wait("@subcaseCreate");
    });
  }

  verifyCaseID() {
    cy.get("@case").then(($case) => {
      this.subCaseElements
        .getVerifyCaseId()
        .invoke("val")
        .should("eq", `${$case.caseId}-01`);
    });
  }

  enterCaseType() {
    cy.wait(2000);
    let caseType = jsonHandler.getValue("scenario1", "caseType");
    this.subCaseElements.getCaseTypeInput().type(`${caseType}`);
    cy.realPress("Enter");
  }

  clickCreateSubcase() {
    this.subCaseElements.getCreateSubcaseButton().click();
  }

  copyPartiesTabEnabled() {
    this.subCaseElements.getCopyPartiesTab().should("be.visible");
  }

  selectPartiesToCopyOver() {
    this.subCaseElements.getPartyNameSelectAllCheckbox().click();
  }

  clickCopyToReviewList() {
    this.subCaseElements.getCopyToReviewListButton().click();
  }

  clickSavePartiesToSubcase() {
    this.subCaseElements.getSavePartiesToSubcaseButton().click();
  }

  copyChargesTabEnabled() {
    this.subCaseElements.getCopyChargesTab().should("be.visible");
  }

  clickOKForNoChargesWindow() {
    cy.wait(2000);
    this.subCaseElements.getChargesErrorWindowButton().click();
  }

  clickOnDocketsTab() {
    this.subCaseElements.getCopyDocketsTab().click();
  }

  checkDocketEntryToCopyOver() {
    let copiedDocketEntry = jsonHandler.getValue(
      "scenario1",
      "docketEntryBeingCopied"
    );
    this.subCaseElements.getDocketCodeToBeCopied().then((rows) => {
      for (let row = 0; row < rows.length; row++) {
        if (rows[row].cells[3].innerText === `${copiedDocketEntry}`) {
          cy.wrap(rows[row].cells[0]).click();
          break;
        }
      }
    });
  }

  clickSaveDocketsToSubcase() {
    this.subCaseElements.getSaveDocketToSubcaseButton().click();
  }

  clickYesInSubCaseAlertWindow() {
    this.subCaseElements.getYesButtonFromSubcaseAlertWindow().click();
    this.subCaseElements.getCloseIcon().click();
  }
}
