/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import currentFunction from "current-function";
import jsonHandler from "../../../../fixtures/jsonHandler";
import ManageCaseDetailsActions from "./ManageCaseDetailsActions";

export default class ManageCaseDetailsService {
  constructor() {
    this.utils = new Utils();
    this.manageCaseDetailsActions = new ManageCaseDetailsActions();
  }

  addArrestRecordToaCaseAndClose(caseId, defLastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    const arrestReport = jsonHandler.getValue("defaults", "arrestReport");
    const arrestingAgency = jsonHandler.getValue("defaults", "arrestingAgency");

    this.searchForCaseId(caseId);
    this.addArrestRecord(defLastName, arrestReport, arrestingAgency);
    this.manageCaseDetailsActions.closeManageCaseDetailsTab();
    cy.logout();
  }

  searchForCaseId(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsActions.clickOnManageCaseDetails();
    this.manageCaseDetailsActions.clickOnCaseIdRadioButton();
    this.manageCaseDetailsActions.searchForCaseId(caseId);
  }

  addArrestRecord(defLastName, arrestReport, arrestingAgency) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.manageCaseDetailsActions.clickOnArrestInformationTab();
    this.manageCaseDetailsActions.casePartiesDisplayInCasePartyField(
      defLastName
    );
    this.manageCaseDetailsActions.clickAddArrestRecordButton();
    this.manageCaseDetailsActions.popUpWindowDisplays();
    this.manageCaseDetailsActions.enterArrestReport(arrestReport);
    this.manageCaseDetailsActions.enterArrestDate();
    this.manageCaseDetailsActions.enterArrestingAgency(arrestingAgency);
    this.manageCaseDetailsActions.clickSaveArrestRecord();
    this.manageCaseDetailsActions.arrestRecordDisplaysInArrestInformationTab(
      arrestReport
    );
  }
}
