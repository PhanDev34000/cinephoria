const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');

const MONGO_URI = 'mongodb+srv://vernierestephane:QNa4nJsnTLlieVWs@cluster0.jdntgz0.mongodb.net/cinephoria?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connecté à MongoDB');

    const email = 'admin@cinephoria.fr';
    const password = 'Admin123!';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('ℹ️ Un administrateur avec cet email existe déjà.');
      return mongoose.disconnect();
    }

    const hash = await bcrypt.hash(password, 10);

    const admin = new User({
      nom: 'ADMIN',
      prenom: 'ROOT',
      email,
      nomUtilisateur: 'admin',
      password: hash,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Administrateur créé avec succès');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Erreur :', err);
    mongoose.disconnect();
  });
