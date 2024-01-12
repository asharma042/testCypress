/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import ArrestQueryHappyPathActions from "./ArrestQueryHappyPathActions";
const arrestQueryHappyPathActions = new ArrestQueryHappyPathActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/inquiries/arrestQueryHappyPath/arrestQueryHappyPathFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "arrestQueryHappyPath";
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

  let harPath = "caseProcessing/inquiries/arrestQueryHappyPath";
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

Given("Cases with arrest report information", () => {
  arrestQueryHappyPathActions.casesWithArrestReportInformation();
});

Given("Click on Civil from Case Processing", () => {
  arrestQueryHappyPathActions.clickOnCivilFromCaseProcessing();
});

Given("Click on Inquiries", () => {
  arrestQueryHappyPathActions.clickOnInquiries();
});

Given("Click on Arrest Query", () => {
  arrestQueryHappyPathActions.clickOnArrestQuery();
});

Then("Arrest Query work tab displays", () => {
  arrestQueryHappyPathActions.arrestQueryWorkTabDisplays();
});

Given("enter arrest report in Arrest Report field", () => {
  arrestQueryHappyPathActions.enterArrestReportInArrestReportField();
});

Then("displays in field", () => {
  arrestQueryHappyPathActions.displaysInField();
});

Then("Run Arrest Query button becomes active", () => {
  arrestQueryHappyPathActions.runArrestQueryButtonBecomesActive();
});

Given("click Run Arrest Query button", () => {
  arrestQueryHappyPathActions.clickRunArrestQueryButton();
});

Then("search results display", () => {
  arrestQueryHappyPathActions.searchResultsDisplay();
});

Given("click check box next to party information", () => {
  arrestQueryHappyPathActions.clickCheckBoxNextToPartyInformation();
});

Then("check mark displays", () => {
  arrestQueryHappyPathActions.checkMarkDisplays();
});

Given("click Process Continuation button", () => {
  arrestQueryHappyPathActions.clickProcessContinuationButton();
});

Then("list of available processes displays", () => {
  arrestQueryHappyPathActions.listOfAvailableProcessesDisplays();
});

Given("select Add Event", () => {
  arrestQueryHappyPathActions.selectAddEvent();
});

Then("Add Event process continuation opens", () => {
  arrestQueryHappyPathActions.addEventProcessContinuationOpens();
});

Given("Add Future Event", () => {
  arrestQueryHappyPathActions.addFutureEvent();
});

Given("Click Return To Initiating Tab button", () => {
  arrestQueryHappyPathActions.clickReturnToInitiatingTabButton();
});

Then("Add Event window closes and displays Arrest Query work tab", () => {
  arrestQueryHappyPathActions.addEventWindowClosesAndDisplaysArrestQueryWorkTab();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    ArrestQueryHappyPathActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "casesWithArrestReportInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnCivilFromCaseProcessing"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnInquiries"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickOnArrestQuery"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "arrestQueryWorkTabDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterArrestReportInArrestReportField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "displaysInField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "runArrestQueryButtonBecomesActive"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickRunArrestQueryButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "searchResultsDisplay"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickCheckBoxNextToPartyInformation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "checkMarkDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickProcessContinuationButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "listOfAvailableProcessesDisplays"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAddEvent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addEventProcessContinuationOpens"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "addFutureEvent"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickReturnToInitiatingTabButton"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "addEventWindowClosesAndDisplaysArrestQueryWorkTab"
  );
  cy.writeFile("./differences/ArrestQueryHappyPathActions.tmp", propertyNames);
}
