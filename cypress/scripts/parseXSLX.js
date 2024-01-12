const util = require("./util");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const JIRA = "JIRA/Component";
const BREADCRUMBS = "Breadcrumbs";
const SCENARIO = "Test Scenario";
const PRECONDITION = "Precondition";
const TEST_STEPS = "Test Steps";
const EXPECTED_RESULTS = "Expected Results";

let featureFile = "";
let _featureName = "";
let _breadcrumbsArr = "";
let _feature = "";
let _background = "";
let _scenario = "";
let _testSteps = "";

let _firstPrecondition = true;
let _firstTestStep = true;
let _firstExpectedResults = true;

/**
 * Write the file to disk.
 * @param {} file - name of file
 * @param {*} data - the string
 */
function writeFile(file, data) {
  try {
    fs.writeFileSync(file, data);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Parse the XSLX file and return Map of <sheet
 * @param {*} fileName
 * @returns
 */
function convertExcelFileToJsonUsingXlsx(fileName, sheetName) {
  // Read the file using pathname
  const file = xlsx.readFile(fileName);
  // Grab the sheet info from the file
  let sheetNames = file.SheetNames;

  let sheetMap = new Map();

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
    let tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);

    let index = tempData.findIndex((element, index) => {
      return (
        element.hasOwnProperty(TEST_STEPS) && element[TEST_STEPS] === "STOP"
      );
    });

    if (index > -1) {
      tempData = tempData.slice(0, index);
    }

    parsedData = [];
    // Add the sheet's json to our data array
    parsedData.push(...tempData);
    sheetMap.set(sheetNames[i], parsedData);
  }
  return sheetMap;
}

/**
 * We want only one feature per XSLX
 */
function finishFeature() {
  if (featureFile == "") {
    featureFile = _feature;
  }
  featureFile += _scenario + _background + _testSteps;
  featureFile.trim();
}
/**
 * Reset the variables
 */
function clearEverything() {
  _background = "";
  _scenario = "";
  _testSteps = "";
  _firstPrecondition = true;
  _firstTestStep = true;
  _firstExpectedResults = true;
}
/**
 * prepare navigation path
 * @param {*} obj
 */
function breadcrumbs(obj) {
  if (obj.hasOwnProperty(BREADCRUMBS)) {
    _breadcrumbsArr = obj[BREADCRUMBS].split("/");
    _breadcrumbsArr = _breadcrumbsArr.map((ele) => {
      return util.lowerCaseFirstLetter(ele.trim()).replace(/\s/g, "");
    });
  }
}
/**
 * When a new JIRA is found we
 * start a feature.
 * There should be only one
 * feature in the file
 * @param {} obj
 */
function JIRA_Component(obj) {
  if (obj.hasOwnProperty(JIRA)) {
    _feature = `Feature: ${obj[JIRA]}\n`;

    //Turn this: Aged Trial Balance Report
    //to this:   agedTrialBalanceReport
    _featureName = util.lowerCaseFirstLetter(
      obj[JIRA].replace(/[^a-z\s]/gi, "")
        .split(" ")
        .filter((element) => {
          return element != "";
        })
        .map((element) => {
          return util.upperCaseFirstLetter(element);
        })
        .join("")
    );
    console.log(_featureName);
  }
}
/**
 * Not doing Cucumber Background but
 * rather just prefix them to steps
 * @param {} obj
 */
function preCondition(obj) {
  if (obj.hasOwnProperty(PRECONDITION)) {
    _background += _firstPrecondition ? "#Precodition\n" : "";
    _background += _firstPrecondition ? "Given" : "And";
    _background += ` ${obj[PRECONDITION].replace(/\n|\r/g, "")}\n`;
    _firstPrecondition = false;
  }
}
/**
 * Found a new Scenario - grab the title
 * @param {} obj
 */
function scenario(obj) {
  if (obj.hasOwnProperty(SCENARIO)) {
    if (_scenario != "") {
      finishFeature();
      clearEverything();
    }
    _scenario = `Scenario: ${obj[SCENARIO].replace(/\n|\r/g, "")}\n`;
  }
}
/**
 * Process each step
 * a left Paren is a comment
 * All test steps are given
 * @param {} obj
 */
