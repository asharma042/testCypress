/**
 * This script will parse a Feature file and
 * create a directory of the name of the file.
 * When Cypress processes a Feature file it looks for
 * a directory of the same name to scope the Steps.
 *
 * This script also generates the Steps, Actions and Elements file
 * which are required to run the Feature
 *
 * The file names will end w/ `temp.js` and overwrite them
 * with each execution
 *
 *
 */
const util = require("./util");
const parser = require("gherkin-parse");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const vm = require("vm");

const FileType = {
  Steps: "steps",
  Actions: "actions",
  Elements: "elements",
  Fixtures: "fixtures",
};
/**
 * Make directory the name of the feature
 * Cypress will resolve steps if names match
 * @param {*} subDir
 * @param {*} file
 * @returns directory that was created
 */
function makeDirectorySameNameAsFeature(file) {
  let fileParts = file.split("\\");
  const fileName = fileParts[fileParts.length - 1].split(".")[0];
  fileParts = fileParts.slice(0, fileParts.length - 1);

  fileParts.push(fileName);

  const dirPath = fileParts.join(path.sep);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  return dirPath;
}

/**
 * imports and declarations for the Steps file
 * @param {*} fileName
 * @returns the string
 */
function stepImports(fixturesPath, fileName) {
  let path = "";
  for (var i = 0; i < fixturesPath.length; i++) {
    path += "../";
  }

  let str = `/// <reference types="cypress" />
import Utils from "${path}utils/utils";
import { After, Before, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
`;
  str += `import ${fileName}Actions from "./${fileName}Actions";\n`;
  str += `const ${util.lowerCaseFirstLetter(
    fileName
  )}Actions = new ${fileName}Actions();`;

  str += `\nBefore(function () {
    var env = Cypress.env("ENV");
    
    propertyNames();

    cy.fixture(\`${fixturesPath.join("/")}/${util.lowerCaseFirstLetter(
    fileName
  )}Fixture_\${env}\`)
      .then((dataFixture) => {
        globalThis.fixture = dataFixture;
        cy.task("getJsonHandlerFile").then(($jsonHandlerFile) => {
          let id = "${util.lowerCaseFirstLetter(fileName)}";
          cy.wrap(id).as("id");
          if ($jsonHandlerFile[id] === undefined) {
            $jsonHandlerFile[id] = dataFixture;
            cy.task("writeJsonHandlerFile", $jsonHandlerFile);
          }
        });
      });
    cy.recordHar({ content: false });
  });
  
  
After(function() {
  cy.logout();

  let scenarioName = testState.pickle.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join("-");

  let env = Cypress.env("ENV");
  let browser = Cypress.browser.name;
  let harsFolder = Cypress.env("hars_folders");

  let harPath = "${fixturesPath.join("/")}";
  let harFileName = \`\${scenarioName}-\${env}-\${browser}.har\`;

  cy.task("createHarsDirectories", \`\${harsFolder}/\${harPath}\`);

  cy.saveHar({
    outDir: \`\${harsFolder}/\${harPath}\`,
    fileName: harFileName,
  });

  let utils = new Utils();
  let hars_folders = Cypress.env("hars_folders");
   
  utils.readRunTimeFile(\`\${harsFolder}/\${harPath}/\${harFileName}\`,
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

        cy.writeFile(\`\${harsFolder}/\${harPath}/\${harFileName}\`, result);
      } catch (e) {
        cy.log(\`error \${e.message}\`);
      }
    }
  });
});`;

  return str;
}
function jsonFileTemplate(env) {
  let str = `{
    "hello": "World ${env}"
}`;
  return str;
}
/**
 * Create the fixtures some directories
 * The json files will contain data for it's environment
 * They are loaded from w/in the Steps file
 */
function buildFixtures(fixturesPath, featureName) {
  let fullPath = [process.cwd(), "cypress", "fixtures"]
    .concat(fixturesPath)
    .join(path.sep);
  mkdirp.sync(fullPath);

  let environments = ["dev", "mv", "test", "uat", "trn"];
  environments.forEach((env) => {
    writeOutFile(
      fullPath,
      `${util.lowerCaseFirstLetter(featureName)}Fixture_${env}`,
      "json",
      jsonFileTemplate(`${env}`),
      FileType.Fixtures
    );
  });
}
/**
 * Imports and class constructor for the Action file
 * @param {*} fileName
 * @returns the string
 */
