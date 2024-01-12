/// <reference types="cypress" />

import Utils from "../../../utils/utils";
import Common from "../../../common/Common";
import ChargeCodeCaseGeneratorElements from "./ChargeCodeCaseGeneratorElements";
import ManageAssessmentsService from "../../../pom/caseProcessing/financial/manageAssessments/ManageAssessmentsService";
export default class ChargeCodeCaseGeneratorActions {
  constructor() {
    this.utils = new Utils();
    this.common = new Common();

    this.chargeCodeCaseGeneratorElements =
      new ChargeCodeCaseGeneratorElements();

    this.csvFileName = "cypress\\temp\\chargeCodeResults.csv";
    this.tempFileName = "cypress\\temp\\chargeCodeGenerator.json";
    this.chargeCodes = "\\cypress\\temp\\chargecodes.xls";
  }

  readRunTimeFile() {
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(this.tempFileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("case");
      }
    });
  }

  processJsonFilesAndCreateCases(obj) {
    const skipSentence = globalThis.fixture.scenario1.fineAmount === "";
    const defendant = this.utils.getRandomDefendantData();
    const mas = new ManageAssessmentsService(this.tempFileName, defendant);
    mas.createGenericCase("scenario1", skipSentence);
    cy.logout();

    mas.continueWithCase("scenario1");
    cy.get(`.close-tab-btn`).click();

    this.readRunTimeFile();
    cy.get("@case").then(($case) => {
      obj.caseId = "";
      if ($case && $case.caseId) {
        obj.caseId = $case.caseId;
      }

      let line = Object.keys(obj)
        .map(function (k) {
          return `"${obj[k]}"`;
        })
        .join(",");
      line += "\n";
      this.common.appendToFile(this.csvFileName, line);
    });
  }
}
