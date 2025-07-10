const mongoose = require('mongoose');
const Employe = require('./models/employe.model');

mongoose.connect('mongodb+srv://vernierestephane:QNa4nJsnTLlieVWs@cluster0.jdntgz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log("✅ Connecté à MongoDB");

    const all = await Employe.find({});
    const admins = await Employe.find({ role: 'admin' });
    const employes = await Employe.find({ role: 'employe' });

    console.log("📄 Tous :", all);
    console.log("🧑‍💼 Admins :", admins);
    console.log("👷 Employés :", employes);

    mongoose.disconnect();
  })
  .catch(err => console.error("❌ Erreur :", err));
