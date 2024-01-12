/// <reference types="cypress" />
import AgedTrialBalanceReportElements from "./AgedTrialBalancReportElements";

export default class AgedTrialBalanceReportActions {
  constructor() {
    globalThis.agedTrialBalanceReportElements =
      new AgedTrialBalanceReportElements();
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

  selectValueOfCourtLocation(option) {
    globalThis.agedTrialBalanceReportElements
      .courtLocation()
      .select(option, { force: true });
  }

  courtLocationShouldBe(location) {
    globalThis.agedTrialBalanceReportElements
      .courtLocationSelection()
      .should("have.attr", "title", location);
  }

  clickMoreFiltersBtn() {
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

  enterValueIntoDetailCodeField(detailCode) {
    globalThis.agedTrialBalanceReportElements
      .detailCodeField()
      .type(detailCode);
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
  runOrClearButton(type) {
    switch (type) {
      case "Run":
      //break is not called on purpose
      //both Run & Clear call the same action
      case "Clear":
        globalThis.agedTrialBalanceReportElements
          .runOrClearButton(type)
          .click();
        break;
      default:
        throw "clickButton type ('Run'/'Clear') is not valid: " + type;
    }
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

  thePdfShouldBeCalledWith(datatable) {
    globalThis.pdfDataDatble = datatable;

    cy.get("@windowOpen").then((windowOpen) => {
      var args = windowOpen.args[0][0];
      var parms = args.split("?")[1].split("&");

      globalThis.pdfDataDatble.hashes().forEach((elem) => {
        expect(elem["variable"] + "=" + elem["value"]).to.be.oneOf(parms);
      });
    });
  }

  enterValueIntoMyCaseIdSearch(id) {
    globalThis.agedTrialBalanceReportElements.myCaseIdSearch().type(id);
    globalThis.agedTrialBalanceReportElements.myCaseIdSearch().blur();
  }
}
