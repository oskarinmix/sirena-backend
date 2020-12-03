var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mailSchema = new Schema(
  {
    firstName: { type: String, required: [true, "The FirstName is required"] },
    lastName: { type: String, required: [true, "The lastName is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "The email is Required"],
    },
    message: { type: String, required: [true, "The password is required"] },
    subject: { type: String, required: false },
  },
  { timestamps: true, collection: "mails" }
);

module.exports = mongoose.model("Mail", mailSchema);
