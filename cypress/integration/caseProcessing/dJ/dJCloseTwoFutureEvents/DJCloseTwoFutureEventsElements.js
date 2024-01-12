/// <reference types="cypress" />

export default class DJCloseTwoFutureEventsElements {
  getCloseEventsDialog_div() {
    return cy.get("div[aria-describedby = closeEventsDialog]");
  }

  getCivilDispositionEventClosure_Title() {
    return cy
      .get("div.ui-dialog-titlebar > span")
      .contains("Civil Disposition Event Closure window");
  }

  getEventClosureWindow_Button(buttonName) {
    return this.getCloseEventsDialog_div().find("span").contains(buttonName);
  }

  getEventClosureWindow_CloseEventsTableCourtDispo_TableRows() {
    return cy.get(
      'table[data-process-name = "closeEventsTableCourtDispo"] > tbody > tr'
    );
  }

  getDispositionAndJudgementCloseTabIcon() {
    return cy.get(".close-tab-span");
  }
}
