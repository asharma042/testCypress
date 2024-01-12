/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import AddDocketEntryBuildProcessElements from "./AddDocketEntryBuildProcessElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import InputCasesService from "../../../pom/caseProcessing/processLists/InputCasesService";
import SelectListService from "../../../pom/caseProcessing/processLists/SelectListService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class AddDocketEntryBuildProcessActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\addDocketEntryProcessDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\addDocketEntryProcessDefendant2.json";
    this.addDocketEntryBuildProcessElements =
      new AddDocketEntryBuildProcessElements();
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
   * Scenario: Verify if a single Docket code can be added to mulitple cases through Build Process
   */
  mustBuildAListInProcessList() {
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
      const timeStamp = this.utils.formatTime(new Date()).replaceAll(":", "");
      this.processListName = `automation_BuildProcess_${timeStamp}`;
      this.inputCaseService.createProcessList(this.processListName, [
        $def1.caseId,
        $def2.caseId,
      ]);
    });
  }

  clickOnListProcessRadioButtonInTheTab() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Scheduling");

    this.addDocketEntryBuildProcessElements
      .schedulingProcessListRadioButton()
      .click();
  }

  theRadioButtonShouldFill() {
    // no op
  }

  enterAListInProcessListSearchAndPressEnter() {
    this.addDocketEntryBuildProcessElements
      .schedulingMySchedulingSearchInput()
      .type(`${this.processListName}`)
      .then(() => cy.wait(1000));
    this.addDocketEntryBuildProcessElements
      .schedulingMySchedulingSearchInput()
      .type(`{downArrow}{enter}`);
  }

  aTableShouldOpenDisplayingListsCalled(option0) {
    // no op
  }

  verifyThatNewTableSorterIsDisplayingWithTheFollowingColumns() {
    const coloumnNames = [
      "Case Id",
      "Style of Case",
      "Status",
      "Nature of Action",
      "Event Date",
      "Time",
      "1st Initiating Party",
      "1st Initiating Attorney",
    ];
    cy.wrap(coloumnNames).each((value) => {
      this.addDocketEntryBuildProcessElements
        .processListSchedulingTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  aNewTableWillOpenDisplayingTheInformationAboutTheCaseID() {
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      cy.wrap([$def1.caseId, $def2.caseId]).each((value) => {
        this.addDocketEntryBuildProcessElements
          .processListSchedulingTable()
          .find(`a[data-caseid=${value}]`)
          .should("exist");
      });
    });
  }

  clickOnBuildProcessList() {
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    this.addDocketEntryBuildProcessElements.buildProcessListButton().click();
    cy.wait([
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getTableSorterFilters",
    ]);
  }

  theSameTablesorterInThePreviousStepWillGenerateAsAPopUpWindow() {
    this.addDocketEntryBuildProcessElements
      .buildProcessListDialogWindowTitle()
      .should("be.visible");
  }

  clickSelectAllCheckbox() {
    this.addDocketEntryBuildProcessElements
      .buildProcessListDialogWindowSelectAllCheckBox()
      .click();
    cy.wait(1000);
  }

  everyRowShouldHaveACheckboxChecked() {
    this.addDocketEntryBuildProcessElements
      .buildProcessListDialogWindowSelectCheckBoxesInput()
      .then(($elems) => {
        for (let i = 0; i < $elems.length; i++) {
          expect($elems[i].checked).to.be.true;
        }
      });
  }

  clickOnProcessNowDropDownButton() {
    this.addDocketEntryBuildProcessElements
      .buildProcessDialogWindowButtons("Process Now")
      .click()
      .then(() => cy.wait(500));
  }

  aDropDownMenuShouldAppear() {
    //no op
  }

  clickOnAddDocketUnderManageDocketEntry() {
    const processName = "Add Docket Entry";
    cy.intercept("smc-web/listProcCreateList*").as("listProcCreateList");
    cy.intercept("smc-web/getTableSorterAllPrefs").as("getTableSorterAllPrefs");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.addDocketEntryBuildProcessElements
      .addDocketEntryDropdownTextInput()
      .type(`${processName}{enter}`);
    cy.wait([
      "@listProcCreateList",
      "@getTableSorterAllPrefs",
      "@saveUserNotyMessages",
    ]);
  }

  aTablesorterShouldAppear() {
    this.addDocketEntryBuildProcessElements.manageDocketTable().should("exist");
  }

  verifyIfTheTablesorterHasAFollowingColumns() {
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
      this.addDocketEntryBuildProcessElements
        .manageDocketTableHeaderRow()
        .find("th")
        .contains(value)
        .should("exist");
    });
  }

  theTablesorterShouldContainCertainAndSpecificColumn() {
    // no op
  }

  verifyThatCaseIDsThatAreNotEligibleForTheAdditonOfADocketCodeHasAMessageDisplayingInTheMessageField() {
    // no opp
  }

  theMessageFieldShouldAMessageRegardingAReason() {
    // no op
  }

  enterInTheDocketDescriptionAndPressEnter() {
    this.addDocketEntryBuildProcessElements.selectAllCheckBox().click();

    cy.intercept("smc-web/getFilingPartiesForProcessList*").as(
      "getFilingParties"
    );
    cy.intercept("smc-web/getDocketEntryDocketDescs*").as(
      "getDocketEntryDocketDescs"
    );
    cy.intercept("smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );

    this.addDocketEntryBuildProcessElements
      .enterDocketInformationButton()
      .click();

    cy.wait([
      "@getFilingParties",
      "@getDocketEntryDocketDescs",
      "@myPredefinedTextSearch",
    ]);

    const docketDescription = jsonHandler.getValue(
      "defaults",
      "docketDescription"
    );
    this.addDocketEntryBuildProcessElements.enterDocketCodeButton().click();
    this.addDocketEntryBuildProcessElements
      .enterDocketDescriptionTextInput()
      .type(`${docketDescription}{enter}`);
  }

  theDocketCodeShouldDisplayInTheDocketDescriptionField() {
    this.addDocketEntryBuildProcessElements
      .unsecuredBondAmountInput()
      .should("be.visible");
  }

  enter250000InTheUnsecuredBondAmount() {
    const unsecuredBondAmount = jsonHandler.getValue(
      "defaults",
      "unsecuredBondAmount"
    );
    this.addDocketEntryBuildProcessElements
      .unsecuredBondAmountInput()
      .type(`${unsecuredBondAmount}`);
  }

  selectAFilingParty() {
    const filingParty = jsonHandler.getValue("defaults", "caseJudgeAssignment");
    this.addDocketEntryBuildProcessElements
      .docketFilingPartyDropdownButton()
      .click();
    this.addDocketEntryBuildProcessElements
      .docketFilingPartyDropdownTextInput()
      .type(`${filingParty}{enter}`);
  }

  theFilingPartyShouldDisplay() {
    // no op
  }

  verifyIfTheDocketFilingDateAutoGenerates() {
    const currentDate = this.utils.formatDate(new Date());
    this.addDocketEntryBuildProcessElements
      .docketDateFieldInput()
      .invoke("prop", "value")
      .should("eq", currentDate);
  }

  theFieldShouldAutoGenerateADate() {
    // no op
  }

  verifyIfTheDocketTimeIsAutoGenerated() {
    this.addDocketEntryBuildProcessElements
      .docketTimeFieldInput()
      .then(($ele) => {
        expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
      });
  }

  docketTimeShouldDisplay() {
    // no op
  }

  clickOnBrowseButton() {
    cy.intercept("smc-web/tempDocumentUpload*").as("tempDocumentUpload");

    this.addDocketEntryBuildProcessElements
      .addDocketDialogBrowseInput()
      .selectFile("cypress\\uploads\\TestDocument.pdf");

    cy.wait(["@tempDocumentUpload"]);
  }

  theFileExplorerWindowShouldIdsplayFromTheEndUsersPC() {
    // no op
  }

  clickOnScanButton() {
    // no op
  }

  aWindowShouldPopUpContainingComponentsForScanning() {
    // no op
  }

  dragAndDropTheFile() {
    // no op
  }

  theFileWillUploadAndTheFileIconWillAppear() {
    this.addDocketEntryBuildProcessElements
      .fileUploadStatusBar()
      .should("exist");
  }

  clickOnSaveAndApplyToAll() {
    cy.intercept("smc-web/processList/saveDocketsOnMultipleCases*").as(
      "saveDocketsOnMultipleCases"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.addDocketEntryBuildProcessElements
      .addDocketDialogSaveApplyToAllButton()
      .click()
      .then(() => {
        cy.wait(10000);
      });
    cy.wait(["@saveDocketsOnMultipleCases", "@saveUserNotyMessages"]);
  }

  theWindowShouldCloseAndAGreenNoty() {
    this.utils.clearNotyMessages();
  }

  clickOnXOnTheTheTab() {
    this.addDocketEntryBuildProcessElements
      .selectListTabClose()
      .first()
      .click()
      .then(() => {
        this.addDocketEntryBuildProcessElements
          .selectListTabClose()
          .first()
          .click();
      });
  }

  theTabShouldClose() {
    // no op
  }
}
