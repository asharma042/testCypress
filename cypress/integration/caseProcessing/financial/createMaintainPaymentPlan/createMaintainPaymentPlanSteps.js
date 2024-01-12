/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CreateMaintainPaymentPlanActions from "./CreateMaintainPaymentPlanActions";
const createMaintainPaymentPlanActions = new CreateMaintainPaymentPlanActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/createMaintainPaymentPlan/createMaintainPaymentPlanFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "createMaintainPaymentPlan";
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

  let harPath = "caseProcessing/financial/createMaintainPaymentPlan";
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
  "Criminal case is created for user Case has been disposed  sentence has been included with a fine costs and fines have been added and saved.",
  () => {
    createMaintainPaymentPlanActions.criminalCaseIsCreatedForUserCaseHasBeenDisposedSentenceHasBeenIncludedWithAFineCostsAndFinesHaveBeenAddedAndSaved();
  }
);

Given("Use case from previous scenario", () => {
  createMaintainPaymentPlanActions.useCaseFromPreviousScenario();
});

Given("Go to Manage Assessments", () => {
  createMaintainPaymentPlanActions.goToManageAssessments();
});

Given("Search for previous case", () => {
  createMaintainPaymentPlanActions.searchForPreviousCase();
});

Then("Case should appear in table", () => {
  createMaintainPaymentPlanActions.caseShouldAppearInTable();
});

Given("Select Save and Create Payment Plan", () => {
  createMaintainPaymentPlanActions.selectSaveAndCreatePaymentPlan();
});

Then("Plan information window opens", () => {
  createMaintainPaymentPlanActions.planInformationWindowOpens();
});

Given("Enter installment amount", () => {
  createMaintainPaymentPlanActions.enterInstallmentAmount();
});

Given("Click the Pay Frequency field", () => {
  createMaintainPaymentPlanActions.clickThePayFrequencyField();
});

Given("Select Monthly", () => {
  createMaintainPaymentPlanActions.selectMonthly();
});

Given("Click Next Payment Due field", () => {
  createMaintainPaymentPlanActions.clickNextPaymentDueField();
});

Given("Select Date", () => {
  createMaintainPaymentPlanActions.selectDate();
});

Given("Click Create New Plan button", () => {
  createMaintainPaymentPlanActions.clickCreateNewPlanButton();
});

Then("Payment plan collection process alert appears", () => {
  createMaintainPaymentPlanActions.paymentPlanCollectionProcessAlertAppears();
});

Given("Press no", () => {
  createMaintainPaymentPlanActions.pressNo();
});

Then(
  "Window opens verifying Payment Plan was created showing the Payment Plan number for the case",
  () => {
    createMaintainPaymentPlanActions.windowOpensVerifyingPaymentPlanWasCreatedShowingThePaymentPlanNumberForTheCase();
  }
);

Then("Save the plan number", () => {
  createMaintainPaymentPlanActions.saveThePlanNumber();
});

Given("Click Ok", () => {
  createMaintainPaymentPlanActions.clickOk();
});

Then("Payment Plan Creation Details window appears", () => {
  createMaintainPaymentPlanActions.paymentPlanCreationDetailsWindowAppears();
});

Then("Validate payment plan has payment plan column populated", () => {
  createMaintainPaymentPlanActions.validatePaymentPlanHasPaymentPlanColumnPopulated();
});

Given("Close tab", () => {
  createMaintainPaymentPlanActions.closeTab();
});

Given("Use the case from previous scenario", () => {
  createMaintainPaymentPlanActions.useTheCaseFromPreviousScenario();
});

Given("Select Plan No radio button in the Search section", () => {
  createMaintainPaymentPlanActions.selectPlanNoRadioButtonInTheSearchSection();
});

Given("Enter Payment Plan number", () => {
  createMaintainPaymentPlanActions.enterPaymentPlanNumber();
});

Given("Click Search icon", () => {
  createMaintainPaymentPlanActions.clickSearchIcon();
});

Then("Case opens in window", () => {
  createMaintainPaymentPlanActions.caseOpensInWindow();
});

Given("Select case by checking the box next to the case number", () => {
  createMaintainPaymentPlanActions.selectCaseByCheckingTheBoxNextToTheCaseNumber();
});

