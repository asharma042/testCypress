/// <reference types="cypress" />
export default class CaseImportElements {
  getFilingRefInput() {
    return cy.get("[id^=caseImportSearchByRefNum_]");
  }

  getApplyButton() {
    return cy.get("#caseImportApplyFilterBtn");
  }

  getResultsTable() {
    return cy.get("[data-process-name=caseimportpilot]");
  }

  getTabCloseIcon() {
    return cy.get(".close-tab-span");
  }

  getResultsRowExpandIcon() {
    return cy.get(".accordion-toggle");
  }

  getChooseActionButton() {
    return cy.get("[data-id^=processContinuationSelectPicker_]");
  }

  getChooseActionButtonInput() {
    return cy.get(
      ".col-md-3 > .col-xs-12 > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  chooseActionItemAccept() {
    return cy.get(".active > .opt");
  }

  getCourtLocationButton() {
    return cy.get("#caseFilingLocation");
  }

  getFilingDate() {
    return cy.get("[id^=filingDate_]");
  }

  getFilingTime() {
    return cy.get("[id^=filingTime_]");
  }

  getCaseType() {
    return cy.get("[id^=caseTypeCode_]");
  }

  getMilestone() {
    return cy.get("[data-id^=milestoneCode_]");
  }

  getStyleOfCase() {
    return cy.get("[id^=caseDesc_]");
  }

  getAgency() {
    return cy.get("[id^=arrestingAgencyOri_]");
  }

  getCaseSecurity() {
    return cy.get("#securityDesc");
  }

  getPartyLastName() {
    return cy.get("#lastName");
  }

  getPartyFirstName() {
    return cy.get("#firstName");
  }

  getPartyDateOfBirth() {
    return cy.get("[id^=birthDate_]");
  }

  getPartyStreetAddress() {
    return cy.get("#streetLine1_");
  }

  getPartyCity() {
    return cy.get(".col-lg-2 > #city");
  }

  getPartyZip() {
    return cy.get("#zip");
  }

  getChargeTab() {
    return cy.get("a.ui-tabs-anchor:contains('Charge')");
  }

  getDateOfViolation() {
    return cy.get("[id^=violDate_]");
  }

  getTimeOfViolation() {
    return cy.get("[id^=chargeTime_]");
  }

  getLocation() {
    return cy.get("#loc");
  }

  getTicketNumber() {
    return cy.get("#ticketNo");
  }

  getMissouriCharge() {
    return cy.get("#origCharge");
  }

  getDocketTab() {
    return cy.get("a.ui-tabs-anchor:contains('Docket')");
  }

  getDocketTableExpandIcon() {
    return cy.get(
      "[id^=caseImportDocketsTable_] > :nth-child(2) > .accordion-toggle"
    );
  }

  getDocketSequence() {
    return cy.get("#docketSeqNo");
  }

  getDocketCode() {
    return cy.get("[data-id^=docketCode_]");
  }

  getFiledBy() {
    return cy.get("[data-id^=docketFiledBy_]");
  }

  getDocumentNumber() {
    return cy.get("[name=documentNumberInput]");
  }

  getDocumentTitle() {
    return cy.get("[name=documentTitleInput]");
  }

  getSmartAlertTitle() {
    return cy.get("#smartAlertTitle");
  }

  getSmartAlertYesButton() {
    return cy.get(".smartAlertActive");
  }

  getScheduleJudgeDialogTitle() {
    return cy.get('.ui-dialog-title:contains("Assign Judge")');
  }

  getScheduleJudgeProratedOrManualButton() {
    return cy.get("[id^=caseJudgeAssignToggleBtnLabel]");
  }

  getScheduleJudgeProratedOrManualOptionManual() {
    return cy.get(".caseJudgeAssignManual > .control-label > span");
  }

  getScheduleJudgeAssignmentButton() {
    return cy.get("[data-id^=caseJudgeAssign_]");
  }

  getScheduleJudgeAssignmentInput() {
    return cy
      .get(".input-group > .dropdown > .btn-group > .btn > .filter-option")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[1];
        }
        return $ele[0];
      });
  }

  getScheduleJudgeAssignmentButtonAssignJudgeButton() {
    return cy.get("[id^=assignJudgeBtn_]");
  }

  getScheduleJudgeSelectJudgeButton() {
    return cy.get("[id^=selectJudgeBtn_]");
  }

  getScheduleJudgeEventDescription() {
    return cy.get("[data-id^=addEventCaseEventDescription_");
  }

  getScheduleJudgeEventRoomButton() {
    return cy.get("[data-id^=schedulingEventRoom_]").then(($ele) => {
      return $ele[0];
    });
  }

  getScheduleJudgeEventRoomInput() {
    return cy.get(
      ".container > :nth-child(2) > :nth-child(1) > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  getScheduleJudgeEventRoomLocation() {
    return cy.get("[id^=schedulingEventLocation_]");
  }
  getScheduleJudgeEventDate() {
    return cy.get("[id^=addEventDate_]");
  }

  getScheduleJudgeEventTime() {
    return cy.get("[id^=addEventTime_]");
  }

  getScheduleJudgeEventJudgeButton() {
    return cy.get("[data-id^=addEventCaseEventJudge_]").then(($ele) => {
      return $ele[0];
    });
  }
  getScheduleJudgeEventJudgeInput() {
    return cy.get(
      ".form-group.col-xs-4 > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  getScheduledJudgeEventSaveEventButton() {
    return cy.get(".saveEventBtn");
  }
}
