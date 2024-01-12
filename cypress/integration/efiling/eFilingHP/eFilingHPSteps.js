/// <reference types="cypress" />
import Utils from "../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import EFilingHPActions from "./EFilingHPActions";
const eFilingHPActions = new EFilingHPActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(`efiling/eFilingHP/eFilingHPFixture_${env}`).then(
    (dataFixture) => {
      globalThis.fixture = dataFixture;
      cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
        let id = "eFilingHP";
        cy.wrap(id).as("id");
        if ($jsonHandlerFile[id] === undefined) {
          $jsonHandlerFile[id] = dataFixture;
          cy.task("writeJsonHandlerFile", $jsonHandlerFile);
        }
      });
    }
  );
  cy.recordHar({ content: false });
});

After(function () {
  cy.logout();

  let scenarioName = testState.pickle.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join("-");

  let env = Cypress.env("ENV");
  let browser = Cypress.browser.name;
  let harsFolder = Cypress.env("hars_folders");

  let harPath = "efiling/eFilingHP";
  let harFileName = `${scenarioName}-${env}-${browser}.har`;

  cy.task("createHarsDirectories", `${harsFolder}/${harPath}`);

  cy.saveHar({
    outDir: `${harsFolder}/${harPath}`,
    fileName: harFileName,
  });

  let utils = new Utils();
  let hars_folders = Cypress.env("hars_folders");

  utils.readRunTimeFile(
    `${harsFolder}/${harPath}/${harFileName}`,
    function ($json) {
      if ($json) {
        try {
          let har = JSON.parse($json);
          for (var i = 0; i < har.log.entries.length; i++) {
            if (har.log.entries[i].request.url.includes("login")) {
              delete har.log.entries[i].request.postData;
            }
          }
          let result = JSON.stringify(har, null, 2);

          cy.writeFile(`${harsFolder}/${harPath}/${harFileName}`, result);
        } catch (e) {
          cy.log(`error ${e.message}`);
        }
      }
    }
  );
});

Given(
  "user must have an efiling account - logged in and on the efiling menu",
  () => {
    eFilingHPActions.userMustHaveAnEfilingAccountLoggedInAndOnTheEfilingMenu();
  }
);

Given("Click on File new case", () => {
  eFilingHPActions.clickOnFileNewCase();
});

Then("new case entry displays", () => {
  eFilingHPActions.newCaseEntryDisplays();
});

Given("select court location", () => {
  eFilingHPActions.selectCourtLocation();
});

Then("court location should be set", () => {
  eFilingHPActions.courtLocationShouldBeSet();
});

Given("Select Case Category", () => {
  eFilingHPActions.selectCaseCategory();
});

Then("Civil Associate chapter displays", () => {
  eFilingHPActions.civilAssociateChapterDisplays();
});

Given("Select Breach of Contract", () => {
  eFilingHPActions.selectBreachOfContract();
});

Then("Breach of contract displays", () => {
  eFilingHPActions.breachOfContractDisplays();
});

Given("enter style of case Efiling V Case Import", () => {
  eFilingHPActions.enterStyleOfCaseEfilingVCaseImport();
});

Then("case style displays", () => {
  eFilingHPActions.caseStyleDisplays();
});

Given("enter fee amount", () => {
  eFilingHPActions.enterFeeAmount();
});

Then("filing fee displays", () => {
  eFilingHPActions.filingFeeDisplays();
});

Given("click in box for note to clerk please create summons", () => {
  eFilingHPActions.clickInBoxForNoteToClerkPleaseCreateSummons();
});

Given("Click continue", () => {
  eFilingHPActions.clickContinue();
});

Then("Next page Party entry screen", () => {
  eFilingHPActions.nextPagePartyEntryScreen();
});

Given("Select Party Type Petitioner", () => {
  eFilingHPActions.selectPartyTypePetitioner();
});

Then("petitioner is selected and displays", () => {
  eFilingHPActions.petitionerIsSelectedAndDisplays();
});

