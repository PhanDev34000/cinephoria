import { Film } from '../models/film.model';

export const FILMS: Film[] = [
  {
    id: 1,
    titre: 'La Forêt Oubliée',
    description: 'Une aventure écologique pleine de mystères.',
    ageMinimum: 10,
    coupDeCoeur: true,
    note: 4.5,
    imageUrl: 'https://via.placeholder.com/300x450?text=Foret+Oubliee',
    genre: 'Aventure',
    cinemas: ['Paris', 'Nantes'],
    seances: [
      {
        jour: '2025-05-15',
        debut: '18:00',
        fin: '20:00',
        qualite: '4DX',
        prix: 14,
        cinema: 'Paris',
        placesDisponibles: 4
      },
      {
        jour: '2025-05-16',
        debut: '20:00',
        fin: '22:00',
        qualite: '3D',
        prix: 12,
        cinema: 'Nantes',
        placesDisponibles: 2
      }
    ]
  },
  {
    id: 2,
    titre: 'Comédie Noire',
    description: 'Une satire sociale grinçante.',
    ageMinimum: 16,
    coupDeCoeur: false,
    note: 3.7,
    imageUrl: 'https://via.placeholder.com/300x450?text=Comedie+Noire',
    genre: 'Comédie',
    cinemas: ['Lille', 'Charleroi'],
    seances: [
      {
        jour: '2025-05-15',
        debut: '17:30',
        fin: '19:30',
        qualite: '4K',
        prix: 10,
        cinema: 'Lille',
        placesDisponibles: 5
      }
    ]
  },
  {
    id: 3,
    titre: 'Espace Inconnu',
    description: 'Un voyage interstellaire à couper le souffle.',
    ageMinimum: 12,
    coupDeCoeur: true,
    note: 4.8,
    imageUrl: 'https://via.placeholder.com/300x450?text=Espace+Inconnu',
    genre: 'Science-fiction',
    cinemas: ['Toulouse'],
    seances: [
      {
        jour: '2025-05-16',
        debut: '21:00',
        fin: '23:30',
        qualite: 'IMAX',
        prix: 16,
        cinema: 'Toulouse',
        placesDisponibles: 1
      }
    ]
  }
];
