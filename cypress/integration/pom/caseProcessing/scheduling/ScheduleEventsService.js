/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import ScheduleEventsActions from "./ScheduleEventsActions";
import currentFunction from "current-function";

export default class ScheduleEventsService {
  constructor(tempFileName) {
    if (!tempFileName) {
      throw new Error("missing tempFileName");
    }
    this.utils = new Utils();
    this.scheduleEventsActions = new ScheduleEventsActions(tempFileName);
  }

  addFutureEvent(scenario, futureDate) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.navigateAndSearchForCase();
    this.addFutureEventToACase(scenario, futureDate);
    this.scheduleEventsActions.closeTab();
  }

  navigateAndSearchForCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsActions.initialCaseMustBeCreatedWithAtLeaseOnePartyType();
    this.scheduleEventsActions.clickOnCaseProcessing();
    this.scheduleEventsActions.clickOnScheduling();
    this.scheduleEventsActions.caseIDRadioButtonIsSelected();
    this.scheduleEventsActions.enterCaseIDInMyCaseIDSearch();
    this.scheduleEventsActions.casesDisplayInTheCasesSection();
    this.scheduleEventsActions.clickToExpandCaseInformtion();
  }

  addFutureEventToACase(scenario, futureDate) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.scheduleEventsActions.expandAddEventSection();
    this.scheduleEventsActions.enterEventDescription(scenario);
    this.scheduleEventsActions.cREVDisplaysInEventDescriptionField(scenario);
    this.scheduleEventsActions.enterEventDate(futureDate);
    this.scheduleEventsActions.displaysInDateField();
    this.scheduleEventsActions.enterTime();
    this.scheduleEventsActions.displaysInTimeField();
    this.scheduleEventsActions.addToDocketTextBoxIsChecked();
    this.scheduleEventsActions.docketFilingDateDisplaysCurrentDate();
    this.scheduleEventsActions.docketTimeDisplaysCurrentTime();
    this.scheduleEventsActions.confirmCheckBoxIsChecked();
    this.scheduleEventsActions.displaysAssignedJudge(scenario);
    this.scheduleEventsActions.enterRoom(scenario);
    this.scheduleEventsActions.roomDisplaysLocationForJudge();
    this.scheduleEventsActions.locationDisplaysAKCarter(scenario);
    this.scheduleEventsActions.clickSaveEventInformationButton();
    this.scheduleEventsActions.notyDisplaysSuccessMessage();
  }
}
