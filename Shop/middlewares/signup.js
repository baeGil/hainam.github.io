const User = require("../models/user.model");

// check confirm password
function checkPassword(req, res, next) {
  const confirmPassword = req.body.confirmPassword;
  const password = req.body.password;
  if (confirmPassword !== password) {
    return res
      .status(403)
      .json({ error: "c-error", message: "Confirmed password did not match" });
  }
  next();
}
// kiem tra password va email
function checkData(req, res, next) {
  const Email = req.body.email;
  const Password = req.body.password;
  try {
    if (
      !Password.match(
        // Tối thiểu 8 ký tự, ít nhất một chữ cái in hoa, một số và một chữ in thường
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      )
    ) {
      return res.status(402).json({
        error: "p-error",
        message:
          "Password must contain at least 8 letters with 1 capital and 1 number",
      });
    }
    if (!Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return res
        .status(402)
        .json({ error: "e-error", message: "Email is not in correct format" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

// Kiem tra input co empty khong
function checkEmpty(req, res, next) {
  const Username = req.body.username;
  const Password = req.body.password;
  const Email = req.body.email;
  const confirmPassword = req.body.confirmPassword;
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
    if (confirmPassword === "") {
      return res
        .status(402)
        .json({ error: "c-error", message: "Confirm your password" });
    }
    if (Email === "") {
      return res
        .status(402)
        .json({ error: "e-error", message: "Email cannot be empty" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

// kiem tra xem username da ton tai chua
async function checkUserExisted(req, res, next) {
  const { username, password, email, role } = req.body;
  try {
    const data1 = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const data2 = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (data1 || data2) {
      return res.status(402).json({
        error: "u-error",
        message: "Username or email is already existed",
      });
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

const signup = { checkUserExisted, checkEmpty, checkData, checkPassword };
module.exports = signup;
