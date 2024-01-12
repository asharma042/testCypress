/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DJCloseTwoFutureEventsElements from "./DJCloseTwoFutureEventsElements";
import DispostionJudgementService from "../../../pom/caseProcessing/civil/DispositionJudgementService";
import ScheduleEventsService from "../../../pom/caseProcessing/scheduling/ScheduleEventsService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class DJCloseTwoFutureEventsActions {
  constructor() {
    this.utils = new Utils();
    this.tempFileName = "cypress\\temp\\djCloseTwoFutureEventsonly.json";
    this.djElements = new DJCloseTwoFutureEventsElements();
    this.djService = new DispostionJudgementService(this.tempFileName);
    this.scheduleEventsService = new ScheduleEventsService(this.tempFileName);
  }

  /**
   * Scenario: Create a Civil Case
   */
  civilCaseWithLitigantPartyTypesAndAddTwoFutureEvents() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djService.createACivilCaseWithLitigationPartyTypes(
      this.scenario,
      this.partiesCount
    );
    cy.logout();

    cy.log(
      "---------------------------------------------------Adding First Future Event"
    ).then(() => {
      const futureDate = this.utils.getValidDateForSchedulingStartingFromNow(
        this.utils.generateRandomNumberBetween(5, 10)
      );
      this.scheduleEventsService.addFutureEvent(this.scenario, futureDate);
      cy.logout();
    });

    cy.log(
      "---------------------------------------------------Adding Second Future Event"
    ).then(() => {
      const futureDate = this.utils.getValidDateForSchedulingStartingFromNow(
        this.utils.generateRandomNumberBetween(11, 20)
      );
      this.scheduleEventsService.addFutureEvent(this.scenario, futureDate);
    });
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

  clickSelectAllCheckBox() {
    // no op
  }

  enablesPartyDispositionDropDownList() {
    // no op
  }

  clickPencilIconNextToACasePartyRecord() {
    // no op
  }

  selectValueFromPartyDispositionDropdownList() {
    // no op
  }

  clickCheckmarkIconForTheSameCasePartyRecord() {
    // no op
  }

  populatesPartyDipositionCodeForAllCasePartyRecords() {
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
   * Scenario: Dispose Case
   */
  continueWithCivilCaseWithAllPartiesDisposed() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djService.disposeCase(this.scenario, this.partiesCount);
  }

  caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY() {
    // no op
  }

  caseDispositionDateAutoFillsDISPLAYONLY() {
    // no op
  }

  timeFieldAutoFillsDISPLAYONLY() {
    // no op
  }

  enterTextInPredefinedTextFieldInCaseDispositionSection() {
    // no op
  }

  textDisplaysInFreeTextField() {
    // no op
  }

  clickSaveDispositionButton() {
    // no op
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId() {
    // no op
  }

  caseDispositionCodeIsSavedForTheCase() {
    // no op
  }

  civilDispositionEventClosureWindowDisplaysWithOpenFutureEvents() {
    this.djElements.getCivilDispositionEventClosure_Title().should("exist");
  }

  clickCloseAllOpenFutureEventsButton() {
    const buttonName = "Close All Future Events";
    this.djElements.getEventClosureWindow_Button(buttonName).click();
  }

  futureEventDisplaysHRCANHearingTrialCancelledWithCurrentDateAndTimePastEventsRemainOpen() {
    const eventOutcome = jsonHandler.getValue(this.scenario, "eventOutcome");
    this.djElements
      .getEventClosureWindow_CloseEventsTableCourtDispo_TableRows()
      .each(($ele, $index) => {
        cy.wrap($ele)
          .find("td")
          .then(($ele) => {
            if (new Date($ele[1].textContent) > new Date()) {
              cy.wrap($ele[3])
                .find("button")
                .invoke("attr", "title")
                .should("eq", eventOutcome);
            } else {
              cy.wrap($ele[3])
                .find("button")
                .invoke("attr", "title")
                .should("eq", "Nothing selected");
            }
          });
      });
  }

  clickSave() {
    const saveButtonText = "Save";
    this.djElements.getEventClosureWindow_Button(saveButtonText).click();
  }

  greenNotyDisplaysConfirmationForEvents() {
    this.utils.clearNotyMessages();
    this.djElements.getDispositionAndJudgementCloseTabIcon().click();
  }
}
