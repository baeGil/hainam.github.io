const express = require("express");
const login = require("../middlewares/login");
const signup = require("../middlewares/signup");
const update = require("../middlewares/changePassword");
const reset = require("../middlewares/resetPassword");
const { loginUser } = require("../controllers/createAccount/login.controller");
const {
  createUser,
} = require("../controllers/createAccount/signup.controller");
const {
  deleteCookie,
} = require("../controllers/createAccount/logout.controller");
const {
  changePassword,
} = require("../controllers/createAccount/changePassword.controller");
const {
  resetPassword,
} = require("../controllers/createAccount/resetPassword.controller");
const { sendLink } = require("../controllers/createAccount/sendlink");

const router = express.Router();
router.put(
  "/update",
  update.checkEmpty,
  update.checkUserid,
  update.checkOldPassword,
  update.checkNewPassword,
  changePassword
);
router.get("/logout", deleteCookie);
router.post(
  "/signup",
  signup.checkEmpty,
  signup.checkUserExisted,
  signup.checkData,
  signup.checkPassword,
  createUser
);
router.post(
  "/login",
  login.checkEmpty,
  login.checkUser,
  login.checkPassword,
  loginUser
);
router.post(
  "/:emailToken",
  reset.checkLink,
  reset.checkEmptyResetInput,
  resetPassword
);
router.post("/", reset.checkEmptyEmail, sendLink);
// exports router
module.exports = router;
