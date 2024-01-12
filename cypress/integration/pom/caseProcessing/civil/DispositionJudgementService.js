import currentFunction from "current-function";
import Utils from "../../../utils/utils";
import CivilCaseService from "./CivilCaseService";
import DJ_DispositionJudgementActions from "./DJ_DispositionJudgementActions";

export default class DispostionJudgementService {
  constructor(tempFileName) {
    if (!tempFileName) {
      throw new Error("missing tempFileName");
    }
    this.tempFileName = tempFileName;
    this.utils = new Utils();
    this.civilCaseService = new CivilCaseService();
    this.djActions = new DJ_DispositionJudgementActions(this.tempFileName);
  }

  createACivilCaseWithLitigationPartyTypes(scenario, partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.djActions.civilCaseWithLitigantPartyTypes(scenario, partiesCount);
  }

  disposeAllParties(scenario, partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.djActions.continueWithCivilCaseWithLitigantPartyTypes();
    this.djActions.clickOnCivilFromCaseProcessing();
    this.djActions.clickOnDispositionJudgment();
    this.djActions.caseIDRadioButtonIsSelected();
    this.djActions.enterCivilCaseIDInMyCaseIDSearch();
    this.djActions.clickMagnifyingGlassIcon();
    this.djActions.casesDisplayInTheCasesSection();
    this.djActions.clickSelectAllCheckBox();
    this.djActions.enablesPartyDispositionDropDownList();
    this.djActions.clickPencilIconNextToACasePartyRecord(partiesCount);
    this.djActions.selectValueFromPartyDispositionDropdownList(scenario);
    this.djActions.clickCheckmarkIconForTheSameCasePartyRecord();
    this.djActions.populatesPartyDipositionCodeForAllCasePartyRecords(scenario);
    this.djActions.clickSaveCasePartiesDispositionButton();
    this.djActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
    this.djActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
  }

  disposeCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.djActions.continueWithCivilCaseWithAllPartiesDisposed();
    this.djActions.caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY();
    this.djActions.caseDispositionDateAutoFillsDISPLAYONLY();
    this.djActions.timeFieldAutoFillsDISPLAYONLY();
    this.djActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
    this.djActions.textDisplaysInFreeTextField();
    this.djActions.clickSaveDispositionButton();
    this.djActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
    this.djActions.caseDispositionCodeIsSavedForTheCase();
  }
}
