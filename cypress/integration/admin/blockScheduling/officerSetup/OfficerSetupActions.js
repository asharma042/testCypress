/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import OfficerSetupElements from "./OfficerSetupElements";
import jsonHandler from "../../../../fixtures/jsonHandler";

export default class OfficerSetupActions {
  constructor() {
    this.utils = new Utils();
    this.officerSetupElements = new OfficerSetupElements();
    this.tempOfficerSetupFileName = "cypress\\temp\\officerSetup.json";

    this.officer = this.utils.getRandomOfficerData();
    this.updateOfficer = this.utils.getRandomOfficerData();
    this.checkData = null;
  }

  readRunTimeFile() {
    var that = this;
    this.utils.readRunTimeFile(this.tempOfficerSetupFileName, function ($json) {
      if ($json) {
        that.officer = $json.officer;
        cy.wrap($json.officer).as("officer");
      }
    });
  }

  clickOnAdmin() {
    cy.login();
    cy.clickLink("Admin");
  }

  clickOnBlockSchedulingFromTheBusinessProcessMenu() {
    cy.clickMenu("Block Scheduling");
  }

  clickOnOfficerSetupFromTheBusinessProcessMenu() {
    cy.clickMenu("Officer Setup");
  }

  officerSetupFormOpens() {
    //ok
  }

  //Create Officer

  clickOnCreateOfficerSetupButton() {
    this.officerSetupElements.getCreateOfficerSetupButton().click();
  }

  officerSetupWindowOpens() {
    this.officerSetupElements
      .getOfficerDialogTitle("Create Officer")
      .should("be.visible");
  }

  enterCreateLocation() {
    this.officerSetupElements.getCreateLocationDropdown().click();
    this.officerSetupElements
      .getLocationSelectpickerSearchInput()
      .type(`${jsonHandler.getValue("defaults", "courtCode")}{enter}`);
  }

  requiredField() {
    //no op
  }

  enterCreateArrestingAgency() {
    cy.intercept("smc-web/getArrestingAgencyOri*").as("getArrestingAgencyOri");

    this.officerSetupElements
      .getCreateArrestingAgencyId()
      .type(`${jsonHandler.getValue("defaults", "arrestingAgencyORI")}`);

    cy.wait(["@getArrestingAgencyOri"]);

    this.officerSetupElements.getCreateArrestingAgencyId().type(`{enter}`);
  }

  enterCreateLastName() {
    this.officerSetupElements.getCreateLastName().type(this.officer.lastName);
  }

  enterCreateFirstName() {
    this.officerSetupElements.getCreateFirstName().type(this.officer.firstName);
  }

  enterCreateOfficerBadge() {
    this.officerSetupElements
      .getCreateOfficerBadge()
      .type(this.officer.badgeNum);
  }

  enterCreateGroupNumber() {
    this.officerSetupElements.getCreateGroupNum().type(this.officer.groupNum);
  }

  clickCreateButton() {
    cy.intercept("smc-web/checkOfficerDupe*").as("checkOfficerDupe");
    cy.intercept("smc-web/createNewOfficer*").as("createNewOfficer");
    this.officerSetupElements.getCreateOfficerButton().click();
    cy.wait(["@checkOfficerDupe", "@createNewOfficer"]);
  }

  newRecordBasedOnInformationEnteredIsCreatedAndSaved() {
    this.utils.clearNotyMessages();
    this.officerSetupElements.getCloseOfficerSetupTab().click();

    this.officer.courtCode = jsonHandler.getValue("defaults", "courtCode");
    this.officer.arrestingAgencyORI = jsonHandler.getValue(
      "defaults",
      "arrestingAgencyORI"
    );

    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
  }

  officerSetupRecordHasBeenCreated() {
    this.readRunTimeFile();
  }

  //Edit Officer

  enterFilterCriteriaToSearchForExsitingRecordsInFilterOfficerSetupRecordsSection() {
    this.officerSetupElements.getOfficerBadge().type(this.officer.badgeNum);
    this.checkData = this.officer.badgeNum;
  }

  pressEditIconForTheSelectedRecordInTheTable() {
    this.officerSetupElements.getOfficerSearchResultTableEditIcon().click();
  }

  theFieldsBecomeEditable() {
    //no op
  }

