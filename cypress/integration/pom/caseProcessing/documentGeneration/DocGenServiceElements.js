/// <reference types="cypress" />

export default class DocGenServiceElements {
  clickTemplateDropdown() {
    return cy.get("[data-id^=documentTypeSelect_]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
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

  selectSummonsTemplate() {
    return cy
      .get('.bs-searchbox > input[class="form-control"]')
      .then(($ele) => {
        if ($ele && $ele.length > 0) {
          return $ele[1];
        }
        return $ele;
      });
  }

  selectSearchByCaseId() {
    return cy.get("#caseIdRadio");
  }

  selectSearchInputField() {
    return cy.get("[id^=docGenSearchById_]");
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
    return cy.get(
      ".col-md-4.col-sm-7 > .col-md-12 > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  expandServiceCaseParties() {
    return cy.get("[data-id=docGenCaseParties]").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        return $ele[0];
      }
      return $ele;
    });
  }

  openServiceCasePartiesField() {
    return cy.get(
      ".col-md-9 > .docGenCasePartiesDiv > #docGenCasePartiesDiv > .bootstrap-select > .dropdown-toggle"
    );
  }

  selectServiceCaseParties() {
    return cy.get(
      '#docGenCasePartiesDiv > .bootstrap-select > .open > .dropdown-menu > [data-original-index="0"] > a'
    );
  }
}