function actionImports(fixturesPath, fileName) {
  let path = "";
  for (var i = 0; i < fixturesPath.length; i++) {
    path += "../";
  }
  let str = `/// <reference types="cypress" />
  
import Utils from "${path}utils/utils";
import ${fileName}Elements from "./${fileName}Elements";
import jsonHandler  from "../${path}fixtures/jsonHandler";

export default class ${fileName}Actions {
    constructor() {
      this.utils = new Utils();
      this.${util.lowerCaseFirstLetter(fileName)}Elements =
        new ${fileName}Elements();
    }
`;
  return str;
}
function elementImports(fileName) {
  let str = `/// <reference types="cypress" />

export default class ${fileName}Elements {
}
`;
  return str;
}

/**
 * Write the file to the directory
 * If the file does not currently exist, create w/ .js
 * else, temp.js
 * @param {*} dir
 * @param {*} fileName
 * @param {*} str
 */
function writeOutFile(
  dir,
  fileName,
  ext,
  str,
  fileType,
  children = {},
  fixturesPath = []
) {
  if (!fileType) throw new Error("missing fileType");

  //The file path to write to
  const PATH = path.join(dir, fileName + `.${ext}`);

  //Don't overwrite
  let doesFileCurrentlyExist = true;

  if (!fs.existsSync(PATH)) {
    doesFileCurrentlyExist = false;
  }

  switch (fileType) {
    case FileType.Actions:
      //Build up the actions file
      //remove appended "Actions" from filename
      let actions = actionImports(
        fixturesPath,
        fileName.slice(0, -"Actions".length)
      );

      if (doesFileCurrentlyExist) {
        let hasNewFunction = false;
        const currentActions = fs.readFileSync(PATH).toString();
        let map = new Map();
        children.forEach((child) => {
          if (child["type"] === "Scenario") {
            let _steps = child["steps"];

            _steps.forEach((_step, _index) => {
              if (map.get(_step["funcName"])) {
                return;
              }
              map.set(_step["funcName"], true);

              //only add actions when they aren't currently
              if (currentActions.search(`${_step["funcName"]}\\(`) == -1) {
                hasNewFunction = true;
                let options = buildUpOptions(_step);
                actions += "\n    ";
                //If the first _step, then include the scenario name
                if (_index == 0) {
                  actions += `/**
 * Scenario: ${child["name"]}
 */\n`;
                }
                actions += _step["funcName"] + "(" + options + ") {\n";
                actions +=
                  '        throw new Error("missing implementation");\n';
                actions += "    };\n";
              }
            });
            _steps.forEach;
          } //Scenario
        });
        actions += `}\n`;
        if (hasNewFunction) {
          fs.writeFileSync(path.join(dir, fileName + `.temp.${ext}`), actions);
        }
        return;
      }
      //default is to build all functions
      actions = buildActions(children, actions);
      actions += "}\n";
      fs.writeFileSync(PATH, actions);
      break;
    case FileType.Elements:
    case FileType.Fixtures:
      if (doesFileCurrentlyExist) {
        return;
      }
      fs.writeFileSync(PATH, str);
      break;
    case FileType.Steps:
      fs.writeFileSync(PATH, str);
      break;
    default:
      throw new Error(`invalid FileType ${fileType}`);
  }
}

/**
 * Process the Step object and figure out what
 * variables are used or if a DataTable is used
 * @param {*} children
 * @returns
 */
