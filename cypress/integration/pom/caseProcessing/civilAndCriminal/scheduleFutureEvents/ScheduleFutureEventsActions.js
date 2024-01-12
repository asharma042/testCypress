import ScheduleFutureEventsElements from "./ScheduleFutureEventsElement";
import CivilCaseService from "../../civil/CivilCaseService";
import currentFunction from "current-function";
import Utils from "../../../../utils/utils";
import jsonHandler from "../../../../../fixtures/jsonHandler";

export default class ScheduleFutureEventsActions {
  constructor(fileName) {
    this.civilCaseService = new CivilCaseService();
    this.sfee = new ScheduleFutureEventsElements();
    if (!fileName) {
      throw new Error("missing constructor filename");
    }
    this.tempFileName = fileName;
    this.utils = new Utils();

    this.case = {};
  }
  readRunTimeFile() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    var that = this;
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
        cy.log(
          `ScheduleFutureEventsActions readRunTimeFile ${JSON.stringify($json)}`
        );
      }
    });
  }
  /**
   * Scenario: Schedule Event
   */
  civilOrCriminalCase(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilCaseService.civilCaseWithLitigantPartyTypes(
      scenario,
      this.tempFileName
    );

    this.readRunTimeFile();

    this.civilCaseService.civilCaseAddParties(scenario, 2, this.tempFileName);
  }
  /**
   * Scenario: Continue with Civil or Criminal case
   */
  initialCaseMustBeCreatedWithAtLeaseOnePartyType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.continueWithCivilCaseWithLitigantPartyTypes();
    cy.get("@case").then(($case) => {
      this.case = $case;
    });
  }
  continueWithCivilCaseWithLitigantPartyTypes() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.readRunTimeFile();
    cy.login();
  }
  clickOnCaseProcessing() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickLink("Case Processing");
  }

  clickOnScheduling() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickMenu("Scheduling");
  }

  caseIDRadioButtonIsSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.sfee.getSchedulingCaseIdRadioButton().click();
  }

  enterCaseIDInMyCaseIDSearch() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getSchedulingCasesByIdVC*").as(
      "getSchedulingCasesByIdVC"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/getSchedulingCaseJudge*").as(
      "getSchedulingCaseJudge"
    );
    cy.intercept("smc-web/schedulingGetDisplayPreferences*").as(
      "schedulingGetDisplayPreferences"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    let that = this;
    cy.get("@case").then(($case) => {
      that.case = $case;
      that.sfee.getSchedulingSearchInput().type(`${that.case.caseId}{enter}`);
    });

    cy.wait([
      "@getSchedulingCasesByIdVC",
      "@getTableSorterAllPrefs",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@getSchedulingCaseJudge",
      "@schedulingGetDisplayPreferences",
      "@saveUserNotyMessages",
    ]).then(() => {
      this.utils.clearNotyMessages();
    });
  }

  clickMagnifyingGlassIcon() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op - used enter above
  }

  casesDisplayInTheCasesSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let that = this;
    this.sfee.getSearchResultsTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);
      cy.wrap($ele[0]).contains("td", that.case.caseId).should("be.visible");
      cy.wrap($ele[0])
        .contains("td", that.case.parties[0].lastName.toUpperCase())
        .should("be.visible");
      cy.wrap($ele[0]).contains(
        "td",
        that.case.parties[1].lastName.toUpperCase()
      );
      //not visible on smaller screens
    });
  }

  clickToExpandCaseInformtion() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op - opened by default
  }

  expandAddEventSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getCalendarType*").as("getCalendarType");
    cy.intercept("smc-web/getEventsCodesWithCaseTypes*").as(
      "getEventsCodesWithCaseTypes"
    );
    cy.intercept("smc-web/getRelatedCases*").as("getRelatedCases");
    cy.intercept("smc-web/getActiveCourtRoomsAndLocations*").as(
      "getActiveCourtRoomsAndLocations"
    );
    cy.intercept("smc-web/getDefendantLanguage*").as("getDefendantLanguage");
    cy.intercept("smc-web/getAllJudgesAvailable*").as("getAllJudgesAvailable");
    cy.intercept("smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );

    this.sfee.getAddEventSectionOpenIcon().click();

    cy.wait([
      "@getCalendarType",
      "@getEventsCodesWithCaseTypes",
      "@getRelatedCases",
      "@getActiveCourtRoomsAndLocations",
      "@getDefendantLanguage",
      "@getAllJudgesAvailable",
      "@myPredefinedTextSearch",
    ]);
  }

  enterEventDescription(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.sfee.getAddEventSectionEventDescriptionButton().click();

    let eventDescription = jsonHandler.getValue(scenario, "events")[0][
      "eventDescription"
    ];

    this.sfee
      .getAddEventSectionEventDescriptionInput(6)
      .type(`${eventDescription}{enter}`);
  }

  cREVDisplaysInEventDescriptionField(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventDescription = jsonHandler.getValue(scenario, "events")[0][
      "eventDescription"
    ];
    this.sfee
      .getAddEventSectionEventDescriptionButton()
      .contains(eventDescription)
      .should("be.visible");
  }

  enterEventDate(daysFromNow) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let date = this.utils.getValidDateForSchedulingStartingFromNow(daysFromNow);
    this.sfee.getAddEventSectionEventDate().clear().type(`${date}{enter}`);
  }

  displaysInDateField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let date = this.utils.getValidDateForSchedulingStartingFromNow(7);
    this.sfee.getAddEventSectionEventDate().clear().type(date);
    this.sfee.getAddEventSectionEventDate().then(($ele) => {
      expect($ele.val() === date).to.be.true;
    });
  }

  enterTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op - just take the default time
  }

  displaysInTimeField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.sfee.getAddEventSectionTime().click();
    this.sfee.getAddEventSectionTime().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  addToDocketTextBoxIsChecked() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.sfee.getAddEventSectionAddToDocketCheckbox().then(($ele) => {
      expect($ele.val() === "on").to.be.true;
    });
  }

  docketFilingDateDisplaysCurrentDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let today = this.utils.formatDate(new Date());
    this.sfee.getAddEventSectionDocketFilingDate().then(($ele) => {
      expect($ele.val() === today).to.be.true;
    });
  }

  docketTimeDisplaysCurrentTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.sfee.getAddEventSectionDocketTime().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  confirmCheckBoxIsChecked() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.sfee.getAddEventSectionConfirmCheckbox().then(($ele) => {
      expect($ele.val() === "on").to.be.true;
    });
  }

  displaysAssignedJudge(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let judgeMoBar = jsonHandler.getValue(scenario, "judgeMoBar");
    let judgeName = jsonHandler.getValue(scenario, "judgeName");

    this.sfee
      .getAddEventSectionJudgeButton(0)
      .contains(judgeMoBar)
      .should("be.visible");

    this.sfee
      .getAddEventSectionJudgeButton(0)
      .contains(judgeName)
      .should("be.visible");
  }

  enterRoom(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let room = jsonHandler.getValue(scenario, "addEventJudgeRoom");
    this.sfee.getScheduleEvent_Room_Button().click();
    this.sfee.getScheduleEvent_Room_Input(10).type(`${room}{enter}`);
  }

  roomDisplaysLocationForJudge(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let room = jsonHandler.getValue(scenario, "addEventJudgeRoom");
    this.sfee
      .getScheduleEvent_Room_Button()
      .contains(room, { matchCase: false })
      .should("be.visible");
  }

  locationDisplaysAKCarter(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let location = jsonHandler.getValue(scenario, "addEventJudgeRoomLocation");
    this.sfee
      .getScheduleEvent_locationButton()
      .contains(location)
      .should("be.visible");
  }

  clickSaveEventInformationButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/checkExceptionDayAndEventConflict*").as(
      "checkExceptionDayAndEventConflict"
    );

    this.sfee.getScheduleEvent_SaveEventInformationButton().click();

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

  notyDisplaysSuccessMessage() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
    this.sfee.getCloseTabIcon().click();
  }
}
