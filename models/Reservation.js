const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  filmId: Number,
  titre: String,
  cinema: String,
  jour: String,
  heure: String,
  qualite: String,
  nomClient: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
