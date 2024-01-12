/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import InputListDuplicateAttorneyElements from "./InputListDuplicateAttorneyElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class InputListDuplicateAttorneyActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\inputListDuplicateAttorneyDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\inputListDuplicateAttorneyDefendant2.json";
    this.inputListDuplicateAttorneyElements =
      new InputListDuplicateAttorneyElements();

    this.criminalCaseService = new CriminalCaseService();
  }

  readRunTimFile() {
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
   * Scenario: User should not be able to add a duplicate attorney
   */
  createCriminalCases() {
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
  }

  clickOnCaseProcessingTab() {
    this.readRunTimFile();
    cy.login();
    cy.clickLink("Case Processing");
  }

  theBusinessProcessUnit() {
    // no opp
  }

  clickOnProcessList() {
    cy.clickMenu("Process List");
  }

  theSubmenuItems() {
    // no op
  }

  selectInputCase() {
    cy.clickMenu("Input Cases");
  }

  inputCaseTabOpens() {
    // no op
  }

  enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter() {
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      const arrayOfCaseIds = [$def1.caseId, $def2.caseId];
      let i;
      for (i = 0; i < arrayOfCaseIds.length; i++) {
        this.inputListDuplicateAttorneyElements
          .enterCaseId()
          .eq(i)
          .type(`${arrayOfCaseIds[i]}{enter}`)
          .then(() => cy.wait(1000));
      }
      this.inputListDuplicateAttorneyElements.enterCaseId().eq(i).type(" ");
    });
  }

  caseIdShouldDisplayInTheField() {
    // no op
  }

  selectAddAttorneyFromTheProcessNowDropDownButton() {
    const processName = "Add Attorney";
    this.inputListDuplicateAttorneyElements
      .inputCasesProcessNowButton()
      .click();
    this.inputListDuplicateAttorneyElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }

  selectListVerifyRecordsToProcessTableDisplaysBothCases() {
    this.inputListDuplicateAttorneyElements
      .smcLProcManagePartiesTable()
      .should("exist");
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      const arrayOfCaseIds = [$def1.caseId, $def2.caseId];
      let i;
      for (i = 0; i < arrayOfCaseIds.length; i++) {
        this.inputListDuplicateAttorneyElements
          .smcLProcManagePartiesTable()
          .find("tbody")
          .find("td")
          .contains(arrayOfCaseIds[i])
          .should("exist");
      }
    });
  }

  clickSelectAllAndClickEnterAttrorneyInformation() {
    this.inputListDuplicateAttorneyElements
      .selectAllCheckBox()
      .click()
      .then(() => {
        cy.intercept("smc-web/getPartyTypesByCaseTypes*").as(
          "getPartyTypesByCaseTypes"
        );
        cy.intercept("smc-web/lProcManageParties*").as("lProcManageParties");

        this.inputListDuplicateAttorneyElements
          .enterAttorneyInformationButton()
          .click();

        cy.wait(["@getPartyTypesByCaseTypes", "@lProcManageParties"]);
      });
  }

  addAttorneyDialogBoxDisplay() {
    this.inputListDuplicateAttorneyElements
      .addAttorneyDialogWindow()
      .should("exist");
  }

  changePartyDescriptionFieldToADFT() {
    const partyDescription = jsonHandler.getValue(
      "defaults",
      "partyDescription"
    );
    this.inputListDuplicateAttorneyElements
      .addAttorneyPartyDescription()
      .click()
      .then(() => {
        this.inputListDuplicateAttorneyElements
          .addAttorneyPartyDescriptionSearchBoxInput()
          .type(`${partyDescription}`)
          .realPress("Enter");
      });
  }

  aPAShouldBeDisplayed() {
    const partyDescription = jsonHandler.getValue(
      "defaults",
      "partyDescription"
    );
    this.inputListDuplicateAttorneyElements
      .addAttorneyPartyDescription()
      .invoke("prop", "title")
      .should("eq", partyDescription);
  }

  enterAttorneyPIDMIntoTheAttorneySearch() {
    const attorneyForDefendant = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    cy.intercept("smc-web/getAttorneyMobarDetails*").as(
      "getAttorneyMobarDetails"
    );
    this.inputListDuplicateAttorneyElements
      .addAttorneyAttorneySearchInput()
      .type(`${attorneyForDefendant}`);

    cy.wait(["@getAttorneyMobarDetails"]);
    this.inputListDuplicateAttorneyElements
      .addAttorneyAttorneySearchInput()
      .realPress("Enter");
  }

  theNameOfTheAttorneyAndThePIDMShouldBeDisplaying() {
    const attorneyForDefendant = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    this.inputListDuplicateAttorneyElements
      .addAttorneyAttorneySearchInput()
      .invoke("prop", "value")
      .should("contain", attorneyForDefendant);
  }

  backdateTheStartDateInTheStartField() {
    const pastDate = this.utils.getValidPastDateStartingFromNow(3);
    cy.log(pastDate);
    this.inputListDuplicateAttorneyElements
      .addAttorneyStartDate()
      .clear()
      .type(`${pastDate}`);
  }

  theStartDateShouldBeBackdated() {
    // no op
  }

  clickOnSaveApplyToAll() {
    cy.intercept("smc-web/lProcValidateAddParty*").as("lProcValidateAddParty");
    cy.intercept("smc-web/processList/savePartiesOnMultipleCases*").as(
      "savePartiesOnMultipleCases"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.inputListDuplicateAttorneyElements
      .addAttorneySaveAndApplyToAllButton()
      .click();
    cy.wait([
      "@lProcValidateAddParty",
      "@savePartiesOnMultipleCases",
      "@saveUserNotyMessages",
    ]);
  }

  aGreenConfirmationNotyShouldAppearAndDialogWindowCloses() {
    this.utils.clearNotyMessages();
  }

  repeatStepsSixToTen() {
    this.clickSelectAllAndClickEnterAttrorneyInformation();
    this.changePartyDescriptionFieldToADFT();
    this.enterAttorneyPIDMIntoTheAttorneySearch();
    this.backdateTheStartDateInTheStartField();
    this.clickOnSaveApplyToAll();
  }

  confirmThatATableSorterColumnNames() {
    const columnNames = [
      "Message",
      "Case Id",
      "Style of Case",
      "Case Type",
      "Judge Mobar",
      "Sequence",
    ];
    cy.wrap(columnNames).each((value) => {
      this.inputListDuplicateAttorneyElements
        .addAttorneytableRejectedPartiesTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  aTableSorterShouldAppearWithSpecificColumns() {
    // no op
  }

  verifyIfAMessageIsBeingDisplayed() {
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      let message1 = `The case ${$def1.caseId} already have the party`;
      let message2 = `The case ${$def2.caseId} already have the party`;
      this.inputListDuplicateAttorneyElements
        .addAttorneytableRejectedPartiesTable()
        .find("tbody>tr>td.message")
        .eq(0)
        .invoke("prop", "innerText")
        .should("contain", message1);
      this.inputListDuplicateAttorneyElements
        .addAttorneytableRejectedPartiesTable()
        .find("tbody>tr>td.message")
        .eq(1)
        .invoke("prop", "innerText")
        .should("contain", message2);
    });
  }

  theCaseXXXXXXAlreadyHaveTheParty() {
    // no op
  }

  manuallyCloseTheAddAttorneyDialogWindow() {
    this.inputListDuplicateAttorneyElements
      .addAttorneyDialogWindowXButton()
      .click();
  }

  selectYesOnProgressInAddAttorneyEntryPopUp() {
    this.inputListDuplicateAttorneyElements
      .progressInAddAttorneyEntryPopUpYesButton()
      .click();
  }

  addAttorneyDialogCloses() {
    this.inputListDuplicateAttorneyElements
      .addAttorneyDialogWindow()
      .should("not.exist");
  }

  clickNoOnSaveTheListPopUp() {
    this.inputListDuplicateAttorneyElements.saveThisListPopUpNoButton().click();
    this.inputListDuplicateAttorneyElements.closeTabIcon().click();
    this.inputListDuplicateAttorneyElements.closeTabIcon().click();
    this.inputListDuplicateAttorneyElements
      .progressInAddAttorneyEntryPopUpYesButton()
      .click();
  }
}
