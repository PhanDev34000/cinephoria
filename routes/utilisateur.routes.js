const express = require('express');
const router = express.Router();
const Utilisateur = require('../src/app/models/utilisateur');

// Route POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, prenom, nom, pseudo } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existing = await Utilisateur.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({ email, password, prenom, nom, pseudo });
    await nouvelUtilisateur.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l’enregistrement :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
