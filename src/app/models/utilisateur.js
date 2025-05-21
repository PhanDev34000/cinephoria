const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  prenom: { type: String },
  nom: { type: String },
  pseudo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
