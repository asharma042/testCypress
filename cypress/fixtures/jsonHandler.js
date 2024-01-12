module.exports = {
  checkNested(obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return false;
      }
      obj = obj[args[i]];
    }
    return true;
  },
  /**
   *
   * @param {*} category e.g. scenario1
   * @param {*} value e.g. counts
   * @param {*} sub e.g. first
   * @param {*} val e.g drivingSpeed
   * @returns
   */
  getValue: function (category, value, sub, val, gibble) {
    cy.task("getJsonHandlerFile").then(($json) => {
      cy.get("@id").then(($id) => {
        if (gibble) {
          if (this.checkNested($json, $id, category, value, sub, val, gibble)) {
            delete $json[$id][category][value][sub][val][gibble];
          }
        } else if (val) {
          if (this.checkNested($json, $id, category, value, sub, val)) {
            delete $json[$id][category][value][sub][val];
          }
        } else if (sub) {
          if (this.checkNested($json, $id, category, value, sub)) {
            delete $json[$id][category][value][sub];
          }
        } else if (value) {
          if (this.checkNested($json, $id, category, value)) {
            delete $json[$id][category][value];
          }
        }
        cy.task("writeJsonHandlerFile", $json);
      });
    });

    if (gibble) {
      if (globalThis.fixture[category][value][sub][val][gibble] !== undefined) {
        return globalThis.fixture[category][value][sub][val][gibble];
      }
      return undefined;
    }

    if (val) {
      if (globalThis.fixture[category][value][sub][val] !== undefined) {
        return globalThis.fixture[category][value][sub][val];
      }
      return undefined;
    }

    if (sub) {
      if (globalThis.fixture[category][value][sub] !== undefined) {
        return globalThis.fixture[category][value][sub];
      }
      return undefined;
    }

    if (globalThis.fixture[category][value] !== undefined) {
      return globalThis.fixture[category][value];
    }

    let struct = globalThis.fixture[value];

    //replace the value with a default
    for (var key in struct) {
      if (struct[key].startsWith("<") && struct[key].endsWith(">")) {
        let lookupValue = struct[key].slice(1, struct[key].length - 1);
        struct[key] = globalThis.fixture[category][lookupValue];
      }
    }
    return struct;
  },
};
