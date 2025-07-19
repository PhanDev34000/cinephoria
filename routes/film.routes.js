const express = require('express');
const router = express.Router();
const Film = require('../models/film.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmployeOrAdmin } = require('../middlewares/role.middleware');

// GET tous les films (public)
router.get('/', async (req, res) => {
  const films = await Film.find();
  res.json(films);
});

// POST un nouveau film (réservé au personnel)
router.post('/', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const nouveauFilm = new Film(req.body);
    await nouveauFilm.save();
    res.status(201).json(nouveauFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT modifier un film (réservé au personnel)
router.put('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(film);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un film (réservé au personnel)
router.delete('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.id);
    res.json({ message: 'Film supprimé' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
