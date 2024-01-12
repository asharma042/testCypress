import CriminalCaseElements from "./CriminalCaseElements";
import Utils from "../../../utils/utils";
import currentFunction from "current-function";
export default class CriminalCase {
  constructor() {
    this.criminalCaseElements = new CriminalCaseElements();
    this.utils = new Utils();
  }

  validUserSelectsEnterACase(tempFileName) {
    this.selectCriminalFromLeftSideMenu();

    cy.intercept("POST", "smc-web/enterACase*").as("enterACase");
    cy.intercept("POST", "smc-web/smcFormRequest/newCase*").as("newCase");
    cy.intercept("POST", "smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("POST", "smc-web/getDftPtypTypes*").as("getDftPtypTypes");
    cy.intercept("POST", "smc-web/getCountiresList*").as("getCountiresList");
    cy.intercept("POST", "smc-web/courtLocnCodes*").as("courtLocnCodes");
    cy.intercept("GET", "smc-web/smcFormRequest/smcDateGroup*").as(
      "smcDateGroup"
    );
    cy.intercept("GET", "smc-web/smcFormRequest/newCharge*").as("newCharge");
    cy.intercept("POST", "smc-web/getCriminalCaseTypeListWithProcessRules*").as(
      "getCriminalCaseTypeListWithProcessRules"
    );
    cy.intercept("POST", "smc-web/getStatesByCountry*").as(
      "getStatesByCountry"
    );

    cy.clickMenu("Enter a Case");

    cy.wait(
      [
        "@enterACase",
        "@newCase",
        "@myDefendantSearch",
        "@getDftPtypTypes",
        "@getCountiresList",
        "@smcDateGroup",
        "@newCharge",
        "@getCriminalCaseTypeListWithProcessRules",
        "@getStatesByCountry",
        "@courtLocnCodes",
      ],
      {
        timeout: 90000,
      }
    );
  }
  lastName(lastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.defendantLastName().type(lastName);
  }

  firstName(firstName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.defendantFirstName().type(firstName);
  }

  dlState(dlState) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.defendantDLState().type(dlState);
  }

