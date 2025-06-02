import { Film } from '../models/film.model';

export const FILMS: Film[] = [
  {
    id: 1,
    titre: 'La Forêt Oubliée',
    description: 'Une aventure écologique pleine de mystères.',
     affiche: 'public/affiches/foret.PNG',
    dateDebut: '2025-05-07',
    dateFin: '2025-06-31',
    ageMinimum: 10,
    coupDeCoeur: true,
    note: 4.5,
    imageUrl: 'http://localhost:3000/affiches/foret.PNG',
    genre: 'Aventure',
    cinemas: ['Paris', 'Nantes'],
    seances: [
      {
        id: 101,
        jour: '2025-05-14',
        debut: '18:00',
        fin: '20:00',
        qualite: '4DX',
        prix: 14,
        cinema: 'Paris',
        placesDisponibles: 4
      },
      {
        id: 102,
        jour: '2025-05-14',
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
    titre: 'Inception',
    description: 'Un thriller de science-fiction réalisé par Christopher Nolan.',
    affiche: 'public/affiches/inception.PNG',
    dateDebut: '2025-05-21',
    dateFin: '2025-06-31',
    ageMinimum: 13,
    coupDeCoeur: true,
    note: 4.8,
    imageUrl: 'http://localhost:3000/affiches/inception.PNG',
    genre: 'Thriller',
    cinemas: ['Paris'],
    seances: [
      {
        id: 201,
        jour: '2025-05-07',
        debut: '17:30',
        fin: '19:30',
        qualite: '4K',
        prix: 10,
        cinema: 'Paris',
        placesDisponibles: 5
      }
    ]
  },
  {
    id: 3,
    titre: 'Le pére Noël est une ordure',
    description: 'Un reveillon de Noël qui tourne mal !',
    affiche: 'public/affiches/noel.PNG',
    dateDebut: '2025-05-28',
    dateFin: '2025-06-31',
    ageMinimum: 12,
    coupDeCoeur: true,
    note: 4.8,
    imageUrl: 'http://localhost:3000/affiches/noel.PNG',
    genre: 'Science-fiction',
    cinemas: ['Lille', 'Charleroi', 'Paris'],
    seances: [
      {
        id: 301,
        jour: '2025-05-28',
        debut: '21:00',
        fin: '23:30',
        qualite: 'IMAX',
        prix: 16,
        cinema: 'Lille',
        placesDisponibles: 3
      },
      {
        id: 302,
        jour: '2025-05-28',
        debut: '21:00',
        fin: '23:30',
        qualite: 'IMAX',
        prix: 16,
        cinema: 'Paris',
        placesDisponibles: 10
      },
      {
        id: 303,
        jour: '2025-05-28',
        debut: '21:00',
        fin: '23:30',
        qualite: 'IMAX',
        prix: 16,
        cinema: 'Charleroi',
        placesDisponibles: 5
      }
       ]
    },
    {
    id: 4,
    titre: 'Le parrain 1',
    description: 'Un film mythique retraçant l histoire de la famille Corleone, parrain de la mafia New Yorkaise',
    affiche: 'public/affiches/parrain.PNG',
    dateDebut: '2025-05-28',
    dateFin: '2025-06-31',
    ageMinimum: 13,
    coupDeCoeur: true,
    note: 4.8,
    imageUrl: 'http://localhost:3000/affiches/parrain.PNG',
    genre: 'Thriller',
    cinemas: ['Paris'],
    seances: [
      {
        id: 201,
        jour: '2025-05-28',
        debut: '17:30',
        fin: '19:30',
        qualite: '4K',
        prix: 10,
        cinema: 'Paris',
        placesDisponibles: 5
      }
    ]
  },
    ]
 