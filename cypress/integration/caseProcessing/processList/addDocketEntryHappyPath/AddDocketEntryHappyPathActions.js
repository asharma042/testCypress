/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import InputCasesService from "../../../pom/caseProcessing/processLists/InputCasesService";
import SelectListService from "../../../pom/caseProcessing/processLists/SelectListService";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import AddDocketEntryHappyPathElements from "./AddDocketEntryHappyPathElements";

export default class AddDocketEntryHappyPathActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\addDocketEntryHappyPathDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\addDocketEntryHappyPathDefendant2.json";
    this.inputCaseService = new InputCasesService();
    this.selectListService = new SelectListService();
    this.crimialCaseService = new CriminalCaseService();
    this.happyPathElements = new AddDocketEntryHappyPathElements();
  }

  /**
   * Scenario: Verify if single Dockets code can be added to mulitple cases of the same case type
   */
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
   * Scenario: Verify if single Dockets code can be added to mulitple cases of the same case type
   */
  moreThanMCases() {
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
        this.happyPathElements
          .enterCaseId()
          .eq(i)
          .type(`${arrayOfCaseIds[i]}{enter}`)
          .then(() => cy.wait(1000));
      }
      this.happyPathElements.enterCaseId().eq(i).type(" ");
    });
  }

  theCaseIDsShouldBeDisplayingInTheFields() {
    // no op
  }

  clickOnProcessNowDropdownButton() {
    this.happyPathElements.inputCasesProcessNowButton().click();
  }

  aDropDownMenuShouldAppear() {
    // no op
  }

  clickOnAddDocketUnderDocketEntries() {
    const processName = "Add Docket Entry";
    this.happyPathElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }

  aTableSorterShouldDisplay() {
    this.happyPathElements.manageDocketTable().should("exist");
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
      this.happyPathElements
        .manageDocketTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  clickOnSelectAllCheckbox() {
    this.happyPathElements.selectAllCheckBox().click();
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

    this.happyPathElements.enterDocketInformationButton().click();

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
    this.happyPathElements
      .selectListTabClose()
      .first()
      .click()
      .then(() => {
        this.happyPathElements.saveTheListSmartAlertBoxButtons("Yes").click();
      });
  }

  theWindowShouldClose() {
    this.happyPathElements.selectListTabClose().first().click();
  }
}
