const User = require("../../models/user.model");
const { generateAccessToken } = require("./generateAccessToken");

// login user
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const Token = generateAccessToken(user.userId);
    res.cookie("jwt", Token, {
      httpOnly: true,
      maxAge: 86400 * 1000,
    });
    res.status(201).json({
      error: false,
      message: "Log in successfully",
      user: user.userId,
      Token: Token,
    });
  } catch (error) {
    console.log(error);
  }
};
