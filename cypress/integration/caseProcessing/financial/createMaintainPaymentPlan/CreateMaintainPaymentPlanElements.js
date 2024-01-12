/// <reference types="cypress" />

export default class CreateMaintainPaymentPlanElements {
  manageAssessmsntSaveBtn() {
    return cy.get(".manageAssessmsntSaveBtn");
  }
  closeTab() {
    return cy.get(".close-tab-span");
  }
  seachByCaseIdButton() {
    return cy.get(`[id^=finCaseIdRadio]`);
  }

  searchInput() {
    return cy.get(`[id^=finCostCaseId]`);
  }

  manageAssesmentSearchButton() {
    return cy.get(`[id^=finCaseSearchButton]`);
  }

  resultsTable() {
    return cy.get(`[data-process-name=finmanageassessments]`);
  }

  clickCostAssesmentCheckBox() {
    return cy.get(`[name^=selectAllCostAssessments]`);
  }

  fineAssessmentCheckBox() {
    return cy.get(`[name^=selectAllFineAssessments_]`);
  }

  exemptDebtCollectionCheckBox() {
    return cy.get(`[name=exemptDebtCollection]`);
  }

  installmentAmount() {
    return cy.get(`[name=installmentAmtToApply]`);
  }

  futurePaymentDueDate() {
    return cy.get("[id^=dueDate_]");
  }

  saveAndCreatePaymentPlanButton() {
    return cy.get(".manageAssessmsntSaveCreatePlanBtn");
  }

  payFrequencyDropDown() {
    return cy.get("[id^=payfrequencyPP-]");
  }

  createNewPlanButton() {
    return cy.get(".createNewPlanMa");
  }

  planInformationPopUp(title) {
    return cy.get(`span:contains("${title}")`);
  }

  smartAlertBoxTitle() {
    return cy.get("#smartAlertTitle");
  }

  clickNoOnSmaartAlert() {
    return cy.get("[data-id=no]");
  }

  smartAlertTable() {
    return cy.get(".fineAssessedTable").then(($ele) => {
      return $ele[1];
    });
  }

  paymentPlanSmartAlert() {
    return cy.get("[id=smartAlertScrollArea]");
  }

  clickOkOnSmartAlert() {
    return cy.get("[data-id=ok]");
  }

  planNoRadioButton() {
    return cy.get("[id^=finPlanNoRadio]");
  }

  planNoSearchInput() {
    return cy.get(`[id^=finCostPlanNumber]`);
  }

  planNoSearchButton() {
    return cy.get(`[id^=planNumberSearchBtn]`);
  }

  manageAssessmentResultsTable() {
    return cy.get(`[data-process-name=finreceiptingsearch]`);
  }

  clickCheckbox() {
    return cy.get(`[name=createPaymentPlanSelectCaseResult]`).then(($ele) => {
      return $ele[1];
    });
  }

  expandCaseInformation() {
    return cy.get(".finMaintainPayPlan");
  }

  dueDatePencil() {
    return cy.get(".editIconDateInstallment");
  }

  updateAmountDueInput() {
    return cy.get(".editIconMaintainInput");
  }

  savePlanUpdateButton() {
    return cy.get(".maintainPlanSaveButton");
  }

  dueDaateAndAmountDueTable() {
    return cy.get(`[data-process-name=finmaintainpayplanscheduler]`);
  }

  modifyCalendar() {
    return cy.get("#ui-datepicker-div");
  }

  newPaymentDueDate() {
    return cy.get("[id^=installmentDateName_]");
  }

  confirmDateChange() {
    return cy.get(".editIconMaintainSpan");
  }

  amountDuePencil() {
    return cy.get(".editInstallmentIcon").then(($ele) => {
      return cy.wrap($ele[0]);
    });
  }

  clickOutsideOfTheBlock() {
    return cy.get(".installmentScheduleModifyParentDiv");
  }

  paymentScheduleTable() {
    return cy
      .get("[data-process-name=finmaintainpayplanscheduler]")
      .then(($ele) => {
        return $ele[0];
      });
  }

  amountDueBox() {
    return cy.get(`[id^=trRow-]`).find(`.schAmtDue `);
  }

  amount(total) {
    return cy.get(`span:contains("${total}")`);
  }

  unsavedChangePopUp() {
    return cy.get("#smartAlertTitle");
  }

  unsavedChangePopUpClickYes() {
    return cy.get("[data-id=yes]");
  }
}
