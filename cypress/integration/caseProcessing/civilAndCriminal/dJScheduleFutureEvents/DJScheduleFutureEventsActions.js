/// <reference types="cypress" />
import DJScheduleFutureEventsElements from "./DJScheduleFutureEventsElements";
import ScheduleFutureEventsActions from "../../../pom/caseProcessing/civilAndCriminal/scheduleFutureEvents/ScheduleFutureEventsActions";
import Utils from "../../../utils/utils";
export default class DJScheduleFutureEventsActions {
  constructor() {
    this.dJSFEElements = new DJScheduleFutureEventsElements();
    this.tempFileName = "cypress\\temp\\DJScheduleFutureEvents.json";
    this.schedFutEventActions = new ScheduleFutureEventsActions(
      this.tempFileName
    );
    this.utils = new Utils();
  }

  readRunTimeFile() {
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        cy.wrap($json.case).as("case");
      }
    });
  }

  /**
   * Scenario: Schedule Event
   */
  civilOrCriminalCase() {
    this.scenario = "scenario1";
    this.schedFutEventActions.civilOrCriminalCase(this.scenario);
  }

  /**
   * Scenario: Continue with Civil or Criminal case
   */
  initialCaseMustBeCreatedWithAtLeaseOnePartyType() {
    this.scenario = "scenario1";
    this.schedFutEventActions.initialCaseMustBeCreatedWithAtLeaseOnePartyType();
  }

  clickOnCaseProcessing() {
    this.schedFutEventActions.clickOnCaseProcessing();
  }

  clickOnScheduling() {
    this.schedFutEventActions.clickOnScheduling();
  }

  caseIDRadioButtonIsSelected() {
    this.schedFutEventActions.caseIDRadioButtonIsSelected();
  }

  enterCaseIDInMyCaseIDSearch() {
    this.schedFutEventActions.enterCaseIDInMyCaseIDSearch();
  }

  clickMagnifyingGlassIcon() {
    this.schedFutEventActions.clickMagnifyingGlassIcon();
  }

  casesDisplayInTheCasesSection() {
    this.schedFutEventActions.casesDisplayInTheCasesSection();
  }

  clickToExpandCaseInformtion() {
    this.schedFutEventActions.clickToExpandCaseInformtion();
  }

  expandAddEventSection() {
    this.schedFutEventActions.expandAddEventSection();
  }

  enterEventDescription() {
    this.schedFutEventActions.enterEventDescription(this.scenario);
  }

  cREVDisplaysInEventDescriptionField() {
    this.schedFutEventActions.cREVDisplaysInEventDescriptionField(
      this.scenario
    );
  }

  enterEventDate() {
    this.schedFutEventActions.enterEventDate(7);
  }

  displaysInDateField() {
    this.schedFutEventActions.displaysInDateField();
  }

  enterTime() {
    this.schedFutEventActions.enterTime();
  }

  displaysInTimeField() {
    this.schedFutEventActions.displaysInTimeField();
  }

  addToDocketTextBoxIsChecked() {
    this.schedFutEventActions.addToDocketTextBoxIsChecked();
  }

  docketFilingDateDisplaysCurrentDate() {
    this.schedFutEventActions.docketFilingDateDisplaysCurrentDate();
  }

  docketTimeDisplaysCurrentTime() {
    this.schedFutEventActions.docketTimeDisplaysCurrentTime();
  }

  confirmCheckBoxIsChecked() {
    this.schedFutEventActions.confirmCheckBoxIsChecked();
  }

  displaysAssignedJudge() {
    this.schedFutEventActions.displaysAssignedJudge(this.scenario);
  }

  enterRoom() {
    this.schedFutEventActions.enterRoom(this.scenario);
  }

  roomDisplaysLocationForJudge() {
    this.schedFutEventActions.roomDisplaysLocationForJudge(this.scenario);
  }

  locationDisplaysAKCarter() {
    this.schedFutEventActions.locationDisplaysAKCarter(this.scenario);
  }

  clickSaveEventInformationButton() {
    this.schedFutEventActions.clickSaveEventInformationButton();
  }

  notyDisplaysSuccessMessage() {
    this.schedFutEventActions.notyDisplaysSuccessMessage();
  }
}
