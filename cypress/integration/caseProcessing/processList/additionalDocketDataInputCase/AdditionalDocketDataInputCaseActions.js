/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import InputCasesService from "../../../pom/caseProcessing/processLists/InputCasesService";
import SelectListService from "../../../pom/caseProcessing/processLists/SelectListService";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import AdditionalDocketDataInputCaseElements from "./AdditionalDocketDataInputCaseElements";
import currentFunction from "current-function";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class AdditionalDocketDataInputCaseActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\additionalDocketDataInputCaseDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\additionalDocketDataInputCaseDefendant2.json";
    this.inputCaseService = new InputCasesService();
    this.selectListService = new SelectListService();
    this.crimialCaseService = new CriminalCaseService();
    this.additionalDocketDataInputCaseElements =
      new AdditionalDocketDataInputCaseElements();
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
   * Scenario: Verify if Additonal Docket Data is being generated when applied
   */
  moreThanMCasesThatHaveADCOVCodeAddedToThem() {
    const defendant1 = this.utils.getRandomDefendantData();
    const defendant2 = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.crimialCaseService.createGenericCase(
      "scenario1",
      defendant1,
      this.tempDefendent1FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
    this.crimialCaseService.createGenericCase(
      "scenario1",
      defendant2,
      this.tempDefendent2FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
    this.readRunTimeFile();

    // Adding DCOV to the list
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      this.addAdditionalDocketCodeToACase($def1.caseId);
      this.addAdditionalDocketCodeToACase($def2.caseId);
    });
  }

  addAdditionalDocketCodeToACase(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Criminal");
    cy.clickMenu("Court Disposition");
    this.courtDispositionSearchForCaseId(caseId);
    this.additionalDocketDataInputCaseElements
      .criminalCorutDispositionApplyDispositionToMultipleChargesButton()
      .click();
    this.enterChargeDispositionFromTheDropdown();

    cy.intercept("smc-web/validateCharge*").as("validateCharge");
    cy.intercept("smc-web/getAllOpenEventsOnCase*").as(
      "getAllOpenEventsOnCase"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    this.additionalDocketDataInputCaseElements
      .criminalCourtDispostionSaveButton()
      .click();
    cy.wait([
      "@validateCharge",
      "@getAllOpenEventsOnCase",
      "@getTableSorterPagerHTML",
    ]);

    cy.intercept("smc-web/getCourtDispCaseContent*").as(
      "getCourtDispCaseContent"
    );
    cy.intercept("smc-web/getJudgmentsAndOrdersByCaseId*").as(
      "getJudgmentsAndOrdersByCaseId"
    );
    cy.intercept("smc-web/saveUserNotyMessages").as("saveUserNotyMessages");
    this.additionalDocketDataInputCaseElements
      .courtDispositonEventClosureDialogSaveButton()
      .click();
    cy.wait([
      "@getCourtDispCaseContent",
      "@getJudgmentsAndOrdersByCaseId",
      "@saveUserNotyMessages",
    ]);
    this.additionalDocketDataInputCaseElements.selectListTabClose().click();
    cy.logout();
  }

  courtDispositionSearchForCaseId(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.additionalDocketDataInputCaseElements
      .criminalCourtDispositionCaseIdRadioButton()
      .click();

    cy.intercept("smc-web/getCourtDispCasesById*").as("getCourtDispCasesById");
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.additionalDocketDataInputCaseElements
      .criminalCourtDispositionMySerachInput()
      .type(`${caseId}{enter}`);

    cy.wait([
      "@getCourtDispCasesById",
      "@getTableSorterPagerHTML",
      "@getTableSorterAllPrefs",
      "@saveUserNotyMessages",
    ]);
  }

  enterChargeDispositionFromTheDropdown() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const chargeDispostion = jsonHandler.getValue(
      "defaults",
      "chargeDispostion"
    );
    this.additionalDocketDataInputCaseElements
      .applyDispostionToMultipleChargesDialogChargeDispostionDropDown()
      .click();
    this.additionalDocketDataInputCaseElements
      .applyDispostionToMultipleChargesDialogChargeDispostionDropDownTextInput()
      .type(`${chargeDispostion}{enter}`);

    cy.intercept("smc-web/getChargeDisposition*").as("getChargeDisposition");
    cy.intercept("smc-web/getChargeCodeDefaultSent*").as(
      "getChargeCodeDefaultSent"
    );
    this.additionalDocketDataInputCaseElements
      .applyDispostionToMultipleChargesDialogApplyButton()
      .click();
    cy.wait(["@getChargeDisposition", "@getChargeCodeDefaultSent"]);
  }

  enterCaseIdsUnderEnterCaseIdColumnInTheTable() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Process List");
    cy.clickMenu("Input Cases");
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      const arrayOfCaseIds = [$def1.caseId, $def2.caseId];
      let i;
      for (i = 0; i < arrayOfCaseIds.length; i++) {
        this.additionalDocketDataInputCaseElements
          .enterCaseId()
          .eq(i)
          .type(`${arrayOfCaseIds[i]}{enter}`)
          .then(() => cy.wait(1000));
      }
      this.additionalDocketDataInputCaseElements.enterCaseId().eq(i).type(" ");
    });
  }

  theCaseIDsShouldBeDisplayingInTheFields() {
    // no op
  }

  clickOnProcessNowDropdownButton() {
    this.additionalDocketDataInputCaseElements
      .inputCasesProcessNowButton()
      .click();
  }

  aDropDownMenuShouldAppear() {
    // no op
  }

  clickOnAddDocketUnderDocketEntries() {
    const processName = "Add Docket Entry";
    this.additionalDocketDataInputCaseElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }

  aTableSorterShouldDisplay() {
    this.additionalDocketDataInputCaseElements
      .manageDocketTable()
      .should("exist");
    this.utils.clearNotyMessages();
  }

  verifyTheTablesorterColumnNames() {
    const columnNames = [
      "Select All",
      "Message",
      "Case Id",
      "Style of Case",
      "Case Type",
      "Judge Mobar",
      "Sequence",
    ];
    cy.wrap(columnNames).each((value) => {
      this.additionalDocketDataInputCaseElements
        .manageDocketTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  clickOnSelectAllCheckbox() {
    this.additionalDocketDataInputCaseElements.selectAllCheckBox().click();
  }

  allCaseIdWhichAreEligibleShouldHaveTheirCheckboxesChecked() {
    // no op
  }

  verifyThatCaseIDThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField() {
    // no op
  }

  theMessageFieldShouldAMessageRegardingAReason() {
    // no op
  }

  clickOnAddDocketInformationButton() {
    cy.intercept("smc-web/getFilingPartiesForProcessList*").as(
      "getFilingParties"
    );
    cy.intercept("smc-web/getDocketEntryDocketDescs*").as(
      "getDocketEntryDocketDescs"
    );
    cy.intercept("smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );

    this.additionalDocketDataInputCaseElements
      .enterDocketInformationButton()
      .click();

    cy.wait([
      "@getFilingParties",
      "@getDocketEntryDocketDescs",
      "@myPredefinedTextSearch",
    ]);
  }

  theAddDocketWindowShouldDisplayAsAPopup() {
    this.inputCaseService.addDocketEntry();
  }

  enterTheDocketDescriptionAndPressEnter() {
    // no op
  }

  theDocketCodeShouldDisplayInTheDocketDescriptionFieldAndTheAdditonalDocketDataCollapsibleTabWillWithAFieldCalledAmountOfBondSet() {
    // no op
  }

  enterTheAdditonalDocketDataInUnsecuredBondAmount() {
    // no op
  }

  bothSearchDocketPredefinedAndUnsecuredBondAmountWillDisplayTheValue() {
    // no op
  }

  enterAFilingPartyInFilingPartyField() {
    // no op
  }

  theFilingPartyWillDisplayInTheFilingPartyField() {
    // no op
  }

  dragAndDropAFileIntoTheDragDropFilesHere() {
    // no op
  }

  aFileShouldAttachPDF() {
    // no op
  }

  clickOnScanButton() {
    // no op
  }

  theScanningFeatureShouldOpen() {
    // no op
  }

  verifyTheTimeFieldIsDisplayingTheCorrectTime() {
    // no op
  }

  theTimeShouldBeDisplayedInHHMMSSSFormat() {
    // no op
  }

  verifyIfTheDocketDateIsDisplayingTheCorrectDate() {
    // no op
  }

  theDateShouldBeInMMDDYYYYFormat() {
    // no op
  }

  clickOnSaveAndApplyToAll() {
    // no op
  }

  aGreenNotyWillAppearAnStatingTheCaseIDAndTheDocketCodeAddedToThem() {
    // no op
  }

  clickOnXOnTheTopRightCorner() {
    this.additionalDocketDataInputCaseElements
      .selectListTabClose()
      .first()
      .click()
      .then(() => {
        this.additionalDocketDataInputCaseElements
          .saveTheListSmartAlertBoxButtons("Yes")
          .click();
      });
  }

  theWindowShouldClose() {
    this.additionalDocketDataInputCaseElements
      .selectListTabClose()
      .first()
      .click();
  }
}
