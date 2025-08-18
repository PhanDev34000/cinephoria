// populate-films.js
require('dotenv').config();
const mongoose = require('mongoose');
const Film = require('./models/film.model'); 

mongoose.connect('mongodb+srv://vernierestephane:cinephoriapassword@cluster0.jdntgz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur connexion MongoDB :', err));

const films = [
  {
    titre: "Le Pére Noêl est une ordure",
    description: "Un Noêl qui dérape",
    affiche: "noel.PNG",
    genre: "Comédie",
    dateDebut: "2025-06-01",
    dateFin: "2025-06-30",
    ageMinimum: 10,
    coupDeCoeur: true,
    note: 4.8,
    imageUrl: "assets/affiches/noel.PNG",
    cinemas: ["Paris", "Bordeaux", "Lille"],
    seances: [
      {
        jour: "2025-06-10",
        debut: "18:00",
        fin: "20:00",
        qualite: "VF",
        cinema: "Paris",
        prix: 9.5
      },
      {
        jour: "2025-06-11",
        debut: "20:00",
        fin: "22:00",
        qualite: "VO",
        cinema: "Bordeaux",
        prix: 10
      },
      {
        jour: "2025-06-11",
        debut: "20:00",
        fin: "22:00",
        qualite: "VO",
        cinema: "Lille",
        prix: 10
      }
    ]
  },
  {
    titre: "Le parrain",
    description: "Epopé mythique de la famille Corleone, parrain de la mafia New Yorkaise!",
    affiche: "parrain.PNG",
    genre: "Thriller",
    dateDebut: "2025-06-05",
    dateFin: "2025-06-25",
    ageMinimum: 8,
    coupDeCoeur: false,
    note: 3.9,
    imageUrl: "assets/affiches/parrain.PNG",
    cinemas: ["Liège", "Paris"],
    seances: [
      {
        jour: "2025-06-12",
        debut: "19:30",
        fin: "21:30",
        qualite: "VF",
        cinema: "Liège",
        prix: 8
      },
      {
        jour: "2025-06-12",
        debut: "19:30",
        fin: "21:30",
        qualite: "VF",
        cinema: "Paris",
        prix: 8
      }
    ]
  },
  {
    titre: "La fôret oubliée",
    description: "Epopé mysthique",
    affiche: "foret.PNG",
    genre: "Thriller",
    dateDebut: "2025-06-05",
    dateFin: "2025-06-25",
    ageMinimum: 8,
    coupDeCoeur: false,
    note: 3.9,
    imageUrl: "assets/affiches/foret.PNG",
    cinemas: ["Bordeaux", "Paris"],
    seances: [
      {
        jour: "2025-06-12",
        debut: "19:30",
        fin: "21:30",
        qualite: "VF",
        cinema: "Bordeaux",
        prix: 10
      },
      {
        jour: "2025-06-12",
        debut: "19:30",
        fin: "21:30",
        qualite: "VF",
        cinema: "Paris",
        prix: 8
      }
    ]
  }
];

async function populate() {
  try {
    await Film.deleteMany({});
    await Film.insertMany(films);
    console.log("✅ Films insérés avec succès !");
  } catch (err) {
    console.error("❌ Erreur insertion :", err);
  } finally {
    mongoose.connection.close();
  }
}

populate();
