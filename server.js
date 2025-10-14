const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const utilisateurRoutes = require('./routes/utilisateur.routes');
const filmRoutes = require('./routes/film.routes');
const avisRoutes = require('./routes/avis.routes');
const seanceRoutes = require('./routes/seance.routes');
const reservationRoutes = require('./routes/reservation.routes');
const salleRoutes = require('./routes/salle.routes');
const statsRoutes = require('./routes/stats.routes');
const incidentRoutes = require('./routes/incident.routes');

// Middlewares
app.use(cors({
  origin: ['https://cinephoria-depl.onrender.com','http://localhost:4200','http://localhost:8100' ],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// Servir les images statiques
app.use('/affiches', express.static(path.join(__dirname, 'public/affiches')));

// API Routes
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/seances', seanceRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/incidents', incidentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur MongoDB :', err));


// 0.0.0.0 = écoute sur toutes les interfaces réseau (local + déploiement)
const HOST = '0.0.0.0';

// ✅ Exporter l'app pour les tests Jest
module.exports = app;

// ✅ Ne démarrer le serveur que si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 API démarrée sur le port ${PORT}`);
  });
}



