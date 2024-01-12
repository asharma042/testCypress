/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import ManageAssessmentsStandardCostCodeMultipleChargesElements from "./ManageAssessmentsStandardCostCodeMultipleChargesElements";
import CriminalCaseActions from "../../../pom/caseProcessing/criminal/CriminalCaseActions";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import ManageAssessmentsActions from "../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsActions";
import Common from "../../../common/Common";
import jsonHandler from "../../../../fixtures/jsonHandler";

class ThingsToDo {
  constructor(enterACase, dispose, sentence) {
    this.enterACase = enterACase;
    this.dispose = dispose;
    this.sentence = sentence;
  }
}

export default class ManageAssessmentsStandardCostCodeMultipleChargesActions {
  constructor() {
    this.utils = new Utils();

    //Make up some data
    this.defendant = this.utils.getRandomDefendantData();

    //Specific elements
    this.manageAssessmentsStandardCostCodeMultipleChargesElements =
      new ManageAssessmentsStandardCostCodeMultipleChargesElements();

    //The file to hold runtime data
    this.tempDefendentFileName =
      "cypress\\temp\\manageAssessmentsStandardCostCodeMultipleCharges.json";

    this.criminalCaseActions = new CriminalCaseActions();
    this.criminalCaseService = new CriminalCaseService();

    this.manageAssessmentsActions = new ManageAssessmentsActions();
    //Common utilities
    this.common = new Common();
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
   *
   * @param {*} countNumber
   * @param {*} countName
   */
  sentenceRecordIsAdded(countNumber, countName, rows) {
    let charge = jsonHandler.getValue(
      this.scenario,
      "counts",
      countName,
      "charge"
    );

    let chargeDesc = jsonHandler.getValue(
      this.scenario,
      "counts",
      countName,
      "chargeDesc"
    );

    let fineAmount = jsonHandler.getValue(
      this.scenario,
      "counts",
      countName,
      "fineAmount"
    );

    this.criminalCaseActions.sentenceRecordIsAddedToTheSentenceSection(
      `${charge}${chargeDesc}`,
      `Defendant sentenced to Fine $${fineAmount}`,
      rows
    );
  }

  /**
   * supports multiple counts
   */
  genericEnterMultipleCountsForCase(thingsToDo) {
    cy.log(
      `genericEnterMultipleCountsForCase enterACase: ${thingsToDo.enterACase} dispose: ${thingsToDo.dispose} sentence: ${thingsToDo.sentence}`
    );
    //
    // Enter a case
    //
    if (thingsToDo.enterACase) {
      cy.log("genericEnterMultipleCountsForCase - enterACase");
      this.criminalCaseService.setupCriminal(
        this.defendant,
        jsonHandler.getValue("defaults", "courtCode"),
        jsonHandler.getValue(this.scenario, "caseType"),
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

      let keys = Object.keys(globalThis.fixture[this.scenario]["counts"]);

      for (var key = 0; key < keys.length; key++) {
        let count = keys[key];

        if (key > 0) {
          this.criminalCaseActions.clickAddCountButton();
        }

        this.criminalCaseService.addCount(
          this.utils.oneMonthAgo(), //dateOfViolation
          "10:00", //timeOfViolation
          `somewhere in location ${key + 1}`, //location
          this.utils.caseTicketNumber(
            jsonHandler.getValue(
              this.scenario,
              "counts",
              count,
              "nonConservationTicket"
            ) //ticketNumber
          ),
          jsonHandler.getValue(this.scenario, "counts", count, "charge"), //charge
          this.utils.randomNumeric(8) //ocn
        );

        if (
          jsonHandler.getValue(this.scenario, "counts", count, "drivingSpeed")
        ) {
          this.criminalCaseActions.enterDrivingSpeed(
            jsonHandler.getValue(this.scenario, "counts", count, "drivingSpeed")
          );
        }

        if (
          jsonHandler.getValue(this.scenario, "counts", count, "postedSpeed")
        ) {
          this.criminalCaseActions.enterPostedSpeed(
            jsonHandler.getValue(this.scenario, "counts", count, "postedSpeed")
          );
        }

        //Give JS time to validate fields - tab / lost focus will do the trick
        this.criminalCaseActions.focusToLocation();
        cy.wait(500);
      }

      this.criminalCaseService.saveCase(
        this.defendant,
        this.tempDefendentFileName
      );

      this.criminalCaseService.assignJudge(
        jsonHandler.getValue("defaults", "caseJudgeAssignment"), //judge
        this.utils.getValidDateForSchedulingStartingFromNow(7), //eventDate
        "10:10", //eventTime
        jsonHandler.getValue("defaults", "judgeEventRoom")
      );
    }
    //
    // Dispose
    //
    if (thingsToDo.dispose) {
      cy.log("genericEnterMultipleCountsForCase - enterACase");
      this.criminalCaseService.disposeCase();

      let keys = Object.keys(globalThis.fixture[this.scenario]["counts"]);
      for (var key = 0; key < keys.length; key++) {
        let count = keys[key];

        if (key > 0) {
          this.criminalCaseActions.clickCountTab(key + 1);
        }

        this.criminalCaseService.enterPleaForCount(
          jsonHandler.getValue(this.scenario, "counts", count, "plea"),
          key < keys.length - 1 //plea only? last one is saves
        );
      }

      this.criminalCaseService.closeDisposition();
    }
    //
    // Sentence
    //
    if (thingsToDo.sentence) {
      cy.get("@defendant").then((defendant) => {
        this.criminalCaseService.addSentenceDialog(defendant);
      });

      this.criminalCaseActions.clickAddSentenceCountDropdown();
      this.criminalCaseActions.selectAllFromSentenceCountDropdown();

      let keys = Object.keys(globalThis.fixture[this.scenario]["counts"]);

      for (var key = 0; key < keys.length; key++) {
        let count = keys[key];
        this.criminalCaseService.addSentenceFine(
          key,
          jsonHandler.getValue(this.scenario, "counts", count, "fineAmount")
        );
      }

      this.criminalCaseActions.clickToSave();
      this.utils.clearNotyMessages();

      for (var key = 0; key < keys.length; key++) {
        let count = keys[key];
        this.sentenceRecordIsAdded(key + 1, count, 4);
      }

      this.criminalCaseService.closeSentenceTab();
    }
  }

  /**
   * scenario 1
   */
  enterACaseWith2MisdemeanorCharges() {
    this.scenario = "scenario1";
    this.genericEnterMultipleCountsForCase(
      new ThingsToDo(
        true, //enter a case
        true, //dispose
        false //sentence
      )
    );
  }
  enterCaseInformationOnTab1() {
    //done with enterACaseWith2MisdemeanorCharges
  }

  clickOnTab2ToEnterSecondChargeInformation() {
    //done with enterACaseWith2MisdemeanorCharges
  }

  clickSaveAndDispose() {
    //done with enterACaseWith2MisdemeanorCharges
  }

  /**
   * Pickup w/ 1st scenario
   */
  clickCriminalDispositionMenu() {
    this.scenario = "scenario1";
    this.readRunTimeFile();
    cy.login();
    this.criminalCaseActions.selectCriminalFromLeftSideMenu();
  }

  clickOnTheCount1TabToShowTheCharge() {
    //count 1 is shown by default
    this.criminalCaseService.disposeCase();
  }

  clickTheAmendChargeButton() {
    this.criminalCaseActions.clickAmendChargeButton();
  }

  aNewWindowWillOpenToEnterTheAmendedInformationInto() {
    this.criminalCaseActions.amendedChargeWindowShouldHaveTitle(
      `Add Amended Count for ${jsonHandler.getValue(
        this.scenario,
        "counts",
        "first",
        "charge"
      )}`
    );
  }

  enterInfractionChargeInTheAmendedMissouriChargeField() {
    this.criminalCaseActions.amendedChargeWindow_amendedMissouriCharge(
      `${jsonHandler.getValue(
        this.scenario,
        "counts",
        "first",
        "amendedCharge"
      )}`
    );
  }

  additionalInformationWillAutofillInTheRemainingFields() {
    this.criminalCaseActions.amendedChargeWindow_amendedMissouriChargeDescriptionShouldBe(
      jsonHandler.getValue(
        this.scenario,
        "counts",
        "first",
        "amendedChargeDesc"
      )
    );
  }

  clickSaveOnAmendedChargeDialog() {
    this.criminalCaseActions.amendedChargeWindow_clickSaveButton();
  }

  greenNotyWillApearConfirmingChanges() {
    this.utils.clearNotyMessages();
  }

  chargeInformationOnCount1WillChangeToNewAmendedInformationEnteredWithAFine() {
    throw new Error("missing implementation");
  }

  clickSaveOnDispositionPage() {
    this.criminalCaseActions.clickSaveButtonOnDispositionPage();
  }

  userWillReceiveAMessageAsking(option0) {}

  clickNo() {
    throw new Error("missing implementation");
  }

  clickApplyDispositionToMultipleChargesButton() {
    throw new Error("missing implementation");
  }

  aNewWindowWillOpenToApplyDisposition() {
    throw new Error("missing implementation");
  }

  click(option0) {
    throw new Error("missing implementation");
  }

  checkmarksWillAppearNextToEachCount() {
    throw new Error("missing implementation");
  }

  clickTheDropDownArrowInTheChargeDispositionField() {
    throw new Error("missing implementation");
  }

  aListOfDispositionsWillAppear() {
    throw new Error("missing implementation");
  }

  selectDDGTP() {
    throw new Error("missing implementation");
  }

  dDGTPGuiltyPleaWillAppearInTheChargeDispositionField() {
    throw new Error("missing implementation");
  }

  dispositionDateWillAutofillWithTheCurrentDate() {
    throw new Error("missing implementation");
  }

  timeWillAutofillWithTheCurrentTime() {
    throw new Error("missing implementation");
  }

  clickOnTheCalendar() {
    throw new Error("missing implementation");
  }

  userWillBeAbleToSelectADifferentDate() {
    throw new Error("missing implementation");
  }

  timeFieldWillHighlightSoUserHasTheAbilityToChooseADifferentTime() {
    throw new Error("missing implementation");
  }

  enterInTheDFTAttyMOBARField() {
    throw new Error("missing implementation");
  }

  aListOfPossibleAttorneyWillAppear() {
    throw new Error("missing implementation");
  }

  selectAttorney() {
    throw new Error("missing implementation");
  }

  fullMOBARNumberWillAppearInTheDFTAttyMOBARField() {
    throw new Error("missing implementation");
  }

  count1WillBeSavedAsTheAmendedChargeWithACodeOfXMRTA() {
    throw new Error("missing implementation");
  }

  clickTheAddSentenceButtonInTheSentenceProgramsAndJudgmentsSection() {
    throw new Error("missing implementation");
  }

  windowWillOpenToEnterFineAmount() {
    throw new Error("missing implementation");
  }

  enterFineAmountInEachCharge() {
    throw new Error("missing implementation");
  }

  clickProcessContinuationButton() {
    throw new Error("missing implementation");
  }

  selectManasgeAssessments() {
    throw new Error("missing implementation");
  }

  newTabWillOpenInManageAssessmentsFunction() {
    throw new Error("missing implementation");
  }

  clickDiscIconInTheFineDescriptionFieldOfCount1ToSaveIt() {
    throw new Error("missing implementation");
  }

  clickDiscIconInTheFineDescriptionFieldOfCount2ToSaveIt() {
    throw new Error("missing implementation");
  }

  clickTheDropdownArrowNextToTheSelectStandardCostDocketCodeFiledAndTheAssessCostSection() {
    throw new Error("missing implementation");
  }

  selectXMRTA() {
    throw new Error("missing implementation");
  }

  xMRTAWillBeAvailableInTheDropdownList() {
    throw new Error("missing implementation");
  }

  /**
   * scenario 2
   */
  caseWithFelonyChargeAndAnInfractionChargeHasBeenDisposedAsGuiltyPleaAndBeenSentenced() {
    this.scenario = "scenario2";
    this.genericEnterMultipleCountsForCase(new ThingsToDo(true, true, true));
  }

  /**
   * scenario 2 continuation
   */
  continueWithScenarioFelonyChargeAndInfractionChargeNonViolationsBureau() {
    this.scenario = "scenario2";
  }

  clickOnFinancialFromTheBusinessProcessMenu() {
    this.readRunTimeFile();
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

    let keys = Object.keys(globalThis.fixture[this.scenario]["counts"]);

    let fineAmount = 0;
    for (var key = 0; key < keys.length; key++) {
      let count = keys[key];
      fineAmount += parseFloat(
        jsonHandler.getValue(this.scenario, "counts", count, "fineAmount")
      );
    }

    if (fineAmount > 0) {
      this.manageAssessmentsActions.validateFineBalanceDue(
        fineAmount.toString()
      );
    }
  }

  anyPendingCostsDisplayWithADiscNextToTheCostDescription() {
    this.manageAssessmentsActions.validatePendingCostsDisplayWithADiskNextToTheCostDescription(
      jsonHandler.getValue(this.scenario, "pendingCostsLength")
    );

    let keys = Object.keys(globalThis.fixture[this.scenario]["counts"]);

    let fineAmountLength = 0;

    for (var key = 0; key < keys.length; key++) {
      let count = keys[key];
      fineAmountLength += parseInt(
        jsonHandler.getValue(this.scenario, "counts", count, "fineAmountLength")
      );
    }

    if (fineAmountLength > 0) {
      this.manageAssessmentsActions.validateFineCostsWithADiskNextToFineDescription(
        fineAmountLength
      );
    }
  }

  directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFRTC() {
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

  theDiscNextToTheCostDescriptionDisappears() {
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

  caseWithAFelonyChargeAndAnInfractionCharge() {
    throw new Error("missing implementation");
  }

  /**
   * Scenario: Manage Assessments pull standard costs for dismissed felony charge and fully disposed/sentenced Misdemeanor charge  - Non violations bureau
   */
  caseWithAFelonyChargeAndAMisdemeanorCharge() {
    throw new Error("missing implementation");
  }

  enterChargeInformationOnTab1() {
    throw new Error("missing implementation");
  }

  /**
   * Scenario: Validate Misdemeanor charge non violations bureau
   */
  userIsInCourtDispositionFunctionInSMC() {
    throw new Error("missing implementation");
  }

  clickOnTab2() {
    throw new Error("missing implementation");
  }

  enterSecondChargeInformation() {
    throw new Error("missing implementation");
  }

  clickChooseActionButton() {
    throw new Error("missing implementation");
  }

  clickDropDownNextToJudgeAssignmentAndSelectJudge() {
    throw new Error("missing implementation");
  }

  dispositionSectionIsAvailableAtBottomOfTheEnterACaseProcess() {
    throw new Error("missing implementation");
  }

  clickToExpandDispositionSection() {
    throw new Error("missing implementation");
  }

  clickOnCount1TabToMakeActive() {
    throw new Error("missing implementation");
  }

  clickDropDownNextToChargeDisposition() {
    throw new Error("missing implementation");
  }

  selectDDCTFromTheDropDownList() {
    throw new Error("missing implementation");
  }

  clickOnCount2TabToMakeActive() {
    throw new Error("missing implementation");
  }

  selectDDGTPFromTheDropDownList() {
    throw new Error("missing implementation");
  }

  clickSave() {
    throw new Error("missing implementation");
  }

  openCriminalSentenceProgramsFromTheBPM() {
    throw new Error("missing implementation");
  }

  searchForCase() {
    throw new Error("missing implementation");
  }

  clickAddSentenceButton() {
    throw new Error("missing implementation");
  }

  guiltyDispositionWindowOpensAndCount2IsVisible() {
    throw new Error("missing implementation");
  }

  enterFineAmount() {
    throw new Error("missing implementation");
  }

  xMRTAShouldBeAvailableInTheDropDownList() {
    throw new Error("missing implementation");
  }
}
