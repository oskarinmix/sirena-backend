// Import Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
// const mongoose = require("mongoose");
// Import Files
const { dbConnection } = require("./database/config");

// Create Server
const app = express();

// Database Connection
dbConnection();
// session

var store = new MongoDBStore({
  uri: process.env.DATABASE_MONGO,
  collection: "mySessions",
});
// Middlewwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS || "http://localhost:3000", // <- location of the client
    credentials: true,
  })
);
app.use(cookieParser());
app.enable('trust proxy');
app.use(
  session({
    secret: "thesecretcode",
    resave: false,
    saveUninitialized: false,
    store: store,
    proxy: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./passport/passportConfig")(passport);

// Auth Routes
const AuthRoutes = require("./routes/AuthRoutes");
app.use("/auth", AuthRoutes);
// Mail Routes
const MailRoutes = require("./routes/MailRoutes");
app.use("/mails", MailRoutes);
// Search Routes
const SearchRoutes = require("./routes/SearchRoutes");
app.use("/search", SearchRoutes);

// Running Server
app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
