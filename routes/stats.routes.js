const express = require('express');
const router = express.Router();
const Salle = require('../models/salle.model');
const Seance = require('../models/seance.model');
const Reservation = require('../models/reservation.model');
const User = require('../models/user.model');
const Film = require('../models/film.model');

router.get('/', async (req, res) => {
  try {
    const nbVilles = await Salle.distinct('ville');    
    const nbSalles = await Salle.countDocuments();
    const nbSeances = await Seance.countDocuments();
    const nbReservations = await Reservation.countDocuments();
    const nbComptes = await User.countDocuments();
    const nbEmployes = await User.countDocuments({ role: 'employe' });
    const nbAdmins = await User.countDocuments({ role: 'admin' });

    res.json({
      villes: nbVilles.length,      
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
