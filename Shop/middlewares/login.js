const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// check Username
async function checkUser(req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Username doesn't exist" });
    } else {
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

// check Password
async function checkPassword(req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res
        .status(400)
        .json({ error: true, message: "Incorrect password" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

function checkEmpty(req, res, next) {
  const Username = req.body.username;
  const Password = req.body.password;
  try {
    if (Username === "") {
      return res
        .status(402)
        .json({ error: "u-error", message: "Username cannot be empty" });
    }
    if (Password === "") {
      return res
        .status(402)
        .json({ error: "p-error", message: "Password cannot be empty" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

const login = { checkUser, checkPassword, checkEmpty };
module.exports = login;
