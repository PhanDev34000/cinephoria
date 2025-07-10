import { Seance } from './seance.model';

export interface Film {
  affiche: string;
  _id?: string;
  titre: string;
  description: string;
  dateDebut: string;  
  dateFin: string; 
  ageMinimum: number;
  coupDeCoeur: boolean;
  note: number; // de 0 à 5
  imageUrl: string;
  genre: string;
  cinemas: string[]; // ex : ["Paris", "Lille"]
  dateAjout?: string;
  seances: Seance[];
  };