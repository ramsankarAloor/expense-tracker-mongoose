const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
  dateTime: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  reportOfMonth: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Download", downloadSchema);

