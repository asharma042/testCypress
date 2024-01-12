/// <reference types="cypress" />

export default class CriminalCaseElements {
  getCriminalCaseTabClose() {
    return cy.get("#smc-case-processing-tabs > ul > li > button");
  }
  getUserName() {
    return cy.get("input[name='username']");
  }

  getPassword() {
    return cy.get("input[name='password']");
  }

  getSubmitButton() {
    return cy.get("input[name=submit]");
  }

  getProcessingTab(value) {
    return cy.get("a:contains(" + value + ")");
  }

  getLeftSideMenu(value) {
    return cy.get(".menu-text").contains(value);
  }

  courtDispositionDefendantInfoDiv() {
    return cy.get(`div[id ^= "courtDispoPrtyInfo_"]`);
  }

  courtDispositionDefendantName() {
    return this.courtDispositionDefendantInfoDiv()
      .find(`div.col`)
      .first()
      .find("strong");
  }

  courtDispositionDefendantSSN() {
    return this.courtDispositionDefendantInfoDiv().find(
      `span.smcMuniTrfcDispositionDemogSsn[id=ssn]`
    );
  }

  courtDispositionDefendantDLState() {
    return this.courtDispositionDefendantInfoDiv().find(
      `span.smcMuniTrfcDispositionPersonStatCodeDriver[id=statCodeDriver]`
    );
  }

  courtDispositionDefendantDLNumber() {
    return this.courtDispositionDefendantInfoDiv().find(
      `span.smcMuniTrfcDispositionPersonDriverLicense[id=driverLicense]`
    );
  }

  defendantLastName() {
    return cy.get("#lastName");
  }

  defendantFirstName() {
    return cy.get("#firstName");
  }

  defendantDLState() {
    return cy.get(`input#statCodeDriver`);
  }

  defendantDLNumber() {
    return cy.get(`input#driverLicense`);
  }

  demographicsSection() {
    return cy.get(".onFocusTriggerValPrev-Demographics");
  }

  dateOfBirth() {
    return cy.get("[id^=birthDate_]");
  }

  ssn() {
    return cy.get(`input#ssn`);
  }

  sex() {
    return cy.get(".smcMuniTrfcCaseEntryDemogSex");
  }

  addressSection() {
    return cy.get(".onFocusTriggerValPrev-Address");
  }

  addressSectionStreetAddress() {
    return cy.get("[id^=streetLine1_]");
  }

  addressSectionCity() {
    return cy.get("#city");
  }

  addressSectionZip() {
    return cy.get("#zip");
  }

  saveDefendant() {
    return cy.get("button").contains("Save Defendant");
  }

  caseSectionCaseID() {
    return cy.get("input[name=id]");
  }

  caseSectionCourtLocation() {
    return cy.get("#locnCode > .form-control");
  }

  caseSectionArrestingAgencyORI() {
    return cy.get("#arrestingAgencyOri");
  }

  caseSectionFilingDate() {
    return cy.get("[id^=initFiling_]");
  }

  caseSectionFilingTime() {
    return cy.get("[id^=chargeTime_]");
  }

  addPaOfRecordButton() {
    return cy.get("#addFilingParty");
  }

  addAdditionalPAofRecordPopup_PartyTypeButton() {
    return cy.get("[data-id^='autoCaseProsecutingAttyPtype_']");
  }

