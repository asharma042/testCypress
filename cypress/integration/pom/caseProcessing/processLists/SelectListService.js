/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import SelectListActions from "./SelectListActions";

export default class SelectListService {
  constructor() {
    this.selectListActions = new SelectListActions();
  }

  selectProcessList(listName) {
    this.selectListActions.clickOnProcessListsFromCaseProcessing();
    this.selectListActions.clickOnSelectListFromMenu();
    this.selectListActions.seachForListByNameandSelect(listName);
  }

  selectAProcess(processName) {
    this.selectListActions.clickSelectAProcessButton();
    this.selectListActions.selectProcessByName(processName);
  }
}
