/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import SelectListElements from "./SelectListElements";

export default class SelectListActions {
  constructor() {
    this.selectListElements = new SelectListElements();
  }

  clickOnProcessListsFromCaseProcessing() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Process List");
  }

  clickOnSelectListFromMenu() {
    cy.clickMenu("Select List");
  }

  seachForListByNameandSelect(listName) {
    this.selectListElements.processListCheckInput(listName).click();
  }

  clickSelectAProcessButton() {
    this.selectListElements.selectAProcessButton().click();
  }

  selectProcessByName(processName) {
    this.selectListElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }
}
