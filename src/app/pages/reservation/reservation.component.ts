import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CINEMAS } from '../../data/cinema.data';
import { Film } from '../../models/film.model';
import { Seance } from '../../models/seance.model';

import { ReservationService } from '../../services/reservation.service';
import { FilmService } from '../../services/film.service';
import { SeanceService } from '../../services/seance.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  cinemas = CINEMAS;
  films: Film[] = [];
  toutesLesSeances: Seance[] = [];
  seancesFiltrees: Seance[] = [];

  selectedCinema: string = '';
  selectedFilmId: string | null = null;
  seanceSelectionnee: Seance | null = null;
  nbPlaces: number = 1;

  filmSelectionne: Film | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private filmService: FilmService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    // Charger les films
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
        console.log('🎬 Films chargés :', this.films);
        this.traiterQueryParams();
      },
      error: (err) => console.error('❌ Erreur chargement films', err)
    });

    // Charger les séances
    this.seanceService.getSeances().subscribe({
      next: (seances) => {
        this.toutesLesSeances = seances;
        console.log('📆 Séances chargées :', this.toutesLesSeances);
      },
      error: (err) => console.error('❌ Erreur chargement séances', err)
    });
  }

  private traiterQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const filmId = params['filmId'];
      const cinema = params['cinema'];
      const jour = params['jour'];
      const heure = params['heure'];
      const qualite = params['qualite'];

      if (filmId && cinema) {
        this.selectedFilmId = filmId;
        this.selectedCinema = cinema;

        const film = this.films.find(f => f._id === filmId);
        if (film) {
          this.filmSelectionne = film;
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
    this.filmSelectionne = this.films.find(f => f._id === this.selectedFilmId);

    if (!this.filmSelectionne || !this.selectedCinema) {
      this.seancesFiltrees = [];
      return false;
    }

    this.seancesFiltrees = this.toutesLesSeances.filter(
      s => s.filmId === this.filmSelectionne!._id &&
           s.cinema.toLowerCase().trim() === this.selectedCinema.toLowerCase().trim()
    );

    console.log('🎯 Séances filtrées :', this.seancesFiltrees);
    return this.seancesFiltrees.length > 0;
  }

  selectionnerSeance(seance: Seance): void {
    this.seanceSelectionnee = seance;
  }

  validerReservation(): void {
    const film = this.films.find(f => f._id === this.selectedFilmId);
    const seance = this.seanceSelectionnee;

    if (!film || !seance) {
      console.error('❌ Film ou séance manquant');
      return;
    }

    // ✅ Décoder le token pour récupérer l'utilisateur
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ Token manquant');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const utilisateurEmail = payload.email || 'inconnu@cinephoria.fr';

    const reservation = {
      utilisateur: utilisateurEmail,
      film: {
        _id: film._id,
        titre: film.titre,
        imageUrl: film.imageUrl
      },
      seance: {
        jour: seance.jour,
        debut: seance.debut,
        fin: seance.fin,
        qualite: seance.qualite,
        cinema: seance.cinema,
        prix: seance.prix
      },
      nbPlaces: this.nbPlaces
    };

    console.log('📦 Données envoyées à l’API :', reservation);

    this.reservationService.ajouterReservation(reservation).subscribe({
      next: () => {
        console.log('✅ Réservation enregistrée');
        this.router.navigate(['/mon-espace']);
      },
      error: (err) => {
        console.error('❌ Erreur API réservation :', err);
      }
    });
  }
}
