const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur: { type: String, required: true }, // ✅ Temporaire
  film: {
  id: { type: Number, required: true },
  titre: { type: String, required: true },
  description: String,
  affiche: String,
  dateDebut: String,
  dateFin: String,
  ageMinimum: Number,
  coupDeCoeur: Boolean,
  note: Number,
  imageUrl: String,
  genre: String,
  cinemas: [String],
  seances: [Object] 
  },
  seance: {
    jour: { type: String, required: true },
    debut: { type: String, required: true },
    fin: { type: String, required: true },
    qualite: { type: String },
    cinema: { type: String, required: true },
    prix: { type: Number, required: true },
  },
  nbPlaces: { type: Number, required: true },
  dateReservation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
