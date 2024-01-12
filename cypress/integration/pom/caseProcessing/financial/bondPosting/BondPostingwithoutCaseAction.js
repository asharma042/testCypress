/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import BondPostingwithoutCaseElements from "./BondPostingwithoutCaseElements";
import jsonHandler from "../../../../../fixtures/jsonHandler";
import currentFunction from "current-function";
import CriminalCaseService from "../../criminal/CriminalCaseService";

export default class BondPostingwithoutCaseAction {
  constructor() {
    this.utils = new Utils();
    this.defendant = this.utils.getRandomDefendantData();
    this.BondPostingwithoutCaseElements = new BondPostingwithoutCaseElements();
    this.ccService = new CriminalCaseService();
    this.count = 0;
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

  clickOnBondPosting(tempFileName) {
    this.tempFileName = tempFileName;
    this.createAPayor();
    cy.login();
    this.navagateToBondPosting(this.defendant);
  }

  navagateToBondPosting(defendant, tempFileName) {
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
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let locationValue = jsonHandler.getValue("defaults", "courtCode");
    this.BondPostingwithoutCaseElements.financialLocationDropdown().then(
      ($ele) => {
        expect(
          $ele[0].value === locationValue,
          `location should be ${locationValue} but found ${$ele[0].value}`
        ).to.be.true;
      }
    );
  }

  manageBondPostingBlockBondInformationSubBlockPayorDropdownClickTheSearchIcon() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingPayorSearch().click();
  }

  openMyPayorSearchPopUpBox() {
    //no op
  }

  inMyPayorSearchPopUpBoxEnterPayorInformation(defendant) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.BondPostingwithoutCaseElements.manageBondPostingPayorLastNameInputField().type(
      defendant.lastName
    );
    this.BondPostingwithoutCaseElements.manageBondPostingPayorFirstNameInputField().type(
      defendant.firstName
    );

