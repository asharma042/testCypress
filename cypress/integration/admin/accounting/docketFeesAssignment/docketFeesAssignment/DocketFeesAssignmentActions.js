/// <reference types="cypress" />

import Utils from "../../../../utils/utils";
import DocketFeesAssignmentElements from "./DocketFeesAssignmentElements";
import jsonHandler from "../../../../../fixtures/jsonHandler";

export default class DocketFeesAssignmentActions {
  constructor() {
    this.utils = new Utils();
    this.elements = new DocketFeesAssignmentElements();
    this.tempName = "cypress\\temp\\docketFeesAssignment.json";
  }
  /**
   * Scenario: CBS User adds a DETC Code to a Docket Code
   */
  userIsACBSAccountingEmployeeWithSmcaccountingAdministrationSecurityRole() {
    cy.login();
    cy.clickLink("Admin");
    cy.clickMenu("Accounting");
    cy.clickMenu("Docket Fees Assignment");
  }

  allAvailableCourtLocationsWillAppearInTheFinancialLocationDropDownList() {
    this.elements
      .locationDropDown()
      .find("option")
      .then(($ele) => {
        expect(
          $ele.length > 1,
          `location dropdown should have more than one location but found ${$ele.length}`
        ).to.be.true;
      });
  }

  userSelectsLocation() {
    cy.intercept(`smc-web/docketAssignmentContainer.do`).as(
      `docketAssignmentContainer`
    );
    let locationValue = jsonHandler.getValue("defaults", "location");
    this.elements.locationDropDown().select(`${locationValue}`);
    cy.wait(`@docketAssignmentContainer`);
  }

  docketSearchAreaExpands() {
    this.elements.docketSearchContainer().then(($ele) => {
      expect(
        $ele.attr(`aria-expanded`) == "true",
        `docket search area should be expanded but was ${$ele.attr(
          `aria-expanded`
        )}`
      ).to.be.true;
    });
  }

  enterPartialDocketCodeWithWildCardSymbolInTheDocketTypeField() {
    let wildSearch = jsonHandler.getValue("defaults", "wildSearch");
    this.elements.docketTypeSearchBox().type(`${wildSearch}`);
  }

  clickTheSearchIcon() {
    this.elements.docketTypeSearchButton().click();
  }

  docketSearchAreaPopulatesWithSearchResults() {
    this.elements.docketTableRow().should("exist");
  }

  descriptionOfTheDocketCodeAppears() {
    let feeDescription = jsonHandler.getValue("defaults", "feeDescription");
    this.elements
      .docketDescription()
      .contains(`${feeDescription}`)
      .should("be.visible");
  }

  statusIndicatesWhetherADocketCodeFilingUpdatesTheStatusOfACase() {
    this.elements.docketStatus().contains("N").should("be.visible");
  }

  contWhetherADocketCodeFilingRepresentsACourtGrantedContinuanceOfAnEvent() {
    this.elements.docketContinuance().contains("N").should("be.visible");
  }

  dispIndicatesWhetherADocketCodeFilingRepresentsADisposition() {
    this.elements.docketDisposition().contains("N").should("be.visible");
  }

  activityDateIndicatesWhenThisRecordWasCreatedOrUpdated() {
    this.elements.docketActivityDate().should("be.visible");
  }

  selectADocketCodeFromTheList() {
    //no op
  }

  clickThePlusNextToTheSelectedDocketCode() {
    this.elements.docketTableRow().click();
  }

  rowExpandsToDisplayTheAssociatedDETCCodes() {
    this.elements.feeRowResult().should("be.visible");
  }

  saveDocketTotal() {
    this.elements.feeTotal().then(($ele) => {
      cy.wrap($ele).as("oldTotal");
    });
  }

  clickTheDropDownIconInTheDetailTypeFieldAndSelectANewCode() {
    this.saveDocketTotal();
    let feeCode = jsonHandler.getValue("defaults", "feeCode");
    this.elements.addFeeDropDown().click().type(`${feeCode}{enter}`);
  }

  theNewCodeAndItsDetailsWillDisplayInFeesWindowTheTotalFeesForThisDocketTypeWillUpdateToReflectTheNewTotalSaveButtonBecomesEnabled() {
    cy.get("@oldTotal").then((oldTotal) => {
      this.elements.newFee().then((newFeeAmount) => {
        this.elements.feeTotal().should("eq", oldTotal + newFeeAmount);
      });
    });
    this.elements.saveButton().should(`not.be.disabled`);
  }

  clickTheSaveButtonInTheFeesWindow() {
    this.elements.saveButton().click();
    this.elements.yesButton().click();
  }

  greenNotyConfirmingSuccessFeesWindowCloses() {
    this.elements.greenNoty().should(`be.visible`);
    this.elements.closeTabButton().click();
  }
  /**
   * Scenario: CBS User removes a DETC Code from a Docket Code
   */
  userIsACBSAccountingEmployeeWithSmcaccountingAdministrationSecurityRolePreviousScenarioAddingADETCCodeToADocketCodeIsRun() {
    cy.login();
    cy.clickLink("Admin");
    cy.clickMenu("Accounting");
    cy.clickMenu("Docket Fees Assignment");
  }

  clickTheTrashCanIconNextToTheDETCCodeThatWasAddedInThePreviousScenario() {
    this.saveDocketTotal();
    let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
    this.elements
      .feeRowResult()
      .find(`[data-fee^=${feeAmount}]`)
      .closest(`tr`)
      .find(`.glyphicon-trash`)
      .click();
  }

  popUpStatingThatThisWillRemoveTheDETCCodeFromTheEntireCircuitAskingTheUserIfTheyWishToContinue() {
    //done after clicking save
  }

  clickYesOnThePopUp() {
    //no op
  }

  dETCIsRemovedFromTheFeesWindowTotalFeesForThisDocketCodeIsUpdatedToReflectTheNewTotalSaveButtonBecomesEnabled() {
    let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
    cy.get("@oldTotal").then((oldTotal) => {
      this.elements.feeTotal().should("eq", oldTotal - feeAmount);
    });
    this.elements.saveButton().should(`not.be.disabled`);
  }

  clickSaveButtonInTheFeesWindow() {
    this.elements.saveButton().click();
    this.elements.yesButton().click();
  }

  greenNotyStatingTheRemovalWasSuccessfulFeesWindowCloses() {
    this.elements.greenNoty().should(`be.visible`);
    this.elements.closeTabButton().click();
  }
}