Given("enter last name", () => {
  eFilingHPActions.enterLastName();
});

Then("Last name is entered", () => {
  eFilingHPActions.lastNameIsEntered();
});

Given("enter first name", () => {
  eFilingHPActions.enterFirstName();
});

Then("First name is entered", () => {
  eFilingHPActions.firstNameIsEntered();
});

Given("enter middle initial", () => {
  eFilingHPActions.enterMiddleInitial();
});

Then("Middle initial entered", () => {
  eFilingHPActions.middleInitialEntered();
});

Given("enter date of birth", () => {
  eFilingHPActions.enterDateOfBirth();
});

Then("date of birth entered", () => {
  eFilingHPActions.dateOfBirthEntered();
});

Given("enter Country", () => {
  eFilingHPActions.enterCountry();
});

Then("Country is entered", () => {
  eFilingHPActions.countryIsEntered();
});

Given("enter address 1", () => {
  eFilingHPActions.enterAddress1();
});

Then("address is entered", () => {
  eFilingHPActions.addressIsEntered();
});

Given("enter city", () => {
  eFilingHPActions.enterCity();
});

Then("City is entered", () => {
  eFilingHPActions.cityIsEntered();
});

Given("enter state province", () => {
  eFilingHPActions.enterStateProvince();
});

Then("state is entered", () => {
  eFilingHPActions.stateIsEntered();
});

Given("enter zip", () => {
  eFilingHPActions.enterZip();
});

Then("zipcode is entered", () => {
  eFilingHPActions.zipcodeIsEntered();
});

Given("Click add new party", () => {
  eFilingHPActions.clickAddNewParty();
});

Then("new party entry screen", () => {
  eFilingHPActions.newPartyEntryScreen();
});

Given("Select Party Type Respondent", () => {
  eFilingHPActions.selectPartyTypeRespondent();
});

Then("Respondent is selected and displayed", () => {
  eFilingHPActions.respondentIsSelectedAndDisplayed();
});

Then("Document screen displays", () => {
  eFilingHPActions.documentScreenDisplays();
});

Given("Click add button filing on behalf of", () => {
  eFilingHPActions.clickAddButtonFilingOnBehalfOf();
});

Then("filing on behalf of displaysin the box", () => {
  eFilingHPActions.filingOnBehalfOfDisplaysinTheBox();
});

Then("Checkbox defaults to all named Petitioner plaintiffs", () => {
  eFilingHPActions.checkboxDefaultsToAllNamedPetitionerPlaintiffs();
});

Then("Documents petition is auto filled for document category", () => {
  eFilingHPActions.documentsPetitionIsAutoFilledForDocumentCategory();
});

Given("Select Document type dropdown click on Associate court", () => {
  eFilingHPActions.selectDocumentTypeDropdownClickOnAssociateCourt();
});

Given("click on choose file to add document", () => {
  eFilingHPActions.clickOnChooseFileToAddDocument();
});

Then("window opens to select document must be PDF", () => {
  eFilingHPActions.windowOpensToSelectDocumentMustBePDF();
});

Given("click in the box to type document name", () => {
  eFilingHPActions.clickInTheBoxToTypeDocumentName();
});

Then("document name displays in box", () => {
  eFilingHPActions.documentNameDisplaysInBox();
});

Given("Click Add", () => {
  eFilingHPActions.clickAdd();
});

Then(
  "document is added to subission in the Document Title Attachment box",
  () => {
    eFilingHPActions.documentIsAddedToSubissionInTheDocumentTitleAttachmentBox();
  }
);

Then("Review and file page displays", () => {
  eFilingHPActions.reviewAndFilePageDisplays();
});

Given("Click on COR 2 Checkbox", () => {
  eFilingHPActions.clickOnCOR2Checkbox();
});

Then("This activates the continue button", () => {
  eFilingHPActions.thisActivatesTheContinueButton();
});

Then("payment screen displays", () => {
  eFilingHPActions.paymentScreenDisplays();
});

Given("click on Credit card radio button", () => {
  eFilingHPActions.clickOnCreditCardRadioButton();
});

