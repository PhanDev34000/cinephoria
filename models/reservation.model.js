const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur: { type: String, required: true }, 
  film: {
  _id: { type: String, required: true },
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
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    jour: { type: String, required: true },
    debut: { type: String, required: true },
    fin: { type: String, required: true },
    qualite: { type: String },
    cinema: { type: String, required: true },
    prix: { type: Number, required: true },
    salleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle' }
  },
  nbPlaces: { type: Number, required: true },
  dateReservation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
