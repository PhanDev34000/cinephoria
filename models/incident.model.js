const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  salleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salle',
    required: true
  },
  type: {
    type: String,
    enum: ['Siège', 'Projecteur', 'Climatisation', 'Éclairage', 'Autre'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateDeclaration: {
    type: Date,
    default: Date.now
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false 
  }
});

module.exports = mongoose.model('Incident', incidentSchema);
