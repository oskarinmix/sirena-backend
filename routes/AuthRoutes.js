const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const app = express();
app.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(200).json({ ok: false, msg: err });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json({
          auth: true,
          msg: "Successfully Authenticated",
          user: req.user.id,
        });
      });
    }
  })(req, res, next);
});

app.get("/auth/isauth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ auth: true, user: req.user, message: "User is Authenticated" });
  } else {
    res.json({ auth: false, message: "User is not Authenticated" });
  }
});
app.post("/auth/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.json({ auth: false, message: "User is not Authenticated" });
  }
});

app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) throw err;
    if (user) {
      res.status(400).json({ msg: "User Already Exists", ok: false });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        image: req.body.image || "",
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

module.exports = app;
