/// <reference types="cypress" />

export default class DocGenProcessListElements {
  clickTemplateDropdown() {
    return cy.get("[data-id^=documentTypeSelect_]").then(($ele) => {
      if ($ele.length && $ele.length > 0) {
        return $ele[0];
      }
      return $ele;
    });
  }

  selectTemplate() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        if ($ele && $ele.length > 0) {
          return $ele[1];
        }
        return $ele;
      });
  }

  selectNonGeneratedNonLabelTemplate() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        if ($ele && $ele.length > 0) {
          return $ele[1];
        }
        return $ele;
      });
  }

  selectSearchByProcessList() {
    return cy.get("#processListDocGen2Radio");
  }

  enterCaseID() {
    return cy.get("input[name=enterCaseId]");
  }

  checkProcessListSelectAllBox() {
    return cy.get("#lProc_enterCase_SelectAll_Check");
  }

  clickMultiUseListButton() {
    return cy.get(".col-md-12 > .paddingnarrow > .btn > strong");
  }

  enterProcessListName() {
    return cy.get("#listNameId");
  }

  enterProcessListNameForSearch() {
    return cy.get("[id^=entrySearchByProcessList_]");
  }

  checkDocGenSelectAllBox() {
    return cy.get("[id^=select_check_all_]").then(($ele) => {
      if ($ele && $ele.length >= 1) {
        return $ele[0];
      }
      return $ele;
    });
  }

  pressContinueWithSelectedCasesButton() {
    return cy.get("[id^=docGenNextBtn_]");
  }

  pressSaveButton() {
    return cy.get(
      ".ui-dialog.lProcCreateNewListDialog > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(1) > .ui-button-text"
    );
  }

  closeTab() {
    return cy.get(".close-tab-span");
  }

  closeExitFromProcessListWindow() {
    return cy.get('[data-id="yes"]');
  }

  caseResultsTable() {
    return cy.get("[data-process-name=documentgeneration]");
  }

  clickGenerateDocumentButton() {
    return cy.get("[data-id^=generateDocumentDropDown_]");
  }

  clickGenerateDocumentNODMSOption(rownum) {
    return cy
      .get("[id^=generateDocumentDropDownDiv_] > div > div > div > ul > li > a")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[rownum];
        }
        return $ele;
      });
  }

  clickGenerateDocumentFinalOption(rownum) {
    return cy
      .get("[id^=generateDocumentDropDownDiv_] > div > div > div > ul > li > a")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[rownum];
        }
        return $ele;
      });
  }

  closeDMSWindow() {
    const DMSWindow = "newWindowContainer.do?process=dms";
    cy.window().then((win) => {
      const stub = cy.stub(win, "open").as("openWindow");
    });

    cy.get("@openWindow").should("be.calledWith", DMSWindow);
  }

  clickOK() {
    return cy.get(".smartAlertButton");
  }

  CloseDocGenTab() {
    return cy.get(".close-tab-span");
  }

  selectServiceDocDocket() {
    return cy.get();
  }

  expandServiceDocumentDocket() {
    return cy.get("[data-id^=docketCode_]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        return $ele[0];
      }
      return $ele;
    });
  }

  selectServiceDocumentDocket() {
    return cy
      .get(".dropdown > .btn-group > .open > .bs-searchbox > .form-control")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[8];
        }
        return $ele;
      });
  }

  expandServiceCaseParties() {
    return cy.get("[data-id=docGenCaseParties]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        return $ele[0];
      }
      return $ele;
    });
  }

  selectServiceCaseParties() {
    return cy
      .get(".dropdown > .btn-group > .open > .bs-searchbox > .form-control")
      .then(($ele) => {
        if ($ele && $ele.length > 1) {
          return $ele[10];
        }
        return $ele;
      });
  }
}
