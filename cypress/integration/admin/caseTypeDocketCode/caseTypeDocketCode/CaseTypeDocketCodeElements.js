/// <reference types="cypress" />

export default class CaseTypeDocketCodeElements {
  getCloseCaseTypeDocketCodeTab() {
    return cy.get(".close-tab-span");
  }
  getCaseTypePredCode() {
    return cy.get("[data-id^=caseType_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getDocketDescription() {
    return cy.get("[data-id^=docketCode_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getProcesses() {
    return cy.get("[data-id^=process_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getStartDate() {
    return cy.get("[id^=startDate_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getAddDocketCodeBtn() {
    return cy.get("[id^=addDocketCodeBtn_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getCaseTypeSearchInput(num) {
    return cy
      .get(
        '[id^=collapseCaseTypeDocketCodeProcessRules_] > .col-xs-12 > .row > :nth-child(1) > .dropdown > .bootstrap-select > .open > .dropdown-menu > [data-original-index="' +
          num +
          '"] > a'
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getDocketDescriptionSearchInput(num) {
    return cy
      .get(
        '[id^=collapseCaseTypeDocketCodeProcessRules_] > .col-xs-12 > .row > :nth-child(2) > .dropdown > .btn-group > .open > .dropdown-menu > [data-original-index="' +
          num +
          '"] > a'
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getProcessesSearchInput(num) {
    return cy
      .get(
        '[id^=collapseCaseTypeDocketCodeProcessRules_] > .col-xs-12 > .row > .smc-input-group-xs > .dropdown > .bootstrap-select > .open > .dropdown-menu > [data-original-index="' +
          num +
          '"] > a'
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getStartDateInput() {
    return cy
      .get(
        "#ui-datepicker-div > .ui-datepicker-calendar > tbody > :nth-child(3) > :nth-child(4) > .ui-state-default"
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getProcessesSelectAll() {
    return cy
      .get(
        "[id^=collapseCaseTypeDocketCodeProcessRules_] > .col-xs-12 > .row > .smc-input-group-xs > .dropdown > .bootstrap-select > .open > .bs-actionsbox > .btn-group > .bs-select-all"
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getCaseTypeFilter() {
    return cy.get("[data-id^=caseTypeFilter_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getDocketCodeFilter() {
    return cy.get("[data-id^=docketCodeFilter_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getProcessFilter() {
    return cy.get("[data-id^=processFilter_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getCaseTypeFilterSearchInput(num) {
    return cy
      .get(
        '[id^=collapseFilterCaseTypeDocketCodeRecord_] > .col-xs-12 > .row > :nth-child(1) > .dropdown > .bootstrap-select > .open > .dropdown-menu > [data-original-index="' +
          num +
          '"] > a'
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getDocketCodeFilterSearchInput(num) {
    return cy
      .get(
        '[id^=collapseFilterCaseTypeDocketCodeRecord_] > .col-xs-12 > .row > :nth-child(2) > .dropdown > .btn-group > .open > .dropdown-menu > [data-original-index="' +
          num +
          '"] > a'
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getProcessFilterSearchInput() {
    return cy
      .get(
        "[id^=collapseFilterCaseTypeDocketCodeRecord_] > .col-xs-12 > .row > .smc-input-group-xs > .dropdown > .bootstrap-select > .open > .bs-actionsbox > .btn-group > .bs-select-all"
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getFilterRecordBtn() {
    return cy.get("[id^=filterCaseTypeDocketCodeRecordBtn_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getUpdateRecordBtn() {
    return cy.get("[id^=updateRecordBtn_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getEditProcesses() {
    return cy.get("[id^=recordProcesses_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getEditProcessDropdown() {
    return cy
      .get("[id^=editProcessDropdown_] > .bootstrap-select > .dropdown-toggle")
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getEditProcessSearchInput(num) {
    return cy
      .get(
        '[id^=editProcessDropdown_] > .bootstrap-select > .open > .dropdown-menu > [data-original-index="' +
          num +
          '"] > a'
      )
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getAcceptProcessEditBtn() {
    return cy
      .get("[id^=submitProcessEdits_] > .editable-button-icon")
      .then(($ele) => {
        if ($ele.length > 0) {
          return $ele[0];
        }
      });
  }

  getAcceptEditBtn() {
    return cy.get(".editable-submit > .editable-button-icon").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getRecordEndDate() {
    return cy.get("[id^=recordEndDate_]").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }

  getEndDateInput() {
    return cy.get("#dateField").then(($ele) => {
      if ($ele.length > 0) {
        return $ele[0];
      }
    });
  }
}
