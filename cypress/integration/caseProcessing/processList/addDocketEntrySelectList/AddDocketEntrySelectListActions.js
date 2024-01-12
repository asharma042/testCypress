/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import AddDocketEntrySelectListElements from "./AddDocketEntrySelectListElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import InputCasesService from "../../../pom/caseProcessing/processLists/InputCasesService";
import SelectListService from "../../../pom/caseProcessing/processLists/SelectListService";

export default class AddDocketEntrySelectListActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\addDocketEntrySelectListDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\addDocketEntrySelectListDefendant2.json";
    this.addDocketEntrySelectListElements =
      new AddDocketEntrySelectListElements();
    this.crimialCaseService = new CriminalCaseService();
    this.inputCaseService = new InputCasesService();
    this.selectListService = new SelectListService();
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
   * Scenario: Verify if a single Docket code can be applied to mulitple case through Select list process
   */
  twoAreMoreCriminalCasesAreNeededAndBothTheCasesShouldBeSavedInAList() {
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
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      this.processListName = "automation_ADE_SelectList";
      this.inputCaseService.createProcessList(this.processListName, [
        $def1.caseId,
        $def2.caseId,
      ]);
    });
  }

  selectAListToUnderTheSelectColumn() {
    this.selectListService.selectProcessList(this.processListName);
  }

  theSelectCheckboxShouldBeActiveForThatList() {
    // no op
  }

  selectAddDocketEntryFromTheDropdown() {
    const processName = "Add Docket Entry";
    this.selectListService.selectAProcess(processName);
  }

  addDocketEntryShouldBeDisplayingInTheDropdownListAndATableShouldGenerate() {
    this.addDocketEntrySelectListElements.manageDocketTable().should("exist");
  }

  verifyThatBlueNotyIsDisplayed() {
    this.utils.clearNotyMessages();
  }

  aBlueNotyShouldDisplayAlongWithATablesorter() {
    // no op
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
      this.addDocketEntrySelectListElements
        .manageDocketTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  clickOnSelectAllCheckbox() {
    this.addDocketEntrySelectListElements.selectAllCheckBox().click();
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

    this.addDocketEntrySelectListElements
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
    this.addDocketEntrySelectListElements.selectListTabClose().first().click();
  }

  theWindowShouldClose() {
    // no op
  }
}
