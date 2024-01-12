/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import BondAssociationElements from "./BondAssociationElements";
import jsonHandler from "../../../../fixtures/jsonHandler";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import BondPostingwithoutCaseService from "../../../pom/caseProcessing/financial/bondPosting/BondPostingwithoutCaseService";

export default class BondAssociationActions {
  constructor() {
    this.utils = new Utils();
    this.bondAssociationElements = new BondAssociationElements();
    this.defendant = this.utils.getRandomDefendantData();
    this.ccService = new CriminalCaseService();
    this.tempFileName = "cypress\\temp\\bondAssociation.json";
    this.bondPostingwithoutCaseService = new BondPostingwithoutCaseService();
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
   * Scenario: Posting a bond with party on a case
   */
  criminalCaseNotSentenceNotDisposed() {
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.ccService.createGenericCase(
      "scenario1",
      this.defendant,
      this.tempFileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
  }

  /**
   * Scenario: Create Criminal Case
   */
  createSimpleCriminalCase() {
    this.readRunTimeFile();
    this.criminalCaseNotSentenceNotDisposed();
  }

  associateABondToTheCriminalAndNotTheCase() {
    this.bondAssociationElements.criminalBackButton().click();
    this.bondPostingwithoutCaseService.createABondWithoutCase(
      this.tempFileName,
      this.defendant
    );
  }
  /**
   * Scenario: Add existing unassociated bond to an existing case
   */
  bondCreatedOnPersonXCriminalCaseSavedWithPersonXAsDefendantAtLocationX() {
    this.readRunTimeFile();
    cy.get("@defendant").then(($defendant) => {
      if (!$defendant.bondId) {
        this.createSimpleCriminalCase();
        this.associateABondToTheCriminalAndNotTheCase();
      }
    });
  }

  clickOnBondAssociation() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.intercept(`smc-web/courtLocnCodes.do`).as(`courtLocn`);
    cy.clickMenu("Bond Association");
    cy.wait(`@courtLocn`);
  }

  openBondAssociationTabIsNowOpen() {
    this.bondAssociationElements
      .manageBondAssociationElement()
      .should("be.visible");
  }

  financialLocationDropDownSelectXXXX() {
    let locationValue = jsonHandler.getValue("defaults", "courtCode");
    this.bondAssociationElements
      .locationDropDown()
      .select(`${locationValue}`)
      .invoke("val")
      .should("eq", locationValue);
  }

  inBondSearchBlockTickBondIDRadioButton() {
    this.bondAssociationElements.bondAssosciationIdSearchDiv().click();
  }

  searchFieldInBlockBecomesLabeledAsMyBondIDSearch() {
    this.bondAssociationElements
      .bondAssosciationIdSearchLabel()
      .contains("My Bond ID Search")
      .should("be.visible");
  }

  inMyBondIDSearchEnterTheBondIDFromThePreviouslyMadeBond() {
    cy.get("@defendant").then(($defendant) => {
      this.bondAssociationElements
        .bondAssosciationIdSearchTextField()
        .type(`${$defendant.bondId}{enter}`);
    });
  }

  caseXShouldAppearInCaseInformationBlock() {
    this.bondAssociationElements
      .bondAssosciationCaseInfoCaseId()
      .invoke("text")
      .should("eq", this.defendant.caseId);
  }

  inCaseInformationBlockCaseResultsSelectCaseColumnTickTheCheckBoxInFrontOfCaseX() {
    this.bondAssociationElements
      .bondAssosciationCaseInfoCheckBox()
      .should("be.checked");
  }

  processContinuationButtonBecomesAvailable() {
    this.bondAssociationElements
      .bondAssociationProcessContinuationButton()
      .should(`be.enabled`);
  }

  associateBondButtonBecomesActive() {
    this.bondAssociationElements
      .bondAssociationAssociateBondButton()
      .should(`be.enabled`);
  }

  clickAssociateBondButton() {
    this.bondAssociationElements.bondAssociationAssociateBondButton().click();
  }

  greenMessageIndicatingThatTheBondIsNowAssociatedToTheCase() {
    this.bondAssociationElements.greenNoty().should(`be.visible`);
  }

  bondsBlockClears() {
    this.bondAssociationElements.bondAssociationBondsTable().then(($ele) => {
      expect(
        $ele.text().replaceAll(/\n|\t/g, ``) == "",
        `bond table should be empty but found ${$ele
          .text()
          .replaceAll(/\n|\t/g, ``)}`
      ).to.be.true;
    });
  }

  manageBondAssociationBlockClears() {
    this.bondAssociationElements
      .bondAssociationManageBondAssociation()
      .find(`[id^=bondAsscPartyInfoDiv]`)
      .invoke("text")
      .should("eq", "");

    this.bondAssociationElements
      .bondAssociationManageBondAssociation()
      .find(`[id^=bondAsscCaseInfoDiv]`)
      .invoke("text")
      .should("eq", "");
  }

  associateBondButtonBecomesInactive() {
    this.bondAssociationElements
      .bondAssociationAssociateBondButton()
      .should("not.be.enabled");

    this.bondAssociationElements.closeTab().click();
    this.bondAssociationElements.BodyForUnsavedChangesAlert().then(($ele) => {
      var smartAlertButton = $ele.find(".smartAlertActive");
      if (smartAlertButton) {
        smartAlertButton.click();
      }
    });
  }
}
