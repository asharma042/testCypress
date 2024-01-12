/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DispostionJudgementService from "../../../pom/caseProcessing/civil/DispositionJudgementService";
import DJ_DispositionJudgementActions from "../../../pom/caseProcessing/civil/DJ_DispositionJudgementActions";

export default class DJHappyPathActions {
  constructor(tempFileName) {
    this.tempFileName = "cypress\\temp\\djHappyPath.json";

    if (tempFileName) {
      this.tempFileName = tempFileName;
    }
    this.utils = new Utils();
    this.djActions = new DJ_DispositionJudgementActions(this.tempFileName);
    this.djService = new DispostionJudgementService(this.tempFileName);
  }

  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }

  /**
   * Scenario: Create a Civil Case
   */
  civilCaseWithLitigantPartyTypes() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djActions.civilCaseWithLitigantPartyTypes(
      this.scenario,
      this.partiesCount
    );
  }
  /**
   * Scenario: Dispose All Parties
   */
  continueWithCivilCaseWithLitigantPartyTypes() {
    this.scenario = "scenario1";
    this.partiesCount = 0;
    this.djActions.continueWithCivilCaseWithLitigantPartyTypes();
  }

  clickOnCivilFromCaseProcessing() {
    this.djActions.clickOnCivilFromCaseProcessing();
  }

  clickOnDispositionJudgment() {
    this.djActions.clickOnDispositionJudgment();
  }

  caseIDRadioButtonIsSelected() {
    this.djActions.caseIDRadioButtonIsSelected();
  }

  enterCivilCaseIDInMyCaseIDSearch() {
    this.djActions.enterCivilCaseIDInMyCaseIDSearch();
  }

  clickMagnifyingGlassIcon() {
    this.djActions.clickMagnifyingGlassIcon();
  }

  casesDisplayInTheCasesSection() {
    this.djActions.casesDisplayInTheCasesSection();
  }

  clickSelectAllCheckBox() {
    this.djActions.clickSelectAllCheckBox();
  }

  enablesPartyDispositionDropDownList() {
    this.djActions.enablesPartyDispositionDropDownList();
  }

  clickPencilIconNextToACasePartyRecord() {
    this.djActions.clickPencilIconNextToACasePartyRecord(this.partiesCount);
  }

  selectValueFromPartyDispositionDropdownList() {
    this.djActions.selectValueFromPartyDispositionDropdownList(this.scenario);
  }

  clickCheckmarkIconForTheSameCasePartyRecord() {
    this.djActions.clickCheckmarkIconForTheSameCasePartyRecord();
  }

  populatesPartyDipositionCodeForAllCasePartyRecords() {
    this.djActions.populatesPartyDipositionCodeForAllCasePartyRecords(
      this.scenario
    );
  }

  clickSaveCasePartiesDispositionButton() {
    this.djActions.clickSaveCasePartiesDispositionButton();
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave() {
    this.djActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }

  casePartyDispositionCodeIsSavedForSelectedCaseParty() {
    this.djActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
  }
  /**
   * Scenario: Dispose Case
   */
  continueWithCivilCaseWithAllPartiesDisposed() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djActions.continueWithCivilCaseWithAllPartiesDisposed();
  }

  caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY() {
    this.djActions.caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY();
  }

  caseDispositionDateAutoFillsDISPLAYONLY() {
    this.djActions.caseDispositionDateAutoFillsDISPLAYONLY();
  }

  timeFieldAutoFillsDISPLAYONLY() {
    this.djActions.timeFieldAutoFillsDISPLAYONLY();
  }

  enterTextInPredefinedTextFieldInCaseDispositionSection() {
    this.djActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
  }

  textDisplaysInFreeTextField() {
    this.djActions.textDisplaysInFreeTextField();
  }

  clickSaveDispositionButton() {
    this.djActions.clickSaveDispositionButton();
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId() {
    this.djActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }

  caseDispositionCodeIsSavedForTheCase() {
    this.djActions.caseDispositionCodeIsSavedForTheCase();
  }

  clickCloseIfEventWindowOpens() {
    this.djActions.clickCloseIfEventWindowOpens();
  }

  /**
   * Scenario: Add Petitioner "Judgment For Record"
   */
  civilCaseWithAllPartiesDisposedAndCaseDisposed() {
    this.scenario = "scenario1";
    this.partiesCount = 0;
    this.djActions.civilCaseWithAllPartiesDisposedAndCaseDisposed();
  }

  clickJudgmentSectionTriangleIcon() {
    this.djActions.clickJudgmentSectionTriangleIcon();
  }

  expandsJudgmentSection() {
    this.djActions.expandsJudgmentSection();
  }

  selectPartyFromCasePartyDropdownList() {
    this.djActions.selectPartyFromCasePartyDropdownList(this.partiesCount);
  }

  selectPartyFromCasePartyDropdownListPetitioner() {
    this.djActions.selectPartyFromCasePartyDropdownListPetitioner(
      this.partiesCount
    );
  }

  selectsOnlyTheOneCaseParty() {
    this.djActions.selectsOnlyTheOneCaseParty();
  }

  clickAddJudgmentButton() {
    this.djActions.clickAddJudgmentButton();
  }

  opensAddJudgment() {
    this.djActions.opensAddJudgment(this.partiesCount);
  }

  judgmentAgainstForFieldClick(option0) {
    this.djActions.judgmentAgainstForFieldClick(option0);
  }

  judgmentForField() {
    this.djActions.judgmentForField(this.partiesCount);
  }

  displaysPartyNameInJudgmentAgainstField() {
    this.djActions.displaysPartyNameInJudgmentAgainstField(this.partiesCount);
  }

  judgmentMonetaryNonMonetarySelectMonetary() {
    this.djActions.judgmentMonetaryNonMonetarySelectMonetary();
  }

  monetaryDisplays() {
    this.djActions.monetaryDisplays();
  }

  enter15000InAmountField() {
    this.djActions.enter15000InAmountField(this.partiesCount);
  }

  amountDisplays() {
    this.djActions.amountDisplays(this.partiesCount);
  }

  enterJCLAMInJudgmentDescriptionField() {
    this.djActions.enterJCLAMInJudgmentDescriptionField();
  }

  judgmentDateAutoFillsWithCurrentDate() {
    this.djActions.judgmentDateAutoFillsWithCurrentDate();
  }

  timeAutoFillsWithCurrentTime() {
    this.djActions.timeAutoFillsWithCurrentTime();
  }

  clickSaveButton() {
    this.djActions.clickSaveButton();
  }

  judgmentForRecordDispalysInTheViewUpdateJudgmentTable() {
    this.djActions.judgmentForRecordDispalysInTheViewUpdateJudgmentTable(
      this.partiesCount
    );
  }
  /**
   * Scenario: Add Respondent "Judgment Against"
   */
  civilCaseWithAllPartiesDisposedAndCaseDisposedAndPetitionerJudged() {
    this.scenario = "scenario1";
    this.partiesCount = 1;
    this.djActions.civilCaseWithAllPartiesDisposedAndCaseDisposedAndPetitionerJudged();
  }

  selectPartyFromCasePartyDropdownListRespondent() {
    this.djActions.selectPartyFromCasePartyDropdownListRespondent(
      this.partiesCount
    );
  }

  /**
   * Scenario: update "Judgment Against" record
   */
  civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEntered() {
    this.scenario = "scenario1";
    this.partiesCount = 0;
    this.djActions.civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEntered(
      this.scenario,
      this.partiesCount
    );
  }

  clickNextToJudgmentRecordToBeUpdated() {
    this.djActions.clickNextToJudgmentRecordToBeUpdated(this.partiesCount);
  }

  recordExpands() {
    this.djActions.recordExpands();
  }

  clickPencilIcon() {
    this.djActions.clickPencilIcon();
  }

  enter500InAmountField() {
    this.djActions.enter500InAmountField(this.partiesCount);
  }

  amountUpdates() {
    this.djActions.amountUpdates(this.partiesCount);
  }

  enterERREnteredInErrorInReasonForJudgmentChangeField() {
    this.djActions.enterERREnteredInErrorInReasonForJudgmentChangeField();
  }

  selectUpdateJudgmentEntryButton() {
    this.djActions.selectUpdateJudgmentEntryButton();
  }

  successNotyDisplays() {
    this.djActions.successNotyDisplays();
  }

  updateDisplaysInTable() {
    this.djActions.updateDisplaysInTable(this.partiesCount);
  }
  /**
   * Scenario: update "Judgment For" record
   */
  civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEnteredAfterUpdate() {
    this.scenario = "scenario1";
    this.partiesCount = 1;
    this.djActions.civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEnteredAfterUpdate(
      this.scenario,
      this.partiesCount
    );
  }
}
