/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import BondPostingwithcaseElements from "./BondPostingwithcaseElements";
import jsonHandler from "../../../../../fixtures/jsonHandler";
import CriminalCaseService from "../../../../pom/caseProcessing/criminal/CriminalCaseService";

export default class BondPostingwithcaseActions {
  constructor() {
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();
    this.elements = new BondPostingwithcaseElements();
    this.ccService = new CriminalCaseService();
    this.tempFileName = "cypress\\temp\\bondPostingWithCase.json";
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
   * Scenario: Posting a bond with party on a case
   */
  useCaseFromPreviousScenario() {
    this.readRunTimeFile();
  }

  clickOnBondPosting() {
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Financial");
    cy.intercept(`smc-web/courtLocnCodes.do`).as(`courtLocn`);
    cy.clickMenu("Bond Posting");
    cy.wait(`@courtLocn`);
  }

  bondPostingTabOpens() {
    //no op
  }

  fromTheFinancialLocationDropDownSelectLocationX() {
    let locationValue = jsonHandler.getValue("defaults", "courtCode");
    this.elements.financialLocationDropdown().then(($ele) => {
      expect(
        $ele[0].value === locationValue,
        `location should be ${locationValue} but found ${$ele[0].value}`
      ).to.be.true;
    });
  }

  inCaseSearchBlockTickCaseIDRadioButton() {
    this.elements.caseSearchCaseIdRadioButton().click();
  }

  inMyCaseIDSearchTextBoxEnterTheCaseID() {
    cy.get("@defendant").then(($defendant) => {
      this.elements
        .caseSearchMyCaseIdSearchInput()
        .type(`${$defendant.caseId}{enter}`);
    });
  }

  caseShouldDisplayInTheCasesBlock() {
    this.elements.casesCaseBlockTableRow().then(($ele) => {
      expect(
        $ele.length === 1,
        `table should have 1 row but found ${$ele.length}`
      ).to.be.true;
      cy.get("@defendant").then(($defendant) => {
        cy.wrap($ele[0]).contains("td", $defendant.caseId).should("exist");
      });
    });
  }

  inCasesBlockTickTheCheckBoxForTheCaseUnderSelectCase() {
    this.elements.caseSearchCasesSelectCaseCheckBox().then(($ele) => {
      if (!$ele.prop("checked")) {
        $ele.click();
      }
      expect(
        $ele.prop("checked") === true,
        `check box should be checked but was not`
      ).to.be.true;
    });
  }

  inManageBondPostingBlockBondInformationSubsectionSelectThePayorDropDownAndChooseTheDefendantsName() {
    this.elements.manageBondPostingPayorDropdown().select(1);
  }

  defendantFromTheCaseShouldBeListedInTheDropDown() {
    this.elements.manageBondPostingPayorDropdown().then(($ele) => {
      cy.get("@defendant").then(($defendant) => {
        expect(
          $ele[0][1].textContent.includes($defendant.lastName.toUpperCase()),
          `payor should have ${$defendant.lastName} as a selection but had ${$ele[0][1].textContent}`
        ).to.be.true;
      });
    });
  }

  inPartyNameDropDownSelectTheDefendantsName() {
    this.elements.manageBondPostingPartyNameDropdown().select(1);
  }

  inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnter1000() {
    let bondAmount = jsonHandler.getValue("defaults", "bondAmount");
    this.elements
      .manageBondPostingBondAmountOrderedField()
      .type(`${bondAmount}`);
  }

  theFieldBondAmountToPostShouldGoFromBlankTo1000() {
    let bondAmountFormat = jsonHandler.getValue("defaults", "bondAmountFormat");
    this.elements
      .manageBondPostingBondAmountToPostField()
      .click()
      .then(($ele) => {
        expect(
          $ele.val() == `${bondAmountFormat}`,
          `field should have ${bondAmountFormat} but found ${$ele.val()}`
        ).to.be.true;
      });
  }

  bondPaymentsSubSectionAmountToCollectShouldBe1000() {
    let bondAmountFormat = jsonHandler.getValue("defaults", "bondAmountFormat");
    this.elements
      .manageBondPostingBondPaymentsAmountToCollect()
      .then(($ele) => {
        expect(
          $ele.text() == `$${bondAmountFormat}`,
          `field should have $${bondAmountFormat} but found ${$ele.text()}`
        ).to.be.true;
      });
  }

  inBondPercentageFieldEnter25() {
    let bondPercentage = jsonHandler.getValue("defaults", "bondPercentage");
    this.elements
      .manageBondPostingBondAmountBondPercentage()
      .type(`${bondPercentage}`);
  }

  theFieldBondAmountToPostShouldGoFrom100000To25000() {
    let bondAmountPercent = jsonHandler.getValue(
      "defaults",
      "bondAmountPercent"
    );
    this.elements
      .manageBondPostingBondAmountToPostField()
      .click()
      .then(($ele) => {
        expect(
          $ele.val() == `${bondAmountPercent}`,
          `field should have ${bondAmountPercent} but found ${$ele.val()}`
        ).to.be.true;
      });
  }

  bondPaymentsSubSectionAmountToCollectShouldBe25000() {
    let bondAmountPercent = jsonHandler.getValue(
      "defaults",
      "bondAmountPercent"
    );
    this.elements
      .manageBondPostingBondPaymentsAmountToCollect()
      .then(($ele) => {
        expect(
          $ele.text() == `$${bondAmountPercent}`,
          `field should have $${bondAmountPercent} but found ${$ele.text()}`
        ).to.be.true;
      });
  }

  inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectCheckBond1401() {
    let bondType = jsonHandler.getValue("defaults", "bondType");
    //check bond
    this.elements
      .manageBondPostingBondAmountBondPayType()
      .click()
      .type(`${bondType}{enter}`);
  }

  manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldShouldSeeANameChangeToCheckNumberAndGoFromGrayDisabledToAnActiveEntryField() {
    this.elements
      .manageBondPostingBondPaymentsBondIdentifierNo()
      .then(($ele) => {
        expect(
          $ele.is(":enabled"),
          `field should be enabled but found ${$ele.is(":enabled")}`
        ).to.be.true;
      });
  }

  inCheckNumberEnter1001() {
    let bondIdentifierNo = jsonHandler.getValue("defaults", "bondIdentifierNo");
    this.elements
      .manageBondPostingBondPaymentsBondIdentifierNo()
      .type(`${bondIdentifierNo}`);
  }

  inAmountTenderedEnter250() {
    let bondAmountTendered = jsonHandler.getValue(
      "defaults",
      "bondAmountTendered"
    );
    this.elements
      .manageBondPostingBondPaymentsBondAmountTendered()
      .type(`${bondAmountTendered}`);
  }

  clickSaveButton() {
    cy.intercept(`smc-web/saveSmcMuniTrfcBondPosting.do`).as(`BondSaving`);
    this.elements.manageBondPostingSaveButton().click();
    cy.wait(`@BondSaving`);
  }

  manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved() {
    this.elements.manageBondPostingBondID().then(($ele) => {
      expect($ele.text() != ``, `field should be populated but is not`).to.be
        .true;
    });
  }

  receiptNumberShouldPopulateWithTheReciptNumberOfThePaymentForTheBondJustPosted() {
    this.elements.manageBondPostingBondID().then(($ele) => {
      expect(
        $ele.text().replaceAll(`\t`, ``).replaceAll(`\n`, ``) != ``,
        `field should be populated but is not`
      ).to.be.true;
    });
    this.elements.closeTab().click();
    this.elements.BodyForUnsavedChangesAlert().then(($ele) => {
      var smartAlertButton = $ele.find(".smartAlertActive");
      if (smartAlertButton) {
        smartAlertButton.click();
      }
    });
  }
}
