/// <reference types="cypress" />
import AgedTrialBalanceReportElements from "./AgedTrialBalanceReportElements";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class AgedTrialBalanceReportActions {
  constructor() {
    globalThis.agedTrialBalanceReportElements =
      new AgedTrialBalanceReportElements();
  }

  closeTheTab() {
    this.closeTab();
  }

  closeTab() {
    globalThis.agedTrialBalanceReportElements.closeTabButton().click();
  }

  reportTypeShouldBeSelected(type) {
    switch (type) {
      case "Summary":
      case "Detail":
        globalThis.agedTrialBalanceReportElements
          .reportSummaryOrDetailRadioButton(type.toLowerCase())
          .should("be.checked");
        break;
      default:
        throw "clickReportType type is not valid ('Summary'/'Detail') " + type;
    }
  }

  courtLocationShouldBe(location) {
    globalThis.agedTrialBalanceReportElements
      .courtLocationSelection()
      .should("have.attr", "title", location);
  }

  validUserSetsDefaultCourtLocation() {
    cy.login();
    cy.selectGlobalDataSourceCourt(jsonHandler.getValue("defaults", "court"));
    cy.clickLink("Case Processing");

    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    //setup the default courtlocation
    cy.selectLocationDefaultsFromGear(
      "#sidebar-wrapper > div > ul.menu.bs-docs-sidenav.top-sidenav > li:nth-child(10) > div > span.menu-prefs > button > span",
      jsonHandler.getValue("defaults", "courtLocation")
    );
    cy.wait(["@saveUserNotyMessages"]);
    cy.get(".noty_text").click();
  }

  detailCodeFieldShouldBeEmpty() {
    globalThis.agedTrialBalanceReportElements
      .detailCodeField()
      .should("have.value", "");
  }

  myCaseIdSearchShouldBeEmpty() {
    globalThis.agedTrialBalanceReportElements
      .myCaseIdSearch()
      .should("have.value", "");
  }

  discardProgressButton(yesOrNoValue) {
    switch (yesOrNoValue) {
      case "Yes":
      case "No":
        globalThis.agedTrialBalanceReportElements
          .discardProgressButton(yesOrNoValue.toLowerCase())
          .click();
        break;
      default:
        throw (
          "discardProgressButton ('Yes'/'No') is not valid: " + yesOrNoValue
        );
    }
  }
  validUserSelectsAgedTrialBalanceReport() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.clickMenu("Aged Trial Balance Report");
  }

  clickReportType(type) {
    switch (type) {
      case "Summary":
      case "Detail":
        globalThis.agedTrialBalanceReportElements
          .reportSummaryOrDetailRadioButton(type.toLowerCase())
          .check();
        break;
      default:
        throw "clickReportType type is not valid ('Summary'/'Detail') " + type;
    }
  }
  clickTheRadioButtonForADetailedReport() {
    this.clickReportType("Detail");
  }

  runOrClearButton(type) {
    switch (type) {
      case "Run":
        //this makes the variable windowOpen available
        cy.window().then((win) => {
          cy.stub(win, "open").as("windowOpen");
        });
        break;

      case "Clear":
        break;
      default:
        throw `runOrClearButton has wrong type: ${type}`;
    }

    switch (type) {
      case "Run":
      case "Clear":
        globalThis.agedTrialBalanceReportElements
          .runOrClearButton(type)
          .click();
        break;
      default:
        throw "clickButton type ('Run'/'Clear') is not valid: " + type;
    }
  }

  clickToRunTheReport() {
    this.runOrClearButton("Run");
  }

  validateReportParameters(key) {
    cy.get("@windowOpen").then((windowOpen) => {
      var args = windowOpen.args[0][0];
      //Get all the name/value pairs
      var parms = args.split("?")[1].split("&");
      let data = jsonHandler.getValue("defaults", key);
      for (const [key, value] of Object.entries(data)) {
        expect(`${key}=${value}`).to.be.oneOf(parms);
      }
    });
  }
  reportDisplaysADetailedReportShowingCashAndAccrualForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysADetailedReportShowingCashAndAccrualForTheDefaultLocation"
    );
    this.closeTab();
  }
  openMoreFilters() {
    globalThis.agedTrialBalanceReportElements.moreFiltersButton().click();
  }
  selectValueOfAccountingMethod(option) {
    globalThis.agedTrialBalanceReportElements
      .accountingMethod()
      .select(option, { force: true });
  }

  accountingMethodShouldBe(option) {
    globalThis.agedTrialBalanceReportElements
      .accountingMethodSelected()
      .should("have.attr", "title", option);
  }

  selectCashForTheAccountingMethodField() {
    this.selectValueOfAccountingMethod("Cash");
  }

  reportDisplaysADetailedReportShowingCashMethodForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysADetailedReportShowingCashMethodForTheDefaultLocation"
    );
    this.closeTab();
  }

  enterADetailCodeInTheDetailCodeField() {
    globalThis.agedTrialBalanceReportElements
      .detailCodeField()
      .type(jsonHandler.getValue("defaults", "detailCode"));
  }

  reportDisplaysADetailedReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysADetailedReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation"
    );
    this.closeTab();
  }

  enterACaseIDInTheMyCaseIDSearchField() {
    globalThis.agedTrialBalanceReportElements
      .myCaseIdSearch()
      .type(jsonHandler.getValue("defaults", "caseId"));
    globalThis.agedTrialBalanceReportElements.myCaseIdSearch().blur();
  }

  reportDisplaysADetailedReportShowingCashMethodForASpecificCaseForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysADetailedReportShowingCashMethodForASpecificCaseForTheDefaultLocation"
    );
    this.closeTab();
  }

  selectAccuralForTheAccountingMethodField() {
    this.selectValueOfAccountingMethod("Accrual");
  }

  reportDisplaysADetailedReportShowingAccrualMethodForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysADetailedReportShowingAccrualMethodForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysADetailedReportForAccrualMethodForASpecificDetailCodeForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysADetailedReportForAccrualMethodForASpecificDetailCodeForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysAccrualMethodForASpecificCaseIDForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysAccrualMethodForASpecificCaseIDForTheDefaultLocation"
    );
    this.closeTab();
  }

  selectACourtLocation() {
    globalThis.agedTrialBalanceReportElements
      .courtLocation()
      .select(jsonHandler.getValue("defaults", "courtLocationOther"), {
        force: true,
      });
  }

  reportDisplaysDetailReportForCashAndAndDetailCodeAndCaseIdForTheSelectedCourtLocation() {
    this.validateReportParameters(
      "reportDisplaysDetailReportForCashAndAndDetailCodeAndCaseIdForTheSelectedCourtLocation"
    );
    this.closeTab();
  }

  clickTheRadioButtonForASummaryReport() {
    this.clickReportType("Summary");
  }

  reportDisplaysSummaryReportForSelectedCourtLocation() {
    this.validateReportParameters(
      "reportDisplaysSummaryReportForSelectedCourtLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportShowingCashMethodForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportShowingCashMethodForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportShowingCashMethodForASpecificCaseForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportShowingCashMethodForASpecificCaseForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportShowingAccrualMethodForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportShowingAccrualMethodForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportShowingAccrualMethodForASpecificDetailCodeForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportShowingAccrualMethodForASpecificDetailCodeForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportShowingAccrualForACaseIdForTheDefaultLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportShowingAccrualForACaseIdForTheDefaultLocation"
    );
    this.closeTab();
  }

  reportDisplaysASummaryReportForAccuralAndDetailCodeAndCaseIdForTheSelectedLocation() {
    this.validateReportParameters(
      "reportDisplaysASummaryReportForAccuralAndDetailCodeAndCaseIdForTheSelectedLocation"
    );
    this.closeTab();
  }

  defaultValuesAreSet() {
    this.reportTypeShouldBeSelected("Summary");
    this.courtLocationShouldBe(
      jsonHandler.getValue("defaults", "courtLocationTitle")
    );
    this.accountingMethodShouldBe("Nothing selected");
    this.detailCodeFieldShouldBeEmpty();
    this.myCaseIdSearchShouldBeEmpty();
  }

  clickToClearTheReport() {
    this.runOrClearButton("Clear");
    this.discardProgressButton("Yes");
  }
}
