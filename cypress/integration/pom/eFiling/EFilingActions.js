/// <reference types="cypress" />
import EFilingElements from "./EFilingElements";
import jsonHandler from "../../../fixtures/jsonHandler";
import CaseImportActions from "../caseProcessing/caseImport/CaseImportActions";
import Utils from "../../utils/utils";
import currentFunction from "current-function";

const PETITIONER = 0;
const RESPONDENT = 1;

export default class EFilingActions {
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

    this.typePerson = PETITIONER;

    this.utils = new Utils();
    this.tempFileName = tempFileName;
    this.petitioner = petitioner;
    this.respondent = respondent;
    this.eElements = new EFilingElements();
    this.ciActions = new CaseImportActions(this.tempFileName);
  }
  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils = new Utils();
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }
  /**
   * Scenario: File a new case
   */
  userMustHaveAnEfilingAccountLoggedInAndOnTheEfilingMenu() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.eFilingLogin();
  }

  clickOnFileNewCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.fileNewCaseButton().click();
  }

  newCaseEntryDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  selectCourtLocation() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtLocation = jsonHandler.getValue("defaults", "courtLocation");
    this.eElements.courtLocationDropdown().select(courtLocation);
  }

  courtLocationShouldBeSet() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtCode = jsonHandler.getValue("defaults", "courtCode");
    this.eElements.courtLocationDropdown().then(($ele) => {
      expect(
        $ele[0].value === courtCode,
        `Court code should be ${courtCode} but was ${$ele[0].value}`
      ).to.be.true;
    });
  }

  carterCounty() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtCode = jsonHandler.getValue("defaults", "courtCode");
    this.eElements.courtLocationDropdown().then(($ele) => {
      expect($ele[0].value === courtCode, `Court code should be '${courtCode}'`)
        .to.be.true;
    });
  }

  selectCaseCategory() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let caseCategory = jsonHandler.getValue("defaults", "caseCategory");
    this.eElements.caseCategoryDropdown().select(caseCategory);
  }

  civilAssociateChapterDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let caseCategoryCode = jsonHandler.getValue("defaults", "caseCategoryCode");
    this.eElements.caseCategoryDropdown().then(($ele) => {
      expect(
        $ele[0].value === caseCategoryCode,
        `Case Category Code should be '${caseCategoryCode}' but found ${$ele[0].value}`
      ).to.be.true;
    });
  }

  selectBreachOfContract() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let caseType = jsonHandler.getValue("defaults", "caseType");
    this.eElements.caseTypeDropdown().select(caseType);
  }

  breachOfContractDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let caseTypeCode = jsonHandler.getValue("defaults", "caseTypeCode");
    this.eElements.caseTypeDropdown().then(($ele) => {
      expect(
        $ele[0].value === caseTypeCode,
        `Case Type Code should be '${caseTypeCode}'`
      ).to.be.true;
    });
  }

  enterStyleOfCaseEfilingVCaseImport() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let styleOfCase = jsonHandler.getValue("defaults", "styleOfCase");
    this.eElements.styleOfCaseInput().type(styleOfCase);
  }

  caseStyleDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let styleOfCase = jsonHandler.getValue("defaults", "styleOfCase");
    this.eElements.styleOfCaseInput().then(($ele) => {
      expect(
        $ele[0].value === styleOfCase,
        `Style of Case should be '${styleOfCase}'`
      ).to.be.true;
    });
  }

  enterFeeAmount() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
    this.eElements.feeAmountInput().type(feeAmount);
  }

  filingFeeDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
    this.eElements.feeAmountInput().then(($ele) => {
      expect($ele[0].value === feeAmount, `Fee amount should be '${feeAmount}'`)
        .to.be.true;
    });
  }

  clickInBoxForNoteToClerkPleaseCreateSummons() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let noteToClerk = jsonHandler.getValue("defaults", "noteToClerk");
    this.eElements.noteToClerkTextArea().type(noteToClerk);
  }

  clickContinue() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.casePageContinueButton().click();
  }

  nextPagePartyEntryScreen() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  selectPartyTypePetitioner() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyType = jsonHandler.getValue("defaults", "parties", 0, "partyType");
    this.eElements.partyTypeDropdown().select(partyType);
    this.typePerson = PETITIONER;
  }

  petitionerIsSelectedAndDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyTypeCode = jsonHandler.getValue(
      "defaults",
      "parties",
      0,
      "partyTypeCode"
    );
    this.eElements.partyTypeDropdown().then(($ele) => {
      expect(
        $ele[0].value === partyTypeCode,
        `Party Type1 code should be '${partyTypeCode}'`
      ).to.be.true;
    });
  }

  enterLastName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let lastName =
      this.typePerson === PETITIONER
        ? this.petitioner.lastName
        : this.respondent.lastName;
    this.eElements.lastNameInput().type(lastName);
  }

  lastNameIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let lastName =
      this.typePerson === PETITIONER
        ? this.petitioner.lastName
        : this.respondent.lastName;
    this.eElements.lastNameInput().then(($ele) => {
      expect(
        $ele[0].value === lastName,
        `Petitioner last name should be '${lastName}'`
      ).to.be.true;
    });
  }

  enterFirstName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let firstName =
      this.typePerson === PETITIONER
        ? this.petitioner.firstName
        : this.respondent.firstName;
    this.eElements.firstNameInput().type(firstName);
  }

  firstNameIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let firstName =
      this.typePerson === PETITIONER
        ? this.petitioner.firstName
        : this.respondent.firstName;

    this.eElements.firstNameInput().then(($ele) => {
      expect(
        $ele[0].value === firstName,
        `Petitioner first name should be '${firstName}'`
      ).to.be.true;
    });
  }

  enterMiddleInitial() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let middleName =
      this.typePerson === PETITIONER
        ? this.petitioner.middleName
        : this.respondent.middleName;

    this.eElements.middleNameInput().type(middleName);
  }

  middleInitialEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let middleName =
      this.typePerson === PETITIONER
        ? this.petitioner.middleName
        : this.respondent.middleName;

    this.eElements.middleNameInput().then(($ele) => {
      expect(
        $ele[0].value === middleName,
        `Petitioner middle name should be '${middleName}'`
      ).to.be.true;
    });
  }

  enterDateOfBirth() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let birthDate =
      this.typePerson === PETITIONER
        ? this.petitioner.birthDate
        : this.respondent.birthDate;

    this.eElements.dateOfBirthInput().type(birthDate);
  }

  dateOfBirthEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let birthDate =
      this.typePerson === PETITIONER
        ? this.petitioner.birthDate
        : this.respondent.birthDate;

    this.eElements.dateOfBirthInput().then(($ele) => {
      expect(
        $ele[0].value === birthDate,
        `Petitioner birth date should be '${birthDate}'`
      ).to.be.true;
    });
  }

  enterCountry() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  countryIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let country =
      this.typePerson === PETITIONER
        ? this.petitioner.country
        : this.respondent.country;

    this.eElements.countryDropDown().then(($ele) => {
      expect($ele[0].value === country, `Country code should be '${country}'`)
        .to.be.true;
    });
  }

  enterAddress1() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let street =
      this.typePerson === PETITIONER
        ? this.petitioner.street
        : this.respondent.street;

    this.eElements.address1Input().type(street);
  }

  addressIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let street =
      this.typePerson === PETITIONER
        ? this.petitioner.street
        : this.respondent.street;

    this.eElements.address1Input().then(($ele) => {
      expect($ele[0].value === street, `Address1 should be '${street}'`).to.be
        .true;
    });
  }

  enterCity() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let city =
      this.typePerson === PETITIONER
        ? this.petitioner.city
        : this.respondent.city;
    this.eElements.cityInput().type(city);
  }

  cityIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let city =
      this.typePerson === PETITIONER
        ? this.petitioner.city
        : this.respondent.city;

    this.eElements.cityInput().then(($ele) => {
      expect($ele[0].value === city, `City should be '${city}'`).to.be.true;
    });
  }

  enterStateProvince() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let state =
      this.typePerson === PETITIONER
        ? this.petitioner.state
        : this.respondent.state;
    this.eElements.stateDropdown().select(state);
  }

  stateIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let stateCode =
      this.typePerson === PETITIONER
        ? this.petitioner.stateCode
        : this.respondent.stateCode;

    this.eElements.stateDropdown().then(($ele) => {
      expect($ele[0].value === stateCode, `State code should be '${stateCode}'`)
        .to.be.true;
    });
  }

  enterZip() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let zip =
      this.typePerson === PETITIONER
        ? this.petitioner.zip
        : this.respondent.zip;
    this.eElements.zipInput().type(zip);
  }

  zipcodeIsEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let zip =
      this.typePerson === PETITIONER
        ? this.petitioner.zip
        : this.respondent.zip;
    this.eElements.zipInput().then(($ele) => {
      expect($ele[0].value === zip, `zip should be '${zip}'`).to.be.true;
    });
  }

  clickAddNewParty() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.addNewPartyButton().click();
  }

  newPartyEntryScreen() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    // no op
  }

  selectPartyTypeRespondent() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyType = jsonHandler.getValue("defaults", "parties", 1, "partyType");
    this.eElements.partyTypeDropdown().select(partyType);
    this.typePerson = RESPONDENT;
  }

  respondentIsSelectedAndDisplayed() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyTypeCode = jsonHandler.getValue(
      "defaults",
      "parties",
      1,
      "partyTypeCode"
    );
    this.eElements.partyTypeDropdown().then(($ele) => {
      expect(
        $ele[0].value === partyTypeCode,
        `Party Type2 code should be '${partyTypeCode}'`
      ).to.be.true;
    });
  }

  documentScreenDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  clickAddButtonFilingOnBehalfOf() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.addFilingOnBehalfOfButton().click();
  }

  filingOnBehalfOfDisplaysinTheBox() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.filingOnBehalfOfGreyBoxAnchor().then(($ele) => {
      expect(
        $ele[0].textContent === "Filing on Behalf of",
        `Text 'Filing on Behalf of' should display`
      ).to.be.true;
    });
  }

  checkboxDefaultsToAllNamedPetitionerPlaintiffs() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements
      .filingOnBehalfOfAllNamedPetitionersPlantiffsCheckbox()
      .then(($ele) => {
        expect(
          $ele[0].value === "Y",
          `All Named Petitioner Plainteiffs Checkbox should be 'Y' `
        ).to.be.true;
      });
  }

  documentsPetitionIsAutoFilledForDocumentCategory() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.documentCategoryDropdownSelection(0).then(($ele) => {
      expect(
        $ele[0].innerHTML ===
          "Petition/Initial Pleading/Criminal to/for/filed in",
        `Document category should be 'Petition/Initial Pleading/Criminal to/for/filed in'`
      ).to.be.true;
    });
  }

  selectDocumentTypeDropdownClickOnAssociateCourt() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.documentCategoryDropdownSelection(1).click();
    let documentCategory = jsonHandler.getValue("defaults", "documentCategory");
    this.eElements
      .documentCategoryDropdownInput()
      .type(`${documentCategory}{enter}`);
  }

  clickOnChooseFileToAddDocument() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements
      .documentLocationChooseFileButton()
      .selectFile("cypress\\uploads\\TestDocument.pdf");
  }

  windowOpensToSelectDocumentMustBePDF() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  clickInTheBoxToTypeDocumentName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let documentTitle = jsonHandler.getValue("defaults", "documentTitle");
    this.eElements.documentLocationDocumentTitle().type(`${documentTitle}`);
  }

  documentNameDisplaysInBox() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let documentTitle = jsonHandler.getValue("defaults", "documentTitle");
    this.eElements.documentLocationDocumentTitle().then(($ele) => {
      expect(
        $ele[0].value === documentTitle,
        `Document title should be '${documentTitle}'`
      ).to.be.true;
    });
  }

  clickAdd() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.documentLocationDocumentTitleAddButton().click();
  }

  documentIsAddedToSubissionInTheDocumentTitleAttachmentBox() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let documentTitle = jsonHandler.getValue("defaults", "documentTitle");
    this.eElements.documentGreyBoxDocumentTitleLink().then(($ele) => {
      expect(
        $ele[0].text === documentTitle,
        `Grey box file name should be '${documentTitle}'`
      ).to.be.true;
    });
  }

  reviewAndFileCourtOperationgRuleCheckbox() {
    return cy.get("#redactionConfirmation");
  }

  reviewAndFilePageDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.reviewAndFileCaseReviewSection().then(($ele) => {
      let textContent = $ele[0].textContent;

      let styleOfCase = jsonHandler.getValue("defaults", "styleOfCase");
      expect(
        textContent.includes(styleOfCase.toUpperCase()),
        `Style of case should be '${styleOfCase}`
      ).to.be.true;

      let courtLocation = jsonHandler.getValue("defaults", "courtLocation");
      expect(
        textContent.includes(courtLocation),
        `Court location should be '${courtLocation}`
      ).to.be.true;

      let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
      expect(
        textContent.includes(feeAmount),
        `fee amount should be '${feeAmount}'`
      ).to.be.true;

      let noteToClerk = jsonHandler.getValue("defaults", "noteToClerk");
      expect(
        textContent.includes(noteToClerk),
        `note to clerk should be '${noteToClerk}'`
      ).to.be.true;
    });

    this.eElements.reviewAndFilePartyPetitionerSection().then(($ele) => {
      let textContent = $ele[0].textContent;
      expect(
        textContent.includes(this.petitioner.firstName.toUpperCase()),
        `first name should be '${this.petitioner.firstName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.middleName.toUpperCase()),
        `middle name should be '${this.petitioner.middleName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.lastName.toUpperCase()),
        `last name should be '${this.petitioner.lastName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.birthDate),
        `BirthDate should be '${this.petitioner.birthDate}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.street.toUpperCase()),
        `Street should be '${this.petitioner.street}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.city.toUpperCase()),
        `City should be '${this.petitioner.city}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.zip),
        `Zip should be '${this.petitioner.zip}'`
      ).to.be.true;

      let attorney = jsonHandler.getValue("defaults", "attorney");
      expect(
        textContent.includes(attorney),
        `Represented by should be '${attorney}'but found ${textContent}`
      ).to.be.true;
    });

    this.eElements.reviewAndFilePartyRespondentSection().then(($ele) => {
      let textContent = $ele[0].textContent;
      expect(
        textContent.includes(this.respondent.firstName.toUpperCase()),
        `first name should be '${this.respondent.firstName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.respondent.middleName.toUpperCase()),
        `middle name should be '${this.respondent.middleName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.respondent.lastName.toUpperCase()),
        `last name should be '${this.respondent.lastName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.respondent.birthDate),
        `BirthDate should be '${this.respondent.birthDate}'`
      ).to.be.true;
      expect(
        textContent.includes(this.respondent.street.toUpperCase()),
        `Street should be '${this.respondent.street}'`
      ).to.be.true;
      expect(
        textContent.includes(this.respondent.city.toUpperCase()),
        `City should be '${this.respondent.city}'`
      ).to.be.true;
      expect(
        textContent.includes(this.respondent.zip),
        `Zip should be '${this.respondent.zip}'`
      ).to.be.true;
    });

    this.eElements.reviewAndFileFiledOnBehalfOf().then(($ele) => {
      let textContent = $ele[0].textContent;
      expect(
        textContent.includes(this.petitioner.firstName.toUpperCase()),
        `filed On behalf first name should be '${this.petitioner.firstName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.middleName.toUpperCase()),
        `filed On behalf middle name should be '${this.petitioner.middleName}'`
      ).to.be.true;
      expect(
        textContent.includes(this.petitioner.lastName.toUpperCase()),
        `filed On behalf last name should be '${this.petitioner.lastName}'`
      ).to.be.true;
    });
  }

  clickOnCOR2Checkbox() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("body").then(($ele) => {
      if ($ele.find("#redactionConfirmation").length > 0) {
        cy.get("#redactionConfirmation").click();
      }
    });
  }

  thisActivatesTheContinueButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  paymentScreenDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  clickOnCreditCardRadioButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.paymentCreditCardRadioButton().click();
  }

  enterCardholderName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let creditCardHolderName = jsonHandler.getValue(
      "defaults",
      "creditCard",
      "cardHolderName"
    );
    this.eElements.paymentCardHolderNameInput().type(`${creditCardHolderName}`);
  }

  enterCardNumber() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let cardNumber = jsonHandler.getValue(
      "defaults",
      "creditCard",
      "cardNumber"
    );
    this.eElements.paymentCardNumberInput().type(`${cardNumber}`);
  }

  enterCvcCode() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let cvcCode = jsonHandler.getValue("defaults", "creditCard", "cvcCode");
    this.eElements.paymentCvcCodeInput().type(`${cvcCode}`);
  }

  enterExperationDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let expirationMonth = jsonHandler.getValue(
      "defaults",
      "creditCard",
      "expirationDate",
      "month"
    );
    this.eElements.paymentExpirationMonthSelect().select(`${expirationMonth}`);

    let expirationYear = jsonHandler.getValue(
      "defaults",
      "creditCard",
      "expirationDate",
      "year"
    );
    this.eElements.paymentExpirationYearSelect().select(`${expirationYear}`);
  }

  clickSubmit() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtLocation = jsonHandler.getValue("defaults", "courtLocation");
    this.eElements.paymentSummaryCourtLocation().then(($ele) => {
      expect(
        $ele[0].textContent === courtLocation,
        `Court location should be '${courtLocation}`
      ).to.be.true;
    });

    let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
    this.eElements.paymentSummaryFeeAmount().then(($ele) => {
      expect(
        $ele[0].textContent.includes(feeAmount),
        `Fee amount should include '${feeAmount}`
      ).to.be.true;
    });

    let cardHolderName = jsonHandler.getValue(
      "defaults",
      "creditCard",
      "cardHolderName"
    );
    this.eElements.paymentSummaryCardHolderName().then(($ele) => {
      expect(
        $ele[0].textContent === cardHolderName.toUpperCase(),
        `Card Holder Name should be '${cardHolderName}`
      ).to.be.true;
    });

    cy.intercept("ecf/secure/payment*").as("payment");
    this.eElements.paymentSummarySubmitButton().click();
    cy.wait(["@payment"]);
  }

  endOfTest() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let efilingConfirmationNumber = "";
    let efilingPaymentNumber = "";
    let that = this;
    this.eElements.efilingConfirmationNumber().then(($ele1) => {
      efilingConfirmationNumber = $ele1[0].textContent
        .split(" ")[2]
        .split(":")[1]
        .trim();
      this.eElements.efilingConfirmationPaymentNumber().then(($ele2) => {
        efilingPaymentNumber = $ele2[0].textContent.split(":")[1].trim();

        let object = {};
        object.case = {};
        object.case.filingDate = this.utils.formatDate(new Date());
        object.case.confirmationNumber = efilingConfirmationNumber;
        object.case.paymentNumber = efilingPaymentNumber;
        object.case.petitioner = that.petitioner;
        object.case.respondent = that.respondent;

        cy.writeFile(this.tempFileName, {
          case: object.case,
        });
      });
    });
  }

  /**
   * Scenario: Validate case from eFiling
   */
  useCaseCreatedWithEfiling() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
  }

  clickOnCaseImportFromCaseProcessing() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.clickOnCaseImportFromCaseProcessing();
  }

  setFilingLocation() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtCode = jsonHandler.getValue("defaults", "courtCode");
    this.eElements.filingLocation().select(courtCode);
  }

  filingLocationShouldBeSet() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let courtCode = jsonHandler.getValue("defaults", "courtCode");
    this.eElements.filingLocation().then(($ele) => {
      expect(
        $ele[0].value === courtCode,
        `Court code should be ${courtCode} but was ${$ele[0].value}`
      ).to.be.true;
    });
  }

  enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField();
  }

  caseIDOrFilingReferenceNumberHasBeenEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.caseIDOrFilingReferenceNumberHasBeenEntered();
  }

  pressApplyButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getTableSorterAllPrefs.do").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterSortOrder.do").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters.do").as(
      "getTableSorterFilters"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    this.ciActions.pressApplyButton();

    cy.wait([
      "@getTableSorterAllPrefs",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@saveUserNotyMessages",
    ]);
  }
  /**
   * Note: The transfer from EFiling to SMC takes
   * time.  This method checks if the data is
   * available and if not, it reapplys the search
   * button.
   */
  caseAppearsInResults(count) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (!count) {
      count = 0;
    }
    cy.log(`case appears in Results ${count} times`);
    this.eElements.getResultsTable().then(($ele) => {
      let table = $ele[0];
      if (table.tBodies[0].rows.length === 0) {
        //3 seconds
        cy.wait(3000);
        this.pressApplyButton();
        if (count < 10) {
          this.caseAppearsInResults(count++);
        } else {
          throw new Error("Efiling Case did not transer with in 30 seconds");
        }
      } else {
        this.ciActions.caseAppearsInResults();
      }
    });
  }

  expandCaseRowInTable() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getCaseImportLockFlag.do").as(
      "getCaseImportLockFlag"
    );
    cy.intercept("smc-web/getCivilCaseImportCaseContent.do").as(
      "getCivilCaseImportCaseContent"
    );
    cy.intercept(
      "smc-web/enterCase/selectMilestoneByLocationAndCaseType.do"
    ).as("selectMilestoneByLocationAndCaseType");
    cy.intercept("smc-web/myPredefinedTextSearch.do").as(
      "myPredefinedTextSearch"
    );
    cy.intercept("smc-web/getSelectPickerSearchStylePreference.do").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/getCivilCaseImportPartyContent.do").as(
      "getCivilCaseImportPartyContent"
    );
    cy.intercept("smc-web/getDocketCaseSecurity.do").as(
      "getDocketCaseSecurity"
    );
    cy.intercept("smc-web/getCountiresList.do").as("getCountiresList");
    cy.intercept("smc-web/getStatesByCountry.do").as("getStatesByCountry");
    cy.intercept("smc-web/validateCaseImportPerson.do").as(
      "validateCaseImportPerson"
    );
    cy.intercept("smc-web/getCaseImportPersonMatch.do").as(
      "getCaseImportPersonMatch"
    );

    this.eElements.getResultsRowExpandIcon().then(($ele) => {
      $ele.eq(0).click();
    });

    cy.wait([
      "@getCaseImportLockFlag",
      "@getCivilCaseImportCaseContent",
      "@selectMilestoneByLocationAndCaseType",
      "@myPredefinedTextSearch",
      "@getSelectPickerSearchStylePreference",
      "@getCivilCaseImportPartyContent",
      "@getDocketCaseSecurity",
      "@getCountiresList",
      "@getStatesByCountry",
      "@validateCaseImportPerson",
      "@getCaseImportPersonMatch",
    ]);
  }

  caseInfoSectionDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.caseInfoSectionDisplays();
  }

  validateMunicipalLocation() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.validateMunicipalLocation("defaults");
  }

  validateFilingDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.validateFilingDate();
  }

  validateTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.validateTime();
  }

  validateCaseType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let caseType = jsonHandler.getValue("defaults", "caseType");
    this.eElements.getCaseType().then(($ele) => {
      let index = $ele[0].selectedIndex;
      let value = $ele[0].options[index];
      expect(
        value.text.includes(caseType.toUpperCase()),
        `Case Type should be ${caseType}`
      ).to.be.true;
    });
  }

  validateMilestone() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.validateMilestone("defaults");
  }

  validateStyleOfCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let styleOfCase = jsonHandler.getValue("defaults", "styleOfCase");
    this.eElements.getStyleOfCase().then(($ele) => {
      expect(
        $ele[0].value === styleOfCase.toUpperCase(),
        `Sytle of Case should be ${styleOfCase}`
      ).to.be.true;
    });
  }

  validateAgency() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.validateAgency("defaults");
  }

  validateCaseSecurity() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.ciActions.validateCaseSecurity("defaults");
  }

  filingPartyTable() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.filingPartyTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows.length === 1,
        `Filing Party Table should have '1' row`
      ).to.be.true;
    });
  }

  validateFilingPartyType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyType = jsonHandler.getValue("defaults", "partyType");
    this.eElements.filingPartyTablePartyTypeSelect().then(($ele) => {
      expect($ele[0].value === partyType, `Party type should be '${partyType}'`)
        .to.be.true;
    });
  }

  validateFilingPartyMobar() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyMobar = jsonHandler.getValue("defaults", "partyMobar");
    this.eElements.filingPartyTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[0].cells[2].textContent === partyMobar,
        `Filing Party Mobar should be '${partyMobar}'`
      ).to.be.true;
    });
  }

  validateFilingPartyName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyName = jsonHandler.getValue("defaults", "partyName");
    this.eElements.filingPartyTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[0].cells[3].textContent ===
          partyName.toUpperCase(),
        `Filing Party Name should be '${partyName}'`
      ).to.be.true;
    });
  }

  partyTabDisplaysAndIsSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.partyTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows.length === 2,
        `Party type table should have 2 rows`
      ).to.be.true;
    });
  }

  selectPartyTablePetitioner() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.typePerson = PETITIONER;
    //make sure its selected
    this.eElements.partyTablePartyName("odd").click();
  }

  selectPartyTableRespondent() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.typePerson = RESPONDENT;
    //make sure its selected
    this.eElements.partyTablePartyName("even").click();
  }

  validatePartyType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let partyType = jsonHandler.getValue(
      "defaults",
      "parties",
      0,
      "partyTypeCode"
    );
    if (this.typePerson === RESPONDENT) {
      partyType = jsonHandler.getValue(
        "defaults",
        "parties",
        1,
        "partyTypeCode"
      );
    }
    this.eElements.partyTypeSelect().then(($ele) => {
      expect(
        $ele[0].value === partyType,
        `Party type should be '${partyType}' but found '${$ele[0].value}'`
      ).to.be.true;
    });
  }

  validatePartyName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let obj = this.petitioner;
    let oddEven = "odd";
    if (this.typePerson === RESPONDENT) {
      obj = this.respondent;
      oddEven = "even";
    }
    let partyName = `${obj.lastName}, ${obj.firstName} ${obj.middleName}`;
    this.eElements.partyTablePartyName(oddEven).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === partyName.toUpperCase(),
        `Party Name should be '${partyName.toUpperCase()}'`
      ).to.be.true;
    });
  }

  validateLastName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let lastName =
      this.typePerson === PETITIONER
        ? this.petitioner.lastName
        : this.respondent.lastName;

    this.eElements.getPartyLastName().then(($ele) => {
      expect(
        $ele[0].value.trim() === lastName.toUpperCase(),
        `Last Name should be '${lastName.toUpperCase()}' but was ${
          $ele[0].value
        }`
      ).to.be.true;
    });
  }

  validateMiddleName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let middleName =
      this.typePerson === PETITIONER
        ? this.petitioner.middleName
        : this.respondent.middleName;

    this.eElements.getPartyMiddleName().then(($ele) => {
      expect(
        $ele[0].value === middleName.toUpperCase(),
        `Middle Name should be '${middleName}'`
      ).to.be.true;
    });
  }

  validateFirstName() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let firstName =
      this.typePerson === PETITIONER
        ? this.petitioner.firstName
        : this.respondent.firstName;

    this.eElements.getPartyFirstName().then(($ele) => {
      expect(
        $ele[0].value === firstName.toUpperCase(),
        `First name should be '${firstName}'`
      ).to.be.true;
    });
  }

  validateDateOfBirth() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let birthDate =
      this.typePerson === PETITIONER
        ? this.petitioner.birthDate
        : this.respondent.birthDate;

    this.eElements.getPartyDateOfBirth().then(($ele) => {
      expect($ele[0].value === birthDate, `Last Name should be ${birthDate}`).to
        .be.true;
    });
  }

  validateStreetAddress() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let streetAddress =
      this.typePerson === PETITIONER
        ? this.petitioner.street
        : this.respondent.street;

    this.eElements.getPartyStreetAddress().then(($ele) => {
      expect(
        $ele[0].value === streetAddress.toUpperCase(),
        `Street should be '${streetAddress}'`
      ).to.be.true;
    });
  }

  validateCity() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let city =
      this.typePerson === PETITIONER
        ? this.petitioner.city
        : this.respondent.city;

    this.eElements.getPartyCity().then(($ele) => {
      expect($ele[0].value === city.toUpperCase(), `City should be '${city}'`)
        .to.be.true;
    });
  }

  validateZipCode() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let zip =
      this.typePerson === PETITIONER
        ? this.petitioner.zip
        : this.respondent.zip;

    this.eElements.getPartyZip().then(($ele) => {
      expect($ele[0].value === zip, `Zip should be '${zip}'`).to.be.true;
    });
  }

  clickPartyTypeStatusAcceptButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/caseImportAcceptParty.do").as(
      "caseImportAcceptParty"
    );
    cy.intercept("smc-web/saveDemographics.do").as("saveDemographics");
    cy.intercept("smc-web/saveAddress.do").as("saveAddress");
    cy.intercept("smc-web/updateCivilPartyPostAcceptProcess.do").as(
      "updateCivilPartyPostAcceptProcess"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    let evenOrOdd = this.typePerson === PETITIONER ? "odd" : "even";
    this.eElements.partyTablePartyStatusButton(evenOrOdd).click();

    cy.wait([
      "@caseImportAcceptParty",
      "@saveDemographics",
      "@saveAddress",
      "@updateCivilPartyPostAcceptProcess",
      "@saveUserNotyMessages",
    ]);
  }

  validatePartyStatus() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let evenOrOdd = this.typePerson === PETITIONER ? "odd" : "even";
    this.eElements.partyTablePartyStatusText(evenOrOdd).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === "Accepted".toUpperCase(),
        `Party status should be 'Accepted'`
      ).to.be.true;
    });
  }

  pressDocketTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketTab().click();
  }

  validateDialogPromptToConfirmDocketCode() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.smartPopUpText().then(($ele) => {
      expect(
        $ele[0].textContent.includes("The correct code is APTAC"),
        `The correct code is APTAC`
      ).to.be.true;
    });
  }

  selectYes() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/updateDocketCodeBySeqByCaseId.do").as(
      "updateDocketCodeBySeqByCaseId"
    );
    cy.intercept("smc-web/getPaymentDetailsChangeInd.do").as(
      "getPaymentDetailsChangeInd"
    );
    cy.intercept("smc-web/getSelectPickerSearchStylePreference.do").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    this.eElements.smartPopUpYesButton().click();

    cy.wait([
      "@updateDocketCodeBySeqByCaseId",
      "@getPaymentDetailsChangeInd",
      "@getSelectPickerSearchStylePreference",
      "@saveUserNotyMessages",
    ]).then(() => {
      this.utils.clearNotyMessages();
    });
  }

  docketResultsTableDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  validate3RowsInSize() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketTable().then(($ele) => {
      expect($ele[0].tBodies[0].rows.length === 6, `Table should have 3 rows`)
        .to.be.true;
    });
  }

  validate1RowHasFiledOnBehalfOfPetitioner() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    /*
    let filedOnBehalf = `${this..petitioner.firstName}  ${this..petitioner.middleName} ${this..petitioner.lastName}`;
    this.eElements.docketTable().then(($ele) => {
      debugger;
      expect(
        $ele[0].tBodies[0].rows[0].cells[7].textContent.trim() ===
          filedOnBehalf.toUpperCase(),
        `Filed on behalf should be '${filedOnBehalf.toUpperCase()}'`
      ).to.be.true;
    });*/
  }

  validate3DocketCodesAndDescriptions(num = 0) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    try {
      for (let row = 0; row < 3; row++) {
        let docketCode = jsonHandler.getValue(
          "defaults",
          "docketCode",
          `docketSequence${row + 1}`
        );

        let docketDescription = jsonHandler.getValue(
          "defaults",
          "docketDescription",
          `docketSequence${row + 1}`
        );

        this.eElements
          .docketTableContent(`${row}`, "docketCodeDesc")
          .then(($ele) => {
            let existingDocketCode = $ele[0].textContent;

            //Sometimes the table takes a bit to settle
            if (!existingDocketCode.includes(docketCode)) {
              if (num < 10) {
                cy.wait(3000);
                cy.log(`validate3DocketCodesAndDescriptions call ${num}`);
                this.validate3DocketCodesAndDescriptions(num + 1);
              } else {
                throw new Error(`validate3DocketCodesAndDescriptions failed`);
              }
            }

            expect(
              existingDocketCode.includes(docketCode),
              `Docket code should contain '${docketCode}' but found '${existingDocketCode}`
            ).to.be.true;

            expect(
              existingDocketCode.includes(docketDescription),
              `Docket description should contain '${docketDescription}' but found '${existingDocketCode}'`
            ).to.be.true;
          });
      }
    } catch (e) {
      cy.log(
        `validate3DocketCodesAndDescriptions failed ${num} times: '${e.message}'`
      );
      cy.wait(1000);
      if (num < 10) {
        this.validate3DocketCodesAndDescriptions(num + 1);
      } else {
        throw new Error(`validate3DocketCodesAndDescriptions failed`);
      }
    }
  }

  validate3SubmitDates() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.readRunTimeFile();

    let that = this;

    for (let row = 0; row < 3; row++) {
      this.eElements
        .docketTableContent(`${row}`, "docketFilingDate")
        .then(($ele) => {
          let existingFilingDate = $ele[0].textContent;

          expect(
            existingFilingDate === that.case.filingDate,
            `Filing date should be ${that.case.filingDate} but found ${existingFilingDate}`
          ).to.be.true;
        });
    }
  }

  expandDocketRow1() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.docketRow = 0;
    this.eElements.docketTableResultsOpenRow(this.docketRow).click();
  }

  closeDocketRow1() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketTableResultsOpenRow(this.docketRow).click();
  }

  expandDocketRow2() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.docketRow = 1;
    this.eElements.docketTableResultsOpenRow(this.docketRow).click();
  }

  closeDocketRow2() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketTableResultsOpenRow(this.docketRow).click();
  }

  expandDocketRow3() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.docketRow = 2;
    this.eElements.docketTableResultsOpenRow(this.docketRow).click();
  }

  closeDocketRow3() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketTableResultsOpenRow(this.docketRow).click();
  }

  validateDocketSequence() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketSequenceSelect(this.docketRow * 2).then(($ele) => {
      expect(
        parseInt($ele[0].value) === this.docketRow + 1,
        `Docket sequence should be '${this.docketRow + 1}`
      ).to.be.true;
    });
  }

  validateDocketCode() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let docketCode = jsonHandler.getValue(
      "defaults",
      "docketCode",
      `docketSequence${this.docketRow + 1}`
    );
    let docketDescription = jsonHandler.getValue(
      "defaults",
      "docketDescription",
      `docketSequence${this.docketRow + 1}`
    );

    this.eElements.docketCodeButton(this.docketRow).then(($ele) => {
      expect(
        $ele[0].textContent.trim().includes(docketCode),
        `Docket Code should include '${docketCode}'`
      ).to.be.true;
      expect(
        $ele[0].textContent.trim().includes(docketDescription),
        `Docket Code should include '${docketDescription}'`
      ).to.be.true;
    });
  }

  validateFiledBy() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketFiledBy(this.docketRow).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === "Nothing selected",
        `Filed by should be 'Nothing selected'`
      ).to.be.true;
    });
  }

  validateFiledOnBehalfOf() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (this.docketRow === 0) {
      this.eElements.docketFiledOnBehalfOf(this.docketRow).then(($ele) => {
        expect(
          $ele[0].textContent.trim() === "1 item selected",
          `Filed on behalf of should be '1 item selected'`
        ).to.be.true;
      });

      this.eElements.docketFiledOnBehalfOf(this.docketRow).click();

      let petitioner = `${this.petitioner.firstName} ${this.petitioner.middleName} ${this.petitioner.lastName}`;

      //this should only return one element
      this.eElements
        .docketFiledOnBehalfOfLI(petitioner.toUpperCase(), "(PET)")
        .then(($ele) => {
          expect(
            $ele.length === 1,
            `Docket filed on behalf of ${petitioner.toUpperCase()}`
          ).to.be.true;
        })
        .realPress("Escape");
      return;
    }
    this.eElements.docketFiledOnBehalfOf(this.docketRow).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === "Nothing selected",
        `Filed on behalf of should be 'Nothing selected'`
      ).to.be.true;
    });
  }

  validateSearchDocument() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    if (this.docketRow === 0) {
      let documentTitle = jsonHandler.getValue("defaults", "documentTitle");
      this.eElements
        .docketSearchPredefinedTextArea(this.docketRow)
        .then(($ele) => {
          expect(
            $ele[0].value.includes(documentTitle),
            `Search document has '${documentTitle}'`
          ).to.be.true;
        });
      return;
    }

    this.eElements
      .docketSearchPredefinedTextArea(this.docketRow)
      .then(($ele) => {
        expect($ele[0].value.trim() === "", `Search document is empty`).to.be
          .true;
      });
  }

  validateDocumentType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let documentType = jsonHandler.getValue(
      "defaults",
      "documentType",
      `docketSequence${this.docketRow + 1}`
    );
    this.eElements.docketDocumentType(this.docketRow).then(($ele) => {
      expect(
        $ele[0].value === documentType,
        `Document type should be '${documentType}'`
      ).to.be.true;
    });
  }

  validateDocumentNumber() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketDocumentNumberSelect(this.docketRow).then(($ele) => {
      expect($ele[0].value === "1", `Document number should be '1'`).to.be.true;
    });
  }

  validateDocumentTitle() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let documentTitle = jsonHandler.getValue("defaults", "documentTitle");
    this.eElements.docketDocumentTitleInput().then(($ele) => {
      expect(
        $ele[0].value === documentTitle,
        `Document title should be '${documentTitle}'`
      ).to.be.true;
    });
  }

  validateMainDocument() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.docketMainDocumentDiv(this.docketRow).then(($ele) => {
      const win = $ele[0].ownerDocument.defaultView;
      // use getComputedStyle to read the pseudo selector
      const after = win.getComputedStyle($ele[0], "after");
      // read the value of the `content` CSS property
      const contentValue = after.getPropertyValue("content");
      // the returned value will have double quotes around it, but this is correct
      expect(contentValue.includes("Yes"), `Main document should be 'Yes'`).to
        .be.true;
    });
  }

  validateAttachedToDocketSeq() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements
      .docketAttachedToDocketSeqSelect(this.docketRow)
      .then(($ele) => {
        expect(
          parseInt($ele[0].value) === this.docketRow + 1,
          `Attached to docket Sequence should be '${this.docketRow + 1}'`
        ).to.be.true;
      });
  }

  validateSecurity() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let security = jsonHandler.getValue(
      "defaults",
      "security",
      `docketSequence${this.docketRow + 1}`
    );
    this.eElements.docketSecurity(this.docketRow).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === security,
        `Security should be '${security}' but was ${$ele[0].textContent.trim()}`
      ).to.be.true;
    });
  }

  clickFilingFeeTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.filingFeeTab().click();
  }

  validatePaymentDetailsPayType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.filingFeePayType().then(($ele) => {
      expect(
        $ele[0].textContent === "Credit Card",
        `Payment type should be 'Credit Card'`
      ).to.be.true;
    });
  }

  validatePaymentDetailsConfirmationNumber() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let paymentNumber = this.case.paymentNumber;
    this.eElements.filingFeeConfirmationNumber().then(($ele) => {
      expect(
        $ele[0].value === paymentNumber,
        `Confirmation number should be '${paymentNumber}'`
      ).to.be.true;
    });
  }

  validatePaymentDetailsPaidAmount() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let feeAmount = jsonHandler.getValue("defaults", "feeAmount");
    this.eElements.filingPaidAmount().then(($ele) => {
      expect(
        $ele[0].value.includes(feeAmount),
        `Fee amount should be '${feeAmount}`
      ).to.be.true;
    });
  }

  validateCostAssessmentsRow1() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.lineItem = 0;
  }

  validatePriority() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let priority = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "lineItem",
      this.lineItem,
      "priority"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[0].textContent ===
          priority.toString(),
        `Priority should be ${priority}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[0].textContent
        }'`
      ).to.be.true;
    });
  }

  validateDetail() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let detail = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "lineItem",
      this.lineItem,
      "detail"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[1].textContent ===
          detail.toString(),
        `Detail should be ${detail}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[1].textContent
        }'`
      ).to.be.true;
    });
  }

  validateDescription() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let description = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "lineItem",
      this.lineItem,
      "description"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[2].textContent
          .trim()
          .includes(description),
        `Description should include ${description}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[2].textContent
        }'`
      ).to.be.true;
    });
  }

  validateAssessedAmount() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let assessedAmount = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "lineItem",
      this.lineItem,
      "assessedAmount"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[3].textContent
          .trim()
          .includes(assessedAmount),
        `Assessed Amount should include ${assessedAmount}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[3].textContent
        }'`
      ).to.be.true;
    });
  }

  validateBalance() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let balance = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "lineItem",
      this.lineItem,
      "balance"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[4].textContent
          .trim()
          .includes(balance),
        `Balance should include ${balance}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[4].textContent
        }'`
      ).to.be.true;
    });
  }

  validateCostAssessmentsRow2() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.lineItem = 1;
  }

  validateCostAssessmentsTotals() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.lineItem = 2;
  }

  validateAssessedTotalAmount() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let assessedAmount = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "total",
      "assessedAmount"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[1].textContent
          .trim()
          .includes(assessedAmount),
        `Total Assessed Amount should include ${assessedAmount}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[1].textContent
        }'`
      ).to.be.true;
    });
  }

  validateBalanceTotal() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let balance = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "total",
      "balance"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[2].textContent
          .trim()
          .includes(balance),
        `Total Balance should include ${balance}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[2].textContent
        }'`
      ).to.be.true;
    });
  }

  validateAmountToApply() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let amountToApply = jsonHandler.getValue(
      "defaults",
      "costAssessments",
      "total",
      "amountToApply"
    );

    this.eElements.filingCostAssessmentsTable().then(($ele) => {
      expect(
        $ele[0].tBodies[0].rows[this.lineItem].cells[3].textContent
          .trim()
          .includes(amountToApply),
        `Total amount to apply should include ${amountToApply}' but was '${
          $ele[0].tBodies[0].rows[this.lineItem].cells[3].textContent
        }'`
      ).to.be.true;
    });
  }

  pressChooseActionButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.chooseActionButton().click();
  }

  correctActionsDisplay() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  selectAcceptOption() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.chooseActionLi().click();
  }

  acceptFilingWindowDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.acceptWindowTitle().then(($ele) => {
      if ($ele[0].textContent.trim() === "Save Filing") {
        this.eElements.saveFilingPopupOkButton().click();
        cy.wait(500);

        cy.intercept("smc-web/getCaseImportLockFlag.do").as(
          "getCaseImportLockFlag"
        );
        this.eElements.saveButton().click();
        cy.wait(["@getCaseImportLockFlag"]);
        this.acceptFilingWindowDisplays();
      }

      expect(
        $ele[0].textContent.trim() === "Accept Filing",
        `Popup window title should be 'Accept Filing' but was ${$ele[0].textContent.trim()}`
      ).to.be.true;
    });
  }

  pressYes() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/acceptCaseImportCase.do").as("acceptCaseImportCase");
    cy.intercept("smc-web/getJudgeMobars.do").as("getJudgeMobars");
    cy.intercept("smc-web/populateJudgePartyTypes.do").as(
      "populateJudgePartyTypes"
    );
    cy.intercept("smc-web/getCalendarType.do").as("getCalendarType");
    cy.intercept("smc-web/getEventsCodesWithCaseTypes.do").as(
      "getEventsCodesWithCaseTypes"
    );
    cy.intercept("smc-web/getLanguages.do").as("getLanguages");
    cy.intercept("smc-web/getDocketEntryEventRooms.do").as(
      "getDocketEntryEventRooms"
    );
    cy.intercept("smc-web/getAllJudgesAvailable.do").as(
      "getAllJudgesAvailable"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    this.eElements.acceptWindowYesButton().click();

    let that = this;
    cy.wait([
      "@acceptCaseImportCase",
      "@getJudgeMobars",
      "@populateJudgePartyTypes",
      "@getCalendarType",
      "@getEventsCodesWithCaseTypes",
      "@getLanguages",
      "@getDocketEntryEventRooms",
      "@getAllJudgesAvailable",
      "@saveUserNotyMessages",
    ]).then(($ele) => {
      that.case.caseId = $ele[0].response.body.smcCaseId;
      cy.writeFile(this.tempFileName, {
        case: that.case,
      });
    });
  }

  assignJudgeScheduleEventWindowDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let title = `Assign Judge/Schedule Event - Case ${this.case.caseId}`;
    this.eElements.assignJudgeDialogTitle(4).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === title,
        `Assign Judge title should be '${title}' but was ${$ele[0].textContent.trim()}`
      ).to.be.true;
    });
  }

  validateAssignJudgeStyleOfCaseProposed(num = 0) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let petLastName = this.case.petitioner.lastName.toUpperCase();
    let resLastName = this.case.respondent.lastName.toUpperCase();
    this.eElements.judgeAssignmentStyleOfCaseProposedInput().then(($ele) => {
      try {
        cy.log(`TypeOf($ele[0].value: ${typeof $ele[0].value})`);
        expect(
          $ele[0].value.includes(petLastName),
          `Style of proposed case should include '${petLastName}' but was: ${$ele[0].value.trim()}`
        ).to.be.true;
        expect(
          $ele[0].value.includes(resLastName),
          `Style of proposed case should include '${resLastName}' but was: ${$ele[0].value.trim()}`
        ).to.be.true;
      } catch (e) {
        if (num > 10) {
          throw new Error(
            "failed validateAssignJudgeStyleOfCaseProposed 10 times"
          );
        }
        cy.wait(1000);
        cy.log(`validateAssignJudgeStyleOfCaseProposed failed ${num} times`);
        this.validateAssignJudgeStyleOfCaseProposed(num + 1);
      }
    });
  }

  clickAssignJudgeStyleOfCaseSaveButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.judgeAssignmentStyleOfCaseSaveButton().click();
  }

  validateJudgePartyType() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let judgePartyType = jsonHandler.getValue("defaults", "judgePartyType");
    this.eElements
      .judgeAssignmentCaseJudgeAssignmentJudgePartyTypeButton()
      .then(($ele) => {
        expect(
          $ele[0].textContent.trim() === judgePartyType,
          `Judge Party Type should be '${judgePartyType}' but was '${$ele[0].textContent.trim()}`
        ).to.be.true;
      });
  }

  changeProratedDropdownToManualJudge() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.judgeAssignmentDropdown().click();
    this.eElements.judgeAssignmentManual().click();
  }

  selectCypressJudge() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let judge = jsonHandler.getValue("defaults", "judge");
    this.eElements.judgeAssignmentJudgeDropdown().click();
    this.eElements
      .judgeAssignmentJudgeInput()
      .type(`${judge}{enter}`)
      .realPress("Tab");
  }

  pressSelectJudgeButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/validateJudgeAndParty.do").as(
      "validateJudgeAndParty"
    );
    cy.intercept("smc-web/saveAssignJudge.do").as("saveAssignJudge");
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    this.eElements.selectJudgeButton().click();

    cy.wait([
      "@validateJudgeAndParty",
      "@saveAssignJudge",
      "@saveUserNotyMessages",
    ]).then(() => {
      this.utils.clearNotyMessages();
    });
  }

  validateJudgeIsSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let judge = jsonHandler.getValue("defaults", "judge");
    let mobar = jsonHandler.getValue("defaults", "judgeMoBar");

    this.eElements.judgeAssignmentJudgeDropdown().then(($ele) => {
      expect(
        $ele[0].textContent.includes(judge.toUpperCase()),
        `Expected judge to include '${judge.toUpperCase()}' and '${mobar}' but found '${
          $ele[0].textContent
        }'`
      ).to.be.true;
    });
  }

  enterEventDescription() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventDescription = jsonHandler.getValue("defaults", "eventDescription");
    this.eElements.eventDescription().click();
    this.eElements
      .eventDescriptionInput()
      .type(`${eventDescription}`)
      .realPress("Tab");
  }

  eventDescriptionSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventDescription = jsonHandler.getValue("defaults", "eventDescription");
    this.eElements.eventDescription().then(($ele) => {
      expect(
        $ele[0].textContent.trim() === eventDescription,
        `Event Descriptiong should be '${eventDescription}' but found '${$ele[0].textContent}`
      ).to.be.true;
    });
  }

  enterFutureEventDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.futureDate = this.utils.getValidDateForSchedulingStartingFromNow(7);
    this.eElements.eventDateInput().type(this.futureDate).realPress("Tab");
  }

  validateEventDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.eventDateInput().then(($ele) => {
      expect(
        $ele[0].value === this.futureDate,
        `event date should be '${this.futureDate}' but was '${$ele[0].value}`
      ).to.be.true;
    });
  }

  enterEventTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.eventTimeInput().type("1000").realPress("Tab");
  }

  validateEventTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.eventTimeInput().then(($ele) => {
      expect(
        $ele[0].value === "10:00",
        `Event time should be '10:00' but found '${$ele[0].value}`
      ).to.be.true;
    });
  }

  validateEventJudgeIsSelect() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let moBar = jsonHandler.getValue("defaults", "judgeMoBar");
    this.eElements.eventJudge().then(($ele) => {
      expect(
        $ele[0].value === moBar,
        `Judge MoBar should be '${moBar}' but found ${$ele[0].value} `
      ).to.be.true;
    });
  }

  enterRoom() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.eventRoomDropdown().click();
    let eventRoom = jsonHandler.getValue("defaults", "eventRoom");
    this.eElements
      .eventRoomInput()
      .type(`${eventRoom}{enter}`)
      .realPress("Tab");
  }

  roomSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let eventRoom = jsonHandler.getValue("defaults", "eventRoom");
    this.eElements.eventRoomButton().then(($ele) => {
      expect(
        $ele[0].textContent.trim() === eventRoom,
        `Room should be '${eventRoom}' but found '${$ele[0].textContent.trim()}'`
      ).to.be.true;
    });
  }

  validateRoomLocation() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let roomLocation = jsonHandler.getValue("defaults", "eventRoomLocation");
    this.eElements.eventRoomLocation().then(($ele) => {
      expect(
        $ele[0].textContent === roomLocation,
        `Room location should be '${roomLocation}' but found '${$ele[0].textContent}'`
      ).to.be.true;
    });
  }

  enterNoteToFiler() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let noteToFiler = jsonHandler.getValue("defaults", "noteToFiler");
    this.eElements.noteToFiler().type(noteToFiler).realPress("Tab");

    cy.intercept("smc-web/caseImportSaveOrUpdateStatusNotes.do").as(
      "caseImportSaveOrUpdateStatusNotes"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    this.eElements.saveNoteToFilerButton().click();

    cy.wait(["@caseImportSaveOrUpdateStatusNotes", "@saveUserNotyMessages"]);
  }

  validateNoteToFiler() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let noteToFiler = jsonHandler.getValue("defaults", "noteToFiler");
    this.eElements.noteToFiler().then(($ele) => {
      let existingNote = $ele[0].value.trim();
      expect(
        existingNote === noteToFiler,
        `Note to file should be '${noteToFiler}' but found '${existingNote}'`
      ).to.be.true;
    });
  }

  clickNoteToFilerSaveNoteButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/caseImportSaveOrUpdateStatusNotes.do").as(
      "caseImportSaveOrUpdateStatusNotes"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");

    this.eElements.saveNoteToFilerButton().click();

    cy.wait([
      "@caseImportSaveOrUpdateStatusNotes",
      "@saveUserNotyMessages",
    ]).then(() => {
      this.utils.clearNotyMessages();
    });
  }

  pressSaveEvent() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/checkExceptionDayAndEventConflict*").as(
      "checkExceptionDayAndEventConflict"
    );

    this.eElements.saveEventButton().click();

    cy.wait(["@checkExceptionDayAndEventConflict"]).then(($ele) => {
      cy.get("body").then(($ele) => {
        if ($ele.find("#smartAlertBox").length > 0) {
          cy.intercept("smc-web/schedulingAddEvent.do").as(
            "schedulingAddEvent"
          );

          cy.get('[data-id="ok"]').click();

          cy.wait(["@schedulingAddEvent"]);
        }
      });
    });
  }

  assignJudgeScheduleEventWindowCloses() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  closeTab() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.eElements.closeTab().click();
  }
}
