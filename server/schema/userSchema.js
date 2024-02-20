const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String},
  score: { type: Number },
  about: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

module.exports =  mongoose.model("userSchema", userSchema);
