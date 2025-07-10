const express = require('express');
const router = express.Router();
const Salle = require('../models/salle.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyAdmin, verifyEmploye } = require('../middlewares/role.middleware');


// GET toutes les salles
router.get('/', async (req, res) => {
  const salles = await Salle.find();
  res.json(salles);
});

// POST ajouter une salle
router.post('/', async (req, res) => {
  try {
    const nouvelleSalle = new Salle(req.body);
    await nouvelleSalle.save();
    res.status(201).json(nouvelleSalle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// PUT modifier une salle
router.put('/:id', async (req, res) => {
  console.log('📥 Route PUT /api/salles/:id atteinte', req.params.id);
  try {
    const updated = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer une salle
router.delete('/:id', async (req, res) => {
  try {
    await Salle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Salle supprimée' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
