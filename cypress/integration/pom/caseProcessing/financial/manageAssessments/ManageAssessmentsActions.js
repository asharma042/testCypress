import ManageAssessmentsElements from "./ManageAssessmentsElements";
import Utils from "../../../../utils/utils";
import currentFunction from "current-function";
export default class CriminalCase {
  constructor() {
    this.manageAssessmentsElements = new ManageAssessmentsElements();
    this.utils = new Utils();
  }

  selectTheCaseIDRadioButtonIfItIsNotAlreadySelected() {
    this.manageAssessmentsElements.financial_mysearch_byCaseId_button().click();
  }

  inTheMyCaseIDSearchFieldEnterTheCaseID(caseId) {
    cy.intercept("smc-web/getCourtLocnDispCasesById*").as(
      "getCourtLocnDispCasesById"
    );
    cy.intercept("smc-web/smcFormRequest/getAssesedCostByCaseId*").as(
      "getAssesedCostByCaseId"
    );
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/getCostAssessmentsOnCase*").as(
      "getCostAssessmentsOnCase"
    );
    cy.intercept("smc-web/getFineAssessmentsOnCaseV2*").as(
      "getFineAssessmentsOnCaseV2"
    );
    cy.intercept("smc-web/getChargeTypeCostDescs*").as(
      "getChargeTypeCostDescs"
    );
    cy.intercept("smc-web/getAllChargesForCase*").as("getAllChargesForCase");
    cy.intercept("smc-web/validateRoleAsSupervisor*").as(
      "validateRoleAsSupervisor"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.manageAssessmentsElements
      .financial_mysearch_input()
      .type(`${caseId}{enter}`);

    cy.wait(
      [
        "@getCourtLocnDispCasesById",
        "@getAssesedCostByCaseId",
        "@myDefendantSearch",
        "@getCostAssessmentsOnCase",
        "@getFineAssessmentsOnCaseV2",
        "@getChargeTypeCostDescs",
        "@getAllChargesForCase",

        "@validateRoleAsSupervisor",
        "@saveUserNotyMessages",
      ],
      {
        timeout: 90000,
      }
    );
  }
  validatePendingCostsDisplayWithADiskNextToTheCostDescription(length) {
    if (length && length > 0) {
      this.manageAssessmentsElements
        .financial_floppyDiskSaveIcon()
        .should("have.length", length);
    }
  }

  validateThetheCourtCostsBalanceDue(balanceDue) {
    this.manageAssessmentsElements
      .court_costs_balance_due()
      .contains(balanceDue);
  }

  validateFineCostsWithADiskNextToFineDescription(length) {
    this.manageAssessmentsElements
      .financial_fine_floppyDiskSaveIcon()
      .should("have.length", length);
  }

  validateFineBalanceDue(fineBalanceDue) {
    this.manageAssessmentsElements.fine_balance_due().contains(fineBalanceDue);
  }

  directlyUnderTheAssessCostsWordsStandardDocketCode(title) {
    if (title) {
      this.manageAssessmentsElements
        .standard_cost_docket_code()
        .contains(title);
    }
  }

  clickTheSaveButton() {
    cy.intercept("smc-web/getFineAssessmentsOnCaseV2").as(
      "getFineAssessmentsOnCaseV2"
    );
    cy.intercept("smc-web/getCostAssessmentsOnCase").as(
      "getCostAssessmentsOnCase"
    );
    cy.intercept("smc-web/validateRoleAsSupervisor").as(
      "validateRoleAsSupervisor"
    );
    cy.intercept("smc-web/saveUserNotyMessages").as("saveUserNotyMessages");

    this.manageAssessmentsElements.save_button().click();

    cy.wait([
      "@getFineAssessmentsOnCaseV2",
      "@getCostAssessmentsOnCase",
      "@validateRoleAsSupervisor",
      "@saveUserNotyMessages",
    ]);

    this.utils.clearNotyMessages();
  }

  theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled() {
    this.manageAssessmentsElements.save_button().should("be.disabled");
    this.manageAssessmentsElements
      .save_and_create_payment_plan_button()
      .should("be.disabled");
  }

  closeTab() {
    this.manageAssessmentsElements.manage_assessments_closeTab().click();
  }

  clickOnFinancialFromTheBusinessProcessMenu(fileName, callback) {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
  }

  selectManageAssessmentsFromTheFinancialMenu() {
    cy.clickMenu("Manage Assessments");
  }

  selectTheAppropriateFinancialLocation(courtCode = "") {
    if (courtCode) {
      cy.get(`[name=locnCode]`).select(courtCode);
    }
  }

  clickToSearchByCaseID() {
    this.manageAssessmentsActions.selectTheCaseIDRadioButtonIfItIsNotAlreadySelected();
  }

  clickTheMagnifyingGlassToSearchForTheCase() {
    //enter key was pressed above
  }

  theCaseDisplaysInTheCasesSection() {
    this.utils.clearNotyMessages();
  }
}
