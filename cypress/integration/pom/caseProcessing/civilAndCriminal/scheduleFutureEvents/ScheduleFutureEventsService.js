import ScheduleFutureEventsActions from "./ScheduleFutureEventsActions";
import currentFunction from "current-function";
export default class ScheduleFutureEventsService {
  constructor(jsonFileName) {
    if (!jsonFileName) {
      throw new Error("missing jsonFileName in constructor");
    }

    this.jsonFileName = jsonFileName;
    this.sfea = new ScheduleFutureEventsActions(this.jsonFileName);
  }

  createFutureEvent(scenario, daysFromNow) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.log(`ScheduleFutureEventService jsonFileName: ${this.jsonFileName}`);
    this.sfea.continueWithCivilCaseWithLitigantPartyTypes();
    this.sfea.clickOnCaseProcessing();
    this.sfea.clickOnScheduling();
    this.sfea.caseIDRadioButtonIsSelected();
    this.sfea.enterCaseIDInMyCaseIDSearch();
    this.sfea.clickMagnifyingGlassIcon();
    this.sfea.casesDisplayInTheCasesSection();
    this.sfea.clickToExpandCaseInformtion();
    this.sfea.expandAddEventSection();
    this.sfea.enterEventDescription(scenario);
    this.sfea.cREVDisplaysInEventDescriptionField(scenario);
    this.sfea.enterEventDate(daysFromNow);
    this.sfea.displaysInDateField();
    this.sfea.enterTime();
    this.sfea.displaysInTimeField();
    this.sfea.addToDocketTextBoxIsChecked();
    this.sfea.docketFilingDateDisplaysCurrentDate();
    this.sfea.docketTimeDisplaysCurrentTime();
    this.sfea.confirmCheckBoxIsChecked();
    this.sfea.displaysAssignedJudge(scenario);
    this.sfea.enterRoom(scenario);
    this.sfea.roomDisplaysLocationForJudge(scenario);
    this.sfea.locationDisplaysAKCarter(scenario);
    this.sfea.clickSaveEventInformationButton();
    this.sfea.notyDisplaysSuccessMessage();
  }
}
