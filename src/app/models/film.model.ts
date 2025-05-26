import { Seance } from './seance.model';

export interface Film {
  id: number;
  titre: string;
  description: string;
  dateDebut: string;  
  dateFin: string; 
  ageMinimum: number;
  coupDeCoeur: boolean;
  note: number; // de 0 à 5
  imageUrl: string;
  genre: string;
<<<<<<< HEAD
  cinemas: string[]; // ex : ["Paris", "Lille"]
=======
  dateAjout?: string;
  cinemas: string[]; 
>>>>>>> 62891e6 (MAJ affiche+couleur+police+filtre)
  seances: Seance[];
  };