    if (defendant.caseId) {
      cy.intercept("smc-web/performPersonSearch.do").as(`performPersonSearch`);

      this.BondPostingwithoutCaseElements.nameSearchType().click();
      this.BondPostingwithoutCaseElements.nameSearchOpt().click();
      this.BondPostingwithoutCaseElements.myDefendantSearchText().type(
        `${defendant.firstName} ${defendant.lastName}{enter}`
      );

      //wait for the pop up page variable to be filled out
      cy.wait("@performPersonSearch");

      cy.window()
        .then((smcPage) => {
          cy.wrap(smcPage.personSearchWindow.document)
            .find(
              ".personSearchSelectRowCheckBox",
              { timeout: 60000 } //the time out for the ele to load, will stop when ele is found
            )
            .then((checkbox) => {
              return cy.wrap(checkbox[0]);
            });
        })
        .click();
      this.BondPostingwithoutCaseElements.nameSearchType().click();
      this.BondPostingwithoutCaseElements.prefSearchOpt().click();
    }
  }

  clickTheAddCloseButton(defendant) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (defendant.caseId)
      cy.intercept("smc-web/isActiveAddressForPayor.do").as(
        `isActiveAddressForPayor`
      );
    this.BondPostingwithoutCaseElements.manageBondPostingMyPayorSearchAddAndCloseButton().click();
    //there is no address so there should be an alert to warn you about that
    if (!defendant.caseId) {
      this.BondPostingwithoutCaseElements.manageBondPostingPartyAddressInfoAlert().click();
    } else {
      cy.wait([`@isActiveAddressForPayor`]);
      cy.wait(1000);
    }
  }

  inManageBondPostingBlockBondInformationSubSectionPayorShouldNowBePopulatedWithPersonX(
    defendant
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingPayorDropdown().then(
      ($ele) => {
        expect(
          $ele[0][0].textContent.includes(defendant.lastName.toUpperCase()),
          `payor should have ${defendant.lastName} as a selection but had ${$ele[0][0].textContent}`
        ).to.be.true;
      }
    );
  }

  payorAndPartyAreTheSameTickTheBox() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingPayorAndPartyAreTheSameCheckBox().click();
  }

  partyNameAndPayorIsTheSame() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingPartyNameDropdown().then(
      ($ele) => {
        this.BondPostingwithoutCaseElements.manageBondPostingPayorDropdown().then(
          ($payor) => {
            expect(
              $ele[0][0].textContent == $payor[0][0].textContent,
              `payor should have ${$payor[0][0].textContent} as a selection but had ${$ele[0][0].textContent}`
            ).to.be.true;
          }
        );
      }
    );
  }

  inManageBondPostingBlockBondAmountSubsectionInBondAmountOrderedFieldEnterAmount() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondAmount = jsonHandler.getValue("defaults", "bondAmount");
    this.BondPostingwithoutCaseElements.manageBondPostingBondAmountOrderedField().type(
      `${bondAmount}`
    );
  }

  theFieldBondAmountToPostShouldGoFromBlankTo50000() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondAmountFormat = jsonHandler.getValue("defaults", "bondAmountFormat");
    this.BondPostingwithoutCaseElements.manageBondPostingBondAmountToPostField()
      .click()
      .then(($ele) => {
        expect(
          $ele.val() == `${bondAmountFormat}`,
          `bond amount should be ${bondAmountFormat} but had ${$ele.val()}`
        ).to.be.true;
      });
  }

  bondPaymentsSubSectionAmountToCollectShouldBe50000() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondAmountFormat = jsonHandler.getValue("defaults", "bondAmountFormat");
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsAmountToCollect().then(
      ($ele) => {
        expect(
          $ele.text() == `$${bondAmountFormat}`,
          `field should have $${bondAmountFormat} but found ${$ele.text()}`
        ).to.be.true;
      }
    );
  }

  inBondPercentageFieldEnterXXXX() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondPercentage = jsonHandler.getValue("defaults", "bondPercentage");
    this.BondPostingwithoutCaseElements.manageBondPostingBondAmountBondPercentage().type(
      `${bondPercentage}`
    );
  }

  theFieldBondAmountToPostShouldGoFrom50000To5000() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondAmountPercentage = jsonHandler.getValue(
      "defaults",
      "bondAmountPercentage"
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondAmountToPostField()
      .click()
      .then(($ele) => {
        expect(
          $ele.val() == `${bondAmountPercentage}`,
          `bond amount should be ${bondAmountPercentage} but had ${$ele.val()}`
        ).to.be.true;
      });
  }

  bondPaymentsSubSectionAmountToCollectShouldBe5000() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondAmountPercentage = jsonHandler.getValue(
      "defaults",
      "bondAmountPercentage"
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsAmountToCollect().then(
      ($ele) => {
        expect(
          $ele.text() == `$${bondAmountPercentage}`,
          `field should have $${bondAmountPercentage} but found ${$ele.text()}`
        ).to.be.true;
      }
    );
  }

  inManageBondPostingBlockBondPaymentSubSectionBondPayTypeDropDownSelectXXXX() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let firstBondType = jsonHandler.getValue("defaults", "firstBondType");
    this.BondPostingwithoutCaseElements.manageBondPostingBondAmountBondPayType()
      .click()
      .type(`${firstBondType}{enter}`);
  }

  manageBondPostingBlockBondPaymentsSubSectionCKMOCCIdentifierShouldSeeANameChangeToMoneyOrderNumberAndGoFromGrayDisabledToAnActiveEntryField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsBondIdentifierNo().then(
      ($ele) => {
        expect(
          $ele.is(":enabled"),
          `field should be enabled but found ${$ele.is(":enabled")}`
        ).to.be.true;
      }
    );
  }

  inMoneyOrderNumberEnterXXXX() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let bondIdentifierNo = jsonHandler.getValue("defaults", "bondIdentifierNo");
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsBondIdentifierNo().type(
      `${bondIdentifierNo}`
    );
  }

  inAmountTenderedEnterXXXX() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let firstBondAmountTendered = jsonHandler.getValue(
      "defaults",
      "firstBondAmountTendered"
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsBondAmountTendered().type(
      `${firstBondAmountTendered}`
    );
  }

  clickTheAddAdditionalPaymentButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //focus off bond amount tendered
    cy.intercept(
      `smc-web/smcFormRequest/financialBondPostingPaymentAddRow.do`
    ).as(`financialBondPostingPaymentAddRow`);
    cy.intercept(`smc-web/getBondPayTypes.do`).as(`getBondPayTypes`);
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsBondIdentifierNo().click();
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsAddAdditionalPaymentButton().click();
    cy.wait([`@financialBondPostingPaymentAddRow`, `@getBondPayTypes`]);
  }

  newRowForEnteringAPaymentShouldBeAdded() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsBondTypeRow().then(
      ($ele) => {
        expect(
          $ele.length == 2,
          `there should be two rows for bond but only ${$ele.length} was found`
        ).to.be.true;
      }
    );
  }

  bondPayTypeRow2DropDownSelectXXXX() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let secondBondType = jsonHandler.getValue("defaults", "secondBondType");
    this.BondPostingwithoutCaseElements.manageBondPostingBondAmountBondPayType().then(
      ($ele) => {
        cy.wrap($ele[1]).click().type(`${secondBondType}{enter}`);
      }
    );
  }

  amountTenderedRow2EnterXXXX() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let secondBondAmountTendered = jsonHandler.getValue(
      "defaults",
      "secondBondAmountTendered"
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondPaymentsBondAmountTendered().then(
      ($ele) => {
        cy.wrap($ele[1]).type(`${secondBondAmountTendered}`);
      }
    );
  }

  clickSaveButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept(`smc-web/saveSmcMuniTrfcBondPosting.do`).as(`BondSaving`);
    this.BondPostingwithoutCaseElements.manageBondPostingSaveButton().click();
    cy.wait(`@BondSaving`);
  }

  manageBondPostingBlockBondIDShouldPopulateWithTheIDOfTheBondJustSaved() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondID().then(
      ($ele) => {
        expect($ele.text() != ``, `field should be populated but is not`).to.be
          .true;
      }
    );
  }

  receiptNumberShouldPopulateWithTheReceiptNumberOfThePaymentForTheBondJustPosted(
    defendant,
    tempFileName
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondID().then(
      ($ele) => {
        expect(
          $ele.text().replaceAll(`\t`, ``).replaceAll(`\n`, ``) != ``,
          `field should be populated but is not`
        ).to.be.true;
      }
    );
    this.BondPostingwithoutCaseElements.manageBondPostingBondID(defendant)
      .invoke("text")
      .then(($ele) => {
        defendant.bondId = $ele;
        cy.writeFile(
          tempFileName,
          `{"defendant" : ` + JSON.stringify(defendant, null, 2) + "}"
        );
      });

    this.BondPostingwithoutCaseElements.closeTab().click();
    this.BondPostingwithoutCaseElements.BodyForUnsavedChangesAlert().then(
      ($ele) => {
        var smartAlertButton = $ele.find(".smartAlertActive");
        if (smartAlertButton) {
          smartAlertButton.click();
        }
      }
    );
  }
}
