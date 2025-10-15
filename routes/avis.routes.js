const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmployeOrAdmin } = require('../middlewares/role.middleware');
const Avis = require('../models/avis.model');
const mongoose = require('mongoose');
const Joi = require('joi');
const validateObjectId = require('../middlewares/validateObjectId');
const validateBody = require('../middlewares/validateBody');


const schemaAvis = Joi.object({
  filmId: Joi.string().required(),
  note: Joi.number().integer().min(0).max(5).required(),
  commentaire: Joi.string().allow('').max(1000)
});

// Route publique pour récupérer les avis validés d’un film via query (filmId + valide)
router.get('/public', async (req, res) => {
  try {
    const { filmId, valide } = req.query;
    const filtre = {};

    if (filmId && mongoose.isValidObjectId(filmId)) {
      // Utiliser $eq pour défendre contre l’injection
      filtre.filmId = { $eq: new mongoose.Types.ObjectId(filmId) };
    }

    if (valide !== undefined) {
      if (valide === 'true' || valide === 'false') {
        filtre.valide = { $eq: (valide === 'true') };
      } else {
        return res.status(400).json({ message: 'Valeur invalide pour "valide"' });
      }
    }

    const avis = await Avis.find(filtre).lean();
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Récupérer tous les avis (utilisé côté admin/employé)
router.get('/', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const avis = await Avis.find();
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer les avis d’un film (public, seulement les validés)
router.get('/par-film/:filmId',
  validateObjectId('filmId'),
  async (req, res) => {
    try {
      // Conversion explicite pour éviter toute injection
      const filmObjectId = new mongoose.Types.ObjectId(req.params.filmId);

      const avis = await Avis.find({ filmId: filmObjectId }).lean();
      res.status(200).json(avis);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);


// Ajouter un avis (réservé aux utilisateurs connectés)
router.post('/',
  validateBody(schemaAvis),
  async (req, res) => {
    try {
      const { filmId, note, commentaire } = req.body;

      // Vérification explicite de l’ObjectId
      if (!mongoose.isValidObjectId(filmId)) {
        return res.status(400).json({ message: 'ID de film invalide' });
      }

      // Construction explicite et contrôlée des données autorisées
      const avisData = {
        filmId: new mongoose.Types.ObjectId(filmId),
        note: Number(note),
        commentaire: commentaire ? String(commentaire) : ''
      };

      // Pas de création directe avec req.body
      const doc = new Avis(avisData);
      await doc.save();

      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);



// Valider un avis (réservé aux employés)
router.put('/:id/valider', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
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
router.delete('/:id', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
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
router.get('/non-valides', verifyToken, verifyEmployeOrAdmin, async (req, res) => {
  try {
    const avis = await Avis.find({ valide: false });
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour calculer la moyenne des notes d’un film (avis validés uniquement)

router.get('/film/:filmId/moyenne-note', async (req, res) => {
  try {
    const filmId = new mongoose.Types.ObjectId(req.params.filmId);

    const moyenne = await Avis.aggregate([
      { $match: { filmId: filmId, valide: true } },
      {
        $group: {
          _id: '$filmId',
          moyenneNote: { $avg: '$note' }
        }
      }
    ]);

    const resultat = moyenne.length > 0 ? moyenne[0].moyenneNote : 0;
    res.status(200).json({ moyenne: resultat });
  } catch (err) {
    console.error('Erreur moyenne note :', err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
