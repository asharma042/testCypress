/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import CreateMaintainPaymentPlanElements from "./CreateMaintainPaymentPlanElements";
import jsonHandler from "../../../../fixtures/jsonHandler";
import ManageAssessmentsService from "../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsService";

export default class CreateMaintainPaymentPlanActions {
  constructor() {
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();

    this.elements = new CreateMaintainPaymentPlanElements();

    //The file to hold runtime data
    this.tempFileName = "cypress\\temp\\createMaintainPaymentPlan.json";

    this.maService = new ManageAssessmentsService(
      this.tempFileName,
      this.defendant
    );
  }
  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.defendant = $json.defendant;
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }

  /**
   * Scenario: Create a new payment plan on an existing case
   */
  criminalCaseIsCreatedForUserCaseHasBeenDisposedSentenceHasBeenIncludedWithAFineCostsAndFinesHaveBeenAddedAndSaved() {
    this.scenario = "scenario1";
    this.maService.createGenericCase(this.scenario);
  }
  /**
   * Scenario: User new payment plan on an existing case
   */
  useCaseFromPreviousScenario() {
    this.scenario = "scenario1";
    this.readRunTimeFile();
  }

  goToManageAssessments() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.clickMenu("Manage Assessments");
  }

  searchForPreviousCase() {
    this.elements.seachByCaseIdButton().click();
    //enter previous case
    cy.intercept("smc-web/getCourtLocnDispCasesById*").as("LocnDispCasesById");
    cy.get("@defendant").then(($defendant) => {
      this.elements.searchInput().type(`${$defendant.caseId}{enter}`);
    });
    cy.wait(["@LocnDispCasesById"]);
  }

  caseShouldAppearInTable() {
    //check that the case appeared in the table
    this.elements.resultsTable().then(($table) => {
      cy.get("@defendant").then(($defendant) => {
        cy.wrap($table[0]).contains("td", $defendant.caseId).should("exist");
      });
    });
  }

  selectSaveAndCreatePaymentPlan() {
    //click on save and create payment plan button
    this.elements.saveAndCreatePaymentPlanButton().click();
  }

  planInformationWindowOpens() {
    //verify that the pop up window appears
    this.elements.planInformationPopUp("Plan Information").should("be.visible");
  }

  enterInstallmentAmount() {
    let installmentAmount = jsonHandler.getValue(
      "scenario3",
      "installmentAmount"
    );
    //enter installment amount 10
    this.elements.installmentAmount().type(installmentAmount);
  }

  clickThePayFrequencyField() {
    //click on the the drop box
    this.elements.payFrequencyDropDown();
  }

  selectMonthly() {
    this.elements.payFrequencyDropDown().select("Monthly");
  }

  clickNextPaymentDueField() {
    this.elements.futurePaymentDueDate().click();
  }

  selectDate() {
    //enter future date
    let randomNumber = this.utils.generateRandomNumberBetween(10, 50);

    this.futureDate =
      this.utils.getValidDateForSchedulingStartingFromNow(randomNumber);

    this.elements.futurePaymentDueDate().focus().type(`${this.futureDate}`);

    this.elements.futurePaymentDueDate().blur();
  }

  clickCreateNewPlanButton() {
    this.elements.createNewPlanButton().click();
  }

  paymentPlanCollectionProcessAlertAppears() {
    let title = "Payment Plan Collection Process Alert";
    this.elements.smartAlertBoxTitle().contains(title).should("be.visible");

    //vaildate the name
    cy.get("@defendant").then(($defendant) => {
      let name = `${$defendant.lastName.toUpperCase()}, ${$defendant.firstName.toUpperCase()}`;
      this.elements.smartAlertTable().contains("td", name).should("be.visible");
    });
  }

  pressNo() {
    //intercept code

    cy.intercept("smc-web/saveCreatePaymentPlanManageAssessments.do").as(
      "saveCreatePaymentPlan"
    );

    this.elements.clickNoOnSmaartAlert().click();

    //wait code
    cy.wait(["@saveCreatePaymentPlan"]).then(($ele) => {
      let planNumber = $ele.response.body.payPlanInfoDetails[0].planNoGenerated;
      this.defendant.planNumber = planNumber;
      cy.writeFile(this.tempFileName, {
        defendant: this.defendant,
      });
    });
  }

  windowOpensVerifyingPaymentPlanWasCreatedShowingThePaymentPlanNumberForTheCase() {
    let title = "Payment Plan Creation Details";
    this.elements.smartAlertBoxTitle().contains(title).should("be.visible");
  }

  saveThePlanNumber() {
    //did during function pressno()
  }

  clickOk() {
    this.elements.clickOkOnSmartAlert().click();
  }

  paymentPlanCreationDetailsWindowAppears() {
    //no op
  }

  validatePaymentPlanHasPaymentPlanColumnPopulated() {
    this.elements.resultsTable().then(($table) => {
      cy.get("@defendant").then(($defendant) => {
        cy.wrap($table[0])
          .contains("td", $defendant.planNumber)
          .should("exist");
      });
    });
  }

  closeTab() {
    this.elements.closeTab().click();
  }
  /**
   * Scenario: Maintain existing Payment Plan
   */
  useTheCaseFromPreviousScenario() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.clickMenu("Create & Maintain Payment Plan");

    this.scenario = "scenario1";
    this.readRunTimeFile();
  }

  selectPlanNoRadioButtonInTheSearchSection() {
    this.elements.planNoRadioButton().click();
  }

  enterPaymentPlanNumber() {
    cy.get("@defendant").then(($defendant) => {
      this.elements.planNoSearchInput().click().clear();
      this.elements.planNoSearchInput().type(`${$defendant.planNumber}`);
    });
  }

  clickSearchIcon() {
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.elements.planNoSearchButton().click();

    cy.wait(["@saveUserNotyMessages"]);
  }

  caseOpensInWindow() {
    this.elements.manageAssessmentResultsTable().then(($table) => {
      cy.get("@defendant").then(($defendant) => {
        cy.wrap($table[0]).contains("td", $defendant.caseId).should("exist");
      });
    });
  }

  selectCaseByCheckingTheBoxNextToTheCaseNumber() {
    cy.intercept("smc-web/insertCreatePaymentPlanSection*").as(
      "insertCreatePaymentPlanSection"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder1"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder2"
    );
    cy.intercept("smc-web/insertMaintainPaymentPlan*").as(
      "insertMaintainPaymentPlan"
    );
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder3"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.elements.clickCheckbox().click();
    cy.wait([
      "@insertCreatePaymentPlanSection",
      "@setTableSorterSortOrder1",
      "@setTableSorterSortOrder2",
      "@insertMaintainPaymentPlan",
      "@setTableSorterSortOrder3",
      "@saveUserNotyMessages",
    ]);
  }

  clickTheMaintainPaymentPlanSectionToExpandPaymentPlanDetails() {
    cy.intercept("smc-web/getAssessCostResultsByPlanNo*").as(
      "getAssessCostResultsByPlanNo"
    );
    cy.intercept("smc-web/getAssessFineResultsByPlanNo*").as(
      "getAssessFineResultsByPlanNo"
    );
    cy.intercept("smc-web/selectSatisfyRecoverableBalance*").as(
      "selectSatisfyRecoverableBalance"
    );
    cy.intercept("smc-web/financialMaintainPaymentPlanSchedule*").as(
      "financialMaintainPaymentPlanSchedule"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.elements.expandCaseInformation().click();

    cy.wait([
      "@getAssessCostResultsByPlanNo",
      "@getAssessFineResultsByPlanNo",
      "@selectSatisfyRecoverableBalance",
      "@financialMaintainPaymentPlanSchedule",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getTableSorterFilters",
      "@setTableSorterSortOrder",
      "@saveUserNotyMessages",
    ]);
  }

  sectionExpandsToShowInstallmentDatesAndAmounts() {
    this.elements.dueDaateAndAmountDueTable().contains("th", "Due Date");

    this.elements.dueDaateAndAmountDueTable().contains("th", "Amount Due");
  }

  clickThePencilIconNextToTheFirstPaymentDateToEdit() {
    this.elements.dueDatePencil().then(($ele) => {
      cy.wrap($ele[0]).click();
    });
  }

  calendarAppears() {
    this.elements.modifyCalendar().should("be.visible");
  }

  selectADifferentDateForTheFirstPayment() {
    this.elements.paymentScheduleTable().then(($table) => {
      let dates = new Array();
      //Save the original dates
      for (let $row = 1; $row < $table[0].tBodies[0].rows.length; $row++) {
        let date =
          $table[0].tBodies[0].rows[
            $row
          ].cells[0].children[0].textContent.trim();
        dates.push(date);
      }
      cy.wrap(dates).as("originalDates");
    });

    this.futureDate = this.utils.getValidDateForSchedulingStartingFromNow(7);

    cy.intercept("smc-web/saveUserNotyMessage*").as("saveUserNotyMessage");

    this.elements
      .newPaymentDueDate()
      .focus()
      .type(`${this.futureDate}`)
      .realPress("Tab");

    cy.wait(["@saveUserNotyMessage"]);
  }

  theFirstPaymentDateChangesToSelectedDate() {
    this.elements.confirmDateChange().contains(this.futureDate);
  }

  remainingPaymentDatesStayTheSame() {
    this.elements.paymentScheduleTable().then(($table) => {
      cy.get("@originalDates").then(($original) => {
        for (let $row = 1; $row < $table[0].tBodies[0].rows.length; $row++) {
          let date =
            $table[0].tBodies[0].rows[
              $row
            ].cells[0].children[0].textContent.trim();
          let origDate = $original[$row - 1];

          expect(
            date === origDate,
            `Expected row ${$row} date of ${date} to be original date: ${origDate}`
          ).to.be.true;
        }
      });
    });
  }

  saveOrginalAmount() {
    this.elements.amountDueBox().then(($ele) => {
      let orginalAmount = $ele[$ele.length - 1].children[0].textContent;
      this.defendant.orginalAmount = orginalAmount;
      cy.writeFile(this.tempFileName, {
        defendant: this.defendant,
      });
    });
  }

  clickThePencilIconNextToTheFirstPaymentAmountToEdit() {
    this.saveOrginalAmount();

    this.elements.amountDuePencil().click();
  }

  windowOpensToEnterThePaymentAmount() {
    this.elements.clickOutsideOfTheBlock().should("be.visible");
  }

  enterNewPaymentAmount() {
    let newPaymentAmount = jsonHandler.getValue(
      "scenario3",
      "newPaymentAmount"
    );

    this.elements.updateAmountDueInput().then(($ele) => {
      cy.wrap($ele[0]).type(newPaymentAmount);
    });
  }

  clickOutsideTheWindow() {
    this.elements.clickOutsideOfTheBlock().click();
  }

  firstPaymentChanges() {
    let paymentAmount = jsonHandler.getValue("scenario3", "newPaymentAmount");
    this.elements.amountDueBox().then(($ele) => {
      let payment = `$${paymentAmount}.00`;
      let current = $ele[0].children[0].textContent;
      expect(
        current === payment,
        `Expected payment '${payment}' but found ${current}`
      ).to.be.true;
    });
  }

  lastPaymentIsAdjustedByTheDiffrence() {
    let orginalPaymentAmount = this.defendant.orginalAmount;

    this.elements.amountDueBox().then(($ele) => {
      let currentPayAmount = $ele[$ele.length - 1].children[0].textContent;
      expect(
        currentPayAmount != orginalPaymentAmount,
        `Expected payment to be differnt from '${orginalPaymentAmount}' but found '${currentPayAmount}' `
      ).to.be.true;
    });
  }

  clickSavePlanUpdateButtonOnTheLowerLeftOfTheScreen() {
    this.elements.savePlanUpdateButton().click();
  }

  paymentPlanIsUpdatedWithNewInformation() {
    this.elements.closeTab().click();

    let title = "Unsaved Changes";
    this.elements.unsavedChangePopUp().contains(title).should("be.visible");

    this.elements.unsavedChangePopUpClickYes().click();
  }
}
