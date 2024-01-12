export default class SubsequentCasesElements {
  subsequentCaseCaseIdRadioButton() {
    return cy.get("input#caseIdSubsequentCaseRadio");
  }

  mysubsequentCaseSearchInput() {
    return cy.get('input[id ^= "subsequentCaseEntrySearchByCaseId_"]');
  }

  enterSubsequentCaseInformationCaseTypeButton() {
    return cy.get('button[data-id ^= "subsequentCaseCaseType_"]');
  }

  enterSubsequentCaseInformationCaseTypeInput() {
    return cy.get(
      "div.dropdown-subsequentCaseCaseType > div.dropdown-menu > div.bs-searchbox > input"
    );
  }

  createSubCaseButton() {
    return cy.get('button[id ^= "subsequentCaseSaveBtn_"]');
  }

  enterSubsequentCaseInformationSubsequentCaseId() {
    return cy.get("input.subsequentCaseId");
  }

  closeTabButton() {
    return cy.get(`.close-tab-btn`).eq(-1);
  }
}
