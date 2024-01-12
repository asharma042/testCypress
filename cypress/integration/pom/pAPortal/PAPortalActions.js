import Utils from "../../utils/utils";
import PAPortalElements from "./PAPortalElements";

export default class PAPortalActions {
  constructor(defendant, tempFileName) {
    this.case = {};
    this.case.defendant = defendant;
    this.tempFileName = tempFileName;
    this.utils = new Utils();
    this.pAElements = new PAPortalElements();
  }

  validUserSelectsCreateFiling() {
    cy.paPortalLogin();
    cy.clickLink("PA Portal");

    cy.intercept("getCaseImportPALocCodes*").as("getCaseImportPALocCodes");
    cy.intercept("getupPaPortalDocumentDefaults*").as(
      "getupPaPortalDocumentDefaults"
    );
    cy.intercept("getStatesByCountry*").as("getStatesByCountry");

    cy.clickMenu("Create Filing");

    cy.wait([
      "@getCaseImportPALocCodes",
      "@getupPaPortalDocumentDefaults",
      "@getStatesByCountry",
    ]);
  }

  navigateToTheDefendantSection() {
    //NO OP
  }

  /**
   * Sometimes the name gets entered w/ the first letter dropped
   */
  enterLastName() {
    this.pAElements.getDefendantLastName().clear();

    this.pAElements
      .getDefendantLastName()
      .type(`${this.case.defendant.lastName}`);

    this.pAElements.getDefendantLastName().realPress("Tab");

    this.pAElements.getDefendantLastName().then(($ele) => {
      if ($ele[0].value !== this.case.defendant.lastName.toUpperCase()) {
        this.enterLastName();
      }
    });
  }

  enterFirstName() {
    this.pAElements
      .getDefendantFirstName()
      .type(`${this.case.defendant.firstName}{enter}`);
  }

  enterDateOfBirth() {
    this.pAElements
      .getDefendantDateOfBirth()
      .type(`${this.case.defendant.birthDate}{enter}`);
  }

  enterSex() {
    this.pAElements.getDefendantSex().select(this.case.defendant.sex);
  }

  enterStreetAddress() {
    this.pAElements
      .getStreetAddress1()
      .type(`${this.case.defendant.street}{enter}`);
  }

  enterCity() {
    this.pAElements.getCity().type(`${this.case.defendant.city}{enter}`);
  }

  enterZipCode() {
    this.pAElements.getZip().type(`${this.case.defendant.zip}{enter}`);
  }

  inTheEnterTicketSectionSelectFilingLocation(filingLocation) {
    this.pAElements.getFilingLocation().select(filingLocation);
  }

  enterArrestingAgencyORI(agency) {
    this.pAElements.getArrestingAgency().type(`${agency}`);
    this.pAElements.getArrestingAgencyItems().click();
  }

  inTheEnterCountSection() {
    //no op
  }

  enterDateOfViolationAsOneMonthAgo(oneMonthAgo) {
    this.case.dateOfViolation = oneMonthAgo;
    this.pAElements.getCountDateOfViolation().type(`${oneMonthAgo}{enter}`);
  }

  enterTimeAs(time) {
    this.case.timeOfViolation = time;
    this.pAElements.getCountTime().focus().clear().type(`${time}{enter}`);
  }

  enterLocation(location) {
    this.case.countLocation = location;
    this.pAElements.getCountLocation().type(location);
  }

  enter9DigitTicketNumber(ticketNo) {
    this.case.ticketNo = ticketNo;
    this.pAElements.getCountTicketNumber().type(`${ticketNo}{enter}`);
  }

  inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField(charge) {
    cy.intercept("smc-web/getMinorTrafficInd*").as("getMinorTrafficInd");

    this.pAElements.getCountMissouriCharge().focus();

    cy.wait(["@getMinorTrafficInd"]);

    this.case.charge = charge;

    //For some reason typing whole number doesn't work
    this.pAElements.getCountMissouriCharge().type(`${charge.substring(0, 5)}`);
    this.pAElements.getCountMissouriCharge().type(`${charge.substring(5)}`);
    this.pAElements.getCountMissouriCharge().realPress("Tab");
  }

  inTheAddInitialDocumentDetailsSection() {
    //no op
  }

  clickDocumentCategoryDropDownAndSelectInformationFiled(category) {
    this.case.category = category;
    this.pAElements.getDocumentSectionDocumentCategoryButton().click();

    this.pAElements
      .getDocumentSectionDocumentCategoryInput()
      .type(`${category}{enter}`);
  }

  uploadPDF(documentPath) {
    cy.intercept("smc-web/validateCaseImportAddDocket*").as(
      "validateCaseImportAddDocket"
    );

    this.pAElements
      .getDocumentSectionUploadDocumentInput()
      .selectFile(documentPath);

    cy.wait(["@validateCaseImportAddDocket"]);
  }

  clickChooseActionButton() {
    this.pAElements.getChooseActionButton().click();
  }

  selectSubmitToCourt(option) {
    cy.intercept("smc-web/validateMuniLocation*").as("validateMuniLocation");
    cy.intercept("smc-web/validatePersonCreateFiling*").as(
      "validatePersonCreateFiling"
    );
    cy.intercept("smc-web/validateCaseImportDemographics*").as(
      "validateCaseImportDemographics"
    );
    cy.intercept("smc-web/validateCaseImportAddress*").as(
      "validateCaseImportAddress"
    );
    cy.intercept("smc-web/validateCreateFilingTicket*").as(
      "validateCreateFilingTicket"
    );
    cy.intercept("smc-web/validateCaseImportCharge*").as(
      "validateCaseImportCharge"
    );
    cy.intercept("smc-web/getPaPortalInitialDockets*").as(
      "getPaPortalInitialDockets"
    );

    this.pAElements.getChooseActionInput().type(`${option}{enter}`);

    cy.wait([
      "@validateMuniLocation",
      "@validatePersonCreateFiling",
      "@validateCaseImportDemographics",
      "@validateCaseImportAddress",
      "@validateCreateFilingTicket",
      "@validateCaseImportCharge",
      "@getPaPortalInitialDockets",
    ]);
  }

  submitFilingPopUpOf(title) {
    this.pAElements
      .getSubmitFilingPopUpTitle()
      .contains(title)
      .should("be.visible");
  }

  selectYes() {
    cy.intercept("smc-web/createFilingSubmitToCourt*").as(
      "createFilingSubmitToCourt"
    );

    this.pAElements.getSubmitFilingYesButton().click();

    cy.wait(["@createFilingSubmitToCourt"]).then(($ele) => {
      this.case.filingNumber = $ele.response.body.doctracCourtCaseId;
      this.case.filingDate = this.utils.formatDate(new Date());
      cy.writeFile(this.tempFileName, {
        case: this.case,
      });
    });
  }

  greenNotyShowingFilingWasSubmittedSuccessfully() {
    this.utils.clearNotyMessages();
    this.pAElements.getTabCloseIcon().click();
  }
}
