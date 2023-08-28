require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

function checkEmpty(req, res, next) {
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  try {
    if (password === "") {
      return res
        .status(402)
        .json({ error: "p-error", message: "Password cannot be empty" });
    }
    if (newPassword === "") {
      return res
        .status(402)
        .json({ error: "n-error", message: "New password cannot be empty" });
    }

    if (confirmPassword === "") {
      return res
        .status(402)
        .json({ error: "c-error", message: "Confirm your password" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

function checkUserid(req, res, next) {
  const Token = req.cookies.jwt;
  // const Token = Object.values(JSON.parse(localStorage.getItem("user")))[3];
  console.log(Token);
  if (Token) {
    jwt.verify(
      Token,
      process.env.Access_token_secret,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.rediret("/home");
        } else {
          const user = await User.findOne({
            where: {
              userId: decodedToken.id,
            },
          });
          req.user = user;
          next();
        }
      }
    );
  } else {
    res.redirect("/home");
  }
}

async function checkNewPassword(req, res, next) {
  const newPassword = req.body.newPassword;
  try {
    const validNewPassword = await bcrypt.compare(
      newPassword,
      req.user1.password
    );
    if (!validNewPassword) {
      req.user2 = req.user1;
      next();
    } else {
      return res.json({
        error: "n-error",
        message: "New password must be different from the old one",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function checkOldPassword(req, res, next) {
  const password = req.body.password;
  try {
    const validOldPassword = await bcrypt.compare(password, req.user.password);
    if (validOldPassword) {
      req.user1 = req.user;
      next();
    } else {
      return res.json({ error: "p-error", message: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
  }
}
const update = { checkUserid, checkEmpty, checkOldPassword, checkNewPassword };
module.exports = update;
