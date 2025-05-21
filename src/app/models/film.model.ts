import { Seance } from './seance.model';

export interface Film {
  id: number;
  titre: string;
  description: string;
  ageMinimum: number;
  coupDeCoeur: boolean;
  note: number; // de 0 à 5
  imageUrl: string;
  genre: string;
  dateAjout?: string;
  cinemas: string[]; // ex : ["Paris", "Lille"]
  seances: Seance[];
  };