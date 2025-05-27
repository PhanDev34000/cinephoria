const express = require('express');
const router = express.Router();

const films = require('../data/films.data'); 

// GET /api/films
router.get('/', (req, res) => {
  res.json(films);
});

module.exports = router;
