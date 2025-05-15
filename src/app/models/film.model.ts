export interface Film {
  id: number;
  titre: string;
  description: string;
  ageMinimum: number;
  coupDeCoeur: boolean;
  note: number; // de 0 à 5
  imageUrl: string;
  genre: string;
  cinemas: string[]; // ex : ["Paris", "Lille"]
  seances: {
    jour: string; // "2025-05-15"
    debut: string; // "18:00"
    fin: string; // "20:00"
    qualite: string; // "4DX", "3D", etc.
    prix: number;
    cinema: string;
  }[];
}
