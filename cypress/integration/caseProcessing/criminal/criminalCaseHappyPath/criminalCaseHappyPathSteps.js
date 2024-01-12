/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CriminalCaseHappyPathActions from "./CriminalCaseHappyPathActions";
const criminalCaseHappyPathActions = new CriminalCaseHappyPathActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/criminal/criminalCaseHappyPath/criminalCaseHappyPathFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "criminalCaseHappyPath";
      cy.wrap(id).as("id");
      if ($jsonHandlerFile[id] === undefined) {
        $jsonHandlerFile[id] = dataFixture;
        cy.task("writeJsonHandlerFile", $jsonHandlerFile);
      }
    });
  });
  cy.recordHar({ content: false });
});

After(function () {
  cy.logout();

  let scenarioName = testState.pickle.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join("-");

  let env = Cypress.env("ENV");
  let browser = Cypress.browser.name;
  let harsFolder = Cypress.env("hars_folders");

  let harPath = "caseProcessing/criminal/criminalCaseHappyPath";
  let harFileName = `${scenarioName}-${env}-${browser}.har`;

  cy.task("createHarsDirectories", `${harsFolder}/${harPath}`);

  cy.saveHar({
    outDir: `${harsFolder}/${harPath}`,
    fileName: harFileName,
  });

  let utils = new Utils();
  let hars_folders = Cypress.env("hars_folders");

  utils.readRunTimeFile(
    `${harsFolder}/${harPath}/${harFileName}`,
    function ($json) {
      if ($json) {
        try {
          let har = JSON.parse($json);
          for (var i = 0; i < har.log.entries.length; i++) {
            if (har.log.entries[i].request.url.includes("login")) {
              delete har.log.entries[i].request.postData;
            }
          }
          let result = JSON.stringify(har, null, 2);

          cy.writeFile(`${harsFolder}/${harPath}/${harFileName}`, result);
        } catch (e) {
          cy.log(`error ${e.message}`);
        }
      }
    }
  );
});

Given("Valid user selects Enter a Case", () => {
  criminalCaseHappyPathActions.validUserSelectsEnterACase();
});

Given("Navigate to the Defendant section", () => {
  criminalCaseHappyPathActions.navigateToTheDefendantSection();
});

Given("Enter Last Name", () => {
  criminalCaseHappyPathActions.enterLastName();
});

Given("Enter First Name", () => {
  criminalCaseHappyPathActions.enterFirstName();
});

Given("Enter DL State", () => {
  criminalCaseHappyPathActions.enterDLState();
});

Given("Enter Drivers License Number", () => {
  criminalCaseHappyPathActions.enterDriversLicenseNumber();
});

Given("Expand Demographics section", () => {
  criminalCaseHappyPathActions.expandDemographicsSection();
});

Given("Enter Date of Birth", () => {
  criminalCaseHappyPathActions.enterDateOfBirth();
});

Given("Enter SSN", () => {
  criminalCaseHappyPathActions.enterSSN();
});

Given("Expand Address section", () => {
  criminalCaseHappyPathActions.expandAddressSection();
});

Given("Enter Street Address", () => {
  criminalCaseHappyPathActions.enterStreetAddress();
});

Given("Enter City", () => {
  criminalCaseHappyPathActions.enterCity();
});

Given("Enter Zip Code", () => {
  criminalCaseHappyPathActions.enterZipCode();
});

Given("Save Defendant", () => {
  criminalCaseHappyPathActions.saveDefendant();
});

Then("Green Noty stating Defendant Saved and Address Saved", () => {
  criminalCaseHappyPathActions.greenNotyStatingDefendantSavedAndAddressSaved();
});

Then("All Defendant info is grayed out", () => {
  criminalCaseHappyPathActions.allDefendantInfoIsGrayedOut();
});

Then("Case details section is now enabled", () => {
  criminalCaseHappyPathActions.caseDetailsSectionIsNowEnabled();
});

Given("In the Case tab select default Court Location", () => {
  criminalCaseHappyPathActions.inTheCaseTabSelectDefaultCourtLocation();
});

