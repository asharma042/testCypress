import CivilCaseActions from "./CivilCaseActions";
import AddPartyService from "../financial/parties/civilCaseAddParty/AddPartyService";
import currentFunction from "current-function";
import Utils from "../../../utils/utils";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class CivilCaseService {
  constructor() {
    this.civilCaseActions = new CivilCaseActions();
    this.addPartyService = new AddPartyService();
    this.utils = new Utils();
    this.case = {};
  }

  civilCaseWithLitigantPartyTypes(scenario, fileName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //Create the civil case
    this.createCivilCase(scenario, fileName);
  }

  civilCaseAddParties(scenario, partyCount, fileName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    for (let party = 0; party < partyCount; party++) {
      //Logout
      cy.get("#open-user-info").click({ force: true });
      cy.findByRole("button", { name: /Logout/i }).click();
      this.addTheParty(scenario, party, fileName);
    }
  }
  /**
   * Generic create civil case - most data comes from fixture
   * @param {} scenario
   * @param {*} tempFileName
   */
  createCivilCase(scenario, tempFileName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtLocation = jsonHandler.getValue(scenario, "courtCode");
    let caseType = jsonHandler.getValue(scenario, "caseType");

    let milestone = jsonHandler.getValue(scenario, "milestone");

    let styleOfCase = jsonHandler.getValue(scenario, "styleOfCase");

    let initiating = jsonHandler.getValue(scenario, "initiating");
    let responding = jsonHandler.getValue(scenario, "responding");

    let agency = jsonHandler.getValue(scenario, "agency");
    let agencyValue = jsonHandler.getValue(scenario, "agencyValue");

    let caseSecurity = jsonHandler.getValue(scenario, "caseSecurity");

    let caseSecuritySelected = jsonHandler.getValue(
      scenario,
      "caseSecuritySelected"
    );

    let reason = jsonHandler.getValue(scenario, "reason");

    this.setupCaseInformation(
      courtLocation,
      caseType,
      milestone,
      styleOfCase,
      initiating,
      responding,
      agency,
      agencyValue,
      caseSecurity,
      caseSecuritySelected,
      reason
    );

    //////////////////////////
    // Party Attorney Docket
    //////////////////////////
    let partyDescription = jsonHandler.getValue(scenario, "partyDescription");

    let attorneyMoBar = jsonHandler.getValue(scenario, "attorneyMoBar");

    let attorneyName = jsonHandler.getValue(scenario, "attorneyName");

    let streetAddress = jsonHandler.getValue(scenario, "attorneyStreetAddress");
    let city = jsonHandler.getValue(scenario, "attorneyCity");

    let docketCode = jsonHandler.getValue(scenario, "docketCode");

    let docketSequence = jsonHandler.getValue(scenario, "docketSequence");

    this.setupPartyAttorneyDocket(
      partyDescription,
      attorneyMoBar,
      attorneyName,
      streetAddress,
      city,
      docketCode,
      docketSequence
    );

    let that = this;
    cy.get("@caseId").then(($caseId) => {
      if (!that.case) {
        that.case = {};
      }
      that.case.caseId = $caseId;
      that.case.date = this.utils.formatDate(new Date());
      cy.log(`Civil Case Service writeFile tempFileName: ${tempFileName}`);
      cy.writeFile(tempFileName, {
        case: that.case,
      });
    });

    //////////////////////////
    // Judge Schedule Event
    //////////////////////////

    let judgeMoBar = jsonHandler.getValue(scenario, "judgeMoBar");

    let judgeName = jsonHandler.getValue(scenario, "judgeName");

    let eventDescription = jsonHandler.getValue(scenario, "eventDescription");

    let room = jsonHandler.getValue(scenario, "judgeRoom");
    let roomLocation = jsonHandler.getValue(scenario, "judgeRoomLocation");

    let eventDate = this.utils.getValidDateForSchedulingStartingFromNow(3);

    this.setupJudgeSchedule(
      judgeMoBar,
      judgeName,
      eventDescription,
      eventDate,
      room,
      roomLocation
    );
  }

  addTheParty(scenario, partyCount, tempFileName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let descriptionCode = jsonHandler.getValue(
      scenario,
      "parties",
      partyCount,
      "descriptionCode"
    );

    //the search doesn't work properly, so try this
    let descriptionMeaning = jsonHandler.getValue(
      scenario,
      "parties",
      partyCount,
      "descriptionMeaning"
    );

    let addressType = jsonHandler.getValue(
      scenario,
      "parties",
      partyCount,
      "addressType"
    );

    let street = jsonHandler.getValue(
      scenario,
      "parties",
      partyCount,
      "street"
    );

    let city = jsonHandler.getValue(scenario, "parties", partyCount, "city");

    let state = jsonHandler.getValue(scenario, "parties", partyCount, "state");

    let zip = jsonHandler.getValue(scenario, "parties", partyCount, "zip");

    cy.get("@case").then(($case) => {
      this.addPartyService.addParty(
        tempFileName,
        $case,
        descriptionCode,
        descriptionMeaning,
        partyCount,
        addressType,
        street,
        city,
        state,
        zip
      );
    });
  }

  setupCaseInformation(
    courtLocation,
    caseType,
    milestone,
    styleOfCase,
    initiating,
    responding,
    agency,
    agencyValue,
    caseSecurity,
    caseSecuritySelected,
    reason
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    this.civilCaseActions.selectCivilEnterACaseBusinessProcess();

    //courtLocation
    this.civilCaseActions.enterCourtLocation(courtLocation);

    let today = this.utils.formatDate(new Date());
    this.civilCaseActions.caseFilingDateAndTimeAutoPopulate(today);

    this.civilCaseActions.selectCaseTypeCAFromDropDown(caseType);

    this.civilCaseActions.enterMilestoneAsAppropriate(milestone);

    this.civilCaseActions.enterStyleOfCase(styleOfCase);
    this.civilCaseActions.styleOfCaseInformationDisplaysRequired(styleOfCase);

    this.civilCaseActions.selectInitiatingOrResponding(initiating, responding);
    this.civilCaseActions.checkMarkDisplays(initiating, responding);

    this.civilCaseActions.enterAgency(agency);
    this.civilCaseActions.agencyDisplaysInField(agencyValue);

    this.civilCaseActions.securityLevelAutoDisplaysBasedOnCaseTypeSelected(
      caseSecurity
    );
    this.civilCaseActions.securityLevelDisplaysBasedOnCaseTypeSelected(
      caseSecuritySelected
    );

    this.civilCaseActions.enterAReasonTheCaseSecurityLevelIsChangedFromOriginalDisplay(
      reason
    );
  }

  setupPartyAttorneyDocket(
    partyDescription,
    attorneyMoBar,
    attorneyName,
    streetAddress,
    city,
    docketCode,
    docketSequence
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseActions.enterPartyDescription(partyDescription);

    this.civilCaseActions.enterAttorneyName(attorneyMoBar, attorneyName);

    this.civilCaseActions.attorneyContactInformationAutoFillsFromAttorneyInformationEntered(
      streetAddress,
      city
    );

    this.civilCaseActions.docketCodeDisplaysInDocketDescription(docketCode);
    this.civilCaseActions.singleDocketDisplaysWithCheckedBoxMrkedAndDocketSequenceAs1(
      docketSequence
    );

    this.civilCaseActions.clickCreateNewCaseButtonSelectCreateCaseResetAndSave();
  }

  setupJudgeSchedule(
    judgeMoBar,
    judgeName,
    eventDescription,
    eventDate,
    room,
    roomLocation
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseActions.newCaseTabReplacesTheInitiateCaseWorkTabWithGreenCheckMarkAndNewCaseId();

    this.civilCaseActions.styleOfCaseSectionDisplays();
    this.civilCaseActions.styleOfCaseProposedIndicatorAutoSelected();
    this.civilCaseActions.clickSave();

    this.civilCaseActions.proposedStyleOfCaseNotyDisplays();
    this.civilCaseActions.judgePartyTypeDefaultsToJudge();
    this.civilCaseActions.changeToManual();
    this.civilCaseActions.etnerJudgeName(judgeMoBar);
    this.civilCaseActions.successNotyDisplaysJudgeAdded();

    this.civilCaseActions.listOfFutureEventsSectionDisplays();
    this.civilCaseActions.selectJudgeButton();

    this.civilCaseActions.enterEventDescription(eventDescription);
    this.civilCaseActions.enterEventDate(eventDate);
    this.civilCaseActions.enterTime(this.utils.getTimeFormatted(new Date()));

    this.civilCaseActions.judgeNameAndMoBarDisplays(judgeName, judgeMoBar);
    this.civilCaseActions.enterRoom(room);
    this.civilCaseActions.roomLocationPopulatesBasedOnRoomEntered(roomLocation);
    this.civilCaseActions.clickSaveEvent();
    this.civilCaseActions.notyDisplaysEventInserted();
    this.civilCaseActions.judgescheduleEventWindowCloses();
  }
}
