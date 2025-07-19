const express = require('express');
const router = express.Router();
const Seance = require('../models/seance.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmployeOrAdmin } = require('../middlewares/role.middleware');

// GET toutes les séances (public ou non protégé)
router.get('/', async (req, res) => {
  const seances = await Seance.find();
  res.json(seances);
});

// POST ajouter une séance (personnel uniquement)
router.post('/', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const { filmId, salleId, jour, debut, fin, qualite, prix, placesDisponibles } = req.body;

    if (!filmId || !jour || !debut || !fin) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const seance = new Seance({
      filmId,
      salleId,
      jour,
      debut,
      fin,
      qualite,
      prix,
      placesDisponibles
    });

    await seance.save();
    res.status(201).json(seance);
  } catch (err) {
    console.error('❌ Erreur création séance :', err);
    res.status(400).json({ message: 'Erreur lors de la création de la séance', error: err.message });
  }
});

// PUT modifier une séance (personnel uniquement)
router.put('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const updated = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer une séance (personnel uniquement)
router.delete('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    await Seance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Séance supprimée' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
