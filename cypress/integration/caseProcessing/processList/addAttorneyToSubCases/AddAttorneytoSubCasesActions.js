/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import AddAttorneytoSubCasesElements from "./AddAttorneytoSubCasesElements";
import CriminalCaseService from "../../../pom/caseProcessing/criminal/CriminalCaseService";
import SubsequentCasesService from "../../../pom/caseProcessing/subsequentCases/subsequentCasesService";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class AddAttorneytoSubCasesActions {
  constructor() {
    this.utils = new Utils();
    this.tempDefendent1FileName =
      "cypress\\temp\\addAttorneySubCaseDefendant1.json";
    this.tempDefendent2FileName =
      "cypress\\temp\\addAttorneySubCaseDefendant2.json";
    this.addAttorneytoSubCasesElements = new AddAttorneytoSubCasesElements();
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
   * Scenario: User should be to add an attorney on subcases
   */
  createTwoDisposedCriminalCases() {
    const defendant1 = this.utils.getRandomDefendantData();
    const defendant2 = this.utils.getRandomDefendantData();
    const SKIPDISPOSE = false;
    const SKIPSENTENCE = true;
    this.criminalCaseService.createGenericCase(
      this.scenario,
      defendant1,
      this.tempDefendent1FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
    this.criminalCaseService.createGenericCase(
      this.scenario,
      defendant2,
      this.tempDefendent2FileName,
      SKIPDISPOSE,
      SKIPSENTENCE
    );
    cy.logout();
  }

  createSubcases() {
    this.createTwoDisposedCriminalCases();
    new SubsequentCasesService(
      this.tempDefendent1FileName
    ).createSubsequentCase(this.scenario);
    new SubsequentCasesService(
      this.tempDefendent2FileName
    ).createSubsequentCase(this.scenario);
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
      const arrayOfCaseIds = [$def1.subCaseId, $def2.subCaseId];
      let i;
      for (i = 0; i < arrayOfCaseIds.length; i++) {
        this.addAttorneytoSubCasesElements
          .enterCaseId()
          .eq(i)
          .type(`${arrayOfCaseIds[i]}{enter}`)
          .then(() => cy.wait(1000));
      }
      this.addAttorneytoSubCasesElements.enterCaseId().eq(i).type(" ");
    });
  }

  caseIdShouldDisplayInTheField() {
    // no op
  }

  selectAddAttorneyFromTheProcessNowDropDownButton() {
    const processName = "Add Attorney";
    this.addAttorneytoSubCasesElements.inputCasesProcessNowButton().click();
    this.addAttorneytoSubCasesElements
      .selectAProcessDropdownSearchBoxInput()
      .type(`${processName}{enter}`);
  }

  addAttorney() {
    this.addAttorneytoSubCasesElements
      .selectAllCheckBox()
      .click()
      .then(() => {
        cy.intercept("smc-web/getPartyTypesByCaseTypes*").as(
          "getPartyTypesByCaseTypes"
        );
        cy.intercept("smc-web/lProcManageParties*").as("lProcManageParties");

        this.addAttorneytoSubCasesElements
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
    this.addAttorneytoSubCasesElements
      .addAttorneyPartyDescription()
      .click()
      .then(() => {
        this.addAttorneytoSubCasesElements
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
    this.addAttorneytoSubCasesElements
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
    this.addAttorneytoSubCasesElements
      .addAttorneyAttorneySearchInput()
      .type(`${attorneyForDefendant}`);

    cy.wait(["@getAttorneyMobarDetails"]);
    this.addAttorneytoSubCasesElements
      .addAttorneyAttorneySearchInput()
      .realPress("Enter");
  }

  theNameOfTheAttorneyAndThePIDMShouldBeDisplaying() {
    const attorneyForDefendant = jsonHandler.getValue(
      "defaults",
      "attorneyForDefendantName"
    );
    this.addAttorneytoSubCasesElements
      .addAttorneyAttorneySearchInput()
      .invoke("prop", "value")
      .should("contain", attorneyForDefendant);
  }

  backdateTheStartDateInTheStartField() {
    const pastDate = this.utils.getValidPastDateStartingFromNow(3);
    cy.log(pastDate);
    this.addAttorneytoSubCasesElements
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
    this.addAttorneytoSubCasesElements
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
    this.addAttorneytoSubCasesElements.closeTabIcon().click();
  }

  theWindowShouldClose() {
    //no op
  }

  clickOnXInTheTab() {
    this.addAttorneytoSubCasesElements.closeTabIcon().click();
    this.addAttorneytoSubCasesElements.saveTheListPopUpYesButton().click();
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
    this.addAttorneytoSubCasesElements
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
      this.addAttorneytoSubCasesElements
        .manageCasePartiesMyPartiesSearchInput()
        .type($def.subCaseId)
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
    this.addAttorneytoSubCasesElements.casePartiesSubCaseToggle().click();
  }

  expandCasePartiesSectionAndValidateThePartyName() {
    this.addAttorneytoSubCasesElements
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
    this.addAttorneytoSubCasesElements
      .casePartiesTable()
      .find("tbody")
      .find("td")
      .contains(partyDescription)
      .should("exist");
    this.addAttorneytoSubCasesElements
      .casePartiesTable()
      .find("tbody")
      .find("td")
      .contains(attorneyForDefendantName)
      .should("exist");
  }

  enterSecondCaseIdIntoMyPartiesSearchAndPressEnter() {
    this.addAttorneytoSubCasesElements
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
      this.addAttorneytoSubCasesElements
        .manageCasePartiesMyPartiesSearchInput()
        .type($def.subCaseId)
        .realPress("Enter");

      cy.wait([
        "@getCasesOnPartyByCaseIdVC",
        "@getTableSorterPagerHTML",
        "@saveUserNotyMessages",
      ]);
    });
  }

  closeOpenTab() {
    this.addAttorneytoSubCasesElements.closeTabIcon().click();
  }
}
