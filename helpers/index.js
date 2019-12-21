const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function signNewJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        hashId: user.hashId,
      },
      process.env.JWT_SECRET,
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
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = {
  signNewJWT,
  checkJWT,
  compareHash,
  hash,
  escapeRegex,
};
