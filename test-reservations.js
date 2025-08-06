const mongoose = require('mongoose');
const Reservation = require('./models/reservation.model');

mongoose.connect('mongodb+srv://vernierestephane:QNa4nJsnTLlieVWs@cluster0.jdntgz0.mongodb.net/cinephoria?retryWrites=true&w=majority&appName=Cluster0') // utilise ta vraie URI ici

 .then(() => {
    return Reservation.find();
  })
  .then(reservations => {
    reservations.forEach(r => {
      console.log('---');
      console.log('ID:', r._id);
      console.log('Utilisateur:', r.utilisateur);
    });
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Erreur MongoDB :', err);
    mongoose.disconnect();
  });