Given("Enter Cardholder name", () => {
  eFilingHPActions.enterCardholderName();
});

Given("enter card number", () => {
  eFilingHPActions.enterCardNumber();
});

Given("enter cvc code", () => {
  eFilingHPActions.enterCvcCode();
});

Given("enter experation date", () => {
  eFilingHPActions.enterExperationDate();
});

Given("Click submit", () => {
  eFilingHPActions.clickSubmit();
});

Given("end of test", () => {
  eFilingHPActions.endOfTest();
});

Given("Use case created with Efiling", () => {
  eFilingHPActions.useCaseCreatedWithEfiling();
});

Given("Click on Case Import from Case Processing", () => {
  eFilingHPActions.clickOnCaseImportFromCaseProcessing();
});

Given("Set Filing Location", () => {
  eFilingHPActions.setFilingLocation();
});

Then("Filing Location should be set", () => {
  eFilingHPActions.filingLocationShouldBeSet();
});

Given(
  "Enter case ID or filing reference number in Filing RefConfirmation NoCase ID field",
  () => {
    eFilingHPActions.enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField();
  }
);

Then("Case ID or filing reference number has been entered", () => {
  eFilingHPActions.caseIDOrFilingReferenceNumberHasBeenEntered();
});

Given("Press Apply button", () => {
  eFilingHPActions.pressApplyButton();
});

Then("Case appears in results", () => {
  eFilingHPActions.caseAppearsInResults();
});

Given("Expand case row in table", () => {
  eFilingHPActions.expandCaseRowInTable();
});

Then("Case Info section displays", () => {
  eFilingHPActions.caseInfoSectionDisplays();
});

Then("Validate Municipal Location", () => {
  eFilingHPActions.validateMunicipalLocation();
});

Then("Validate Filing Date", () => {
  eFilingHPActions.validateFilingDate();
});

Then("Validate Time", () => {
  eFilingHPActions.validateTime();
});

Then("Validate Case Type", () => {
  eFilingHPActions.validateCaseType();
});

Then("Validate Milestone", () => {
  eFilingHPActions.validateMilestone();
});

Then("Validate Style of Case", () => {
  eFilingHPActions.validateStyleOfCase();
});

Then("Validate Agency", () => {
  eFilingHPActions.validateAgency();
});

Then("Validate Case Security", () => {
  eFilingHPActions.validateCaseSecurity();
});

Given("Filing Party Table", () => {
  eFilingHPActions.filingPartyTable();
});

Then("Validate Filing Party Type", () => {
  eFilingHPActions.validateFilingPartyType();
});

Then("Validate Filing Party Mobar", () => {
  eFilingHPActions.validateFilingPartyMobar();
});

Then("Validate Filing Party Name", () => {
  eFilingHPActions.validateFilingPartyName();
});

Given("Party tab displays and is selected", () => {
  eFilingHPActions.partyTabDisplaysAndIsSelected();
});

Given("Select Party Table Petitioner", () => {
  eFilingHPActions.selectPartyTablePetitioner();
});

Then("Validate Party Type", () => {
  eFilingHPActions.validatePartyType();
});

Then("Validate Party Name", () => {
  eFilingHPActions.validatePartyName();
});

Then("Validate Last Name", () => {
  eFilingHPActions.validateLastName();
});

Then("Validate Middle Name", () => {
  eFilingHPActions.validateMiddleName();
});

Then("Validate First Name", () => {
  eFilingHPActions.validateFirstName();
});

Then("Validate Date of Birth", () => {
  eFilingHPActions.validateDateOfBirth();
});

Then("Validate Street Address", () => {
  eFilingHPActions.validateStreetAddress();
});

Then("Validate City", () => {
  eFilingHPActions.validateCity();
});

Then("Validate Zip Code", () => {
  eFilingHPActions.validateZipCode();
});

Given("Click Party Type Status Accept Button", () => {
  eFilingHPActions.clickPartyTypeStatusAcceptButton();
});

