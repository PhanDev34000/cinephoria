import { Film } from '../models/film.model';

export const FILMS: Film[] = [
  {
    id: 1,
    titre: 'Le Grand Voyage',
    description: 'Un film émouvant sur la découverte de soi.',
    dateAjout: '2025-05-14', // exemple : mercredi
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    titre: 'Action Extrême',
    description: 'Explosion et adrénaline garanties.',
    dateAjout: '2025-05-13', // mardi
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    titre: 'Comédie Romantique',
    description: 'Amour, humour, et malentendus.',
    dateAjout: '2025-05-14',
    imageUrl: 'https://via.placeholder.com/150'
  }
];
