/// <reference types="cypress" />

import Utils from "../../utils/utils";
import CaseNetHPElements from "./CaseNetHPElements";
import jsonHandler from "../../../fixtures/jsonHandler";
import CivilCaseService from "../../pom/caseProcessing/civil/CivilCaseService";

export default class CaseNetHPActions {
  constructor() {
    this.utils = new Utils();
    this.elements = new CaseNetHPElements();
    this.civilCaseService = new CivilCaseService();
    this.tempFileName = "cypress\\temp\\caseNetHPActions.json";
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
   * Scenario: Create civil case
   */
  createACivilCase() {
    this.civilCaseService.createCivilCase("scenario1", this.tempFileName);

    this.readRunTimeFile();

    this.scenario = "scenario1";

    for (let party = 0; party < 2; party++) {
      this.civilCaseService.addTheParty("scenario1", party, this.tempFileName);
    }
  }

  /**
   * Scenario: User logs in successfully
   */
  useTheCivilCaseFromPreviousScenario() {
    this.readRunTimeFile();
  }

  navigateToCaseNetAndLogin() {
    cy.loginToCaseNet();
  }

  userIsLoggedIn() {
    this.elements.collapseIcon().click();
    let obj = Cypress.env("caseNet");
    let user = obj.username.toUpperCase();
    this.elements.dropDownUserIdText().contains(user).should("be.visible");
    this.elements.dropDownHomeIcon().click();
  }

  selectOptionToSearchByCaseNumber() {
    this.elements.caseNumberSearchLink().click();
  }

  caseNumberSearchFormAppears() {
    //no op
  }

  selectLocationForSearch() {
    let courtValue = jsonHandler.getValue("scenario1", "courtValue");
    this.elements.caseNumberSearchCourtLocationButton().select(courtValue);
  }

  enterCaseNumberInSearchInput() {
    cy.get("@case").then(($case) => {
      this.elements.caseNumberSearchCaseNumberInput().type($case.caseId);
    });
  }

  clickTheFindButton() {
    cy.intercept("cnet/caseNoSearch*").as("caseNoSearch");
    cy.intercept("GET", "cnet/cases/newHeaderData*").as("newHeaderData");

    this.elements.caseNumberSearchFindButton().click();

    cy.wait(["@caseNoSearch", "@newHeaderData"]);
  }

  caseHeaderAppears() {
    this.elements.caseHeaderTitleText().then(($ele) => {
      cy.get("@case").then(($case) => {
        let caseId = $case.caseId;

        let textContent = $ele[0].textContent;

        expect(
          textContent.includes(caseId),
          `Expected ${caseId} but found ${textContent}`
        ).to.be.true;
      });
    });
  }

  enterDateInStartDateSearch() {
    throw new Error("missing implementation");
  }

  setCaseStatusToAll() {
    throw new Error("missing implementation");
  }

  filingDateSearchCaseListAppears() {
    throw new Error("missing implementation");
  }

  validateJudgeCommissionerAssigned() {
    let judgeName = jsonHandler.getValue("scenario1", "judgeName");
    this.elements.validateJudgeCommissionersAssignedText().then(($ele) => {
      let judges = judgeName.split(" ");
      for (let x = 0; x < judges.length; x++) {
        expect(
          $ele[0].textContent.includes(judges[x]),
          `Expected ${judges[x]} but found ${$ele[0].textContent}`
        ).to.be.true;
      }
    });
  }

  validateDateFiled() {
    cy.get("@case").then(($case) => {
      this.elements.validatDateFileText().then(($ele) => {
        expect(
          $ele[0].textContent === $case.date,
          `Expected ${$case.date} but found ${$ele[0].textContent}`
        ).to.be.true;
      });
    });
  }

  validateLocation() {
    let court = jsonHandler.getValue("scenario1", "court");
    this.elements.validateLocationText().then(($ele) => {
      expect(
        $ele[0].textContent === court,
        `Expected ${court} but found ${$ele[0].textContent}`
      ).to.be.true;
    });
  }

  validateCaseType() {
    let caseTypeDescription = jsonHandler.getValue(
      "scenario1",
      "caseTypeDescription"
    );
    this.elements.validateCaseTypeText().then(($ele) => {
      expect(
        $ele[0].textContent === caseTypeDescription,
        `Expected ${caseTypeDescription} but found ${$ele[0].textContent}`
      ).to.be.true;
    });
  }

  validateDisposition() {
    let disposition = jsonHandler.getValue("scenario1", "disposition");
    this.elements.validateDispositionText().then(($ele) => {
      expect(
        $ele[0].textContent === disposition,
        `Expected ${disposition} but found ${$ele[0].textContent}`
      ).to.be.true;
    });
  }

  validateFinancialInformation() {
    this.elements.financialInformationButton().should("be.visible");
  }

  validateTrackThisCase() {
    this.elements.validateButtonByNumber(1).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === "Track This Case",
        `Expected "Track This Case" but found ${$ele[0].textContent.trim()}`
      ).to.be.true;
    });
  }

  validateVirtualHearingRoom() {
    this.elements.validateButtonByNumber(2).then(($ele) => {
      expect(
        $ele[0].textContent.trim() === "Virtual Hearing Room",
        `Expected "Virtual Hearing Room" but found ${$ele[0].textContent.trim()}`
      ).to.be.true;
    });
  }

  clickFinancialInformationButton() {
    this.elements.financialInformationButton().click();
  }

  financialCaseSummaryAppears() {
    let financialBalance = jsonHandler.getValue(
      "scenario1",
      "financialBalance"
    );

    this.elements
      .financialInformationPopover()
      .contains(financialBalance)
      .should("be.visible");
  }

  clickTrackThisCase() {
    this.elements.validateButtonByNumber(1).click();
  }

  newTabOpens() {
    throw new Error("missing implementation");
  }

  clickVirtualHearingRoom() {
    throw new Error("missing implementation");
  }

  redictsToVirtualHearingRoomLandingPage() {
    throw new Error("missing implementation");
  }
}
