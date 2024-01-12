// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import "cypress-wait-until";
import "@testing-library/cypress/add-commands";
import "cypress-plugin-tab";
import "cypress-real-events";
import Utils from "../integration/utils/utils";
import "@neuralegion/cypress-har-generator/commands";
import { str2ab, decryptData } from "./smcCryptoDecrypt";

const globalCourts = {
  dev: "Carter County - 36th Judicial Circuit Dev",
  mv: "Franklin County - 20th Judicial Circuit",
  test: "Osage County - 20th Judicial Circuit",
  uat: "*** TEST *** Dallas County - **UAT** Judicial Circuit",
  trn: "TRAINING County - 99th Judicial Circuit",
};

function loginWithIntercept() {
  cy.intercept("smc-web/retrieveSmcGlobalPreferences*").as(
    "retrieveSmcGlobalPreferences"
  );
  cy.intercept("smc-web/retrieveSmcToolsPreferences*").as(
    "retrieveSmcToolsPreferences"
  );
  cy.intercept("smc-web/getCaseCategorySearchPrefOption*").as(
    "getCaseCategorySearchPrefOption"
  );
  cy.intercept("smc-web/getListOfTextTypes*").as("getListOfTextTypes");

  cy.get("input[name=submit]").click();

  cy.wait([
    "@retrieveSmcGlobalPreferences",
    "@retrieveSmcToolsPreferences",
    "@getCaseCategorySearchPrefOption",
    "@getListOfTextTypes",
  ]);
}

function caseNetIntercept() {
  cy.intercept("cnet/login*").as("login");

  cy.get("button[name=logon]").click();

  cy.wait(["@login"]);
}

function jobsIntercept() {
  cy.intercept("smc-jobs/login").as("jobslogin");
  cy.get("[name=submit]").click();
  cy.wait(["@jobslogin"]);
}

async function login(obj) {
  cy.visit(obj["host"]);
  let userName = obj["username"];
  cy.get("input[name=username]").type(userName);
  let password = "";
  if (obj.hasOwnProperty("secure")) {
    const ab = str2ab(obj.secure);
    password = JSON.parse(await decryptData(ab))["password"];
  } else {
    password = obj["password"];
  }

  cy.get("input[name=password]").type(password, {
    log: false,
  });
}
/**
 * The login accounts are used for PR processing
 * @param {*} app
 */
function preLogin(app) {
  var isPrTEst = Cypress.env("ISPRTEST");

  switch (isPrTEst) {
    //When run PR builds, we need the specific
    //user for the machine
    case true:
      //initialize
      cy.task("hostName").then(($hostname) => {
        let env = Cypress.env("ENV");
        let envFile = `accounts\\${env}\\cypress.env.${$hostname.toLowerCase()}.json`;
        cy.task("readFileMaybe", envFile).then(($json) => {
          if ($json) {
            let obj = $json[app];
            login(obj);
            loginWithIntercept();
          } else {
            let obj = Cypress.env(app);
            login(obj);
            loginWithIntercept();
          }
        });
      });
      break;
    default:
      let obj = Cypress.env(app);
      login(obj);
      loginWithIntercept();
      break;
  }
}

Cypress.Commands.add("login", () => {
  preLogin("smc");

  let env = Cypress.env("ENV");
  let defaultCourt = globalCourts[env];

  if (
    globalThis.fixture.hasOwnProperty("defaults") &&
    globalThis.fixture.defaults.hasOwnProperty("defaultCourt")
  ) {
    defaultCourt = globalThis.fixture.defaults.defaultCourt;
  }

  cy.get("[data-id=globalDataSource]").click();
  cy.get(".bs-searchbox > .form-control").type(`${defaultCourt}{enter}`);
});

Cypress.Commands.add("paPortalLogin", () => {
  preLogin("paPortal");
});

Cypress.Commands.add("eFilingLogin", () => {
  let obj = Cypress.env("eFiling");
  login(obj);
  cy.get("#submit").click();
});

Cypress.Commands.add("loginToCaseNet", () => {
  let obj = Cypress.env("caseNet");
  login(obj);
  caseNetIntercept();
});

Cypress.Commands.add("loginToJobs", () => {
  let obj = Cypress.env("jobs");
  login(obj);
  jobsIntercept();
});

Cypress.Commands.add("logout", () => {
  cy.url().then(($url) => {
    if ($url.includes("ecf/secure/")) {
      cy.get("#logoff > tbody > tr > td > a").click();
    } else if ($url.includes("/cnet/")) {
      cy.get(".navbar-toggle > .fa").click();
      cy.get(
        "#bs-example-navbar-collapse-1 > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
      ).click();
      cy.get(".open > .dropdown-menu > li > a").click();
    } else if ($url.includes("/smc-jobs/")) {
      cy.get(
        "body > table > tbody > tr:nth-child(1) > td:nth-child(2) > a"
      ).click();
    } else {
      //Sometimes a Noty will still be visible over the Logout button
      let utils = new Utils();
      utils.clearNotyMessages();

      cy.get("#open-user-info").click({ force: true });
      cy.findByRole("button", { name: /Logout/i }).click();
    }
  });
});
/**
 * Clicks link on top of page
 */
Cypress.Commands.add("clickLink", (link) => {
  cy.get("a:contains(" + link + ")").click();
});

/**
 * Clicks menus on left side of page
 */
Cypress.Commands.add("clickMenu", (menuItem) => {
  cy.get(".menu-text").contains(menuItem).click();
});

/**
 * Selects court
 */
Cypress.Commands.add("selectGlobalDataSourceCourt", (court) => {
  //button
  cy.get("[data-id=globalDataSource]").click();
  cy.get(".bs-searchbox  > .form-control").type(`${court}{enter}`);
});

/**
 * Select the gear and set the court location
 */
Cypress.Commands.add(
  "selectLocationDefaultsFromGear",
  (whichGear, courtLocation) => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    //Click the Gear
    cy.get(whichGear).click();

    //when window opens, select the court location and close
    cy.get("@windowOpen").then((windowOpen) => {
      cy.get("select[name='locnCodeForDefaults']").select(courtLocation);
      cy.get('button:contains("Save & Close")').click();
    });
  }
);
/**
 * See https://codegen.studio/1614/get-multiple-aliases-at-once-without-callbacks-in-cypress/
 */
Cypress.Commands.add("getMany", (names) => {
  const values = [];
  for (const arg of names) {
    cy.get(arg).then((value) => values.push(value));
  }
  return cy.wrap(values);
});
