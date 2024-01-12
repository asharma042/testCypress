import DocketingPilotElements from "./DocketingPilotElements";

export default class AgedTrialBalanceReportActions {
  constructor() {
    globalThis.docketingPilotElements = new DocketingPilotElements();
  }
  enterValueIntoMyCaseIdSearch(id) {
    cy.intercept("POST", "/smc-web/getRecentCaseList*").as("getRecentCaseList");
    cy.intercept("POST", "/smc-web/getAllJudgesAvailable*").as(
      "getAllJudgesAvailable"
    );
    cy.intercept("POST", "/smc-web/getCaseTypeByPredCodeList*").as(
      "getCaseTypeByPredCodeList"
    );
    cy.intercept("POST", "/smc-web/getDocketEntryEventTypes*").as(
      "getDocketEntryEventTypes"
    );
    cy.intercept("POST", "/smc-web/getActiveCourtRoomsAndLocations*").as(
      "getActiveCourtRoomsAndLocations"
    );
    cy.intercept("POST", "/smc-web/getDocketingFilterDefaultsList*").as(
      "getDocketingFilterDefaultsList"
    );
    cy.intercept("POST", "/smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("GET", "/smc-web/smcFormRequest/docketingSearchByCaseId*").as(
      "docketingSearchByCaseId"
    );

    cy.wait([
      "@getRecentCaseList",
      "@getAllJudgesAvailable",
      "@getCaseTypeByPredCodeList",
      "@getDocketEntryEventTypes",
      "@getActiveCourtRoomsAndLocations",
      "@getDocketingFilterDefaultsList",
      "@myDefendantSearch",
      "@docketingSearchByCaseId",
    ]);

    globalThis.docketingPilotElements.myCaseIdSearch().type(id);
    globalThis.docketingPilotElements.myCaseIdSearch().type("{enter}");
  }

  searchResultsCaseIdShouldBe(id) {
    globalThis.docketingPilotElements
      .searchResultCaseId(id)
      .should("be.visible");
  }

  clickTheSearchResultCaseWithValue(id) {
    globalThis.docketingPilotElements.searchResultCaseId(id).click();
  }

  theCaseSummaryWindowShouldAppear(datatable) {
    globalThis.pdfDataDatble = datatable;
    cy.get("@caseSummaryWindowOpen").then((windowOpen) => {
      globalThis.pdfDataDatble.hashes().forEach((elem) => {
        var _class = elem["class"];
        var _value = elem["value"];
        cy.get(_class).contains(_value).should("be.visible");
      });
    });
  }

  caseSummaryCaseNameShouldBeVisible(caseName) {
    globalThis.docketingPilotElements
      .caseSummaryCaseName()
      .contains(caseName)
      .should("be.visible");
  }

  clickCaseSummaryPartiesButton() {
    globalThis.docketingPilotElements.caseSummaryPartiesButton().click();
  }

  caseSummaryPartiesDefendantShouldBeVisible(name) {
    globalThis.docketingPilotElements
      .caseSummaryPartiesDefendant()
      .contains(name)
      .should("be.visible");
  }
  clickCaseSummaryHearingsScheduledButton() {
    globalThis.docketingPilotElements
      .caseSummaryHearingsScheduledButton()
      .click();
  }

  caseSummaryHearingsScheduledShouldBeVisible(title) {
    globalThis.docketingPilotElements
      .caseSummaryHearingsScheduled()
      .contains(title)
      .should("be.visible");
  }

  clickCaseSummaryChargesButton() {
    globalThis.docketingPilotElements.caseSummaryChargesButton().click();
  }

  caseSummaryChargesChargeCodeShouldBeVisible(code) {
    globalThis.docketingPilotElements
      .caseSummaryChargesChargeCode()
      .contains(code)
      .should("be.visible");
  }

  clickCaseSummarySentenceButton() {
    globalThis.docketingPilotElements.caseSummarySentenceButton().click();
  }

  caseSummarySentenceTypeShouldBeVisible(type) {
    globalThis.docketingPilotElements
      .caseSummarySentenceType()
      .contains(type)
      .should("be.visible");
  }

  clickCaseSummaryDocketEntriesButton() {
    globalThis.docketingPilotElements.caseSummaryDocketEntriesButton().click();
  }

  caseSummaryDocketEntriesShouldHaveLengthOf(count) {
    globalThis.docketingPilotElements
      .caseSummaryDocketEntriesTable()
      .find(".row")
      .its("length")
      .should("eq", count);
  }
  ////Financial Summary
  clickSearchResultFinancialCaseSummaryButton() {
    globalThis.docketingPilotElements.searchResultFinancialCaseButton().click();
  }

  financialCaseSummaryWindowShouldAppear(datatable) {
    globalThis.pdfDataDatble = datatable;
    cy.get("@financialCaseSummaryWindowOpen").then((windowOpen) => {
      globalThis.pdfDataDatble.hashes().forEach((elem) => {
        var _class = elem["class"];
        var _value = elem["value"];
        cy.get(_class).contains(_value).should("be.visible");
      });
    });
  }
  financelCaseSummaryCaseNameShouldBeVisible(caseName) {
    globalThis.docketingPilotElements
      .financialSummaryCaseName()
      .contains(caseName)
      .should("be.visible");
  }
}
