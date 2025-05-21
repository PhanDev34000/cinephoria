const mongoose = require('mongoose');

const SeanceSchema = new mongoose.Schema({
  id: Number,
  jour: String,
  debut: String,
  fin: String,
  qualite: String,
  prix: Number,
  cinema: String,
  placesDisponibles: Number
});

const FilmSchema = new mongoose.Schema({
  id: Number,
  titre: String,
  description: String,
  ageMinimum: Number,
  coupDeCoeur: Boolean,
  note: Number,
  imageUrl: String,
  genre: String,
  cinemas: [String],
  seances: [SeanceSchema]
});

module.exports = mongoose.model('Film', FilmSchema);
