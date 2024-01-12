/// <reference types="cypress" />

export default class SelectListElements {
  constructor() {}

  selectProcessListTable() {
    return cy.get("table[data-process-name=listProcessingResult] > tbody");
  }

  processListCheckInput(listName) {
    return this.selectProcessListTable()
      .find("div")
      .contains(listName)
      .parents("tr")
      .find("input.processListCheck");
  }

  selectBusinessProcessDiv() {
    return cy.get('div[id ^= "selectBusinessProcessDropDownSection_"]');
  }

  selectAProcessButton() {
    return this.selectBusinessProcessDiv().find(
      'button[title="Select a Process"]'
    );
  }

  selectAProcessDropdownSearchBoxInput() {
    return this.selectBusinessProcessDiv().find("div.bs-searchbox > input");
  }
}
