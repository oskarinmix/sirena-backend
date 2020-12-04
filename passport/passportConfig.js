const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      (username, password, done) => {
        // Strategy for any user in the database
        // User.findOne({ email: username }, (err, user) => {
        //   if (err) throw err;
        //   if (!user) return done("Email no exist", false);
        //   bcrypt.compare(password, user.password, (err, result) => {
        //     if (err) throw err;
        //     if (result === true) {
        //       return done(null, user);
        //     } else {
        //       return done("Wrong Password", false);
        //     }
        //   });
        // });

        // Strategy only for test@sirena.app
        if (username !== "test@sirena.app") return done("Invalid email", false);
        if (password === "test") {
          User.findOne({ email: username }, (err, user) => {
            if (err) throw err;
            return done(null, user);
          });
        } else {
          return done("Wrong Password", false);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        name: user.name,
        email: user.email,
        image: user.image,
      };
      cb(err, userInformation);
    });
  });
};
