/// <reference types="cypress" />

export default class SubCaseElements {
  getSearchByCaseIdRadioButton() {
    return cy.get("#caseIdSubsequentCaseRadio");
  }

  getCaseSearchInputField() {
    return cy.get("[id^=subsequentCaseEntrySearchByCaseId_]");
  }

  getVerifyCaseId() {
    return cy.get("[id^=id_]");
  }

  getCaseTypeField() {
    return cy.get("[data-id^=subsequentCaseCaseType_]");
  }

  getCaseTypeInput() {
    return cy.get(".bs-searchbox > .form-control").then(($ele) => {
      if ($ele && $ele.length > 0) {
        return $ele[5];
      }
      return $ele;
    });
  }

  getCreateSubcaseButton() {
    return cy.get("[id^=subsequentCaseSaveBtn_]");
  }

  getCopyPartiesTab() {
    return cy.get("#subCaseCopyParties");
  }

  getPartyNameSelectAllCheckbox() {
    return cy.get(".subcasePartySelectAll");
  }

  getCopyToReviewListButton() {
    return cy.get("[id^=addPartiesToCurrentCaseBtn_]");
  }

  getSavePartiesToSubcaseButton() {
    return cy.get("[id^=savePartiesBtn_]");
  }

  getCopyChargesTab() {
    return cy.get("#subCaseCopyCharges");
  }

  getChargesErrorWindowButton() {
    return cy.get(".smartAlertButton");
  }

  getCopyDocketsTab() {
    return cy.get("#subCaseCopyDockets");
  }

  getDocketSelectAllCheckbox() {
    return cy.get("");
  }

  getDocketCodeToBeCopied() {
    return cy.get(".subcaseDocketEntriesToCopyDisplayTable>tbody>tr");
  }

  getSaveDocketToSubcaseButton() {
    return cy.get("[id^=subcaseSaveDocketBtn_]");
  }

  getYesButtonFromSubcaseAlertWindow() {
    return cy.get('[data-id="ok"]');
  }

  getCloseIcon() {
    return cy.get(".close-tab-span");
  }
}
