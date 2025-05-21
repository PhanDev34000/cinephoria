const express = require('express');
const router = express.Router();
const Avis = require('../models/Avis');

// POST /api/avis → Enregistrer un avis
router.post('/', async (req, res) => {
  try {
    const nouvelAvis = new Avis(req.body);
    await nouvelAvis.save();
    res.status(201).json({ message: 'Avis enregistré avec succès' });
  } catch (err) {
    console.error('❌ Erreur enregistrement avis :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
