const parseXSLX = require("./parseXSLX");
const parseFeature = require("./parseFeature");

const path = require("path");

const remoteXLSFile = process.argv[2];

const localXLSFile = process.argv[3];

const sheetName = process.argv[4];

async function downloadFile(cmd) {
  try {
    console.log(process.argv);
    require("child_process").execSync(cmd);
    var fileNamePaths = parseXSLX.generateFeature(localXLSFile, sheetName);
    fileNamePaths.forEach((fileNamePath) => {
      parseFeature.generateStepsActionsAndElements(fileNamePath);
    });
  } catch (e) {
    console.log(e);
  }
}

downloadFile(`curl -o ${localXLSFile} ${remoteXLSFile}`);

console.log("done");
