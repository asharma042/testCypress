/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import CaseImportElements from "./CaseImportElements";
import currentFunction from "current-function";
import jsonHandler from "../../../../fixtures/jsonHandler";
export default class CaseImportActions {
  constructor(tempFileName) {
    if (!tempFileName) {
      throw new Error("TempFileName is required");
    }
    this.tempFileName = tempFileName;
    this.ciElements = new CaseImportElements();
  }
  readRunTimeFile() {
    var that = this;
    this.utils = new Utils();
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }

  useCaseCreatedWithPAPortal(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.readRunTimeFile();
    cy.login();
    this.scenario = scenario;
  }

  clickOnCaseImportFromCaseProcessing() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickLink("Case Processing");
    cy.clickMenu("Case Import");
  }

  enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($case) => {
      let filingRef;
      if ($case.hasOwnProperty("filingNumber")) {
        filingRef = $case.filingNumber;
      } else if ($case.hasOwnProperty("confirmationNumber")) {
        filingRef = $case.confirmationNumber;
      }

      this.ciElements.getFilingRefInput().type(`${filingRef}`);
    });
  }

  caseIDOrFilingReferenceNumberHasBeenEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($case) => {
      let filingRef;
      if ($case.hasOwnProperty("filingNumber")) {
        filingRef = $case.filingNumber;
      } else if ($case.hasOwnProperty("confirmationNumber")) {
        filingRef = $case.confirmationNumber;
      }

      this.ciElements.getFilingRefInput().then(($ele) => {
        expect($ele[0].value, `Filing Ref should be ${filingRef}`).to.equal(
          filingRef
        );
      });
    });
  }

  pressApplyButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciElements.getApplyButton().click();
  }

  caseAppearsInResults(times = 0) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (times > 20) {
      throw new Error("caseAppearsInResults called more than 20 times");
    }
    cy.get("@case").then(($case) => {
      let filingRef;

      if ($case.hasOwnProperty("filingNumber")) {
        filingRef = $case.filingNumber;
        let firstName = $case.defendant.firstName;
        let lastName = $case.defendant.lastName;
        this.ciElements.getResultsTable().then(($ele) => {
          if ($ele[0].tBodies[0].rows.length === 0) {
            cy.wait(2000);
            this.ciElements.getApplyButton().click();
            this.caseAppearsInResults(times + 1);
          }
          cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);
          cy.wrap($ele[0]).contains("td", filingRef);

          cy.wrap($ele[0]).contains("td", firstName.toUpperCase());
          cy.wrap($ele[0]).contains("td", lastName.toUpperCase());
        });
      } else if ($case.hasOwnProperty("confirmationNumber")) {
        filingRef = $case.confirmationNumber;
        this.ciElements.getResultsTable().then(($ele) => {
          cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);
          cy.wrap($ele[0]).contains("td", filingRef);
        });
      }
    });
  }

  caseInfoSectionDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  validateMunicipalLocation(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (scenario) {
      this.scenario = scenario;
    }
    let filingLocation = jsonHandler.getValue(this.scenario, "filingLocation");
    cy.log(`filingLocation: ${filingLocation}`);

    this.ciElements
      .getCourtLocationButton()
      .contains(filingLocation.toUpperCase());
  }

  validateFilingDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($case) => {
      let filingDate = $case.filingDate;
      this.ciElements.getFilingDate().then(($ele) => {
        expect(
          $ele.val() === filingDate,
          `Filing Date should be '${filingDate}'`
        ).to.be.true;
      });
    });
  }

  validateTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciElements.getFilingTime().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  validateCaseType(scenario) {
    if (scenario) {
      this.scenario = scenario;
    }
    let caseType = jsonHandler.getValue(this.scenario, "caseType");
    this.ciElements.getCaseType().then(($ele) => {
      expect($ele.val() === caseType, `Case Type should be ${caseType}`).to.be
        .true;
    });
  }

  validateMilestone(scenario) {
    if (scenario) {
      this.scenario = scenario;
    }
    let milestone = jsonHandler.getValue(this.scenario, "milestone");
    this.ciElements.getMilestone().then(($ele) => {
      expect(
        $ele.text().trim() === milestone,
        `Milestone should be ${milestone}`
      ).to.be.true;
    });
  }

  validateStyleOfCase() {
    let styleOfCase = `ST V ${this.case.defendant.firstName.toUpperCase()}  ${this.case.defendant.lastName.toUpperCase()}`;
    this.ciElements.getStyleOfCase().then(($ele) => {
      expect(
        $ele[0].value === styleOfCase,
        `Sytle of Case should be ${styleOfCase}`
      ).to.be.true;
    });
  }

  validateAgency(scenario) {
    if (scenario) {
      this.scenario = scenario;
    }
    let agency = jsonHandler.getValue(this.scenario, "agency");
    this.ciElements.getAgency().then(($ele) => {
      expect($ele.val() === agency, `Agency should be '${agency}'`).to.be.true;
    });
  }

  validateCaseSecurity(scenario) {
    if (scenario) {
      this.scenario = scenario;
    }
    let caseSecurity = jsonHandler.getValue(this.scenario, "caseSecurity");
    this.ciElements.getCaseSecurity().then(($ele) => {
      expect(
        $ele[0].value === caseSecurity,
        `Case Security should be ${caseSecurity} but found '${$ele[0].value.trim()}'`
      ).to.be.true;
    });
  }

  validateLastName() {
    this.ciElements.getPartyLastName().then(($ele) => {
      expect(
        $ele[0].value === this.case.defendant.lastName.toUpperCase(),
        `Last Name should be ${this.case.defendant.lastName.toUpperCase()}`
      );
    });
  }

  validateFirstName() {
    this.ciElements.getPartyFirstName().then(($ele) => {
      expect(
        $ele[0].value === this.case.defendant.firstName.toUpperCase(),
        `First Name should be ${this.case.defendant.firstName.toUpperCase()}`
      );
    });
  }

  validateDateOfBirth() {
    this.ciElements.getPartyDateOfBirth().then(($ele) => {
      expect(
        $ele[0].value === this.case.defendant.birthDate,
        `Birthdate should be ${this.case.defendant.birthDate}`
      ).to.be.true;
    });
  }

  validateStreetAddress() {
    this.ciElements.getPartyStreetAddress().then(($ele) => {
      expect(
        $ele[0].value === this.case.defendant.street.toUpperCase(),
        `Street should be ${this.case.defendant.street.toUpperCase()}`
      ).to.be.true;
    });
  }

  validateCity() {
    this.ciElements.getPartyCity().then(($ele) => {
      expect(
        $ele[0].value === this.case.defendant.city.toUpperCase(),
        `City should be ${this.case.defendant.city.toUpperCase()}`
      ).to.be.true;
    });
  }

  validateZipCode() {
    this.ciElements.getPartyZip().then(($ele) => {
      expect(
        $ele[0].value === this.case.defendant.zip,
        `Zip should be ${this.case.defendant.zip}`
      ).to.be.true;
    });
  }

  pressChargeTab() {
    this.ciElements.getChargeTab().click();
  }

  validateDateOfViolation() {
    this.ciElements.getDateOfViolation().then(($ele) => {
      expect(
        $ele[0].value === this.case.dateOfViolation,
        `Date of Violation should be ${this.case.dateOfViolation}`
      ).to.be.true;
    });
  }

  validateViolationTime() {
    this.ciElements.getTimeOfViolation().then(($ele) => {
      expect(
        $ele[0].value === this.case.timeOfViolation,
        `Time of Violation should be ${this.case.timeOfViolation}`
      ).to.be.true;
    });
  }

  validateLocation() {
    this.ciElements.getLocation().then(($ele) => {
      expect(
        $ele[0].value === this.case.countLocation,
        `Count Location should be ${this.case.countLocation}`
      ).to.be.true;
    });
  }

  validateTicketNumber() {
    this.ciElements.getTicketNumber().then(($ele) => {
      expect(
        $ele[0].value === this.case.ticketNo,
        `TicketNo should be ${this.case.ticketNo}`
      ).to.be.true;
    });
  }

  validateMissouriChargeNumber() {
    this.ciElements.getMissouriCharge().then(($ele) => {
      expect(
        $ele[0].value === this.case.charge,
        `Charge should be ${this.case.charge}`
      ).to.be.true;
    });
  }

  pressDocketTab() {
    this.ciElements.getDocketTab().click();
  }

  expandDocketEntrysRow() {
    this.ciElements.getDocketTableExpandIcon().click();
  }

  validateDocketSequence() {
    let docketSequence = jsonHandler.getValue(this.scenario, "docketSequence");
    this.ciElements.getDocketSequence().then(($ele) => {
      expect(
        $ele[0].value === docketSequence,
        `Docket Sequence should be ${docketSequence}`
      ).to.be.true;
    });
  }

  validateDocketCode() {
    let docketCodeDescription = jsonHandler.getValue(
      this.scenario,
      "docketCodeDescription"
    );
    this.ciElements.getDocketCode().then(($ele) => {
      expect(
        $ele[0].textContent.trim() === docketCodeDescription,
        `Docket Code Description should be ${docketCodeDescription}`
      ).to.be.true;
    });
  }

  validateFiledBy() {
    let filedBy = `${jsonHandler
      .getValue(this.scenario, "filedBy")
      .toUpperCase()} (PA)`;
    this.ciElements.getFiledBy().then(($ele) => {
      expect(
        $ele[0].innerText.trim() === filedBy,
        `Filed By should be '${filedBy}' but found '${$ele[0].innerText.trim()}'`
      ).to.be.true;
    });
  }

  validateDocumentNumber() {
    let documentNumber = jsonHandler.getValue(this.scenario, "documentNumber");
    this.ciElements.getDocumentNumber().then(($ele) => {
      expect(
        $ele.val() === documentNumber,
        `Document Number should be ${documentNumber}`
      ).to.be.true;
    });
  }

  validateDocumentTitle() {
    let documentTitle = jsonHandler.getValue(this.scenario, "documentTitle");
    this.ciElements.getDocumentTitle().then(($ele) => {
      expect(
        $ele[0].value === documentTitle,
        `Document title should be ${documentTitle}`
      ).to.be.true;
    });
  }

  closeTab() {
    this.ciElements.getTabCloseIcon().click();
  }

  expandCaseRowInTable() {
    cy.intercept("smc-web/getCountiresList*").as("getCountiresList");
    cy.intercept("smc-web/getSeatbeltCodes*").as("getSeatbeltCodes");
    cy.intercept("smc-web/getMinorTrafficInd*").as("getMinorTrafficInd");
    cy.intercept("smc-web/getSelectPickerSearchStylePreference*").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/getStatesByCountry*").as("getStatesByCountry");
    cy.intercept("smc-web/validateCaseImportPerson*").as(
      "validateCaseImportPerson"
    );

    this.ciElements.getResultsRowExpandIcon().click();

    cy.wait([
      "@getCountiresList",
      "@getSeatbeltCodes",
      "@getMinorTrafficInd",
      "@getSelectPickerSearchStylePreference",
      "@getStatesByCountry",
      "@validateCaseImportPerson",
    ]);
  }

  pressChooseActionButton() {
    this.ciElements.getChooseActionButton().click();
  }

  correctActionsDisplay() {
    //no op
  }

  selectAcceptOption() {
    //eventually this will change to accept -> window appears -> click ok
    //at this time, the enter key causes the popup dialog to accept Yes
    this.ciElements.getChooseActionButtonInput().type(`accept`);
    this.ciElements.chooseActionItemAccept().click();
  }

  acceptFilingWindowDisplays() {
    this.ciElements.getSmartAlertTitle().then(($ele) => {
      expect($ele[0].textContent.trim() === "Accept Filing").to.be.true;
    });
  }

  pressYes() {
    cy.intercept("smc-web/validateCaseImportCaseTypeByCharges*").as(
      "validateCaseImportCaseTypeByCharges"
    );
    cy.intercept("smc-web/validateCaseImportCharge*").as(
      "validateCaseImportCharge"
    );
    cy.intercept("smc-web/validateCaseImportPerson*").as(
      "validateCaseImportPerson"
    );
    cy.intercept("smc-web/validateCaseImportDemographics*").as(
      "validateCaseImportDemographics"
    );
    cy.intercept("smc-web/validateCaseImportAddress*").as(
      "validateCaseImportAddress"
    );
    cy.intercept("smc-web/validateCaseImportCase*").as(
      "validateCaseImportCase"
    );
    cy.intercept("smc-web/validateCaseImportDocket*").as(
      "validateCaseImportDocket"
    );
    cy.intercept("smc-web/caseimportPaPartyExists*").as(
      "caseimportPaPartyExists"
    );
    cy.intercept("smc-web/validateCaseAddtnlInfo*").as(
      "validateCaseAddtnlInfo"
    );
    cy.intercept("smc-web/acceptCaseImportCase*").as("acceptCaseImportCase");

    cy.intercept("smc-web/getJudgeMobars*").as("getJudgeMobars");
    cy.intercept("smc-web/populateJudgePartyTypes*").as(
      "populateJudgePartyTypes"
    );
    cy.intercept("smc-web/getCalendarType*").as("getCalendarType");
    cy.intercept("smc-web/getEventsCodesWithCaseTypes*").as(
      "getEventsCodesWithCaseTypes"
    );
    cy.intercept("smc-web/getLanguages*").as("getLanguages");
    cy.intercept("smc-web/getDocketEntryEventRooms*").as(
      "getDocketEntryEventRooms"
    );
    cy.intercept("smc-web/getAllJudgesAvailable*").as("getAllJudgesAvailable");
    cy.intercept("smc-web/getSelectPickerSearchStylePreference*").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.ciElements.getSmartAlertYesButton().click();

    cy.wait([
      "@validateCaseImportCaseTypeByCharges", //0
      "@validateCaseImportCharge", //1
      "@validateCaseImportPerson", //2
      "@validateCaseImportDemographics", //3
      "@validateCaseImportAddress", //4
      "@validateCaseImportCase", //5
      "@validateCaseImportDocket", //6
      "@caseimportPaPartyExists", //7
      "@validateCaseAddtnlInfo", //8
      "@acceptCaseImportCase", //9
      "@getJudgeMobars",
      "@populateJudgePartyTypes",
      "@getCalendarType",
      "@getEventsCodesWithCaseTypes",
      "@getLanguages",
      "@getDocketEntryEventRooms",
      "@getAllJudgesAvailable",
      "@getSelectPickerSearchStylePreference",
      "@saveUserNotyMessages",
    ]).then(($results) => {
      this.case.caseId = $results[9].response.body.smcCaseId;
      cy.writeFile(this.tempFileName, {
        case: this.case,
      });
    });
  }

  assignJudgeScheduleEventWindowDisplays() {
    this.ciElements.getScheduleJudgeDialogTitle().then(($ele) => {
      let title = `Assign Judge/Schedule Event - Case ${this.case.caseId}`;
      let existingTitle = $ele[0].textContent.trim();
      expect(
        existingTitle === title,
        `Title should be ${title} but found ${existingTitle} `
      ).to.be.true;
    });
  }

  changeProratedDropdownToManualJudge() {
    this.ciElements.getScheduleJudgeProratedOrManualButton().click();
    this.ciElements.getScheduleJudgeProratedOrManualOptionManual().click();
  }

  selectCypressJudge() {
    let judgeSearch = jsonHandler.getValue(this.scenario, "judgeSearch");
    this.ciElements
      .getScheduleJudgeAssignmentInput()
      .type(`${judgeSearch}{enter}`);
  }

  pressSelectJudgeButton() {
    cy.intercept("smc-web/validateJudgeAndParty*").as("validateJudgeAndParty");
    cy.intercept("smc-web/saveAssignJudge*").as("saveAssignJudge");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.ciElements.getScheduleJudgeSelectJudgeButton().click();

    cy.wait([
      "@validateJudgeAndParty",
      "@saveAssignJudge",
      "@saveUserNotyMessages",
    ]);

    this.utils.clearNotyMessages();

    let judge = jsonHandler.getValue(this.scenario, "judge");
    this.ciElements.getScheduleJudgeAssignmentButton().then(($ele) => {
      expect($ele[0].textContent.trim() === judge, `Judge should be '${judge}'`)
        .to.be.true;
    });
  }

  enterEventDescription() {
    let eventDescription = jsonHandler.getValue(
      this.scenario,
      "eventDescription"
    );

    this.ciElements.getScheduleJudgeEventDescription().then(($ele) => {
      expect(
        $ele[0].textContent.trim() === eventDescription,
        `Event Description should be '${eventDescription}'`
      );
    });
  }

  eventDescriptionSelected() {
    // no op
  }
  enterFutureEventDate() {
    let randomNumber = this.utils.generateRandomNumberBetween(10, 50);

    this.futureDate =
      this.utils.getValidDateForSchedulingStartingFromNow(randomNumber);

    this.ciElements
      .getScheduleJudgeEventDate()
      .focus()
      .type(`${this.futureDate}{enter}`);

    this.ciElements.getScheduleJudgeEventTime().blur();
  }

  validateEventDate() {
    this.ciElements.getScheduleJudgeEventDate().then(($ele) => {
      expect(
        $ele[0].value === this.futureDate,
        `Event date should be '${this.futureDate}`
      ).to.be.true;
    });
  }

  enterEventTime() {
    this.time = this.utils.formatTime(new Date()).substring(0, 5);
    this.ciElements.getScheduleJudgeEventTime().type(`${this.time}`);
  }

  validateEventTime() {
    this.ciElements.getScheduleJudgeEventTime().then(($ele) => {
      expect($ele[0].value == this.time, `Time should be '${this.time}'`).to.be
        .true;
    });
  }
  enterRoom() {
    this.ciElements.getScheduleJudgeEventRoomButton().click();
    let room = jsonHandler.getValue(this.scenario, "room");
    this.ciElements.getScheduleJudgeEventRoomInput().type(`${room}{enter}`);
  }

  roomSelected() {
    this.ciElements.getScheduleJudgeEventRoomButton().then(($ele) => {
      let room = jsonHandler.getValue(this.scenario, "room");
      expect(
        $ele[0].textContent.trim() === room.toUpperCase(),
        `Room should be '${room}'`
      ).to.be.true;
    });

    this.ciElements.getScheduleJudgeEventRoomLocation().then(($ele) => {
      let roomLocation = jsonHandler.getValue(this.scenario, "roomLocation");
      expect(
        $ele[0].textContent === roomLocation,
        `Room Location should be ${roomLocation}`
      );
    });

    /****
     * TEMP
     */
    this.ciElements.getScheduleJudgeEventJudgeButton().click();
    let judgeSearch = jsonHandler.getValue(this.scenario, "judgeSearch");
    this.ciElements
      .getScheduleJudgeEventJudgeInput()
      .type(`${judgeSearch}{enter}`);
  }

  pressSaveEvent() {
    this.ciElements.getScheduledJudgeEventSaveEventButton().click();
  }

  assignJudgeScheduleEventWindowCloses() {
    //no op
  }
}
