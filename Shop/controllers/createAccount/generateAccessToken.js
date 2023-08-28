const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate access token to log in
function generateAccessToken(data) {
  const maxAge = 24 * 60 * 60;
  return jwt.sign({ data }, process.env.Access_token_secret, {
    expiresIn: maxAge,
  });
}

module.exports = { generateAccessToken };
