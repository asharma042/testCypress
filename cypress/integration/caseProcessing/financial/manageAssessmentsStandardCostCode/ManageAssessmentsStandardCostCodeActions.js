/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import ManageAssessmentsStandardCostCodeActionsElements from "./ManageAssessmentsStandardCostCodeElements";
import CriminalCaseActions from "../../../pom/caseProcessing/criminal/CriminalCaseActions";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import ManageAssessmentsActions from "../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsActions";
import Common from "../../../common/Common";
import jsonHandler from "../../../../fixtures/jsonHandler";
import ManageAssessmentsService from "../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsService";

//constant
let SKIPSENTENCE = true;

export default class ManageAssessmentsStandardCostCodeActions {
  constructor() {
    this.utils = new Utils();
    //Make up some data
    this.defendant = this.utils.getRandomDefendantData();

    //Specific elements
    this.manageAssessmentsStandardCostCodeActionsElements =
      new ManageAssessmentsStandardCostCodeActionsElements();

    //The file to hold runtime data
    this.tempDefendentFileName =
      "cypress\\temp\\manageAssessmentsStandardCostCode.json";

    this.criminalCaseActions = new CriminalCaseActions();
    this.criminalCaseService = new CriminalCaseService();

    this.manageAssessmentsActions = new ManageAssessmentsActions();
    //Common utilities
    this.common = new Common();

    this.maService = new ManageAssessmentsService(
      this.tempDefendentFileName,
      this.defendant
    );
  }
  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempDefendentFileName, function ($json) {
      if ($json) {
        that.defendant = $json.defendant;
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }

  /**
   * Scenario 1
   */
  caseWithSingleWatercraftMisdeameanorChargeHasBeenDisposedAsGuiltyPleaAndHasBeenSentencedToAFineOf5500() {
    this.scenario = "scenario1";
    this.maService.createGenericCase(this.scenario);
  }

  continueWithScenarioWatercraftMisdeameaorChargeCase() {
    this.scenario = "scenario1";
    this.readRunTimeFile();
  }

  clickOnFinancialFromTheBusinessProcessMenu() {
    this.manageAssessmentsActions.clickOnFinancialFromTheBusinessProcessMenu(
      this.tempDefendentFileName
    );
  }

  selectManageAssessmentsFromTheFinancialMenu() {
    this.manageAssessmentsActions.selectManageAssessmentsFromTheFinancialMenu();
  }

  selectTheAppropriateFinancialLocation() {
    this.manageAssessmentsActions.selectTheAppropriateFinancialLocation();
  }

  clickToSearchByCaseID() {
    this.manageAssessmentsActions.selectTheCaseIDRadioButtonIfItIsNotAlreadySelected();
  }

  inTheMyCaseIDSearchEnterTheCorrespondingCaseID() {
    cy.get("@defendant").then((defendant) => {
      this.manageAssessmentsActions.inTheMyCaseIDSearchFieldEnterTheCaseID(
        defendant.caseId
      );
    });
  }

  clickTheMagnifyingGlassToSearchForTheCase() {
    this.manageAssessmentsActions.clickTheMagnifyingGlassToSearchForTheCase();
  }

  theCaseDisplaysInTheCasesSection() {
    this.manageAssessmentsActions.theCaseDisplaysInTheCasesSection();
  }

  theCaseIsExpandedToViewTheCosts() {
    this.manageAssessmentsActions.validateThetheCourtCostsBalanceDue(
      jsonHandler.getValue(this.scenario, "courtCostsBalanceDue")
    );
    let fineAmount = jsonHandler.getValue(this.scenario, "fineAmount");
    if (fineAmount) {
      this.manageAssessmentsActions.validateFineBalanceDue(fineAmount);
    }
  }

  anyPendingCostsDisplayWithADiskNextToTheCostDescription() {
    this.manageAssessmentsActions.validatePendingCostsDisplayWithADiskNextToTheCostDescription(
      jsonHandler.getValue(this.scenario, "pendingCostsLength")
    );

    let fineAmountLength = jsonHandler.getValue(
      this.scenario,
      "fineAmountLength"
    );
    if (fineAmountLength) {
      this.manageAssessmentsActions.validateFineCostsWithADiskNextToFineDescription(
        fineAmountLength
      );
    }
  }

  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCM10InIt() {
    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(this.scenario, "docketCode")
    );
  }

