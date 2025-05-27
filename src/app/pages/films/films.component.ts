import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent {
  films: Film[] = [];
  filmActif: Film | null = null;

  // Filtres
  cinemaFiltre: string = '';
  genreFiltre: string = '';
  jourFiltre: string = '';

  constructor(private router: Router, private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (data) => {
        console.log('✅ Films chargés depuis l’API :', data);
        this.films = data;
      },
      error: (err) => console.error('Erreur chargement films :', err)
    });
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
        filmId: film.id,
        cinema: seance.cinema,
        jour: seance.jour,
        heure: seance.debut,
        qualite: seance.qualite
      }
    });
  }
}
