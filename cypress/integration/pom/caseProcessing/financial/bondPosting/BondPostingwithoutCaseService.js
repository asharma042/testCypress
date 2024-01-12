/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import BondPostingwithoutCaseElements from "./BondPostingwithoutCaseElements";
import jsonHandler from "../../../../../fixtures/jsonHandler";
import currentFunction from "current-function";
import CriminalCaseService from "../../criminal/CriminalCaseService";
import BondPostingwithoutCaseAction from "../../../../pom/caseProcessing/financial/bondPosting/BondPostingwithoutCaseAction";

export default class BondPostingwithoutCaseService {
  constructor() {
    this.utils = new Utils();
    this.BondPostingwithoutCaseElements = new BondPostingwithoutCaseElements();
    this.ccService = new CriminalCaseService();
    this.bondPostingwithoutCaseAction = new BondPostingwithoutCaseAction();
    this.tempFileName = "cypress\\temp\\bondPostingWithoutCase.json";
  }

  createABondWithoutCase(tempFileName, defendant) {
    this.bondPostingwithoutCaseAction.navagateToBondPosting(
      defendant,
      tempFileName
    );
    this.bondPostingwithoutCaseAction.fromTheFinancialLocationDropDownSelectLocationX();
    this.bondPostingwithoutCaseAction.manageBondPostingBlockBondInformationSubBlockPayorDropdownClickTheSearchIcon();
    this.bondPostingwithoutCaseAction.inMyPayorSearchPopUpBoxEnterPayorInformation(
      defendant
    );
    this.bondPostingwithoutCaseAction.clickTheAddCloseButton(defendant);
    this.bondPostingwithoutCaseAction.inManageBondPostingBlockBondInformationSubSectionPayorShouldNowBePopulatedWithPersonX(
      defendant
    );
    this.bondPostingwithoutCaseAction.payorAndPartyAreTheSameTickTheBox();
    this.bondPostingwithoutCaseAction.partyNameAndPayorIsTheSame();
    this.bondPostingwithoutCaseAction.inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnterAmount();
    this.bondPostingwithoutCaseAction.theFieldBondAmountToPostShouldGoFromBlankTo50000();
    this.bondPostingwithoutCaseAction.bondPaymentsSubSectionAmountToCollectShouldBe50000();
    this.bondPostingwithoutCaseAction.inBondPercentageFieldEnterXXXX();
    this.bondPostingwithoutCaseAction.theFieldBondAmountToPostShouldGoFrom50000To5000();
    this.bondPostingwithoutCaseAction.bondPaymentsSubSectionAmountToCollectShouldBe5000();
    this.bondPostingwithoutCaseAction.inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectXXXX();
    this.bondPostingwithoutCaseAction.manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldSeeANameChangeToMoneyOrderNumberAndGoFromGrayDisabledToAnActiveEntryField();
    this.bondPostingwithoutCaseAction.inMoneyOrderNumberEnterXXXX();
    this.bondPostingwithoutCaseAction.inAmountTenderedEnterXXXX();
    this.bondPostingwithoutCaseAction.clickTheAddAdditionalPaymentButton();
    this.bondPostingwithoutCaseAction.newRowForEnteringAPaymentShouldBeAdded();
    this.bondPostingwithoutCaseAction.bondPayTypeRow2DropDownSelectXXXX();
    this.bondPostingwithoutCaseAction.amountTenderedRow2EnterXXXX();
    this.bondPostingwithoutCaseAction.clickSaveButton();
    this.bondPostingwithoutCaseAction.manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved();
    this.bondPostingwithoutCaseAction.receiptNumberShouldPopulateWithTheReceiptNumberOfThePaymentForTheBondJustPosted(
      defendant,
      tempFileName
    );
  }
}
