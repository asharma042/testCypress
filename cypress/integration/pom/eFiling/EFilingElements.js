/// <reference types="cypress" />

export default class EFilingElements {
  fileNewCaseButton() {
    return cy.get(".fileNewCase > .menuGroup > .menuLabel > a");
  }

  courtLocationDropdown() {
    return cy.get("#location");
  }

  caseCategoryDropdown() {
    return cy.get("#category");
  }

  caseTypeDropdown() {
    return cy.get("#type");
  }

  styleOfCaseInput() {
    return cy.get("#style");
  }

  feeAmountInput() {
    return cy.get("#fee");
  }

  noteToClerkTextArea() {
    return cy.get("#noteToClerk");
  }

  casePageContinueButton() {
    return cy.get("#continue");
  }

  partyTypeDropdown() {
    return cy.get("#partyType");
  }

  firstNameInput() {
    return cy.get("#firstName");
  }

  lastNameInput() {
    return cy.get("#organization");
  }

  middleNameInput() {
    return cy.get("#middleName");
  }

  dateOfBirthInput() {
    return cy.get("#dateOfBirth");
  }

  countryDropDown() {
    return cy.get("#country");
  }

  address1Input() {
    return cy.get("#address1");
  }

  cityInput() {
    return cy.get("#city");
  }

  stateDropdown() {
    return cy.get("#state");
  }
  zipInput() {
    return cy.get("#zip");
  }

  addNewPartyButton() {
    return cy.get("#addNew");
  }

  addFilingOnBehalfOfButton() {
    return cy.get("#addBehalfOf");
  }

  filingOnBehalfOfGreyBoxAnchor() {
    return cy.get(".displayboxheader").then(($ele) => {
      return $ele[0];
    });
  }

  filingOnBehalfOfAllNamedPetitionersPlantiffsCheckbox() {
    return cy.get("#initiating");
  }

