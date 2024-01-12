/// <reference types="cypress" />
import Utils from "../../utils/utils";
import EFilingHPElements from "./EFilingHPElements";
import EFilingActions from "../../pom/eFiling/EFilingActions";

export default class EFilingHPActions {
  constructor() {
    this.utils = new Utils();
    this.eElements = new EFilingHPElements();
    this.petitioner = this.utils.getRandomDefendantData();
    this.respondent = this.utils.getRandomDefendantData();
    this.tempFileName = "cypress\\temp\\efilingHP.json";

    this.eF = new EFilingActions(
      this.tempFileName,
      this.petitioner,
      this.respondent
    );
  }

  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils = new Utils();
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }

  /**
   * Scenario: File a new case
   */
  userMustHaveAnEfilingAccountLoggedInAndOnTheEfilingMenu() {
    this.eF.userMustHaveAnEfilingAccountLoggedInAndOnTheEfilingMenu();
  }

  clickOnFileNewCase() {
    this.eF.clickOnFileNewCase();
  }

  newCaseEntryDisplays() {
    this.eF.newCaseEntryDisplays();
  }

  selectCourtLocation() {
    this.eF.selectCourtLocation();
  }

  courtLocationShouldBeSet() {
    this.eF.courtLocationShouldBeSet();
  }

  carterCounty() {
    this.eF.carterCounty();
  }

  selectCaseCategory() {
    this.eF.selectCaseCategory();
  }

  civilAssociateChapterDisplays() {
    this.eF.civilAssociateChapterDisplays();
  }

  selectBreachOfContract() {
    this.eF.selectBreachOfContract();
  }

  breachOfContractDisplays() {
    this.eF.breachOfContractDisplays();
  }

  enterStyleOfCaseEfilingVCaseImport() {
    this.eF.enterStyleOfCaseEfilingVCaseImport();
  }

  caseStyleDisplays() {
    this.eF.caseStyleDisplays();
  }

  enterFeeAmount() {
    this.eF.enterFeeAmount();
  }

  filingFeeDisplays() {
    this.eF.filingFeeDisplays();
  }

  clickInBoxForNoteToClerkPleaseCreateSummons() {
    this.eF.clickInBoxForNoteToClerkPleaseCreateSummons();
  }

  clickContinue() {
    this.eF.clickContinue();
  }

  nextPagePartyEntryScreen() {
    this.eF.nextPagePartyEntryScreen();
  }

  selectPartyTypePetitioner() {
    this.eF.selectPartyTypePetitioner();
  }

  petitionerIsSelectedAndDisplays() {
    this.eF.petitionerIsSelectedAndDisplays();
  }

  enterLastName() {
    this.eF.enterLastName();
  }

  lastNameIsEntered() {
    this.eF.lastNameIsEntered();
  }

  enterFirstName() {
    this.eF.enterFirstName();
  }

  firstNameIsEntered() {
    this.eF.firstNameIsEntered();
  }

  enterMiddleInitial() {
    this.eF.enterMiddleInitial();
  }

  middleInitialEntered() {
    this.eF.middleInitialEntered();
  }

  enterDateOfBirth() {
    this.eF.enterDateOfBirth();
  }

  dateOfBirthEntered() {
    this.eF.dateOfBirthEntered();
  }

  enterCountry() {
    this.eF.enterCountry();
  }

  countryIsEntered() {
    this.eF.countryIsEntered();
  }

  enterAddress1() {
    this.eF.enterAddress1();
  }

  addressIsEntered() {
    this.eF.addressIsEntered();
  }

  enterCity() {
    this.eF.enterCity();
  }

  cityIsEntered() {
    this.eF.cityIsEntered();
  }

  enterStateProvince() {
    this.eF.enterStateProvince();
  }

  stateIsEntered() {
    this.eF.stateIsEntered();
  }

  enterZip() {
    this.eF.enterZip();
  }

  zipcodeIsEntered() {
    this.eF.zipcodeIsEntered();
  }

  clickAddNewParty() {
    this.eF.clickAddNewParty();
  }

  newPartyEntryScreen() {
    this.eF.newPartyEntryScreen();
  }

  selectPartyTypeRespondent() {
    this.eF.selectPartyTypeRespondent();
  }

  respondentIsSelectedAndDisplayed() {
    this.eF.respondentIsSelectedAndDisplayed();
  }

  documentScreenDisplays() {
    this.eF.documentScreenDisplays();
  }

  clickAddButtonFilingOnBehalfOf() {
    this.eF.clickAddButtonFilingOnBehalfOf();
  }

  filingOnBehalfOfDisplaysinTheBox() {
    this.eF.filingOnBehalfOfDisplaysinTheBox();
  }
  checkboxDefaultsToAllNamedPetitionerPlaintiffs() {
    this.eF.checkboxDefaultsToAllNamedPetitionerPlaintiffs();
  }

  documentsPetitionIsAutoFilledForDocumentCategory() {
    this.eF.documentsPetitionIsAutoFilledForDocumentCategory();
  }

  selectDocumentTypeDropdownClickOnAssociateCourt() {
    this.eF.selectDocumentTypeDropdownClickOnAssociateCourt();
  }

  clickOnChooseFileToAddDocument() {
    this.eF.clickOnChooseFileToAddDocument();
  }

  windowOpensToSelectDocumentMustBePDF() {
    this.eF.windowOpensToSelectDocumentMustBePDF();
  }

  clickInTheBoxToTypeDocumentName() {
    this.eF.clickInTheBoxToTypeDocumentName();
  }

  documentNameDisplaysInBox() {
    this.eF.documentNameDisplaysInBox();
  }

  clickAdd() {
    this.eF.clickAdd();
  }

  documentIsAddedToSubissionInTheDocumentTitleAttachmentBox() {
    this.eF.documentIsAddedToSubissionInTheDocumentTitleAttachmentBox();
  }

  reviewAndFilePageDisplays() {
    this.eF.reviewAndFilePageDisplays();
  }

  clickOnCOR2Checkbox() {
    cy.get("body").then(($ele) => {
      if ($ele.find("#redactionConfirmation").length > 0) {
        this.eF.reviewAndFileCourtOperationgRuleCheckbox().click();
      }
    });
  }

  thisActivatesTheContinueButton() {
    this.eF.thisActivatesTheContinueButton();
  }

  paymentScreenDisplays() {
    this.eF.paymentScreenDisplays();
  }

  clickOnCreditCardRadioButton() {
    this.eF.clickOnCreditCardRadioButton();
  }

  enterCardholderName() {
    this.eF.enterCardholderName();
  }

  enterCardNumber() {
    this.eF.enterCardNumber();
  }

  enterCvcCode() {
    this.eF.enterCvcCode();
  }

  enterExperationDate() {
    this.eF.enterExperationDate();
  }

  clickSubmit() {
    this.eF.clickSubmit();
  }

  endOfTest() {
    this.eF.endOfTest();
  }

  /**
   * Scenario: Validate case from eFiling
   */
  useCaseCreatedWithEfiling() {
    this.readRunTimeFile();
    this.eF.useCaseCreatedWithEfiling();
  }

  clickOnCaseImportFromCaseProcessing() {
    this.eF.clickOnCaseImportFromCaseProcessing();
  }

  setFilingLocation() {
    this.eF.setFilingLocation();
  }

  filingLocationShouldBeSet() {
    this.eF.filingLocationShouldBeSet();
  }
  enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField() {
    this.eF.enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField();
  }

  caseIDOrFilingReferenceNumberHasBeenEntered() {
    this.eF.caseIDOrFilingReferenceNumberHasBeenEntered();
  }

  pressApplyButton() {
    this.eF.pressApplyButton();
  }
  /**
   * Note: The transfer from EFiling to SMC takes
   * time.  This method checks if the data is
   * available and if not, it reapplys the search
   * button.
   */
  caseAppearsInResults(count) {
    this.eF.caseAppearsInResults(count);
  }

  expandCaseRowInTable() {
    this.eF.expandCaseRowInTable();
  }

  caseInfoSectionDisplays() {
    this.eF.caseInfoSectionDisplays();
  }

  validateMunicipalLocation() {
    this.eF.validateMunicipalLocation();
  }

  validateFilingDate() {
    this.eF.validateFilingDate();
  }

  validateTime() {
    this.eF.validateTime();
  }

  validateCaseType() {
    this.eF.validateCaseType();
  }

  validateMilestone() {
    this.eF.validateMilestone();
  }

  validateStyleOfCase() {
    this.eF.validateStyleOfCase();
  }

  validateAgency() {
    this.eF.validateAgency();
  }

  validateCaseSecurity() {
    this.eF.validateCaseSecurity();
  }

  filingPartyTable() {
    this.eF.filingPartyTable();
  }

  validateFilingPartyType() {
    this.eF.validateFilingPartyType();
  }

  validateFilingPartyMobar() {
    this.eF.validateFilingPartyMobar();
  }

  validateFilingPartyName() {
    this.eF.validateFilingPartyName();
  }

  partyTabDisplaysAndIsSelected() {
    this.eF.partyTabDisplaysAndIsSelected();
  }

  selectPartyTablePetitioner() {
    this.eF.selectPartyTablePetitioner();
  }

  selectPartyTableRespondent() {
    this.eF.selectPartyTableRespondent();
  }

  validatePartyType() {
    this.eF.validatePartyType();
  }

  validatePartyName() {
    this.eF.validatePartyName();
  }

  validateLastName() {
    this.eF.validateLastName();
  }

  validateMiddleName() {
    this.eF.validateMiddleName();
  }

  validateFirstName() {
    this.eF.validateFirstName();
  }

  validateDateOfBirth() {
    this.eF.validateDateOfBirth();
  }

  validateStreetAddress() {
    this.eF.validateStreetAddress();
  }

  validateCity() {
    this.eF.validateCity();
  }

  validateZipCode() {
    this.eF.validateZipCode();
  }

  clickPartyTypeStatusAcceptButton() {
    this.eF.clickPartyTypeStatusAcceptButton();
  }

  validatePartyStatus() {
    this.eF.validatePartyStatus();
  }

  pressDocketTab() {
    this.eF.pressDocketTab();
  }

  validateDialogPromptToConfirmDocketCode() {
    this.eF.validateDialogPromptToConfirmDocketCode();
  }

  selectYes() {
    this.eF.selectYes();
  }

  docketResultsTableDisplays() {
    this.eF.docketResultsTableDisplays();
  }

  validate3RowsInSize() {
    this.eF.validate3RowsInSize();
  }

  validate1RowHasFiledOnBehalfOfPetitioner() {
    this.eF.validate1RowHasFiledOnBehalfOfPetitioner();
  }

  validate3DocketCodesAndDescriptions(num = 0) {
    this.eF.validate3DocketCodesAndDescriptions();
  }

  validate3SubmitDates() {
    this.eF.validate3SubmitDates();
  }

  expandDocketRow1() {
    this.eF.expandDocketRow1();
  }

  closeDocketRow1() {
    this.eF.closeDocketRow1();
  }

  expandDocketRow2() {
    this.eF.expandDocketRow2();
  }

  closeDocketRow2() {
    this.eF.closeDocketRow2();
  }

  expandDocketRow3() {
    this.eF.expandDocketRow3();
  }

  closeDocketRow3() {
    this.eF.closeDocketRow3();
  }

  validateDocketSequence() {
    this.eF.validateDocketSequence();
  }

  validateDocketCode() {
    this.eF.validateDocketCode();
  }

  validateFiledBy() {
    this.eF.validateFiledBy();
  }

  validateFiledOnBehalfOf() {
    this.eF.validateFiledOnBehalfOf();
  }

  validateSearchDocument() {
    this.eF.validateSearchDocument();
  }

  validateDocumentType() {
    this.eF.validateDocumentType();
  }

  validateDocumentNumber() {
    this.eF.validateDocumentNumber();
  }

  validateDocumentTitle() {
    this.eF.validateDocumentTitle();
  }

  validateMainDocument() {
    this.eF.validateMainDocument();
  }

  validateAttachedToDocketSeq() {
    this.eF.validateAttachedToDocketSeq();
  }

  validateSecurity() {
    this.eF.validateSecurity();
  }

  clickFilingFeeTab() {
    this.eF.clickFilingFeeTab();
  }

  validatePaymentDetailsPayType() {
    this.eF.validatePaymentDetailsPayType();
  }

  validatePaymentDetailsConfirmationNumber() {
    this.eF.validatePaymentDetailsConfirmationNumber();
  }

  validatePaymentDetailsPaidAmount() {
    this.eF.validatePaymentDetailsPaidAmount();
  }

  validateCostAssessmentsRow1() {
    this.eF.validateCostAssessmentsRow1();
  }

  validatePriority() {
    this.eF.validatePriority();
  }

  validateDetail() {
    this.eF.validateDetail();
  }

  validateDescription() {
    this.eF.validateDescription();
  }

  validateAssessedAmount() {
    this.eF.validateAssessedAmount();
  }

  validateBalance() {
    this.eF.validateBalance();
  }

  validateCostAssessmentsRow2() {
    this.eF.validateCostAssessmentsRow2();
  }

  validateCostAssessmentsTotals() {
    this.eF.validateCostAssessmentsTotals();
  }

  validateAssessedTotalAmount() {
    this.eF.validateAssessedTotalAmount();
  }

  validateBalanceTotal() {
    this.eF.validateBalanceTotal();
  }

  validateAmountToApply() {
    this.eF.validateAmountToApply();
  }

  pressChooseActionButton() {
    this.eF.pressChooseActionButton();
  }

  correctActionsDisplay() {
    this.eF.correctActionsDisplay();
  }

  selectAcceptOption() {
    this.eF.selectAcceptOption();
  }

  acceptFilingWindowDisplays() {
    this.eF.acceptFilingWindowDisplays();
  }

  pressYes() {
    this.eF.pressYes();
  }

  assignJudgeScheduleEventWindowDisplays() {
    this.eF.assignJudgeScheduleEventWindowDisplays();
  }

  validateAssignJudgeStyleOfCaseProposed(num = 0) {
    this.eF.validateAssignJudgeStyleOfCaseProposed();
  }

  clickAssignJudgeStyleOfCaseSaveButton() {
    this.eF.clickAssignJudgeStyleOfCaseSaveButton();
  }

  validateJudgePartyType() {
    this.eF.validateJudgePartyType();
  }

  changeProratedDropdownToManualJudge() {
    this.eF.changeProratedDropdownToManualJudge();
  }

  selectCypressJudge() {
    this.eF.selectCypressJudge();
  }

  pressSelectJudgeButton() {
    this.eF.pressSelectJudgeButton();
  }

  validateJudgeIsSelected() {
    this.eF.validateJudgeIsSelected();
  }

  enterEventDescription() {
    this.eF.enterEventDescription();
  }

  eventDescriptionSelected() {
    this.eF.eventDescriptionSelected();
  }
  enterFutureEventDate() {
    this.eF.enterFutureEventDate();
  }

  validateEventDate() {
    this.eF.validateEventDate();
  }

  enterEventTime() {
    this.eF.enterEventTime();
  }

  validateEventTime() {
    this.eF.validateEventTime();
  }

  validateEventJudgeIsSelect() {
    this.eF.validateEventJudgeIsSelect();
  }

  enterRoom() {
    this.eF.enterRoom();
  }

  roomSelected() {
    this.eF.roomSelected();
  }

  validateRoomLocation() {
    this.eF.validateRoomLocation();
  }

  enterNoteToFiler() {
    this.eF.enterNoteToFiler();
  }

  validateNoteToFiler() {
    this.eF.validateNoteToFiler();
  }

  clickNoteToFilerSaveNoteButton() {
    this.eF.clickNoteToFilerSaveNoteButton();
  }

  pressSaveEvent() {
    this.eF.pressSaveEvent();
  }

  assignJudgeScheduleEventWindowCloses() {
    this.eF.assignJudgeScheduleEventWindowCloses();
  }

  closeTab() {
    this.eF.closeTab();
  }
}
