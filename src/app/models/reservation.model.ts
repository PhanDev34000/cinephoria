export interface Seance {
  jour: string;
  debut: string;
  fin: string;
  qualite?: string;
  cinema: string;
  prix: number;
}

export interface Film {
  titre: string;
  affiche: string; // chemin ou URL de l’image
}

export interface Reservation {
  _id?: string;
  utilisateur: string; // email ou ID
  film: Film;
  seance: Seance;
  nbPlaces: number;
  dateReservation?: string;
}
