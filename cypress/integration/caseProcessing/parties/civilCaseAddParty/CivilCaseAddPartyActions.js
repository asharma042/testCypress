/// <reference types="cypress" />
import Utils from "../../../utils/utils";
import CivilCaseAddPartyElements from "./CivilCaseAddPartyElements";
import jsonHandler from "../../../../fixtures/jsonHandler";
import CivilCaseService from "../../../pom/caseProcessing/civil/CivilCaseService";

import AddPartyActions from "../../../pom/caseProcessing/financial/parties/civilCaseAddParty/AddPartyActions";

export default class CivilCaseAddPartyActions {
  constructor() {
    this.utils = new Utils();
    this.civilCaseAddPartyElements = new CivilCaseAddPartyElements();
    this.civilCaseService = new CivilCaseService();

    this.addPartyActions = new AddPartyActions();

    this.case = {};
    this.tempCivilCaseAddPartyFileName =
      "cypress\\temp\\civilCaseAddParty.json";
  }

  readRunTimeFile() {
    var that = this;
    cy.wrap({}).as("case");
    this.utils.readRunTimeFile(
      this.tempCivilCaseAddPartyFileName,
      function ($json) {
        if ($json) {
          that.case = $json.case;
          cy.wrap($json.case).as("case");
        }
      }
    );
  }

  createCivilCase() {
    this.civilCaseService.createCivilCase(
      "scenario1",
      this.tempCivilCaseAddPartyFileName
    );
  }
  /**
   * Start of first add party
   */
  enterCaseID() {
    this.readRunTimeFile();
    this.scenario = "scenario1";
    this.partyCount = 0;
    this.setupCivilCaseAddParty();
  }

  setupCivilCaseAddParty() {
    cy.get("@case").then(($case) => {
      cy.log(`case ${JSON.stringify($case, null, 2)}`);
      this.addPartyActions.setupCivilCaseAddParty($case.caseId);
    });
  }

  expandCasePartiesSection() {
    this.addPartyActions.expandCasePartiesSection();
  }

  confirmValidPartyTypes() {
    this.addPartyActions.confirmValidPartyTypes();
  }

  expandAddPartySection() {
    this.addPartyActions.expandAddPartySection();
  }

  enterPartyDescription() {
    let descriptionCode = jsonHandler.getValue(this.scenario, "parties")[
      this.partyCount
    ]["descriptionCode"];

    //the search doesn't work properly, so try this
    let descriptionMeaning = jsonHandler.getValue(this.scenario, "parties")[
      this.partyCount
    ]["descriptionMeaning"];

    this.addPartyActions.enterPartyDescription(
      descriptionCode,
      descriptionMeaning
    );
  }

  codeAndDescriptionDisplayInField() {
    let descriptionCode = jsonHandler.getValue(this.scenario, "parties")[
      this.partyCount
    ]["descriptionCode"];

    this.addPartyActions.codeAndDescriptionDisplayInField(descriptionCode);
  }

  enterFirstName() {
    let that = this;
    let party = this.utils.getRandomDefendantData();

    cy.get("@case").then(($case) => {
      that.case = $case;

      if (this.partyCount === 0) {
        that.case.parties = [];
      }

      that.case.parties.push(party);

      cy.writeFile(this.tempCivilCaseAddPartyFileName, {
        case: that.case,
      });
      that.addPartyActions.enterFirstName(party.firstName);
    });
  }

  nameDisplays() {
    let firstName = this.case.parties[this.partyCount].firstName;
    this.addPartyActions.nameDisplays(firstName);
  }

  enterMiddleName() {
    let middleName = this.case.parties[this.partyCount].middleName;
    this.addPartyActions.enterMiddleName(middleName);
  }

  middleNameDisplays() {
    let middleName = this.case.parties[this.partyCount].middleName;
    this.addPartyActions.middleNameDisplays(middleName);
  }

  enterLastName() {
    let lastName = this.case.parties[this.partyCount].lastName;
    this.addPartyActions.enterLastName(lastName);
  }