Then("Validate Party Status", () => {
  eFilingHPActions.validatePartyStatus();
});

Given("Select Party Table Respondent", () => {
  eFilingHPActions.selectPartyTableRespondent();
});

Given("Press Docket tab", () => {
  eFilingHPActions.pressDocketTab();
});

Then("Validate Dialog prompt to confirm docket code", () => {
  eFilingHPActions.validateDialogPromptToConfirmDocketCode();
});

Given("Select Yes", () => {
  eFilingHPActions.selectYes();
});

Given("Docket Results Table displays", () => {
  eFilingHPActions.docketResultsTableDisplays();
});

Then("Validate 3 Rows in size", () => {
  eFilingHPActions.validate3RowsInSize();
});

Then("Validate 1 row has Filed on Behalf Of Petitioner", () => {
  eFilingHPActions.validate1RowHasFiledOnBehalfOfPetitioner();
});

Then("Validate 3 Docket Codes and Descriptions", () => {
  eFilingHPActions.validate3DocketCodesAndDescriptions();
});

Then("Validate 3 Submit dates", () => {
  eFilingHPActions.validate3SubmitDates();
});

Given("Expand docket row 1", () => {
  eFilingHPActions.expandDocketRow1();
});

Then("Validate Docket Sequence", () => {
  eFilingHPActions.validateDocketSequence();
});

Then("Validate Docket Code", () => {
  eFilingHPActions.validateDocketCode();
});

Then("Validate Filed By", () => {
  eFilingHPActions.validateFiledBy();
});

Then("Validate Filed on Behalf of", () => {
  eFilingHPActions.validateFiledOnBehalfOf();
});

Then("Validate Search Document", () => {
  eFilingHPActions.validateSearchDocument();
});

Then("Validate Document Type", () => {
  eFilingHPActions.validateDocumentType();
});

Then("Validate Document Number", () => {
  eFilingHPActions.validateDocumentNumber();
});

Then("Validate Document Title", () => {
  eFilingHPActions.validateDocumentTitle();
});

Then("Validate Main Document", () => {
  eFilingHPActions.validateMainDocument();
});

Then("Validate Attached to Docket Seq", () => {
  eFilingHPActions.validateAttachedToDocketSeq();
});

Then("Validate Security", () => {
  eFilingHPActions.validateSecurity();
});

Given("Close docket row 1", () => {
  eFilingHPActions.closeDocketRow1();
});

Given("Expand docket row 2", () => {
  eFilingHPActions.expandDocketRow2();
});

Given("Close docket row 2", () => {
  eFilingHPActions.closeDocketRow2();
});

Given("Expand docket row 3", () => {
  eFilingHPActions.expandDocketRow3();
});

Given("Close docket row 3", () => {
  eFilingHPActions.closeDocketRow3();
});

Given("Click Filing Fee Tab", () => {
  eFilingHPActions.clickFilingFeeTab();
});

Then("Validate payment details pay type", () => {
  eFilingHPActions.validatePaymentDetailsPayType();
});

Then("Validate payment details confirmation number", () => {
  eFilingHPActions.validatePaymentDetailsConfirmationNumber();
});

Then("Validate payment details paid amount", () => {
  eFilingHPActions.validatePaymentDetailsPaidAmount();
});

Given("Validate Cost Assessments Row 1", () => {
  eFilingHPActions.validateCostAssessmentsRow1();
});

Then("Validate Priority", () => {
  eFilingHPActions.validatePriority();
});

Then("Validate Detail", () => {
  eFilingHPActions.validateDetail();
});

Then("Validate Description", () => {
  eFilingHPActions.validateDescription();
});

Then("Validate Assessed Amount", () => {
  eFilingHPActions.validateAssessedAmount();
});

Then("Validate Balance", () => {
  eFilingHPActions.validateBalance();
});

Given("Validate Cost Assessments Row 2", () => {
  eFilingHPActions.validateCostAssessmentsRow2();
});

