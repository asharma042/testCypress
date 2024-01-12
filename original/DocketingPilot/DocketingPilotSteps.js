/// <reference types="cypress" />

import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

import DocketingPilotActions from "./DocketingPilotActions";

const docketingPilotActions = new DocketingPilotActions();

And("I enter {string} into My Case Id Search", (id) => {
  docketingPilotActions.enterValueIntoMyCaseIdSearch(id);
});

Then("search result Case Id should have value {string}", (id) => {
  docketingPilotActions.searchResultsCaseIdShouldBe(id);
});

And("I click the search result Case Id with value {string}", (id) => {
  docketingPilotActions.clickTheSearchResultCaseWithValue(id);
  cy.get("@caseSummaryWindowOpen").then((window) => {
    var args = window.args[0][0];
    var host = Cypress.env("host");
    var url = host + args.slice(1); //remove leading "/"
    cy.visit(url);
  });
});

//// Case Summary
Given("I prepare for a Case Summary window", () => {
  cy.window().then((win) => {
    cy.stub(win, "open").as("caseSummaryWindowOpen");
  });
});

Then("the Case Summary window should appear", (datatable) => {
  docketingPilotActions.theCaseSummaryWindowShouldAppear(datatable);
});

And("the Case Summary case name {string} should be visible", (caseName) => {
  docketingPilotActions.caseSummaryCaseNameShouldBeVisible(caseName);
});

Then("I click the Case Summary Parties button", () => {
  docketingPilotActions.clickCaseSummaryPartiesButton();
});

And("the Case Summary Parties defendant {string} should be visible", (name) => {
  docketingPilotActions.caseSummaryPartiesDefendantShouldBeVisible(name);
});
Then("I click the Case Summary Hearings Scheduled button", () => {
  docketingPilotActions.clickCaseSummaryHearingsScheduledButton();
});

Then(
  "the Case Summary Hearings scheduled {string} should be visible",
  (title) => {
    docketingPilotActions.caseSummaryHearingsScheduledShouldBeVisible(title);
  }
);

And("I click the Case Summary Charges button", () => {
  docketingPilotActions.clickCaseSummaryChargesButton();
});

Then(
  "the Case Summary Charges Charge Code {string} should be visible",
  (code) => {
    docketingPilotActions.caseSummaryChargesChargeCodeShouldBeVisible(code);
  }
);

And("I click the Case Summary Sentence button", () => {
  docketingPilotActions.clickCaseSummarySentenceButton();
});

Then("the Case Summary Sentence type {string} should be visible", (type) => {
  docketingPilotActions.caseSummarySentenceTypeShouldBeVisible(type);
});

And("I click the Case Summary Docket Entries button", () => {
  docketingPilotActions.clickCaseSummaryDocketEntriesButton();
});

Then(
  "the Case Summary Docket Entries table should have {int} rows",
  (count) => {
    docketingPilotActions.caseSummaryDocketEntriesShouldHaveLengthOf(count);
  }
);

//// Financial Summary
Given("I prepare for a Financial Case Summary window", () => {
  cy.window().then((win) => {
    cy.stub(win, "open").as("financialCaseSummaryWindowOpen");
  });
});

Given("I click the search result Financial Case Summary button", () => {
  docketingPilotActions.clickSearchResultFinancialCaseSummaryButton();
  cy.get("@financialCaseSummaryWindowOpen").then((window) => {
    var args = window.args[0][0];
    var host = Cypress.env("host");
    var url = host + args.slice(1); //remove leading "/"
    cy.visit(url);
  });
});

Then("the Financial Case Summary window should appear", (datatable) => {
  docketingPilotActions.financialCaseSummaryWindowShouldAppear(datatable);
});

And(
  "the Financial Case Summary case name {string} should be visible",
  (caseName) => {
    docketingPilotActions.financelCaseSummaryCaseNameShouldBeVisible(caseName);
  }
);
