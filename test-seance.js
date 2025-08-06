const mongoose = require('mongoose');
const Reservation = require('./models/reservation.model'); // ajuste le chemin si besoin

mongoose.connect('mongodb+srv://<...tonURI...>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const resa = await Reservation.findOne({ utilisateur: 'max@corbin.com' });
  console.log('Contenu du champ seance :', resa.seance);
  process.exit();
})
.catch(err => console.error('Erreur de connexion:', err));