Given("Click Case Type drop down and select case type", () => {
  criminalCaseHappyPathActions.clickCaseTypeDropDownAndSelectCaseType();
});

Given("Enter Arresting Agency ORI", () => {
  criminalCaseHappyPathActions.enterArrestingAgencyORI();
});

Given("Enter Filing Date Current System Date", () => {
  criminalCaseHappyPathActions.enterFilingDateCurrentSystemDate();
});

Given("Move to Prosecuting Attorney of Record section", () => {
  criminalCaseHappyPathActions.moveToProsecutingAttorneyOfRecordSection();
});

Given("Click to Add PA of Record", () => {
  criminalCaseHappyPathActions.clickToAddPAOfRecord();
});

Then("Add Additional Prosecuting Attorney of Record box opens", () => {
  criminalCaseHappyPathActions.addAdditionalProsecutingAttorneyOfRecordBoxOpens();
});

Given(
  "Click Party Type drop down and select APA Assistant Prosecuting Attorney",
  () => {
    criminalCaseHappyPathActions.clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney();
  }
);

Given("In Prosecuting Attorney text field enter code and select name", () => {
  criminalCaseHappyPathActions.inProsecutingAttorneyTextFieldEnterCodeAndSelectName();
});

Given("Click to Save Close", () => {
  criminalCaseHappyPathActions.clickToSaveClose();
});

Then("Add Additional Prosecuting Attorney of Record box closing", () => {
  criminalCaseHappyPathActions.addAdditionalProsecutingAttorneyOfRecordBoxClosing();
});

Then("Party is listed in Prosecuting Attorney field", () => {
  criminalCaseHappyPathActions.partyIsListedInProsecutingAttorneyField();
});

Given(
  "Click Docket Destription drop down and select AINFO Information Filed",
  () => {
    criminalCaseHappyPathActions.clickDocketDestriptionDropDownAndSelectAINFOInformationFiled();
  }
);

Given("Enter Docket date as today", () => {
  criminalCaseHappyPathActions.enterDocketDateAsToday();
});

Given("Navigate to Additional Case Details section", () => {
  criminalCaseHappyPathActions.navigateToAdditionalCaseDetailsSection();
});

Given("Enter Date of Violation as one month ago", () => {
  criminalCaseHappyPathActions.enterDateOfViolationAsOneMonthAgo();
});

Given("Enter Time as", () => {
  criminalCaseHappyPathActions.enterTimeAs();
});

Given("Enter Location", () => {
  criminalCaseHappyPathActions.enterLocation();
});

Given("Enter digit ticket number", () => {
  criminalCaseHappyPathActions.enterDigitTicketNumber();
});

Given(
  "In Missouri Charge field enter and select charge and then tab out of field",
  () => {
    criminalCaseHappyPathActions.inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField();
  }
);

Given("Enter digit OCN", () => {
  criminalCaseHappyPathActions.enterDigitOCN();
});

Given("Click Choose Action button", () => {
  criminalCaseHappyPathActions.clickChooseActionButton();
});

Given("Select Save Case", () => {
  criminalCaseHappyPathActions.selectSaveCase();
});

Then(
  "Green Notys display with Docket Case and Additional Information saved",
  () => {
    criminalCaseHappyPathActions.greenNotysDisplayWithDocketCaseAndAdditionalInformationSaved();
  }
);

Then("Case Judge Assignment dialog displays", () => {
  criminalCaseHappyPathActions.caseJudgeAssignmentDialogDisplays();
});

Given("Select a Manual Judge", () => {
  criminalCaseHappyPathActions.selectAManualJudge();
});

Given("With Case Judge entered click Save Judge Assignment", () => {
  criminalCaseHappyPathActions.withCaseJudgeEnteredClickSaveJudgeAssignment();
});

Then("Box closes andGreen Noty appearing confirming Case No etc", () => {
  criminalCaseHappyPathActions.boxClosesAndGreenNotyAppearingConfirmingCaseNoEtc();
});

Given("Enter future event date and time", () => {
  criminalCaseHappyPathActions.enterFutureEventDateAndTime();
});

