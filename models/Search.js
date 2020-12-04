var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var searchSchema = new Schema(
  {
    search: {
      type: String,
      unique: true,
      required: [true, "The search field is required"],
    },
  },
  { timestamps: true, collection: "searchs" }
);

module.exports = mongoose.model("Search", searchSchema);
