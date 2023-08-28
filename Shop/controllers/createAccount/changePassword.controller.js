const bcrypt = require("bcrypt");

async function changePassword(req, res) {
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  try {
    const hashNewPassword = bcrypt.hashSync(newPassword, 10);
    if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      res.json({
        error: "n-error",
        message:
          "New password must contain at least 8 letters with 1 capital letter and 1 number",
      });
    } else if (newPassword == confirmPassword) {
      req.user2.password = hashNewPassword;
      await req.user2.save();
      res.json({ error: false, message: "Password updated!" });
    } else {
      res.json({
        error: "c-error",
        message: "The confirmed password did not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { changePassword };
