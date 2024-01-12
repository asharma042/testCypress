/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import ManageAssessmentsStandardCostCodeMultipleChargesActions from "./ManageAssessmentsStandardCostCodeMultipleChargesActions";
const manageAssessmentsStandardCostCodeMultipleChargesActions =
  new ManageAssessmentsStandardCostCodeMultipleChargesActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/manageAssessmentsStandardCostCodeMultipleCharges/manageAssessmentsStandardCostCodeMultipleChargesFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "manageAssessmentsStandardCostCodeMultipleCharges";
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

  let harPath =
    "caseProcessing/financial/manageAssessmentsStandardCostCodeMultipleCharges";
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

Given("Enter a case with 2 Misdemeanor charges.", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterACaseWith2MisdemeanorCharges();
});

Given("Enter case information on tab 1", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterCaseInformationOnTab1();
});

Given("Click on tab 2 to enter second charge information", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnTab2ToEnterSecondChargeInformation();
});

Given("Click Save and Dispose", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickSaveAndDispose();
});

Given("Click Criminal Disposition menu", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickCriminalDispositionMenu();
});

Given("Click on the Count 1 tab to show the charge", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnTheCount1TabToShowTheCharge();
});

Given("Click the Amend Charge Button", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickTheAmendChargeButton();
});

Then("A new window will open to enter the amended information into", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.aNewWindowWillOpenToEnterTheAmendedInformationInto();
});

Given("Enter Infraction charge in the Amended Missouri Charge Field", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterInfractionChargeInTheAmendedMissouriChargeField();
});

Then("Additional information will autofill in the remaining fields", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.additionalInformationWillAutofillInTheRemainingFields();
});

Given("Click Save on Amended Charge dialog", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickSaveOnAmendedChargeDialog();
});

Then("Green Noty will apear confirming changes", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.greenNotyWillApearConfirmingChanges();
});

Then(
  "Charge information on count 1 will change to new amended information entered with a fine",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.chargeInformationOnCount1WillChangeToNewAmendedInformationEnteredWithAFine();
  }
);

Given("Click Save on disposition page", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickSaveOnDispositionPage();
});

Then("User will receive a message asking {string}", (option0) => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.userWillReceiveAMessageAsking(
    option0
  );
});

Given("Click No", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickNo();
});

Given("Click Apply Disposition to Multiple Charges Button", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickApplyDispositionToMultipleChargesButton();
});

Then("A new window will open to apply Disposition", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.aNewWindowWillOpenToApplyDisposition();
});

Given("Click {string}", (option0) => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.click(option0);
});

Then("Checkmarks will appear next to each count", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.checkmarksWillAppearNextToEachCount();
});

Given("Click the drop down arrow in the Charge Disposition Field", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickTheDropDownArrowInTheChargeDispositionField();
});

Then("A list of dispositions will appear", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.aListOfDispositionsWillAppear();
});

Given("Select DDGTP", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectDDGTP();
});

Then("DDGTP Guilty Plea will appear in the Charge Disposition Field", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.dDGTPGuiltyPleaWillAppearInTheChargeDispositionField();
});

Then("Disposition Date will autofill with the current date", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.dispositionDateWillAutofillWithTheCurrentDate();
});

Then("Time will autofill with the current time", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.timeWillAutofillWithTheCurrentTime();
});

Given("Click on the calendar", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnTheCalendar();
});

Then("User will be able to select a different date", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.userWillBeAbleToSelectADifferentDate();
});

Then(
  "Time Field will highlight so user has the ability to choose a different time",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.timeFieldWillHighlightSoUserHasTheAbilityToChooseADifferentTime();
  }
);

Given("Enter in the DFT Atty MOBAR Field", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterInTheDFTAttyMOBARField();
});

Then("A list of possible attorney will appear", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.aListOfPossibleAttorneyWillAppear();
});

Given("Select Attorney", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectAttorney();
});

Then("Full MOBAR number will appear in the DFT Atty MOBAR Field", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.fullMOBARNumberWillAppearInTheDFTAttyMOBARField();
});

Given("Click Process Continuation Button", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickProcessContinuationButton();
});

Then("Count 1 will be saved as the amended charge with a code of XMRTA", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.count1WillBeSavedAsTheAmendedChargeWithACodeOfXMRTA();
});

Given(
  "Click the Add Sentence button in the Sentence Programs and Judgments section",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.clickTheAddSentenceButtonInTheSentenceProgramsAndJudgmentsSection();
  }
);

Then("Window will open to enter fine amount", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.windowWillOpenToEnterFineAmount();
});

