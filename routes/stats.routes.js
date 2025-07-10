const express = require('express');
const router = express.Router();
const Salle = require('../models/salle.model');
const Seance = require('../models/seance.model');
const Reservation = require('../models/reservation.model');
const User = require('../models/user.model');
const Film = require('../models/film.model');
const Utilisateur = require('../models/user.model');

router.get('/', async (req, res) => {
  try {
    const nbVilles = await Salle.distinct('ville');
    const nbCinemas = await Film.distinct('cinemas');
    const nbSalles = await Salle.countDocuments();
    const nbSeances = await Seance.countDocuments();
    const nbReservations = await Reservation.countDocuments();
    const nbComptes = await User.countDocuments();
    const allEmployes = await Employe.find();
    const nbEmployes = await Utilisateur.find({ role: 'employe' });
    const nbAdmins = await Utilisateur.find({ role: 'administrateur' });
      
    res.json({
      villes: nbVilles.length,
      cinemas: nbCinemas.flat().length,
      salles: nbSalles,
      seances: nbSeances,
      reservations: nbReservations,
      comptes: nbComptes,
      employes: nbEmployes,
      administrateurs: nbAdmins
    });
  } catch (err) {
    console.error('❌ Erreur récupération stats :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nouvelEmploye = new User(req.body);
    await nouvelEmploye.save();
    res.status(201).json(nouvelEmploye);
  } catch (err) {
    console.error('❌ Erreur création employé :', err);
    res.status(400).json({ message: 'Échec ajout employé' });
  }
});


module.exports = router;
