import CriminalCaseActions from "./CriminalCaseActions";
import jsonHandler from "../../../../fixtures/jsonHandler";
import Utils from "../../../utils/utils";
import currentFunction from "current-function";

export default class CriminalCaseService {
  constructor() {
    this.criminalCaseActions = new CriminalCaseActions();
    this.utils = new Utils();
  }
  /**
   * standard boiler plate for creating case
   */
  createGenericCase(
    scenario,
    defendant,
    tempFileName,
    skipDispose,
    skipSentence
  ) {
    this.setupCriminal(
      defendant,
      jsonHandler.getValue("defaults", "courtCode"),
      jsonHandler.getValue(scenario, "caseType"),
      jsonHandler.getValue("defaults", "arrestingAgencyORI")
    );

    this.addProsecutingAttorneyToCase(
      jsonHandler.getValue("defaults", "prosecutingAttorneyCode"),
      jsonHandler.getValue("defaults", "prosecutingAttorneyName")
    );

    this.addDocket(
      "AINFO", //docketDescription
      this.utils.formatDate(new Date()) //docketDate
    );

    this.addCount(
      this.utils.oneMonthAgo(), //dateOfViolation
      "10:00", //timeOfViolation
      "Here and there", //location
      this.utils.caseTicketNumber(
        jsonHandler.getValue(scenario, "nonConservationTicket") //ticketNumber
      ),
      jsonHandler.getValue(scenario, "charge"), //charge
      this.utils.randomNumeric(8) //ocn
    );

    this.saveCase(defendant, tempFileName);

    this.assignJudge(
      jsonHandler.getValue("defaults", "caseJudgeAssignment"), //judge
      this.utils.getValidDateForSchedulingStartingFromNow(7), //eventDate
      "10:10", //eventTime
      jsonHandler.getValue("defaults", "judgeEventRoom")
    );

    if (skipDispose) {
      return;
    }

    this.disposeCase();

    this.enterPleaForCount(jsonHandler.getValue(scenario, "plea"));

    this.closeDisposition();

    if (skipSentence) {
      return;
    }

    cy.get("@defendant").then((defendant) => {
      this.addSentenceDialog(defendant);

      this.addSentenceFine(0, jsonHandler.getValue(scenario, "fineAmount"));
      this.verifyAddedSentenceFine(
        jsonHandler.getValue(scenario, "fineAmount"),
        jsonHandler.getValue(scenario, "charge"),
        jsonHandler.getValue(scenario, "chargeDesc")
      );
      this.closeSentenceTab();
    });
  }
  /**
   *
   * @param {*} defendant
   * @param {*} courtCode
   * @param {*} caseType
   * @param {*} arrestingAgencyORI
   */
  setupCriminal(defendant, courtCode, caseType, arrestingAgencyORI) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    this.criminalCaseActions.validUserSelectsEnterACase();
    this.criminalCaseActions.lastName(defendant.lastName);
    this.criminalCaseActions.firstName(defendant.firstName);
    this.criminalCaseActions.dlState(defendant.dlState);
    this.criminalCaseActions.dlNumber(defendant.dlNumber);
    this.utils.clearNotyMessages();
    this.criminalCaseActions.expandDemographicsSection();
    this.criminalCaseActions.dateOfBirth(defendant.birthDate);
    this.criminalCaseActions.ssn(defendant.ssn);
    this.criminalCaseActions.setSex(defendant.sex);
    this.utils.clearNotyMessages();
    this.criminalCaseActions.expandAddressSection();
    this.criminalCaseActions.streetAddress(defendant.street);
    this.criminalCaseActions.enterCity(defendant.city);
    this.criminalCaseActions.enterZipCode(defendant.zip);
    this.criminalCaseActions.saveDefendant();
    this.utils.clearNotyMessages();
    this.criminalCaseActions.allDefendantInfoIsGrayedOut();

    this.criminalCaseActions.caseDetailsSectionIsNowEnabled();
    this.utils.clearNotyMessages();

