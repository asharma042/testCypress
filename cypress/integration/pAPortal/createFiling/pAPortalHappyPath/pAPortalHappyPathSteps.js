/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import PAPortalHappyPathActions from "./PAPortalHappyPathActions";
const pAPortalHappyPathActions = new PAPortalHappyPathActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `pAPortal/createFiling/pAPortalHappyPath/pAPortalHappyPathFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "pAPortalHappyPath";
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

  let harPath = "pAPortal/createFiling/pAPortalHappyPath";
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

Given("Valid user selects Create Filing", () => {
  pAPortalHappyPathActions.validUserSelectsCreateFiling();
});

Given("Navigate to the Defendant section", () => {
  pAPortalHappyPathActions.navigateToTheDefendantSection();
});

Given("Enter Last Name", () => {
  pAPortalHappyPathActions.enterLastName();
});

Given("Enter First Name", () => {
  pAPortalHappyPathActions.enterFirstName();
});

Given("Enter Date of Birth", () => {
  pAPortalHappyPathActions.enterDateOfBirth();
});

Given("Enter Sex", () => {
  pAPortalHappyPathActions.enterSex();
});

Given("Enter Street Address", () => {
  pAPortalHappyPathActions.enterStreetAddress();
});

Given("Enter City", () => {
  pAPortalHappyPathActions.enterCity();
});

Given("Enter Zip Code", () => {
  pAPortalHappyPathActions.enterZipCode();
});

Given("In the Enter Ticket section select Filing Location", () => {
  pAPortalHappyPathActions.inTheEnterTicketSectionSelectFilingLocation();
});

Given("Enter Arresting Agency ORI", () => {
  pAPortalHappyPathActions.enterArrestingAgencyORI();
});

Given("In the Enter Count section", () => {
  pAPortalHappyPathActions.inTheEnterCountSection();
});

Given("Enter Date of Violation as one month ago", () => {
  pAPortalHappyPathActions.enterDateOfViolationAsOneMonthAgo();
});

Given("Enter Time as {string}", (option0) => {
  pAPortalHappyPathActions.enterTimeAs(option0);
});

Given("Enter Location", () => {
  pAPortalHappyPathActions.enterLocation();
});

Given("Enter 9 digit ticket number", () => {
  pAPortalHappyPathActions.enter9DigitTicketNumber();
});

Given(
  "In Missouri Charge field enter and select charge and then tab out of field",
  () => {
    pAPortalHappyPathActions.inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField();
  }
);

Given("In the Add Initial Document Details section", () => {
  pAPortalHappyPathActions.inTheAddInitialDocumentDetailsSection();
});

Given("Click Document Category drop down and select Information Filed", () => {
  pAPortalHappyPathActions.clickDocumentCategoryDropDownAndSelectInformationFiled();
});

Given("Upload PDF", () => {
  pAPortalHappyPathActions.uploadPDF();
});

Given("Click Choose Action button", () => {
  pAPortalHappyPathActions.clickChooseActionButton();
});

Given("Select Submit to Court", () => {
  pAPortalHappyPathActions.selectSubmitToCourt();
});

Then("Submit filing pop up of {string}", (option0) => {
  pAPortalHappyPathActions.submitFilingPopUpOf(option0);
});

Given("Select Yes", () => {
  pAPortalHappyPathActions.selectYes();
});

Then("Green noty showing filing was submitted successfully", () => {
  pAPortalHappyPathActions.greenNotyShowingFilingWasSubmittedSuccessfully();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    PAPortalHappyPathActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validUserSelectsCreateFiling"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "navigateToTheDefendantSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLastName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterFirstName"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDateOfBirth"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterSex");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterStreetAddress"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "enterCity");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterZipCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheEnterTicketSectionSelectFilingLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterArrestingAgencyORI"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheEnterCountSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterDateOfViolationAsOneMonthAgo"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterTimeAs"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enter9DigitTicketNumber"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "inMissouriChargeFieldEnterAndSelectChargeAndThenTabOutOfField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "inTheAddInitialDocumentDetailsSection"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickDocumentCategoryDropDownAndSelectInformationFiled"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "uploadPDF");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickChooseActionButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectSubmitToCourt"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "submitFilingPopUpOf"
  );
  propertyNames = propertyNames.filter((funcName) => funcName !== "selectYes");
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyShowingFilingWasSubmittedSuccessfully"
  );
  cy.writeFile("./differences/PAPortalHappyPathActions.tmp", propertyNames);
}
