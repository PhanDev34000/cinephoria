const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations → créer une réservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    console.log('📦 Données reçues côté serveur :', req.body);

    await reservation.save();
    res.status(201).json({ message: '✅ Réservation enregistrée !' });
  } catch (error) {
    console.error('Erreur création réservation :', error);
    res.status(500).json({ message: '❌ Erreur serveur' });
  }
});

// GET /api/reservations → récupérer toutes les réservations (admin)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error('Erreur récupération réservations :', error);
    res.status(500).json({ message: '❌ Erreur serveur' });
  }
});

// Route GET : /api/reservations/:email
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const reservations = await Reservation.find({ email });
    res.json(reservations);
  } catch (err) {
    console.error('❌ Erreur récupération réservations :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE /api/reservations/:id
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    console.error('Erreur suppression réservation :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = router;
