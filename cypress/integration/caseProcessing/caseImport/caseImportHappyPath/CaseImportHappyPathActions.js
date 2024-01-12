/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import CaseImportHappyPathElements from "./CaseImportHappyPathElements";
import PAPortalService from "../../../pom/pAPortal/PAPortalService";
import CaseImportActions from "../../../pom/caseProcessing/caseImport/CaseImportActions";
export default class CaseImportHappyPathActions {
  constructor() {
    this.utils = new Utils();
    this.tempFileName = "cypress\\temp\\CaseImportHappyPath.json";

    this.ciElements = new CaseImportHappyPathElements();
    this.ciActions = new CaseImportActions(this.tempFileName);

    this.defendant = this.utils.getRandomDefendantData();

    this.pAPortalService = new PAPortalService(
      this.defendant,
      this.tempFileName
    );
  }

  /**
   * Scenario: Create a case with PA Portal
   */
  createACaseWithPAPortal() {
    this.scenario = "scenario1";
    this.pAPortalService.createPAPortal(this.scenario);
  }
  /**
   * Scenario: Run Jobs transfer for PA Portal
   */
  loginToTheJobs() {
    cy.loginToJobs();
  }

  runThePAPortalJob() {
    this.ciElements.runPaPortalJob().click();
  }
  /**
   * Scenario: User needs to search for criminal case.
   */
  useCaseCreatedWithPAPortal() {
    this.scenario = "scenario1";
    this.ciActions.useCaseCreatedWithPAPortal(this.scenario);
  }

  clickOnCaseImportFromCaseProcessing() {
    this.ciActions.clickOnCaseImportFromCaseProcessing();
  }

  enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField() {
    this.ciActions.enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField();
  }

  caseIDOrFilingReferenceNumberHasBeenEntered() {
    this.ciActions.caseIDOrFilingReferenceNumberHasBeenEntered();
  }

  pressApplyButton() {
    this.ciActions.pressApplyButton();
  }

  caseAppearsInResults() {
    this.ciActions.caseAppearsInResults();
  }

  caseInfoSectionDisplays() {
    this.ciActions.caseInfoSectionDisplays();
  }

  validateMunicipalLocation() {
    this.ciActions.validateMunicipalLocation();
  }

  validateFilingDate() {
    this.ciActions.validateFilingDate();
  }

  validateTime() {
    this.ciActions.validateTime();
  }

  validateCaseType() {
    this.ciActions.validateCaseType();
  }

  validateMilestone() {
    this.ciActions.validateMilestone();
  }

  validateStyleOfCase() {
    this.ciActions.validateStyleOfCase();
  }

  validateAgency() {
    this.ciActions.validateAgency();
  }

  validateCaseSecurity() {
    this.ciActions.validateCaseSecurity();
  }

  partyTabDisplaysAndIsSelected() {
    //no op
  }

  validateLastName() {
    this.ciActions.validateLastName();
  }

  validateFirstName() {
    this.ciActions.validateFirstName();
  }

  validateDateOfBirth() {
    this.ciActions.validateDateOfBirth();
  }

  validateStreetAddress() {
    this.ciActions.validateStreetAddress();
  }

  validateCity() {
    this.ciActions.validateCity();
  }

  validateZipCode() {
    this.ciActions.validateZipCode();
  }

  pressChargeTab() {
    this.ciActions.pressChargeTab();
  }

  validateDateOfViolation() {
    this.ciActions.validateDateOfViolation();
  }

  validateViolationTime() {
    this.ciActions.validateViolationTime();
  }

  validateLocation() {
    this.ciActions.validateLocation();
  }

  validateTicketNumber() {
    this.ciActions.validateTicketNumber();
  }

  validateMissouriChargeNumber() {
    this.ciActions.validateMissouriChargeNumber();
  }

  pressDocketTab() {
    this.ciActions.pressDocketTab();
  }

  expandDocketEntrysRow() {
    this.ciActions.expandDocketEntrysRow();
  }

  validateDocketSequence() {
    this.ciActions.validateDocketSequence();
  }

  validateDocketCode() {
    this.ciActions.validateDocketCode();
  }

  validateFiledBy() {
    this.ciActions.validateFiledBy();
  }

  validateDocumentNumber() {
    this.ciActions.validateDocumentNumber();
  }

  validateDocumentTitle() {
    this.ciActions.validateDocumentTitle();
  }

  closeTab() {
    this.ciActions.closeTab();
  }

  expandCaseRowInTable() {
    this.ciActions.expandCaseRowInTable();
  }

  pressChooseActionButton() {
    this.ciActions.pressChooseActionButton();
  }

  correctActionsDisplay() {
    this.ciActions.correctActionsDisplay();
  }

  selectAcceptOption() {
    this.ciActions.selectAcceptOption();
  }

  acceptFilingWindowDisplays() {
    this.ciActions.acceptFilingWindowDisplays();
  }

  pressYes() {
    this.ciActions.pressYes();
  }

  assignJudgeScheduleEventWindowDisplays() {
    this.ciActions.assignJudgeScheduleEventWindowDisplays();
  }

  changeProratedDropdownToManualJudge() {
    this.ciActions.changeProratedDropdownToManualJudge();
  }

  selectCypressJudge() {
    this.ciActions.selectCypressJudge();
  }

  pressSelectJudgeButton() {
    this.ciActions.pressSelectJudgeButton();
  }

  enterEventDescription() {
    this.ciActions.enterEventDescription();
  }

  eventDescriptionSelected() {
    this.ciActions.eventDescriptionSelected();
  }
  enterFutureEventDate() {
    this.ciActions.enterFutureEventDate();
  }

  validateEventDate() {
    this.ciActions.validateEventDate();
  }

  enterEventTime() {
    this.ciActions.enterEventTime();
  }

  validateEventTime() {
    this.ciActions.validateEventTime();
  }
  enterRoom() {
    this.ciActions.enterRoom();
  }

  roomSelected() {
    this.ciActions.roomSelected();
  }

  pressSaveEvent() {
    this.ciActions.pressSaveEvent();
  }

  assignJudgeScheduleEventWindowCloses() {
    this.ciActions.assignJudgeScheduleEventWindowCloses();
  }
}
