const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new mongoose.Schema({
  woldLike: { type: String, required: true },
  reasons: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Document", documentSchema);