  dlNumber(dlNumber) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.defendantDLNumber().type(dlNumber);
  }

  expandDemographicsSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.demographicsSection().click();
  }

  dateOfBirth(birthDate) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.dateOfBirth().type(birthDate);
  }

  ssn(ssn) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.ssn().type(ssn);
  }

  setSex(sex) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.sex().select(sex);
  }

  expandAddressSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.addressSection().click();
  }

  streetAddress(street) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.addressSectionStreetAddress().type(street);
  }

  enterCity(city) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.addressSectionCity().type(city);
  }

  enterZipCode(zip) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.addressSectionZip().type(zip);
  }

  saveDefendant() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("POST", "/smc-web/validateDemographics*").as("validateDemo");
    cy.intercept("POST", "/smc-web/validateAddress*").as("validateAddress");
    cy.intercept("POST", "/smc-web/validatePerson*").as("validatePerson");
    cy.intercept("POST", "/smc-web/savePerson*").as("savePerson");
    cy.intercept("POST", "smc-web/selectEntityForUpdate*").as(
      "selectEntityForUpdate"
    );
    cy.intercept("smc-web/saveEnterACaseDemographics*").as(
      "saveEnterACaseDemographics"
    );
    cy.intercept("smc-web/selectEntityForUpdate*").as("selectEntityForUpdate");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages1");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages2");

    this.criminalCaseElements.saveDefendant().click();

    cy.wait(
      [
        "@validateDemo",
        "@validateAddress",
        "@validatePerson",
        "@savePerson",
        "@selectEntityForUpdate",
        "@saveEnterACaseDemographics",
        "@selectEntityForUpdate",
        "@saveUserNotyMessages1",
        "@saveUserNotyMessages2",
      ],
      {
        timeout: 90000,
      }
    );
  }

  allDefendantInfoIsGrayedOut() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.defendantLastName().should("be.disabled");
    this.criminalCaseElements.defendantFirstName().should("be.disabled");
    this.criminalCaseElements.dateOfBirth().should("be.disabled");
    this.criminalCaseElements
      .addressSectionStreetAddress()
      .should("be.disabled");
    this.criminalCaseElements.addressSectionCity().should("be.disabled");
    this.criminalCaseElements.addressSectionZip().should("be.disabled");
  }

  caseDetailsSectionIsNowEnabled() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .caseSectionCaseID()
      .should("be.enabled")
      .should("have.value", "NEXT");
  }

  inTheCaseTabSelectDefaultCourtLocation(courtCode) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.caseSectionCourtLocation().select(courtCode);

    this.criminalCaseElements
      .caseSectionCourtLocation()
      .should("be.enabled")
      .should("have.value", courtCode);
  }

  clickCaseTypeDropDownAndSelectCaseType(caseType) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("[data-id=ctypCode]").click();
    cy.get(
      ":nth-child(3) > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    ).type(`${caseType}`);

    cy.get(
      '[id^=case_] > fieldset > form > div.row > div > div > div > div > div > ul > li:not(".hidden") > a > span.text'
    ).then(($eles) => {
      for (let ele = 0; ele < $eles.length; ele++) {
        if ($eles[ele].textContent.startsWith(caseType)) {
          cy.wrap($eles[ele]).click();
          break;
        }
      }
    });
  }

  enterArrestingAgencyORI(arrestingAgencyORI) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .caseSectionArrestingAgencyORI()
      .type(arrestingAgencyORI);
  }

  enterFilingDate(date) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.caseSectionFilingDate().type(date).blur();

    //hide the calendar popup
    this.criminalCaseElements.caseSectionFilingTime().click();
  }

  clickToAddPAOfRecord() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.addPaOfRecordButton().click();
  }

  clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney(partyType) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_PartyTypeButton()
      .click();
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_PartyTypeInput()
      .type(`${partyType}{enter}`);
  }

  inProsecutingAttorneyTextFieldEnterCodeAndSelectName(
    prosecutingAttorneyCode,
    prosecutingAttorneyName
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //search for value
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_ProsecutingAttorney()
      .type(`${prosecutingAttorneyCode}{enter}`);

    //select the one option
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_ProsecutingAttorneySelection()
      .then(($elem) => {
        $elem.click();
      });

    //confirm it was selected
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_selectedProsecutingAttorneyName()
      //css does capatilize
      .contains(prosecutingAttorneyName, {
        matchCase: false,
      })
      .should("be.visible");
  }

  clickToSaveClose() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_saveAndCloseButton()
      .click();
  }

  partyIsListedInProsecutingAttorneyField(
    prosecutingAttorneyCode,
    prosecutingAttorneyName
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_PartyTable()
      .contains("td", prosecutingAttorneyCode, {
        matchCase: false,
      });

    this.criminalCaseElements
      .addAdditionalPAofRecordPopup_PartyTable()
      .contains("td", prosecutingAttorneyName, {
        matchCase: false,
      });
  }

  clickDocketDestriptionDropDownAndSelectInformationFiled(docketCode) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.addInitialDocketEntry_DocketDescription().click();

    this.criminalCaseElements
      .addInitialDocketEntry_DocketDescriptionInput()
      .type(`${docketCode}{enter}`);
  }

  enterDocketDate(date) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .addInitialDocketEntry_DocketDate()
      .clear()
      .type(`${date}`)
      .realPress("Tab");
  }

  enterDateOfViolation(date) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.criminalCaseElements.countSection_dateOfViolation().scrollIntoView();

    this.criminalCaseElements.countSection_dateOfViolation().scrollIntoView();

    this.criminalCaseElements
      .countSection_dateOfViolation()
      .clear()
      .type(`${date}`)
      .realPress("Tab");
  }

  enterDateOfViolationTimeAs(time) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.criminalCaseElements
      .countSection_timeOfViolation()
      .clear()
      .type(`${time}`)
      .realPress("Tab");
  }

  enterLocation(location) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.countSection_location().clear().type(location);
  }

  focusToLocation() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.countSection_location().focus();
  }

  enter9DigitTicketNumber(ticketNumber) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .countSection_ticketNumber()
      .type(ticketNumber)
      .realPress("Tab");
  }

  inMissouriChargeFieldEnterAndSelectCharge(charge) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .countSection_MissouriCharge()
      .clear()
      .type(`${charge}`)
      .realPress("Tab");
  }

  enter8DigitOCN(ocn) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .countSection_OCN()
      .type(`${ocn}`)
      .realPress("Tab");
  }

  enterDrivingSpeed(speed) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .countSection_drivingSpeed()
      .type(`${speed}`)
      .realPress("Tab");
  }

  enterPostedSpeed(speed) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .countSection_postedSpeed()
      .type(`${speed}`)
      .realPress("Tab");
  }

  clickAddCountButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.countSection_addCountButton().click();
  }
  clickChooseActionButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.countSection_ChooseAction().click();
  }

  /**
   * callBackFunction receives one parameter, the caseId
   * @param {*} callBackFunction
   */
  saveCase(callBackFunction) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("POST", "smc-web/validateCase*").as("validateCase");
    cy.intercept("POST", "smc-web/validateDocketCaseSecurity*").as(
      "validateDocketCaseSecurity"
    );
    cy.intercept("POST", "smc-web/validateChargeInfo*").as(
      "validateChargeInfo"
    );
    cy.intercept("POST", "smc-web/commonCaseIdGenerate*").as(
      "commonCaseIdGenerate"
    );
    cy.intercept("POST", "smc-web/isEnterACaseOOCEligible*").as(
      "isEnterACaseOOCEligible"
    );
    cy.intercept("POST", "smc-web/saveCase*").as("saveCase");
    cy.intercept("POST", "smc-web/saveCharge*").as("saveCharge");
    cy.intercept("POST", "smc-web/saveAdditionalInformation*").as(
      "saveAdditionalInformation"
    );
    cy.intercept("POST", "smc-web/saveCommonDocket*").as("saveCommonDocket");
    cy.intercept("POST", "smc-web/getAssignJudgeDialog*").as(
      "getAssignJudgeDialog"
    );
    cy.intercept("POST", "smc-web/getJudgeMobars*").as("getJudgeMobars");
    cy.intercept("POST", "smc-web/populateJudgePartyTypes*").as(
      "populateJudgePartyTypes"
    );
    cy.intercept("POST", "smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );
    cy.intercept("POST", "smc-web/getCalendarType*").as("getCalendarType");
    cy.intercept("POST", "smc-web/getDocketEntryEventTypes*").as(
      "getDocketEntryEventTypes"
    );
    cy.intercept("POST", "smc-web/getLanguages*").as("getLanguages");
    cy.intercept("POST", "smc-web/getDocketEntryEventRooms*").as(
      "getDocketEntryEventRooms"
    );
    cy.intercept("POST", "smc-web/getAllJudgesAvailable*").as(
      "getAllJudgesAvailable"
    );
    cy.intercept("POST", "smc-web/saveUserNotyMessages*").as(
      "saveUserNotyMessages1"
    );
    cy.intercept("POST", "smc-web/saveUserNotyMessages*").as(
      "saveUserNotyMessages2"
    );
    cy.intercept("POST", "smc-web/saveUserNotyMessages*").as(
      "saveUserNotyMessages3"
    );
    cy.intercept("POST", "smc-web/saveAmendCharge*").as("saveAmendCharge");

    this.criminalCaseElements.countSection_ChooseAction_SaveCase().click();

    cy.wait(
      [
        "@validateCase",
        "@validateDocketCaseSecurity",
        "@validateChargeInfo",
        "@commonCaseIdGenerate",
        "@isEnterACaseOOCEligible",
        "@saveCase", //5
        "@saveCharge",
        "@saveAdditionalInformation",
        "@saveCommonDocket",
        "@getAssignJudgeDialog",
        "@getJudgeMobars",
        "@populateJudgePartyTypes",
        "@myPredefinedTextSearch",
        "@getCalendarType",
        "@getDocketEntryEventTypes",
        "@getLanguages",
        "@getDocketEntryEventRooms",
        "@getAllJudgesAvailable",
        "@saveUserNotyMessages1",
        "@saveUserNotyMessages2",
        "@saveUserNotyMessages3",
        "@saveAmendCharge",
      ],
      {
        timeout: 90000,
      }
    ).then(($response) => {
      //$response is array
      let caseId = $response[5].response.body.id;
      callBackFunction(caseId);
    });
  }

  caseJudgeAssignmentDialogDisplays(caseJudgeAssignment) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.caseJudgeAssignment_title().should("be.visible");
  }

  selectAManualJudge(caseJudgeAssignment) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //make manual selection
    this.criminalCaseElements
      .caseJudgeAssignment_manualJudgeAssignment()
      .click();

    //click the button
    this.criminalCaseElements
      .caseJudgeAssignment_caseJudgeSelectButton()
      .click();

    //select judge
    this.criminalCaseElements
      .caseJudgeAssignment_caseJudgeSelectSearchInput()
      .type(`${caseJudgeAssignment}{enter}`);
  }

  withCaseJudgeEnteredClick() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("POST", "smc-web/validateJudgeAndParty*").as(
      "validateJudgeAndParty"
    );
    cy.intercept("POST", "smc-web/saveAssignJudge*").as("saveAssignJudge");

    this.criminalCaseElements
      .caseJudgeAssignment_saveJudgeAssignmentButton()
      .click();

    cy.wait(["@validateJudgeAndParty", "@saveAssignJudge"]);
  }

  enterFutureEventDateAndTime(date, time) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .caseJudgeAssignment_futureEvents_eventDate()
      .type(date)
      .realPress("Tab");

    this.criminalCaseElements
      .caseJudgeAssignment_futureEvents_eventTime()
      .type(time)
      .realPress("Tab");
  }

  selectEventJudge(caseJudgeAssignment) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .caseJudgeAssignment_futureEvents_eventJudgeButton()
      .click();

    this.criminalCaseElements
      .caseJudgeAssignment_futureEvents_eventJudgeSearchInput()
      .type(`${caseJudgeAssignment}{enter}`);
  }

  selectRoom(judgeEventRoom) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.countSection_Room().click();

    this.criminalCaseElements
      .countSection_RoomInputSearch()
      .type(`${judgeEventRoom}{enter}`);
  }

  saveEvent() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("POST", "smc-web/checkExceptionDayAndEventConflict*").as(
      "checkExceptionDayAndEventConflict"
    );

    this.criminalCaseElements
      .caseJudgeAssignment_futureEvents_saveEventButton()
      .click();

    cy.wait(["@checkExceptionDayAndEventConflict"]).then(($ele) => {
      cy.get("body").then(($ele) => {
        if ($ele.find("#smartAlertBox").length > 0) {
          cy.intercept("smc-web/schedulingAddEvent.do").as(
            "schedulingAddEvent"
          );

          cy.get('[data-id="ok"]').click();

          cy.wait(["@schedulingAddEvent"]);
        }
      });
    });
  }

  closeCriminalCaseTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/deleteTempDocument*").as("deleteTempDocument");
    cy.intercept("smc-web/releaseMaintainPartyLock*").as(
      "releaseMaintainPartyLock"
    );

    //close the tab
    this.criminalCaseElements.getCriminalCaseTabClose().click();

    cy.wait(["@deleteTempDocument", "@releaseMaintainPartyLock"]);
  }

  //Dispose
  selectCriminalFromLeftSideMenu() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickLink("Case Processing");
    cy.clickMenu("Criminal");
  }

  selectCourtDisposition() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    cy.intercept("smc-web/courtLocnCodes*").as("courtLocnCodes");

    cy.clickMenu("Court Disposition");

    cy.wait(["@courtLocnCodes"]);

    cy.wait(500);
    //wait for the selectpicker has chance to display
    //otherwise there is an error - going to fast
    cy.get("#ui-datepicker-div").should("be.visible");
    cy.wait(500);
  }

  selectTheCaseIDRadioButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.caseIdRadio().click();
  }

  inTheMySearchFieldEnterTheCaseIDAndClickTheMagnifyingGlass(caseId) {
    cy.log(
      `inTheMySearchFieldEnterTheCaseIDAndClickTheMagnifyingGlass caseId: ${caseId}`
    );

    cy.intercept("smc-web/getRecentCaseList*").as("getRecentCaseList");
    cy.intercept("smc-web/getCourtDispCasesById*").as("getCourtDispCasesById");

    cy.intercept("smc-web/getSelectPickerSearchStylePreference*").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/chargeDispositionCodes*").as(
      "chargeDispositionCodes"
    );
    cy.intercept("smc-web/getNcicCodes*").as("getNcicCodes");
    cy.intercept("smc-web/getCaseDorRequirements*").as(
      "getCaseDorRequirements"
    );
    cy.intercept("smc-web/validateSpeedCodes*").as("validateSpeedCodes");

    this.criminalCaseElements.caseIdSearchInput().type(`${caseId}{enter}`);

    cy.wait(
      [
        "@getRecentCaseList",
        "@getCourtDispCasesById",
        "@getSelectPickerSearchStylePreference",
        "@chargeDispositionCodes",
        "@getNcicCodes",
        "@getCaseDorRequirements",
        "@validateSpeedCodes",
      ],
      {
        timeout: 90000,
      }
    );

    this.utils.clearNotyMessages();
  }

  theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails(defendant) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .courtDispositionDefendantName()
      .invoke("prop", "innerText")
      .should("contain", defendant.firstName.toUpperCase());

    this.criminalCaseElements
      .courtDispositionDefendantName()
      .invoke("prop", "innerText")
      .should("contain", defendant.lastName.toUpperCase());

    this.criminalCaseElements
      .courtDispositionDefendantSSN()
      .invoke("prop", "innerText")
      .should("contain", defendant.ssn);

    this.criminalCaseElements
      .courtDispositionDefendantDLState()
      .invoke("prop", "innerText")
      .should("contain", defendant.dlState.toUpperCase());

    this.criminalCaseElements
      .courtDispositionDefendantDLNumber()
      .invoke("prop", "innerText")
      .should("contain", defendant.dlNumber);

    this.criminalCaseElements
      .courtDispositionDefendantName()
      .invoke("prop", "isContentEditable")
      .should("eq", false);
  }

  clickCountTab(number) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.countSection_countTab(number).click();
  }

  clickChargeDispositionDropDownAndSelectPlea(plea) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getChargeCodeDefaultSent*").as(
      "getChargeCodeDefaultSent"
    );

    cy.wait(500);

    this.criminalCaseElements.chargeDisposition_Button().scrollIntoView();

    this.criminalCaseElements.chargeDisposition_Button().click();

    this.criminalCaseElements
      .chargeDisposition_InputSearch()
      .type(`${plea}{enter}`);

    cy.wait(["@getChargeCodeDefaultSent"], {
      timeout: 90000,
    });
  }

  clickChargeDispositonDropDownandSelectChargeDispositionValue(
    chargeDisposition
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getChargeDisposition*").as("getChargeDisposition");

    cy.wait(500);

    this.criminalCaseElements.chargeDisposition_Button().scrollIntoView();

    this.criminalCaseElements.chargeDisposition_Button().click();

    this.criminalCaseElements
      .chargeDisposition_InputSearch()
      .type(`${chargeDisposition}{enter}`);

    cy.wait(["@getChargeDisposition"], {
      timeout: 90000,
    });
  }

  clickSaveButtonOnDispositionPage() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    cy.intercept("smc-web/getAllOpenEventsOnCase*").as(
      "getAllOpenEventsOnCase"
    );
    this.criminalCaseElements.chargeDisposition_SaveButton().click();
    cy.wait(["@getAllOpenEventsOnCase"]);
  }

  inCourtDispositionEventClosurePopupBoxClickToSave(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.log(
      `inCourtDispositionEventClosurePopupBoxClickToSave caseId: ${caseId}`
    );

    this.criminalCaseElements
      .chargeDisposition_EventClosurePopup_mark()
      .should("have.text", caseId);

    cy.intercept("smc-web/saveChargeDisposition*").as("saveChargeDisposition");
    cy.intercept("smc-web/getSelectPickerSearchStylePreference*").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/getProgramsForAddProgramDialog*").as(
      "getProgramsForAddProgramDialog"
    );
    cy.intercept("smc-web/chargeDispositionCodes*").as(
      "chargeDispositionCodes"
    );
    cy.intercept("smc-web/getCaseDorRequirements*").as(
      "getCaseDorRequirements"
    );
    cy.intercept("smc-web/validateSpeedCodes*").as("validateSpeedCodes");
    cy.intercept("smc-web/getJudgmentOrdersHolder*").as(
      "getJudgmentOrdersHolder"
    );
    cy.intercept("smc-web/getJudgmentsAndOrdersByCaseId*").as(
      "getJudgmentsAndOrdersByCaseId"
    );

    this.criminalCaseElements
      .chargeDisposition_SaveCourtDispositionEvent()
      .click();

    cy.wait(
      [
        "@saveChargeDisposition",
        "@getSelectPickerSearchStylePreference",
        "@getProgramsForAddProgramDialog",
        "@chargeDispositionCodes",
        "@getCaseDorRequirements",
        "@validateSpeedCodes",
        "@getJudgmentOrdersHolder",
        "@getJudgmentsAndOrdersByCaseId",
      ],
      {
        timeout: 90000,
      }
    );
    this.utils.clearNotyMessages();
  }

  ///////////////////////////////
  // Amended charge window
  ///////////////////////////////
  clickAmendChargeButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.chargeDisposition_AmendCharge_Button().click();
  }

  amendedChargeWindowShouldHaveTitle(title) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .amendedChargeWindow_Title(title)
      .should("be.visible");
  }

  amendedChargeWindow_amendedMissouriCharge(charge) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getChrgCodes*").as("getChrgCodes");

    this.criminalCaseElements
      .amendedChargeWindow_amendedMissouriChargeInput()
      .clear()
      .type(`${charge}{enter}`);

    //have to wait for component to do search
    cy.wait(["@getChrgCodes"]);

    this.criminalCaseElements
      .amendedChargeWindow_amendedMissouriChargeInput()
      .type(`{enter}`);
  }

  amendedChargeWindow_amendedMissouriChargeDescriptionShouldBe(description) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .amendedChargeWindow_amendedMissouriChargeDescription()
      .should("have.value", description);
  }

  amendedChargeWindow_clickSaveButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.amendedChargeWindow_saveButton().click();
  }

  clickTheXNextToCourtDisposition() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.dispositionTab_CloseX().click();
  }

  courtDispositionTabCloses() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.dispositionTab_CloseX().should("not.exist");
  }

  // Sentence
  selectSentenceProgramsFromLeftSideMenu() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickMenu("Sentence & Programs");
  }

  selectCaseIDRadioButtonIfNotAlreadySelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.caseIdRadio().click();
  }

  inTheMySearchFieldEnterTheCaseID(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getCrimMaintenanceCasesById*").as(
      "getCrimMaintenanceCasesById"
    );
    cy.intercept("smc-web/processCourtDispoLock*").as("processCourtDispoLock");
    cy.intercept("smc-web/getCrimMaintenanceCaseContent*").as(
      "getCrimMaintenanceCaseContent"
    );
    cy.intercept("smc-web/getJudgmentOrdersHolder*").as(
      "getJudgmentOrdersHolder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    cy.intercept("smc-web/getJudgmentsAndOrdersByCaseId*").as(
      "getJudgmentsAndOrdersByCaseId"
    );

    this.criminalCaseElements.sentence_mySearchInput().type(`${caseId}{enter}`);

    cy.wait(
      [
        "@getCrimMaintenanceCasesById",
        "@processCourtDispoLock",
        "@getCrimMaintenanceCaseContent",
        "@getJudgmentOrdersHolder",
        "@saveUserNotyMessages",
        "@getJudgmentsAndOrdersByCaseId",
      ],
      {
        timeout: 90000,
      }
    );
  }

  inSentenceSectionClickToAddSentence() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );
    cy.intercept("smc-web/getJudgeMobars*").as("getJudgeMobars");
    cy.intercept("smc-web/getChargeAndSentenceList*").as(
      "getChargeAndSentenceList"
    );
    cy.intercept("smc-web/getProgramsForCase*").as("getProgramsForCase");
    /*
    cy.intercept("smc-web/getProbationClassificationCodes*").as(
      "getProbationClassificationCodes"
    );
    */
    cy.intercept("smc-web/getAddlInfoBySentCode*").as("getAddlInfoBySentCode");
    /*
    cy.intercept("smc-web/getCustomOrgSearchParams*").as(
      "getCustomOrgSearchParams"
    );
    */
    cy.intercept("smc-web/getSchedulingCaseJudge*").as(
      "getSchedulingCaseJudge"
    );

    this.criminalCaseElements.sentence_addSentenceButton().click();

    cy.wait([
      "@myDefendantSearch",
      "@myPredefinedTextSearch",
      "@getJudgeMobars",
      "@getChargeAndSentenceList",
      "@getProgramsForCase",
      //"@getProbationClassificationCodes",
      "@getAddlInfoBySentCode",
      //"@getCustomOrgSearchParams",
      "@getSchedulingCaseJudge",
    ]);
  }

  //Dropdown on top of Add Sentence dialog
  clickAddSentenceCountDropdown() {
    this.criminalCaseElements.sentence_counts_selection_button().click();
  }

  //The option "Select All" in the drop down
  selectAllFromSentenceCountDropdown() {
    this.criminalCaseElements.sentence_counts_selection_select_all().click();
  }

  inFineFieldForCountEnterTESTFineAmount(countNum, fineAmount) {
    cy.log(
      `---------------------------------------------------${currentFunction()} countNum:${countNum} fineAmount:${fineAmount}`
    );
    this.criminalCaseElements
      .sentence_addSentence_count_fine(countNum)
      .type(fineAmount)
      .realPress("Tab");
  }

  clickToSave() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/saveAdditionalCrimSentences*").as(
      "saveAdditionalCrimSentences"
    );
    cy.intercept("smc-web/getCrimMaintenanceCaseContent*").as(
      "getCrimMaintenanceCaseContent"
    );
    cy.intercept("smc-web/getJudgmentOrdersHolder*").as(
      "getJudgmentOrdersHolder"
    );
    cy.intercept("smc-web/getJudgmentsAndOrdersByCaseId*").as(
      "getJudgmentsAndOrdersByCaseId"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.criminalCaseElements.sentence_addSentence_saveButton().click();

    cy.wait(
      [
        "@saveAdditionalCrimSentences",
        "@getCrimMaintenanceCaseContent",
        "@getJudgmentOrdersHolder",
        "@getJudgmentsAndOrdersByCaseId",
        "@saveUserNotyMessages",
      ],
      {
        timeout: 90000,
      }
    );
  }

  boxCloses() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements
      .sentence_addSentence_manageFineSentencesLabel()
      .should("not.exist");
  }
  /**
   * validate the charge is in the table and
   * if the fineAmount is provided, validate it also
   * shows in the table
   * @param {*} charge
   * @param {*} fineAmount
   */
  sentenceRecordIsAddedToTheSentenceSection(charge, fineAmount, numberRows) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.sentence_addedSentence_table().then(($ele) => {
      if (fineAmount) {
        //2 rows per count
        cy.wrap($ele[0])
          .find("tbody")
          .find("tr")
          .should("have.length", numberRows);
        cy.wrap($ele[0]).contains("td", "FINE");
        cy.wrap($ele[0]).contains("td", charge);
        cy.wrap($ele[0]).contains("td", fineAmount);
      } else {
        if (numberRows != "") {
          cy.wrap($ele[0])
            .find("tbody")
            .find("tr")
            .should("have.length", numberRows);
        }
        cy.wrap($ele[0]).contains("td", charge);
      }
    });
  }

  clickTheXNextToCriminalSentencePrograms() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.sentence_closeTab().click();
  }

  criminalSentenceProgramsTabCloses() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.sentence_closeTab().should("not.exist");
  }
  criminalSentanceSISClick() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseElements.sentence_SIS_checkbox().check();
  }
  criminalSentenceProbationDuration(value) {
    this.criminalCaseElements.sentence_probation_duration().type(value);
  }
  criminalSentenceProbationUnit(value) {
    this.criminalCaseElements.sentence_probation_unit().select(value);
  }
}
