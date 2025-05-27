const express = require('express');
const router = express.Router();

const utilisateurs = [
  {
    id: 1,
    email: 'john@example.com',
    prenom: 'John',
    nom: 'Doe',
    username: 'johnny'
  },
  {
    id: 2,
    email: 'jane@example.com',
    prenom: 'Jane',
    nom: 'Smith',
    username: 'janeS'
  }
];

// Récupérer tous les utilisateurs
router.get('/', (req, res) => {
  res.json(utilisateurs);
});

module.exports = router;