Given("Enter fine amount in each charge", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterFineAmountInEachCharge();
});

Given("Select Manasge Assessments", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectManasgeAssessments();
});

Then("New tab will open in Manage Assessments function", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.newTabWillOpenInManageAssessmentsFunction();
});

Given(
  "Click disc icon in the Fine Description Field of count 1 to save it",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.clickDiscIconInTheFineDescriptionFieldOfCount1ToSaveIt();
  }
);

Given(
  "Click disc icon in the Fine Description Field of count 2 to save it",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.clickDiscIconInTheFineDescriptionFieldOfCount2ToSaveIt();
  }
);

Given(
  "Click the dropdown arrow next to the Select Standard Cost Docket Code Filed and the Assess Cost Section",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.clickTheDropdownArrowNextToTheSelectStandardCostDocketCodeFiledAndTheAssessCostSection();
  }
);

Given("Select XMRTA", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectXMRTA();
});

Then("XMRTA will be available in the drop down list", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.xMRTAWillBeAvailableInTheDropDownList();
});

Given(
  "Case with Felony charge and an Infraction charge has been disposed as guilty plea and been sentenced",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.caseWithFelonyChargeAndAnInfractionChargeHasBeenDisposedAsGuiltyPleaAndBeenSentenced();
  }
);

Given(
  "Continue with scenario felony charge and infraction charge non violations bureau",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.continueWithScenarioFelonyChargeAndInfractionChargeNonViolationsBureau();
  }
);

Given("Click on Financial from the Business Process Menu", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnFinancialFromTheBusinessProcessMenu();
});

Given("Select Manage Assessments from the Financial Menu", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectManageAssessmentsFromTheFinancialMenu();
});

Given("Select the appropriate Financial Location", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectTheAppropriateFinancialLocation();
});

Given("Click to search by Case ID", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickToSearchByCaseID();
});

Given("In the My Case ID Search enter the corresponding Case ID", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.inTheMyCaseIDSearchEnterTheCorrespondingCaseID();
});

Given("Click the magnifying glass to search for the case", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickTheMagnifyingGlassToSearchForTheCase();
});

Then("The case displays in the Cases section", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.theCaseDisplaysInTheCasesSection();
});

Then("The Case is expanded to view the costs", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.theCaseIsExpandedToViewTheCosts();
});

Then(
  "Any pending costs display with a disc next to the cost description",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.anyPendingCostsDisplayWithADiscNextToTheCostDescription();
  }
);

Then(
  "Directly under the Assess Costs words is a box with the standard docket code XFRTC",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFRTC();
  }
);

Given("Click the Save button", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickTheSaveButton();
});

Then("All pending assessments and fines are saved to the case", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.allPendingAssessmentsAndFinesAreSavedToTheCase();
});

Then("The disc next to the cost description disappears", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.theDiscNextToTheCostDescriptionDisappears();
});

Then(
  "The Save Button and Save and Create Payment Plan buttons are disabled",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled();
  }
);

Given("Case with a Felony charge and a Misdemeanor charge", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.caseWithAFelonyChargeAndAMisdemeanorCharge();
});

Given("Enter charge information on tab 1", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterChargeInformationOnTab1();
});

Given("User is in Court Disposition function in SMC", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.userIsInCourtDispositionFunctionInSMC();
});

Given("Click on tab 2", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnTab2();
});

Given("Enter second charge information", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterSecondChargeInformation();
});

Given("Click Choose Action button", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickChooseActionButton();
});

Given("Click drop down next to Judge Assignment and select Judge", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickDropDownNextToJudgeAssignmentAndSelectJudge();
});

Given(
  "Disposition section is available at bottom of the Enter a Case Process",
  () => {
    manageAssessmentsStandardCostCodeMultipleChargesActions.dispositionSectionIsAvailableAtBottomOfTheEnterACaseProcess();
  }
);

Given("Click to expand Disposition section", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickToExpandDispositionSection();
});

Given("Click on Count 1 tab to make active", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnCount1TabToMakeActive();
});

Given("Click drop down next to Charge Disposition", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickDropDownNextToChargeDisposition();
});

Given("Select DDCT from the drop down list", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectDDCTFromTheDropDownList();
});

Given("Click on Count 2 tab to make active", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickOnCount2TabToMakeActive();
});

Given("Select DDGTP from the drop down list", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.selectDDGTPFromTheDropDownList();
});

Given("Click Save", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickSave();
});

Given("Open Criminal Sentence Programs from the BPM", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.openCriminalSentenceProgramsFromTheBPM();
});

