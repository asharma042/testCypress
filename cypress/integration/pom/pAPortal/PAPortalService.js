import Utils from "../../utils/utils";
import jsonHandler from "../../../fixtures/jsonHandler";
import PAPortalActions from "./PAPortalActions";
export default class PAPortalService {
  constructor(defendant, tempFileName) {
    if (!defendant) {
      throw new Error("missing defendant");
    }
    if (!tempFileName) {
      throw new Error("missing tempFileName");
    }
    this.defendant = defendant;
    this.tempFileName = tempFileName;

    this.pAActions = new PAPortalActions(defendant, tempFileName);

    this.utils = new Utils();
  }
  /**
   * Main entry point to create a Case Filing via PA Portal
   * @param {*} scenario
   */
  createPAPortal(scenario) {
    this.pAActions.validUserSelectsCreateFiling(scenario);
    this.pAActions.navigateToTheDefendantSection();
    this.pAActions.enterLastName();
    this.pAActions.enterFirstName();
    this.pAActions.enterDateOfBirth();
    this.pAActions.enterSex();
    this.pAActions.enterStreetAddress();
    this.pAActions.enterCity();
    this.pAActions.enterZipCode();

    let filingLocation = jsonHandler.getValue(scenario, "filingLocation");
    this.pAActions.inTheEnterTicketSectionSelectFilingLocation(filingLocation);

    let agency = jsonHandler.getValue("scenario1", "agency");
    this.pAActions.enterArrestingAgencyORI(agency);

    this.pAActions.inTheEnterCountSection();

    let oneMonthAgo = this.utils.oneMonthAgo();
    this.pAActions.enterDateOfViolationAsOneMonthAgo(oneMonthAgo);

    this.pAActions.enterTimeAs("10:00:00");

    this.pAActions.enterLocation("here and there");

    let ticketNo = this.utils.randomNumeric(9);
    this.pAActions.enter9DigitTicketNumber(ticketNo);

    let charge = jsonHandler.getValue(scenario, "charge");
    this.pAActions.inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField(
      charge
    );

    this.pAActions.inTheAddInitialDocumentDetailsSection();

    let category = jsonHandler.getValue(scenario, "documentCategory");
    this.pAActions.clickDocumentCategoryDropDownAndSelectInformationFiled(
      category
    );

    this.pAActions.uploadPDF("cypress\\uploads\\TestDocument.pdf");
    this.pAActions.clickChooseActionButton();
    this.pAActions.selectSubmitToCourt(`Submit to Court{enter}`);
    this.pAActions.submitFilingPopUpOf("Submit Filing");
    this.pAActions.selectYes();
    this.pAActions.greenNotyShowingFilingWasSubmittedSuccessfully();
  }
}
