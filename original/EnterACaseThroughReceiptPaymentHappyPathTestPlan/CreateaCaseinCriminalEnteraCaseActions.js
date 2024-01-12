/// <reference types="cypress" />
import CreateaCaseinCriminalEnteraCaseElements from "./CreateaCaseinCriminalEnteraCaseElements";
const utils = require("../utils/utils");
export default class CreateaCaseinCriminalEnteraCaseActions {
  constructor() {
    globalThis.createaCaseinCriminalEnteraCaseElements =
      new CreateaCaseinCriminalEnteraCaseElements();
    let ts = Date.now();
    let lastNameArr = [
      "smith",
      "jones",
      "allen",
      "troy",
      "tavernetti",
      "pisoni",
      "corda",
      "brusa",
      "hammond",
      "perez",
      "bernard",
      "hall",
      "tank",
      "tagliapetra",
    ];
    let firstNameArr = [
      "john",
      "chris",
      "buddy",
      "karen",
      "erma",
      "randy",
      "joe",
      "wade",
      "peggy",
      "honey",
      "bud",
      "jean",
      "scott",
      "mark",
      "tommy",
      "tony",
    ];

    let lastName =
      lastNameArr[Math.floor(Math.random() * lastNameArr.length)] + "_" + ts;
    let firstName =
      firstNameArr[Math.floor(Math.random() * firstNameArr.length)];

    let today = new Date();

    let birthDate = utils.getRandomDate(
      new Date(today.getFullYear() - 25, today.getMonth(), today.getDate()),
      new Date(today.getFullYear() - 45, today.getMonth(), today.getDate())
    );

    let year = birthDate.getFullYear();
    let month = ("0" + (birthDate.getMonth() + 1)).slice(-2);
    let day = ("0" + birthDate.getDate()).slice(-2);

    globalThis.defendant = {
      lastName: lastName,
      firstName: firstName,
      birthDate: `${month}/${day}/${year}`,
      streetAddress: "100 Main St",
    };
  }

  signIntoSMC() {
    cy.log(`ENV: ${Cypress.env("ENV")}`);
    cy.visit(Cypress.env("host") + "smc-web");
    globalThis.createaCaseinCriminalEnteraCaseElements
      .getUserName()
      .type(Cypress.env("username"));
    globalThis.createaCaseinCriminalEnteraCaseElements
      .getPassword()
      .type(Cypress.env("password"), {
        log: false,
      });
    globalThis.createaCaseinCriminalEnteraCaseElements
      .getSubmitButton()
      .click();
  }