Given("Search for case", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.searchForCase();
});

Given("Click Add Sentence button", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.clickAddSentenceButton();
});

Then("Guilty Disposition window opens and Count 2 is visible", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.guiltyDispositionWindowOpensAndCount2IsVisible();
});

Given("Enter fine amount", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.enterFineAmount();
});

Then("XMRTA should be available in the drop down list", () => {
  manageAssessmentsStandardCostCodeMultipleChargesActions.xMRTAShouldBeAvailableInTheDropDownList();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    ManageAssessmentsStandardCostCodeMultipleChargesActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterACaseWith2MisdemeanorCharges"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseInformationOnTab1"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnTab2ToEnterSecondChargeInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveAndDispose"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCriminalDispositionMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnTheCount1TabToShowTheCharge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheAmendChargeButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "aNewWindowWillOpenToEnterTheAmendedInformationInto"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "enterInfractionChargeInTheAmendedMissouriChargeField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "additionalInformationWillAutofillInTheRemainingFields"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveOnAmendedChargeDialog"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyWillApearConfirmingChanges"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "chargeInformationOnCount1WillChangeToNewAmendedInformationEnteredWithAFine"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveOnDispositionPage"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userWillReceiveAMessageAsking"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickNo");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickApplyDispositionToMultipleChargesButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aNewWindowWillOpenToApplyDisposition"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "click");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkmarksWillAppearNextToEachCount"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickTheDropDownArrowInTheChargeDispositionField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aListOfDispositionsWillAppear"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectDDGTP"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "dDGTPGuiltyPleaWillAppearInTheChargeDispositionField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "dispositionDateWillAutofillWithTheCurrentDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "timeWillAutofillWithTheCurrentTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnTheCalendar"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userWillBeAbleToSelectADifferentDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "timeFieldWillHighlightSoUserHasTheAbilityToChooseADifferentTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterInTheDFTAttyMOBARField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "aListOfPossibleAttorneyWillAppear"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAttorney"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "fullMOBARNumberWillAppearInTheDFTAttyMOBARField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickProcessContinuationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "count1WillBeSavedAsTheAmendedChargeWithACodeOfXMRTA"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickTheAddSentenceButtonInTheSentenceProgramsAndJudgmentsSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "windowWillOpenToEnterFineAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFineAmountInEachCharge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectManasgeAssessments"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newTabWillOpenInManageAssessmentsFunction"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickDiscIconInTheFineDescriptionFieldOfCount1ToSaveIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickDiscIconInTheFineDescriptionFieldOfCount2ToSaveIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickTheDropdownArrowNextToTheSelectStandardCostDocketCodeFiledAndTheAssessCostSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectXMRTA"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "xMRTAWillBeAvailableInTheDropDownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithFelonyChargeAndAnInfractionChargeHasBeenDisposedAsGuiltyPleaAndBeenSentenced"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "continueWithScenarioFelonyChargeAndInfractionChargeNonViolationsBureau"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnFinancialFromTheBusinessProcessMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectManageAssessmentsFromTheFinancialMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectTheAppropriateFinancialLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToSearchByCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheMyCaseIDSearchEnterTheCorrespondingCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheMagnifyingGlassToSearchForTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theCaseDisplaysInTheCasesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theCaseIsExpandedToViewTheCosts"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "anyPendingCostsDisplayWithADiscNextToTheCostDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFRTC"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheSaveButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "allPendingAssessmentsAndFinesAreSavedToTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theDiscNextToTheCostDescriptionDisappears"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseWithAFelonyChargeAndAMisdemeanorCharge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterChargeInformationOnTab1"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userIsInCourtDispositionFunctionInSMC"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnTab2"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterSecondChargeInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickChooseActionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickDropDownNextToJudgeAssignmentAndSelectJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "dispositionSectionIsAvailableAtBottomOfTheEnterACaseProcess"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToExpandDispositionSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCount1TabToMakeActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickDropDownNextToChargeDisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectDDCTFromTheDropDownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCount2TabToMakeActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectDDGTPFromTheDropDownList"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickSave");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "openCriminalSentenceProgramsFromTheBPM"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchForCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAddSentenceButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "guiltyDispositionWindowOpensAndCount2IsVisible"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFineAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "xMRTAShouldBeAvailableInTheDropDownList"
  );
  cy.writeFile(
    "./differences/ManageAssessmentsStandardCostCodeMultipleChargesActions.tmp",
    propertyNames
  );
}
