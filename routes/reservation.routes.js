const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');

// Créer une réservation
router.post('/', async (req, res) => {
  try {
    const nouvelleReservation = new Reservation(req.body);
    const saved = await nouvelleReservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de la réservation', error: err });
  }
});

// Obtenir toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
  }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la suppression', error: err });
  }
});

module.exports = router;
