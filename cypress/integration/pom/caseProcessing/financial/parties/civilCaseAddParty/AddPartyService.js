import Utils from "../../../../../utils/utils";
import currentFunction from "current-function";
import AddPartyActions from "./AddPartyActions";
export default class AddPartyService {
  constructor() {
    this.utils = new Utils();
    this.addPartyActions = new AddPartyActions();
  }

  addParty(
    tempFileName,
    caseObj,
    descriptionCode,
    descriptionMeaning,
    partyCount,
    addressType,
    street,
    city,
    state,
    zip
  ) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.log(`AddPartyService tempFileName: ${tempFileName}`);
    cy.log(`AddPartyService caseObj: ${JSON.stringify(caseObj, null, 2)}`);

    this.addPartyActions.setupCivilCaseAddParty(caseObj.caseId);
    this.addPartyActions.expandCasePartiesSection();
    this.addPartyActions.confirmValidPartyTypes();
    this.addPartyActions.expandAddPartySection();

    this.addPartyActions.enterPartyDescription(
      descriptionCode,
      descriptionMeaning
    );
    this.addPartyActions.codeAndDescriptionDisplayInField(descriptionCode);
    let party = this.utils.getRandomDefendantData();

    if (partyCount === 0) {
      caseObj.parties = [];
    }

    caseObj.parties.push(party);
    cy.log(
      `AddPartyService writeFile ${tempFileName} ${JSON.stringify(
        caseObj,
        null,
        2
      )}`
    );
    cy.writeFile(tempFileName, {
      case: caseObj,
    });

    this.addPartyActions.enterFirstName(party.firstName);
    this.addPartyActions.enterMiddleName(party.middleName);
    this.addPartyActions.enterLastName(party.lastName);

    this.addPartyActions.expandContactInformationSection();

    this.addPartyActions.selectAddressType(addressType);
    this.addPartyActions.enterStreetAddress(street, city, state, zip);
    this.addPartyActions.clickSavePartyToCase();

    this.addPartyActions.styleOfCaseClickProposed();
    this.addPartyActions.clickSave();
    this.addPartyActions.notyDisplaysWithStyleOfCaseIsUpdatedWithNewNeameAndCaseId();
    this.addPartyActions.clickClose();
    this.addPartyActions.popUpCloses();

    this.addPartyActions.newPartyDisplaysInCasePartiesSection(
      party.firstName,
      party.middleName,
      party.lastName
    );
  }
}