  documentCategoryDropdownSelection(num) {
    return cy.get(".filter-option-inner-inner").then(($ele) => {
      return $ele[num];
    });
  }
  documentCategoryDropdownInput() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($elements) => {
        return $elements[1];
      });
  }

  documentLocationChooseFileButton() {
    return cy.get("#documentData");
  }

  documentLocationDocumentTitle() {
    return cy.get("#documentTitle");
  }

  documentLocationDocumentTitleAddButton() {
    return cy.get("#addDoc");
  }

  documentGreyBoxDocumentTitleLink() {
    return cy.get('#displaybox > tbody > :nth-child(2) > [colspan="2"] > a');
  }

  reviewAndFileCaseReviewSection() {
    return cy.get(".caseReview").then(($ele) => {
      return $ele[0];
    });
  }

  reviewAndFilePartyPetitionerSection() {
    return cy.get(':nth-child(7) > [colspan="2"]');
  }

  reviewAndFilePartyRespondentSection() {
    return cy.get(':nth-child(9) > [colspan="2"]');
  }

  reviewAndFileFiledOnBehalfOf() {
    return cy.get(".tdlimited");
  }

  paymentCreditCardRadioButton() {
    return cy.get("#paymentTypeCreditCard");
  }

  paymentCardHolderNameInput() {
    return cy.get("#cardholderName");
  }

  paymentCardNumberInput() {
    return cy.get("#creditCardNumber");
  }

  paymentCvcCodeInput() {
    return cy.get("#creditCardSecurityCode");
  }

  paymentExpirationMonthSelect() {
    return cy.get("#creditCardExpirationMonth");
  }

  paymentExpirationYearSelect() {
    return cy.get("#creditCardExpirationYear");
  }

  paymentSummaryCourtLocation() {
    return cy.get(".paymentData > tbody > :nth-child(2) > :nth-child(1)");
  }

  paymentSummaryFeeAmount() {
    return cy.get(":nth-child(2) > .currency");
  }

  paymentSummaryCardHolderName() {
    return cy.get(
      ':nth-child(6) > [colspan="4"] > table > tbody > :nth-child(1) > :nth-child(2)'
    );
  }

  paymentSummarySubmitButton() {
    return cy.get("#continue");
  }

  efilingConfirmationNumber() {
    return cy.get(".confirmationTable > :nth-child(1) > :nth-child(4) > td");
  }

  efilingConfirmationPaymentNumber() {
    return cy.get(".confirmationTable > :nth-child(1) > :nth-child(7) > td");
  }
  /////////////////////////////////////////////////
  // Case import stuff
  /////////////////////////////////////////////////
  filingLocation() {
    return cy.get("[id^=caseImportSearchByLocn_]");
  }

  getResultsRowExpandIcon() {
    return cy.get(".accordion-toggle");
  }

  getResultsTable() {
    return cy.get(".smcMuniTrfcCaseImportTable");
  }

  getCaseType() {
    return cy.get("[id^=caseTypeCode_]");
  }

  getStyleOfCase() {
    return cy.get("[id^=caseDesc_]");
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

  filingPartyTable() {
    return cy.get("[id^=smcManageFilingParties_]");
  }

  filingPartyTablePartyTypeSelect() {
    return cy.get("[name=filingPartyTypeCode]");
  }

  //Party table
  partyTable() {
    return cy.get(".caseImportPartyTable");
  }

  partyTablePartyName(evenOrOdd) {
    return cy.get(`.${evenOrOdd} > .partyName > span`);
  }

  partyTablePartyStatusButton(evenOrOdd) {
    return cy.get(`.${evenOrOdd} > .party_status > .partyAcceptBtn`);
  }

  partyTablePartyStatusText(evenOrOdd) {
    return cy.get(`.${evenOrOdd} > .party_status`);
  }

  partyTypeSelect() {
    return cy.get("[name=ptypCode]");
  }

  getPartyLastName() {
    return cy.get("#lastName");
  }

  getPartyMiddleName() {
    return cy.get("#mi");
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

  ///////////////////////
  //Docket
  /////////////////////
  docketTab() {
    return cy.get("a[href*='DocketTab']").then(($ele) => {
      return $ele[0];
    });
  }

  docketTable() {
    return cy.get("[id^=caseImportDocketsTable_]");
  }

  docketTableContent(tline, tdname) {
    return cy
      .get(
        `[id^=caseImportDocketsTable_] > tbody > tr:nth-child(${
          tline * 2 + 1
        }) > td.${tdname}`
      )
      .then(($ele) => {
        return $ele[0];
      });
  }

  smartPopUpText() {
    return cy.get("#smartAlertScrollArea");
  }

  smartPopUpYesButton() {
    return cy.get(".smartAlertActive");
  }

  docketTableResultsOpenRow(rowNum) {
    return cy.get(".caseImportDocketRow").then(($ele) => {
      return $ele[rowNum];
    });
  }
  docketSequenceSelect(rowNum) {
    return cy.get(".docketSeqNo").then(($ele) => {
      return $ele[rowNum];
    });
  }

  docketCodeButton(rowNum) {
    return cy.get("[data-id^=docketCode_]").then(($ele) => {
      return $ele[rowNum];
    });
  }

  docketFiledBy(rowNum) {
    return cy.get("[data-id^=docketFiledBy_]").then(($ele) => {
      return $ele[rowNum];
    });
  }

  docketFiledOnBehalfOf(rowNum) {
    return cy.get("[data-id^=docketFiledOnBehalf_]").then(($ele) => {
      return $ele[rowNum];
    });
  }

  docketFiledOnBehalfOfLI(name, type) {
    return cy.get(`span:contains("${name}")`).contains(type);
  }

  docketSearchPredefinedTextArea(row) {
    return cy.get("[id^=preDefinedTextArea_]").then(($ele) => {
      return $ele[row];
    });
  }

  docketDocumentType(row) {
    return cy.get("[name=documentType]").then(($ele) => {
      return $ele[row];
    });
  }

  docketDocumentNumberSelect(row) {
    return cy.get("[name=documentNumberInput]").then(($ele) => {
      return $ele[row];
    });
  }

  docketDocumentTitleInput(row) {
    return cy.get("[name=documentTitleInput]").then(($ele) => {
      return $ele[row];
    });
  }

  docketMainDocumentDiv(row) {
    return cy.get(".mainDocumentDisplay .checkBoxIcon-Y").then(($ele) => {
      return $ele[row];
    });
  }

  docketAttachedToDocketSeqSelect(row) {
    return cy.get("[name=attDocketSeqInput]").then(($ele) => {
      return $ele[row];
    });
  }

  docketSecurity(row) {
    return cy.get("[data-id=documentSecurity]").then(($ele) => {
      return $ele[row];
    });
  }

  ////////////////////
  // Filing Fee
  ///////////////////

  filingFeeTab() {
    return cy.get("a:contains(Filing Fee)");
  }

  filingFeePayType() {
    return cy.get('.col-xs-12 > [align="left"]');
  }

  filingFeeConfirmationNumber() {
    return cy.get("#confirmationNo");
  }
  filingPaidAmount() {
    return cy.get("#paidAmount");
  }
  filingCostAssessmentsTable() {
    return cy.get("[id^=caseImportCostAssessmentsTable_]");
  }
  //////////////////////////////////

  chooseActionButton() {
    return cy.get("[data-id^=processContinuationSelectPicker_]");
  }

  chooseActionLi() {
    return cy.get("[data-original-index=1]:contains(Accept)");
  }

  acceptWindowTitle() {
    return cy.get("#smartAlertTitle");
  }

  acceptWindowYesButton() {
    return cy.get(".smartAlertActive");
  }

  /////////////////////////////////
  // Judge assignment
  /////////////////////
  assignJudgeDialogTitle(row) {
    return cy.get("span.ui-dialog-title").then(($ele) => {
      return $ele[row];
    });
  }
  judgeAssignmentDropdown() {
    return cy.get("[id^=caseJudgeAssignToggleBtnLabel]");
  }

  judgeAssignmentManual() {
    return cy.get("[id^=manualJudgeAssignmentType_]");
  }

  judgeAssignmentJudgeDropdown() {
    return cy
      .get("[id^=caseJudgeAssignDiv_] > div > div.dropdown > div > button")
      .then(($ele) => {
        return $ele[0];
      });
  }

  judgeAssignmentJudgeInput() {
    return cy
      .get(
        "[id^=caseJudgeAssignDiv_] > div > div.dropdown > div > div > div > input"
      )
      .then(($ele) => {
        return $ele[0];
      });
  }

  judgeAssignmentStyleOfCaseProposedInput() {
    return cy.get("[id^=proposedStyleOfCase_]");
  }

  judgeAssignmentStyleOfCaseSaveButton() {
    return cy.get("[id^=saveStyleofCaseBtn_]");
  }

  judgeAssignmentCaseJudgeAssignmentJudgePartyTypeButton() {
    return cy.get("[data-id^=judgePartyType_]");
  }

  saveFilingPopupOkButton() {
    return cy.get(".smartAlertButton");
  }

  saveButton() {
    return cy.get(".saveOeftBtn");
  }

  selectJudgeButton() {
    return cy.get("[id^=selectJudgeBtn_]");
  }

  eventDescription() {
    return cy.get("[data-id^=addEventCaseEventDescription]").then(($ele) => {
      return $ele[0];
    });
  }

  eventDescriptionInput() {
    return cy
      .get(
        "[id^=addEvent_] > div > div > fieldset > form > div:nth-child(1) > div.form-group.col-lg-3.col-md-3.col-sm-6.input-group-xs.smc-input-group-xs.paddingnarrow > div > div > button.btn.dropdown-toggle.btn-default.form-control"
      )
      .then(($ele) => {
        return $ele[0];
      });
  }

  eventDateInput() {
    return cy.get("[id^=addEventDate_]");
  }

  eventTimeInput() {
    return cy.get("[id^=addEventTime_]");
  }

  eventJudge() {
    return cy.get("[id^=addEventCaseEventJudge_]");
  }

  eventRoomDropdown() {
    return cy.get(
      ".container > :nth-child(2) > :nth-child(1) > .dropdown > .btn-group > .dropdown-toggle"
    );
  }

  eventRoomInput() {
    return cy
      .get(
        "[id^=addEvent_] > div > div > fieldset > form > div.container.row.col-xs-12 > div:nth-child(2) > div:nth-child(1) > div > div > div > div > input"
      )
      .then(($ele) => {
        return $ele[0];
      });
  }

  eventRoomLocation() {
    return cy.get("[id^=schedulingEventLocation_]");
  }

  eventRoomButton() {
    return cy.get('[data-id^="schedulingEventRoom_"]');
  }

  noteToFiler() {
    return cy.get(".noteToFiler");
  }

  saveNoteToFilerButton() {
    return cy.get(".saveNoteToFilerBtn");
  }

  saveEventButton() {
    return cy.get(".saveEventBtn");
  }

  closeTab() {
    return cy.get(".close-tab-span");
  }
}
