/// <reference types="cypress" />

export default class ManageAssessmentsElements {
  financial_mysearch_byCaseId_button() {
    return cy.get("[id^=finCaseIdRadio_]");
  }

  financial_mysearch_input() {
    return cy.get("[id^=finCostCaseId-]");
  }

  standard_cost_docket_code() {
    return cy.get("[data-id^='standardCostSelect-']");
  }

  court_costs_balance_due() {
    return cy.get(".courtCostsBalanceDue");
  }

  fine_balance_due() {
    return cy.get(".fineBalanceDueTotal");
  }

  financial_floppyDiskSaveIcon() {
    return cy.get(".smcMuniTrfcCostAssdCostDesc > .floppySaveIcon");
  }

  financial_fine_floppyDiskSaveIcon() {
    return cy.get('[style="display: inline-block;"] > .floppySaveIcon > .fa');
  }

  save_button() {
    return cy.get(".manageAssessmsntSaveBtn");
  }

  save_and_create_payment_plan_button() {
    return cy.get(".manageAssessmsntSaveCreatePlanBtn");
  }

  manage_assessments_closeTab() {
    return cy.get(".close-tab-span");
  }
}
