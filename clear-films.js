// clear-films.js
require('dotenv').config();
const mongoose = require('mongoose');
const Film = require('./models/film.model');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🗑 Connexion réussie à MongoDB');
    const result = await Film.deleteMany({});
    console.log(`✅ ${result.deletedCount} film(s) supprimé(s)`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion :', err);
  });
