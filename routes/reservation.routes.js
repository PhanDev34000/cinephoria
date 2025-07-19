const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');

// POST Ajouter une réservation
router.post('/', async (req, res) => {   
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ message: 'Réservation réussie' });
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la réservation",
      erreur: err.message,
      details: err.errors
    });
  }
});

//Get Récupérer les réservations
router.get('/', async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: "Email requis" });
    }

    const reservations = await Reservation.find({ utilisateur: email });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la suppression', error: err });
  }
});

module.exports = router;
