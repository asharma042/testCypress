/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DJEditSavedPartiesDateTimeElements from "./DJEditSavedPartiesDateTimeElements";
import DJ_DispositionJudgementActions from "../../../pom/caseProcessing/civil/DJ_DispositionJudgementActions";
import DispostionJudgementService from "../../../pom/caseProcessing/civil/DispositionJudgementService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class DJEditSavedPartiesDateTimeActions {
  constructor() {
    this.utils = new Utils();
    this.tempFileName = "cypress\\temp\\djEditSavedPartiesDateTimeActions.json";
    this.djElements = new DJEditSavedPartiesDateTimeElements();
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
    this.djService.disposeAllParties(this.scenario, this.partiesCount);
  }

  clickOnCivilFromCaseProcessing() {
    // no op
  }

  clickOnDispositionJudgment() {
    // no op
  }

  caseIDRadioButtonIsSelected() {
    // no op
  }

  enterCivilCaseIDInMyCaseIDSearch() {
    // no op
  }

  clickMagnifyingGlassIcon() {
    // no op
  }

  casesDisplayInTheCasesSection() {
    // no op
  }

  clickCheckBoxNextToSelectAll() {
    // no op
  }

  enablesPartyDispositionDropDownList() {
    // no op
  }

  selectValueFromPartyDispositionDropdownList() {
    // no op
  }

  clickCheckmarkIconForTheSameCasePartyRecord() {
    // no op
  }

  populatesPartyDipositionCodeForPetitioner() {
    // no op
  }

  clickSaveCasePartiesDispositionButton() {
    // no op
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave() {
    // no op
  }

  casePartyDispositionCodeIsSavedForSelectedCaseParty() {
    // no op
  }
  /**
   * Scenario: Edit Party Disposition Date/Time
   */
  mustHaveACivilCaseWithPartiesThatAreDisposed() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djActions.continueWithCivilCaseWithAllPartiesDisposed();
  }

  clickSelectAllInCasePartiesSection() {
    this.djElements.getSelectAllInCasePartiesSectionInput().click();
  }

  clickPencilIconInPartyDispositionDate() {
    const date = this.utils.oneMonthAgo();
    cy.wrap(date).as("pastDate");
    this.djElements.getPencilIconInPartyDispositionDateButton().click();
    this.djElements.getPartyDispositionDateEditableLink().first().click();
    this.djElements.getEditableDateFieldInput().type(date);
  }

  clickCheckMarkToConfirm() {
    this.djElements.getEditableSubmitCheckButton().click();
  }

  newDateDisplaysOnAllParties() {
    //no op
  }

  clickPencilIconInTime() {
    const time = this.utils.formatTime(new Date());
    cy.wrap(time).as("newTime");
    this.djElements.getPencilIconInPartyDispositionTimeEditButton().click();
    this.djElements.getPartyDispositionTimeEditableLink().first().click();
    this.djElements.getEditableTimeFieldInput().type(time);
  }

  newTimeDisplays() {
    // no op
  }

  clikcSaveCasePartiesDisposition() {
    this.djElements.getClickToSavePartyDispositionButton().click();
    this.utils.clearNotyMessages();
  }

  newEntriesDisplay() {
    cy.wait(1000);
    cy.get("@pastDate").then(($pastDate) => {
      this.djElements
        .getPartyDispositionDateCell()
        .first()
        .invoke("prop", "innerText")
        .then(($text) => {
          let dateFound = new Date($text.split(":")[0]);
          dateFound = this.utils.formatDate(dateFound);
          expect(
            $pastDate == dateFound,
            `Expected ${$pastDate} but found ${dateFound}`
          ).to.be.true;
        });
    });
    cy.get("@newTime").then(($newTime) => {
      this.djElements.getPartyDispositionTimeCell().then(($elems) => {
        for (let i = 0; i < $elems.length; i++) {
          expect(
            $newTime.includes($elems[i].innerText),
            `Expected ${$newTime} but found ${$elems[i].innerText}`
          ).to.be.true;
        }
      });
    });
  }

  caseDispositionPopulatesWithDTRCTTriedByCourtCivilDISPLAYONLY() {
    const defaultPartyDispositionInputValue = jsonHandler.getValue(
      "scenario1",
      "defaultPartyDispositionInputValue"
    );
    this.djElements
      .getCaseDispositionCaseDispositionButton()
      .invoke("attr", "title")
      .should("contain", defaultPartyDispositionInputValue);
    this.djElements
      .getCaseDispositionCaseDispositionButton()
      .invoke("prop", "isContentEditable")
      .should("eq", false);
  }

  caseDispositionDateAutoFillsDISPLAYONLY() {
    cy.get("@pastDate").then(($pastDate) => {
      this.djElements
        .getCaseDispositionCaseDispositionDate()
        .should("have.value", $pastDate);
      this.djElements
        .getCaseDispositionCaseDispositionDate()
        .invoke("prop", "isContentEditable")
        .should("eq", false);
    });
  }

  timeFieldAutoFillsDISPLAYONLY() {
    cy.get("@newTime").then(($newTime) => {
      this.djElements
        .getCaseDispositionCaseDispositionTime()
        .should("have.value", $newTime);
      this.djElements
        .getCaseDispositionCaseDispositionTime()
        .invoke("prop", "isContentEditable")
        .should("eq", false);
    });
  }

  enterTextInPredefinedTextFieldInCaseDispositionSection() {
    const text = jsonHandler.getValue("scenario1", "dispositionPerDefinedText");
    this.djElements.getCaseDispositionPreDefinedText().type(text);
  }

  textDisplaysInFreeTextField() {
    const text = jsonHandler.getValue("scenario1", "dispositionPerDefinedText");
    this.djElements
      .getCaseDispositionPreDefinedText()
      .should("have.value", text);
  }

  clickSaveDispositionButton() {
    this.djElements.getSaveDispositionButton().click();
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId() {
    this.utils.clearNotyMessages();
  }

  caseDispositionCodeIsSavedForTheCase() {
    this.djElements.getCivilDispostionEventCloserWindowSaveButton().click();
    this.djElements.getDispositionAndJudgementCloseTabIcon().click();
  }
}
