/// <reference types="cypress" />

export default class PAPortalElements {
  getDefendantLastName() {
    return cy.get("#lastName");
  }

  getDefendantFirstName() {
    return cy.get("#firstName");
  }

  getDefendantDateOfBirth() {
    return cy.get("[id^=birthDate_]");
  }

  getDefendantSex() {
    return cy.get("#sex");
  }

  getStreetAddress1() {
    return cy.get("#streetLine1_");
  }

  getCity() {
    return cy.get("#city");
  }

  getZip() {
    return cy.get("#zip");
  }

  getFilingLocation() {
    return cy.get("#paCourtLocn");
  }

  getArrestingAgency() {
    return cy.get("[id^=arrestingAgencyOri_]");
  }

  getArrestingAgencyItems() {
    return cy.get(".ui-autocomplete-code");
  }

  getCountDateOfViolation() {
    return cy.get("[id^=violDate_]");
  }

  getCountTime() {
    return cy.get("[id^=chargeTime_]");
  }

  getCountLocation() {
    return cy.get("[id^=loc]").then(($ele) => {
      if ($ele.length) {
        return $ele[0];
      }
      return $ele;
    });
  }

  getCountTicketNumber() {
    return cy.get("[id^=ticketNo]");
  }

  getCountMissouriCharge() {
    return cy.get("[id^=origCharge]");
  }

  getCountMissouriChargeItem() {
    return cy.get(".ui-autocomplete-code").then(($ele) => {});
  }

  getDocumentSectionDocumentCategoryButton() {
    return cy.get("[data-id^=addDocketCodeDesc_]");
  }

  getDocumentSectionDocumentCategoryInput() {
    return cy.get(
      ".col-md-12 > .form-group > .dropdown > .btn-group > .open > .bs-searchbox > .form-control"
    );
  }

  getDocumentSectionUploadDocumentInput() {
    return cy.get("[id^=ajax-upload-id-]").then(($ele) => {
      return $ele[0];
    });
  }

  getChooseActionButton() {
    return cy.get("[data-id^=processContinuationSelectPicker_]");
  }

  getChooseActionInput() {
    return cy.get(
      "[id^=createFilingDocumentContent]> div.container > div > div.col-lg-2.col-md-3.col-sm-4.input-group-xs > div > div > div > div > div > input"
    );
  }

  getSubmitFilingPopUpTitle() {
    return cy.get("#smartAlertTitle");
  }

  getSubmitFilingYesButton() {
    return cy.get(".smartAlertActive");
  }

  getTabCloseIcon() {
    return cy.get(".close-tab-btn > .close-tab-span").then(($ele) => {
      return $ele[0];
    });
  }
}
