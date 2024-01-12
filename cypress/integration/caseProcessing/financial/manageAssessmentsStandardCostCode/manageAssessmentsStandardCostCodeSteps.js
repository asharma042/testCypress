/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import ManageAssessmentsStandardCostCodeActions from "./ManageAssessmentsStandardCostCodeActions";
const manageAssessmentsStandardCostCodeActions =
  new ManageAssessmentsStandardCostCodeActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/manageAssessmentsStandardCostCode/manageAssessmentsStandardCostCodeFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "manageAssessmentsStandardCostCode";
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

  let harPath = "caseProcessing/financial/manageAssessmentsStandardCostCode";
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

Given(
  "Case with single watercraft misdeameanor charge  has been disposed as guilty plea and has been sentenced to a fine of $55.00",
  () => {
    manageAssessmentsStandardCostCodeActions.caseWithSingleWatercraftMisdeameanorChargeHasBeenDisposedAsGuiltyPleaAndHasBeenSentencedToAFineOf5500();
  }
);

Given("Continue with scenario watercraft misdeameaor charge case", () => {
  manageAssessmentsStandardCostCodeActions.continueWithScenarioWatercraftMisdeameaorChargeCase();
});

Given("Click on Financial from the Business Process Menu", () => {
  manageAssessmentsStandardCostCodeActions.clickOnFinancialFromTheBusinessProcessMenu();
});

Given("Select Manage Assessments from the Financial Menu", () => {
  manageAssessmentsStandardCostCodeActions.selectManageAssessmentsFromTheFinancialMenu();
});

Given("Select the appropriate Financial Location", () => {
  manageAssessmentsStandardCostCodeActions.selectTheAppropriateFinancialLocation();
});

Given("Click to search by Case ID", () => {
  manageAssessmentsStandardCostCodeActions.clickToSearchByCaseID();
});

Given("In the My Case ID Search enter the corresponding Case ID", () => {
  manageAssessmentsStandardCostCodeActions.inTheMyCaseIDSearchEnterTheCorrespondingCaseID();
});

Given("Click the magnifying glass to search for the case", () => {
  manageAssessmentsStandardCostCodeActions.clickTheMagnifyingGlassToSearchForTheCase();
});

Then("The case displays in the Cases section", () => {
  manageAssessmentsStandardCostCodeActions.theCaseDisplaysInTheCasesSection();
});

Then("The Case is expanded to view the costs", () => {
  manageAssessmentsStandardCostCodeActions.theCaseIsExpandedToViewTheCosts();
});

Then(
  "Any pending costs display with a disk next to the cost description",
  () => {
    manageAssessmentsStandardCostCodeActions.anyPendingCostsDisplayWithADiskNextToTheCostDescription();
  }
);

Then(
  "Directly under the Assess Costs words is a box with the standard docket code XCM10 in it",
  () => {
    manageAssessmentsStandardCostCodeActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCM10InIt();
  }
);

Given("Click the Save button", () => {
  manageAssessmentsStandardCostCodeActions.clickTheSaveButton();
});

Then("All pending assessments and fines are saved to the case", () => {
  manageAssessmentsStandardCostCodeActions.allPendingAssessmentsAndFinesAreSavedToTheCase();
});

Then("The disk next to the cost description disappearing", () => {
  manageAssessmentsStandardCostCodeActions.theDiskNextToTheCostDescriptionDisappearing();
});

Then(
  "The Save Button and Save and Create Payment Plan buttons are disabled",
  () => {
    manageAssessmentsStandardCostCodeActions.theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled();
  }
);

Given(
  "Case with single Felony charge  has been disposed as guilty plea and has been sentenced to a fine of $55.00",
  () => {
    manageAssessmentsStandardCostCodeActions.caseWithSingleFelonyChargeHasBeenDisposedAsGuiltyPleaAndHasBeenSentencedToAFineOf5500();
  }
);

Given("Continue with scenario felony charge non violations bureau", () => {
  manageAssessmentsStandardCostCodeActions.continueWithScenarioFelonyChargeNonViolationsBureau();
});

Given(
  "Directly under the Assess Costs words is a box with the standard docket code XFRTC in it",
  () => {
    manageAssessmentsStandardCostCodeActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFRTCInIt();
  }
);

Given(
  "Case with single Felony charge has been disposed as guilty plea and when sentencing the SIS check box has been selected and 120 months is entered in probation boxes",
  () => {
    manageAssessmentsStandardCostCodeActions.caseWithSingleFelonyChargeHasBeenDisposedAsGuiltyPleaAndWhenSentencingTheSISCheckBoxHasBeenSelectedAnd120MonthsIsEnteredInProbationBoxes();
  }
);

