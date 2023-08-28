const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { sequelize } = require("./sequelize");
const { engine } = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const {
  requireAuth,
  blockSite,
  checkUserLogin,
  deleteCache,
} = require("./middlewares/auth");

app.use(cors());
// import all models
require("./models/movie/genres");
require("./models/movie/movie");
require("./models/movie/keywords");
require("./models/movie/production_companies");
require("./models/movie/release_day");
require("./models/movie/vote");
require("./models/movie/credits");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

// sync Db
sequelize
  .sync({ force: false })
  .then((result) => {
    console.log(result.models);
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

// allow json data
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));

// use cookie thired-party middleware
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

//template engines handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// views
app.use(deleteCache); // middleware
app.get("/api/resetPassword/:emailToken", (req, res) => {
  res.render("resetPassword");
});
app.get("/forgotPassword", blockSite, (req, res) => {
  res.render("forgotPassword");
});
app.get("/homepage", requireAuth, (req, res) => {
  res.render("homepage");
});
app.get("/changePassword", requireAuth, (req, res) => {
  res.render("changePassword");
});
app.get("/signup", blockSite, (req, res) => {
  res.render("signup");
});
app.get("/login", blockSite, (req, res) => {
  res.render("login");
});
app.get("/home", blockSite, (req, res) => {
  res.render("home");
});

// CRUD routes
app.use("/api/resetPassword", require("./routes/auth.route"));
app.use("/customers", require("./routes/auth.route"));

app.listen(3000, () => {
  console.log("Runing at port 3000");
});
