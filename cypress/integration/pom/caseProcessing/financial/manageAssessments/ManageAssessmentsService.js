import CriminalCaseService from "../../criminal/CriminalCaseService";
import Utils from "../../../../utils/utils";
import jsonHandler from "../../../../../fixtures/jsonHandler";
import ManageAssessmentsActions from "./ManageAssessmentsActions";
export default class ManageAssessmentsService {
  constructor(jsonFileName, defendant) {
    if (!jsonFileName) {
      throw new Error("missing jsonFileName in constructor");
    }
    this.tempFileName = jsonFileName;
    this.defendant = defendant;
    this.utils = new Utils();
    this.criminalCaseService = new CriminalCaseService();
    this.manageAssessmentsActions = new ManageAssessmentsActions();
  }

  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.defendant = $json.defendant;
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }
  /**
   * standard boiler plate for creating case
   */
  createGenericCase(scenario, skipSentence) {
    this.criminalCaseService.setupCriminal(
      this.defendant,
      jsonHandler.getValue("defaults", "courtCode"),
      jsonHandler.getValue(scenario, "caseType"),
      jsonHandler.getValue("defaults", "arrestingAgencyORI")
    );

    this.criminalCaseService.addProsecutingAttorneyToCase(
      jsonHandler.getValue("defaults", "prosecutingAttorneyCode"),
      jsonHandler.getValue("defaults", "prosecutingAttorneyName")
    );

    this.criminalCaseService.addDocket(
      "AINFO", //docketDescription
      this.utils.formatDate(new Date()) //docketDate
    );

    this.criminalCaseService.addCount(
      this.utils.oneMonthAgo(), //dateOfViolation
      "10:00", //timeOfViolation
      "Here and there", //location
      this.utils.caseTicketNumber(
        jsonHandler.getValue(scenario, "nonConservationTicket") //ticketNumber
      ),
      jsonHandler.getValue(scenario, "charge"), //charge
      this.utils.randomNumeric(8) //ocn
    );

    this.criminalCaseService.saveCase(this.defendant, this.tempFileName);

    this.criminalCaseService.assignJudge(
      jsonHandler.getValue("defaults", "caseJudgeAssignment"), //judge
      this.utils.getValidDateForSchedulingStartingFromNow(7), //eventDate
      "10:10", //eventTime
      jsonHandler.getValue("defaults", "judgeEventRoom")
    );

    this.criminalCaseService.disposeCase();

    this.criminalCaseService.enterPleaForCount(
      jsonHandler.getValue(scenario, "plea")
    );

    this.criminalCaseService.closeDisposition();

    if (skipSentence) {
      return;
    }

    //For those Charges that have a default fine,
    //skip sentencing
    cy.get("@fineAmount").then(($fineAmount) => {
      if (!$fineAmount) {
        cy.get("@defendant").then((defendant) => {
          this.criminalCaseService.addSentenceDialog(defendant);

          this.criminalCaseService.addSentenceFine(
            0,
            jsonHandler.getValue(scenario, "fineAmount")
          );
          this.criminalCaseService.verifyAddedSentenceFine(
            jsonHandler.getValue(scenario, "fineAmount"),
            jsonHandler.getValue(scenario, "charge"),
            jsonHandler.getValue(scenario, "chargeDesc")
          );
          this.criminalCaseService.closeSentenceTab();
        });
      }
    });
  }

  continueWithCase(scenario) {
    this.readRunTimeFile();
    this.manageAssessmentsActions.clickOnFinancialFromTheBusinessProcessMenu();
    this.manageAssessmentsActions.selectManageAssessmentsFromTheFinancialMenu();
    this.manageAssessmentsActions.selectTheAppropriateFinancialLocation(
      jsonHandler.getValue("defaults", "courtCode")
    );
    this.manageAssessmentsActions.selectTheCaseIDRadioButtonIfItIsNotAlreadySelected();
    cy.get("@defendant").then((defendant) => {
      this.manageAssessmentsActions.inTheMyCaseIDSearchFieldEnterTheCaseID(
        defendant.caseId
      );
    });
    this.manageAssessmentsActions.clickTheMagnifyingGlassToSearchForTheCase();
    this.manageAssessmentsActions.theCaseDisplaysInTheCasesSection();

    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(scenario, "docketCode")
    );

    this.manageAssessmentsActions.clickTheSaveButton();
  }
}