Given("Validate Cost Assessments Totals", () => {
  eFilingHPActions.validateCostAssessmentsTotals();
});

Then("Validate Assessed Total Amount", () => {
  eFilingHPActions.validateAssessedTotalAmount();
});

Then("Validate Balance Total", () => {
  eFilingHPActions.validateBalanceTotal();
});

Then("Validate Amount to Apply", () => {
  eFilingHPActions.validateAmountToApply();
});

Given("Press Choose Action Button", () => {
  eFilingHPActions.pressChooseActionButton();
});

Then("Correct actions display", () => {
  eFilingHPActions.correctActionsDisplay();
});

Given("Select Accept option", () => {
  eFilingHPActions.selectAcceptOption();
});

Then("Accept Filing window displays", () => {
  eFilingHPActions.acceptFilingWindowDisplays();
});

Given("Press Yes", () => {
  eFilingHPActions.pressYes();
});

Then("Assign Judge Schedule Event window displays", () => {
  eFilingHPActions.assignJudgeScheduleEventWindowDisplays();
});

Then("Validate Assign Judge Style of Case Proposed", () => {
  eFilingHPActions.validateAssignJudgeStyleOfCaseProposed();
});

Given("Click Assign Judge Style of Case Save button", () => {
  eFilingHPActions.clickAssignJudgeStyleOfCaseSaveButton();
});

Then("Validate Judge Party Type", () => {
  eFilingHPActions.validateJudgePartyType();
});

Given("Change prorated dropdown to manual judge", () => {
  eFilingHPActions.changeProratedDropdownToManualJudge();
});

Given("Select Cypress Judge", () => {
  eFilingHPActions.selectCypressJudge();
});

Given("Press Select Judge button", () => {
  eFilingHPActions.pressSelectJudgeButton();
});

Then("Validate Judge is selected", () => {
  eFilingHPActions.validateJudgeIsSelected();
});

Given("Enter Event Description", () => {
  eFilingHPActions.enterEventDescription();
});

Then("Event Description selected", () => {
  eFilingHPActions.eventDescriptionSelected();
});

Given("Enter future Event Date", () => {
  eFilingHPActions.enterFutureEventDate();
});

Then("Validate event date", () => {
  eFilingHPActions.validateEventDate();
});

Given("Enter Event Time", () => {
  eFilingHPActions.enterEventTime();
});

Then("Validate event time", () => {
  eFilingHPActions.validateEventTime();
});

Then("Validate Event Judge is select", () => {
  eFilingHPActions.validateEventJudgeIsSelect();
});

Given("Enter Room", () => {
  eFilingHPActions.enterRoom();
});

Then("Room selected", () => {
  eFilingHPActions.roomSelected();
});

Then("Validate Room Location", () => {
  eFilingHPActions.validateRoomLocation();
});

Given("Enter Note to Filer", () => {
  eFilingHPActions.enterNoteToFiler();
});

Then("Validate Note to Filer", () => {
  eFilingHPActions.validateNoteToFiler();
});

Given("Click Note to Filer Save Note Button", () => {
  eFilingHPActions.clickNoteToFilerSaveNoteButton();
});

Given("Press Save Event", () => {
  eFilingHPActions.pressSaveEvent();
});

Then("Assign Judge Schedule Event window closes", () => {
  eFilingHPActions.assignJudgeScheduleEventWindowCloses();
});

