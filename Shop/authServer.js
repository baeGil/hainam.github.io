const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const app = express();
const { authenticateToken } = require("./middlewares/auth");

app.use(express.json());

// Db test
const posts = [
  {
    username: "Nam1",
    title: "post 1",
  },
  {
    username: "Nam2",
    title: "post 2",
  },
];

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401);
  if (!refreshTokens.includes(refreshToken)) return res.status(403);
  jwt.verify(refreshToken, process.env.Refresh_token_secret, (err, user) => {
    if (err) return res.status(403).json({ message: "error!" });
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// app.delete("/logout");
// get post
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username == req.user.name));
});

// Authenticate User
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.Refresh_token_secret);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(id) {
  const maxAge = 24 * 60 * 60;
  return jwt.sign({ id }, process.env.Access_token_secret, {
    expiresIn: maxAge,
  });
}

app.listen(4000, () => {
  console.log("Runing at port 4000");
});