Given("Select Event Judge", () => {
  criminalCaseHappyPathActions.selectEventJudge();
});

Given("Select Room", () => {
  criminalCaseHappyPathActions.selectRoom();
});

Given("Save Event", () => {
  criminalCaseHappyPathActions.saveEvent();
});

Then("Green Notys that Event was saved", () => {
  criminalCaseHappyPathActions.greenNotysThatEventWasSaved();
});

Given("Select Criminal from left side menu", () => {
  criminalCaseHappyPathActions.selectCriminalFromLeftSideMenu();
});

Given("Select Court Disposition", () => {
  criminalCaseHappyPathActions.selectCourtDisposition();
});

Given("Select the Case ID radio button", () => {
  criminalCaseHappyPathActions.selectTheCaseIDRadioButton();
});

Given(
  "In the My Search field enter the Case ID that was previously created and click the Magnifying Glass",
  () => {
    criminalCaseHappyPathActions.inTheMySearchFieldEnterTheCaseIDThatWasPreviouslyCreatedAndClickTheMagnifyingGlass();
  }
);

Then(
  "The case is selected and expanded to view the Case and Count details",
  () => {
    criminalCaseHappyPathActions.theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails();
  }
);

Given(
  "Navigate to Charge Disposition drop down under Dispoisition section",
  () => {
    criminalCaseHappyPathActions.navigateToChargeDispositionDropDownUnderDispoisitionSection();
  }
);

Given("Click Charge Disposition drop down and select DDGTP Guilty Plea", () => {
  criminalCaseHappyPathActions.clickChargeDispositionDropDownAndSelectDDGTPGuiltyPlea();
});

Given("Click Save button", () => {
  criminalCaseHappyPathActions.clickSaveButton();
});

Given("In Court Disposition Event Closure popup box click to Save", () => {
  criminalCaseHappyPathActions.inCourtDispositionEventClosurePopupBoxClickToSave();
});

Given("lick the X next to Court Disposition", () => {
  criminalCaseHappyPathActions.lickTheXNextToCourtDisposition();
});

Then("Court Disposition Event Closure box opens", () => {
  criminalCaseHappyPathActions.courtDispositionEventClosureBoxOpens();
});

Then("Box closes and disposition is saved", () => {
  criminalCaseHappyPathActions.boxClosesAndDispositionIsSaved();
});

Then("Court Disposition tab closes", () => {
  criminalCaseHappyPathActions.courtDispositionTabCloses();
});

Then("Select Sentence Programs from left side menu", () => {
  criminalCaseHappyPathActions.selectSentenceProgramsFromLeftSideMenu();
});

Given("Select Case ID radio button if not already selected", () => {
  criminalCaseHappyPathActions.selectCaseIDRadioButtonIfNotAlreadySelected();
});

Given("In the My Search field enter the Case ID", () => {
  criminalCaseHappyPathActions.inTheMySearchFieldEnterTheCaseID();
});

Then(
  "The case is selected and expanded to view Sentence Programs and Judgments information",
  () => {
    criminalCaseHappyPathActions.theCaseIsSelectedAndExpandedToViewSentenceProgramsAndJudgmentsInformation();
  }
);

Given("Click Magnifying Glass", () => {
  criminalCaseHappyPathActions.clickMagnifyingGlass();
});

Given("In Sentence section click to + Add Sentence", () => {
  criminalCaseHappyPathActions.inSentenceSectionClickToAddSentence();
});

Given("In Fine field for Count enter TEST Fine Amount", () => {
  criminalCaseHappyPathActions.inFineFieldForCountEnterTESTFineAmount();
});

Then("Add Sentence box pops up", () => {
  criminalCaseHappyPathActions.addSentenceBoxPopsUp();
});

Given("Click to Save", () => {
  criminalCaseHappyPathActions.clickToSave();
});

Then("Box closes", () => {
  criminalCaseHappyPathActions.boxCloses();
});

Then("Sentence record is added to the Sentence section", () => {
  criminalCaseHappyPathActions.sentenceRecordIsAddedToTheSentenceSection();
});

