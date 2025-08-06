const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');
const Seance = require('../models/seance.model'); 

// POST Ajouter une réservation
router.post('/', async (req, res) => {
  console.log('📦 Données reçues pour réservation :', req.body);
  
  try {
    const { film, utilisateur, nbPlaces, seance } = req.body;

    // Vérifie qu'un _id de séance est présent
    if (!seance || !seance._id) {
      return res.status(400).json({ message: "L'ID de la séance est manquant" });
    }

    // Récupère la séance complète depuis MongoDB
    const seanceComplete = await Seance.findById(seance._id);
    if (!seanceComplete) {
      return res.status(404).json({ message: "Séance introuvable" });
    }

    // Crée la réservation avec la séance complète
console.log('🎯 seanceComplete.toObject() :', seanceComplete.toObject());
console.log('🎯 seance.cinema reçu dans le body :', seance.cinema);


    const reservation = new Reservation({
      film,
      utilisateur,
      nbPlaces,      
      seance:  {
        _id: seanceComplete._id,
        jour: seanceComplete.jour,
        debut: seanceComplete.debut,
        fin: seanceComplete.fin,
        qualite: seanceComplete.qualite,
        prix: seanceComplete.prix,
        salleId: seanceComplete.salleId,
        cinema: seance.cinema 
      }


    });

    await reservation.save();
    res.status(201).json({ message: 'Réservation réussie' });

  } catch (err) {
    console.error("❌ Erreur de réservation :", err);
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

// Récupérer les réservations à venir pour un utilisateur donné
router.get('/utilisateur/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email);

  try {
    const today = new Date().toISOString().split('T')[0]; // format 'YYYY-MM-DD'

    const reservations = await Reservation.find({
      utilisateur: email,
      'seance.jour': { $gte: today } // filtre sur la date de la séance
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations.' });
  }
});




module.exports = router;
