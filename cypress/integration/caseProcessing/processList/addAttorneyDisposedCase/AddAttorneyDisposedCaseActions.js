/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import AddAttorneyDisposedCaseElements from "./AddAttorneyDisposedCaseElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class AddAttorneyDisposedCaseActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\addAttorneyDisposedCaseDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\addAttorneyDisposedCaseDefendant2.json";
    this.addAttorneyDisposedCaseElements =
      new AddAttorneyDisposedCaseElements();
    this.criminalCaseService = new CriminalCaseService();
  }

  readRunTimFile() {
    cy.wrap({}).as("defendant1");
    this.utils.readRunTimeFile(this.tempDefendent1FileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant1");
      }
    });
    cy.wrap({}).as("defendant2");
    this.utils.readRunTimeFile(this.tempDefendent2FileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant2");
      }
    });
  }
  /**
   * Scenario: User should be to add an attorney on disposed cases
   */
  createOrMoreDisposedCases() {
    const defendant1 = this.utils.getRandomDefendantData();
    const defendant2 = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = false;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      "scenario1",
      defendant1,
      this.tempDefendent1FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
    this.criminalCaseService.createGenericCase(
      "scenario1",
      defendant2,
      this.tempDefendent2FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
  }

  clickOnCaseProcessingTab() {
    this.readRunTimFile();
    cy.login();
    cy.clickLink("Case Processing");
  }

  theBusinessProcessUnit() {
    // no op
  }

  clickOnProcessList() {
    cy.clickMenu("Process List");
  }

  theSubmenuItems() {
    // no op
  }

  selectInputCase() {
    cy.clickMenu("Input Cases");
  }

  inputCaseTabOpens() {
    // no op
  }

  enterCaseIdIntoTheEnterCaseIdFieldAndPressEnter() {
    cy.getMany(["@defendant1", "@defendant2"]).then(([$def1, $def2]) => {
      const arrayOfCaseIds = [$def1.caseId, $def2.caseId];
      let i;
      for (i = 0; i < arrayOfCaseIds.length; i++) {
        this.addAttorneyDisposedCaseElements
          .enterCaseId()
          .eq(i)
          .type(`${arrayOfCaseIds[i]}{enter}`)
          .then(() => cy.wait(1000));
      }
      this.addAttorneyDisposedCaseElements.enterCaseId().eq(i).type(" ");
    });
  }

  caseIdShouldDisplayInTheField() {
    // no op
  }

  selectAddAttorneyFromTheProcessNowDropDownButton() {
    const processName = "Add Attorney";
    this.addAttorneyDisposedCaseElements.inputCasesProcessNowButton().click();
    this.addAttorneyDisposedCaseElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }

  addAttorneyShouldBeHighlighted() {
    this.addAttorneyDisposedCaseElements
      .selectAllCheckBox()
      .click()
      .then(() => {
        cy.intercept("smc-web/getPartyTypesByCaseTypes*").as(
          "getPartyTypesByCaseTypes"
        );
        cy.intercept("smc-web/lProcManageParties*").as("lProcManageParties");

        this.addAttorneyDisposedCaseElements
          .enterAttorneyInformationButton()
          .click();

        cy.wait(["@getPartyTypesByCaseTypes", "@lProcManageParties"]);
      });
  }

  changePartyDescriptionFieldToAPA() {
    const partyDescription = jsonHandler.getValue(
      "defaults",
      "partyDescription"
    );
    this.addAttorneyDisposedCaseElements
      .addAttorneyPartyDescription()
      .click()
      .then(() => {
        this.addAttorneyDisposedCaseElements
          .addAttorneyPartyDescriptionSearchBoxInput()
          .type(`${partyDescription}`)
          .realPress("Enter");
      });
  }

  aPAShouldBeDisplayed() {
    const partyDescription = jsonHandler.getValue(
      "defaults",
      "partyDescription"
    );
    this.addAttorneyDisposedCaseElements
      .addAttorneyPartyDescription()
      .invoke("prop", "title")
      .should("eq", partyDescription);
  }

  enterAttorneyPIDMIntoTheAttorneySearch() {
    const attorneyForDefendant = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    cy.intercept("smc-web/getAttorneyMobarDetails*").as(
      "getAttorneyMobarDetails"
    );
    this.addAttorneyDisposedCaseElements
      .addAttorneyAttorneySearchInput()
      .type(`${attorneyForDefendant}`);

    cy.wait(["@getAttorneyMobarDetails"]);
    this.addAttorneyDisposedCaseElements
      .addAttorneyAttorneySearchInput()
      .realPress("Enter");
  }

  theNameOfTheAttorneyAndThePIDMShouldBeDisplaying() {
    const attorneyForDefendant = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    this.addAttorneyDisposedCaseElements
      .addAttorneyAttorneySearchInput()
      .invoke("prop", "value")
      .should("contain", attorneyForDefendant);
  }

  backdateTheStartDateInTheStartField() {
    const pastDate = this.utils.getValidPastDateStartingFromNow(3);
    cy.log(pastDate);
    this.addAttorneyDisposedCaseElements
      .addAttorneyStartDate()
      .clear()
      .type(`${pastDate}`);
  }

  theStartDateShouldBeBackdated() {
    // no op
  }

  clickOnSaveApplyToAll() {
    cy.intercept("smc-web/lProcValidateAddParty*").as("lProcValidateAddParty");
    cy.intercept("smc-web/processList/savePartiesOnMultipleCases*").as(
      "savePartiesOnMultipleCases"
    );
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
    this.addAttorneyDisposedCaseElements
      .addAttorneySaveAndApplyToAllButton()
      .click();
    cy.wait([
      "@lProcValidateAddParty",
      "@savePartiesOnMultipleCases",
      "@saveUserNotyMessages",
    ]);
  }

  aGreenConfirmationNotyShouldAppearMentioningTheCaseIdAndThe() {
    this.utils.clearNotyMessages();
  }

  verifyIfTheAddJudicialOfficerDialogueWindowCloses() {
    this.addAttorneyDisposedCaseElements.closeTabIcon().click();
  }

  theWindowShouldClose() {
    //no op
  }

  clickOnXInTheTab() {
    this.addAttorneyDisposedCaseElements.closeTabIcon().click();
    this.addAttorneyDisposedCaseElements.saveTheListPopUpYesButton().click();
  }

  theProcessCloses() {
    // no op
  }
  /**
   * Scenario: Validate Attoreny is added the case
   */
  accessSMC() {
    // no op
  }

  sMCAppShouldLoad() {
    // no op
  }

  theLeftNavigationMenuBarLoads() {
    // no op
  }

  clickOnPartiesMainMenuOption() {
    cy.clickMenu("Parties");
  }

  selectMaintainCasePartiesFromSubMenu() {
    cy.clickMenu("Maintain Case Parties");
  }

  enterCaseIDIntoMyPartiesSearchAndPressEnter() {
    this.addAttorneyDisposedCaseElements
      .maintainCasePartiesCaseIdRadioButton()
      .click();
    cy.get("@defendant1").then(($def) => {
      cy.intercept("smc-web/getCasesOnPartyByCaseIdVC*").as(
        "getCasesOnPartyByCaseIdVC"
      );
      cy.intercept("smc-web/getTableSorterPagerHTML*").as(
        "getTableSorterPagerHTML"
      );
      cy.intercept("smc-web/getAddPartyCaseContentVC*").as(
        "getAddPartyCaseContentVC"
      );
      cy.intercept("smc-web/getPartiesOnCaseVC*").as("getPartiesOnCaseVC");
      cy.intercept("smc-web/getTableSorterPagerHTML*").as(
        "getTableSorterPagerHTML"
      );
      cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
      this.addAttorneyDisposedCaseElements
        .manageCasePartiesMyPartiesSearchInput()
        .type($def.caseId)
        .realPress("Enter");

      cy.wait([
        "@getCasesOnPartyByCaseIdVC",
        "@getTableSorterPagerHTML",
        "@getAddPartyCaseContentVC",
        "@getPartiesOnCaseVC",
        "@getTableSorterPagerHTML",
        "@saveUserNotyMessages",
      ]);
    });
  }

  tableSorterLoads() {
    // no op
  }

  expandCasePartiesSectionAndValidateThePartyName() {
    this.addAttorneyDisposedCaseElements
      .manageCasePartiesCasePartiesHeader()
      .click();
  }

  partyNameAndDescriptionMustMatchToThePreviouslyAdded() {
    const partyDescription = jsonHandler.getValue(
      "defaults",
      "partyDescription"
    );
    const attorneyForDefendantName = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    this.addAttorneyDisposedCaseElements
      .casePartiesTable()
      .find("tbody")
      .find("td")
      .contains(partyDescription)
      .should("exist");
    this.addAttorneyDisposedCaseElements
      .casePartiesTable()
      .find("tbody")
      .find("td")
      .contains(attorneyForDefendantName)
      .should("exist");
  }

  closeOpenTab() {
    this.addAttorneyDisposedCaseElements.closeTabIcon().click();
  }
}
