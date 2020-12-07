const express = require("express");
const isUserAuth = require("../middlewares/Authentication");
const Mail = require("../models/Mail");

const app = express();
// get the mails by pagination = 20
app.get("/", isUserAuth, (req, res, next) => {
  var page = req.query.page || 1;
  var jump = Number(page - 1) * 20;

  // user must be Authenticated
  Mail.find({})
    .skip(jump)
    .limit(20)
    .exec((err, mails) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error Loading Mails",
          errors: err,
        });
      }
      // cheched the total of documents
      Mail.countDocuments({}, (err, total) => {
        res.status(200).json({
          ok: true,
          mails,
          total,
        });
      });
    });
});

app.post("/", isUserAuth, (req, res, next) => {
  var search = req.query.search;
  var page = req.query.page;
  var jump = Number((page - 1) * 20);
  // searching by regex
  var regex = new RegExp(search, "g");

  Mail.find({})
    .or([{ subject: regex }, { message: regex }])
    .skip(jump)
    .limit(20)
    .exec((err, mails) => {
      if (err) {
        return res
          .status(400)
          .json({ ok: false, message: "Error searching mails" });
      } else {
        // cheched the total of documents of search
        Mail.find({})
          .or([{ subject: regex }, { message: regex }])
          .countDocuments({}, (err, total) => {
            return res.status(200).json({ ok: true, mails: mails, total });
          });
      }
    });
});

module.exports = app;
