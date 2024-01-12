/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DJDisposePartiesIndividuallyElements from "./DJDisposePartiesIndividuallyElements";
import DJ_DispositionJudgementActions from "../../../pom/caseProcessing/civil/DJ_DispositionJudgementActions";
import jsonHandler from "../../../../fixtures/jsonHandler";

const PETITIONER = 0;
const RESPONDENT = 1;

export default class DJDisposePartiesIndividuallyActions {
  constructor() {
    this.utils = new Utils();
    this.tempFileName = "cypress\\temp\\djDisposePartiesIndividually.json";
    this.dJDisposePartiesIndividuallyElements =
      new DJDisposePartiesIndividuallyElements();
    this.djActions = new DJ_DispositionJudgementActions(this.tempFileName);
    this.typePerson = PETITIONER;
  }
  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.wrap($json.case).as("case");
      }
    });
  }

  /**
   * Scenario: Create a Civil Case
   */
  civilCaseWithLitigantPartyTypes() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.djActions.civilCaseWithLitigantPartyTypes(
      this.scenario,
      this.partiesCount
    );
  }
  /**
   * Scenario: Dispose Parties One At A Time
   */
  continueWithCivilCaseWithLitigantPartyTypes() {
    this.scenario = "scenario1";
    this.partiesCount = 0;
    this.djActions.continueWithCivilCaseWithLitigantPartyTypes();
  }

  clickOnCivilFromCaseProcessing() {
    this.djActions.clickOnCivilFromCaseProcessing();
  }

  clickOnDispositionJudgment() {
    this.djActions.clickOnDispositionJudgment();
  }

  caseIDRadioButtonIsSelected() {
    this.djActions.caseIDRadioButtonIsSelected();
  }

  enterCivilCaseIDInMyCaseIDSearch() {
    this.djActions.enterCivilCaseIDInMyCaseIDSearch();
  }

  clickMagnifyingGlassIcon() {
    this.djActions.clickMagnifyingGlassIcon();
  }

  casesDisplayInTheCasesSection() {
    this.djActions.casesDisplayInTheCasesSection();
  }

  clickCheckBoxNextToOneParty() {
    this.partyType = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.typePerson,
      "descriptionCode"
    );
    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesCheckBoxNextToParty(this.partyType)
      .click();
  }

  enablesPartyDispositionDropDownList() {
    this.djActions.enablesPartyDispositionDropDownList();
  }

  selectValueFromPartyDispositionDropdownList() {
    const disposition = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.typePerson,
      "disposition"
    );

    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesPartyDispositionPencilIcon(this.partyType)
      .click();

    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesPartyDispositionDropdownToggleButton(this.partyType)
      .type(`{enter}`);

    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesPartyDispositionSearchInput(this.partyType)
      .type(`${disposition}{enter}`);
  }

  clickCheckmarkIconForTheSameCasePartyRecord() {
    this.djActions.clickCheckmarkIconForTheSameCasePartyRecord();
  }

  populatesPartyDipositionCodeForPetitioner() {
    const disposition = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.typePerson,
      "disposition"
    );
    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesPartyDispositionCodeCell(this.partyType)
      .invoke("text")
      .should("include", disposition);
  }

  populatesPartyDipositionCodeForRespondent() {
    const disposition = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.typePerson,
      "disposition"
    );
    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesPartyDispositionCodeCell(this.partyType)
      .invoke("text")
      .should("include", disposition);
  }

  clickSaveCasePartiesDispositionButton() {
    cy.intercept("smc-web/saveCasePartiesDisposition*").as(
      "saveCasePartiesDisposition"
    );
    cy.intercept("smc-web/saveUserNotyMessages.do").as("saveUserNotyMessages");
    this.dJDisposePartiesIndividuallyElements
      .getCasePartiesSaveCasePartiesDisposition("Save Case Parties Disposition")
      .click();
    cy.wait(["@saveCasePartiesDisposition", "@saveUserNotyMessages"]);
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave() {
    this.djActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave();
  }

  casePartyDispositionCodeIsSavedForSelectedCaseParty() {
    if (this.typePerson === RESPONDENT) {
      this.djActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
    }
  }

  unableToProceedToCaseDisposition() {
    this.dJDisposePartiesIndividuallyElements
      .getCaseDispositionContentHeader()
      .click();

    this.dJDisposePartiesIndividuallyElements
      .getDispoJdgmntSaveCaseDispositionBtn()
      .should("be.disabled");
  }

  refreshCase() {
    this.djActions.casePartyDispositionCodeIsSavedForSelectedCaseParty();
    this.djActions.clickOnDispositionJudgment();
    this.djActions.caseIDRadioButtonIsSelected();
    this.djActions.enterCivilCaseIDInMyCaseIDSearch();
    this.djActions.clickMagnifyingGlassIcon();
    this.djActions.casesDisplayInTheCasesSection();
    this.typePerson = RESPONDENT;
  }

  /**
   * Scenario: Dispose Case
   */
  continueWithCivilCaseWithAllPartiesDisposed() {
    this.scenario = "scenario1";
    this.partiesCount = 2;
    this.typePerson = PETITIONER;
    this.djActions.continueWithCivilCaseWithAllPartiesDisposed(
      this.scenario,
      this.partiesCount
    );
  }

  caseDispositionPopulatesWithDTRCTTriedByCourtCivilDISPLAYONLY() {
    const defaultPartyDispositionInputValue = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.typePerson,
      "defaultPartyDispositionInputValue"
    );
    this.dJDisposePartiesIndividuallyElements
      .getCaseDispositionSectionCaseDispositionButton()
      .invoke("prop", "textContent")
      .then(($value) => $value.trim())
      .should("eq", defaultPartyDispositionInputValue);

    this.dJDisposePartiesIndividuallyElements
      .getCaseDispositionSectionCaseDispositionButton()
      .should("have.class", "disabled");
  }

  caseDispositionDateAutoFillsDISPLAYONLY() {
    this.djActions.caseDispositionDateAutoFillsDISPLAYONLY();
  }

  timeFieldAutoFillsDISPLAYONLY() {
    this.djActions.timeFieldAutoFillsDISPLAYONLY();
  }

  enterTextInPredefinedTextFieldInCaseDispositionSection() {
    this.djActions.enterTextInPredefinedTextFieldInCaseDispositionSection();
  }

  textDisplaysInFreeTextField() {
    this.djActions.textDisplaysInFreeTextField();
  }

  clickSaveDispositionButton() {
    cy.intercept("smc-web/getAllOpenEventsOnCaseForDispoJdgmntProcess*").as(
      "getAllOpenEvents"
    );
    cy.intercept("smc-web/smcFormRequest/closeEventsDialog*").as(
      "closeEventsDialog"
    );
    cy.intercept("smc-web/smcFormRequest/tableSorterColOrderAndVisDialog*").as(
      "tableSorterColOrderAndVisDialog"
    );
    this.djActions.clickSaveDispositionButton();
    cy.wait([
      "@getAllOpenEvents",
      "@closeEventsDialog",
      "@tableSorterColOrderAndVisDialog",
    ]);
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId() {
    this.djActions.greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId();
  }

  caseDispositionCodeIsSavedForTheCase() {
    this.djActions.caseDispositionCodeIsSavedForTheCase();
  }

  civilDispositionEventClosureWindowOpens() {
    const title = "Civil Disposition Event Closure window";
    this.dJDisposePartiesIndividuallyElements
      .getCivilDispositionEventClosureWindowTitlebar()
      .contains(title)
      .should("be.visible");
  }

  eventDescriptionDisplayOnly() {
    const eventDescription = jsonHandler.getValue(
      this.scenario,
      "eventDescription"
    );
    this.dJDisposePartiesIndividuallyElements
      .getClosureWindowEventDescriptionCell()
      .invoke("prop", "innerText")
      .should("contains", eventDescription);
  }

  eventDateDisplayOnly() {
    let eventDate = this.utils.getValidDateForSchedulingStartingFromNow(1);
    this.dJDisposePartiesIndividuallyElements
      .getClosureWindowEventDateCell()
      .should("have.text", eventDate);
  }

  timeDisplayOnly() {
    this.dJDisposePartiesIndividuallyElements
      .getClosureWindowTimeCell()
      .then(($ele) => {
        expect($ele[0].textContent.match(/\d{2}:\d{2}:\d{2}/).length == 1).to.be
          .true;
      });
  }

  eventOutcomeHRCANHEARINGTRIALCANCELLED() {
    const eventOutcome = jsonHandler.getValue(this.scenario, "eventOutcome");
    this.dJDisposePartiesIndividuallyElements
      .getClosureWindowCourtDispoEventOutcomeButton()
      .invoke("prop", "textContent")
      .then(($value) => $value.trim())
      .should("eq", eventOutcome);
  }

  eventClosingDateDisplaysCurrentDate() {
    const currentDate = this.utils.formatDate(new Date());
    this.dJDisposePartiesIndividuallyElements
      .getClosureWindowEventClosingDateInput()
      .invoke("prop", "value")
      .should("eq", currentDate.toString());
  }

  eventClosingTimeDisplaysCurrentTime() {
    this.dJDisposePartiesIndividuallyElements
      .getClosureWindowEventClosingTimeInput()
      .invoke("prop", "value")
      .then(($value) => {
        expect($value.trim().match(/\d{2}:\d{2}:\d{2}/).length == 1).to.be.true;
      });
  }

  clickSaveToSaveEventInformation() {
    this.dJDisposePartiesIndividuallyElements
      .getEventClosureWindowSaveButton()
      .click();
  }

  greenNotyDisplaysConfirmingDispositionSaved() {
    this.utils.clearNotyMessages();
  }

  greenNotyDisplaysConfirmingHRCANSaved() {
    this.utils.clearNotyMessages();
    this.dJDisposePartiesIndividuallyElements
      .getDispositionAndJudgementCloseTabIcon()
      .click();
  }
}
