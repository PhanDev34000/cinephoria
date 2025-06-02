const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  film: { type: String, required: true },
  note: { type: Number, required: true, min: 0, max: 5 },
  commentaire: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avis', avisSchema);