  clickTheSaveButton() {
    this.manageAssessmentsActions.clickTheSaveButton();
  }

  allPendingAssessmentsAndFinesAreSavedToTheCase() {
    //ok
  }

  theDiskNextToTheCostDescriptionDisappearing() {
    this.manageAssessmentsActions.validatePendingCostsDisplayWithADiskNextToTheCostDescription(
      0
    );

    this.manageAssessmentsActions.validateFineCostsWithADiskNextToFineDescription(
      0
    );
  }

  theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled() {
    this.manageAssessmentsActions.theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled();
    this.manageAssessmentsActions.closeTab();
  }
  /**
   * Scenario 2
   */
  caseWithSingleFelonyChargeHasBeenDisposedAsGuiltyPleaAndHasBeenSentencedToAFineOf5500() {
    this.scenario = "scenario2";
    this.maService.createGenericCase(this.scenario);
  }
  /**
   * Pickup from Scenario 2
   */
  continueWithScenarioFelonyChargeNonViolationsBureau() {
    this.scenario = "scenario2";
    this.readRunTimeFile();
  }

  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFRTCInIt() {
    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(this.scenario, "docketCode")
    );
  }

  /**
   * Scenario 3
   */

  caseWithSingleFelonyChargeHasBeenDisposedAsGuiltyPleaAndWhenSentencingTheSISCheckBoxHasBeenSelectedAnd120MonthsIsEnteredInProbationBoxes() {
    this.scenario = "scenario3";
    this.maService.createGenericCase(this.scenario, SKIPSENTENCE);

    this.criminalCaseService.addFelonySentenceWithSISAndProbation(
      this.scenario,
      jsonHandler.getValue(this.scenario, "probationDuration"),
      jsonHandler.getValue(this.scenario, "probationType")
    );
  }

  continueWithScenarioFullDisposedSentencedFelonyWithSISCosts() {
    this.scenario = "scenario3";
    this.readRunTimeFile();
  }

  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFSISPreloadedInIt() {
    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(this.scenario, "docketCode")
    );
  }

  /**
   * scenario 4
   */
  caseWithSingleInfractionChargeHasBeenDisposedAsGuiltyPleaAndSentenced() {
    this.scenario = "scenario4";
    this.maService.createGenericCase(this.scenario);
  }

  validateFullyDisposedSentencedNonTrafficInfractionCharge() {
    this.scenario = "scenario4";
    this.readRunTimeFile();
  }
  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCINOPreloadedInIt() {
    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(this.scenario, "docketCode")
    );
  }

  /**
   * Scenario 5
   */
  caseWithSingleTrafficChargeHasBeenDisposedAsGuiltyPleaAndSentenced() {
    this.scenario = "scenario5";
    this.maService.createGenericCase(this.scenario);
  }

  continueWithScenarioFullDisposedSentencedTrafficInfractionCharge() {
    this.scenario = "scenario5";
    this.readRunTimeFile();
  }

  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXIPVTPreloadedInIt() {
    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(this.scenario, "docketCode")
    );
  }

  /**
   * Scenario 6
   */
  caseWithSingleMisdemeanorChargeHasBeenDisposedAsGuiltyPleaAndSentenced() {
    this.scenario = "scenario6";
    this.maService.createGenericCase(this.scenario);
  }

  continueWithScenarioFullyDisposedSentencedConservationInfractionCharge() {
    this.scenario = "scenario6";
    this.readRunTimeFile();
  }

  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCM10PreloadedInIt() {
    this.manageAssessmentsActions.directlyUnderTheAssessCostsWordsStandardDocketCode(
      jsonHandler.getValue(this.scenario, "docketCode")
    );
  }
}
