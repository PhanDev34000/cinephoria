const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  titre: String,
  description: String,
  image: String,
  duree: Number,
  dateSortie: Date
});

module.exports = mongoose.model('Film', FilmSchema);
