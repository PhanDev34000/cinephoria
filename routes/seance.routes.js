const express = require('express');
const router = express.Router();
const Seance = require('../models/seance.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmploye } = require('../middlewares/role.middleware');


// GET toutes les séances
router.get('/', async (req, res) => {
  const seances = await Seance.find();
  res.json(seances);
});

// POST ajouter une séance
router.post('/', async (req, res) => {
  try {
    const seance = new Seance(req.body);
    await seance.save();
    res.status(201).json(seance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT modifier une séance
router.put('/:id', async (req, res) => {
  try {
    const updated = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer une séance
router.delete('/:id', async (req, res) => {
  try {
    await Seance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Séance supprimée' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
