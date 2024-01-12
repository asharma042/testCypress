/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import AddAttorneytoChangeofVenueCaseElements from "./AddAttorneytoChangeofVenueCaseElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class AddAttorneytoChangeofVenueCaseActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\addAttorneyChangeOfVenueDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\addAttorneyChangeOfVenueDefendant2.json";
    this.addAttorneytoChangeofVenueCaseElements =
      new AddAttorneytoChangeofVenueCaseElements();
    this.criminalCaseService = new CriminalCaseService();
    this.scenario = "scenario1";
  }

  readRunTimeFile() {
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
   * Scenario: user should be able to add attorney to DCOV cases
   */
  createACrimainalCaseAndAddChangeOfVenueStatus(defendantFileName) {
    const defendant = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = true;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      this.scenario,
      defendant,
      defendantFileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );

    const chargeDisposition = jsonHandler.getValue(
      this.scenario,
      "chargeDispostion"
    );
    this.criminalCaseService.changeCriminalCaseStatusToSpecificChargeDispostion(
      chargeDisposition
    );
    cy.logout();
  }

  createTwoCriminalCasesWithChangeOfVenueStatus() {
    this.createACrimainalCaseAndAddChangeOfVenueStatus(
      this.tempDefendent1FileName
    );
    this.createACrimainalCaseAndAddChangeOfVenueStatus(
      this.tempDefendent2FileName
    );
  }

  openSMC() {
    // no op
  }

  theApplicationLaunches() {
    // no op
  }

  clickOnCaseProcessingTab() {
    this.readRunTimeFile();
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
        this.addAttorneytoChangeofVenueCaseElements
          .enterCaseId()
          .eq(i)
          .type(`${arrayOfCaseIds[i]}{enter}`)
          .then(() => cy.wait(1000));
      }
      this.addAttorneytoChangeofVenueCaseElements.enterCaseId().eq(i).type(" ");
    });
  }

  caseIdShouldDisplayInTheField() {
    // no op
  }

  selectAddAttorneyFromTheProcessNowDropDownButton() {
    const processName = "Add Attorney";
    this.addAttorneytoChangeofVenueCaseElements
      .inputCasesProcessNowButton()
      .click();
    this.addAttorneytoChangeofVenueCaseElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }

  addAttorney() {
    this.addAttorneytoChangeofVenueCaseElements
      .selectAllCheckBox()
      .click()
      .then(() => {
        cy.intercept("smc-web/getPartyTypesByCaseTypes*").as(
          "getPartyTypesByCaseTypes"
        );
        cy.intercept("smc-web/lProcManageParties*").as("lProcManageParties");

        this.addAttorneytoChangeofVenueCaseElements
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
    this.addAttorneytoChangeofVenueCaseElements
      .addAttorneyPartyDescription()
      .click()
      .then(() => {
        this.addAttorneytoChangeofVenueCaseElements
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
    this.addAttorneytoChangeofVenueCaseElements
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
    this.addAttorneytoChangeofVenueCaseElements
      .addAttorneyAttorneySearchInput()
      .type(`${attorneyForDefendant}`);

    cy.wait(["@getAttorneyMobarDetails"]);
    this.addAttorneytoChangeofVenueCaseElements
      .addAttorneyAttorneySearchInput()
      .realPress("Enter");
  }

  theNameOfTheAttorneyAndThePIDMShouldBeDisplaying() {
    const attorneyForDefendant = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    this.addAttorneytoChangeofVenueCaseElements
      .addAttorneyAttorneySearchInput()
      .invoke("prop", "value")
      .should("contain", attorneyForDefendant);
  }

  backdateTheStartDateInTheStartField() {
    const pastDate = this.utils.getValidPastDateStartingFromNow(3);
    cy.log(pastDate);
    this.addAttorneytoChangeofVenueCaseElements
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
    this.addAttorneytoChangeofVenueCaseElements
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
    this.addAttorneytoChangeofVenueCaseElements.closeTabIcon().click();
  }

  theWindowShouldClose() {
    //no op
  }

  clickOnXInTheTab() {
    this.addAttorneytoChangeofVenueCaseElements.closeTabIcon().click();
    this.addAttorneytoChangeofVenueCaseElements
      .saveTheListPopUpYesButton()
      .click();
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
    this.addAttorneytoChangeofVenueCaseElements
      .maintainCasePartiesCaseIdRadioButton()
      .click();
    cy.get("@defendant1").then(($def) => {
      cy.intercept("smc-web/getCasesOnPartyByCaseIdVC*").as(
        "getCasesOnPartyByCaseIdVC"
      );
      cy.intercept("smc-web/getTableSorterPagerHTML*").as(
        "getTableSorterPagerHTML"
      );
      cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
      this.addAttorneytoChangeofVenueCaseElements
        .manageCasePartiesMyPartiesSearchInput()
        .type($def.caseId)
        .realPress("Enter");

      cy.wait([
        "@getCasesOnPartyByCaseIdVC",
        "@getTableSorterPagerHTML",
        "@saveUserNotyMessages",
      ]);
    });
  }

  tableSorterLoads() {
    // no op
  }

  expandSubCase() {
    // no op
  }

  expandCasePartiesSectionAndValidateThePartyName() {
    this.addAttorneytoChangeofVenueCaseElements
      .casePartiesExpandCollapseChevron()
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
    this.addAttorneytoChangeofVenueCaseElements
      .casePartiesTable()
      .find("tbody")
      .find("td")
      .contains(partyDescription)
      .should("exist");
    this.addAttorneytoChangeofVenueCaseElements
      .casePartiesTable()
      .find("tbody")
      .find("td")
      .contains(attorneyForDefendantName)
      .should("exist");
  }

  enterSecondCaseIdIntoMyPartiesSearchAndPressEnter() {
    this.addAttorneytoChangeofVenueCaseElements
      .manageCasePartiesMyPartiesSearchInput()
      .clear();
    cy.get("@defendant2").then(($def) => {
      cy.intercept("smc-web/getCasesOnPartyByCaseIdVC*").as(
        "getCasesOnPartyByCaseIdVC"
      );
      cy.intercept("smc-web/getTableSorterPagerHTML*").as(
        "getTableSorterPagerHTML"
      );
      cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");
      this.addAttorneytoChangeofVenueCaseElements
        .manageCasePartiesMyPartiesSearchInput()
        .type($def.caseId)
        .realPress("Enter");

      cy.wait([
        "@getCasesOnPartyByCaseIdVC",
        "@getTableSorterPagerHTML",
        "@saveUserNotyMessages",
      ]);
    });
  }

  closeOpenTab() {
    this.addAttorneytoChangeofVenueCaseElements.closeTabIcon().click();
  }
}
