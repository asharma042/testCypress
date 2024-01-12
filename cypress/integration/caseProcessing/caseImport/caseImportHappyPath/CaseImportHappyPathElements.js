/// <reference types="cypress" />
export default class CaseImportHappyPathElements {
  runPaPortalJob() {
    return cy
      .get("td")
      .contains("nacaACCAcceptanceJob")
      .find("span")
      .contains("run now");
  }
}
