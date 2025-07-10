const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmploye } = require('../middlewares/role.middleware');
const Avis = require('../models/avis.model');


// Route publique pour récupérer les avis validés d’un film via query (filmId + valide)
router.get('/public', async (req, res) => {
  try {
    const { filmId, valide } = req.query;
    const filtre = {};

    if (filmId) filtre.filmId = filmId;
    if (valide !== undefined) filtre.valide = valide === 'true';

    const avis = await Avis.find(filtre);
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Récupérer tous les avis (utilisé côté admin/employé)
router.get('/', verifyToken, verifyEmploye, async (req, res) => {
  try {
    const avis = await Avis.find();
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer les avis d’un film (public, seulement les validés)
router.get('/film/:filmId', async (req, res) => {
  try {
    const avis = await Avis.find({ filmId: req.params.filmId, valide: true });
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajouter un avis (réservé aux utilisateurs connectés)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { filmId, note, commentaire } = req.body;

    const nouvelAvis = new Avis({
      filmId,
      utilisateurId: req.user.id,
      note,
      commentaire,
      valide: false // en attente de validation
    });

    await nouvelAvis.save();
    res.status(201).json({ message: 'Avis ajouté, en attente de validation.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Valider un avis (réservé aux employés)
router.put('/:id/valider', verifyToken, verifyEmploye, async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);
    if (!avis) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }

    avis.valide = true;
    await avis.save();
    res.status(200).json({ message: 'Avis validé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Supprimer un avis (réservé aux employés)
router.delete('/:id', verifyToken, verifyEmploye, async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);
    if (!avis) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }

    await avis.deleteOne();
    res.status(200).json({ message: 'Avis supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer uniquement les avis non validés (pour l’admin)
router.get('/non-valides', verifyToken, verifyEmploye, async (req, res) => {
  try {
    const avis = await Avis.find({ valide: false });
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
