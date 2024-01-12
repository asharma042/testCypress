/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import jsonHandler from "../../../../fixtures/jsonHandler";
import CivilCaseService from "../../../pom/caseProcessing/civil/CivilCaseService";
import DocketingService from "../../../pom/caseProcessing/docketing/DocketingService";
import DocketingServiceActions from "../../../pom/caseProcessing/docketing/DocketingServiceActions";
import DocketingServiceElements from "../../../pom/caseProcessing/docketing/DocketingServiceElements";

export default class DocketingActions {
  constructor() {
    this.utils = new Utils();
    this.civilCaseService = new CivilCaseService();
    this.docketingService = new DocketingService();
    this.docketingServiceActions = new DocketingServiceActions();
    this.docketingServiceElements = new DocketingServiceElements();
    this.tempFileName = "cypress\\temp\\docketing.json";
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

  createCivilCase() {
    this.civilCaseService.createCivilCase("scenario1", this.tempFileName);

    this.readRunTimeFile();
  }

  /**
   * Scenario: Access Docketing
   */
  clickOnDocketingFromCaseProcessing() {
    cy.login();

    this.docketingServiceActions.clickOnDocketingFromCaseProcessing();
  }

  selectSearchByCaseId() {
    this.docketingServiceActions.selectSearchByCaseId();
  }

  enterCaseIDInMyCaseIDSearch() {
    this.readRunTimeFile();

    cy.get("@case").then(($case) => {
      this.docketingServiceActions.enterCaseIDInMyCaseIDSearch($case.caseId);
    });
  }

  expandCaseRowInTable() {
    this.docketingServiceActions.expandCaseRowInTable();
  }

  caseIDRadioButtonIsSelected() {
    this.docketingServiceActions.caseIDRadioButtonIsSelected();
  }

  caseAppearsInResults() {
    this.docketingServiceActions.caseAppearsInResults();
  }

  attorneyIsValidated() {
    let attorneyMoBar = jsonHandler.getValue("scenario1", "attorneyMoBar");

    this.docketingServiceActions.attoryIsValidated(attorneyMoBar);
  }

  expandAddDocketEntrySection() {
    this.docketingServiceActions.expandAddDocketEntrySection();
  }

  enterDocketDescription() {
    let docketDescription = jsonHandler.getValue(
      "scenario1",
      "docketDescription"
    );

    this.docketingServiceActions.enterDocketDescription(docketDescription);
  }

  enterDocketDate() {
    this.docketingServiceActions.enterDocketDate();
  }

  docketDateEntered() {
    this.docketingServiceActions.docketDateEntered();
  }

  enterTime() {
    this.docketingServiceActions.enterTime();
  }

  selectFilingParty() {
    let filingParty = jsonHandler.getValue("scenario1", "filingParty");

    this.docketingServiceActions.selectFilingParty(filingParty);
  }

  filingPartyEntered() {
    let filingParty = jsonHandler.getValue("scenario1", "filingParty");

    this.docketingServiceActions.filingPartyEntered(filingParty);
  }

  selectFiledOnBehalfOf() {
    let filingOBOParty = jsonHandler.getValue("scenario1", "filingOBOParty");

    this.docketingServiceActions.selectFiledOnBehalfOf(filingOBOParty);
  }

  fOBOEntered() {
    let filingOBOParty = jsonHandler.getValue("scenario1", "filingOBOParty");

    this.docketingServiceActions.fOBOEntered(filingOBOParty);
  }

  enterDocketTextInSearchDocketPreDefinedTextField() {
    let addDocketText = jsonHandler.getValue("scenario1", "addDocketText");

    this.docketingServiceActions.enterDocketTextInSearchDocketPreDefinedTextField(
      addDocketText
    );
  }

  docketTextEntered() {
    let addDocketText = jsonHandler.getValue("scenario1", "addDocketText");

    this.docketingServiceActions.docketTextEntered(addDocketText);
  }

  pressSaveDocketButton() {
    this.docketingServiceActions.pressSaveDocketButton();
  }

  selectSaveDocketOption() {
    this.docketingServiceActions.selectSaveDocketOption();
  }

  expandViewUpdateDocketEntriesSection() {
    this.docketingServiceActions.expandViewUpdateDocketEntriesSection();
  }

  expandDocketEntry() {
    this.docketingServiceActions.expandDocketEntry();
  }

  updateDocketText() {
    let updateDocketText = jsonHandler.getValue(
      "scenario1",
      "updateDocketText"
    );

    this.docketingServiceActions.updateDocketText(updateDocketText);
  }

  pressUpdateDocketEntryButton() {
    this.docketingServiceActions.pressUpdateDocketEntryButton();
  }

  pressTrashCashButton() {
    this.docketingServiceActions.pressTrashCashButton();
  }

  enterReasonDescription() {
    let reasonDescription = jsonHandler.getValue(
      "scenario1",
      "reasonDescription"
    );

    this.docketingServiceActions.enterReasonDescription(reasonDescription);
  }

  closeDocketing() {
    this.docketingServiceElements.getCloseIcon().click();
  }
}
