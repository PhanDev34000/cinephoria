const mongoose = require('mongoose');

const AvisSchema = new mongoose.Schema({
  titreFilm: String,
  note: Number,
  commentaire: String,
  email: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avis', AvisSchema);