Given("Click the X next to Criminal Sentence Programs", () => {
  criminalCaseHappyPathActions.clickTheXNextToCriminalSentencePrograms();
});

Then("Criminal Sentence Programs Tab closes", () => {
  criminalCaseHappyPathActions.criminalSentenceProgramsTabCloses();
});

Given("Select Financial from left side menu", () => {
  criminalCaseHappyPathActions.selectFinancialFromLeftSideMenu();
});

Given("Select Manage Assessments from Financial Menu", () => {
  criminalCaseHappyPathActions.selectManageAssessmentsFromFinancialMenu();
});

Given("Select the Case ID radio button if it is not already selected", () => {
  criminalCaseHappyPathActions.selectTheCaseIDRadioButtonIfItIsNotAlreadySelected();
});

Given("In the My Case ID Search field enter the Case ID", () => {
  criminalCaseHappyPathActions.inTheMyCaseIDSearchFieldEnterTheCaseID();
});

Then("The case is selected and expanded to view details", () => {
  criminalCaseHappyPathActions.theCaseIsSelectedAndExpandedToViewDetails();
});

Then("Click to Save costs to case", () => {
  criminalCaseHappyPathActions.clickToSaveCostsToCase();
});

Then("Green Noty indicating costs have been saved", () => {
  criminalCaseHappyPathActions.greenNotyIndicatingCostsHaveBeenSaved();
});

Then("Floppy disk no longer appears next to each assessment", () => {
  criminalCaseHappyPathActions.floppyDiskNoLongerAppearsNextToEachAssessment();
});

Given("In the Manage Assessments tab click the X to close the tabe", () => {
  criminalCaseHappyPathActions.inTheManageAssessmentsTabClickTheXToCloseTheTabe();
});

Then("Manage Assessments tab closed", () => {
  criminalCaseHappyPathActions.manageAssessmentsTabClosed();
});

Then("Select Receipt Payment from Financial Menu", () => {
  criminalCaseHappyPathActions.selectReceiptPaymentFromFinancialMenu();
});

Given("Select Case ID radio button", () => {
  criminalCaseHappyPathActions.selectCaseIDRadioButton();
});

Given("Enter the Case ID", () => {
  criminalCaseHappyPathActions.enterTheCaseID();
});

Then(
  "The case is selected and expanded to view the Payment assessment details",
  () => {
    criminalCaseHappyPathActions.theCaseIsSelectedAndExpandedToViewThePaymentAssessmentDetails();
  }
);

Given("Click Apply Full Amount", () => {
  criminalCaseHappyPathActions.clickApplyFullAmount();
});

Then("Amount applied to case should be correct", () => {
  criminalCaseHappyPathActions.amountAppliedToCaseShouldBeCorrect();
});

Given("Click Pay Type Description drop down and select Caseh", () => {
  criminalCaseHappyPathActions.clickPayTypeDescriptionDropDownAndSelectCaseh();
});

Given(
  "In Amount Tendered field ente rsame amount from Apply Amount field",
  () => {
    criminalCaseHappyPathActions.inAmountTenderedFieldEnteRsameAmountFromApplyAmountField();
  }
);

Given("Click to Save Payment", () => {
  criminalCaseHappyPathActions.clickToSavePayment();
});

Then("Green Noty stating receipt has been saved", () => {
  criminalCaseHappyPathActions.greenNotyStatingReceiptHasBeenSaved();
});

Then("View Payment Summary Displays payment Details", () => {
  criminalCaseHappyPathActions.viewPaymentSummaryDisplaysPaymentDetails();
});

Then("Receipt Number dipslays", () => {
  criminalCaseHappyPathActions.receiptNumberDipslays();
});

Then("Receipt Number is link to a copy of receipt", () => {
  criminalCaseHappyPathActions.receiptNumberIsLinkToACopyOfReceipt();
});

Given("Click the X next to Receipt Payment", () => {
  criminalCaseHappyPathActions.clickTheXNextToReceiptPayment();
});

