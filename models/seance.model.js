const mongoose = require('mongoose');

const SeanceSchema = new mongoose.Schema({
  jour: String,
  debut: String,
  fin: String,
  qualite: String,
  prix: Number,
  cinema: String,
  placesDisponibles: Number,
  filmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  salleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true }

});

module.exports = mongoose.model('Seance', SeanceSchema);
