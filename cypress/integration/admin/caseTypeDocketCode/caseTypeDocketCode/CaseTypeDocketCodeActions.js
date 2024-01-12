/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import CaseTypeDocketCodeElements from "./CaseTypeDocketCodeElements";

export default class CaseTypeDocketCodeActions {
  constructor() {
    this.utils = new Utils();
    this.caseTypeDocketCodeElements = new CaseTypeDocketCodeElements();

    this.tempCaseTypeDocketCodeSelections =
      "cypress\\temp\\caseTypeDocketCode.json";

    this.caseTypeDocketCodeSelections = {
      caseTypeSelection: -1,
      docketCodeTypeSelection: -1,
      processSelection: -1,
      secondCaseTypeSelection: -1,
      thirdCaseTypeSelection: -1,
    };

    this.NUM_OF_CASE_TYPES = 427;
    this.NUM_OF_DOCKET_DESCRIPTIONS = 2148;
    this.NUM_OF_PROCESSES = 25;
    this.TODAY_DATE = new Date();
  }

  readRunTimeFile() {
    var that = this;
    this.utils.readRunTimeFile(
      this.tempCaseTypeDocketCodeSelections,
      function ($json) {
        if ($json) {
          that.caseTypeDocketCodeSelections =
            $json.caseTypeDocketCodeSelections;
          cy.wrap($json.caseTypeDocketCodeSelections).as(
            "caseTypeDocketCodeSelections"
          );
        }
      }
    );
  }

  clickOnAdmin() {
    cy.login();
    cy.clickLink("Admin");
  }

  clickOnCodeRuleSetupInTheBusinessProcessMenu() {
    cy.clickMenu("Code & Rule Setup");
  }

  clickOnCaseTypeDocketCodeFromTheBusinessProcessMenu() {
    cy.intercept("smc-web/populateCaseTypes*").as("populateCaseTypes");
    cy.intercept("smc-web/populateDocketTypes*").as("populateDocketTypes");
    cy.intercept("smc-web/selectAllProcessDescriptions*").as(
      "selectAllProcessDescriptions"
    );

    cy.clickMenu("Case Type Docket Code");

    cy.wait([
      "@populateCaseTypes",
      "@populateDocketTypes",
      "@selectAllProcessDescriptions",
    ]);
  }

  caseTypeDocketCodeFormOpens() {
    this.readRunTimeFile();
  }

  selectACaseTypePredCode() {
    this.caseTypeDocketCodeSelections.caseTypeSelection = Math.floor(
      Math.random() * this.NUM_OF_CASE_TYPES
    );

    this.caseTypeDocketCodeElements.getCaseTypePredCode().click();
    this.caseTypeDocketCodeElements
      .getCaseTypeSearchInput(
        this.caseTypeDocketCodeSelections.caseTypeSelection
      )
      .click();
  }

  selectADocketCodeFromDocketDescription() {
    this.caseTypeDocketCodeSelections.docketCodeTypeSelection = Math.floor(
      Math.random() * this.NUM_OF_DOCKET_DESCRIPTIONS
    );

    this.caseTypeDocketCodeElements.getDocketDescription().click();
    this.caseTypeDocketCodeElements
      .getDocketDescriptionSearchInput(
        this.caseTypeDocketCodeSelections.docketCodeTypeSelection
      )
      .click();
  }

  selectAProcess() {
    this.caseTypeDocketCodeSelections.processSelection = Math.floor(
      Math.random() * this.NUM_OF_PROCESSES
    );

    this.caseTypeDocketCodeElements.getProcesses().click();
    this.caseTypeDocketCodeElements
      .getProcessesSearchInput(
        this.caseTypeDocketCodeSelections.processSelection
      )
      .click();
  }

  enterStartDate() {
    var date = this.utils.formatDate(this.TODAY_DATE);
    this.caseTypeDocketCodeElements.getStartDate().type(`${date}`);
  }

  clickAddDocketCodeButton() {
    cy.intercept("smc-web/addDocketCode*").as("addDocketCode");

    this.caseTypeDocketCodeElements.getAddDocketCodeBtn().click();

    cy.wait(["@addDocketCode"]);
  }

  aNewRecordIsCreatedForTheCaseTypePredCodeAndProcessAssociation() {
    //no op
  }

  selectMultipleCaseTypesPredCodes() {
    this.caseTypeDocketCodeSelections.secondCaseTypeSelection = Math.floor(
      Math.random(this.NUM_OF_CASE_TYPES)
    );
    //Getting the next case type to have multiple and prevent duplicates
    this.caseTypeDocketCodeSelections.thirdCaseTypeSelection =
      this.caseTypeDocketCodeSelections.secondCaseTypeSelection + 1;

    this.caseTypeDocketCodeElements.getCaseTypePredCode().click();

    //Selecting the two random Case Types
    this.caseTypeDocketCodeElements
      .getCaseTypeSearchInput(
        this.caseTypeDocketCodeSelections.secondCaseTypeSelection
      )
      .click();
    this.caseTypeDocketCodeElements
      .getCaseTypeSearchInput(
        this.caseTypeDocketCodeSelections.thirdCaseTypeSelection
      )
      .click();
  }

