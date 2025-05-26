const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const utilisateurRoutes = require('./routes/utilisateur.routes');
const filmRoutes = require('./routes/film.routes');
const app = express();
const PORT = process.env.PORT || 3000;
const avisRoutes = require('./routes/avis.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Servir les images statiques
app.use('/affiches', express.static(path.join(__dirname, 'public/affiches')));

// API Routes
app.use('/api/users', utilisateurRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/avis', avisRoutes);

// Serve Angular static files (from dist/)
app.use(express.static(path.join(__dirname, 'dist/cinephoria-web/browser')));

// Catch-all route for Angular
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cinephoria-web/browser/index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

const reservationRoutes = require('./routes/reservation.routes');
app.use('/api/reservations', reservationRoutes);
