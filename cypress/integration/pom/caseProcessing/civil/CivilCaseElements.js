/// <reference types="cypress" />

export default class CivilCaseElements {
  getCourtLocation() {
    return cy.get("[data-id^=locnCode_]");
  }

  getCourtLocationItem(value) {
    return cy.get(`a:contains(${value})`);
  }

  getFilingDate() {
    return cy.get("[id^=initFiling_]");
  }

  getCaseTypeDropDown() {
    return cy.get("[data-id^=ctypCode_]");
  }
  getCaseTypeInput() {
    //this return 9 items, the 2nd is the one we want
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($elements) => {
        return $elements[1];
      });
  }
  getMileStoneDropdown() {
    return cy.get("[data-id^=milestoneCode_]");
  }
  getStyleOfCaseInput() {
    return cy.get("[id^=desc_]");
  }
  getInitiatingCheckbox() {
    return cy.get(".initiatingEtAl");
  }
  getRespondingCheckbox() {
    return cy.get(".respondingEtAl");
  }
  getAgencyInput() {
    return cy.get("[id^=arrestingAgencyOri_]");
  }
  getAgencyInputDropdownSelection() {
    return cy.get(".ui-autocomplete-desc");
  }
  getCaseSecuritySelect() {
    return cy.get("[name=caseSecurity]");
  }
  getCaseSecuritySelectedOption() {
    return cy.get("[name=caseSecurity] option:selected");
  }
  getReasonInput() {
    return cy.get("[name=caseSecurityReason]");
  }
  getPartyDescriptionSelect() {
    return cy.get("[data-id^=addPartyDescription_]").then(($elements) => {
      if ($elements.length) {
        return $elements[0];
      }
      return $elements;
    });
  }
  getPartyDescriptionInput() {
    return cy.get(
      "[id^=collapseAddPartyTypeName_] > div.form-group.col-md-4.col-sm-4.input-group-xs.paddingnarrow > div > div > div.dropdown-menu.open > div > input"
    );
  }

  getAttorneySearchInput() {
    return cy.get("#addPartyAttyMobarSearch");
  }

  getContactInformationStreetAddressInput() {
    return cy.get("[id^=streetLine1]");
  }

  getContactInformationCityInput() {
    return cy.get("#city");
  }

  getInitialDocketEntry_DocketDescription() {
    return cy.get("[data-id^=docketCode_]");
  }
  getInitialDocketEntry_Checked() {
    return cy.get("#checkboxDocket");
  }

  getInitialDocketEntry_DocketSequence() {
    return cy.get("#docketSequence");
  }

  getInitialDockeyEntry_CreateNewButton() {
    return cy.findByRole("button", { name: /Create New/i });
  }

  getInitialDocketEntry_CreateCaseOption(option) {
    return cy.get(`a:contains("${option}")`);
  }
  ////////////////////////////////////
  /// Enter a Case / Event popup window
  ////////////////////////////////////
  getScheduleEvent_title(title) {
    return cy.get(`a:contains("${title}")`).then(($ele) => {
      if ($ele.length) {
        return $ele[2];
      }
      return $ele;
    });
  }
  getScheduleEvent_SyleOfCaseSection() {
    return cy.get("[id^=styleOfCaseDiv_]");
  }

  getScheduleEvent_StyleOfCaseSection_ProposedRadio() {
    return cy.get("#caseStyleProposedRadio");
  }
  getScheduleEvent_StyleOfCaseSection_SaveButton() {
    return cy.get("[id^=saveStyleofCaseBtn_");
  }
  getScheduleEvent_CaseJudgeAssignment_JudgePartyType() {
    return cy.get(
      "[id^=assignJudgeForm_] > :nth-child(1) > .dropdown > .btn-group > .dropdown-toggle > .filter-option"
    );
  }
  getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Dropdown() {
    return cy.get("[id^=caseJudgeAssignToggleBtnLabel]");
  }
  getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Manual() {
    return cy.get("[id^=manualJudgeAssignmentType_]");
  }

  getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Button() {
    return cy.get("[data-id^=caseJudgeAssign_]");
  }

  getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_SearchInput() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($elements) => {
        return $elements[14];
      });
  }
  getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_SelectJudgeButton() {
    return cy.get("[id^=selectJudgeBtn_]");
  }

  getScheduleEvent_FutureEvents_label(value) {
    return cy.get("label").contains(value);
  }

  getScheduleEvent_EventDiscription_Button() {
    return cy.get("[data-id^=addEventCaseEventDescription_]").then(($ele) => {
      return $ele[0];
    });
  }

  getScheduleEvent_EventDiscription_Input() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($elements) => {
        return $elements[15];
      });
  }

  getScheduleEvent_EventJudge_Button() {
    return cy.get("button[data-id^=addEventCaseEventJudge]");
  }
  getScheduleEvent_EventDate() {
    return cy.get("[id^=addEventDate_]");
  }
  getScheduleEvent_EventTime() {
    return cy.get("[id^=addEventTime_]");
  }

  getScheduleEvent_Room_Button() {
    return cy.get("[data-id^=schedulingEventRoom_]").then(($ele) => {
      return $ele[0];
    });
  }

  getScheduleEvent_Room_Input() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($elements) => {
        return $elements[19];
      });
  }

  getScheduleEvent_RoomLocation_Text() {
    return cy.get("[id^=schedulingEventLocation_]");
  }

  getScheduleEvent_SaveEvent_Button() {
    return cy.get(".saveEventBtn");
  }

  getScheduleEvent_Close() {
    return cy.get(
      '[aria-describedby="assignJudgeScheduleEventDialog"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > .ui-button'
    );
  }

  getCivilEnterACaseTabCloseIcon(num) {
    return cy.get(".close-tab-btn > .close-tab-span").then(($ele) => {
      if ($ele.length) {
        return $ele[num];
      }
      return $ele;
    });
  }
}
