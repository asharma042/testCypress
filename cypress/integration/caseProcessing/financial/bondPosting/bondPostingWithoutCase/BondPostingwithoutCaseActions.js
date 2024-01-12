/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import BondPostingwithoutCaseElements from "./BondPostingwithoutCaseElements";
import jsonHandler from "../../../../../fixtures/jsonHandler";
import CriminalCaseService from "../../../../pom/caseProcessing/criminal/CriminalCaseService";
import BondPostingwithoutCaseAction from "../../../../pom/caseProcessing/financial/bondPosting/BondPostingwithoutCaseAction";

export default class BondPostingwithoutCaseActions {
  constructor() {
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();
    this.elements = new BondPostingwithoutCaseElements();
    this.ccService = new CriminalCaseService();
    this.tempFileName = "cypress\\temp\\bondPostingWithoutCase.json";
    this.bondPostingwithoutCaseAction = new BondPostingwithoutCaseAction();
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

  createAPayor() {
    var defendant = this.defendant;

    cy.writeFile(this.tempFileName, {
      defendant: defendant,
    });

    this.readRunTimeFile();
  }

  clickOnBondPosting() {
    this.bondPostingwithoutCaseAction.clickOnBondPosting(this.tempFileName);
  }

  bondPostingTabOpens() {
    //no op
  }

  fromTheFinancialLocationDropDownSelectLocationX() {
    this.readRunTimeFile();
    this.bondPostingwithoutCaseAction.fromTheFinancialLocationDropDownSelectLocationX();
  }

  manageBondPostingBlockBondInformationSubBlockPayorDropdownClickTheSearchIcon() {
    this.bondPostingwithoutCaseAction.manageBondPostingBlockBondInformationSubBlockPayorDropdownClickTheSearchIcon();
  }

  openMyPayorSearchPopUpBox() {
    //no op
  }

  inMyPayorSearchPopUpBoxEnterPayorInformation() {
    this.bondPostingwithoutCaseAction.inMyPayorSearchPopUpBoxEnterPayorInformation(
      this.defendant
    );
  }

  clickTheAddCloseButton() {
    this.bondPostingwithoutCaseAction.clickTheAddCloseButton(this.defendant);
  }

  inManageBondPostingBlockBondInformationSubSectionPayorShouldNowBePopulatedWithPersonX() {
    this.bondPostingwithoutCaseAction.inManageBondPostingBlockBondInformationSubSectionPayorShouldNowBePopulatedWithPersonX(
      this.defendant
    );
  }

  payorAndPartyAreTheSameTickTheBox() {
    this.bondPostingwithoutCaseAction.payorAndPartyAreTheSameTickTheBox();
  }

  partyNameAndPayorIsTheSame() {
    this.bondPostingwithoutCaseAction.partyNameAndPayorIsTheSame();
  }

  inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnterAmount() {
    this.bondPostingwithoutCaseAction.inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnterAmount();
  }

  theFieldBondAmountToPostShouldGoFromBlankTo50000() {
    this.bondPostingwithoutCaseAction.theFieldBondAmountToPostShouldGoFromBlankTo50000();
  }

  bondPaymentsSubSectionAmountToCollectShouldBe50000() {
    this.bondPostingwithoutCaseAction.bondPaymentsSubSectionAmountToCollectShouldBe50000();
  }

  inBondPercentageFieldEnterXXXX() {
    this.bondPostingwithoutCaseAction.inBondPercentageFieldEnterXXXX();
  }

  theFieldBondAmountToPostShouldGoFrom50000To5000() {
    this.bondPostingwithoutCaseAction.theFieldBondAmountToPostShouldGoFrom50000To5000();
  }

  bondPaymentsSubSectionAmountToCollectShouldBe5000() {
    this.bondPostingwithoutCaseAction.bondPaymentsSubSectionAmountToCollectShouldBe5000();
  }

  inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectXXXX() {
    this.bondPostingwithoutCaseAction.inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectXXXX();
  }

  manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldSeeANameChangeToMoneyOrderNumberAndGoFromGrayDisabledToAnActiveEntryField() {
    this.bondPostingwithoutCaseAction.manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldSeeANameChangeToMoneyOrderNumberAndGoFromGrayDisabledToAnActiveEntryField();
  }

  inMoneyOrderNumberEnterXXXX() {
    this.bondPostingwithoutCaseAction.inMoneyOrderNumberEnterXXXX();
  }

  inAmountTenderedEnterXXXX() {
    this.bondPostingwithoutCaseAction.inAmountTenderedEnterXXXX();
  }

  clickTheAddAdditionalPaymentButton() {
    this.bondPostingwithoutCaseAction.clickTheAddAdditionalPaymentButton();
  }

  newRowForEnteringAPaymentShouldBeAdded() {
    this.bondPostingwithoutCaseAction.newRowForEnteringAPaymentShouldBeAdded();
  }

  bondPayTypeRow2DropDownSelectXXXX() {
    this.bondPostingwithoutCaseAction.bondPayTypeRow2DropDownSelectXXXX();
  }

  amountTenderedRow2EnterXXXX() {
    this.bondPostingwithoutCaseAction.amountTenderedRow2EnterXXXX();
  }

  clickSaveButton() {
    this.bondPostingwithoutCaseAction.clickSaveButton();
  }

  manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved() {
    this.bondPostingwithoutCaseAction.manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved();
  }

  receiptNumberShouldPopulateWithTheReceiptNumberOfThePaymentForTheBondJustPosted() {
    this.bondPostingwithoutCaseAction.receiptNumberShouldPopulateWithTheReceiptNumberOfThePaymentForTheBondJustPosted(
      this.defendant,
      this.tempFileName
    );
  }
}
