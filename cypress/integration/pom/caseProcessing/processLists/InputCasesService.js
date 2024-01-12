import Utils from "../../../utils/utils";
import InputCasesServiceActions from "./InputCasesServiceActions";
import currentFunction from "current-function";

export default class InputCasesService {
  constructor(tempFileName) {
    this.tempFileName = tempFileName;
    this.inputCasesServiceActions = new InputCasesServiceActions();
    this.utils = new Utils();
  }
  /**
   *
   * @param {*} processListName the name used to wrap
   * @param {*} arrayOfCaseIds
   */
  createProcessList(processListName, arrayOfCaseIds) {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.inputCasesServiceActions.clickOnProcessListsFromCaseProcessing();
    this.inputCasesServiceActions.clickOnInputCasesFromMenu();
    this.inputCasesServiceActions.enterCaseIds(arrayOfCaseIds);
    this.inputCasesServiceActions.pressMultiUseListButton();
    this.inputCasesServiceActions.enterListName(processListName);
    this.inputCasesServiceActions.pressSaveButton();
    this.inputCasesServiceActions.closeTab();
    this.inputCasesServiceActions.closeExitFromProcessListWindow();
  }

  addDocketEntry() {
    cy.log(
      `---------------------------------------------------${currentFunction()}`
    );
    this.inputCasesServiceActions.aAddDocketWindowShouldDisplay();
    this.inputCasesServiceActions.enterADocketDescriptionAndPressEnter();
    this.inputCasesServiceActions.theDocketCodeShouldGenerateAndAdditonalDocketDataSectionShouldAppear();
    this.inputCasesServiceActions.enterTheUnsecuredBondAmount();
    this.inputCasesServiceActions.theAmountWillAppearInTheFieldAndTheDescriptionAndTheAmountWillAppearInSearch();
    this.inputCasesServiceActions.enterAFiliningPartyFromTheDropDown();
    this.inputCasesServiceActions.verifyIfTheDocketDateAutogenerates();
    this.inputCasesServiceActions.verifyIfDocketTimeDisplays();
    this.inputCasesServiceActions.clickOnBrowseButton();
    this.inputCasesServiceActions.theFileWillUploadAndFileIconWillAppear();
    this.inputCasesServiceActions.clickOnSaveApplyToALL();
    this.inputCasesServiceActions.greenNotyWillAppear();
  }
}
