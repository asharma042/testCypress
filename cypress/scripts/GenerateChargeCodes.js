/// <reference types="cypress" />
const xlsx = require("xlsx");
const fs = require("fs");

class GenerateChargeCodes {
  constructor() {
    this.tempFileName = "cypress\\temp\\chargeCodeGenerator.json";
    this.chargeCodes = "\\cypress\\temp\\chargecodes.xls";
    this.fixtureFile =
      "cypress\\fixtures\\caseProcessing\\financial\\chargeCodeCaseGenerator\\chargeCodeCaseGeneratorFixture.json";
    this.featureFile =
      "cypress\\integration\\caseProcessing\\financial\\chargeCodeCaseGenerator.feature";
    this.stepsFile =
      "cypress\\integration\\caseProcessing\\financial\\chargeCodeCaseGenerator\\Steps.js";
  }
  convertExcelFileToJsonUsingXlsx(obj) {
    const fileName = `${process.cwd()}${obj.fileName}`;

    const sheetName = obj.sheetName;
    // Read the file using pathname
    const file = xlsx.readFile(fileName);

    // Grab the sheet info from the file
    let sheetNames = file.SheetNames;

    let sheetMap = {};

    if (sheetName) {
      if (!file.SheetNames.includes(sheetName)) {
        throw new Error(
          `sheetName ${sheetName} is not found in Excel spreadsheet`
        );
      }
      sheetNames = [sheetName];
    }
    // Variable to store our data
    let parsedData = [];
    // Loop through sheets
    for (let i = 0; i < sheetNames.length; i++) {
      // Convert to json using xlsx
      const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
      parsedData = [];
      // Add the sheet's json to our data array
      parsedData.push(...tempData);
      sheetMap[sheetNames[i]] = parsedData;
    }
    fs.writeFileSync(this.fixtureFile, `${JSON.stringify(sheetMap, null, 2)}`);
    return sheetMap;
  }

  runCurlCommand(obj) {
    const outputFile = obj.outputFile;
    const remoteURL = obj.remoteURL;
    const cmd = `curl -o ${process.cwd()}${outputFile} ${remoteURL}`;
    require("child_process").execSync(cmd);
    return null;
  }

  downloadFile(outputFile, remoteURL) {
    try {
      this.runCurlCommand({ outputFile, remoteURL });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Scenario: Generate cases
   */
  downloadChargeCodeSpreadsheet() {
    this.downloadFile(
      this.chargeCodes,
      `https://intra/confluence/download/attachments/341180779/ChargeCodes.xlsx?api=v2`
    );

    const map = this.convertExcelFileToJsonUsingXlsx({
      fileName: this.chargeCodes,
      sheetName: "",
    });

    let env = process.argv[2];
    let rows = map[env];

    let steps =
      "import {Given} from '@badeball/cypress-cucumber-preprocessor';\n";
    steps += `import ChargeCodeCaseGeneratorActions from "./ChargeCodeCaseGeneratorActions";\n`;
    steps += `const chargeCodeCaseGeneratorActions = new ChargeCodeCaseGeneratorActions();\n`;

    let feature = "@chargecode\n";
    feature += "Feature: Charge Code Case Generator\n";
    for (let row = 0; row < rows.length; row++) {
      feature += `Scenario: Generate case ${row}\n`;
      feature += `Given Process json files and create case ${row}\n`;

      steps += `Given("Process json files and create case ${row}", () => { \n`;
      steps += `chargeCodeCaseGeneratorActions.processJsonFilesAndCreateCases(globalThis.obj);\n`;
      steps += `})\n`;
    }
    fs.writeFileSync(this.featureFile, feature);
    fs.writeFileSync(this.stepsFile, steps);
  }
}
module.exports = GenerateChargeCodes;
let foo = new GenerateChargeCodes();
foo.downloadChargeCodeSpreadsheet();