function parseOutVariablesFromSteps(children) {
  const pattern = /".*?"/g;
  children.forEach((child) => {
    if (child["type"] === "Scenario") {
      let _steps = child["steps"];
      _steps.forEach((_step) => {
        let _match = _step["text"];

        let variables = _step["text"].match(/".*?"/g);
        _step["variables"] = variables ?? [];
        _step["match"] = _match;

        if (variables) {
          for (let i = 0; i < variables.length; i++) {
            _match = _match.replace(variables[i], "{string}");
          }
          _step["match"] = _match;
        }

        //Removes everything except alphanumeric characters and whitespace,
        //then collapses multiple adjacent whitespace to single spaces
        let _funcName = _step["match"]
          .replace(/{string}/g, "")
          .replace(/[^\w\s\']|_/g, "")
          .replace(/\s+/g, " ");
        let _funcNameParts = _funcName.split(" ");
        let funcName = "";
        _funcNameParts.forEach((word, index) => {
          if (index == 0) {
            funcName = util.lowerCaseFirstLetter(word);
          } else {
            funcName += util.upperCaseFirstLetter(word);
          }
        });
        _step["funcName"] = funcName;
      });
    }
  });
  return children;
}
/**
 * Build out how many options / paramters the function requires
 * or if there is a DataTable
 * @param {*} _step
 * @returns
 */
function buildUpOptions(_step) {
  let options = "";
  let first = true;
  //Check if there is a datatable
  if (_step["variables"].length == 0) {
    if (_step["argument"] && _step["argument"]["type"] == "DataTable") {
      options = "dataTable";
    }
  } else {
    for (var _opt = 0; _opt < _step["variables"].length; _opt++) {
      if (!first) {
        options += ",";
      }
      first = false;
      options += `option${_opt}`;
    }
  }
  return options;
}

/**
 *
 * @param {*} children
 * @param {*} steps
 * @returns steps
 */
function buildSteps(actionVariableName, children, steps) {
  let map = new Map();
  let propertyNames = `
/**
 * display function names in Action class that aren't referenced by the Steps
*/
function propertyNames() {
  var propertyNames = Object.getOwnPropertyNames(${util.upperCaseFirstLetter(
    actionVariableName
  )}.prototype);
`;

  let previousKey;
  children.forEach((child) => {
    if (child["type"] === "Scenario") {
      let _steps = child["steps"];
      _steps.forEach((_step) => {
        if (map.get(_step["funcName"])) {
          return;
        }
        map.set(_step["funcName"], true);
        if (_step["keyword"].trim() != "And") {
          previousKey = _step["keyword"];
        }

        let options = buildUpOptions(_step);
        steps +=
          "\n\n" +
          previousKey.trim() +
          '("' +
          _step["match"] +
          '",' +
          " (" +
          options +
          ") => { \n";
        steps += "    ";
        propertyNames += `  propertyNames = propertyNames.filter(funcName => funcName !== '${_step["funcName"]}');\n`;
        steps +=
          actionVariableName + "." + _step["funcName"] + "(" + options + ");\n";
        steps += "});";
      });
    }
  });
  propertyNames += `  cy.writeFile('./differences/${util.upperCaseFirstLetter(
    actionVariableName
  )}.tmp', propertyNames);
}`;
  steps += propertyNames;
  return steps;
}

/**
 *
 * @param {*} children
 * @param {*} actions
 * @returns actions
 */
function buildActions(children, actions) {
  let map = new Map();
  children.forEach((child) => {
    if (child["type"] === "Scenario") {
      let _steps = child["steps"];
      _steps.forEach((_step, _index) => {
        if (map.get(_step["funcName"])) {
          return;
        }
        map.set(_step["funcName"], true);
        let options = buildUpOptions(_step);

        //If the first _step, then include the scenario name
        if (_index == 0) {
          actions += `/**
* Scenario: ${child["name"]}
*/`;
        }
        actions += "\n    ";
        actions += _step["funcName"] + "(" + options + ") {\n";
        actions += '        throw new Error("missing implementation");\n';
        actions += "    };\n";
      });
    }
  });
  return actions;
}
module.exports = {
  generateStepsActionsAndElements: function (file) {
    //Create a directory w/ same name so steps can be found
    const stepsPath = makeDirectorySameNameAsFeature(file);

    //Get the breadcrumbs by looking where the Feature file is
    //located.  Want to use the same directory path
    let fixturesPath = stepsPath.split("\\");
    const integrationIndex = fixturesPath.findIndex(
      (element) => element == "integration"
    );
    fixturesPath = fixturesPath.slice(integrationIndex + 1);

    //Parse the Feature
    const obj = parser.convertFeatureFileToJSON(file);
    const feature = obj["feature"];

    //Get the file names ready
    const featureName = feature["name"]
      .replace(/\s/g, "")
      .replace(/[^a-z]/gi, "");
    const featureStepsName = util.lowerCaseFirstLetter(featureName) + "Steps";
    const featureActionsName = featureName + "Actions";
    const featureElementsName = featureName + "Elements";

    const actionVariableName =
      util.lowerCaseFirstLetter(featureName) + "Actions";

    //Build the steps file
    //with imports
    let steps = stepImports(fixturesPath, featureName);

    //Create the 2 environment fixture files
    buildFixtures(fixturesPath, featureName);

    let children = parseOutVariablesFromSteps(feature["children"]);
    steps = buildSteps(actionVariableName, children, steps);

    writeOutFile(stepsPath, featureStepsName, "js", steps, FileType.Steps);

    //Actions are built w/in this method
    writeOutFile(
      stepsPath,
      featureActionsName,
      "js",
      "",
      FileType.Actions,
      children,
      fixturesPath
    );

    let elements = elementImports(featureName);
    writeOutFile(
      stepsPath,
      featureElementsName,
      "js",
      elements,
      FileType.Elements
    );
  },
};
