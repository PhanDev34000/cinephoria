const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');

router.post('/', async (req, res) => {
   console.log('📥 Requête POST reçue /api/reservations'); 
   console.log('📨 Contenu reçu :', JSON.stringify(req.body, null, 2));
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


router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la suppression', error: err });
  }
});

module.exports = router;
