const bcrypt = require("bcrypt");

async function resetPassword(req, res) {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const hashPassword = bcrypt.hashSync(password, 10);
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      res.json({
        error: "p-error",
        message:
          "Password must contain at least 8 letters with 1 capital and 1 number",
      });
    } else if (password == confirmpassword) {
      req.user.password = hashPassword;
      req.user.emailToken = null;
      await req.user.save();
      console.log("Password reset successfully");
      res.json({ error: false, message: "Password reset successfully" });
    } else {
      res.json({
        error: "c-error",
        message: "The confirmed password did not match",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { resetPassword };
