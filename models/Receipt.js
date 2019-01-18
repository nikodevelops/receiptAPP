var mongoose = require("mongoose");

var receiptSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  desc: String,
  company: String,
  totalUsed: String,
  image: String,
  approved: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("receipt", receiptSchema);
