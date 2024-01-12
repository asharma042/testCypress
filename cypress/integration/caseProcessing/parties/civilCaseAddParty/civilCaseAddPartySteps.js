/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import CivilCaseAddPartyActions from "./CivilCaseAddPartyActions";
const civilCaseAddPartyActions = new CivilCaseAddPartyActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/parties/civilCaseAddParty/civilCaseAddPartyFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "civilCaseAddParty";
      cy.wrap(id).as("id");
      if ($jsonHandlerFile[id] === undefined) {
        $jsonHandlerFile[id] = dataFixture;
        cy.task("writeJsonHandlerFile", $jsonHandlerFile);
      }
    });
  });
  cy.recordHar({ content: false });
});

After(function () {
  cy.logout();

  let scenarioName = testState.pickle.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join("-");

  let env = Cypress.env("ENV");
  let browser = Cypress.browser.name;
  let harsFolder = Cypress.env("hars_folders");

  let harPath = "caseProcessing/parties/civilCaseAddParty";
  let harFileName = `${scenarioName}-${env}-${browser}.har`;

  cy.task("createHarsDirectories", `${harsFolder}/${harPath}`);

  cy.saveHar({
    outDir: `${harsFolder}/${harPath}`,
    fileName: harFileName,
  });

  let utils = new Utils();
  let hars_folders = Cypress.env("hars_folders");

  utils.readRunTimeFile(
    `${harsFolder}/${harPath}/${harFileName}`,
    function ($json) {
      if ($json) {
        try {
          let har = JSON.parse($json);
          for (var i = 0; i < har.log.entries.length; i++) {
            if (har.log.entries[i].request.url.includes("login")) {
              delete har.log.entries[i].request.postData;
            }
          }
          let result = JSON.stringify(har, null, 2);

          cy.writeFile(`${harsFolder}/${harPath}/${harFileName}`, result);
        } catch (e) {
          cy.log(`error ${e.message}`);
        }
      }
    }
  );
});

Given("Create Civil Case", () => {
  civilCaseAddPartyActions.createCivilCase();
});

Given("Enter Case ID", () => {
  civilCaseAddPartyActions.enterCaseID();
});

Given("Case information displays", () => {
  civilCaseAddPartyActions.caseInformationDisplays();
});

Given("expand Case Parties section", () => {
  civilCaseAddPartyActions.expandCasePartiesSection();
});

Given("confirm valid party types", () => {
  civilCaseAddPartyActions.confirmValidPartyTypes();
});

Given("expand Add Party section", () => {
  civilCaseAddPartyActions.expandAddPartySection();
});

Given("enter party description", () => {
  civilCaseAddPartyActions.enterPartyDescription();
});

Then("code and description display in field", () => {
  civilCaseAddPartyActions.codeAndDescriptionDisplayInField();
});

Given("enter first name", () => {
  civilCaseAddPartyActions.enterFirstName();
});

Then("name displays", () => {
  civilCaseAddPartyActions.nameDisplays();
});

Given("enter middle name", () => {
  civilCaseAddPartyActions.enterMiddleName();
});

Then("middle name displays", () => {
  civilCaseAddPartyActions.middleNameDisplays();
});

Given("enter last name", () => {
  civilCaseAddPartyActions.enterLastName();
});

Then("last name displays", () => {
  civilCaseAddPartyActions.lastNameDisplays();
});

Given("Start Date displays current date", () => {
  civilCaseAddPartyActions.startDateDisplaysCurrentDate();
});

Given("time displays current time", () => {
  civilCaseAddPartyActions.timeDisplaysCurrentTime();
});

Given("expand contact information section", () => {
  civilCaseAddPartyActions.expandContactInformationSection();
});

Given("status displays active", () => {
  civilCaseAddPartyActions.statusDisplaysActive();
});

Given("select address type", () => {
  civilCaseAddPartyActions.selectAddressType();
});

Then("address type displays in field", () => {
  civilCaseAddPartyActions.addressTypeDisplaysInField();
});

Given("enter Street Address", () => {
  civilCaseAddPartyActions.enterStreetAddress();
});

Then("street should have value", () => {
  civilCaseAddPartyActions.streetShouldHaveValue();
});

Then("city should have value", () => {
  civilCaseAddPartyActions.cityShouldHaveValue();
});

Then("state should have value", () => {
  civilCaseAddPartyActions.stateShouldHaveValue();
});

Then("zip should have value", () => {
  civilCaseAddPartyActions.zipShouldHaveValue();
});

Then("nation should have value", () => {
  civilCaseAddPartyActions.nationShouldHaveValue();
});

Given("Click Save Party to Case", () => {
  civilCaseAddPartyActions.clickSavePartyToCase();
});

Then("Parties Style of Case pop up", () => {
  civilCaseAddPartyActions.partiesStyleOfCasePopUp();
});

Given("Style of Case click Proposed", () => {
  civilCaseAddPartyActions.styleOfCaseClickProposed();
});

Given("click Save", () => {
  civilCaseAddPartyActions.clickSave();
});

Then(
  "noty displays with Style of Case is updated with new neame and case id",
  () => {
    civilCaseAddPartyActions.notyDisplaysWithStyleOfCaseIsUpdatedWithNewNeameAndCaseId();
  }
);

Given("click Close", () => {
  civilCaseAddPartyActions.clickClose();
});

Then("pop up closes", () => {
  civilCaseAddPartyActions.popUpCloses();
});

Then("new party displays in Case Parties section", () => {
  civilCaseAddPartyActions.newPartyDisplaysInCasePartiesSection();
});

Given("select Case ID search option", () => {
  civilCaseAddPartyActions.selectCaseIDSearchOption();
});

Then("Parties Style of Case pop up with proposed value", () => {
  civilCaseAddPartyActions.partiesStyleOfCasePopUpWithProposedValue();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    CivilCaseAddPartyActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "createCivilCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterCaseID"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "caseInformationDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandCasePartiesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "confirmValidPartyTypes"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandAddPartySection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterPartyDescription"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "codeAndDescriptionDisplayInField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "nameDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterMiddleName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "middleNameDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "lastNameDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "startDateDisplaysCurrentDate"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "timeDisplaysCurrentTime"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "expandContactInformationSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "statusDisplaysActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAddressType"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addressTypeDisplaysInField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterStreetAddress"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "streetShouldHaveValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "cityShouldHaveValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "stateShouldHaveValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "zipShouldHaveValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "nationShouldHaveValue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSavePartyToCase"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partiesStyleOfCasePopUp"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "styleOfCaseClickProposed"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickSave");
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "notyDisplaysWithStyleOfCaseIsUpdatedWithNewNeameAndCaseId"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "clickClose");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "popUpCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "newPartyDisplaysInCasePartiesSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCaseIDSearchOption"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "partiesStyleOfCasePopUpWithProposedValue"
  );
  cy.writeFile("./differences/CivilCaseAddPartyActions.tmp", propertyNames);
}