  updateEventLocation() {
    this.officerSetupElements
      .getOfficerSearchResultTableEventLocationTarget()
      .click();

    this.officerSetupElements
      .getOfficerSearchResultTableEventLocationTargetSelector()
      .then(($ele) => {
        $ele.val(jsonHandler.getValue("defaults", "updateCourtCode"));
      });

    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getOfficerSearchResultTableEditUpdateButton()
      .click();
    cy.wait(["@editOfficer"]);
  }

  acceptButtonBecomesAvailableToTheRightOfTheFieldCancelButtonBecomesAvailableToTheRightOfTheAcceptButton() {
    //no op
  }

  pressAcceptButton() {
    //no op
  }

  updatedEventItemIsAcceptedAndSaved() {
    this.officer.courtCode = jsonHandler.getValue(
      "defaults",
      "updateCourtCode"
    );
    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
    this.utils.clearNotyMessages();
  }

  updateArrestingAgency() {
    this.officerSetupElements
      .getOfficerSearchResultTableArrestingAgencyTarget()
      .click();
    this.officerSetupElements.getClearField().click();
    cy.intercept("smc-web/checkOfficerDupe*").as("checkOfficerDupe");
    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getEditableUpdateField()
      .type(
        `${jsonHandler.getValue("defaults", "updateArrestingAgencyORI")}{enter}`
      );
    cy.wait(["@checkOfficerDupe", "@editOfficer"]);
  }

  updatedArrestingAgencyIsAcceptedAndSaved() {
    this.officer.arrestingAgencyORI = jsonHandler.getValue(
      "defaults",
      "updateArrestingAgencyORI"
    );
    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
    this.utils.clearNotyMessages();
  }

  updateLastName() {
    this.officerSetupElements
      .getOfficerSearchResultTableLastNameTarget()
      .click();
    this.officerSetupElements.getClearField().click();
    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getEditableUpdateField()
      .type(`${this.updateOfficer.lastName}{enter}`);
    cy.wait(["@editOfficer"]);
  }

  updatedLastNameIsAcceptedAndSaved() {
    this.officer.lastName = this.updateOfficer.lastName;
    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
    this.utils.clearNotyMessages();
  }

  updateFirstName() {
    this.officerSetupElements
      .getOfficerSearchResultTableFirstNameTarget()
      .click();
    this.officerSetupElements.getClearField().click();
    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getEditableUpdateField()
      .type(`${this.updateOfficer.firstName}{enter}`);
    cy.wait(["@editOfficer"]);
  }

  updatedFirstNameIsAcceptedAndSaved() {
    this.officer.firstName = this.updateOfficer.firstName;
    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
    this.utils.clearNotyMessages();
  }

  updateOfficerBadge() {
    this.officerSetupElements
      .getOfficerSearchResultTableBadgeNumTarget()
      .click();
    this.officerSetupElements.getClearField().click();
    this.updateOfficer.badgeNum = "CYPRESS_" + Date.now();
    cy.intercept("smc-web/checkOfficerDupe*").as("checkOfficerDupe");
    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getEditableUpdateField()
      .type(`${this.updateOfficer.badgeNum}{enter}`);
    cy.wait(["@checkOfficerDupe", "@editOfficer"]);
  }

  updatedOfficerBadgeIsAcceptedAndSaved() {
    this.officer.badgeNum = this.updateOfficer.badgeNum;
    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
    this.utils.clearNotyMessages();
  }

  updateGroupNumber() {
    this.officerSetupElements
      .getOfficerSearchResultTableGroupNumTarget()
      .click();
    this.officerSetupElements.getClearField().click();
    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getEditableUpdateField()
      .type(`${this.updateOfficer.groupNum}{enter}`);
    cy.wait(["@editOfficer"]);
  }

