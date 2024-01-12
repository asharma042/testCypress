/// <reference types="cypress" />

export default class AddPartyElements {
  getSearchByCaseIdRadioButton() {
    return cy.get("#caseIdPartiesRadio");
  }

  getMyPartiesSearchInput() {
    return cy.get("[id^=partiesCasesSearchById_]");
  }

  getCasePartiesExpandIcon() {
    return cy.get(
      ".casePartiesMainSection > .col-xs-12 > .partiesAccordionHeader > .glyphicon"
    );
  }

  getCasePartiesTable() {
    return cy.get("[data-process-name=casePartyResults]");
  }

  getAddPartyExpandIcon() {
    return cy.get(":nth-child(2) > .partiesAccordionHeader > .glyphicon");
  }

  getPartyDescriptionButton() {
    return cy.get("[data-id=addPartyDescription]");
  }

  getPartyDescriptionInput() {
    return cy.get(
      ".paddingnarrow > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  getPartyDescriptionSelectedValue() {
    return cy.get(
      ".col-md-4.col-sm-4 > .dropdown > .btn-group > .btn > .filter-option"
    );
  }

  getPartyDescriptionDropDownWithValue(value) {
    return cy.get("li > a > span").then(($ele) => {
      if ($ele.length && $ele.length > 1) {
        for (var i = 0; i < $ele.length; i++) {
          if ($ele[i].textContent.includes(value)) {
            return $ele[i].parentElement;
          }
        }
      }
    });
  }

  getAddPartyPersonFirstName() {
    return cy.get("input#addPartyPersonFirstName");
  }

  getAddPartyPersonMiddleName() {
    return cy.get("#addPartyPersonMiddleName");
  }

  getAddPartyPersonLastName() {
    return cy.get("#addPartyPersonOrgLastName");
  }

  getAddPartyStartDate() {
    return cy.get("[id^=addPartyPersonStartDate_]");
  }

  getAddPartyStartTime() {
    return cy.get("[id^=addPartyPersonStartTime]");
  }

  getExpandContactInformationSectionIcon() {
    return cy.get(".collapseAddpartyContactInfoSectionBtn");
  }

  getContactInformationStatus() {
    return cy.get("#partyAddressStatus");
  }

  getContactInformationAddressType(selected) {
    if (selected) {
      return cy.get("select#partyAddressType option:selected");
    }
    return cy.get("#partyAddressType");
  }

  getContactInformationStreetAddress1() {
    return cy.get("[id^=streetLine1_");
  }

  getContactInformationStreetAddressSelection(value) {
    return cy.get(".ui-menu-item").then(($ele) => {
      if ($ele.length) {
        for (var i = 0; i < $ele.length; i++) {
          if ($ele[i].textContent.includes(value)) {
            return $ele[i];
          }
        }
      }
      return $ele;
    });
  }
  getContactInformationCity() {
    return cy.get("#city");
  }

  getContactInformationState() {
    return cy.get("#statCode");
  }

  getContactInformationZip() {
    return cy.get("#zip");
  }

  getContactInformationNation() {
    return cy.get("#nationCode");
  }

  getSavePartyToCaseButton() {
    return cy.get(".savePartyToCaseBtn");
  }

  getPartiesStyleOfCaseProposedInput() {
    return cy.get("[id^=proposedStyleOfCase_");
  }

  getPartiesStyleOfCaseSaveAndCloseButton() {
    return cy.get("[id^=saveStyleofCaseBtn_");
  }
  getMaintainCasePartiesTabIcon() {
    return cy.get(".close-tab-span");
  }

  getProgressInMaintainPartiesTitle() {
    return cy.get("#smartAlertTitle");
  }

  getProgressInMaintainPartiesPopupYesButton() {
    return cy.get('[data-id="yes"]');
  }
}
