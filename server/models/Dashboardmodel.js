const mongoose = require("mongoose");

let reservationsSchema = new mongoose.Schema({
  typecharger: { type: String },
  userName: { type: String },
  ordernumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservations", reservationsSchema);
