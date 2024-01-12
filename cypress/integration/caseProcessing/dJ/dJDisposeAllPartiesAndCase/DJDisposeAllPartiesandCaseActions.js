/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DJDisposeAllPartiesandCaseElements from "./DJDisposeAllPartiesandCaseElements";
import DispostionJudgementService from "../../../pom/caseProcessing/civil/DispositionJudgementService";
import DJ_DispositionJudgementActions from "../../../pom/caseProcessing/civil/DJ_DispositionJudgementActions";

export default class DJDisposeAllPartiesandCaseActions {
  constructor() {
    this.utils = new Utils();
    this.tempFile = "cypress\\temp\\DJDisposeAllPartiesandCase.json";
    this.djElements = new DJDisposeAllPartiesandCaseElements();
    this.djService = new DispostionJudgementService(this.tempFile);
    this.djActions = new DJ_DispositionJudgementActions(this.tempFile);
  }

  /**
   * Scenario: Create a Civil Case
   */
  civilCaseWithLitigantPartyTypes() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djService.createACivilCaseWithLitigationPartyTypes(
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
    this.djActions.clickCloseIfEventWindowOpens();
  }
}