  selectCaseProcessessingTab() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .getProcessingTab("Case Processing")
      .click();
  }

  selectCriminalFromLeftSideMenu() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .getLeftSideMenu("Criminal")
      .click();
  }

  selectEnterACase() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .getLeftSideMenu("Enter a Case")
      .click();
  }

  navigateToTheDefendantSection() {
    //no action required
  }

  enterTESTLastName() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .defendantLastName()
      .type(globalThis.defendant.lastName);
  }

  enterTESTFirstName() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .defendantFirstName()
      .type(globalThis.defendant.firstName);
  }

  clickToExpandDemographicsSection() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .demographicsSection()
      .click();
  }

  enterTESTDateOfBirth() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .dateOfBirth()
      .type(globalThis.defendant.birthDate);
  }

  clickToExpandAddressSection() {
    globalThis.createaCaseinCriminalEnteraCaseElements.addressSection().click();
  }

  enterTESTStreetAddress() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .addressSectionStreetAddress()
      .type(globalThis.defendant.streetAddress);
  }

  enterCity(option0) {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .addressSectionCity()
      .type(option0);
  }

  enterZipCode(option0) {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .addressSectionZip()
      .type(option0);
  }

  clickToSaveDefendant() {
    globalThis.createaCaseinCriminalEnteraCaseElements.saveDefendant().click();
  }

  greenNotyStatingDefendantSavedAndAddressSaved() {
    let messageArr = ["Defendant Saved", "Address Saved"];
    cy.get(".noty_message")
      .should("have.length", messageArr.length)
      .each(($ele) => {
        let found = false;
        for (var i = 0; i < messageArr.length; i++) {
          if ($ele.text().includes(messageArr[i].trim())) {
            found = true;
            break;
          }
        }
        expect(found).to.be.true;
      });
  }

  allDefendantInfoIsGrayedOut() {
    globalThis.createaCaseinCriminalEnteraCaseElements
      .defendantLastName()
      .should("be.disabled");
    globalThis.createaCaseinCriminalEnteraCaseElements
      .defendantFirstName()
      .should("be.disabled");
    globalThis.createaCaseinCriminalEnteraCaseElements
      .dateOfBirth()
      .should("be.disabled");
    globalThis.createaCaseinCriminalEnteraCaseElements
      .addressSectionStreetAddress()
      .should("be.disabled");
    globalThis.createaCaseinCriminalEnteraCaseElements
      .addressSectionCity()
      .should("be.disabled");
    globalThis.createaCaseinCriminalEnteraCaseElements
      .addressSectionZip()
      .should("be.disabled");
  }

  caseDetailsSectionIsNowEnabled() {
    throw new Error("missing implementation");
  }

  inTheCaseTabSelectCourtLocation(option0) {
    throw new Error("missing implementation");
  }

  clickCaseTypeDropDownAndSelect(option0) {
    throw new Error("missing implementation");
  }

  enterArrestingAgencyORI(option0) {
    throw new Error("missing implementation");
  }

  enterFilingDateCurrentSystemDate() {
    throw new Error("missing implementation");
  }

  moveToProsecutingAttorneyOfRecordSection() {
    throw new Error("missing implementation");
  }

  clickToAddPAOfRecord() {
    throw new Error("missing implementation");
  }

  addAdditionalProsecutingAttorneyOfRecordBoxOpens() {
    throw new Error("missing implementation");
  }

  clickPartyTypeDropDownAndSelectAPAAssistantProsecutingAttorney() {
    throw new Error("missing implementation");
  }

  inProsecutingAttorneyTextFieldEnterAndSelect(option0, option1) {
    throw new Error("missing implementation");
  }

  clickToSaveClose() {
    throw new Error("missing implementation");
  }

  addAdditionalProsecutingAttorneyOfRecordBoxClosing() {
    throw new Error("missing implementation");
  }

  partyIsListedInProsecutingAttorneyField() {
    throw new Error("missing implementation");
  }

  clickDocketDestriptionDropDownAndSelectAINFOInformationFiled() {
    throw new Error("missing implementation");
  }

  enterDocketDateAsToday() {
    throw new Error("missing implementation");
  }

  navigaveToAdditionalCaseDetailsSection() {
    throw new Error("missing implementation");
  }

  enterDateOfViolationAs(option0) {
    throw new Error("missing implementation");
  }

  enterTimeAs(option0) {
    throw new Error("missing implementation");
  }

  enterLocationAs(option0) {
    throw new Error("missing implementation");
  }

  enter9DigitTESTTicketNumber() {
    throw new Error("missing implementation");
  }

  inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField(option0) {
    throw new Error("missing implementation");
  }

  enter8DigitTESTOCN() {
    throw new Error("missing implementation");
  }

  clickChooseActionButton() {
    throw new Error("missing implementation");
  }

  electSaveCase() {
    throw new Error("missing implementation");
  }

  assignJudgeBoxOpens() {
    throw new Error("missing implementation");
  }

  inAssignJudeAndDisposeBoxLeavePreSelectedJudgeAssignmentRadioButtonSelected() {
    throw new Error("missing implementation");
  }

  withCaseJudgeEnteredClick(option0) {
    throw new Error("missing implementation");
  }

  boxClosesAndGreenNotyAppearingConfirmingCaseNoEtc() {
    throw new Error("missing implementation");
  }

  clickTheXNextToCriminalEnterACase() {
    throw new Error("missing implementation");
  }

  criminaaEnterACaseComponentCloses() {
    throw new Error("missing implementation");
  }

  selectCourtDisposition() {
    throw new Error("missing implementation");
  }

  selectTheCaseIDRadioButton() {
    throw new Error("missing implementation");
  }

  inTheMySearchFieldEnterTheCaseIDThatWasPreviouslyCreatedAndClickTheMagnifyingGlass() {
    throw new Error("missing implementation");
  }

  theCaseIsSelectedAndExpandedToViewTheCaseAndCountDetails() {
    throw new Error("missing implementation");
  }

  navigateToChargeDispositionDropDownUnderDispoisitionSection() {
    throw new Error("missing implementation");
  }

  clickChargeDispositionDropDownAndSelectDDGTPGuiltyPlea() {
    throw new Error("missing implementation");
  }

  clickSaveButton() {
    throw new Error("missing implementation");
  }

  inCourtDispositionEventClosurePopupBoxClickToSave() {
    throw new Error("missing implementation");
  }

  lickTheXNextToCourtDisposition() {
    throw new Error("missing implementation");
  }

  courtDispositionEventClosureBoxOpens() {
    throw new Error("missing implementation");
  }

  boxClosesAndDispositionIsSaved() {
    throw new Error("missing implementation");
  }

  courtDispositionTabCloses() {
    throw new Error("missing implementation");
  }

  selectSentenceProgramsFromLeftSideMenu() {
    throw new Error("missing implementation");
  }

  selectCaseIDRadioButtonIfNotAlreadySelected() {
    throw new Error("missing implementation");
  }

  inTheMySearchFieldEnterTheCaseID() {
    throw new Error("missing implementation");
  }

  theCaseIsSelectedAndExpandedToViewSentenceProgramsAndJudgmentsInformation() {
    throw new Error("missing implementation");
  }

  clickMagnifyingGlass() {
    throw new Error("missing implementation");
  }

  inSentenceSectionClickToAddSentence() {
    throw new Error("missing implementation");
  }

  inFineFieldForCount1EnterTESTFineAmount() {
    throw new Error("missing implementation");
  }

  addSentenceBoxPopsUp() {
    throw new Error("missing implementation");
  }

  clickToSave() {
    throw new Error("missing implementation");
  }

  boxCloses() {
    throw new Error("missing implementation");
  }

  sentenceRecordIsAddedToTheSentenceSection() {
    throw new Error("missing implementation");
  }

  clickTheXNextToCriminalSentencePrograms() {
    throw new Error("missing implementation");
  }

  criminalSentenceProgramsTabCloses() {
    throw new Error("missing implementation");
  }

  selectFinancialFromLeftSideMenu() {
    throw new Error("missing implementation");
  }

  selectManageAssessmentsFromFinancialMenu() {
    throw new Error("missing implementation");
  }

  selectTheCaseIDRadioButtonIfItIsNotAlreadySelected() {
    throw new Error("missing implementation");
  }

  inTheMyCaseIDSearchFieldEnterTheCaseID() {
    throw new Error("missing implementation");
  }

  theCaseIsSelectedAndExpandedToViewDetails() {
    throw new Error("missing implementation");
  }

  clickToSaveCostsToCase() {
    throw new Error("missing implementation");
  }

  greenNotyIndicatingCostsHaveBeenSaved() {
    throw new Error("missing implementation");
  }

  floppyDiskNoLongerAppearsNextToEachAssessment() {
    throw new Error("missing implementation");
  }

  inTheManageAssessmentsTabClickTheXToCloseTheTabe() {
    throw new Error("missing implementation");
  }

  manageAssessmentsTabClosed() {
    throw new Error("missing implementation");
  }

  selectReceiptPaymentFromFinancialMenu() {
    throw new Error("missing implementation");
  }

  theCaseIsSelectedAndExpandedToViewThePaymentassessmentDetails() {
    throw new Error("missing implementation");
  }

  inApplyAmountToCaseEnterATESTPaymentAmount() {
    throw new Error("missing implementation");
  }

  clickPayTypeDescriptionDropDownAndSelect1100Caseh() {
    throw new Error("missing implementation");
  }

  inAmountTenderedFieldEnteRsameAmountFromApplyAmountField() {
    throw new Error("missing implementation");
  }

  clickToSavePayment() {
    throw new Error("missing implementation");
  }

  greenNotyStatingReceiptHasBeenSaved() {
    throw new Error("missing implementation");
  }

  viewPaymentSummaryDisplaysPaymentDetails() {
    throw new Error("missing implementation");
  }

  receiptNumberDipslays() {
    throw new Error("missing implementation");
  }

  receiptNumberIsLinkToACopyOfReceipt() {
    throw new Error("missing implementation");
  }
}