  aNewRecordIsCreatedForEachCaseTypeAssociatedToTheProcess() {
    //no op
  }

  selectMultipleProcesses() {
    this.caseTypeDocketCodeElements.getProcesses().click();
    this.caseTypeDocketCodeElements.getProcessesSelectAll().click();
  }

  aNewRecordIsCreatedForEachCaseTypePredCodeAssociatedToTheirRespectiveProcessEs() {
    //no op
  }

  expandFilterCaseTypeDocketCodeRecordSection() {
    //no op
  }

  enterCaseTypePredCode() {
    this.caseTypeDocketCodeElements.getCaseTypeFilter().click();
    this.caseTypeDocketCodeElements
      .getCaseTypeFilterSearchInput(
        this.caseTypeDocketCodeSelections.secondCaseTypeSelection
      )
      .click();
  }

  enterDocketDescription() {
    this.caseTypeDocketCodeElements.getDocketCodeFilter().click();
    this.caseTypeDocketCodeElements
      .getDocketCodeFilterSearchInput(
        this.caseTypeDocketCodeSelections.docketCodeTypeSelection
      )
      .click();
  }

  enterProcess() {
    this.caseTypeDocketCodeElements.getProcessFilter().click();
    this.caseTypeDocketCodeElements.getProcessFilterSearchInput().click();
  }

  clickFilterRecordsButton() {
    cy.intercept("smc-web/filterCaseTypeDocketCodeRecord*").as(
      "filterCaseTypeDocketCodeRecord"
    );

    this.caseTypeDocketCodeElements.getFilterRecordBtn().click();

    cy.wait(["@filterCaseTypeDocketCodeRecord"]);
  }

  correctResultsBasedOnFilterCriteriaDisplayInViewUpdateCaseTypeDocketCodeProcessRulesTable() {
    //no op
  }

  clickOnUpdateIconPencilForSelectedDocketCodeInTheTable() {
    this.caseTypeDocketCodeElements.getUpdateRecordBtn().click();
  }

  theFieldsBecomeEditableAcceptButtonCheckMarkBecomesAvailableToTheRightOfTheFieldCancelButtonButtonBecomesAvailableToTheRightOfTheAcceptButton(
    option0
  ) {
    //no op
  }

  selectNewProcessToAssociateTheDocketCodeToFromTheProcessDropDownList() {
    this.caseTypeDocketCodeElements.getEditProcesses().click();
    this.caseTypeDocketCodeElements.getEditProcessDropdown().click();
    //Edit the process list by reusing previous process variable
    // and getting next one to prevent overlap
    this.caseTypeDocketCodeElements
      .getEditProcessSearchInput(
        this.caseTypeDocketCodeSelections.processSelection + 1
      )
      .click();
  }

  pressAcceptProcessEditButton() {
    cy.intercept("smc-web/editCaseTypeDocketCodeRecord*").as(
      "editCaseTypeDocketCodeRecord"
    );

    this.caseTypeDocketCodeElements.getAcceptProcessEditBtn().click();

    cy.wait(["@editCaseTypeDocketCodeRecord"]);
  }

  selectNewEndDateForTheEditedRecord() {
    this.caseTypeDocketCodeElements.getRecordEndDate().click();

    var today = this.TODAY_DATE;
    today.setFullYear(today.getFullYear() + 1);
    var date = this.utils.formatDate(today);
    this.caseTypeDocketCodeElements.getEndDateInput().clear().type(`${date}`);
  }

  pressAcceptButton() {
    cy.intercept("smc-web/editCaseTypeDocketCodeRecord*").as(
      "editCaseTypeDocketCodeRecord"
    );

    this.caseTypeDocketCodeElements.getAcceptEditBtn().click();

    cy.wait(["@editCaseTypeDocketCodeRecord"]);
  }

  updatedProcessIsAcceptedForTheRecordAndSaved() {
    //no op
  }

  closeTab() {
    this.utils.clearNotyMessages();
    this.caseTypeDocketCodeElements.getCloseCaseTypeDocketCodeTab().click();

    cy.writeFile(this.tempCaseTypeDocketCodeSelections, {
      caseTypeDocketCodeSelections: this.caseTypeDocketCodeSelections,
    });
  }

  clearTestRecords() {
    cy.task("deleteCaseTypeDocketCodes");
  }
}
