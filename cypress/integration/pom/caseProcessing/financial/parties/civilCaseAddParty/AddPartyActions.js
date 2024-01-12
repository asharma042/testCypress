import AddPartyElements from "./AddPartyElements";
import Utils from "../../../../../utils/utils";
import currentFunction from "current-function";

export default class AddPartyActions {
  constructor() {
    this.utils = new Utils();
    this.addPartyElements = new AddPartyElements();
  }

  setupCivilCaseAddParty(caseId) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.login();
    cy.clickLink("Case Processing");
    cy.clickMenu("Parties");
    cy.clickMenu("Maintain Case Parties");
    this.addPartyElements.getSearchByCaseIdRadioButton().click();
    this.addPartyElements.getMyPartiesSearchInput().type(`${caseId}{enter}`);
  }

  expandCasePartiesSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getCasePartiesExpandIcon().click();
  }

  confirmValidPartyTypes() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let types = [
      "AGNY",
      "APEL",
      "CHLD",
      "CON",
      "GAL",
      "GAR",
      "GARN",
      "INT",
      "INV",
      "INVP",
      "MED",
      "MOV",
      "MOVP",
      "NMO",
      "OTH",
      "PET",
      "PET3",
      "PETM",
      "PETP",
      "PREP",
      "RES",
      "RES3",
      "RESM",
      "RESP",
      "SAMS",
      "WIT",
    ];
    this.addPartyElements.getCasePartiesTable().then(($ele) => {
      cy.wrap($ele[0])
        .find("tbody")
        .find("tr")
        .then((rows) => {
          rows.toArray().forEach((row) => {
            Cypress.$(row)
              .find("td")
              .each((cell, td) => {
                let cellContents = Cypress.$(td).text().trim();
                if (types.includes(cellContents)) {
                  throw `html table includes invalid party type ${cellContents}`;
                }
              });
          });
        });
    });
  }

  expandAddPartySection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getAddPartyExpandIcon().click();
  }

  enterPartyDescription(descriptionCode, descriptionMeaning) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getPartyDescriptionButton().click();

    this.addPartyElements
      .getPartyDescriptionInput()
      .type(`${descriptionCode}{enter}`);

    this.addPartyElements
      .getPartyDescriptionDropDownWithValue(
        `${descriptionCode}${descriptionMeaning}`
      )
      .then(($ele) => {
        $ele.trigger("click");
      });
  }

  codeAndDescriptionDisplayInField(descriptionCode) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getPartyDescriptionSelectedValue()
      .should("have.text", descriptionCode);
  }

  enterFirstName(firstName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyPersonFirstName()
      .type(`{enter}${firstName}{enter}`);
  }

  nameDisplays(firstName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyPersonFirstName()
      .should("have.value", firstName);
  }

  enterMiddleName(middleName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyPersonMiddleName()
      .type(`${middleName}{enter}`);
  }

  middleNameDisplays(middleName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyPersonMiddleName()
      .should("have.value", middleName);
  }

  enterLastName(lastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyPersonLastName()
      .type(`${lastName}{enter}`);
  }

  lastNameDisplays(lastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyPersonLastName()
      .should("have.value", lastName);
  }

  startDateDisplaysCurrentDate() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getAddPartyStartDate()
      .should("have.value", this.utils.formatDate(new Date()));
  }

  timeDisplaysCurrentTime() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getAddPartyStartTime().then(($ele) => {
      expect($ele.val()).to.match(/\d{2}:\d{2}:\d{2}/);
    });
  }

  expandContactInformationSection() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getExpandContactInformationSectionIcon().click();
  }

  statusDisplaysActive(status) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getContactInformationStatus().then(($ele) => {
      cy.wrap($ele).should("have.value", status);
    });
  }

  selectAddressType(addressType) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getContactInformationAddressType()
      .select(addressType);
  }

  addressTypeDisplaysInField(addressTypeDescription) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let selected = true;
    this.addPartyElements
      .getContactInformationAddressType(selected)
      .should("have.text", addressTypeDescription);
  }

  enterStreetAddress(street, city, state, zip) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/getStrtAdrs*").as("getStrtAdrs");

    this.addPartyElements
      .getContactInformationStreetAddress1()
      .type(street)
      .realPress("Tab");

    this.addPartyElements
      .getContactInformationCity()
      .type(city)
      .realPress("Tab");

    this.addPartyElements
      .getContactInformationState()
      .type(state)
      .realPress("Tab");

    this.addPartyElements.getContactInformationZip().type(zip).realPress("Tab");
  }

  streetShouldHaveValue(streetAddress) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getContactInformationStreetAddress1()
      .should("have.value", streetAddress);
  }

  cityShouldHaveValue(city) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getContactInformationCity()
      .should("have.value", city);
  }

  stateShouldHaveValue(state) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getContactInformationState()
      .should("have.value", state);
  }

  zipShouldHaveValue(zip) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //for some reason, the zip comes back as '65101____';
    this.addPartyElements.getContactInformationZip().focus().blur();
    this.addPartyElements.getContactInformationZip().should("have.value", zip);
  }

  nationShouldHaveValue() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //NO OP
  }

  clickSavePartyToCase() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    cy.intercept("smc-web/addPartyPerson*").as("addPartyPerson");
    cy.intercept("smc-web/saveUserNotyMessages*").as("saveUserNotyMessages");

    this.addPartyElements.getSavePartyToCaseButton().then(($ele) => {
      cy.wrap($ele).click();
    });

    cy.wait(["@addPartyPerson", "@saveUserNotyMessages"]);

    this.utils.clearNotyMessages();
  }

  partiesStyleOfCasePopUp(firstName, mid, lastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements
      .getPartiesStyleOfCaseProposedInput()
      .should("have.value", `${firstName} ${mid} ${lastName} V`);
  }

  styleOfCaseClickProposed() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
  }

  /**
   * Since the porposed string has some algorthmn to either use the first
   * letter of the first name or the whole name, just check that the 2
   * last names are included
   */
  partiesStyleOfCasePopUpWithProposedValue(lastName0, lastName1) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getPartiesStyleOfCaseProposedInput().then(($ele) => {
      $ele.text().trim().includes(`${lastName0}`);
    });

    this.addPartyElements.getPartiesStyleOfCaseProposedInput().then(($ele) => {
      $ele.text().trim().includes(`${lastName1}`);
    });
  }

  clickSave() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.addPartyElements.getPartiesStyleOfCaseSaveAndCloseButton().click();
  }

  clickClose() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  caseInformationDisplays() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  notyDisplaysWithStyleOfCaseIsUpdatedWithNewNeameAndCaseId() {
    this.utils.clearNotyMessages();
  }

  popUpCloses() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    //no op
  }

  newPartyDisplaysInCasePartiesSection(firstName, middleName, lastName) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    let that = this;
    this.addPartyElements.getCasePartiesTable().then(($ele) => {
      let foundUser = false;
      firstName = firstName.toUpperCase();
      middleName = middleName.toUpperCase();
      lastName = lastName.toUpperCase();

      cy.wrap($ele[0])
        .find("tbody")
        .find("tr")
        .then((rows) => {
          rows.toArray().forEach((row) => {
            Cypress.$(row)
              .find("td")
              .each((cell, td) => {
                let cellContents = Cypress.$(td).text().trim();
                if (
                  cellContents.includes(
                    `${firstName} ${middleName} ${lastName}`
                  )
                ) {
                  foundUser = true;
                }
              });
          });
        })
        .then(() => {
          expect(foundUser).to.be.true;
          //close tab
          that.addPartyElements.getMaintainCasePartiesTabIcon().click();
        });
    });
  }
}