    //Case
    this.criminalCaseActions.inTheCaseTabSelectDefaultCourtLocation(courtCode);
    this.criminalCaseActions.clickCaseTypeDropDownAndSelectCaseType(caseType);
    this.criminalCaseActions.enterArrestingAgencyORI(arrestingAgencyORI);
    this.criminalCaseActions.enterFilingDate(this.utils.formatDate(new Date()));
  }

  addProsecutingAttorneyToCase(
    prosecutingAttorneyCode,
    prosecutingAttorneyName
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseActions.clickToAddPAOfRecord();
    this.criminalCaseActions.clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney(
      "APA"
    );

    //Attorey
    this.criminalCaseActions.inProsecutingAttorneyTextFieldEnterCodeAndSelectName(
      prosecutingAttorneyCode,
      prosecutingAttorneyName
    );

    this.criminalCaseActions.clickToSaveClose();
    this.utils.clearNotyMessages();

    this.criminalCaseActions.partyIsListedInProsecutingAttorneyField(
      prosecutingAttorneyCode,
      prosecutingAttorneyName
    );
  }

  addDocket(docketDescription, docketDate) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //docket
    this.criminalCaseActions.clickDocketDestriptionDropDownAndSelectInformationFiled(
      docketDescription
    );
    this.criminalCaseActions.enterDocketDate(docketDate);
  }

  addCount(
    dateOfViolation,
    timeOfViolation,
    location,
    ticketNumber,
    charge,
    ocn
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //Count
    this.criminalCaseActions.enterDateOfViolation(dateOfViolation);
    this.criminalCaseActions.enterDateOfViolationTimeAs(timeOfViolation);
    this.criminalCaseActions.enterLocation(location);
    this.criminalCaseActions.enter9DigitTicketNumber(ticketNumber);
    this.criminalCaseActions.inMissouriChargeFieldEnterAndSelectCharge(charge);
    this.criminalCaseActions.enter8DigitOCN(ocn);
  }
  /**
   * saves case
   * wraps the defendant as defendant
   * @param {} defendant
   * @param {*} fileName
   */
  saveCase(defendant, fileName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseActions.clickChooseActionButton();
    this.criminalCaseActions.saveCase((caseId) => {
      defendant.caseId = caseId;
      defendant.fileDate = this.utils.formatDate(new Date());
      cy.writeFile(fileName, {
        defendant: defendant,
      });
      cy.wrap(defendant).as("defendant");
    });

    this.utils.clearNotyMessages();
    cy.get("@defendant").then((defendant) => {
      cy.log(`manage assesssment caseId ${defendant.caseId}`);
    });
  }

  assignJudge(judge, eventDate, eventTime, eventRoom) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseActions.caseJudgeAssignmentDialogDisplays();
    this.criminalCaseActions.selectAManualJudge(judge);
    this.criminalCaseActions.withCaseJudgeEnteredClick();
    this.utils.clearNotyMessages();
    this.criminalCaseActions.enterFutureEventDateAndTime(eventDate, eventTime);

    this.criminalCaseActions.selectEventJudge(judge);
    this.criminalCaseActions.selectRoom(eventRoom);
    this.criminalCaseActions.saveEvent();
    this.utils.clearNotyMessages();
    this.criminalCaseActions.closeCriminalCaseTab();
  }
  /**
   * uses the @defendant from saveCase
   * @param {} scenario
   */
  disposeCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //Dispose the case
    this.criminalCaseActions.selectCourtDisposition();
    this.criminalCaseActions.selectTheCaseIDRadioButton();

    cy.get("@defendant").then((defendant) => {
      this.criminalCaseActions.inTheMySearchFieldEnterTheCaseIDAndClickTheMagnifyingGlass(
        defendant.caseId
      );
    });

    this.utils.clearNotyMessages();
    cy.get("@defendant").then(($defendant) => {
      this.criminalCaseActions.theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails(
        $defendant
      );
    });
  }

  /**
   *
   * @param {*} plea
   * @param {*} pleaOnly - if present and true, only set the plea, otherwise save
   * @returns
   */
  enterPleaForCount(plea, pleaOnly) {
    cy.log(
      `---------------------------------------------------${currentFunction()} plea: ${plea} pleaOnly: ${pleaOnly}`
    );
    this.criminalCaseActions.clickChargeDispositionDropDownAndSelectPlea(plea);

    if (pleaOnly) {
      return;
    }

    this.criminalCaseActions.clickSaveButtonOnDispositionPage();
    this.utils.clearNotyMessages();

    cy.get("@defendant").then((defendant) => {
      this.criminalCaseActions.inCourtDispositionEventClosurePopupBoxClickToSave(
        defendant.caseId
      );
    });
  }

  closeDisposition() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("body").then(($ele) => {
      cy.wrap("").as("fineAmount");
      if ($ele.find("[id^=fineAmount_]").length > 0) {
        cy.get("[id^=fineAmount_]").then(($fineAmount) => {
          cy.wrap($fineAmount[0].value).as("fineAmount");
        });
      }
    });

    this.criminalCaseActions.clickTheXNextToCourtDisposition();
    this.criminalCaseActions.courtDispositionTabCloses();
  }

  /**
   *
   * @param {*} defendant
   */
  addSentenceDialog(defendant) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // Add sentence
    this.criminalCaseActions.selectSentenceProgramsFromLeftSideMenu();
    this.criminalCaseActions.selectCaseIDRadioButtonIfNotAlreadySelected();
    this.criminalCaseActions.inTheMySearchFieldEnterTheCaseID(defendant.caseId);

    this.utils.clearNotyMessages();
    this.criminalCaseActions.inSentenceSectionClickToAddSentence();
  }
  /**
   *
   * @param {*} countNum
   * @param {*} fineAmount
   */
  addSentenceFine(countNum, fineAmount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (fineAmount) {
      this.criminalCaseActions.inFineFieldForCountEnterTESTFineAmount(
        countNum,
        fineAmount
      );
    }
  }
  verifyAddedSentenceFine(
    fineAmount,
    charge,
    chargeDesc,
    sentencedToFineAmount
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.criminalCaseActions.clickToSave();
    this.utils.clearNotyMessages();

    if (fineAmount) {
      this.criminalCaseActions.sentenceRecordIsAddedToTheSentenceSection(
        `${charge}${chargeDesc}`,
        `Defendant sentenced to Fine $${fineAmount}`,
        2
      );
    } else {
      if (sentencedToFineAmount) {
        this.criminalCaseActions.sentenceRecordIsAddedToTheSentenceSection(
          `${charge}${chargeDesc}`,
          `Defendant sentenced to Fine $${sentencedToFineAmount}`,
          2
        );
      } else {
        this.criminalCaseActions.sentenceRecordIsAddedToTheSentenceSection(
          `${charge}${chargeDesc}`,
          null,
          2
        );
      }
    }
  }
  closeSentenceTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //Close the tab
    this.criminalCaseActions.clickTheXNextToCriminalSentencePrograms();
  }
  /**
   * uses @defendant from saveCase
   * @param {*} scenario
   */
  addFelonySentenceWithSISAndProbation(
    scenario,
    probationDuration,
    probationType
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // Add sentence
    this.criminalCaseActions.selectSentenceProgramsFromLeftSideMenu();
    this.criminalCaseActions.selectCaseIDRadioButtonIfNotAlreadySelected();
    cy.get("@defendant").then((defendant) => {
      this.criminalCaseActions.inTheMySearchFieldEnterTheCaseID(
        defendant.caseId
      );
    });
    this.utils.clearNotyMessages();
    this.criminalCaseActions.inSentenceSectionClickToAddSentence();

    this.criminalCaseActions.criminalSentanceSISClick();
    this.criminalCaseActions.criminalSentenceProbationDuration(
      probationDuration
    );
    this.criminalCaseActions.criminalSentenceProbationUnit(probationType);

    this.criminalCaseActions.clickToSave();
    this.utils.clearNotyMessages();
    this.criminalCaseActions.boxCloses();
    this.criminalCaseActions.sentenceRecordIsAddedToTheSentenceSection(
      `${jsonHandler.getValue(scenario, "charge")}${jsonHandler.getValue(
        scenario,
        "chargeDesc"
      )}`,
      null,
      2
    );

    //Close the tab
    this.criminalCaseActions.clickTheXNextToCriminalSentencePrograms();
  }

  changeCriminalCaseStatusToSpecificChargeDispostion(chargeDisposition) {
    this.disposeCase();
    this.criminalCaseActions.clickChargeDispositonDropDownandSelectChargeDispositionValue(
      chargeDisposition
    );
    this.criminalCaseActions.clickSaveButtonOnDispositionPage();
    this.utils.clearNotyMessages();

    cy.get("@defendant").then((defendant) => {
      this.criminalCaseActions.inCourtDispositionEventClosurePopupBoxClickToSave(
        defendant.caseId
      );
    });
    this.closeDisposition();
  }
}
