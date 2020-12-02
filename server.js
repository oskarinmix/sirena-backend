// Import Modules
require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
//Import Files
const { dbConnection } = require('./database/config');
const User = require('./models/User')

// Create Server
const app = express()




//Middlewwares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:3000', // <- location of the client
  credentials: true
}))
app.use(cookieParser('secretcode'))
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



// Login Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).json({ ok: false, msg: err })
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json({ ok: true, msg: "Successfully Authenticated", user: req.user });
      });
    }
  })(req, res, next);
});


app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) throw err;
    if (user) {
      res.status(400).json({ msg: "User Already Exists", ok: false });
    }
    else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        image: req.body.image || ''
      });
      try {
        await newUser.save();
        res.status(200).json({ msg: "User Created", ok: true });

      } catch (error) {
        res.status(400).json({ msg: "Error Creating User", ok: false });
      }

    }
  });
});
// Running Server
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))