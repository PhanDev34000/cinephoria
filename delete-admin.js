const mongoose = require('mongoose');
const User = require('./models/user.model');

const MONGO_URI = 'mongodb+srv://vernierestephane:QNa4nJsnTLlieVWs@cluster0.jdntgz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connecté à MongoDB');

    const result = await User.deleteOne({ email: 'admin@cinephoria.fr' });

    if (result.deletedCount === 0) {
      console.log('ℹ️ Aucun admin trouvé à supprimer.');
    } else {
      console.log('🗑️ Admin supprimé avec succès.');
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Erreur :', err);
    mongoose.disconnect();
  });
