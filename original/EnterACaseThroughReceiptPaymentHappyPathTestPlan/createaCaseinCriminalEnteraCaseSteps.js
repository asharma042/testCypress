/// <reference types="cypress" />

import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import CreateaCaseinCriminalEnteraCaseActions from "./CreateaCaseinCriminalEnteraCaseActions";
const createaCaseinCriminalEnteraCaseActions =
  new CreateaCaseinCriminalEnteraCaseActions();

Given("Sign into SMC", () => {
  createaCaseinCriminalEnteraCaseActions.signIntoSMC();
});

Given("Select Case Processessing tab", () => {
  createaCaseinCriminalEnteraCaseActions.selectCaseProcessessingTab();
});

Given("Select Criminal from left side menu", () => {
  createaCaseinCriminalEnteraCaseActions.selectCriminalFromLeftSideMenu();
});

Given("Select Enter a Case", () => {
  createaCaseinCriminalEnteraCaseActions.selectEnterACase();
});

Given("Navigate to the Defendant section", () => {
  createaCaseinCriminalEnteraCaseActions.navigateToTheDefendantSection();
});

Given("Enter TEST Last Name", () => {
  createaCaseinCriminalEnteraCaseActions.enterTESTLastName();
});

Given("Enter TEST First Name", () => {
  createaCaseinCriminalEnteraCaseActions.enterTESTFirstName();
});

Given("Click to expand Demographics section", () => {
  createaCaseinCriminalEnteraCaseActions.clickToExpandDemographicsSection();
});

Given("Enter TEST Date of Birth", () => {
  createaCaseinCriminalEnteraCaseActions.enterTESTDateOfBirth();
});

Given("Click to expand Address section", () => {
  createaCaseinCriminalEnteraCaseActions.clickToExpandAddressSection();
});

Given("Enter TEST Street Address", () => {
  createaCaseinCriminalEnteraCaseActions.enterTESTStreetAddress();
});

Given("Enter City {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.enterCity(option0);
});

Given("Enter Zip Code {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.enterZipCode(option0);
});

Given("Click to Save Defendant", () => {
  createaCaseinCriminalEnteraCaseActions.clickToSaveDefendant();
});

Then("Green Noty stating Defendant Saved and  Address Saved", () => {
  createaCaseinCriminalEnteraCaseActions.greenNotyStatingDefendantSavedAndAddressSaved();
});

Then("All Defendant info is grayed out", () => {
  createaCaseinCriminalEnteraCaseActions.allDefendantInfoIsGrayedOut();
});

Then("Case details section is now enabled", () => {
  createaCaseinCriminalEnteraCaseActions.caseDetailsSectionIsNowEnabled();
});

Given("In the Case tab, select Court Location - {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.inTheCaseTabSelectCourtLocation(
    option0
  );
});

Given("Click Case Type drop down and select {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.clickCaseTypeDropDownAndSelect(
    option0
  );
});

Given("Enter Arresting Agency ORI - {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.enterArrestingAgencyORI(option0);
});

Given("Enter Filing Date - Current System Date", () => {
  createaCaseinCriminalEnteraCaseActions.enterFilingDateCurrentSystemDate();
});

Given("Move to Prosecuting Attorney of Record section", () => {
  createaCaseinCriminalEnteraCaseActions.moveToProsecutingAttorneyOfRecordSection();
});

Given("Click to Add PA of Record", () => {
  createaCaseinCriminalEnteraCaseActions.clickToAddPAOfRecord();
});

Then("Add Additional Prosecuting Attorney of Record box opens", () => {
  createaCaseinCriminalEnteraCaseActions.addAdditionalProsecutingAttorneyOfRecordBoxOpens();
});

Given(
  "Click Party Type drop down and select APA - Assistant Prosecuting Attorney",
  () => {
    createaCaseinCriminalEnteraCaseActions.clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney();
  }
);

Given(
  "In Prosecuting Attorney text field enter {string} and select {string}",
  (option0, option1) => {
    createaCaseinCriminalEnteraCaseActions.inProsecutingAttorneyTextFieldEnterAndSelect(
      option0,
      option1
    );
  }
);

Given("Click to Save & Close", () => {
  createaCaseinCriminalEnteraCaseActions.clickToSaveClose();
});

Then("Add Additional Prosecuting Attorney of Record box closing", () => {
  createaCaseinCriminalEnteraCaseActions.addAdditionalProsecutingAttorneyOfRecordBoxClosing();
});

Then("Party is listed in Prosecuting Attorney field", () => {
  createaCaseinCriminalEnteraCaseActions.partyIsListedInProsecutingAttorneyField();
});

Given(
  "Click Docket Destription drop down and select  AINFO - Information Filed",
  () => {
    createaCaseinCriminalEnteraCaseActions.clickDocketDestriptionDropDownAndSelectAINFOInformationFiled();
  }
);

Given("Enter Docket date as today", () => {
  createaCaseinCriminalEnteraCaseActions.enterDocketDateAsToday();
});

