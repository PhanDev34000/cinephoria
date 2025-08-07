export interface Seance {
  jour: string;
  debut: string;
  fin: string;
  qualite?: string;
  cinema: string;
  //salle : String;
  prix: number;
}

export interface Film {
  titre: string;
  affiche: string; 
}

export interface Reservation {
  _id?: string;
  utilisateur: string; 
  film: Film;
  seance: Seance;
  nbPlaces: number;
  dateReservation?: string;
}
