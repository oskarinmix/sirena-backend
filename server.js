// Import Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const bodyParser = require("body-parser");
// Import Files
const { dbConnection } = require("./database/config");
const User = require("./models/User");

// Create Server
const app = express();

// Middlewwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <- location of the client
    credentials: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./passport/passportConfig")(passport);

// Database Connection
dbConnection();

// Auth Routes
const AuthRoutes = require("./routes/AuthRoutes");
app.use("/", AuthRoutes);
// Mail Routes
const MailRoutes = require("./routes/MailRoutes");
app.use("/mails", MailRoutes);

// Running Server
app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
