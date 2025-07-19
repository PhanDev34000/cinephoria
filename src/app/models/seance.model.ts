export interface Seance {
  _id?: string;
  jour: string;
  debut: string;
  fin: string;
  qualite: string;
  prix: number;
  cinema: string;
  placesDisponibles: number;
  filmId: string;
  salleId: string;
}