Given("Close tab", () => {
  eFilingHPActions.closeTab();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(EFilingHPActions.prototype);
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "userMustHaveAnEfilingAccountLoggedInAndOnTheEfilingMenu"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnFileNewCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newCaseEntryDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCourtLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "courtLocationShouldBeSet"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseCategory"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "civilAssociateChapterDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectBreachOfContract"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "breachOfContractDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterStyleOfCaseEfilingVCaseImport"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseStyleDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFeeAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "filingFeeDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickInBoxForNoteToClerkPleaseCreateSummons"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickContinue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "nextPagePartyEntryScreen"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartyTypePetitioner"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "petitionerIsSelectedAndDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "lastNameIsEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "firstNameIsEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterMiddleInitial"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "middleInitialEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDateOfBirth"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "dateOfBirthEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCountry"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "countryIsEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterAddress1"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addressIsEntered"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterCity");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "cityIsEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterStateProvince"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "stateIsEntered"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterZip");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "zipcodeIsEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAddNewParty"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newPartyEntryScreen"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartyTypeRespondent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "respondentIsSelectedAndDisplayed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "documentScreenDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAddButtonFilingOnBehalfOf"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "filingOnBehalfOfDisplaysinTheBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkboxDefaultsToAllNamedPetitionerPlaintiffs"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "documentsPetitionIsAutoFilledForDocumentCategory"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectDocumentTypeDropdownClickOnAssociateCourt"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnChooseFileToAddDocument"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "windowOpensToSelectDocumentMustBePDF"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickInTheBoxToTypeDocumentName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "documentNameDisplaysInBox"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickAdd");
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "documentIsAddedToSubissionInTheDocumentTitleAttachmentBox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "reviewAndFilePageDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCOR2Checkbox"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "thisActivatesTheContinueButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "paymentScreenDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCreditCardRadioButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCardholderName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCardNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCvcCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterExperationDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSubmit"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "endOfTest");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "useCaseCreatedWithEfiling"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCaseImportFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "setFilingLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "filingLocationShouldBeSet"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "enterCaseIDOrFilingReferenceNumberInFilingRefConfirmationNoCaseIDField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseIDOrFilingReferenceNumberHasBeenEntered"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressApplyButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseAppearsInResults"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandCaseRowInTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseInfoSectionDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMunicipalLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFilingDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMilestone"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateStyleOfCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAgency"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCaseSecurity"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "filingPartyTable"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFilingPartyType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFilingPartyMobar"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFilingPartyName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partyTabDisplaysAndIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartyTablePetitioner"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePartyType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePartyName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMiddleName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDateOfBirth"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateStreetAddress"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCity"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateZipCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickPartyTypeStatusAcceptButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePartyStatus"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectPartyTableRespondent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressDocketTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDialogPromptToConfirmDocketCode"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "selectYes");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketResultsTableDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validate3RowsInSize"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validate1RowHasFiledOnBehalfOfPetitioner"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validate3DocketCodesAndDescriptions"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validate3SubmitDates"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandDocketRow1"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocketSequence"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocketCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFiledBy"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateFiledOnBehalfOf"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateSearchDocument"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocumentType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocumentNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDocumentTitle"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateMainDocument"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAttachedToDocketSeq"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateSecurity"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeDocketRow1"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandDocketRow2"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeDocketRow2"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandDocketRow3"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeDocketRow3"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickFilingFeeTab"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePaymentDetailsPayType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePaymentDetailsConfirmationNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePaymentDetailsPaidAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCostAssessmentsRow1"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validatePriority"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDetail"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAssessedAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateBalance"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCostAssessmentsRow2"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateCostAssessmentsTotals"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAssessedTotalAmount"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateBalanceTotal"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAmountToApply"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressChooseActionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "correctActionsDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAcceptOption"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "acceptFilingWindowDisplays"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "pressYes");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "assignJudgeScheduleEventWindowDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateAssignJudgeStyleOfCaseProposed"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickAssignJudgeStyleOfCaseSaveButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateJudgePartyType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "changeProratedDropdownToManualJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCypressJudge"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressSelectJudgeButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateJudgeIsSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterEventDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "eventDescriptionSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFutureEventDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEventDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterEventTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEventTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateEventJudgeIsSelect"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterRoom");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "roomSelected"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateRoomLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterNoteToFiler"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validateNoteToFiler"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickNoteToFilerSaveNoteButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "pressSaveEvent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "assignJudgeScheduleEventWindowCloses"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "closeTab");
  cy.writeFile("./differences/EFilingHPActions.tmp", propertyNames);
}
