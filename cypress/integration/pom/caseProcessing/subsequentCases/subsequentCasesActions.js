/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import currentFunction from "current-function";
import SubsequentCasesElements from "./subsequentCasesElements";

export default class SubsequentCasesActions {
  constructor() {
    this.subsequentCasesElements = new SubsequentCasesElements();
  }

  navigateToSubsequentCasesFromCaseProcessing() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Subsequent Case");
  }

  enterCaseIdIntoMySubsequentCaseSearch(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.subsequentCasesElements.subsequentCaseCaseIdRadioButton().click();
    cy.intercept("smc-web/subcase/getSubcaseSearchByCaseId*").as(
      "getSubcaseSearchByCaseId"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/smcFormRequest/subcaseTabs*").as("subcaseTabs");
    cy.intercept("smc-web/smcFormRequest/subcaseCreate*").as("subcaseCreate");
    cy.intercept("smc-web//subcase/populateCaseTypesForSubcase*").as(
      "populateCaseTypesForSubcase"
    );
    cy.intercept("smc-web/subcase/getFileLocationsByCaseId*").as(
      "getFileLocationsByCaseId"
    );
    cy.intercept("smc-web/subcase/selectArrestingInfoByCaseId*").as(
      "selectArrestingInfoByCaseId"
    );
    cy.intercept("smc-web/subcase/getGeneratedSubCaseId*").as(
      "getGeneratedSubCaseId"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.subsequentCasesElements
      .mysubsequentCaseSearchInput()
      .type(caseId)
      .realPress("Enter");
    cy.wait[
      ("@getSubcaseSearchByCaseId",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@subcaseTabs",
      "@subcaseCreate",
      "@populateCaseTypesForSubcase",
      "@getFileLocationsByCaseId",
      "@getGeneratedSubCaseId",
      "@selectArrestingInfoByCaseId",
      "@saveUserNotyMessages")
    ];
  }

  enterCaseTypeUnderMySubsequentCaseInformationSection(caseType) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.subsequentCasesElements
      .enterSubsequentCaseInformationSubsequentCaseId()
      .click();
    this.subsequentCasesElements
      .enterSubsequentCaseInformationCaseTypeButton()
      .click();
    this.subsequentCasesElements
      .enterSubsequentCaseInformationCaseTypeInput()
      .click();
    this.subsequentCasesElements
      .enterSubsequentCaseInformationCaseTypeInput()
      .type(`${caseType}`)
      .realPress("Enter");
  }

  clickCreateSubCase(callBackFunction) {
    cy.intercept("smc-web/subcase/validateSaveSubCase*").as(
      "validateSaveSubCase"
    );
    cy.intercept("smc-web/subcase/getAdditionalDataPageByCase*").as(
      "getAdditionalDataPageByCase"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.subsequentCasesElements.createSubCaseButton().click();
    cy.wait([
      "@validateSaveSubCase",
      "@getAdditionalDataPageByCase",
      "@saveUserNotyMessages",
    ]);

    this.subsequentCasesElements
      .enterSubsequentCaseInformationSubsequentCaseId()
      .invoke("prop", "value")
      .then((subCaseId) => {
        callBackFunction(subCaseId);
      });
  }

  closeCurrentTab() {
    this.subsequentCasesElements.closeTabButton().click();
  }
}
