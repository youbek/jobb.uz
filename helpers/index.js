const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { privateKey } = require("../env");

function signNewJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        hashId: user.hashId,
      },
      privateKey,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      },
    );
  });
}

function checkJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) reject(null);

      resolve(decoded);
    });
  });
}

function compareHash(unHashed, hashed) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(unHashed, hashed, (err, comparison) => {
      if (err) reject(null);

      resolve(comparison);
    });
  });
}

function hash(strToHash) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(strToHash, 10, (err, hash) => {
      if (err) reject(err);

      resolve(hash);
    });
  });
}

module.exports = {
  signNewJWT,
  checkJWT,
  compareHash,
  hash,
};
