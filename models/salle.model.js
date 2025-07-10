const mongoose = require('mongoose');

const SalleSchema = new mongoose.Schema({
  ville: { type: String, required: true },
  nom: { type: String, required: true },
  capacite: { type: Number, required: true },
  qualiteProjection: { type: String, required: true }
});

module.exports = mongoose.model('Salle', SalleSchema);
