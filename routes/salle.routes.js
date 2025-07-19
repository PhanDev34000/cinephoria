const express = require('express');
const router = express.Router();
const Salle = require('../models/salle.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmployeOrAdmin } = require('../middlewares/role.middleware');

// GET toutes les salles (public)
router.get('/', async (req, res) => {
  try {
    const salles = await Salle.find();
    res.json(salles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST ajouter une salle (personnel uniquement)
router.post('/', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const nouvelleSalle = new Salle(req.body);
    await nouvelleSalle.save();
    res.status(201).json(nouvelleSalle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT modifier une salle (personnel uniquement)
router.put('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {  
  try {
    const updated = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer une salle (personnel uniquement)
router.delete('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    await Salle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Salle supprimée' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
