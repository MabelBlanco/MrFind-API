const mongoose = require("mongoose");

//Schema
const playSchema = mongoose.Schema({
  code: { type: String, unique: true, required: true },
  assigned: { type: Boolean, required: true },
  playName: { type: String, unique: false, required: false },
  users: { type: [String], unique: false, required: false },
  phase: { type: Number, unique: false, required: true },
});

//DB indexes
playSchema.index({ playName: 1 });
playSchema.index({ playName: -1 });
playSchema.index({ users: 1 });
playSchema.index({ users: -1 });

//Create Model
const Play = mongoose.models.Play || mongoose.model("Play", playSchema);

//Exportar modelo
module.exports = Play;
