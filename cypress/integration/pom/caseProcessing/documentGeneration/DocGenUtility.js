export default class DocGenUtility {
  constructor() {}

  waitForDownload(time = 0, dirName, extension, callback) {
    cy.task("readFirstFileInDir", {
      dirName: dirName,
      extension: extension,
    }).then(($fileName) => {
      if (!$fileName) {
        if (time > 15) {
          throw new Error(`waitForDownload failed to succeed in 15`);
        }
        cy.log("waitForDownload time: ${time}");
        cy.wait(1000);
        this.waitForDownload(time++, dirName, extension, callback);
      } else {
        callback($fileName);
      }
    });
  }

  validate(taskName, obj) {
    cy.task(taskName, obj).then(($results) => {
      let keys = Object.keys($results);
      for (let key = 0; key < keys.length; key++) {
        let keyName = keys[key];
        let value = $results[keyName].value;
        let result = $results[keyName].result;
        expect(
          result === true,
          `Expected ${keyName}: ${value} to be found in doc but it was not`
        ).to.be.true;
      } //for
    }); //results
  }
}
