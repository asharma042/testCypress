/// <reference types="cypress" />
import currentFunction from "current-function";
import DocketingServiceActions from "./DocketingServiceActions";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class DocketingService {
  constructor() {
    this.docketingServiceActions = new DocketingServiceActions();
  }

  addDocketEntryToACase(caseId, scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const docketDescription = jsonHandler.getValue(
      "defaults",
      "docketDescription"
    );
    const filingParty = jsonHandler.getValue(scenario, "filingParty");
    const filingOBOParty = jsonHandler.getValue(scenario, "filingOBOParty");
    const addDocketText = jsonHandler.getValue(scenario, "addDocketText");
    cy.login();
    this.addDocketEntry(
      caseId,
      docketDescription,
      filingParty,
      filingOBOParty,
      addDocketText
    );
  }

  setupAddDocketEntry(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let docketDescription = jsonHandler.getValue(scenario, "docketDescription");
    let filingParty = jsonHandler.getValue(scenario, "filingParty");
    let filingOBOParty = jsonHandler.getValue(scenario, "filingOBOParty");
    let addDocketText = jsonHandler.getValue(scenario, "addDocketText");

    cy.get("@case").then(($case) => {
      this.addDocketEntry(
        $case.caseId,
        docketDescription,
        filingParty,
        filingOBOParty,
        addDocketText
      );
    });
  }

  addDocketEntry(
    caseId,
    docketDescription,
    filingParty,
    filingOBOParty,
    addDocketText
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.docketingServiceActions.clickOnDocketingFromCaseProcessing();
    this.docketingServiceActions.selectSearchByCaseId();
    this.docketingServiceActions.caseIDRadioButtonIsSelected();
    this.docketingServiceActions.enterCaseIDInMyCaseIDSearch(caseId);
    this.docketingServiceActions.caseAppearsInResults();
    this.docketingServiceActions.expandCaseRowInTable();
    this.docketingServiceActions.expandAddDocketEntrySection();
    this.docketingServiceActions.enterDocketDescription(docketDescription);
    this.docketingServiceActions.selectedDocketEntryAppears(docketDescription);
    this.docketingServiceActions.enterDocketDate();
    this.docketingServiceActions.docketDateEntered();
    this.docketingServiceActions.enterTime();
    this.docketingServiceActions.selectFilingParty(filingParty);
    this.docketingServiceActions.filingPartyEntered(filingParty);
    this.docketingServiceActions.selectFiledOnBehalfOf(filingOBOParty);
    this.docketingServiceActions.fOBOEntered(filingOBOParty);
    this.docketingServiceActions.enterDocketTextInSearchDocketPreDefinedTextField(
      addDocketText
    );
    this.docketingServiceActions.docketTextEntered(addDocketText);
    this.docketingServiceActions.pressSaveDocketButton();
    this.docketingServiceActions.selectSaveDocketOption();
  }

  setupUpdateDocketEntry(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let updateDocketText = jsonHandler.getValue(scenario, "updateDocketText");

    cy.get("@case").then(($case) => {
      this.updateDocketEntry($case, updateDocketText);
    });
  }

  updateDocketEntry() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.docketingServiceActions.clickOnDocketingFromCaseProcessing();
    this.docketingServiceActions.selectSearchByCaseId();
    this.docketingServiceActions.caseIDRadioButtonIsSelected();
    this.docketingServiceActions.enterCaseIDInMyCaseIDSearch($case);
    this.docketingServiceActions.caseAppearsInResults();
    this.docketingServiceActions.expandViewUpdateDocketEntriesSection();
    this.docketingServiceActions.expandDocketEntry();
    this.docketingServiceActions.updateDocketText(updateDocketText);
    this.docketingServiceActions.pressUpdateDocketEntryButton();
  }

  setupDeleteDocketEntry(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let reasonDescription = jsonHandler.getValue(scenario, "reasonDescription");

    cy.get("@case").then(($case) => {
      this.deleteDocketEntry($case, reasonDescription);
    });
  }

  deleteDocketEntry() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.docketingServiceActions.clickOnDocketingFromCaseProcessing();
    this.docketingServiceActions.selectSearchByCaseId();
    this.docketingServiceActions.caseIDRadioButtonIsSelected();
    this.docketingServiceActions.enterCaseIDInMyCaseIDSearch($case);
    this.docketingServiceActions.caseAppearsInResults();
    this.docketingServiceActions.expandViewUpdateDocketEntriesSection();
    this.docketingServiceActions.expandDocketEntry();
    this.docketingServiceActions.pressTrashCashButton();
    this.docketingServiceActions.enterReasonDescription(reasonDescription);
    this.docketingServiceActions.pressUpdateDocketEntryButton();
  }
}
