const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

function checkLink(req, res, next) {
  const Token = req.params.emailToken;
  if (Token) {
    jwt.verify(
      Token,
      process.env.Access_token_secret,
      async (err, decodedToken) => {
        if (err) {
          res.json({ error: "c-error", message: "Expired link" });
        } else {
          const user = await User.findOne({
            where: {
              emailToken: Token,
            },
          });
          if (!user)
            return res.json({ error: "c-error", message: "Invalid link" });
          req.user = user;
          next();
        }
      }
    );
  } else {
    res.json({ error: "c-error", message: "Invalid/Expired link" });
  }
}

function checkEmptyEmail(req, res, next) {
  const email = req.body.email;
  try {
    if (email === "") {
      return res
        .status(402)
        .json({ error: true, message: "Your email can not be empty" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}
function checkEmptyResetInput(req, res, next) {
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  try {
    if (password === "") {
      return res
        .status(402)
        .json({ error: "p-error", message: "Password can not be empty" });
    }
    if (confirmpassword === "") {
      return res
        .status(402)
        .json({ error: "c-error", message: "Confirm your password" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}
const reset = {
  checkLink,
  checkEmptyEmail,
  checkEmptyResetInput,
};
module.exports = reset;
