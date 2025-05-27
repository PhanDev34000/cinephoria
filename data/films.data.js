const films = [
  {
    id: 1,
    titre: 'La Forêt Oubliée',
    description: 'Une aventure écologique pleine de mystères.',
    dateDebut: '2025-05-14',
    dateFin: '2025-05-30',
    ageMinimum: 10,
    coupDeCoeur: true,
    note: 4.5,
    imageUrl: 'http://localhost:3000/affiches/foret.PNG',
    genre: 'Aventure',
    cinemas: ['Paris', 'Nantes'],
    seances: []
  },
  {
    id: 2,
    titre: 'Inception',
    description: 'Un thriller de science-fiction réalisé par Christopher Nolan.',
    dateDebut: '2025-05-14',
    dateFin: '2025-05-30',
    ageMinimum: 13,
    coupDeCoeur: true,
    note: 4.8,
    imageUrl: 'http://localhost:3000/affiches/inception.PNG',
    genre: 'Thriller',
    cinemas: ['Paris'],
    seances: []
  }
  // Ajoute les autres si besoin
];

module.exports = films;
