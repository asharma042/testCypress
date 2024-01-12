/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import currentFunction from "current-function";
import SubsequentCasesActions from "./subsequentCasesActions";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class SubsequentCasesService {
  constructor(tempFileName) {
    if (!tempFileName) {
      throw new Error("TempFileName is required");
    }
    this.defendantFileName = tempFileName;
    this.subsequentCasesActions = new SubsequentCasesActions(
      this.defendantFileName
    );
    this.utils = new Utils();
  }

  readRunTimeFile() {
    cy.wrap({}).as("defendant");
    this.utils.readRunTimeFile(this.defendantFileName, function ($json) {
      if ($json) {
        cy.wrap($json.defendant).as("defendant");
      }
    });
  }

  createSubsequentCase(scenario) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.readRunTimeFile();
    const caseType = jsonHandler.getValue(scenario, "caseType");
    this.subsequentCasesActions.navigateToSubsequentCasesFromCaseProcessing();
    cy.get("@defendant").then(($def) => {
      this.subsequentCasesActions.enterCaseIdIntoMySubsequentCaseSearch(
        $def.caseId
      );
      this.subsequentCasesActions.enterCaseTypeUnderMySubsequentCaseInformationSection(
        caseType
      );
      this.subsequentCasesActions.clickCreateSubCase((subCaseId) => {
        $def.subCaseId = subCaseId;
        cy.writeFile(this.defendantFileName, {
          defendant: $def,
        });
      });
    });
    this.subsequentCasesActions.closeCurrentTab();
    cy.logout();
  }
}