function testSteps(obj) {
  if (obj.hasOwnProperty(TEST_STEPS)) {
    //remove puncuation
    var punctuationless = obj[TEST_STEPS].replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()\']/g,
      ""
    );

    //Reduce multiple spaces to single
    var finalString = punctuationless.replace(/\s{2,}/g, " ");

    _testSteps += _firstTestStep ? "#Test steps\n" : "";
    _testSteps += _firstTestStep ? "Given" : "And";
    _testSteps += ` ${finalString.replace(/\n|\r/g, "")}\n`;

    _firstTestStep = false;
    _firstExpectedResults = true;
  }
}
/**
 * All the expected results will be "Then"
 * @param {*} obj
 */
function expectedResults(obj) {
  if (obj.hasOwnProperty(EXPECTED_RESULTS)) {
    _testSteps += _firstExpectedResults ? "#Expected results\n" : "";
    _testSteps += _firstExpectedResults ? "Then" : "And";

    //Remove punctuation
    var punctuationless = obj[EXPECTED_RESULTS].replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      " "
    );
    //Reduce multiple spaces to single
    var finalString = punctuationless.replace(/\s{2,}/g, " ");

    _testSteps += ` ${finalString.replace(/\n|\r/g, "")}\n`;
    _firstExpectedResults = false;
    _firstPrecondition = true;
    _firstTestStep = true;
  }
}
function trimStringOrReturnValue(value) {
  // do not include breadcrum value - ignored using match function example: caseProcessing/Crimial
  if (
    typeof value === "string" &&
    !value.match(
      /(\w+|\w+\s+|\s+\w+|\s+\w+\s+)\/(\w+|\w+\s+|\s+\w+|\s+\w+\s+)/gm
    )
  ) {
    //remove puncuation
    value = value.replace(/[\d.,\/#!$%\^&\*;:{}=\"\-_`~()\'\[\]]/g, "");
    //Reduce multiple spaces to single
    value = value.replace(/\s{2,}/g, " ");
    //remove carriage return and line feed
    value = value.replace(/\n|\r/g, "");
    return value.trim();
  }
  return value;
}
module.exports = {
  /**
   * Process all the sheets
   * @param {*} fileName
   * @param {*} sheetName
   * @returns array of features filepaths
   */
  generateFeature: function (fileName, sheetName) {
    /**
     * Build the Feature Gherkin file
     */
    let fileNames = [];
    let sheetMap = convertExcelFileToJsonUsingXlsx(fileName, sheetName);
    console.log(sheetMap);

    for (let sheet of sheetMap.keys()) {
      let parsedData = sheetMap.get(sheet);

      for (var row = 0; row < parsedData.length; row++) {
        let obj = parsedData[row];
        //Trim the keys of the object
        obj = Object.entries(obj).reduce((acc, curr) => {
          let [key, value] = curr;
          // Checking if the key is a string
          //replace trailing asterick
          key = key.replace("*", "");
          acc[trimStringOrReturnValue(key)] = trimStringOrReturnValue(value);
          return acc;
        }, {});
        breadcrumbs(obj);
        JIRA_Component(obj);
        scenario(obj);
        preCondition(obj);
        testSteps(obj);
        expectedResults(obj);
      }

      finishFeature();

      //Create a subdirectory to hold the feature file using
      //the breadcrumbs
      let fullPath = [process.cwd(), "cypress", "integration"]
        .concat(_breadcrumbsArr)
        .join(path.sep);
      mkdirp.sync(fullPath);

      //The features go into the integration directory
      //Maybe make subdirectories to mirror business entities
      let featureNameFilePath = path.resolve(
        fullPath,
        _featureName + ".feature"
      );

      writeFile(featureNameFilePath, featureFile);
      fileNames.push(featureNameFilePath);
      featureFile = "";
      _featureName = "";
      _breadcrumbsArr = "";
      _feature = "";
      _background = "";
      _scenario = "";
      _testSteps = "";
    }
    return fileNames;
  },
};
