import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film.service';
import { AvisService } from '../../services/avis.service';
import { HttpClientModule } from '@angular/common/http';

interface Avis {
  _id: string;
  filmId: string;
  utilisateurId: string;
  commentaire: string;
  note: number;
  valide: boolean;
  date: string;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  filmActif: Film | null = null;
  filmAvisVisible: { [filmId: string]: boolean } = {};


  // Filtres
  cinemaFiltre: string = '';
  genreFiltre: string = '';
  jourFiltre: string = '';

  // Avis stockés par film
  avisParFilm: { [filmId: string]: Avis[] } = {};

  constructor(
    private router: Router,
    private filmService: FilmService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (data) => {
        console.log('✅ Films chargés depuis l’API :', data);
        this.films = data;
        this.chargerTousLesAvis();
      },
      error: (err) => console.error('Erreur chargement films :', err)
    });
  }

  chargerTousLesAvis(): void {
    this.films.forEach((film) => {
      this.avisService.getAvisValidésParFilm(film._id!).subscribe({
        next: (avis) => {
          this.avisParFilm[film._id!] = avis;
        },
        error: (err) => {
          console.error(`Erreur chargement avis du film ${film._id} :`, err);
        }
      });
    });
  }

  getAvisPourFilm(film: Film): Avis[] {
    const id = film._id;
    return id && this.avisParFilm[id] ? this.avisParFilm[id] : [];
  }


  get cinemas(): string[] {
    return [...new Set(this.films.flatMap(f => f.cinemas))];
  }

  get genres(): string[] {
    return [...new Set(this.films.map(f => f.genre))];
  }

  get filmsFiltres(): Film[] {
    return this.films.filter(film => {
      const correspondCinema = this.cinemaFiltre ? film.cinemas.includes(this.cinemaFiltre) : true;
      const correspondGenre = this.genreFiltre ? film.genre === this.genreFiltre : true;

      const correspondJour = this.jourFiltre
        ? (() => {
            const jour = new Date(this.jourFiltre);
            jour.setHours(0, 0, 0, 0);

            const debut = new Date(film.dateDebut);
            const fin = new Date(film.dateFin);
            debut.setHours(0, 0, 0, 0);
            fin.setHours(0, 0, 0, 0);

            return jour >= debut && jour <= fin;
          })()
        : true;

      return correspondCinema && correspondGenre && correspondJour;
    });
  }

  toggleSeances(film: Film): void {
    this.filmActif = this.filmActif === film ? null : film;
    console.log('Film actif :', this.filmActif);
  }

  allerReservation(film: Film, seance: any): void {
    this.router.navigate(['/reservation'], {
      queryParams: {
        filmId: film._id,
        cinema: seance.cinema,
        jour: seance.jour,
        heure: seance.debut,
        qualite: seance.qualite
      }
    });
  }

  toggleAvis(film: Film): void {
  const id = film._id!;
  this.filmAvisVisible[id] = !this.filmAvisVisible[id];

  // Charger les avis uniquement si pas déjà faits
  if (this.filmAvisVisible[id] && !this.avisParFilm[id]) {
    this.avisService.getAvisValidésParFilm(id).subscribe({
      next: (avis) => {
        this.avisParFilm[id] = avis;
      },
      error: (err) => {
        console.error(`Erreur chargement avis du film ${id} :`, err);
      }
    });
  }
}

}