Given("Navigave to Additional Case Details section", () => {
  createaCaseinCriminalEnteraCaseActions.navigaveToAdditionalCaseDetailsSection();
});

Given("Enter Date of Violation as {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.enterDateOfViolationAs(option0);
});

Given("Enter Time as {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.enterTimeAs(option0);
});

Given("Enter Location as {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.enterLocationAs(option0);
});

Given("Enter 9 digit TEST ticket number", () => {
  createaCaseinCriminalEnteraCaseActions.enter9DigitTESTTicketNumber();
});

Given(
  "In Missouri Charge field, enter and select charge {string} and then tab out of field",
  (option0) => {
    createaCaseinCriminalEnteraCaseActions.inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField(
      option0
    );
  }
);

Given("Enter 8 digit TEST OCN", () => {
  createaCaseinCriminalEnteraCaseActions.enter8DigitTESTOCN();
});

Given("Click Choose Action button", () => {
  createaCaseinCriminalEnteraCaseActions.clickChooseActionButton();
});

Given("elect Save Case", () => {
  createaCaseinCriminalEnteraCaseActions.electSaveCase();
});

Then("Assign Judge box opens", () => {
  createaCaseinCriminalEnteraCaseActions.assignJudgeBoxOpens();
});

Given(
  "In Assign Jude and Dispose box, leave pre selected Judge Assignment radio button selected",
  () => {
    createaCaseinCriminalEnteraCaseActions.inAssignJudeAndDisposeBoxLeavePreSelectedJudgeAssignmentRadioButtonSelected();
  }
);

Given("With Case Judge entered, click {string}", (option0) => {
  createaCaseinCriminalEnteraCaseActions.withCaseJudgeEnteredClick(option0);
});

Then("Box closes andGreen Noty appearing confirming Case No, etc", () => {
  createaCaseinCriminalEnteraCaseActions.boxClosesAndGreenNotyAppearingConfirmingCaseNoEtc();
});

Given("Click the X next to Criminal Enter a Case", () => {
  createaCaseinCriminalEnteraCaseActions.clickTheXNextToCriminalEnterACase();
});

Then("Criminaa Enter a Case component closes", () => {
  createaCaseinCriminalEnteraCaseActions.criminaaEnterACaseComponentCloses();
});

Given("Select Court Disposition", () => {
  createaCaseinCriminalEnteraCaseActions.selectCourtDisposition();
});

Given("Select the Case ID radio button", () => {
  createaCaseinCriminalEnteraCaseActions.selectTheCaseIDRadioButton();
});

Given(
  "In the My Search field, enter the Case ID that was previously created and click the Magnifying Glass",
  () => {
    createaCaseinCriminalEnteraCaseActions.inTheMySearchFieldEnterTheCaseIDThatWasPreviouslyCreatedAndClickTheMagnifyingGlass();
  }
);

Then(
  "The case is selected and expanded to view the Case and Count details",
  () => {
    createaCaseinCriminalEnteraCaseActions.theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails();
  }
);

Given(
  "Navigate to Charge Disposition drop down under Dispoisition section",
  () => {
    createaCaseinCriminalEnteraCaseActions.navigateToChargeDispositionDropDownUnderDispoisitionSection();
  }
);

Given(
  "Click Charge Disposition drop down and select DDGTP - Guilty Plea",
  () => {
    createaCaseinCriminalEnteraCaseActions.clickChargeDispositionDropDownAndSelectDDGTPGuiltyPlea();
  }
);

Given("Click Save button", () => {
  createaCaseinCriminalEnteraCaseActions.clickSaveButton();
});

Given("In Court Disposition Event Closure pop-up box click to Save", () => {
  createaCaseinCriminalEnteraCaseActions.inCourtDispositionEventClosurePopupBoxClickToSave();
});

Given("lick the X next to Court Disposition", () => {
  createaCaseinCriminalEnteraCaseActions.lickTheXNextToCourtDisposition();
});

Then("Court Disposition Event Closure box opens", () => {
  createaCaseinCriminalEnteraCaseActions.courtDispositionEventClosureBoxOpens();
});

Then("Box closes and disposition is saved", () => {
  createaCaseinCriminalEnteraCaseActions.boxClosesAndDispositionIsSaved();
});

Then("Court Disposition tab closes", () => {
  createaCaseinCriminalEnteraCaseActions.courtDispositionTabCloses();
});

Given("Select Sentence & Programs from left side menu", () => {
  createaCaseinCriminalEnteraCaseActions.selectSentenceProgramsFromLeftSideMenu();
});

Given("Select Case ID radio button, if not already selected", () => {
  createaCaseinCriminalEnteraCaseActions.selectCaseIDRadioButtonIfNotAlreadySelected();
});

Given("In the My Search field, enter the Case ID", () => {
  createaCaseinCriminalEnteraCaseActions.inTheMySearchFieldEnterTheCaseID();
});

Then(
  "The case is selected and expanded to view Sentence, Programs and Judgments information",
  () => {
    createaCaseinCriminalEnteraCaseActions.theCaseIsSelectedAndExpandedToViewSentenceProgramsAndJudgmentsInformation();
  }
);