  addAdditionalPAofRecordPopup_PartyTypeInput() {
    return cy.get(
      ".container > :nth-child(1) > :nth-child(1) > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  addAdditionalPAofRecordPopup_ProsecutingAttorney() {
    return cy.get(".autoCaseAddPaPartyDialog  .autoCaseProsecutingAttyMobar");
  }

  addAdditionalPAofRecordPopup_ProsecutingAttorneySelection(option) {
    return cy
      .get("[id^=autoCaseProsecutingAttyMobarDiv_]")
      .find("ul")
      .find("li")
      .first();
  }

  addAdditionalPAofRecordPopup_selectedProsecutingAttorneyName() {
    return cy.get(".autoCaseParty > ul > li");
  }

  addAdditionalPAofRecordPopup_saveAndCloseButton() {
    return cy
      .get(".ui-dialog-buttonpane .ui-dialog-buttonset")
      .last()
      .findByText("Save & Close");
  }

  addAdditionalPAofRecordPopup_Dialog() {
    return cy.get("#autoCaseAddPaPartyDialog");
  }

  addAdditionalPAofRecordPopup_PartyTable() {
    return cy.get("[id^=smcManageFilingParties_]");
  }

  addInitialDocketEntry_DocketDescription() {
    return cy.get("[data-id^='docketCode_']");
  }

  addInitialDocketEntry_DocketDescriptionInput() {
    return cy.get(
      ".col-md-12 > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  countSection_addCountButton() {
    return cy.get('button:contains("New Count")');
  }

  countSection_countTab(number) {
    return cy.get(`a:contains('Count #${number}')`);
  }

  addInitialDocketEntry_DocketDate() {
    return cy.get("[id^=docketDateField_]");
  }

  countSection_dateOfViolation() {
    return cy.get("[id^=violDate_]").filter(":visible");
  }

  countSection_timeOfViolation() {
    return cy.get("[id^=chargeTime_]").filter(":visible");
  }

  countSection_location() {
    return cy.get("[id=loc]").filter(":visible");
  }

  countSection_ticketNumber() {
    return cy.get("[id=ticketNo]").filter(":visible");
  }

  countSection_MissouriCharge() {
    return cy.get("[id=origCharge]").filter(":visible");
  }

  countSection_OCN() {
    return cy.get("[id=ocn]").filter(":visible");
  }

  countSection_drivingSpeed() {
    return cy.get("[id=drivingSpeed]").filter(":visible");
  }

  countSection_postedSpeed() {
    return cy.get("[id=postSpeed]").filter(":visible");
  }

  countSection_Room() {
    //Two buttons w/ same data-id
    return cy.get("[data-id^=schedulingEventRoom_]").first();
  }

  countSection_RoomInputSearch() {
    return cy.get(
      ".addEventForm > .container > :nth-child(2) > :nth-child(1) > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }
  countSection_ChooseAction() {
    return cy.get("[data-id^=processContinuationSelectPicker_]").first();
  }

  countSection_ChooseAction_SaveCase() {
    return cy.get("a:contains('Save Case')").first();
  }

  caseJudgeAssignment_title() {
    return cy.findAllByText("Case Judge Assignment");
  }

  caseJudgeAssignment_manualJudgeAssignment() {
    return cy.get("[id^=manualJudgeAssignmentType_]");
  }

  caseJudgeAssignment_caseJudgeSelectButton() {
    return cy.get("[data-id^=caseJudgeAssign_]");
  }

  caseJudgeAssignment_caseJudgeSelectSearchInput() {
    return cy.get(
      ".col-xs-12.nopadding > :nth-child(1) > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  caseJudgeAssignment_saveJudgeAssignmentButton() {
    return cy.get("[id^=saveAssignJudgeBtn_]");
  }
  caseJudgeAssignment_closeXButton() {
    return cy.get(
      '[aria-describedby="assignJudgeScheduleEventDialog"] > .ui-dialog-titlebar > .ui-button > .ui-button-icon-primary'
    );
  }

  caseJudgeAssignment_futureEvents_eventDate() {
    return cy.get("[id^=addEventDate_]");
  }

  caseJudgeAssignment_futureEvents_eventTime() {
    return cy.get("[id^=addEventTime_]");
  }

  caseJudgeAssignment_futureEvents_eventJudgeButton() {
    return cy.get(
      ".form-group.col-xs-4 > .dropdown > .btn-group > .dropdown-toggle > .filter-option"
    );
  }

  caseJudgeAssignment_futureEvents_eventJudgeSearchInput() {
    return cy.get(
      ".form-group.col-xs-4 > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }
  caseJudgeAssignment_futureEvents_saveEventButton() {
    return cy.get(".saveEventBtn > strong");
  }

  ///////////////////////////////
  ////disposition
  //////////////////////////////
  caseIdRadio() {
    return cy.get("#caseIdRadio");
  }

  caseIdSearchInput() {
    return cy.get("[id^=courtDispSearchById_");
  }

  chargeDisposition_Button() {
    return cy.get("[data-id='chargeDisp']").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        for (var i = 0; i < $ele.length; i++) {
          if ($ele[i].checkVisibility()) {
            return $ele[i];
          }
        }
      }
      return $ele;
    });
  }

  chargeDisposition_InputSearch() {
    return cy
      .get("#chargeDisp > div > div.dropdown-menu.open > div > input")
      .filter(":visible");
  }

  chargeDisposition_AmendCharge_Button() {
    return cy.get("#addAmendChargeButton");
  }

  chargeDisposition_SaveButton() {
    return cy.get(".courtDispositionSaveBtn");
  }

  chargeDisposition_EventClosurePopup_mark() {
    return cy.get("mark");
  }

  chargeDisposition_SaveCourtDispositionEvent() {
    return cy.get(
      '[aria-describedby="closeEventsDialog"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(1) > .ui-button-text'
    );
  }

  dispositionTab_CloseX() {
    return cy.get(".close-tab-span");
  }

  //////////////////////////
  // Amended Charge window
  ////////////////////////
  amendedChargeWindow_Title(title) {
    return cy.get(".ui-dialog-title").contains(title);
  }

  amendedChargeWindow_amendedMissouriChargeInput() {
    // return cy.get('#origCharge');
    return cy.get('input[name="amendCharge"]');
  }

  amendedChargeWindow_amendedMissouriChargeDescription() {
    //return cy.get("#chargeDesc");
    return cy.get('textarea[name="amendChargeDesc"]');
  }

  amendedChargeWindow_saveButton() {
    return cy.get(
      "body > div:nth-child(17) > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(1)"
    );
  }
  ///////////////////////////
  // Add Sentence to Case
  //////////////////////////
  sentence_mySearchInput() {
    return cy.get("[id^=crimMaintenanceSearchById_]");
  }

  sentence_addSentenceButton() {
    return cy.get(".crimSentAddBtn");
  }

  sentence_counts_selection_button() {
    return cy.get("[data-id^='addSentenceCount_']");
  }

  sentence_counts_selection_select_all() {
    return cy.get(".bs-select-all");
  }

  sentence_addSentence_count_fine(countNum) {
    return cy.get("[id^=ccsInsertFineInput_]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        return $ele[countNum];
      }
      return $ele;
    });
  }

  sentence_addSentence_manageFineSentencesLabel() {
    return cy.get(".sectionLabel").contains("Manage Fine Sentences");
  }

  sentence_addSentence_saveButton() {
    return cy.findByRole("button", { name: /Save/i });
  }
  sentence_addedSentence_table() {
    return cy.get(".smcMuniTrfcMaintenanceSentenceTable.sentenceTable");
  }
  sentence_closeTab() {
    return cy.get(".close-tab-span");
  }
  sentence_SIS_checkbox() {
    return cy.get("#ccsInsertSIS");
  }
  sentence_probation_duration() {
    return cy.get("#probDuration");
  }
  sentence_probation_unit() {
    return cy.get("#probDurationUnit");
  }
}
