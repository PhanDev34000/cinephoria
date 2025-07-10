const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  filmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentaire: { type: String, required: true },
  note: { type: Number, required: true, min: 1, max: 5 },
  valide: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avis', avisSchema);
