const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  nomUtilisateur: { type: String, required: true },
  role: { type: String, enum: ['utilisateur', 'employe', 'admin'], default: 'utilisateur' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