  updatedGroupNumberIsAcceptedAndSaved() {
    this.officer.groupNum = this.updateOfficer.groupNum;
    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });
    this.utils.clearNotyMessages();
  }

  updateEndDate() {
    this.officerSetupElements
      .getOfficerSearchResultTableEndDateTarget()
      .click();
    this.officerSetupElements
      .getOfficerSearchResultTableEndDateField()
      .type(`${this.updateOfficer.endDate}`);
    cy.intercept("smc-web/editOfficer*").as("editOfficer");
    this.officerSetupElements
      .getOfficerSearchResultTableEditUpdateButton()
      .click();
    cy.wait(["@editOfficer"]);
  }

  updatedEndDateIsAcceptedAndSaved() {
    this.readRunTimeFile();
    this.officerSetupElements.getCloseOfficerSetupTab().click();
    this.utils.clearNotyMessages();
  }

  //Search Officer
  setupData() {
    this.officer = {
      courtCode: jsonHandler.getValue("defaults", "updateCourtCode"),
      lastName: "MORALES_",
      firstName: "DAVIS_",
      badgeNum: "CYPRESS_",
      groupNum: "00",
    };

    cy.writeFile(this.tempOfficerSetupFileName, {
      officer: this.officer,
    });

    cy.task("setupOfficers");

    this.readRunTimeFile();
  }

  enterLocation() {
    this.checkData = this.officer.courtCode;
  }

  enterArrestingAgency() {
    this.officerSetupElements
      .getArrestingAgencyId()
      .type(`${this.officer.arrestingAgencyORI}`);
    this.checkData = this.officer.arrestingAgencyORI;
  }

  enterLastName() {
    this.officerSetupElements.getLastName().type(this.officer.lastName);
    this.checkData = this.officer.lastName;
  }

  enterFirstName() {
    this.officerSetupElements.getFirstName().type(this.officer.firstName);
    this.checkData = this.officer.firstName;
  }

  enterOfficerBadge() {
    this.officerSetupElements.getOfficerBadge().type(this.officer.badgeNum);
    this.checkData = this.officer.badgeNum;
  }

  enterGroupNumber() {
    this.officerSetupElements.getGroupNum().type(this.officer.groupNum);
    this.checkData = this.officer.groupNum;
  }

  pressSearchOfficersButton() {
    this.officerSetupElements.getLocationDropdown().click();
    this.officerSetupElements
      .getLocationSelectpickerSearchInput()
      .type(`${this.officer.courtCode}{enter}`);
    this.officerSetupElements.getLocationDropdown().click();

    cy.intercept("smc-web/getOfficers*").as("getOfficers");
    this.officerSetupElements.getOfficerSearchButton().click();
    cy.wait(["@getOfficers"]);
  }

  recordsBasedOnFilterCriteriaAreReturnedAndDisplayedInTheViewUpdateOfficerSetupRecords() {
    this.checkData = this.checkData.replace("%", "");
    let that = this;
    this.officerSetupElements.getOfficerSearchResultTable().then(($ele) => {
      cy.wrap($ele[0]).find("tbody").find("tr").should("have.length.above", 0);

      cy.wrap($ele[0])
        .find("tbody")
        .find("tr")
        .then((rows) => {
          rows.toArray().forEach((row) => {
            let found = false;
            Cypress.$(row)
              .find("td")
              .each((cell, td) => {
                if (Cypress.$(td).text().trim().includes(that.checkData)) {
                  found = true;
                }
              });
            if (!found) {
              throw `did not find the search term ${that.checkData}`;
            }
          });
        });
    });
  }

  clickClearButton() {
    this.officerSetupElements.getClearSearchBtn().click();
  }

  finishTest() {
    this.officerSetupElements.getCloseOfficerSetupTab().click();
  }

  //Delete Officer

  pressTrashIconForTheSelectedRecordInTheTable() {
    this.officerSetupElements.getDeleteOfficerBtn().click();
  }

  popupMessageDisplays() {
    this.officerSetupElements.getDeleteOfficerDialog().should("be.visible");
  }

  pressButtonInWindow() {
    cy.intercept("smc-web/deleteOfficer*").as("deleteOfficer");
    this.officerSetupElements.getConfirmDeleteBtn().click();
    cy.wait(["@deleteOfficer"]);
  }

  officerRecordIsDeleted() {
    this.utils.clearNotyMessages();
    this.officerSetupElements.getCloseOfficerSetupTab().click();
  }

  setupDataForSearch() {
    this.setupData();
  }

  //Wildcard Search
  enterWildcardLastName() {
    this.officerSetupElements.getLastName().type(this.officer.lastName + "%");
    this.checkData = this.officer.lastName + "%";
  }

  enterWildcardFirstName() {
    this.officerSetupElements.getFirstName().type(this.officer.firstName + "%");
    this.checkData = this.officer.firstName + "%";
  }

  enterWildcardOfficerBadge() {
    this.officerSetupElements
      .getOfficerBadge()
      .type(this.officer.badgeNum + "%");
    this.checkData = this.officer.badgeNum + "%";
  }

  removeTestRecords() {
    cy.task("deleteOfficers");
  }
}
