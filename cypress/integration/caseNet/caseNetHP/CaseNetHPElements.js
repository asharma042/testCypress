/// <reference types="cypress" />

export default class CaseNetHPElements {
  collapseIcon() {
    return cy.get(".fa");
  }

  filingDateSearchSpan() {
    return cy.get("#dateSearchText");
  }

  filingDateSearchHeading() {
    return cy.get(".panel-heading .center");
  }
  dropDownUserIdText() {
    return cy.get(
      "#bs-example-navbar-collapse-1 > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
    );
  }
  dropDownHomeIcon() {
    return cy.get(".glyphicon");
  }
  caseNumberSearchLink() {
    return cy.get("ul > :nth-child(3) > div > a > #caseSearchText");
  }
  caseNumberSearchCourtLocationButton() {
    return cy.get("#cortCode");
  }

  caseNumberSearchCaseNumberInput() {
    return cy.get("#caseNumber");
  }

  caseNumberSearchFindButton() {
    return cy.get("#findButton");
  }

  caseHeaderTitleText() {
    return cy.get(".panel-heading.center");
  }
  validateJudgeCommissionersAssignedText() {
    return cy.get("#caseHeaderDataContainer > :nth-child(2)");
  }
  validatDateFileText() {
    return cy.get("#caseHeaderDataContainer > :nth-child(4)");
  }
  validateLocationText() {
    return cy.get("#caseHeaderDataContainer > :nth-child(6)");
  }
  validateCaseTypeText() {
    return cy.get("#caseHeaderDataContainer > :nth-child(8)");
  }

  validateDispositionText() {
    return cy.get("#caseHeaderDataContainer > :nth-child(10)");
  }
  financialInformationButton() {
    return cy.get(".fa-usd");
  }
  financialInformationPopover() {
    return cy.get("[id^=popover]");
  }

  validateButtonByNumber(num) {
    return cy.get(`#linkSection > :nth-child(${num})`);
  }
}
