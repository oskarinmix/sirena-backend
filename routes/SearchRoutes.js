const express = require("express");
const app = express();
const Search = require("../models/Search");
const { isUserAuth } = require("../middlewares/Authentication");
// SAVE A NEW SEARCH

app.post("/", isUserAuth, (req, res) => {
  var body = req.body;

  var search = new Search({
    search: body.search,
  });

  search.save((err, search) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error saving search",
        errors: err,
      });
    }

    res.status(201).json({
      ok: true,
      search: search,
    });
  });
});

app.get("/", isUserAuth, (req, res, next) => {
  Search.find({}).exec((err, searchs) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error getting searchs",
        errors: err,
      });
    }

    Search.countDocuments({}, (err, total) => {
      res.status(200).json({
        ok: true,
        searchs,
        total,
      });
    });
  });
});

app.delete("/:id", isUserAuth, (req, res) => {
  var id = req.params.id;

  Search.findByIdAndRemove(id, (err, search) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting search",
        errors: err,
      });
    }

    if (!search) {
      return res.status(400).json({
        ok: false,
        message: "No search with that id",
        errors: { message: "No search with that id" },
      });
    }

    res.status(200).json({
      ok: true,
      message: "search deleted succesfully",
    });
  });
});

module.exports = app;
