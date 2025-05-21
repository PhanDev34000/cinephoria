import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CINEMAS } from '../../data/cinema.data';
import { FILMS } from '../../data/films.data';
import { Film } from '../../models/film.model';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';


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
  seanceSelectionnee: any = null;
  nbPlaces: number = 1;

  constructor(private reservationService: ReservationService, private router: Router) {}

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
    const reservation = {
      filmId: this.selectedFilmId,
      titre: this.filmSelectionne?.titre,
      cinema: this.selectedCinema,
      jour: this.seanceSelectionnee.jour,
      heure: this.seanceSelectionnee.debut,
      qualite: this.seanceSelectionnee.qualite,
      nomClient: 'Nom temporaire',
      email: utilisateur.email,
      nbPlaces: this.nbPlaces
    };

    this.reservationService.envoyerReservation(reservation).subscribe({
      next: () => {
        alert('🎫 Réservation enregistrée !');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('❌ Erreur lors de la réservation', err);
        alert('Erreur lors de la réservation.');
      }
    });
  }
}
