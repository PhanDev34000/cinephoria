const express = require('express');
const router = express.Router();

const avis = [
  {
    id: 1,
    filmId: 1,
    userId: 1,
    commentaire: 'Excellent film !',
    note: 5
  },
  {
    id: 2,
    filmId: 2,
    userId: 2,
    commentaire: 'Très bon mais un peu long.',
    note: 4
  }
];

// Récupérer tous les avis
router.get('/', (req, res) => {
  res.json(avis);
});

module.exports = router;
