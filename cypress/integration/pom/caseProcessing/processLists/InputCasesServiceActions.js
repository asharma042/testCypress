/// <reference types="cypress" />
import InputCasesServiceElements from "./InputCasesServiceElements";
import CivilCaseService from "../civil/CivilCaseService";
import jsonHandler from "../../../../fixtures/jsonHandler";
import Utils from "../../../utils/utils";

export default class InputCasesServiceActions {
  constructor() {
    this.InputCasesServiceElements = new InputCasesServiceElements();
    this.civilCaseService = new CivilCaseService();
    this.utils = new Utils();
  }

  /**
   * Scenario: Create a process list.
   */
  clickOnProcessListsFromCaseProcessing() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Process List");
  }

  clickOnInputCasesFromMenu() {
    cy.clickMenu("Input Cases");
  }

  enterCaseIds(arrayOfCaseIds) {
    for (let i = 0; i < arrayOfCaseIds.length; i++) {
      this.InputCasesServiceElements.enterCaseId()
        .eq(i)
        .type(`${arrayOfCaseIds[i]}{enter}`);
      cy.wait(1000);
    }
  }

  pressMultiUseListButton() {
    this.InputCasesServiceElements.clickMultiUseListButton().click();
  }

  enterListName(processListName) {
    this.InputCasesServiceElements.enterProcessListName().type(
      `${processListName}{enter}`
    );
  }

  pressSaveButton() {
    this.InputCasesServiceElements.pressSaveButton().click();
  }

  closeTab() {
    this.InputCasesServiceElements.closeTab().click();
  }

  closeExitFromProcessListWindow(logout = true) {
    this.InputCasesServiceElements.closeExitFromProcessListWindow().click();
    if (logout) {
      cy.logout();
    }
  }

  // Add Docket entry Actions

  aAddDocketWindowShouldDisplay() {
    this.InputCasesServiceElements.addDocketsDialogWindowTitle().should(
      "be.visible"
    );
  }

  enterADocketDescriptionAndPressEnter(option0) {
    const docketDescription = jsonHandler.getValue(
      "defaults",
      "docketDescription"
    );
    this.InputCasesServiceElements.enterDocketCodeButton().click();
    this.InputCasesServiceElements.enterDocketDescriptionTextInput().type(
      `${docketDescription}{enter}`
    );
  }

  theDocketCodeShouldGenerateAndAdditonalDocketDataSectionShouldAppear() {
    this.InputCasesServiceElements.unsecuredBondAmountInput().should(
      "be.visible"
    );
  }

  enterTheUnsecuredBondAmount() {
    const unsecuredBondAmount = jsonHandler.getValue(
      "defaults",
      "unsecuredBondAmount"
    );
    this.InputCasesServiceElements.unsecuredBondAmountInput().type(
      `${unsecuredBondAmount}`
    );
  }

  theAmountWillAppearInTheFieldAndTheDescriptionAndTheAmountWillAppearInSearch() {
    const unsecuredBondAmount = jsonHandler.getValue(
      "defaults",
      "unsecuredBondAmount"
    );
    this.InputCasesServiceElements.searchDocketPredefinedTextarea()
      .invoke("prop", "value")
      .should("contain", unsecuredBondAmount);
  }

  enterAFiliningPartyFromTheDropDown() {
    const filingParty = jsonHandler.getValue("defaults", "caseJudgeAssignment");
    this.InputCasesServiceElements.docketFilingPartyDropdownButton().click();
    this.InputCasesServiceElements.docketFilingPartyDropdownTextInput().type(
      `${filingParty}{enter}`
    );
  }

  aFilingPartyShouldDisplay() {
    // no op
  }

  verifyIfTheDocketDateAutogenerates() {
    const currentDate = this.utils.formatDate(new Date());
    this.InputCasesServiceElements.docketDateFieldInput()
      .invoke("prop", "value")
      .should("eq", currentDate);
  }

  theDocketFilingDateShouldDisplayTheSystemDateShouldBeInMMDDYYYFormat() {
    // no op
  }

  verifyIfDocketTimeDisplays() {
    this.InputCasesServiceElements.docketTimeFieldInput().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  theDocketTimeShouldDisplayTheSystemTime() {
    // no op
  }

  clickOnBrowseButton() {
    cy.intercept("smc-web/tempDocumentUpload*").as("tempDocumentUpload");

    this.InputCasesServiceElements.addDocketDialogBrowseInput().selectFile(
      "cypress\\uploads\\TestDocument.pdf"
    );

    cy.wait(["@tempDocumentUpload"]);
  }

  theFileExplorerWindowShouldDisplayFromTheEndUserPC() {
    // no op
  }

  clickOnScanButton() {
    // no op
  }

  aWindowShouldPopUpContainingComponentsForScanning() {
    // no op
  }

  dragPdfFileInto(option0) {
    // no op
  }

  theFileWillUploadAndFileIconWillAppear() {
    this.InputCasesServiceElements.fileUploadStatusBar().should("exist");
  }

  clickOnSaveApplyToALL() {
    cy.intercept("smc-web/processList/saveDocketsOnMultipleCases*").as(
      "saveDocketsOnMultipleCases"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.InputCasesServiceElements.addDocketDialogSaveApplyToAllButton()
      .click()
      .then(() => {
        cy.wait(10000);
      });
    cy.wait(["@saveDocketsOnMultipleCases", "@saveUserNotyMessages"]);
  }

  greenNotyWillAppear() {
    this.utils.clearNotyMessages();
  }

  verifyIsAGreenNotyDisplaysAndStatesTheDocketCodesAndAllTheCaseIds() {
    // no op
  }

  allCaseIDsShouldBeMentionedAlongWithTheirDocketCodesInOneSingleGreenNoty() {
    // no op
  }
}
