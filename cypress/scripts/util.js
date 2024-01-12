/**
 *
 * @param {*} word
 * @returns the same word w/ the first letter upper cased
 */
function upperCaseFirstLetter(word) {
  return word.replace(/^./, (str) => str.toUpperCase());
}

/**
 *
 * @param {*} word
 * @returns same word w/ first letter lower cased
 */
function lowerCaseFirstLetter(word) {
  return word.replace(/^./, (str) => str.toLowerCase());
}

module.exports = { upperCaseFirstLetter, lowerCaseFirstLetter };