Given("Click Magnifying Glass", () => {
  createaCaseinCriminalEnteraCaseActions.clickMagnifyingGlass();
});

Given("In Sentence section, click to + Add Sentence", () => {
  createaCaseinCriminalEnteraCaseActions.inSentenceSectionClickToAddSentence();
});

Given("In Fine field for Count-1, enter TEST Fine Amount", () => {
  createaCaseinCriminalEnteraCaseActions.inFineFieldForCount1EnterTESTFineAmount();
});

Then("Add Sentence box pops up", () => {
  createaCaseinCriminalEnteraCaseActions.addSentenceBoxPopsUp();
});

Given("Click to Save", () => {
  createaCaseinCriminalEnteraCaseActions.clickToSave();
});

Then("Box closes", () => {
  createaCaseinCriminalEnteraCaseActions.boxCloses();
});

Then("Sentence record is added to the Sentence section", () => {
  createaCaseinCriminalEnteraCaseActions.sentenceRecordIsAddedToTheSentenceSection();
});

Given("Click the X next to Criminal Sentence & Programs", () => {
  createaCaseinCriminalEnteraCaseActions.clickTheXNextToCriminalSentencePrograms();
});

Then("Criminal Sentence & Programs Tab closes", () => {
  createaCaseinCriminalEnteraCaseActions.criminalSentenceProgramsTabCloses();
});

Given("Select Financial from left side menu", () => {
  createaCaseinCriminalEnteraCaseActions.selectFinancialFromLeftSideMenu();
});

Given("Select Manage Assessments from Financial Menu", () => {
  createaCaseinCriminalEnteraCaseActions.selectManageAssessmentsFromFinancialMenu();
});

Given("Select the Case ID radio button if it is not already selected", () => {
  createaCaseinCriminalEnteraCaseActions.selectTheCaseIDRadioButtonIfItIsNotAlreadySelected();
});

Given("In the My Case ID Search field, enter the Case ID", () => {
  createaCaseinCriminalEnteraCaseActions.inTheMyCaseIDSearchFieldEnterTheCaseID();
});

Then("The case is selected and expanded to view details", () => {
  createaCaseinCriminalEnteraCaseActions.theCaseIsSelectedAndExpandedToViewDetails();
});

Given("Click to Save costs to case", () => {
  createaCaseinCriminalEnteraCaseActions.clickToSaveCostsToCase();
});

Then("Green Noty indicating costs have been saved", () => {
  createaCaseinCriminalEnteraCaseActions.greenNotyIndicatingCostsHaveBeenSaved();
});

Then("Floppy disk no longer appears next to each assessment", () => {
  createaCaseinCriminalEnteraCaseActions.floppyDiskNoLongerAppearsNextToEachAssessment();
});

Given("In the Manage Assessments tab, click the X to close the tabe", () => {
  createaCaseinCriminalEnteraCaseActions.inTheManageAssessmentsTabClickTheXToCloseTheTabe();
});

Then("Manage Assessments tab closed", () => {
  createaCaseinCriminalEnteraCaseActions.manageAssessmentsTabClosed();
});

Given("Select Receipt Payment from Financial Menu", () => {
  createaCaseinCriminalEnteraCaseActions.selectReceiptPaymentFromFinancialMenu();
});

Then(
  "The case is selected and expanded to view the Payment/assessment details",
  () => {
    createaCaseinCriminalEnteraCaseActions.theCaseIsSelectedAndExpandedToViewThePaymentassessmentDetails();
  }
);

Given("In Apply Amount to Case enter a TEST Payment amount", () => {
  createaCaseinCriminalEnteraCaseActions.inApplyAmountToCaseEnterATESTPaymentAmount();
});

Given("Click Pay Type Description drop down and select 1100 - Caseh", () => {
  createaCaseinCriminalEnteraCaseActions.clickPayTypeDescriptionDropDownAndSelect1100Caseh();
});

Given(
  "In Amount Tendered field, ente rsame amount from Apply Amount field",
  () => {
    createaCaseinCriminalEnteraCaseActions.inAmountTenderedFieldEnteRsameAmountFromApplyAmountField();
  }
);

Given("Click to Save Payment", () => {
  createaCaseinCriminalEnteraCaseActions.clickToSavePayment();
});

Then("Green Noty stating receipt has been saved", () => {
  createaCaseinCriminalEnteraCaseActions.greenNotyStatingReceiptHasBeenSaved();
});

Then("View Payment Summary Displays payment Details", () => {
  createaCaseinCriminalEnteraCaseActions.viewPaymentSummaryDisplaysPaymentDetails();
});

Then("Receipt Number dipslays", () => {
  createaCaseinCriminalEnteraCaseActions.receiptNumberDipslays();
});

Then("Receipt Number is link to a copy of receipt", () => {
  createaCaseinCriminalEnteraCaseActions.receiptNumberIsLinkToACopyOfReceipt();
});