Given(
  "Continue with scenario full disposed sentenced felony with SIS costs",
  () => {
    manageAssessmentsStandardCostCodeActions.continueWithScenarioFullDisposedSentencedFelonyWithSISCosts();
  }
);

Given(
  "Directly under the Assess Costs words is a box with the standard docket code XFSIS preloaded in it",
  () => {
    manageAssessmentsStandardCostCodeActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFSISPreloadedInIt();
  }
);

Given(
  "Case with single Infraction charge has been disposed as guilty plea and sentenced",
  () => {
    manageAssessmentsStandardCostCodeActions.caseWithSingleInfractionChargeHasBeenDisposedAsGuiltyPleaAndSentenced();
  }
);

Given("Validate fully disposed sentenced non traffic infraction charge", () => {
  manageAssessmentsStandardCostCodeActions.validateFullyDisposedSentencedNonTrafficInfractionCharge();
});

Given(
  "Directly under the Assess Costs words is a box with the standard docket code XCINO preloaded in it",
  () => {
    manageAssessmentsStandardCostCodeActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCINOPreloadedInIt();
  }
);

Given(
  "Case with single Traffic charge has been disposed as guilty plea and sentenced",
  () => {
    manageAssessmentsStandardCostCodeActions.caseWithSingleTrafficChargeHasBeenDisposedAsGuiltyPleaAndSentenced();
  }
);

Given(
  "Continue with scenario full disposed sentenced traffic infraction charge",
  () => {
    manageAssessmentsStandardCostCodeActions.continueWithScenarioFullDisposedSentencedTrafficInfractionCharge();
  }
);

Given(
  "Directly under the Assess Costs words is a box with the standard docket code XIPVT preloaded in it",
  () => {
    manageAssessmentsStandardCostCodeActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXIPVTPreloadedInIt();
  }
);

Given(
  "Case with single Misdemeanor charge  has been disposed as guilty plea and sentenced",
  () => {
    manageAssessmentsStandardCostCodeActions.caseWithSingleMisdemeanorChargeHasBeenDisposedAsGuiltyPleaAndSentenced();
  }
);

Given(
  "Continue with scenario fully disposed sentenced conservation infraction charge",
  () => {
    manageAssessmentsStandardCostCodeActions.continueWithScenarioFullyDisposedSentencedConservationInfractionCharge();
  }
);

Given(
  "Directly under the Assess Costs words is a box with the standard docket code XCM10 preloaded in it",
  () => {
    manageAssessmentsStandardCostCodeActions.directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCM10PreloadedInIt();
  }
);
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    ManageAssessmentsStandardCostCodeActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithSingleWatercraftMisdeameanorChargeHasBeenDisposedAsGuiltyPleaAndHasBeenSentencedToAFineOf5500"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "continueWithScenarioWatercraftMisdeameaorChargeCase"
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
      funcName !== "anyPendingCostsDisplayWithADiskNextToTheCostDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCM10InIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheSaveButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "allPendingAssessmentsAndFinesAreSavedToTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theDiskNextToTheCostDescriptionDisappearing"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "theSaveButtonAndSaveAndCreatePaymentPlanButtonsAreDisabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithSingleFelonyChargeHasBeenDisposedAsGuiltyPleaAndHasBeenSentencedToAFineOf5500"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "continueWithScenarioFelonyChargeNonViolationsBureau"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFRTCInIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithSingleFelonyChargeHasBeenDisposedAsGuiltyPleaAndWhenSentencingTheSISCheckBoxHasBeenSelectedAnd120MonthsIsEnteredInProbationBoxes"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "continueWithScenarioFullDisposedSentencedFelonyWithSISCosts"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXFSISPreloadedInIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithSingleInfractionChargeHasBeenDisposedAsGuiltyPleaAndSentenced"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "validateFullyDisposedSentencedNonTrafficInfractionCharge"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCINOPreloadedInIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithSingleTrafficChargeHasBeenDisposedAsGuiltyPleaAndSentenced"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "continueWithScenarioFullDisposedSentencedTrafficInfractionCharge"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXIPVTPreloadedInIt"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "caseWithSingleMisdemeanorChargeHasBeenDisposedAsGuiltyPleaAndSentenced"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "continueWithScenarioFullyDisposedSentencedConservationInfractionCharge"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "directlyUnderTheAssessCostsWordsIsABoxWithTheStandardDocketCodeXCM10PreloadedInIt"
  );
  cy.writeFile(
    "./differences/ManageAssessmentsStandardCostCodeActions.tmp",
    propertyNames
  );
}
