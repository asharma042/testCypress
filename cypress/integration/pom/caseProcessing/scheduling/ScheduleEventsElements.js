/// <reference types="cypress" />

export default class ScheduleEventsElements {
  getSchedulingCaseIdInput() {
    return cy.get("input#caseIdSchedulingRadio");
  }

  getSchedulingSearchInput() {
    return cy.get('input[id ^= "schedulingSearchById"]');
  }

  getCaseIdinCasesSectionLink() {
    return cy.get("a.caseNum");
  }

  getAddEventExpandButton() {
    return cy.get(
      'button[title ="Click to expand/collapse the add event section"]'
    );
  }

  getScheduleEvent_EventDiscription_Button() {
    return cy.get(
      "button.dropdown-toggle[data-id^=addEventCaseEventDescription_]"
    );
  }

  getScheduleEvent_EventDiscription_Input() {
    return cy
      .get(
        'div[class="btn-group bootstrap-select clearable searchpref input-group-xs addEventCaseEventDescription show-tick open"]'
      )
      .find("input.form-control");
  }

  getAddEvent_EventDate_Input() {
    return cy.get('input[id ^= "addEventDate"]');
  }

  getAddEvent_Time_Input() {
    return cy.get('input[id ^= "addEventTime"]');
  }

  getAddEvent_DocketText_Input() {
    return cy.get('input[class="schedulingDocketTextChkBox styledCheckbox2"]');
  }

  getAddEvent_DocketFilingDate_Input() {
    return cy.get('input[id ^= "addEventDocketDate_"]');
  }

  getAddEvent_DocketTime_Input() {
    return cy.get('input[id ^= "addEventDocketTime_"]');
  }

  getAddEvent_Confirm_Input() {
    return cy.get('input[class="conflictOverrideChkBox styledCheckbox2"]');
  }

  getAddEvent_EventJudge_Button() {
    return cy.get("[data-id^=addEventCaseEventJudge_]");
  }

  getAddEvent_Room_Button() {
    return cy.get("button.dropdown-toggle[data-id ^= addEventCaseEventRoom_]");
  }

  getAddEvent_Room_Input() {
    return cy.get("div.schedulingEventRoomAddEvent").find("input.form-control");
  }

  getAddEvent_Location_Button() {
    return cy.get(
      "button.dropdown-toggle[data-id ^= addEventCaseEventLocation_]"
    );
  }

  getAddEvent_SaveEventInformation_Button() {
    return cy.get("button.schedulingEventSaveBtn");
  }

  getDispositionAndJudgementCloseTabIcon() {
    return cy.get(".close-tab-span");
  }
}
