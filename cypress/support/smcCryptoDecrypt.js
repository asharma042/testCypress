// we have to know all of these properties before calling the encryption method
const hash = "SHA-256";
const salt = "SALT";
const password = "PASSWORD";
const iteratrions = 1000;
const keyLength = 48;

async function getDerivation(hash, salt, password, iterations, keyLength) {
  const textEncoder = new TextEncoder("utf-8");
  const passwordBuffer = textEncoder.encode(password);
  const importedKey = await globalThis.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const saltBuffer = textEncoder.encode(salt);
  const params = {
    name: "PBKDF2",
    hash: hash,
    salt: saltBuffer,
    iterations: iterations,
  };
  const derivation = await globalThis.crypto.subtle.deriveBits(
    params,
    importedKey,
    keyLength * 8
  );
  return derivation;
}

async function getKey(derivation) {
  const ivlen = 16;
  const keylen = 32;
  const derivedKey = derivation.slice(0, keylen);
  const iv = derivation.slice(keylen);
  const importedEncryptionKey = await globalThis.crypto.subtle.importKey(
    "raw",
    derivedKey,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
  return {
    key: importedEncryptionKey,
    iv: iv,
  };
}

async function decrypt(encryptedText, keyObject) {
  const textDecoder = new TextDecoder("utf-8");
  const decryptedText = await globalThis.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: keyObject.iv },
    keyObject.key,
    encryptedText
  );
  return textDecoder.decode(decryptedText);
}

async function decryptData(encryptedObject) {
  const derivation = await getDerivation(
    hash,
    salt,
    password,
    iteratrions,
    keyLength
  );
  const keyObject = await getKey(derivation);
  const decryptedObject = await decrypt(encryptedObject, keyObject);
  return decryptedObject;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
module.exports = { str2ab, decryptData };
