const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyEmploye } = require('../middlewares/role.middleware');
const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string().email().required()
});

// GET Tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const utilisateurs = await User.find();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST Créer un compte utilisateur
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, nomUtilisateur, motDePasse } = req.body;   
    const { error } = emailSchema.validate({ email });
    if (error) {
      return res.status(400).json({ message: 'Email invalide' });
    }
    const existant = await User.findOne({ email: { $eq: email.trim().toLowerCase() } }).lean();
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

// Réinitialiser un mdp d'un utilisateur
router.put('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {    
    return res.status(400).json({ message: 'Email et nouveau mot de passe requis' });
  }
  try {
   const { error } = emailSchema.validate({ email });
    if (error) {
      return res.status(400).json({ message: 'Email invalide' });
    }

    const user = await User.findOne({ email: { $eq: email.trim().toLowerCase() } }).lean();

    if (!user) {
      console.log('❌ Utilisateur introuvable');
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();
    
    res.status(200).json({ message: 'Mot de passe mis à jour' });
  } catch (error) {
    console.error('🔥 Erreur serveur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST Créer un employé
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

// PUT Réinitialiser mot de passe d’un employé
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

// POST Login - Générer un token JWT
router.post('/login', async (req, res) => {
   const { email, password } = req.body;
  try {
    const { error } = emailSchema.validate({ email });
    if (error) {
      return res.status(400).json({ message: 'Email invalide' });
    }

    const utilisateur = await User.findOne({ email: { $eq: email.trim().toLowerCase() } }).lean();

    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, utilisateur.password);
        console.log('🔍 Correspondance mot de passe :', isMatch);

   
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

// GET /me - Vérifie le token
router.get('/me', verifyToken, (req, res) => {
  res.json({ message: 'Token valide', user: req.user });
});

// GET /api/utilisateurs/employes : retourne les utilisateurs avec rôle "employe" ou "admin"
router.get('/employes', async (req, res) => {
  try {
    const employes = await User.find({ role: { $in: ['employe', 'admin'] } });
    res.json(employes);
  } catch (error) {
    console.error('❌ Erreur récupération employés :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT /api/utilisateurs/:id — modifier un employé


router.put('/:id', async (req, res) => {
  const { nom, prenom, email, nomUtilisateur, role, motDePasse } = req.body;

  try {
    const updatedFields = {
      nom,
      prenom,
      email,
      nomUtilisateur,
      role
    };

    // Si motDePasse est fourni : le hasher et le mettre à jour
    if (motDePasse && motDePasse.trim() !== '') {
      const hashed = await bcrypt.hash(motDePasse, 10);
      updatedFields.password = hashed;      
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('❌ Erreur modification employé :', error);
    res.status(500).json({ message: "Erreur modification employé" });
  }
});


// Vérifie si email existe avant reset
router.post('/check-email', async (req, res) => {
  const { email } = req.body;   
  if (!email) return res.status(400).json({ message: 'Email requis' });
  const { error } = emailSchema.validate({ email });
  if (error) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  const user = await User.findOne({ email: { $eq: email.trim().toLowerCase() } }).lean();

  if (!user) return res.status(404).json({ message: 'Email introuvable' });

  res.status(200).json({ message: 'Email trouvé' });
});

module.exports = router;
