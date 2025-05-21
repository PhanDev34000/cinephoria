const express = require('express');
const router = express.Router();
const Film = require('../models/Film');

// GET /api/films → récupérer tous les films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/films → ajouter un film
router.post('/', async (req, res) => {
  try {
    const nouveauFilm = new Film(req.body);
    await nouveauFilm.save();
    res.status(201).json(nouveauFilm);
  } catch (err) {
    console.error('Erreur ajout film :', err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du film' });
  }
});

module.exports = router;
