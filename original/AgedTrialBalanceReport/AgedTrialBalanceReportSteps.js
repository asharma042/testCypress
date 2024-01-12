/// <reference types="cypress" />

import {
  And,
  Before,
  Given,
  Then,
  When,
} from "cypress-cucumber-preprocessor/steps";

import AgedTrialBalanceReportActions from "./AgedTrialBalanceReportActions";

const agedTrialBalanceReportActions = new AgedTrialBalanceReportActions();
Before(function () {
  var env = Cypress.env("ENV");

  if (globalThis.agedTrialBalanceReportFixture == null) {
    cy.fixture(
      `caseProcessing/financial/agedTrialBalanceReport/AgedTrialBalanceReportFixture_${env}`
    ).then((dataFixture) => {
      globalThis.agedTrialBalanceReportFixture = dataFixture;
    });
  } else {
    cy.log("globalThis.agedTrialBalanceReportFixture already defined");
  }
});

And("I click the More Filters button", () => {
  agedTrialBalanceReportActions.clickMoreFiltersBtn();
});

And("I select {string} from Court Location", (option) => {
  agedTrialBalanceReportActions.selectValueOfCourtLocation(option);
});

And("I enter {string} into the Detail Code field", (detailCode) => {
  agedTrialBalanceReportActions.enterValueIntoDetailCodeField(detailCode);
});

And("I select {string} from Accounting Method", (option) => {
  agedTrialBalanceReportActions.selectValueOfAccountingMethod(option);
});

And("I click {string} Report Type", (option) => {
  agedTrialBalanceReportActions.clickReportType(option);
});

And("I click the {string} runOrClearButton", (option) => {
  agedTrialBalanceReportActions.runOrClearButton(option);
});

And("I click the {string} discardProgressButton", (option) => {
  agedTrialBalanceReportActions.discardProgressButton(option);
});

And("I enter {string} into My Case Id Search", (id) => {
  agedTrialBalanceReportActions.enterValueIntoMyCaseIdSearch(id);
});

Then("the Report Type {string} should be selected", (option) => {
  agedTrialBalanceReportActions.reportTypeShouldBeSelected(option);
});

Then("the Court Location should be {string}", (courtLocation) => {
  agedTrialBalanceReportActions.courtLocationShouldBe(courtLocation);
});

Then("the Accounting Method should be {string}", (accountingMethod) => {
  agedTrialBalanceReportActions.accountingMethodShouldBe(accountingMethod);
});

Then("the Detail Code should be empty", () => {
  agedTrialBalanceReportActions.detailCodeFieldShouldBeEmpty();
});

Then("the My Case Id Search should be empty", () => {
  agedTrialBalanceReportActions.myCaseIdSearchShouldBeEmpty();
});

Then("I stub the Pdf window", () => {
  //this makes the variable windowOpen available
  cy.window().then((win) => {
    cy.stub(win, "open").as("windowOpen");
  });
});

Then("the Pdf Report should be called with", (datatable) => {
  agedTrialBalanceReportActions.thePdfShouldBeCalledWith(datatable);
});
