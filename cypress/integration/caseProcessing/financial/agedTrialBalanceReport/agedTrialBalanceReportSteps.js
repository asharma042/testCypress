/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import AgedTrialBalanceReportActions from "./AgedTrialBalanceReportActions";
const agedTrialBalanceReportActions = new AgedTrialBalanceReportActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `caseProcessing/financial/agedTrialBalanceReport/agedTrialBalanceReportFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "agedTrialBalanceReport";
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

  let harPath = "caseProcessing/financial/agedTrialBalanceReport";
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

Given("Valid user selects Aged Trial Balance Report", () => {
  agedTrialBalanceReportActions.validUserSelectsAgedTrialBalanceReport();
});

Given("Click the radio button for a Detailed Report", () => {
  agedTrialBalanceReportActions.clickTheRadioButtonForADetailedReport();
});

Given("Click to run the report", () => {
  agedTrialBalanceReportActions.clickToRunTheReport();
});

Then(
  "Report displays a detailed report showing cash and accrual for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysADetailedReportShowingCashAndAccrualForTheDefaultLocation();
  }
);

Given("Select Cash for the Accounting Method field", () => {
  agedTrialBalanceReportActions.selectCashForTheAccountingMethodField();
});

Then(
  "Report displays a detailed report showing cash method for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysADetailedReportShowingCashMethodForTheDefaultLocation();
  }
);

Given("Open More Filters", () => {
  agedTrialBalanceReportActions.openMoreFilters();
});

Given("Enter a detail code in the Detail Code field", () => {
  agedTrialBalanceReportActions.enterADetailCodeInTheDetailCodeField();
});

Then(
  "Report displays a detailed report showing cash method for a specific detail code for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysADetailedReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation();
  }
);

Then("Enter a case ID in the My Case ID Search field", () => {
  agedTrialBalanceReportActions.enterACaseIDInTheMyCaseIDSearchField();
});

Then(
  "Report displays a detailed report showing cash method for a specific case for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysADetailedReportShowingCashMethodForASpecificCaseForTheDefaultLocation();
  }
);

Then("Select Accural for the Accounting Method field", () => {
  agedTrialBalanceReportActions.selectAccuralForTheAccountingMethodField();
});

Then(
  "Report displays a detailed report showing accrual method for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysADetailedReportShowingAccrualMethodForTheDefaultLocation();
  }
);

Then(
  "Report displays a detailed report for Accrual method for a specific detail code for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysADetailedReportForAccrualMethodForASpecificDetailCodeForTheDefaultLocation();
  }
);

Then(
  "Report displays Accrual method for a specific Case ID for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysAccrualMethodForASpecificCaseIDForTheDefaultLocation();
  }
);

Then("Select a Court Location", () => {
  agedTrialBalanceReportActions.selectACourtLocation();
});

Then(
  "Report displays detail report for Cash and and Detail Code and Case Id for the selected Court Location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysDetailReportForCashAndAndDetailCodeAndCaseIdForTheSelectedCourtLocation();
  }
);

Given("Click the radio button for a Summary Report", () => {
  agedTrialBalanceReportActions.clickTheRadioButtonForASummaryReport();
});

Then("Report displays summary report for selected court location", () => {
  agedTrialBalanceReportActions.reportDisplaysSummaryReportForSelectedCourtLocation();
});

Then(
  "Report displays a Summary report showing cash method for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportShowingCashMethodForTheDefaultLocation();
  }
);

Then(
  "Report displays a Summary report showing cash method for a specific detail code for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation();
  }
);

Then(
  "Report displays a Summary report showing cash method for a specific case for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportShowingCashMethodForASpecificCaseForTheDefaultLocation();
  }
);

Then(
  "Report displays a Summary report showing accrual method for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportShowingAccrualMethodForTheDefaultLocation();
  }
);

Then(
  "Report displays a Summary report showing Accrual method for a specific detail code for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportShowingAccrualMethodForASpecificDetailCodeForTheDefaultLocation();
  }
);

Then(
  "Report displays a Summary report showing Accrual for a Case Id for the default location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportShowingAccrualForACaseIdForTheDefaultLocation();
  }
);

Then(
  "Report displays a Summary Report for Accural and Detail Code and Case Id for the selected location",
  () => {
    agedTrialBalanceReportActions.reportDisplaysASummaryReportForAccuralAndDetailCodeAndCaseIdForTheSelectedLocation();
  }
);

Then("Default values are set", () => {
  agedTrialBalanceReportActions.defaultValuesAreSet();
});

Then("Click to clear the report", () => {
  agedTrialBalanceReportActions.clickToClearTheReport();
});

Given("Close the tab", () => {
  agedTrialBalanceReportActions.closeTheTab();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    AgedTrialBalanceReportActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "validUserSelectsAgedTrialBalanceReport"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheRadioButtonForADetailedReport"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToRunTheReport"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysADetailedReportShowingCashAndAccrualForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectCashForTheAccountingMethodField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysADetailedReportShowingCashMethodForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "openMoreFilters"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterADetailCodeInTheDetailCodeField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysADetailedReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "enterACaseIDInTheMyCaseIDSearchField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysADetailedReportShowingCashMethodForASpecificCaseForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectAccuralForTheAccountingMethodField"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysADetailedReportShowingAccrualMethodForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysADetailedReportForAccrualMethodForASpecificDetailCodeForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysAccrualMethodForASpecificCaseIDForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectACourtLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysDetailReportForCashAndAndDetailCodeAndCaseIdForTheSelectedCourtLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheRadioButtonForASummaryReport"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "reportDisplaysSummaryReportForSelectedCourtLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportShowingCashMethodForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportShowingCashMethodForASpecificDetailCodeForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportShowingCashMethodForASpecificCaseForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportShowingAccrualMethodForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportShowingAccrualMethodForASpecificDetailCodeForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportShowingAccrualForACaseIdForTheDefaultLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "reportDisplaysASummaryReportForAccuralAndDetailCodeAndCaseIdForTheSelectedLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "defaultValuesAreSet"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickToClearTheReport"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "closeTheTab"
  );
  cy.writeFile(
    "./differences/AgedTrialBalanceReportActions.tmp",
    propertyNames
  );
}
