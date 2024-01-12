/// <reference types="cypress" />

import Utils from "../../utils/utils";
import CaseNetEFilingElements from "./CaseNetEFilingElements";
import jsonHandler from "../../../fixtures/jsonHandler";

import EFilingService from "../../pom/eFiling/EFilingService";

export default class CaseNetEFilingActions {
  constructor() {
    this.utils = new Utils();
    this.petitioner = this.utils.getRandomDefendantData();
    this.respondent = this.utils.getRandomDefendantData();
    this.tempFileName = "cypress\\temp\\caseNetEfiling.json";
    this.caseNetEFilingElements = new CaseNetEFilingElements();
    this.efService = new EFilingService(
      this.tempFileName,
      this.petitioner,
      this.respondent
    );
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
   * Scenario: Create case using Efiling
   */
  useEfilingToCreateCase() {
    this.efService.createEFiling();
  }
  /**
   * Scenario: User logs in successfully
   */
  useTheCaseFromPreviousScenario() {
    this.readRunTimeFile();
  }

  navigateToCaseNetAndLogin() {
    cy.loginToCaseNet();
  }

  userIsLoggedIn() {
    //no op
  }

  selectOptionToSearchByCaseNumber() {
    throw new Error("missing implementation");
  }

  caseNumberSearchFormAppears() {
    throw new Error("missing implementation");
  }

  selectLocationForSearch() {
    throw new Error("missing implementation");
  }

  enterCaseNumberInSearchInput() {
    throw new Error("missing implementation");
  }

  clickTheFindButton() {
    throw new Error("missing implementation");
  }

  caseHeaderAppears() {
    throw new Error("missing implementation");
  }

  validateJudgeCommissionerAssigned() {
    throw new Error("missing implementation");
  }

  validateDateFiled() {
    throw new Error("missing implementation");
  }

  validateLocation() {
    throw new Error("missing implementation");
  }

  validateCaseType() {
    throw new Error("missing implementation");
  }

  validateDisposition() {
    throw new Error("missing implementation");
  }

  validateFinancialInformation() {
    throw new Error("missing implementation");
  }

  validateTrackThisCase() {
    throw new Error("missing implementation");
  }

  validateVirtualHearingRoom() {
    throw new Error("missing implementation");
  }

  clickFinancialInformationButton() {
    throw new Error("missing implementation");
  }

  financialCaseSummaryAppears() {
    throw new Error("missing implementation");
  }

  clickTrackThisCase() {
    throw new Error("missing implementation");
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
