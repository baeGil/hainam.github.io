const { sendEmail } = require("./sendEmail");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

async function sendLink(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.json({
        error: true,
        message: "User with given email does not exist",
      });
    } else {
      const emailToken = generateAccessToken(user.email);
      user.emailToken = emailToken;
      await user.save();
      const url = `${process.env.Base_url}/resetPassword/${emailToken}`;
      await sendEmail(
        user.email,
        "Password reset",
        "Your reset password link will be valid for 5 minutes: " + url
      );
      res.json({
        error: false,
        message: "Email sent successfully!",
      });
    }
  } catch (err) {
    res.send("An error occured");
    console.log(err);
  }
}
function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.Access_token_secret, {
    expiresIn: 300,
  });
}
module.exports = { sendLink };
