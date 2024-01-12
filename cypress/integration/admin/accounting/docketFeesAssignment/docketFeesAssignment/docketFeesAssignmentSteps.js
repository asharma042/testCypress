/// <reference types="cypress" />
import Utils from "../../../../utils/utils";
import {
  After,
  Before,
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import DocketFeesAssignmentActions from "./DocketFeesAssignmentActions";
const docketFeesAssignmentActions = new DocketFeesAssignmentActions();
Before(function () {
  var env = Cypress.env("ENV");

  propertyNames();

  cy.fixture(
    `admin/accounting/docketFeesAssignment/docketFeesAssignment/docketFeesAssignmentFixture_${env}`
  ).then((dataFixture) => {
    globalThis.fixture = dataFixture;
    cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
      let id = "docketFeesAssignment";
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

  let harPath = "admin/accounting/docketFeesAssignment/docketFeesAssignment";
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

Given(
  "User is a CBS Accounting employee with smc-accounting administration security role",
  () => {
    docketFeesAssignmentActions.userIsACBSAccountingEmployeeWithSmcaccountingAdministrationSecurityRole();
  }
);

Then(
  "All available court locations will appear in the Financial Location drop down list",
  () => {
    docketFeesAssignmentActions.allAvailableCourtLocationsWillAppearInTheFinancialLocationDropDownList();
  }
);

Given("User selects location", () => {
  docketFeesAssignmentActions.userSelectsLocation();
});

Then("Docket Search area expands", () => {
  docketFeesAssignmentActions.docketSearchAreaExpands();
});

Given(
  "Enter partial docket code with wild card symbol in the Docket Type field",
  () => {
    docketFeesAssignmentActions.enterPartialDocketCodeWithWildCardSymbolInTheDocketTypeField();
  }
);

Given("Click the search icon", () => {
  docketFeesAssignmentActions.clickTheSearchIcon();
});

Then("Docket Search area populates with search results", () => {
  docketFeesAssignmentActions.docketSearchAreaPopulatesWithSearchResults();
});

Then("Description of the docket code appears", () => {
  docketFeesAssignmentActions.descriptionOfTheDocketCodeAppears();
});

Then(
  "Status indicates whether a docket code filing updates the status of a case",
  () => {
    docketFeesAssignmentActions.statusIndicatesWhetherADocketCodeFilingUpdatesTheStatusOfACase();
  }
);

Then(
  "Cont whether a docket code filing represents a court granted continuance of an event",
  () => {
    docketFeesAssignmentActions.contWhetherADocketCodeFilingRepresentsACourtGrantedContinuanceOfAnEvent();
  }
);

Then(
  "Disp indicates whether a docket code filing represents a disposition",
  () => {
    docketFeesAssignmentActions.dispIndicatesWhetherADocketCodeFilingRepresentsADisposition();
  }
);

Then("Activity Date indicates when this record was created or updated", () => {
  docketFeesAssignmentActions.activityDateIndicatesWhenThisRecordWasCreatedOrUpdated();
});

Given("Select a docket code from the list", () => {
  docketFeesAssignmentActions.selectADocketCodeFromTheList();
});

Given("Click the plus next to the selected docket code", () => {
  docketFeesAssignmentActions.clickThePlusNextToTheSelectedDocketCode();
});

Then("Row expands to display the associated DETC Codes", () => {
  docketFeesAssignmentActions.rowExpandsToDisplayTheAssociatedDETCCodes();
});

Given(
  "Click the drop down icon in the Detail Type Field and select a new code",
  () => {
    docketFeesAssignmentActions.clickTheDropDownIconInTheDetailTypeFieldAndSelectANewCode();
  }
);

Then(
  "The new code and its details will display in Fees window The Total Fees For This Docket Type will update to reflect the new total Save button becomes enabled",
  () => {
    docketFeesAssignmentActions.theNewCodeAndItsDetailsWillDisplayInFeesWindowTheTotalFeesForThisDocketTypeWillUpdateToReflectTheNewTotalSaveButtonBecomesEnabled();
  }
);

Given("Click the Save button in the Fees window", () => {
  docketFeesAssignmentActions.clickTheSaveButtonInTheFeesWindow();
});

Then("Green noty confirming success Fees window closes", () => {
  docketFeesAssignmentActions.greenNotyConfirmingSuccessFeesWindowCloses();
});

Given(
  "User is a CBS Accounting employee with smc-accounting administration security role. Previous scenario adding a DETC code to a docket code is run",
  () => {
    docketFeesAssignmentActions.userIsACBSAccountingEmployeeWithSmcaccountingAdministrationSecurityRolePreviousScenarioAddingADETCCodeToADocketCodeIsRun();
  }
);

Given(
  "Click the trash can icon next to the DETC code that was added in the previous scenario",
  () => {
    docketFeesAssignmentActions.clickTheTrashCanIconNextToTheDETCCodeThatWasAddedInThePreviousScenario();
  }
);

Then(
  "Pop up stating that this will remove the DETC code from the entire circuit asking the user if they wish to continue",
  () => {
    docketFeesAssignmentActions.popUpStatingThatThisWillRemoveTheDETCCodeFromTheEntireCircuitAskingTheUserIfTheyWishToContinue();
  }
);

Given("Click yes on the pop up", () => {
  docketFeesAssignmentActions.clickYesOnThePopUp();
});

Then(
  "DETC is removed from the Fees Window Total Fees For This Docket Code is updated to reflect the new total Save button becomes enabled",
  () => {
    docketFeesAssignmentActions.dETCIsRemovedFromTheFeesWindowTotalFeesForThisDocketCodeIsUpdatedToReflectTheNewTotalSaveButtonBecomesEnabled();
  }
);

Given("Click Save button in the Fees window", () => {
  docketFeesAssignmentActions.clickSaveButtonInTheFeesWindow();
});

Then("Green noty stating the removal was successful Fees window closes", () => {
  docketFeesAssignmentActions.greenNotyStatingTheRemovalWasSuccessfulFeesWindowCloses();
});
/**
 * display function names in Action class that aren't referenced by the Steps
 */
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(
    DocketFeesAssignmentActions.prototype
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "userIsACBSAccountingEmployeeWithSmcaccountingAdministrationSecurityRole"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "allAvailableCourtLocationsWillAppearInTheFinancialLocationDropDownList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "userSelectsLocation"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketSearchAreaExpands"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "enterPartialDocketCodeWithWildCardSymbolInTheDocketTypeField"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheSearchIcon"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "docketSearchAreaPopulatesWithSearchResults"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "descriptionOfTheDocketCodeAppears"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "statusIndicatesWhetherADocketCodeFilingUpdatesTheStatusOfACase"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "contWhetherADocketCodeFilingRepresentsACourtGrantedContinuanceOfAnEvent"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "dispIndicatesWhetherADocketCodeFilingRepresentsADisposition"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "activityDateIndicatesWhenThisRecordWasCreatedOrUpdated"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "selectADocketCodeFromTheList"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickThePlusNextToTheSelectedDocketCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "rowExpandsToDisplayTheAssociatedDETCCodes"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "clickTheDropDownIconInTheDetailTypeFieldAndSelectANewCode"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "theNewCodeAndItsDetailsWillDisplayInFeesWindowTheTotalFeesForThisDocketTypeWillUpdateToReflectTheNewTotalSaveButtonBecomesEnabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickTheSaveButtonInTheFeesWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "greenNotyConfirmingSuccessFeesWindowCloses"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "userIsACBSAccountingEmployeeWithSmcaccountingAdministrationSecurityRolePreviousScenarioAddingADETCCodeToADocketCodeIsRun"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "clickTheTrashCanIconNextToTheDETCCodeThatWasAddedInThePreviousScenario"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "popUpStatingThatThisWillRemoveTheDETCCodeFromTheEntireCircuitAskingTheUserIfTheyWishToContinue"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickYesOnThePopUp"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !==
      "dETCIsRemovedFromTheFeesWindowTotalFeesForThisDocketCodeIsUpdatedToReflectTheNewTotalSaveButtonBecomesEnabled"
  );
  propertyNames = propertyNames.filter(
    (funcName) => funcName !== "clickSaveButtonInTheFeesWindow"
  );
  propertyNames = propertyNames.filter(
    (funcName) =>
      funcName !== "greenNotyStatingTheRemovalWasSuccessfulFeesWindowCloses"
  );
  cy.writeFile("./differences/DocketFeesAssignmentActions.tmp", propertyNames);
}
