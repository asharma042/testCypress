/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import jsonHandler from "../../../../fixtures/jsonHandler";
import PAPortalActions from "../../../pom/pAPortal/PAPortalActions";

export default class PAPortalHappyPathActions {
  constructor() {
    this.tempFileName = "cypress\\temp\\PAPortalHappyPathActions.json";
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();
    this.pAActions = new PAPortalActions(this.defendant, this.tempFileName);
  }
  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils = new Utils();
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }

  /**
   * Scenario: Submit filing to SMC Case Import
   */
  validUserSelectsCreateFiling() {
    this.scenario = "scenario1";
    this.pAActions.validUserSelectsCreateFiling(this.scenario);
  }

  navigateToTheDefendantSection() {
    this.pAActions.navigateToTheDefendantSection();
  }

  enterLastName() {
    this.pAActions.enterLastName();
  }

  enterFirstName() {
    this.pAActions.enterFirstName();
  }

  enterDateOfBirth() {
    this.pAActions.enterDateOfBirth();
  }

  enterSex() {
    this.pAActions.enterSex();
  }

  enterStreetAddress() {
    this.pAActions.enterStreetAddress();
  }

  enterCity() {
    this.pAActions.enterCity();
  }

  enterZipCode() {
    this.pAActions.enterZipCode();
  }

  inTheEnterTicketSectionSelectFilingLocation() {
    let filingLocation = jsonHandler.getValue(this.scenario, "filingLocation");
    this.pAActions.inTheEnterTicketSectionSelectFilingLocation(filingLocation);
  }

  enterArrestingAgencyORI() {
    let agency = jsonHandler.getValue("scenario1", "agency");
    this.pAActions.enterArrestingAgencyORI(agency);
  }

  inTheEnterCountSection() {
    this.pAActions.inTheEnterCountSection();
  }

  enterDateOfViolationAsOneMonthAgo() {
    let oneMonthAgo = this.utils.oneMonthAgo();
    this.pAActions.enterDateOfViolationAsOneMonthAgo(oneMonthAgo);
  }

  enterTimeAs(option0) {
    this.pAActions.enterTimeAs("10:00:00");
  }

  enterLocation() {
    this.pAActions.enterLocation("here and there");
  }

  enter9DigitTicketNumber() {
    let ticketNo = this.utils.randomNumeric(9);
    this.pAActions.enter9DigitTicketNumber(ticketNo);
  }

  inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField() {
    let charge = jsonHandler.getValue(this.scenario, "charge");
    this.pAActions.inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField(
      charge
    );
  }

  inTheAddInitialDocumentDetailsSection() {
    this.pAActions.inTheAddInitialDocumentDetailsSection();
  }

  clickDocumentCategoryDropDownAndSelectInformationFiled() {
    let category = jsonHandler.getValue(this.scenario, "documentCategory");
    this.pAActions.clickDocumentCategoryDropDownAndSelectInformationFiled(
      category
    );
  }

  uploadPDF() {
    this.pAActions.uploadPDF("cypress\\uploads\\TestDocument.pdf");
  }

  clickChooseActionButton() {
    this.pAActions.clickChooseActionButton();
  }

  selectSubmitToCourt() {
    this.pAActions.selectSubmitToCourt(`Submit to Court{enter}`);
  }

  submitFilingPopUpOf(option0) {
    this.pAActions.submitFilingPopUpOf("Submit Filing");
  }

  selectYes() {
    this.pAActions.selectYes();
  }

  greenNotyShowingFilingWasSubmittedSuccessfully() {
    this.pAActions.greenNotyShowingFilingWasSubmittedSuccessfully();
  }
}
