/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import ArrestQueryHappyPathElements from "./ArrestQueryHappyPathElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import ManageCaseDetailsService from "../../../pom/caseProcessing/manageCaseDetails/ManageCaseDetailsService";
import ScheduleEventsService from "../../../pom/caseProcessing/scheduling/ScheduleEventsService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class ArrestQueryHappyPathActions {
  constructor() {
    this.utils = new Utils();
    this.scenario = "scenario1";
    this.arrestQueryElements = new ArrestQueryHappyPathElements();
    this.tempDefendentFileName =
      "cypress\\temp\\arrestQueryHappyPathDefendant.json";
    this.criminalCaseService = new CriminalCaseService();
    this.manageCaseDetailsService = new ManageCaseDetailsService();
    this.scheduleService = new ScheduleEventsService(
      this.tempDefendentFileName
    );
  }

  readRunTimeFile() {
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempDefendentFileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }
  /**
   * Scenario: Add Event to Arrest records
   */
  casesWithArrestReportInformation() {
    const defendant = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      this.scenario,
      defendant,
      this.tempDefendentFileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
    this.readRunTimeFile();
    cy.get("@defendant").then(($def) => {
      this.manageCaseDetailsService.addArrestRecordToaCaseAndClose(
        $def.caseId,
        $def.lastName
      );
    });
  }

  clickOnCivilFromCaseProcessing() {
    cy.login();
    cy.clickLink("Case Processing");
  }

  clickOnInquiries() {
    cy.clickMenu("Inquiries");
  }

  clickOnArrestQuery() {
    cy.clickMenu("Arrest Query");
  }

  arrestQueryWorkTabDisplays() {
    this.arrestQueryElements.arrestQueryDiv().should("be.visible");
  }

  enterArrestReportInArrestReportField() {
    const arrestReport = jsonHandler.getValue("defaults", "arrestReport");
    this.arrestQueryElements
      .arrestQueryArrestReportInput()
      .type(`{enter}${arrestReport}`);
    cy.get("@defendant").then(($def) => {
      this.arrestQueryElements
        .arrestQueryCaseIdInput()
        .type(`${$def.caseId}{enter}`);
    });
  }

  displaysInField() {
    // no op
  }

  runArrestQueryButtonBecomesActive() {
    this.arrestQueryElements
      .arrestQyeryRunArrestReportButton()
      .should("be.enabled");
  }

  clickRunArrestQueryButton() {
    cy.intercept("smc-web/selectArrestQueryBySearchCriteria*").as(
      "selectArrestQueryBySearchCriteria"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/smcFormRequest/tableSorterColOrderAndVisDialog*").as(
      "tableSorterColOrderAndVisDialog"
    );
    this.arrestQueryElements.arrestQyeryRunArrestReportButton().click();
    cy.wait[
      ("@selectArrestQueryBySearchCriteria",
      "@getTableSorterPagerHTML",
      "@tableSorterColOrderAndVisDialog")
    ];
  }

  searchResultsDisplay() {
    this.arrestQueryElements
      .arrestQuerySearchResultsTable()
      .invoke("prop", "childElementCount")
      .should("be.greaterThan", 0);
  }

  clickCheckBoxNextToPartyInformation() {
    cy.get("@defendant").then(($def) => {
      this.arrestQueryElements
        .arrestQuerySearchResultsTable()
        .contains($def.caseId)
        .parents("tr")
        .find("input.arrestQuerySearchCheck")
        .invoke("prop", "checked")
        .should("be.true");
    });
  }

  checkMarkDisplays() {
    // no op
  }

  clickProcessContinuationButton() {
    this.arrestQueryElements.arrestQueryProcessContinuationButton().click();
  }

  listOfAvailableProcessesDisplays() {
    // no op
  }

  selectAddEvent() {
    cy.intercept("smc-web/resources/js/scheduling/smc.schedulingVC*").as(
      "smcschedulingVC"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getSchedulingCaseContent*").as(
      "getSchedulingCaseContent"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.arrestQueryElements
      .arrestQueryProcessContinuationSearchBox()
      .type("Add Event{enter}");
    cy.wait([
      "@smcschedulingVC",
      "@getTableSorterPagerHTML",
      "@getSchedulingCaseContent",
      "@saveUserNotyMessages",
    ]);
  }

  addEventProcessContinuationOpens() {
    this.arrestQueryElements.arrestQueryToSchedulingDiv().should("exist");
  }

  addFutureEvent() {
    const futureDate = this.utils.getValidDateForSchedulingStartingFromNow(
      this.utils.generateRandomNumberBetween(5, 10)
    );
    this.scheduleService.addFutureEventToACase(this.scenario, futureDate);
  }

  clickReturnToInitiatingTabButton() {
    this.arrestQueryElements
      .arrestQueryToSchedulingReturnToInitiatingTabButton()
      .click()
      .then(() => {
        cy.wait(1000);
      });
  }

  addEventWindowClosesAndDisplaysArrestQueryWorkTab() {
    this.arrestQueryElements.closeTabIcon().click();
  }
}
