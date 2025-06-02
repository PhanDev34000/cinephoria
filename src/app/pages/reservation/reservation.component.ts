import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CINEMAS } from '../../data/cinema.data';
import { FILMS } from '../../data/films.data';
import { Film } from '../../models/film.model';
import { ActivatedRoute } from '@angular/router';
import { Seance } from '../../models/seance.model';
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
  seanceSelectionnee: Seance | null = null;
  nbPlaces: number = 1;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {}

  get filmSelectionne(): Film | null {
    return this.films.find(f => f.id === this.selectedFilmId) || null;
  }

  get seancesFiltrees(): Seance[] {
    return this.filmSelectionne?.seances?.filter(s => s.cinema === this.selectedCinema) || [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filmId = +params['filmId'];
      const cinema = params['cinema'];
      const jour = params['jour'];
      const heure = params['heure'];
      const qualite = params['qualite'];

      if (filmId && cinema) {
        this.selectedFilmId = filmId;
        this.selectedCinema = cinema;

        const film = this.films.find(f => f.id === filmId);
        if (film) {
          const seance = film.seances.find(s =>
            s.cinema === cinema &&
            s.jour === jour &&
            s.debut === heure &&
            s.qualite === qualite
          );
          this.seanceSelectionnee = seance || null;
        }
      }
    });
  }

  afficherSeances(): boolean {
    return !!(this.selectedCinema && this.filmSelectionne);
  }

  selectionnerSeance(seance: Seance): void {
    this.seanceSelectionnee = seance;
  }

  validerReservation(): void {
    const utilisateurStr = localStorage.getItem('utilisateur');
    if (!utilisateurStr) {
      alert('❌ Vous devez être connecté pour réserver.');
      return;
    }
    const utilisateur = JSON.parse(utilisateurStr);

    if (!this.seanceSelectionnee || !this.filmSelectionne) {
    alert('❌ Veuillez d’abord sélectionner une séance.');
    return;
  }

    const nouvelleReservation = {
      utilisateur: utilisateur._id || utilisateur.email,
      film: this.filmSelectionne,
      seance: {
        jour: this.seanceSelectionnee.jour,
        debut: this.seanceSelectionnee.debut,
        fin: this.seanceSelectionnee.fin,
        qualite: this.seanceSelectionnee.qualite,
        cinema: this.seanceSelectionnee.cinema,
        prix: this.seanceSelectionnee.prix
      },
      nbPlaces: this.nbPlaces
  };
console.log('🎯 Payload envoyé :', JSON.stringify(nouvelleReservation, null, 2));


    this.reservationService.ajouterReservation(nouvelleReservation).subscribe({
    next: () => {
      alert('✅ Réservation confirmée !');
      this.seanceSelectionnee = null;
      this.nbPlaces = 1;
    },
    error: (err) => {
      console.error('❌ Erreur depuis l’API :', err);
      alert('❌ Une erreur est survenue lors de la réservation.');
    }
  });
}
}
