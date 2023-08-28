const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const { generateAccessToken } = require("./generateAccessToken");
// create new user account
exports.createUser = async (req, res) => {
  // dung salt va bcrypt de ma hoa mat khau duoi dang string
  const { username, password, email, role } = req.body;
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  try {
    // tao tai khoan va luu ket qua vao db sau khi kiem tra
    const user = await User.create({
      username,
      password: hashPassword,
      email,
      role,
    });

    // tao access token va luu tru trong cookies

    const Token = generateAccessToken(user.userId);
    res.cookie("jwt", Token, { httpOnly: true, maxAge: 86400 * 1000 });
    res.clearCookie("jwt");

    res.status(201).json({
      error: false,
      message: "Successfully registered, please go to the login page!",
      user: user.userId,
    });
  } catch (error) {
    console.log(error);
  }
};
