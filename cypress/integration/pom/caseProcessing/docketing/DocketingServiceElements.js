/// <reference types="cypress" />

export default class DocketingServiceElements {
  getSearchByCaseIdRadioButton() {
    return cy.get("#caseIdDocketRadio");
  }

  getSearchInputField() {
    return cy.get("[id^=docketEntrySearchByCaseId_]");
  }

  getResultsTable() {
    return cy.get("[data-process-name=docketingVCCaseResult]");
  }

  getCloseIcon() {
    return cy.get(".close-tab-span");
  }

  getAddDocketEntrySectionExpandIcon() {
    return cy.get(".addDocketsAccordionHeader > .glyphicon");
  }

  getExpandDocketDescriptionField() {
    return cy.get("[data-id^=docketCode_]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        return $ele[0];
      }
      return $ele;
    });
  }

  getExpandDocketDescriptionSearchInput() {
    return cy
      .get(".dropdown > .btn-group > .open > .bs-searchbox > .form-control")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[6];
        }
        return $ele;
      });
  }

  getCaseFilingDate() {
    return cy.get(
      ".ui-tooltip-content > .table-xcondensed > tbody > .dbsmc > .docketEntryCaseFilingDate"
    );
  }

  getExpandDocketDate() {
    return cy.get("[id^=docketDateField_]");
  }

  getExpandDocketTime() {
    return cy.get("[id^=docketTime_]");
  }

  getExpandFilingPartyField() {
    return cy.get("[data-id^=docketFilingParty_]");
  }

  getExpandFilingPartyFieldSearchInput() {
    return cy
      .get(".dropdown > .btn-group > .open > .bs-searchbox > .form-control")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[7];
        }
        return $ele;
      });
  }

  getExpandFilingOBOPartyField() {
    return cy.get("[data-id^=docketFobo_]");
  }

  getExpandFilingOBOPartyFieldSearchInput() {
    return cy
      .get(".dropdown > .btn-group > .open > .bs-searchbox > .form-control")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[8];
        }
        return $ele;
      });
  }

  getDocketTextData(rownum) {
    return cy.get(".preDefinedTextArea").then(($ele1) => {
      if ($ele1 && $ele1.length >= 1) {
        return $ele1[rownum];
      }
      return $ele1;
    });
  }

  getExpandSaveDocketButton() {
    return cy.get("[data-id^=saveDocketDropDown_]");
  }

  getExpandSaveDocketButtonOption(rownum) {
    return cy
      .get("[id^=saveDocketDropDownDiv_] > div > div > div > ul > li > a")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[rownum];
        }
        return $ele;
      });
  }

  getUpdateDocketEntrySectionExpandIcon() {
    return cy.get(
      ".maintainDocketsSection > .smc-sub-process > .btn > .glyphicon"
    );
  }

  getExpandDocketEntryRow() {
    return cy.get(".docketEntriesDisplayTable .docketRow:first");
  }

  getUpdateDocketText(rownum) {
    return cy.get(".preDefinedTextArea").then(($ele2) => {
      if ($ele2 && $ele2.length >= 1) {
        return $ele2[rownum];
      }
      return $ele2;
    });
  }

  getUpdateDocketEntryButton() {
    return cy.get("#updateDocketButton");
  }

  getTrashCanIcon() {
    return cy.get(".glyphicon-trash");
  }

  getReasonDescription() {
    return cy.get("[data-id^=reasonCode_]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        return $ele[0];
      }
      return $ele;
    });
  }
}
