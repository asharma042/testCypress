/// <reference types="cypress" />

import currentFunction from "current-function";
import jsonHandler from "../../../../fixtures/jsonHandler";
import Utils from "../../../utils/utils";
import ScheduleEventsElements from "./ScheduleEventsElements";

export default class ScheduleEventsActions {
  constructor(tempFileName) {
    if (!tempFileName) {
      throw new Error("missing tempFileName");
    }
    this.tempFileName = tempFileName;
    this.utils = new Utils();
    // console.log(this.utils.formatDate(new Date()) + "darrellTesting-------600")
    this.scheduleEventsElements = new ScheduleEventsElements();
  }

  readRunTimeFile() {
    cy.log(`ScheduleEventsActions.readRunTimeFile ${this.tempFileName}`);
    let that = this;
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        cy.log(
          `DispositionJudgementActions ${JSON.stringify($json.case, null, 2)}`
        );
        cy.wrap($json.case).as("case");
      }
    });
  }

  initialCaseMustBeCreatedWithAtLeaseOnePartyType() {
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
    this.scheduleEventsElements.getSchedulingCaseIdInput().click();
  }

  enterCaseIDInMyCaseIDSearch() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getSchedulingCasesByIdVC*").as("getSchedulingCases");
    cy.intercept("smc-web/getTableSorterAllPrefs*").as("getTableSorter");
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getSchedulingCaseContent*").as(
      "getSchedulingCaseContent"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    cy.get("@case").then(($case) => {
      this.scheduleEventsElements
        .getSchedulingSearchInput()
        .type(`${$case.caseId}{enter}`);
    });

    cy.wait([
      "@getSchedulingCases",
      "@getTableSorter",
      "@getTableSorterPagerHTML",
      "@getSchedulingCaseContent",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@saveUserNotyMessages",
    ]);
  }

  clickMagnifyingGlassIcon() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  casesDisplayInTheCasesSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($case) => {
      this.scheduleEventsElements
        .getCaseIdinCasesSectionLink()
        .should("have.text", $case.caseId);
    });
  }

  clickToExpandCaseInformtion() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // no op
  }

  expandAddEventSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsElements.getAddEventExpandButton().click();
  }

  enterEventDescription(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventDescription = jsonHandler.getValue(scenario, "eventDescription");
    this.scheduleEventsElements
      .getScheduleEvent_EventDiscription_Button()
      .click();

    this.scheduleEventsElements
      .getScheduleEvent_EventDiscription_Input()
      .type(`${eventDescription}{enter}`);
  }

  cREVDisplaysInEventDescriptionField(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventDescription = jsonHandler.getValue(scenario, "eventDescription");
    this.scheduleEventsElements
      .getScheduleEvent_EventDiscription_Button()
      .invoke("prop", "title")
      .should("contain", eventDescription);
  }

  enterEventDate(futureDate) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsElements
      .getAddEvent_EventDate_Input()
      .clear()
      .type(futureDate);
  }

  displaysInDateField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // no op
  }

  enterTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const currentTime = this.utils.getTimeFormatted(new Date());
    this.scheduleEventsElements
      .getAddEvent_Time_Input()
      .clear()
      .type(currentTime);
  }

  displaysInTimeField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // no op
  }

  addToDocketTextBoxIsChecked() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsElements
      .getAddEvent_DocketText_Input()
      .invoke("prop", "checked")
      .should("be.true");
  }

  docketFilingDateDisplaysCurrentDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const currentDate = this.utils.formatDate(new Date());
    this.scheduleEventsElements
      .getAddEvent_DocketFilingDate_Input()
      .invoke("prop", "value")
      .should("eq", currentDate);
  }

  docketTimeDisplaysCurrentTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsElements.getAddEvent_DocketTime_Input().then(($ele) => {
      expect($ele[0].value.match(/\d{2}:\d{2}:\d{2}/).length == 1).to.be.true;
    });
  }

  confirmCheckBoxIsChecked() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsElements
      .getAddEvent_Confirm_Input()
      .invoke("prop", "checked")
      .should("be.true");
  }

  displaysAssignedJudge(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const judgeName = jsonHandler.getValue(scenario, "judgeName");
    let names = judgeName.replace(/\s+/g, " ").trim().split();
    //the names get presented w/ extra spaces
    for (let name = 0; name < names.length; name++) {
      this.scheduleEventsElements
        .getAddEvent_EventJudge_Button()
        .contains(names[name].toUpperCase());
    }
  }

  enterRoom(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let room = jsonHandler.getValue(scenario, "eventRoom");
    this.scheduleEventsElements.getAddEvent_Room_Button().click();

    this.scheduleEventsElements.getAddEvent_Room_Input().type(`${room}{enter}`);
  }

  roomDisplaysLocationForJudge() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  locationDisplaysAKCarter(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const eventLocation = jsonHandler.getValue(scenario, "eventLocation");
    this.scheduleEventsElements
      .getAddEvent_Location_Button()
      .invoke("attr", "title")
      .should("contain", eventLocation);
  }

  clickSaveEventInformationButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("POST", "smc-web/checkExceptionDayAndEventConflict*").as(
      "checkExceptionDayAndEventConflict"
    );

    this.scheduleEventsElements
      .getAddEvent_SaveEventInformation_Button()
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

  notyDisplaysSuccessMessage() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  closeTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.scheduleEventsElements
      .getDispositionAndJudgementCloseTabIcon()
      .click();
  }
}
