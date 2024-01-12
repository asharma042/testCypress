/// <reference types="cypress" />
import currentFunction from "current-function";
import Utils from "../../../utils/utils";
import jsonHandler from "../../../../fixtures/jsonHandler";
import DispositionJudgementElements from "./DispositionJudgementElements";
import CivilCaseService from "./CivilCaseService";

export default class DJ_DispositionJudgementActions {
  constructor(tempFileName) {
    if (!tempFileName) {
      throw new Error("missing tempFileName");
    }
    this.tempFileName = tempFileName;
    this.utils = new Utils();
    this.civilDJElements = new DispositionJudgementElements();
    this.civilCaseService = new CivilCaseService();
  }
  readRunTimeFile() {
    cy.log(`DispositionJudgementActions.readRunTimeFile ${this.tempFileName}`);
    var that = this;
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        that.case = $json.case;
        cy.log(
          `DispositionJudgementActions ${JSON.stringify($json.case, null, 2)}`
        );
        cy.wrap($json.case).as("case");
      }
    });
  }

  navigateAndSearchForCase() {
    this.readRunTimeFile();
    cy.login();

    cy.clickLink("Case Processing");
    cy.clickMenu("Civil");
    cy.clickMenu("Disposition & Judgment");

    this.civilDJElements.getSearchCaseIdButton().click();

    cy.intercept("smc-web/getCivilDispositionAndJudgmentCasesById*").as(
      "getCivilDispositionAndJudgmentCasesById"
    );

    cy.get("@case").then(($case) => {
      this.civilDJElements.getSearchInput().type(`${$case.caseId}{enter}`);
    });

    cy.wait(["@getCivilDispositionAndJudgmentCasesById"]);
  }

  civilCaseWithLitigantPartyTypes(scenario, partyCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.civilCaseService.civilCaseWithLitigantPartyTypes(
      scenario,
      this.tempFileName
    );

    this.readRunTimeFile();

    this.civilCaseService.civilCaseAddParties(
      scenario,
      partyCount,
      this.tempFileName
    );
  }

  continueWithCivilCaseWithLitigantPartyTypes() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.readRunTimeFile();
    cy.login();
  }

  clickOnCivilFromCaseProcessing() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickLink("Case Processing");
    cy.clickMenu("Civil");
  }

  clickOnDispositionJudgment() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.clickMenu("Disposition & Judgment");
  }

  caseIDRadioButtonIsSelected() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getSearchCaseIdButton().click();
  }

  enterCivilCaseIDInMyCaseIDSearch() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getCivilDispositionAndJudgmentCasesById*").as(
      "getCivilDispositionAndJudgmentCasesById"
    );
    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/getDispoJdgmntCaseDispositionOnCase*").as(
      "getDispoJdgmntCaseDispositionOnCase"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    cy.get("@case").then(($case) => {
      this.civilDJElements.getSearchInput().type(`${this.case.caseId}{enter}`);
    });
    cy.wait([
      "@getCivilDispositionAndJudgmentCasesById",
      "@getTableSorterAllPrefs",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@getDispoJdgmntCaseDispositionOnCase",
      "@saveUserNotyMessages",
    ]).then(() => {
      this.utils.clearNotyMessages();
    });
  }

  clickMagnifyingGlassIcon() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }
  casesDisplayInTheCasesSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let that = this;
    this.readRunTimeFile();
    this.civilDJElements.getCaseTable().then(($ele) => {
      cy.wrap($ele[0])
        .find("tbody")
        .then(($tbodies) => {
          cy.get("@case").then(($case) => {
            that.case = $case;
            //first table
            cy.wrap($tbodies).should("have.length", 2);

            cy.wrap($tbodies[0]).find("tr").should("have.length", 8);
            cy.wrap($tbodies[0]).contains("td", that.case.caseId);

            //lower table
            cy.wrap($tbodies[1]).find("tr").should("have.length", 2);
            cy.wrap($tbodies[1]).contains(
              "td",
              that.case.parties[0].lastName.toUpperCase()
            );
            cy.wrap($tbodies[1]).contains(
              "td",
              that.case.parties[1].lastName.toUpperCase()
            );
          });
        });
    });
  }

  clickSelectAllCheckBox() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getCasePartiesSelectAllCheckbox(0).check();
  }

  enablesPartyDispositionDropDownList() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  clickPencilIconNextToACasePartyRecord(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getCasePartiesPartyDispositionPencilIcon(partiesCount)
      .click();
  }

  selectValueFromPartyDispositionDropdownList(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let defaultPartyDispositionInputValue = jsonHandler.getValue(
      scenario,
      "defaultPartyDispositionInputValue"
    );

    this.civilDJElements
      .getCasePartiesPartyDispositionInput(defaultPartyDispositionInputValue)
      .click();

    let disposition = jsonHandler.getValue(scenario, "disposition");

    this.civilDJElements
      .getCasePartiesPartyDispositionSearchInput()
      .type(`${disposition}{enter}`);
  }

  clickCheckmarkIconForTheSameCasePartyRecord() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getCasePartiesPartyDispositionCheckmarkIcon().click();
  }

  populatesPartyDipositionCodeForAllCasePartyRecords(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getCasePartiesResultsTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);

      let disposition = jsonHandler.getValue(scenario, "disposition");

      cy.wrap($ele[0])
        .find("tbody")
        .find("tr")
        .then((rows) => {
          rows.toArray().forEach((row) => {
            cy.wrap(row).contains("td", disposition);
          });
        });
    });
  }

  clickSaveCasePartiesDispositionButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/saveCasePartiesDisposition*").as(
      "saveCasePartiesDisposition"
    );
    cy.intercept("smc-web/getSelectPickerSearchStylePreference*").as(
      "getSelectPickerSearchStylePreference"
    );
    cy.intercept("smc-web/getDocketChangeReasonCodes*").as(
      "getDocketChangeReasonCodes"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.civilDJElements
      .getCasePartiesSaveCasePartiesDisposition("Save Case Parties Disposition")
      .click();

    cy.wait([
      "@saveCasePartiesDisposition",
      "@getSelectPickerSearchStylePreference",
      "@getDocketChangeReasonCodes",
      "@saveUserNotyMessages",
    ]);
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  casePartyDispositionCodeIsSavedForSelectedCaseParty() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getDispositionAndJudgementCloseTabIcon().click();
  }

  continueWithCivilCaseWithAllPartiesDisposed() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.navigateAndSearchForCase();

    this.civilDJElements.getCaseTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 8);
    });

    //Popup w/ message appears
    this.civilDJElements
      .getCaseDispositionUnavaiableAlertText()
      .should("include.text", "All case parties are disposed");

    this.civilDJElements.getCaseDispositionUnavailableOkButton().click();
  }

  caseDispositionPopulatesWithDJVJuryVerdictCivilDISPLAYONLY() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getCaseDispositionSectionCaseDispositionButton(0)
      .should("have.class", "disabled");

    this.civilDJElements
      .getCaseDispositionSectionCaseDispositionButton(0)
      .should("include.text", "DJV - Jury Verdict - Civil");
  }

  caseDispositionDateAutoFillsDISPLAYONLY() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getCaseDispositionSectionDispositionDate()
      .should("to.be", "disabled");

    let dateOfDisposition = this.utils.formatDate(new Date());
    this.civilDJElements
      .getCaseDispositionSectionDispositionDate()
      .should("have.value", dateOfDisposition);
  }

  timeFieldAutoFillsDISPLAYONLY() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getCaseDispositionSectionDispositionTime()
      .should("to.be", "disabled");

    this.civilDJElements
      .getCaseDispositionSectionDispositionTime()
      .then(($ele) => {
        expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
      });
  }

  enterTextInPredefinedTextFieldInCaseDispositionSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getCaseDispositionSectionDispositionPreDefinedText()
      .type("some predefined text");
  }

  textDisplaysInFreeTextField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  clickSaveDispositionButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );

    this.civilDJElements
      .getCaseDispositionSectionSaveDispositionButton()
      .click();
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSaveDocketCodeAndCaseId() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  caseDispositionCodeIsSavedForTheCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  clickCloseIfEventWindowOpens() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getCivilDispositionEventClosureWindowSaveButton()
      .click();

    this.civilDJElements.getDispositionAndJudgementCloseTabIcon().click();
  }

  civilCaseWithAllPartiesDisposedAndCaseDisposed() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.navigateAndSearchForCase();

    //validate that the predefined text appears
    this.civilDJElements
      .getCaseDispositionPreDefinedTextArea()
      .contains("some predefined text")
      .should("to.be", "visible");
  }

  clickJudgmentSectionTriangleIcon() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op - already opened
  }

  expandsJudgmentSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //already open
  }

  selectPartyFromCasePartyDropdownList(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getJudgmentsCasePartyButton().click();
    cy.get("@case").then(($ele) => {
      let firstName = $ele["parties"][partiesCount]["firstName"];
      let middleName = $ele["parties"][partiesCount]["middleName"];
      let lastName = $ele["parties"][partiesCount]["lastName"];
      this.civilDJElements
        .getJudgmentsCasePartySearchInput()
        .type(`${firstName} ${middleName} ${lastName}{enter}`);
    });
  }

  selectPartyFromCasePartyDropdownListPetitioner(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.selectPartyFromCasePartyDropdownList(partiesCount);
  }

  selectsOnlyTheOneCaseParty() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op - the enter key from above selected
  }

  clickAddJudgmentButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getJudgmentsAddJudgmentButton().click();
  }

  opensAddJudgment(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($ele) => {
      let firstName = $ele["parties"][partiesCount]["firstName"].toUpperCase();
      let middleName =
        $ele["parties"][partiesCount]["middleName"].toUpperCase();
      let lastName = $ele["parties"][partiesCount]["lastName"].toUpperCase();
      this.civilDJElements
        .getAddJudgmentPopupWindowSelectedPartyText()
        .contains(`${firstName} ${middleName} ${lastName}`)
        .should("to.be", "visible");
    });
  }

  judgmentAgainstForFieldClick(option0) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getAddJudgmentAgainstForButton().click();
    this.civilDJElements
      .getAddJudgmentAgainstForInputSearch()
      .type(`${option0}{enter}`);
  }

  judgmentForField(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let judgmentText = partiesCount == 0 ? "Judgment For" : "Judgment Against";
    this.civilDJElements
      .getAddJudgmentForText(`${judgmentText}`)
      .should("to.be", "visible");
  }

  displaysPartyNameInJudgmentAgainstField(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($ele) => {
      let firstName = $ele["parties"][partiesCount]["firstName"].toUpperCase();
      let middleName =
        $ele["parties"][partiesCount]["middleName"].toUpperCase();
      let lastName = $ele["parties"][partiesCount]["lastName"].toUpperCase();
      this.civilDJElements.getAddJudgmentPartyIdText().then(($ele) => {
        cy.wrap($ele)
          .contains(`${firstName} ${middleName} ${lastName}`)
          .should("to.be", "visible");
      });
    });
  }

  judgmentMonetaryNonMonetarySelectMonetary() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getAddJudgmentMonetaryNonMonetaryButton().click();
    this.civilDJElements
      .getAddJudgmentMonetaryNonMonetarySearchInput()
      .type(`Monetary{enter}`);
  }

  monetaryDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getAddJudgmentMonetaryNonMonetaryButton()
      .contains("Monetary")
      .should("to.be", "visible");
  }

  enter15000InAmountField(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let amount = 150 * (partiesCount + 1);
    this.civilDJElements.getAddJudgmentAmountInput().clear().type(`${amount}`);
  }

  amountDisplays(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let amount = 150 * (partiesCount + 1);
    this.civilDJElements
      .getAddJudgmentAmountInput()
      .should("have.value", `${amount}`);
  }

  enterJCLAMInJudgmentDescriptionField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getAddJudgmentDescriptionButton().click();
    this.civilDJElements
      .getAddJudgmentDescriptionSearchInput()
      .type(`JCLAM{enter}`);
  }

  judgmentDateAutoFillsWithCurrentDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let dateOfDisposition = this.utils.formatDate(new Date());
    this.civilDJElements
      .getAddJudgmentDate()
      .should("have.value", dateOfDisposition);
  }

  timeAutoFillsWithCurrentTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getAddJudgmentTime().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  clickSaveButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/validateDispoJdgmntAddJudgment*").as(
      "validateDispoJdgmntAddJudgment"
    );
    cy.intercept("smc-web/saveDispoJdgmntJudgmentInfo*").as(
      "saveDispoJdgmntJudgmentInfo"
    );
    cy.intercept("smc-web/getDispoJdgmntJudgmentsOnCase*").as(
      "getDispoJdgmntJudgmentsOnCase"
    );

    cy.intercept("smc-web/getTableSorterAllPrefs*").as(
      "getTableSorterAllPrefs"
    );
    cy.intercept("smc-web/getTableSorterPagerHTML*").as(
      "getTableSorterPagerHTML"
    );
    cy.intercept("smc-web/getTableSorterSortOrder*").as(
      "getTableSorterSortOrder"
    );
    cy.intercept("smc-web/getTableSorterFilters*").as("getTableSorterFilters");
    cy.intercept("smc-web/setTableSorterSortOrder*").as(
      "setTableSorterSortOrder"
    );

    this.civilDJElements.getAddJudgmentSaveButton().click();

    cy.wait([
      "@validateDispoJdgmntAddJudgment",
      "@saveDispoJdgmntJudgmentInfo",
      "@getDispoJdgmntJudgmentsOnCase",
      "@getTableSorterAllPrefs",
      "@getTableSorterPagerHTML",
      "@getTableSorterSortOrder",
      "@getTableSorterFilters",
      "@setTableSorterSortOrder",
    ]);
  }

  judgmentForRecordDispalysInTheViewUpdateJudgmentTable(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.get("@case").then(($ele) => {
      let firstName = $ele["parties"][partiesCount]["firstName"].toUpperCase();
      let middleName =
        $ele["parties"][partiesCount]["middleName"].toUpperCase();
      let lastName = $ele["parties"][partiesCount]["lastName"].toUpperCase();
      this.civilDJElements.getViewUpdateJudgmentsTable().then(($tbl) => {
        cy.wrap($tbl[0])
          .find("tbody")
          .find("tr")
          .then(($tr) => {
            cy.wrap($tr[partiesCount])
              .contains(`${firstName} ${middleName} ${lastName}`)
              .should("to.be", "visible");
          });
      });
      this.civilDJElements.getDispositionAndJudgementCloseTabIcon().click();
    });
  }

  civilCaseWithAllPartiesDisposedAndCaseDisposedAndPetitionerJudged() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.navigateAndSearchForCase();

    //validate that the predefined text appears
    this.civilDJElements
      .getCaseDispositionPreDefinedTextArea()
      .contains("some predefined text")
      .should("to.be", "visible");
  }

  selectPartyFromCasePartyDropdownListRespondent(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.selectPartyFromCasePartyDropdownList(partiesCount);
  }

  civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEntered() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.navigateAndSearchForCase();
  }

  clickNextToJudgmentRecordToBeUpdated(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getViewUpdateJudgementsTablePlusIcon(partiesCount)
      .click();
  }

  recordExpands() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getUpdateDeleteJudgmentEntryTitle("Update/Delete Judgment Entry")
      .should("to.be", "visible");
  }

  clickPencilIcon() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getUpdateDeleteJudgmentEntryPencilEdit(0).click();
  }

  enter500InAmountField(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let amount = 500 * (partiesCount + 1);
    this.civilDJElements.getAddJudgmentAmountInput().clear().type(`${amount}`);
  }

  amountUpdates(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let amount = 500 * (partiesCount + 1);
    this.civilDJElements
      .getAddJudgmentAmountInput()
      .should("have.value", `${amount}`);
  }

  enterERREnteredInErrorInReasonForJudgmentChangeField() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements
      .getUpdateDeleteJudgmentEntryReasonForJudgmentChangeButton()
      .click();
    this.civilDJElements
      .getUpdateDeleteJudgmentEntryReasonForJudgmentChangeSearchBox()
      .type(`err - entered in error{enter}`);
  }

  selectUpdateJudgmentEntryButton() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/validateDispoJdgmntDeleteJudgment*").as(
      "validateDispoJdgmntDeleteJudgment"
    );
    cy.intercept("smc-web/updateJudgmentsRecord*").as("updateJudgmentsRecord");
    cy.intercept("smc-web/getDispoJdgmntJudgmentsOnCase*").as(
      "getDispoJdgmntJudgmentsOnCase"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.civilDJElements
      .getUpdateDeleteJudgmentEntryUpdateJudgmentEntryButton()
      .click();

    cy.wait([
      "@validateDispoJdgmntDeleteJudgment",
      "@updateJudgmentsRecord",
      "@getDispoJdgmntJudgmentsOnCase",
      "@saveUserNotyMessages",
    ]);
  }

  successNotyDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.utils.clearNotyMessages();
  }

  updateDisplaysInTable(partiesCount) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.civilDJElements.getViewUpdateJudgmentsTable().then(($tbl) => {
      let amount = 500 * (partiesCount + 1);
      cy.wrap($tbl[0])
        .find("tbody")
        .find("tr")
        .then(($tr) => {
          cy.wrap($tr[partiesCount])
            .contains(`${amount}.00`)
            .should("to.be", "visible");
        });
    });
    this.civilDJElements.getDispositionAndJudgementCloseTabIcon().click();
  }

  civilCaseWithAllPartiesAndCaseDisposedWithJudgmentEnteredAfterUpdate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.navigateAndSearchForCase();
  }
}
