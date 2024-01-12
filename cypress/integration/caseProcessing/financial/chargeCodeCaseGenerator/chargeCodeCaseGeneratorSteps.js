/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import Common from "../../../common/Common";
import { After, Before } from "@badeball/cypress-cucumber-preprocessor";
Before(function () {
  let env = Cypress.env("ENV");

  cy.fixture(
    `caseProcessing/financial/chargeCodeCaseGenerator/chargeCodeCaseGeneratorFixture`
  ).then((dataFixture) => {
    //The scenario name contains the row number
    let name = testState.pickle.name;
    let regex = /\d+/g;
    let matches = name.match(regex);
    let row = parseInt(matches[0]);
    if (row === 0) {
      let common = new Common();
      common.writeFile("cypress\\temp\\chargeCodeResults.csv", "");
    }
    globalThis.obj = dataFixture[env][row];

    globalThis.fixture = {
      defaults: {
        defaultCourt: obj.defaultCourt,
        courtCode: obj.courtCode,
        arrestingAgencyORI: obj.arrestingAgencyORI,
        prosecutingAttorneyCode: obj.prosecutingAttorneyCode,
        prosecutingAttorneyName: obj.prosecutingAttorneyName,
        caseJudgeAssignment: obj.caseJudgeAssignment,
        judgeEventRoom: obj.judgeEventRoom,
      },
      scenario1: {
        caseType: obj.caseType,
        charge: obj.charge,
        nonConservationTicket: obj.nonConservationTicket,
        plea: obj.plea,
        fineAmount: obj.fineAmount,
        fineAmountLength: obj.fineAmountLength,
        chargeDesc: `-${obj.chargeDesc}`,
        docketCode: obj.docketCode,
        courtCostsBalanceDue: obj.courtCostsBalanceDue,
        pendingCostsLength: obj.pendingCostsLength,
      },
    };
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "chargeCodeCaseGenerator";
      cy.wrap(id).as("id");
      if ($jsonHandlerFile[id] === undefined) {
        $jsonHandlerFile[id] = dataFixture;
        cy.task("writeJsonHandlerFile", $jsonHandlerFile);
      }
    });
  });
});

After(function () {
  cy.logout();
});