  lastNameDisplays() {
    let lastName = this.case.parties[this.partyCount].lastName;
    this.addPartyActions.lastNameDisplays(lastName);
  }

  startDateDisplaysCurrentDate() {
    this.addPartyActions.startDateDisplaysCurrentDate();
  }

  timeDisplaysCurrentTime() {
    this.addPartyActions.timeDisplaysCurrentTime();
  }

  expandContactInformationSection() {
    this.addPartyActions.expandContactInformationSection();
  }

  statusDisplaysActive() {
    this.addPartyActions.statusDisplaysActive("A");
  }

  selectAddressType() {
    let addressType = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "addressType"
    );

    this.addPartyActions.selectAddressType(addressType);
  }

  addressTypeDisplaysInField() {
    let addressTypeDescription = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "addressTypeDescription"
    );
    this.addPartyActions.addressTypeDisplaysInField(addressTypeDescription);
  }

  enterStreetAddress() {
    let streetAddress = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "street"
    );

    let city = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "city"
    );

    let state = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "state"
    );

    let zip = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "zip"
    );

    this.addPartyActions.enterStreetAddress(streetAddress, city, state, zip);
  }

  streetShouldHaveValue() {
    let streetAddress = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "street"
    );
    this.addPartyActions.streetShouldHaveValue(streetAddress);
  }

  cityShouldHaveValue() {
    let city = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "city"
    );
    this.addPartyActions.cityShouldHaveValue(city);
  }

  stateShouldHaveValue() {
    let state = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "state"
    );
    this.addPartyActions.stateShouldHaveValue(state);
  }

  zipShouldHaveValue() {
    let zip = jsonHandler.getValue(
      this.scenario,
      "parties",
      this.partyCount,
      "zip"
    );
    this.addPartyActions.zipShouldHaveValue(zip);
  }

  nationShouldHaveValue() {
    this.addPartyActions.nationShouldHaveValue();
  }

  clickSavePartyToCase() {
    this.addPartyActions.clickSavePartyToCase();
  }

  partiesStyleOfCasePopUp() {
    let firstName = this.case.parties[this.partyCount].firstName.toUpperCase();
    let mid = this.case.parties[this.partyCount].middleName
      .toUpperCase()
      .charAt(0);
    let lastName = this.case.parties[this.partyCount].lastName.toUpperCase();

    this.addPartyActions.partiesStyleOfCasePopUp(firstName, mid, lastName);
  }

  styleOfCaseClickProposed() {
    this.addPartyActions.styleOfCaseClickProposed();
  }

  partiesStyleOfCasePopUpWithProposedValue() {
    let lastName0 = this.case.parties[0].lastName.toUpperCase();
    let lastName1 = this.case.parties[1].lastName.toUpperCase();

    this.addPartyActions.partiesStyleOfCasePopUpWithProposedValue(
      lastName0,
      lastName1
    );
  }

  clickSave() {
    this.addPartyActions.clickSave();
  }

  clickClose() {
    this.addPartyActions.clickClose();
  }

  caseInformationDisplays() {
    this.addPartyActions.caseInformationDisplays();
  }

  notyDisplaysWithStyleOfCaseIsUpdatedWithNewNeameAndCaseId() {
    this.addPartyActions.notyDisplaysWithStyleOfCaseIsUpdatedWithNewNeameAndCaseId();
  }

  popUpCloses() {
    this.addPartyActions.popUpCloses();
  }

  newPartyDisplaysInCasePartiesSection() {
    let firstName = this.case.parties[this.partyCount].firstName;
    let middleName = this.case.parties[this.partyCount].middleName;
    let lastName = this.case.parties[this.partyCount].lastName;

    this.addPartyActions.newPartyDisplaysInCasePartiesSection(
      firstName,
      middleName,
      lastName
    );
  }
  /**
   * Second party start
   */
  selectCaseIDSearchOption() {
    this.readRunTimeFile();
    this.scenario = "scenario1";
    this.partyCount = 1;
    this.setupCivilCaseAddParty();
  }
}
