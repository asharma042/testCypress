/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import jsonHandler from "../../../../fixtures/jsonHandler";
import COASITEentrythroughdocketingElements from "./COASITEentrythroughdocketingElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import DocketingService from "../../../pom/caseProcessing/docketing/DocketingService";
import DocketingServiceActions from "../../../pom/caseProcessing/docketing/DocketingServiceActions";

export default class COASITEentrythroughdocketingActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendentFileName =
      "cypress\\temp\\coasiteEntryThroughDocketingDefendent.json";
    this.coasiteEntryElements = new COASITEentrythroughdocketingElements();
    this.criminalCaseService = new CriminalCaseService();
    this.docketingService = new DocketingService();
    this.docketingServiceActions = new DocketingServiceActions();
  }

  readRunTimeFile() {
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.tempDefendentFileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }
  /**
   * Scenario: Enter COASITE entry
   */
  criminalCaseIsCreatedCaseHasADefendantCaseIsNotDisposed() {
    const defendant = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      "scenario1",
      defendant,
      this.tempDefendentFileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
  }

  enterCaseInMyDocketingSearch() {
    this.readRunTimeFile();
    cy.login();
    this.docketingServiceActions.clickOnDocketingFromCaseProcessing();
    this.docketingServiceActions.selectSearchByCaseId();
  }

  clickTheMagnifyingGlassSearchButton() {
    cy.get("@defendant").then(($def) => {
      this.docketingServiceActions.enterCaseIDInMyCaseIDSearch($def.caseId);
    });
  }

  caseIsPulledUpInCasesSubsectionCaseIdCoulumnWillShowPreexistingCaseID() {
    this.docketingServiceActions.expandCaseRowInTable();
    this.docketingServiceActions.caseAppearsInResults();
  }

  clickTheAddDocketEntryTilte() {
    this.docketingServiceActions.expandAddDocketEntrySection();
  }

  addDocketEntrySectionExpands() {
    // no op
  }

  inTheAddDocketEntrySectionDocketDescriptionDropDownSelectADocketEntry() {
    let docketDescription = jsonHandler.getValue(
      "scenario1",
      "docketDescription"
    );
    this.docketingServiceActions.enterDocketDescription(docketDescription);
  }

  additionalDocketDataSectionExpandsWithFilmNumberAndFootageEntryTextBoxes() {
    this.coasiteEntryElements.additionalDocketEntryfilmNumber().should("exist");
    this.coasiteEntryElements.additionalDocketEntryFootage().should("exist");
  }

  inTheAddDocketEntrySectionDocketDescriptionAdditionalDocketDataFilmNumberTextBoxEnterTheFilmNumber() {
    let filmNumber = jsonHandler.getValue("scenario1", "filmNumber");
    this.coasiteEntryElements
      .additionalDocketEntryfilmNumber()
      .type(filmNumber);
  }

  filmNumberAndDocketTextBoxDisplaysTheEnteredValues() {
    let filmNumber = jsonHandler.getValue("scenario1", "filmNumber");
    let validationText = `Film Number - ${filmNumber};`;
    this.coasiteEntryElements
      .additionalDocketEntryfilmNumber()
      .invoke("prop", "value")
      .should("eq", filmNumber);
    this.coasiteEntryElements
      .addDocketEntryPredefinedTextArea()
      .invoke("prop", "value")
      .should("contain", validationText);
  }

  inTheAddDocketEntrySectionDocketDescriptionAdditionalDocketDataFootageTextBoxEnterTheFilmNumber() {
    let footage = jsonHandler.getValue("scenario1", "footage");
    this.coasiteEntryElements.additionalDocketEntryFootage().type(footage);
  }

  footageTextBoxAndDocketTextBoxDisplaysTheEnteredValues() {
    let filmNumber = jsonHandler.getValue("scenario1", "filmNumber");
    let footage = jsonHandler.getValue("scenario1", "footage");
    let validationText = `Film Number - ${filmNumber}; Footage - ${footage};`;
    this.coasiteEntryElements
      .additionalDocketEntryFootage()
      .invoke("prop", "value")
      .should("eq", footage);
    this.coasiteEntryElements
      .addDocketEntryPredefinedTextArea()
      .invoke("prop", "value")
      .should("contain", validationText);
  }

  clickSaveDocketButton() {
    this.docketingServiceActions.pressSaveDocketButton();
  }

  saveDocketDropDownListAppears() {
    // no op
  }

  selectSaveDockets() {
    this.docketingServiceActions.selectSaveDocketOption();
  }

  greenNotyAppearsAndIndicatesItWasSuccessfullySavedTheAddDocketEntrySectionResets() {
    this.utils.clearNotyMessages();
  }

  clickViewUpdateDocketEntries() {
    this.docketingServiceActions.expandViewUpdateDocketEntriesSection();
  }

  updateDocketEntriesSubSectionOpendListsTheExistingDocketsOnTheCase() {
    let docketDescription = jsonHandler.getValue(
      "scenario1",
      "docketDescription"
    );
    let footage = jsonHandler.getValue("scenario1", "footage");
    this.coasiteEntryElements
      .viewUpdateDocketEntriesTable()
      .find("tbody > tr")
      .find("td.docketDesc")
      .contains(docketDescription)
      .should("exist");
    this.coasiteEntryElements
      .viewUpdateDocketEntriesTable()
      .find("tbody > tr")
      .find("td.docketEntryText")
      .contains(footage)
      .should("exist");
  }

  clickTheSignNextToFFILMMicroFilmRecord() {
    let docketDescription = jsonHandler.getValue(
      "scenario1",
      "docketDescription"
    );
    cy.intercept("smc-web/getDocketingChangeRemove*").as(
      "getDocketingChangeRemove"
    );
    cy.intercept("smc-web/getFilingPartiesForDocketing*").as(
      "getFilingPartiesForDocketing"
    );
    cy.intercept("smc-web/myPredefinedTextSearch*").as(
      "myPredefinedTextSearch"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.coasiteEntryElements
      .viewUpdateDocketEntriesTable()
      .find("tbody > tr")
      .find("td.docketDesc")
      .contains(docketDescription)
      .click();
    cy.wait([
      "@getDocketingChangeRemove",
      "@getFilingPartiesForDocketing",
      "@myPredefinedTextSearch",
      "@saveUserNotyMessages",
    ]);
  }

  fFILMDocketOpensValidateTheTextForTheFollowingFieldsDocketTextFootageAndFilmNumber() {
    let filmNumber = jsonHandler.getValue("scenario1", "filmNumber");
    let footage = jsonHandler.getValue("scenario1", "footage");
    let validationText = `Film Number - ${filmNumber}; Footage - ${footage};`;
    this.coasiteEntryElements
      .viewUpdateDataEntriesFilmNumber()
      .invoke("prop", "value")
      .should("eq", filmNumber);
    this.coasiteEntryElements
      .viewUpdateDataEntriesFootage()
      .invoke("prop", "value")
      .should("eq", footage);
    this.coasiteEntryElements
      .addDocketEntryPredefinedTextArea()
      .invoke("prop", "value")
      .should("contain", validationText);
    this.coasiteEntryElements.getCloseIcon().click();
  }
}