Then("Receipt Payment Tab closes", () => {
  criminalCaseHappyPathActions.receiptPaymentTabCloses();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CriminalCaseHappyPathActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validUserSelectsEnterACase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "navigateToTheDefendantSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDLState"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDriversLicenseNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandDemographicsSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDateOfBirth"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterSSN");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandAddressSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterStreetAddress"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterCity");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterZipCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "saveDefendant"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyStatingDefendantSavedAndAddressSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "allDefendantInfoIsGrayedOut"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseDetailsSectionIsNowEnabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheCaseTabSelectDefaultCourtLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCaseTypeDropDownAndSelectCaseType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterArrestingAgencyORI"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFilingDateCurrentSystemDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "moveToProsecutingAttorneyOfRecordSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToAddPAOfRecord"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "addAdditionalProsecutingAttorneyOfRecordBoxOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "inProsecutingAttorneyTextFieldEnterCodeAndSelectName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToSaveClose"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "addAdditionalProsecutingAttorneyOfRecordBoxClosing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partyIsListedInProsecutingAttorneyField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickDocketDestriptionDropDownAndSelectAINFOInformationFiled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDocketDateAsToday"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "navigateToAdditionalCaseDetailsSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDateOfViolationAsOneMonthAgo"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterTimeAs"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDigitTicketNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDigitOCN"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickChooseActionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSaveCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "greenNotysDisplayWithDocketCaseAndAdditionalInformationSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseJudgeAssignmentDialogDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAManualJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "withCaseJudgeEnteredClickSaveJudgeAssignment"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "boxClosesAndGreenNotyAppearingConfirmingCaseNoEtc"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFutureEventDateAndTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectEventJudge"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "selectRoom");
  propertyNames = propertyNames.filter((funcName) => funcName !== "saveEvent");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotysThatEventWasSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCriminalFromLeftSideMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCourtDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectTheCaseIDRadioButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inTheMySearchFieldEnterTheCaseIDThatWasPreviouslyCreatedAndClickTheMagnifyingGlass"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "navigateToChargeDispositionDropDownUnderDispoisitionSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickChargeDispositionDropDownAndSelectDDGTPGuiltyPlea"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "inCourtDispositionEventClosurePopupBoxClickToSave"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "lickTheXNextToCourtDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "courtDispositionEventClosureBoxOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "boxClosesAndDispositionIsSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "courtDispositionTabCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSentenceProgramsFromLeftSideMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseIDRadioButtonIfNotAlreadySelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheMySearchFieldEnterTheCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "theCaseIsSelectedAndExpandedToViewSentenceProgramsAndJudgmentsInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickMagnifyingGlass"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inSentenceSectionClickToAddSentence"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inFineFieldForCountEnterTESTFineAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addSentenceBoxPopsUp"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToSave"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "boxCloses");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "sentenceRecordIsAddedToTheSentenceSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheXNextToCriminalSentencePrograms"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "criminalSentenceProgramsTabCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectFinancialFromLeftSideMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectManageAssessmentsFromFinancialMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "selectTheCaseIDRadioButtonIfItIsNotAlreadySelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheMyCaseIDSearchFieldEnterTheCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theCaseIsSelectedAndExpandedToViewDetails"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToSaveCostsToCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyIndicatingCostsHaveBeenSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "floppyDiskNoLongerAppearsNextToEachAssessment"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "inTheManageAssessmentsTabClickTheXToCloseTheTabe"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "manageAssessmentsTabClosed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectReceiptPaymentFromFinancialMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseIDRadioButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterTheCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "theCaseIsSelectedAndExpandedToViewThePaymentAssessmentDetails"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickApplyFullAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "amountAppliedToCaseShouldBeCorrect"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPayTypeDescriptionDropDownAndSelectCaseh"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "inAmountTenderedFieldEnteRsameAmountFromApplyAmountField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToSavePayment"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyStatingReceiptHasBeenSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "viewPaymentSummaryDisplaysPaymentDetails"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "receiptNumberDipslays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "receiptNumberIsLinkToACopyOfReceipt"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheXNextToReceiptPayment"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "receiptPaymentTabCloses"
  );
  cy.writeFile("./differences/CriminalCaseHappyPathActions.tmp", propertyNames);
}
