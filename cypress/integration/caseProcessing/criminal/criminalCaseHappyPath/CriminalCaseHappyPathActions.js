/// <reference types="cypress" />
import CriminalCaseHappyPathElements from "./CriminalCaseHappyPathElements";
import jsonHandler from "../../../../fixtures/jsonHandler";
import Utils from "../../../utils/utils.js";
import CriminalCaseActions from "../../../pom/caseProcessing/criminal/CriminalCaseActions";
import ManageAssessmentsActions from "../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsActions";

import Common from "../../../common/Common";
const SET_DEFENDANT = true;
export default class CriminalCaseHappyPathActions {
  constructor() {
    this.criminalCaseHappyPathElements = new CriminalCaseHappyPathElements();
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();
    this.criminalCaseActions = new CriminalCaseActions();
    this.manageAssessmentsActions = new ManageAssessmentsActions();
    this.common = new Common();
    this.tempDefendentFileName = "cypress\\temp\\criminalCaseHappyPath.json";
  }

  readRunTimeFile(setDefendant = false) {
    var that = this;
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempDefendentFileName, function ($json) {
      if ($json) {
        if (setDefendant) {
          that.defendant = $json.defendant;
        }
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }

  validUserSelectsEnterACase() {
    cy.login();
    this.criminalCaseActions.validUserSelectsEnterACase();
  }

  navigateToTheDefendantSection() {}

  enterLastName() {
    this.criminalCaseActions.lastName(this.defendant.lastName);
  }

  enterFirstName() {
    this.criminalCaseActions.firstName(this.defendant.firstName);
  }

  enterDLState() {
    this.criminalCaseActions.dlState(this.defendant.dlState);
  }

  enterDriversLicenseNumber() {
    this.criminalCaseActions.dlNumber(this.defendant.dlNumber);
  }

  expandDemographicsSection() {
    this.criminalCaseActions.expandDemographicsSection();
  }

  enterDateOfBirth() {
    this.criminalCaseActions.dateOfBirth(this.defendant.birthDate);
    this.utils.clearNotyMessages();
  }

  enterSSN() {
    this.criminalCaseActions.ssn(this.defendant.ssn);
  }

  expandAddressSection() {
    this.criminalCaseActions.expandAddressSection();
  }

  enterStreetAddress() {
    this.criminalCaseActions.streetAddress(this.defendant.street);
  }

  enterCity() {
    this.criminalCaseActions.enterCity(this.defendant.city);
  }

  enterZipCode() {
    this.criminalCaseActions.enterZipCode(this.defendant.zip);
  }

  saveDefendant() {
    this.criminalCaseActions.saveDefendant();
  }

  greenNotyStatingDefendantSavedAndAddressSaved() {
    this.utils.clearNotyMessages();
  }

  allDefendantInfoIsGrayedOut() {
    this.criminalCaseActions.allDefendantInfoIsGrayedOut();
  }

  caseDetailsSectionIsNowEnabled() {
    this.criminalCaseActions.caseDetailsSectionIsNowEnabled();
  }

  inTheCaseTabSelectDefaultCourtLocation() {
    this.criminalCaseActions.inTheCaseTabSelectDefaultCourtLocation(
      jsonHandler.getValue("defaults", "courtCode")
    );
  }

  clickCaseTypeDropDownAndSelectCaseType() {
    this.criminalCaseActions.clickCaseTypeDropDownAndSelectCaseType(
      jsonHandler.getValue("defaults", "caseType")
    );
  }

  enterArrestingAgencyORI() {
    this.criminalCaseActions.enterArrestingAgencyORI(
      jsonHandler.getValue("defaults", "arrestingAgencyORI")
    );
  }

  enterFilingDateCurrentSystemDate() {
    this.criminalCaseActions.enterFilingDate(this.utils.formatDate(new Date()));
  }

  moveToProsecutingAttorneyOfRecordSection() {
    //No action is needed
  }

  clickToAddPAOfRecord() {
    this.criminalCaseActions.clickToAddPAOfRecord();
  }

  addAdditionalProsecutingAttorneyOfRecordBoxOpens() {
    //not sure what to do
  }

  clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney() {
    this.criminalCaseActions.clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney(
      "APA"
    );
  }

  inProsecutingAttorneyTextFieldEnterCodeAndSelectName() {
    this.criminalCaseActions.inProsecutingAttorneyTextFieldEnterCodeAndSelectName(
      jsonHandler.getValue("defaults", "prosecutingAttorneyCode"),
      jsonHandler.getValue("defaults", "prosecutingAttorneyName")
    );
  }

  clickToSaveClose() {
    this.criminalCaseActions.clickToSaveClose();
    this.utils.clearNotyMessages();
  }

  addAdditionalProsecutingAttorneyOfRecordBoxClosing() {
    //Nothing there
  }

  partyIsListedInProsecutingAttorneyField() {
    this.criminalCaseActions.partyIsListedInProsecutingAttorneyField(
      jsonHandler.getValue("defaults", "prosecutingAttorneyCode"),
      jsonHandler.getValue("defaults", "prosecutingAttorneyName")
    );
  }

  clickDocketDestriptionDropDownAndSelectAINFOInformationFiled() {
    this.criminalCaseActions.clickDocketDestriptionDropDownAndSelectInformationFiled(
      "AINFO"
    );
  }

  enterDocketDateAsToday() {
    this.criminalCaseActions.enterDocketDate(this.utils.formatDate(new Date()));
  }

  enterDateOfViolationAsOneMonthAgo() {
    this.criminalCaseActions.enterDateOfViolation(this.utils.oneMonthAgo());
  }

  enterTimeAs() {
    const time = "1000";
    this.criminalCaseActions.enterDateOfViolationTimeAs(time);
  }

  enterLocation() {
    this.criminalCaseActions.enterLocation("Here and there");
  }

  enterDigitTicketNumber() {
    this.criminalCaseActions.enter9DigitTicketNumber(
      this.utils.caseTicketNumber()
    );
  }

  navigateToAdditionalCaseDetailsSection() {
    cy.findAllByText("Additional Case Details").should("be.visible");
  }

  inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField() {
    this.criminalCaseActions.inMissouriChargeFieldEnterAndSelectCharge(
      jsonHandler.getValue("defaults", "charge")
    );
  }

  enterDigitOCN() {
    this.criminalCaseActions.enter8DigitOCN(this.utils.randomNumeric(8));
  }

  clickChooseActionButton() {
    this.criminalCaseActions.clickChooseActionButton();
  }

  selectSaveCase() {
    this.criminalCaseActions.saveCase(($caseId) => {
      this.defendant.caseId = $caseId;
      cy.writeFile(this.tempDefendentFileName, {
        defendant: this.defendant,
      });
      cy.log(`caseId: ${$caseId}`);
    });
  }

  greenNotysDisplayWithDocketCaseAndAdditionalInformationSaved() {
    this.utils.clearNotyMessages();
  }

  caseJudgeAssignmentDialogDisplays() {
    this.criminalCaseActions.caseJudgeAssignmentDialogDisplays();
  }

  selectAManualJudge() {
    //make manual selection
    this.criminalCaseActions.selectAManualJudge(
      jsonHandler.getValue("defaults", "caseJudgeAssignment")
    );
  }

  withCaseJudgeEnteredClickSaveJudgeAssignment() {
    this.criminalCaseActions.withCaseJudgeEnteredClick();
  }

  boxClosesAndGreenNotyAppearingConfirmingCaseNoEtc() {
    this.utils.clearNotyMessages();
  }

  enterFutureEventDateAndTime() {
    this.criminalCaseActions.enterFutureEventDateAndTime(
      this.utils.getValidDateForSchedulingStartingFromNow(7),
      "10:10"
    );
  }

  selectEventJudge() {
    this.criminalCaseActions.selectEventJudge(
      jsonHandler.getValue("defaults", "caseJudgeAssignment")
    );
  }

  selectRoom() {
    this.criminalCaseActions.selectRoom(
      jsonHandler.getValue("defaults", "judgeEventRoom")
    );
  }

  saveEvent() {
    this.criminalCaseActions.saveEvent();
  }

  greenNotysThatEventWasSaved() {
    this.utils.clearNotyMessages();
    this.criminalCaseActions.closeCriminalCaseTab();
  }

  ///////////////////////////////////////
  /// Start Dispose Case
  /////////
  selectCriminalFromLeftSideMenu() {
    cy.login();
    this.criminalCaseActions.selectCriminalFromLeftSideMenu();
  }

  selectCourtDisposition() {
    let setDefendant = true;
    this.readRunTimeFile(SET_DEFENDANT);
    this.criminalCaseActions.selectCourtDisposition();
  }

  selectTheCaseIDRadioButton() {
    this.criminalCaseActions.selectTheCaseIDRadioButton();
  }

  inTheMySearchFieldEnterTheCaseIDThatWasPreviouslyCreatedAndClickTheMagnifyingGlass() {
    this.criminalCaseActions.inTheMySearchFieldEnterTheCaseIDAndClickTheMagnifyingGlass(
      this.defendant.caseId
    );
    this.utils.clearNotyMessages();
  }

  theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails() {
    this.criminalCaseActions.theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails(
      this.defendant
    );
  }

  navigateToChargeDispositionDropDownUnderDispoisitionSection() {
    //no action required
  }

  clickChargeDispositionDropDownAndSelectDDGTPGuiltyPlea() {
    this.criminalCaseActions.clickChargeDispositionDropDownAndSelectPlea(
      "ddgtp-guilty plea"
    );
  }

  clickSaveButton() {
    this.criminalCaseActions.clickSaveButtonOnDispositionPage();
    this.utils.clearNotyMessages();
  }

  inCourtDispositionEventClosurePopupBoxClickToSave() {
    this.criminalCaseActions.inCourtDispositionEventClosurePopupBoxClickToSave(
      this.defendant.caseId
    );
    this.utils.clearNotyMessages();
  }

  lickTheXNextToCourtDisposition() {
    this.criminalCaseActions.clickTheXNextToCourtDisposition();
  }

  courtDispositionEventClosureBoxOpens() {
    //nothing
  }

  boxClosesAndDispositionIsSaved() {
    //nothing
  }

  courtDispositionTabCloses() {
    this.criminalCaseActions.courtDispositionTabCloses();
  }
  ///////////////////////////////////////////
  ////  Add sentence to case
  /////////////////////////////////////////
  selectSentenceProgramsFromLeftSideMenu() {
    this.readRunTimeFile(SET_DEFENDANT);
    this.criminalCaseActions.selectSentenceProgramsFromLeftSideMenu();
  }

  selectCaseIDRadioButtonIfNotAlreadySelected() {
    this.criminalCaseActions.selectCaseIDRadioButtonIfNotAlreadySelected();
  }

  inTheMySearchFieldEnterTheCaseID() {
    this.criminalCaseActions.inTheMySearchFieldEnterTheCaseID(
      this.defendant.caseId
    );
    this.utils.clearNotyMessages();
  }

  theCaseIsSelectedAndExpandedToViewSentenceProgramsAndJudgmentsInformation() {
    //no action
  }

  clickMagnifyingGlass() {
    //no action - Enter was pressed above
  }

  inSentenceSectionClickToAddSentence() {
    this.criminalCaseActions.inSentenceSectionClickToAddSentence();
  }

  inFineFieldForCountEnterTESTFineAmount() {
    this.criminalCaseActions.inFineFieldForCountEnterTESTFineAmount(
      0,
      jsonHandler.getValue("defaults", "fineAmount")
    );
  }

  clickToSave() {
    this.criminalCaseActions.clickToSave();
    this.utils.clearNotyMessages();
  }

  boxCloses() {
    this.criminalCaseActions.boxCloses();
  }

  sentenceRecordIsAddedToTheSentenceSection() {
    this.criminalCaseActions.sentenceRecordIsAddedToTheSentenceSection(
      `${jsonHandler.getValue(
        "defaults",
        "charge"
      )}-Access Or Disclose Restricted Drivers License Information Or Data - 1st Offense`,
      `Defendant sentenced to Fine $${jsonHandler.getValue(
        "defaults",
        "fineAmount"
      )}`,
      jsonHandler.getValue("defaults", "fineAmountLength")
    );
  }

  clickTheXNextToCriminalSentencePrograms() {
    this.criminalCaseActions.clickTheXNextToCriminalSentencePrograms();
  }

  criminalSentenceProgramsTabCloses() {
    this.criminalCaseActions.criminalSentenceProgramsTabCloses();
  }
  ///////////////////////////////////////
  /// Start Save Assessments to Case
  ///////////////////////////////////////
  selectFinancialFromLeftSideMenu() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
  }

  selectManageAssessmentsFromFinancialMenu() {
    this.readRunTimeFile(SET_DEFENDANT);
    cy.clickMenu("Manage Assessments");
  }

  selectTheCaseIDRadioButtonIfItIsNotAlreadySelected() {
    this.manageAssessmentsActions.selectTheCaseIDRadioButtonIfItIsNotAlreadySelected();
  }

  inTheMyCaseIDSearchFieldEnterTheCaseID() {
    cy.intercept("smc-web/getCostAssessmentsOnCase*").as(
      "getCostAssessmentsOnCase"
    );
    cy.intercept("smc-web/getFineAssessmentsOnCaseV2*").as(
      "getFineAssessmentsOnCaseV2"
    );

    this.manageAssessmentsActions.inTheMyCaseIDSearchFieldEnterTheCaseID(
      this.defendant.caseId
    );

    cy.wait(["@getCostAssessmentsOnCase", "@getFineAssessmentsOnCaseV2"]);
  }

  theCaseIsSelectedAndExpandedToViewDetails() {
    this.utils.clearNotyMessages();
  }

  clickToSaveCostsToCase() {
    this.criminalCaseHappyPathElements
      .financial_floppyDiskSaveIcon()
      .should(
        "have.length",
        `${jsonHandler.getValue("defaults", "manageAssessmentsCosts")}`
      );

    cy.intercept("smc-web/saveAssessmentsOnCase*").as("saveAssessmentsOnCase");
    cy.intercept("smc-web/getCostAssessmentsOnCase*").as(
      "getCostAssessmentsOnCase"
    );
    cy.intercept("smc-web/getFineAssessmentsOnCaseV2*").as(
      "getFineAssessmentsOnCaseV2"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages*");

    this.criminalCaseHappyPathElements.financial_save_button().click();

    cy.wait([
      "@saveAssessmentsOnCase",
      "@getCostAssessmentsOnCase",
      "@getFineAssessmentsOnCaseV2",
      "@saveUserNotyMessages",
    ]);
  }
  greenNotyIndicatingCostsHaveBeenSaved() {
    let messageArr = [
      `Cost Assessed section is Saved with Case ID: ${this.defendant.caseId}`,
    ];
    this.utils.validateNotyMessages(messageArr);
  }

  floppyDiskNoLongerAppearsNextToEachAssessment() {
    this.criminalCaseHappyPathElements
      .financial_floppyDiskSaveIcon()
      .should("have.length", 0);
  }

  inTheManageAssessmentsTabClickTheXToCloseTheTabe() {
    this.criminalCaseHappyPathElements
      .financial_manageAssest_closeButton()
      .click();
  }

  manageAssessmentsTabClosed() {
    this.criminalCaseHappyPathElements
      .financial_manageAssest_closeButton()
      .should("not.exist");
  }

  ///////////////////////////////////////
  /// Take a Receipt on Case
  ///////////////////////////////////////
  selectReceiptPaymentFromFinancialMenu() {
    this.readRunTimeFile(SET_DEFENDANT);
    cy.intercept("smc-web/myDefendantSearch*").as("myDefendantSearch");
    cy.intercept("smc-web/courtLocnCodes*").as("courtLocnCodes");
    cy.intercept("smc-web/getPaymentTypeDescs*").as("getPaymentTypeDescs");

    cy.clickMenu("Receipt Payment");

    cy.wait(["@courtLocnCodes", "@getPaymentTypeDescs", "@myDefendantSearch"], {
      timeout: 90000,
    });
  }

  selectCaseIDRadioButton() {
    this.criminalCaseHappyPathElements.financial_receipt_caseIdRadio().click();
  }

  enterTheCaseID() {
    cy.intercept("smc-web/getCourtLocnDispCasesById*").as(
      "getCourtLocnDispCasesById"
    );
    cy.intercept("smc-web/smcFormRequest/getAssesedCostByCaseId*").as(
      "getAssesedCostByCaseId"
    );
    cy.intercept("smc-web/getAssessmentsOnCase*").as("getAssessmentsOnCase");
    cy.intercept("smc-web/getFineAssessmentsOnCase*").as(
      "getFineAssessmentsOnCase"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.criminalCaseHappyPathElements
      .financial_receipt_searchInput()
      .type(`${this.defendant.caseId} {enter}`);

    cy.wait(
      [
        "@getCourtLocnDispCasesById",
        "@getAssesedCostByCaseId",
        "@getAssessmentsOnCase",
        "@getFineAssessmentsOnCase",
        "@saveUserNotyMessages",
      ],
      {
        timeout: 90000,
      }
    );

    let messageArr = [
      `1 Record(s) Retrieved for Case ID : ${this.defendant.caseId}`,
    ];
    this.utils.validateNotyMessages(messageArr);
  }

  theCaseIsSelectedAndExpandedToViewThePaymentAssessmentDetails() {
    cy.intercept("smc-web/insertPaymentAppliedForCases*").as(
      "insertPaymentAppliedForCases"
    );
    cy.intercept("smc-web/validateCaseType*").as("validateCaseType");
    cy.intercept("smc-web/getdetcPaymentPlanDebtCollection*").as(
      "getdetcPaymentPlanDebtCollection"
    );
    cy.intercept("smc-web/getAccountingOpenItemsInfo*").as(
      "getAccountingOpenItemsInfo"
    );

    this.criminalCaseHappyPathElements
      .financial_receipt_selectCaseTdInput()
      .click();

    cy.wait(
      [
        "@insertPaymentAppliedForCases",
        "@validateCaseType",
        "@getdetcPaymentPlanDebtCollection",
        "@getAccountingOpenItemsInfo",
      ],
      {
        timeout: 90000,
      }
    );
  }

  clickApplyFullAmount() {
    //open by clicking + button
    cy.intercept("smc-web/getAssessmentsOnCase*").as("getAssessmentsOnCase");
    cy.intercept("smc-web/selectSatisfyRecoverableBalance*").as(
      "selectSatisfyRecoverableBalance"
    );
    cy.intercept("smc-web/getFineAssessmentsOnCase*").as(
      "getFineAssessmentsOnCase"
    );

    this.criminalCaseHappyPathElements
      .financial_receipt_applyPayments_openCase()
      .click();

    cy.wait([
      "@getAssessmentsOnCase",
      "@selectSatisfyRecoverableBalance",
      "@getFineAssessmentsOnCase",
    ]);
    this.criminalCaseHappyPathElements
      .financial_receipt_applyFullAmount()
      .click();
  }

  amountAppliedToCaseShouldBeCorrect() {
    this.criminalCaseHappyPathElements
      .financial_receipt_applyAmountToCase()
      .should(
        "have.value",
        `$${jsonHandler.getValue("defaults", "amountToCollect")}`
      );
  }

  clickPayTypeDescriptionDropDownAndSelectCaseh() {
    //Pop open the search
    this.criminalCaseHappyPathElements
      .financial_receipt_payTypeDescription()
      .click();

    //Get cash
    this.criminalCaseHappyPathElements
      .financial_receipt_payTypeDescriptionSearchInput()
      .type(`1100{enter}`);
  }

  inAmountTenderedFieldEnteRsameAmountFromApplyAmountField() {
    //Should equal full amount
    this.criminalCaseHappyPathElements
      .financial_receipt_amountTenderedInput()
      .type(`${jsonHandler.getValue("defaults", "amountToCollect")} {enter}`);
  }

  clickToSavePayment() {
    cy.intercept("smc-web/validateFinancialPerson*").as(
      "validateFinancialPerson"
    );
    cy.intercept("smc-web/saveFinancialPayment*").as("saveFinancialPayment");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.criminalCaseHappyPathElements
      .financial_receipt_savePaymentButton()
      .then(($ele) => {
        $ele[0].click();
      });
    // .click();

    cy.wait([
      "@validateFinancialPerson",
      "@saveFinancialPayment",
      "@saveUserNotyMessages",
    ]);
  }

  greenNotyStatingReceiptHasBeenSaved() {
    this.criminalCaseHappyPathElements
      .financial_receipt_receiptNumber()
      .then(($receiptNumber) => {
        this.defendant.receiptNumber = $receiptNumber.text();
        cy.writeFile("cypress\\temp\\criminalCaseHappyPath.json", {
          defendant: this.defendant,
        });
        this.utils.clearNotyMessages();
      });
  }

  viewPaymentSummaryDisplaysPaymentDetails() {
    this.criminalCaseHappyPathElements
      .financial_receipt_viewPaymentSummaryTable()
      .contains("td", "Assessment Amounts Paid");

    this.criminalCaseHappyPathElements
      .financial_receipt_viewPaymentSummaryTable()
      .contains("td", "Total Amount Due");

    this.criminalCaseHappyPathElements
      .financial_receipt_viewPaymentSummaryTable()
      .contains("td", "Change Due");

    this.criminalCaseHappyPathElements
      .financial_receipt_viewPaymentSummaryTable()
      .contains("td", `${jsonHandler.getValue("defaults", "amountToCollect")}`);

    this.criminalCaseHappyPathElements
      .financial_receipt_viewPaymentSummaryTable()
      .contains("td", "0.0");
  }

  receiptNumberDipslays() {
    this.criminalCaseHappyPathElements
      .financial_receipt_receiptNumber()
      .should("be.visible");
  }

  receiptNumberIsLinkToACopyOfReceipt() {
    this.criminalCaseHappyPathElements
      .financial_receipt_receiptNumber_link()
      .should("be.visible");

    //this makes the variable windowOpen available
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    cy.intercept("smc-web/smcFormRequest/accountStatementDialog*").as(
      "accountStatementDialog"
    );

    this.criminalCaseHappyPathElements
      .financial_receipt_receiptNumber_link()
      .click();

    cy.wait("@accountStatementDialog");

    cy.get("body").then(($ele) => {
      cy.wrap($ele[0])
        .find("button")
        .contains("Print")
        .then(($button) => {
          if ($button && $button.length === 1) {
            cy.get("button").contains("Print").click();
          }
        });
    });

    cy.get("@windowOpen").then((windowOpen) => {
      //27.0.0.1:9081/smc-web/printMultiReceipt.do?reprintReceiptNumbers=37AK41412&summary=false&bondPostingFn=true&circuitNumber=37&dataSource=smc.datasource.dv2cc1
      var args = windowOpen.args[0][0];
      //Get all the name/value pairs
      //Parms look like
      /*
      ['reprintReceiptNumbers=37AK41413', 'summary=false', 'bondPostingFn=true', 'circuitNumber=37', 'dataSource=smc.datasource.dv2cc1']
      */
      var parms = args.split("?")[1].split("&");
      var receiptNumber = parms[0].split("=")[1];
      expect(receiptNumber).to.equal(this.defendant.receiptNumber);
    });
  }

  clickTheXNextToReceiptPayment() {
    this.criminalCaseHappyPathElements
      .financial_receipt_payment_closeTab()
      .click();
  }

  receiptPaymentTabCloses() {
    this.criminalCaseHappyPathElements
      .financial_receipt_payment_closeTab()
      .should("not.exist");
  }
  addSentenceBoxPopsUp() {
    //no op
  }
}