Given(
  "Click the Maintain Payment Plan section to expand Payment Plan details",
  () => {
    createMaintainPaymentPlanActions.clickTheMaintainPaymentPlanSectionToExpandPaymentPlanDetails();
  }
);

Then("Section expands to show installment dates and amounts", () => {
  createMaintainPaymentPlanActions.sectionExpandsToShowInstallmentDatesAndAmounts();
});

Given("Click the pencil icon next to the first payment date to edit", () => {
  createMaintainPaymentPlanActions.clickThePencilIconNextToTheFirstPaymentDateToEdit();
});

Then("Calendar appears", () => {
  createMaintainPaymentPlanActions.calendarAppears();
});

Given("Select a different date for the first payment", () => {
  createMaintainPaymentPlanActions.selectADifferentDateForTheFirstPayment();
});

Then("The first payment date changes to selected date", () => {
  createMaintainPaymentPlanActions.theFirstPaymentDateChangesToSelectedDate();
});

Then("Remaining payment dates stay the same", () => {
  createMaintainPaymentPlanActions.remainingPaymentDatesStayTheSame();
});

Given("Click the pencil icon next to the first payment amount to edit", () => {
  createMaintainPaymentPlanActions.clickThePencilIconNextToTheFirstPaymentAmountToEdit();
});

Then("Window opens to enter the payment amount", () => {
  createMaintainPaymentPlanActions.windowOpensToEnterThePaymentAmount();
});

Given("Enter new payment amount", () => {
  createMaintainPaymentPlanActions.enterNewPaymentAmount();
});

Given("Click outside the window", () => {
  createMaintainPaymentPlanActions.clickOutsideTheWindow();
});

Then("First payment changes", () => {
  createMaintainPaymentPlanActions.firstPaymentChanges();
});

Then("Last payment is adjusted by the diffrence", () => {
  createMaintainPaymentPlanActions.lastPaymentIsAdjustedByTheDiffrence();
});

Given("Click Save Plan Update button on the lower left of the screen", () => {
  createMaintainPaymentPlanActions.clickSavePlanUpdateButtonOnTheLowerLeftOfTheScreen();
});

Then("Payment Plan is updated with new information", () => {
  createMaintainPaymentPlanActions.paymentPlanIsUpdatedWithNewInformation();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CreateMaintainPaymentPlanActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "criminalCaseIsCreatedForUserCaseHasBeenDisposedSentenceHasBeenIncludedWithAFineCostsAndFinesHaveBeenAddedAndSaved"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useCaseFromPreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "goToManageAssessments"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchForPreviousCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseShouldAppearInTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSaveAndCreatePaymentPlan"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "planInformationWindowOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterInstallmentAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickThePayFrequencyField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectMonthly"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickNextPaymentDueField"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "selectDate");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCreateNewPlanButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "paymentPlanCollectionProcessAlertAppears"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "pressNo");
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "windowOpensVerifyingPaymentPlanWasCreatedShowingThePaymentPlanNumberForTheCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "saveThePlanNumber"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickOk");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "paymentPlanCreationDetailsWindowAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "validatePaymentPlanHasPaymentPlanColumnPopulated"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "closeTab");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useTheCaseFromPreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPlanNoRadioButtonInTheSearchSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterPaymentPlanNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSearchIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseOpensInWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseByCheckingTheBoxNextToTheCaseNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickTheMaintainPaymentPlanSectionToExpandPaymentPlanDetails"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "sectionExpandsToShowInstallmentDatesAndAmounts"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickThePencilIconNextToTheFirstPaymentDateToEdit"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "calendarAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectADifferentDateForTheFirstPayment"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "theFirstPaymentDateChangesToSelectedDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "remainingPaymentDatesStayTheSame"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickThePencilIconNextToTheFirstPaymentAmountToEdit"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "windowOpensToEnterThePaymentAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterNewPaymentAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOutsideTheWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "firstPaymentChanges"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "lastPaymentIsAdjustedByTheDiffrence"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickSavePlanUpdateButtonOnTheLowerLeftOfTheScreen"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "paymentPlanIsUpdatedWithNewInformation"
  );
  cy.writeFile(
    "./differences/CreateMaintainPaymentPlanActions.tmp",
    propertyNames
  );
}
