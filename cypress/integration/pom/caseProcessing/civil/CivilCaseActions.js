/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import CivilCaseElements from "./CivilCaseElements";
import currentFunction from "current-function";

export default class CivilCaseActions {
  constructor(tempCivilCaseFileName) {
    this.utils = new Utils();
    this.civilCaseElements = new CivilCaseElements();
    this.tempCivilCaseFileName = tempCivilCaseFileName;
    this.case = {};
  }

  selectCivilEnterACaseBusinessProcess() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickLink("Case Processing");
    cy.clickMenu("Civil");
    cy.clickMenu("Enter A Case");
  }

  courtLocationMustBeSelectedInCourtFieldInSMC() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
  }

  enterCourtLocation(courtLocation) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getCourtLocation().click();
    this.civilCaseElements.getCourtLocationItem(courtLocation).click();
  }

  dropDownListOfAvailableLocationsBasedOnCourtSelectedInSMCCourtFieldRequired() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
  }

  caseFilingDateAndTimeAutoPopulate(today) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getFilingDate().should("have.value", today);
  }

  autoPopulateToCurrentDateAndTimeRequired() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //don't bother if the time is correct
  }

  selectCaseTypeCAFromDropDown(caseType) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getCaseTypeDropDown().click();
    this.civilCaseElements.getCaseTypeInput().type(`${caseType}{enter}`);
  }

  clickingInFieldDisplaysListOfAvailableCivilCaseTypesRequired() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //already chose above
  }

  enterMilestoneAsAppropriate(milestone) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //The db is hosed on test for Milestone
    let env = Cypress.env("ENV");
    if (env === "test") {
      return;
    }
    if (milestone) {
      throw new Error("missing implementation");
    } else {
      this.civilCaseElements
        .getMileStoneDropdown()
        .should("have.class", "disabled");
    }
  }

  milestonesFieldOnlyActiveOnSpecificCaseType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //validated above
  }

  enterStyleOfCase(styleOfCase) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getStyleOfCaseInput().type(`${styleOfCase}{enter}`);
  }

  styleOfCaseInformationDisplaysRequired(styleOfCase) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getStyleOfCaseInput()
      .should("have.value", styleOfCase.toUpperCase());
  }

  selectInitiatingOrResponding(initiating, responding) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (initiating) {
      this.civilCaseElements.getInitiatingCheckbox().check();
    }
    if (responding) {
      this.civilCaseElements.getRespondingCheckbox().check();
    }
  }

  checkMarkDisplays(initiating, responding) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (initiating) {
      this.civilCaseElements.getInitiatingCheckbox().should("be.checked");
    } else {
      this.civilCaseElements.getInitiatingCheckbox().should("not.be.checked");
    }

    if (responding) {
      this.civilCaseElements.getRespondingCheckbox().should("be.checked");
    } else {
      this.civilCaseElements.getRespondingCheckbox().should("not.be.checked");
    }
  }

  enterAgency(agency) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getArrestingAgencyOriWithIdAndName*").as(
      "getArrestingAgencyOriWithIdAndName"
    );

    this.civilCaseElements.getAgencyInput().type(`${agency}`);

    cy.wait(["@getArrestingAgencyOriWithIdAndName"]);

    this.civilCaseElements.getAgencyInputDropdownSelection().click();
  }

  agencyDisplaysInField(agencyValue) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getAgencyInput().should("have.value", agencyValue);
  }

  securityLevelAutoDisplaysBasedOnCaseTypeSelected(caseSecurity) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (caseSecurity) {
      this.civilCaseElements.getCaseSecuritySelect().select(caseSecurity);
    }
  }

  securityLevelDisplaysBasedOnCaseTypeSelected(caseSecuritySelected) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (caseSecuritySelected) {
      this.civilCaseElements
        .getCaseSecuritySelectedOption()
        .should("have.text", caseSecuritySelected);
    }
  }

  enterAReasonTheCaseSecurityLevelIsChangedFromOriginalDisplay(reason) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (reason) {
      this.civilCaseElements.getReasonInput().type(`${reason}{enter}`);
    }
  }

  defaultsToNo() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //sealed is defaulted
  }

  enterPartyInformatio() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //later
  }

  enterPartyDescription(partyDescription) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getPartyDescriptionSelect().click();
    this.civilCaseElements
      .getPartyDescriptionInput()
      .type(`${partyDescription}{enter}`);
  }

  attorneySearchWillDisplay() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // no op
  }

  enterAttorneyName(attorneyMoBar, attorneyName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getAttorneyMobarDetails*").as(
      "getAttorneyMobarDetails"
    );

    this.civilCaseElements.getAttorneySearchInput().type(`${attorneyMoBar}`);

    cy.wait(["@getAttorneyMobarDetails"]);

    cy.intercept("smc-web/checkAttorneyGoodStanding*").as(
      "checkAttorneyGoodStanding"
    );
    cy.intercept("smc-web/selectEntityForUpdate*").as("selectEntityForUpdate");
    cy.intercept("smc-web/getAddressDetails*").as("getAddressDetails");
    cy.intercept("smc-web/getPartiesEntityAliasDetails*").as(
      "getPartiesEntityAliasDetails"
    );

    this.civilCaseElements.getAttorneySearchInput().type(`{enter}`);

    cy.wait([
      "@checkAttorneyGoodStanding",
      "@selectEntityForUpdate",
      "@getAddressDetails",
      "@getPartiesEntityAliasDetails",
    ]);

    //Validate
    this.civilCaseElements
      .getAttorneySearchInput()
      .should("have.value", attorneyName);
  }

  fieldPopulates() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //this is called for multiple fields to skip
  }

  attorneyContactInformationAutoFillsFromAttorneyInformationEntered(
    streetAddress,
    city
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getContactInformationStreetAddressInput()
      .should(($el) => {
        expect($el.val().trim()).to.equal(streetAddress.toUpperCase());
      });

    this.civilCaseElements.getContactInformationCityInput().should(($el) => {
      expect($el.val().trim()).to.equal(city.toUpperCase());
    });
  }

  docketCodeDisplaysInDocketDescription(docketCode) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getInitialDocketEntry_DocketDescription()
      .contains(docketCode);
  }

  singleDocketDisplaysWithCheckedBoxMrkedAndDocketSequenceAs1(docketSequence) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (docketSequence) {
      this.civilCaseElements
        .getInitialDocketEntry_DocketSequence()
        .should("have.value", docketSequence);
    }
  }

  clickCreateNewCaseButtonSelectCreateCaseReset(fileName) {
    this.clickCreateNewCaseButtonSelectCreateCaseResetAndSave();

    let that = this;
    cy.get("@caseId").then(($caseId) => {
      if (!that.case) {
        that.case = {};
      }
      that.case.caseId = $caseId;
      cy.writeFile(fileName, {
        case: that.case,
      });
    });
  }

  /**
   * the generated caseId is wrapped as @caseId
   */
  clickCreateNewCaseButtonSelectCreateCaseResetAndSave() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/enterCase/generateCaseId*").as("generateCaseId");

    this.civilCaseElements.getInitialDockeyEntry_CreateNewButton().click();

    this.civilCaseElements
      .getInitialDocketEntry_CreateCaseOption("Create Case & Reset")
      .click();

    cy.wait(["@generateCaseId"]).then(($response) => {
      //$response is array
      let $caseId = $response.response.body[0];
      cy.log(`civilCaseActions.caseId ${$caseId}`);
      cy.wrap($caseId).as("caseId");
    });
  }

  /**
   * assumes @caseId is wrapped
   */
  newCaseTabReplacesTheInitiateCaseWorkTabWithGreenCheckMarkAndNewCaseId() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@caseId").then(($caseId) => {
      this.civilCaseElements
        .getScheduleEvent_title($caseId)
        .should("be.visible");
    });
  }

  assignJudgeScheduleEventWindowOpens() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //above statement verifys the title
  }

  styleOfCaseSectionDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_SyleOfCaseSection()
      .contains("Style of case");
  }

  styleOfCaseProposedIndicatorAutoSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_StyleOfCaseSection_ProposedRadio()
      .should("be.checked");
  }

  clickSave() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/validateStyleofCase*").as("validateStyleofCase");
    this.civilCaseElements
      .getScheduleEvent_StyleOfCaseSection_SaveButton()
      .click();
    cy.wait(["@validateStyleofCase"]);
  }

  proposedStyleOfCaseNotyDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  judgePartyTypeDefaultsToJudge() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgePartyType()
      .contains("Judge")
      .should("be.visible");
  }

  changeToManual() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Dropdown()
      .click();

    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Manual()
      .click();
  }

  judgeAssignmentDefaultsToProratedWhenApplicable() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //changed to manual
  }

  etnerJudgeName(judgeMoBar) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Button()
      .click();
    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_SearchInput()
      .type(`${judgeMoBar}{enter}`);
  }

  successNotyDisplaysJudgeAdded() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  selectJudgeButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/saveAssignJudge*").as("saveAssignJudge");
    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_SelectJudgeButton()
      .click();
    cy.wait(["@saveAssignJudge"]);
    this.utils.clearNotyMessages();
  }

  listOfFutureEventsSectionDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_FutureEvents_label("Future Events")
      .should("be.visible");
  }

  thisSectionOnlyPopulatesWhenNonattorneyPartiesAreEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  enterEventDescription(eventDescription) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    //If the judge is already assigned, we need to proceed
    cy.get(".ui-draggable").then(($ele) => {
      if ($ele.length === 5) {
        cy.get(".smartAlertActive").click();
      }
    });

    this.civilCaseElements.getScheduleEvent_EventDiscription_Button().click();

    this.civilCaseElements
      .getScheduleEvent_EventDiscription_Input()
      .type(`${eventDescription}{enter}`);
  }

  displaysInField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  enterEventDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventDate = this.utils.getValidDateForSchedulingStartingFromNow(1);
    this.civilCaseElements.getScheduleEvent_EventDate().type(eventDate);
  }

  dateDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  enterTime(time) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getScheduleEvent_EventTime().type(time);
  }

  timeDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  enterJudgeName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  judgeNameAndMoBarDisplays(judgeName, judgeMoBar) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let names = judgeName.replace(/\s+/g, " ").trim().split();
    //the names get presented w/ extra spaces
    for (let name = 0; name < names.length; name++) {
      this.civilCaseElements
        .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Button()
        .contains(names[name].toUpperCase());
    }

    this.civilCaseElements
      .getScheduleEvent_CaseJudgeAssignment_JudgeAssignment_Button()
      .contains(judgeMoBar);
  }

  enterRoom(room) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getScheduleEvent_Room_Button().click();
    this.civilCaseElements.getScheduleEvent_Room_Input().type(`${room}{enter}`);
  }

  roomDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  roomLocationPopulatesBasedOnRoomEntered(roomLocation) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements
      .getScheduleEvent_RoomLocation_Text()
      .contains(roomLocation);
  }

  clickSaveEvent() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/checkExceptionDayAndEventConflict*").as(
      "checkExceptionDayAndEventConflict"
    );

    this.civilCaseElements.getScheduleEvent_SaveEvent_Button().click();

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

  conflictMessageDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no conflix
  }

  clickYesToProceed() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no need
  }

  notyDisplaysEventInserted() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  judgescheduleEventWindowCloses() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseElements.getCivilEnterACaseTabCloseIcon(1).click();
    this.civilCaseElements.getCivilEnterACaseTabCloseIcon(0).click();
  }

  selectCaseTypeDHFromDropDown() {
    throw new Error("missing implementation");
  }

  securityLevelAutoDisplaysAs1() {
    throw new Error("missing implementation");
  }

  etnerAttorneyName() {
    throw new Error("missing implementation");
  }

  docketCodeAPTDRPetitionFiledDomesticRel() {
    throw new Error("missing implementation");
  }

  sequenceAs1() {
    throw new Error("missing implementation");
  }

  docketCodeFCEDMCertificateOfDissolution() {
    throw new Error("missing implementation");
  }

  sequenceAs2() {
    throw new Error("missing implementation");
  }

  roomEnterDIV1Division13A() {
    throw new Error("missing implementation");
  }
  enterPartyDescriptionAPETAttorneyForPetitioner() {
    throw new Error("missing implementation");
  }
}
