exports.deleteCookie = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Log out successfully" });
  } catch (err) {
    console.log(err);
  }
};
