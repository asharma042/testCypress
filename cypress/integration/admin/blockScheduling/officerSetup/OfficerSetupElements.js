/// <reference types="cypress" />

export default class OfficerSetupElements {
  //Search Officer
  getLocationDropdown() {
    return cy.get("[data-id=locations]").then(($elements) => {
      if ($elements.length) {
        return $elements[0];
      }
      return $elements;
    });
  }
  getArrestingAgencyId() {
    return cy.get("#arrestingAgencyId");
  }
  getLastName() {
    return cy.get("#lastName");
  }
  getFirstName() {
    return cy.get("#firstName");
  }
  getOfficerBadge() {
    return cy.get("#badgeNum");
  }
  getGroupNum() {
    return cy.get("#groupNum");
  }
  getOfficerSearchButton() {
    return cy.get("#officerSearchBtn");
  }
  getClearSearchBtn() {
    return cy.get("#officerSetupClearSearchBtn");
  }

  //Edit Officer
  getCloseOfficerSetupTab() {
    return cy.get(".close-tab-span");
  }
  getOfficerSearchResultTable() {
    return cy.get("#viewUpdateOfficerSearch");
  }
  getEditableUpdateField() {
    return cy.get(".editable-input");
  }
  getClearField() {
    return cy.get(".editable-clear-x");
  }
  getOfficerSearchResultTableEditIcon() {
    return cy.get("[id^=updateOfficerBtn_]");
  }
  getOfficerSearchResultTableEventLocationTarget() {
    return cy.get("[id^=locationCode_]");
  }
  getOfficerSearchResultTableEventLocationTargetSelector() {
    return cy.get(
      "[id^=officerRow_] > td:nth-child(2) > span > div > form > div > div:nth-child(2) > div.editable-input.input-group-xs > select"
    );
  }
  getOfficerSearchResultTableArrestingAgencyTarget() {
    return cy.get("[id^=arrestingAgencyId_]");
  }
  getOfficerSearchResultTableLastNameTarget() {
    return cy.get("[id^=lastName_]");
  }
  getOfficerSearchResultTableFirstNameTarget() {
    return cy.get("[id^=firstName_]");
  }
  getOfficerSearchResultTableBadgeNumTarget() {
    return cy.get("[id^=badgeNum_]");
  }
  getOfficerSearchResultTableGroupNumTarget() {
    return cy.get("[id^=groupNum_]");
  }
  getOfficerSearchResultTableEndDateTarget() {
    return cy.get("[id^=endDate_]");
  }
  getOfficerSearchResultTableEndDateField() {
    return cy.get("#dateField");
  }
  getOfficerSearchResultTableEditUpdateButton() {
    return cy.get(".editable-submit > .editable-button-icon");
  }

  //Delete Officer
  getDeleteOfficerBtn() {
    return cy.get("[id^=deleteOfficerBtn_]");
  }
  getConfirmDeleteBtn() {
    return cy.get(".smartAlertActive");
  }

  //Create Officer Setup Dialog
  getCreateOfficerSetupButton() {
    return cy.get("#createOfficerBtn");
  }
  getOfficerDialogTitle(title) {
    return cy.get(`span:contains("${title}")`);
  }
  getDeleteOfficerDialog() {
    return cy.get(`#smartAlertTitle:contains("Delete Officer?")`);
  }
  getCreateLocationDropdown() {
    return cy.get("[data-id=create_location]").then(($elements) => {
      if ($elements.length) {
        return $elements[0];
      }
      return $elements;
    });
  }
  getLocationSelectpickerSearchInput() {
    //both times this is used it is always the last element
    return cy.get(".bs-searchbox  > .form-control").then(($elements) => {
      if ($elements.length) {
        return $elements[$elements.length - 1];
      }
      return $elements;
    });
  }
  getCreateLastName() {
    return cy.get("#create_lastName");
  }
  getCreateFirstName() {
    return cy.get("#create_firstName");
  }
  getCreateArrestingAgencyId() {
    return cy.get("#create_arrestingAgency");
  }
  getCreateOfficerBadge() {
    return cy.get("#create_badgeNum");
  }
  getCreateGroupNum() {
    return cy.get("#create_groupNum");
  }
  getCreateOfficerButton() {
    return cy.get(
      ".ui-dialog.createOfficerDialog > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(1) > .ui-button-text"
    );
  }
}
