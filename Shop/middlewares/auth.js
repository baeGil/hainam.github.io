require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// xoa cache
function deleteCache(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // xoa cache de response khong luu vao cache
  res.setHeader("Expires", "-1");
  res.setHeader(
    "Cache-control",
    "no-cache, no-store, must-revalidate, max-age=0"
  );
  next();
}

// kiem tra token xem da duoc xac thuc chua
function requireAuth(req, res, next) {
  const Token = req.cookies.jwt;
  if (Token) {
    jwt.verify(Token, process.env.Access_token_secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
}

// token da duoc xac thuc thi khong the quay lai trang login, sign up vi dieu day se vo nghia
function blockSite(req, res, next) {
  const Token = req.cookies.jwt;
  if (Token) {
    jwt.verify(Token, process.env.Access_token_secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        console.log(decodedToken.id);
        res.redirect("/homepage");
      }
    });
  } else {
    next();
  }
}

// check thong tin user da login
function checkUserLogin(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.Access_token_secret,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null;
          next();
        } else {
          console.log("We got the user");
          const user = await User.findByPk(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
}
module.exports = { requireAuth, blockSite, checkUserLogin, deleteCache };
