/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import DJDisposeOnePartyOnlyElements from "./DJDisposeOnePartyOnlyElements";
import DispostionJudgementService from "../../../pom/caseProcessing/civil/DispositionJudgementService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class DJDisposeOnePartyOnlyActions {
  constructor() {
    this.utils = new Utils();
    this.tempFileName = "cypress\\temp\\djDisposeOnePartyOnly.json";
    this.djDisposeOnePartyElements = new DJDisposeOnePartyOnlyElements();
    this.djService = new DispostionJudgementService(this.tempFileName);
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
    this.djService.createACivilCaseWithLitigationPartyTypes(
      this.scenario,
      this.partiesCount
    );
  }
  /**
   * Scenario: Dispose One Party
   */
  continueWithCivilCaseWithLitigantPartyTypes() {
    this.readRunTimeFile();
    cy.login();
    this.scenario = "scenario1";
    this.partiesCount = 0;
  }

  clickOnCivilFromCaseProcessing() {
    cy.clickLink("Case Processing");
    cy.clickMenu("Civil");
  }

  clickOnDispositionJudgment() {
    cy.clickMenu("Disposition & Judgment");
  }

  caseIDRadioButtonIsSelected() {
    this.djDisposeOnePartyElements.getSearchCaseIdButton().click();
  }

  enterCivilCaseIDInMyCaseIDSearch() {
    cy.intercept("smc-web/getCivilDispositionAndJudgmentCasesById*").as(
      "getCivilDispositionAndJudgmentCasesById"
    );
    cy.intercept(
      "smc-web/resources/js/cvc-judgement/smc.civil.dispositionAndJudgment.caseParties.js*"
    ).as("casePartiesjs");
    cy.intercept(
      "smc-web/resources/js/cvc-judgement/smc.civil.dispositionAndJudgment.caseDisposition.js*"
    ).as("caseDispositionjs");
    cy.intercept("smc-web/resources/js/smc.muniTrfc.courtDisposition.js*").as(
      "courtDispositionjs"
    );
    cy.intercept(
      "smc-web/resources/js/cvc-judgement/smc.civil.dispositionAndJudgment.closeEvents.js*"
    ).as("closeEventsjs");
    cy.intercept(
      "smc-web/resources/js/cvc-judgement/smc.civil.dispositionAndJudgment.judgments.js*"
    ).as("judgmentsjs");
    cy.intercept("smc-web/getTableSorterAllPrefs*").as("AllPrefs");
    cy.intercept("smc-web/getTableSorterFilters*").as("Filters");
    cy.intercept("smc-web/getTableSorterSortOrder*").as("SortOrder");
    cy.intercept("smc-web/getDispoJdgmntCaseDispositionOnCase*").as(
      "getDispoJdgmntCaseDispositionOnCase"
    );

    this.djDisposeOnePartyElements
      .getSearchInput()
      .type(`${this.case.caseId}{enter}`);

    cy.wait([
      "@getCivilDispositionAndJudgmentCasesById",
      "@casePartiesjs",
      "@caseDispositionjs",
      "@courtDispositionjs",
      "@closeEventsjs",
      "@judgmentsjs",
      "@AllPrefs",
      "@Filters",
      "@SortOrder",
      "@getDispoJdgmntCaseDispositionOnCase",
    ]);
  }

  clickMagnifyingGlassIcon() {
    //no op
  }

  casesDisplayInTheCasesSection() {
    this.djDisposeOnePartyElements
      .getCaseTable()
      .find("tbody")
      .first()
      .children("tr")
      .should("have.length", 2);

    cy.get("@case").then(($case) => {
      this.djDisposeOnePartyElements
        .getCaseDispositionJudgmRow()
        .contains("td", $case.caseId)
        .should("exist");

      this.djDisposeOnePartyElements
        .getCaseDispositionJudgmRow()
        .contains("td", $case.parties[0].lastName.toUpperCase())
        .should("exist");

      this.djDisposeOnePartyElements
        .getCaseDispositionJudgmRow()
        .contains("td", $case.parties[1].lastName.toUpperCase())
        .should("exist");
    });
  }

  clickSelectCheckBoxNextToOneParty() {
    this.djDisposeOnePartyElements.getCasePartiesCheckbox(0).click();
  }

  enablesPartyDispositionDropDownList() {
    //no op
  }

  clickPencilIconNextToACasePartyRecord() {
    this.djDisposeOnePartyElements
      .getCasePartiesPartyDispositionPencilIcon(0)
      .click();
  }

  selectValueFromPartyDispositionDropdownList() {
    let defaultPartyDispositionInputValue = jsonHandler.getValue(
      this.scenario,
      "defaultPartyDispositionInputValue"
    );

    this.djDisposeOnePartyElements
      .getCasePartiesPartyDispositionInput(defaultPartyDispositionInputValue)
      .click();

    let disposition = jsonHandler.getValue(this.scenario, "disposition");

    this.djDisposeOnePartyElements
      .getCasePartiesPartyDispositionSearchInput()
      .type(`${disposition}{enter}`);
  }

  clickCheckmarkIconForTheSameCasePartyRecord() {
    this.djDisposeOnePartyElements
      .getCasePartiesPartyDispositionCheckmarkIcon()
      .click();
  }

  populatesPartyDipositionCodeForOneCasePartyRecord() {
    this.djDisposeOnePartyElements.getCasePartiesResultsTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);

      let disposition = jsonHandler.getValue(this.scenario, "disposition");
      cy.wrap($ele[0])
        .find("tbody")
        .find("tr")
        .then((rows) => {
          cy.wrap(rows[0]).contains("td", disposition).should("exist");
        });
    });
  }

  clickSaveCasePartiesDispositionButton() {
    this.djDisposeOnePartyElements
      .getCasePartiesSaveCasePartiesDisposition("Save Case Parties Disposition")
      .click();
  }

  greenMessageDisplaysInUpperRightHandCornerStatingSuccessfulSave() {
    this.utils.clearNotyMessages();
  }

  casePartyDispositionCodeIsSavedForOneSelectedCaseParty() {
    this.djDisposeOnePartyElements.getCasePartiesResultsTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length", 2);

      let today = this.utils.formatDate(new Date());
      cy.wrap($ele[0])
        .find("tbody")
        .find("tr")
        .then((rows) => {
          cy.wrap(rows[0]).contains("td", today).should("exist");
        });
    });
  }

  uNABLETOPROCEEDTOCASEDISPOSITION() {
    this.djDisposeOnePartyElements
      .getCaseDispositionSectionExpandIcon()
      .click();
    this.djDisposeOnePartyElements
      .getCaseDispositionSectionSaveDispositionButton()
      .should("be.disabled");

    this.djDisposeOnePartyElements
      .getDispositionAndJudgementCloseTabIcon()
      .click();
  }
}
