/// <reference types="cypress" />
import EFilingActions from "./EFilingActions";
export default class EFilingService {
  constructor(tempFileName, petitioner, respondent) {
    if (!tempFileName) {
      throw Error("missing tempFileName");
    }
    if (!petitioner) {
      throw Error("missing petitioner");
    }
    if (!respondent) {
      throw Error("missing respondent");
    }
    this.tempFileName = tempFileName;
    this.petitioner = petitioner;
    this.respondent = respondent;
    this.eFA = new EFilingActions(tempFileName, petitioner, respondent);
  }
  /**
   * These functions are depedant upon
   * the type of person.  They should
   * be called after performing
   * either
   *  this.eFA.selectPartyTypePetitioner();
   * or
   *  this.eFA.selectPartyTypeRespondent();
   */
  doThePetitionerOrRespondent() {
    this.eFA.enterLastName();
    this.eFA.lastNameIsEntered();
    this.eFA.enterFirstName();
    this.eFA.firstNameIsEntered();
    this.eFA.enterMiddleInitial();
    this.eFA.middleInitialEntered();
    this.eFA.enterDateOfBirth();
    this.eFA.dateOfBirthEntered();
    this.eFA.enterCountry();
    this.eFA.countryIsEntered();
    this.eFA.enterAddress1();
    this.eFA.addressIsEntered();
    this.eFA.enterCity();
    this.eFA.cityIsEntered();
    this.eFA.enterStateProvince();
    this.eFA.stateIsEntered();
    this.eFA.enterZip();
    this.eFA.zipcodeIsEntered();
  }
  createEFiling() {
    this.eFA.userMustHaveAnEfilingAccountLoggedInAndOnTheEfilingMenu();
    this.eFA.clickOnFileNewCase();
    this.eFA.newCaseEntryDisplays();
    this.eFA.selectCourtLocation();
    this.eFA.courtLocationShouldBeSet();
    this.eFA.carterCounty();
    this.eFA.selectCaseCategory();
    this.eFA.civilAssociateChapterDisplays();
    this.eFA.selectBreachOfContract();
    this.eFA.breachOfContractDisplays();
    this.eFA.enterStyleOfCaseEfilingVCaseImport();
    this.eFA.caseStyleDisplays();
    this.eFA.enterFeeAmount();
    this.eFA.filingFeeDisplays();
    this.eFA.clickInBoxForNoteToClerkPleaseCreateSummons();
    this.eFA.clickContinue();
    this.eFA.nextPagePartyEntryScreen();

    this.eFA.selectPartyTypePetitioner();
    this.eFA.petitionerIsSelectedAndDisplays();
    this.doThePetitionerOrRespondent();

    this.eFA.clickAddNewParty();
    this.eFA.newPartyEntryScreen();

    this.eFA.selectPartyTypeRespondent();
    this.eFA.respondentIsSelectedAndDisplayed();
    this.doThePetitionerOrRespondent();

    this.eFA.clickContinue();
    this.eFA.documentScreenDisplays();
    this.eFA.clickAddButtonFilingOnBehalfOf();
    this.eFA.filingOnBehalfOfDisplaysinTheBox();

    this.eFA.checkboxDefaultsToAllNamedPetitionerPlaintiffs();
    this.eFA.documentsPetitionIsAutoFilledForDocumentCategory();
    this.eFA.selectDocumentTypeDropdownClickOnAssociateCourt();
    this.eFA.clickOnChooseFileToAddDocument();
    this.eFA.windowOpensToSelectDocumentMustBePDF();
    this.eFA.clickInTheBoxToTypeDocumentName();
    this.eFA.documentNameDisplaysInBox();
    this.eFA.clickAdd();
    this.eFA.documentIsAddedToSubissionInTheDocumentTitleAttachmentBox();
    this.eFA.clickContinue();

    this.eFA.reviewAndFilePageDisplays();
    this.eFA.clickOnCOR2Checkbox();
    this.eFA.thisActivatesTheContinueButton();
    this.eFA.clickContinue();

    this.eFA.paymentScreenDisplays();
    this.eFA.clickOnCreditCardRadioButton();
    this.eFA.enterCardholderName();
    this.eFA.enterCardNumber();
    this.eFA.enterCvcCode();
    this.eFA.enterExperationDate();
    this.eFA.clickContinue();

    this.eFA.clickSubmit();
    this.eFA.endOfTest();
  }
}
