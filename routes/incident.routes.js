const express = require('express');
const router = express.Router();
const Incident = require('../models/incident.model');
const validateObjectId = require('../middlewares/validateObjectId');

// Ajouter un incident
router.post('/', async (req, res) => {
  try {
    const nouvelIncident = new Incident(req.body);
    const savedIncident = await nouvelIncident.save();
    res.status(201).json(savedIncident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtenir tous les incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().populate('salleId');
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir les incidents d’une salle spécifique (via query param ?salleId=...)
router.get('/par-salle', async (req, res) => {
  try {
    const { salleId } = req.query;
    if (!salleId) {
      return res.status(400).json({ message: 'salleId manquant' });
    }
    // ✅ Vérifie la validité de l’ObjectId
    if (!require('mongoose').Types.ObjectId.isValid(salleId)) {
      return res.status(400).json({ message: 'salleId invalide' });
    }

    const incidents = await Incident.find({ salleId: mongoose.Types.ObjectId(salleId) }).populate('salleId');
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Supprimer un incident 
router.delete('/:id', validateObjectId('id'), async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Incident supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
