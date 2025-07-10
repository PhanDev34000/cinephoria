const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nomUtilisateur: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['utilisateur', 'employe', 'admin'], default: 'utilisateur' }
});

module.exports = mongoose.model('User', userSchema, 'users');
