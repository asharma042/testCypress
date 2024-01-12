export default class Common {
  constructor() {}

  /**
   * Run task to read file and pass to callBackFunction
   * @param {*} tempFileName
   * @param {*} callBackFunction
   */
  readRunTimeFile(tempFileName, callBackFunction) {
    cy.task("readFileMaybe", tempFileName).then(($json) => {
      callBackFunction($json);
    });
  }

  /**
   * Run task to write file
   * @param {*} fileName
   * @param {*} text
   */
  writeFile(fileName, text) {
    cy.task("writeFile", { fileName, text });
  }

  appendToFile(fileName, line) {
    cy.task("appendToFile", { fileName, line });
  }
}
