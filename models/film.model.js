const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
  jour: { type: String, required: true },
  debut: { type: String, required: true },
  fin: { type: String, required: true },
  qualite: { type: String },
  cinema: { type: String, required: true },
  prix: { type: Number, required: true },
});

const filmSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  affiche: String,
  genre: String,
  dateDebut: String,
  dateFin: String,
  ageMinimum: Number,
  coupDeCoeur: Boolean,
  note: Number,
  imageUrl: String,
  cinemas: [String],
  seances: [seanceSchema],  
});

module.exports = mongoose.model('Film', filmSchema);
