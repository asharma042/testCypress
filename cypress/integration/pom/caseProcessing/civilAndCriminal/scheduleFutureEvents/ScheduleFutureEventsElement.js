/// <reference types="cypress" />

export default class ScheduleFutureEventsElements {
  getSchedulingCaseIdRadioButton() {
    return cy.get("#caseIdSchedulingRadio");
  }

  getSchedulingSearchInput() {
    return cy.get("[id^=schedulingSearchById_]");
  }

  getSearchResultsTable() {
    return cy.get(".smcMuniTrfcSchedulingTable").then(($ele) => {
      return $ele[0];
    });
  }

  getAddEventSectionOpenIcon() {
    return cy.get(".collapseAddEventSectionBtn").then(($ele) => {
      return $ele[0];
    });
  }

  getAddEventSectionEventDescriptionButton() {
    return cy.get("[data-id^=addEventCaseEventDescription_]").then(($ele) => {
      return $ele[0];
    });
  }

  getAddEventSectionEventDescriptionInput(rownum) {
    return cy.get("div.dropdown-menu.open > div > input").then(($ele) => {
      return $ele[rownum];
    });
  }

  getAddEventSectionEventDate() {
    return cy.get("[id^=addEventDate_]");
  }

  getAddEventSectionTime() {
    return cy.get("[id^=addEventTime_]");
  }

  getAddEventSectionAddToDocketCheckbox() {
    return cy.get("#docketText");
  }

  getAddEventSectionDocketFilingDate() {
    return cy.get("[id^=addEventDocketDate_]");
  }

  getAddEventSectionDocketTime() {
    return cy.get("[id^=addEventDocketTime_]");
  }

  getAddEventSectionConfirmCheckbox() {
    return cy.get("#conflictOverride");
  }

  getAddEventSectionJudgeButton(num) {
    return cy.get("[data-id^=addEventCaseEventJudge_]").then(($ele) => {
      return $ele[num];
    });
  }

  getScheduleEvent_Room_Button() {
    return cy.get("[data-id^=addEventCaseEventRoom_]").then(($ele) => {
      return $ele[0];
    });
  }

  getScheduleEvent_Room_Input(num) {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        return $ele[num];
      });
  }
  getScheduleEvent_locationButton() {
    return cy.get("[data-id^=addEventCaseEventLocation_]");
  }

  getScheduleEvent_SaveEventInformationButton() {
    return cy.get(".schedulingEventSaveBtn");
  }
  getCloseTabIcon() {
    return cy.get(".close-tab-span");
  }
}
