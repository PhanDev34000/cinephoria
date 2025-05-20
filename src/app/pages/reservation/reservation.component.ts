import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CINEMAS } from '../../data/cinema.data';
import { FILMS } from '../../data/films.data';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  cinemas = CINEMAS;
  films = FILMS;
  selectedCinema: string = '';
  selectedFilmId: number | null = null;

  get filmSelectionne(): Film | null {
    return this.films.find(f => f.id === this.selectedFilmId) || null;
  }

  afficherSeances(): boolean {
    return !!(this.selectedCinema && this.filmSelectionne);
  }

 get seancesFiltrees(): any[] {
  const result = this.filmSelectionne?.seances?.filter(s => s.cinema === this.selectedCinema) || [];
  console.log('🎯 Séances filtrées :', result);
  return result;
  }

  seanceSelectionnee: any = null;
  nbPlaces: number = 0;


  selectionnerSeance(seance: any): void {
    this.seanceSelectionnee = seance;
  }

 validerReservation(): void {
  const utilisateurStr = localStorage.getItem('utilisateur');
  if (!utilisateurStr) {
    alert('❌ Vous devez être connecté pour réserver.');
    return;
  }

  const utilisateur = JSON.parse(utilisateurStr);
  const nouvelleReservation = {
    utilisateur: utilisateur.email,
    film: this.filmSelectionne,
    seance: this.seanceSelectionnee,
    nbPlaces: this.nbPlaces
  };

  const reservationsStr = localStorage.getItem('reservations');
  const reservations = reservationsStr ? JSON.parse(reservationsStr) : [];

  reservations.push(nouvelleReservation);
  localStorage.setItem('reservations', JSON.stringify(reservations));

  alert('✅ Réservation confirmée');
  this.seanceSelectionnee = null;
  this.nbPlaces = 1;
}



}
