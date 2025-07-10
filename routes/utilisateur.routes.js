const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmploye } = require('../middlewares/role.middleware');

console.log('✅ utilisateur.routes.js chargé ET utilisé');

// ✅ GET Tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const utilisateurs = await User.find();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST Créer un compte utilisateur
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, nomUtilisateur, motDePasse } = req.body;

    // Vérifier si l'email existe déjà
    const existant = await User.findOne({ email });
    if (existant) {
      return res.status(409).json({ message: 'Un compte existe déjà avec cet email.' });
    }

    const hash = await bcrypt.hash(motDePasse, 10);
    const nouvelUtilisateur = new User({
      nom,
      prenom,
      email,
      nomUtilisateur,
      password: hash,
      role: 'utilisateur'
    });

    await nouvelUtilisateur.save();

    // Génération du token
    const token = jwt.sign({
      id: nouvelUtilisateur._id,
      role: nouvelUtilisateur.role,
      nomUtilisateur: nouvelUtilisateur.nomUtilisateur,
      email: nouvelUtilisateur.email
    }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({
      message: 'Utilisateur créé',
      token,
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        prenom: nouvelUtilisateur.prenom,
        email: nouvelUtilisateur.email,
        nomUtilisateur: nouvelUtilisateur.nomUtilisateur,
        role: nouvelUtilisateur.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ POST Créer un employé
router.post('/employes', async (req, res) => {
  try {
    const { nom, prenom, email, nomUtilisateur, motDePasse, role } = req.body;

    if (role !== 'employe' && role !== 'admin') {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const hash = await bcrypt.hash(motDePasse, 10);
    const nouvelEmploye = new User({
      nom,
      prenom,
      email,
      nomUtilisateur,
      password: hash,
      role
    });

    await nouvelEmploye.save();
    res.status(201).json(nouvelEmploye);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT Réinitialiser mot de passe d’un employé
router.put('/employes/:id/reset-password', async (req, res) => {
  try {
    const { nouveauMotDePasse } = req.body;
    const hash = await bcrypt.hash(nouveauMotDePasse, 10);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { password: hash },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    res.json({ message: 'Mot de passe réinitialisé avec succès', user: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ POST Login - Générer un token JWT
router.post('/login', async (req, res) => {
  console.log('🔐 Tentative de connexion avec email :', req.body.email);
  console.log('📨 Données reçues côté serveur :', req.body);

  const { email, password } = req.body;

  try {
    const utilisateur = await User.findOne({ email });
    console.log('🔍 Utilisateur trouvé ?', utilisateur);

    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('🔑 Mot de passe reçu :', password);
    console.log('🔒 Hash en BDD :', utilisateur.password);

    const isMatch = await bcrypt.compare(password, utilisateur.password);
    console.log('✅ Correspondance ? =>', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({
      id: utilisateur._id,
      role: utilisateur.role,
      nomUtilisateur: utilisateur.nomUtilisateur,
      email: utilisateur.email
    }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({
      message: 'Connexion réussie',
      token,
      utilisateur: {
        id: utilisateur._id,
        role: utilisateur.role,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        nomUtilisateur: utilisateur.nomUtilisateur
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET /me - Vérifie le token
router.get('/me', verifyToken, (req, res) => {
  res.json({ message: 'Token valide', user: req.user });
});

module.exports = router;
