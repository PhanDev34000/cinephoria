import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Film } from '../../models/film.model';
import { FILMS } from '../../data/films.data';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-films',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent {

  films: Film[] = FILMS;
  filmActif: Film | null = null;

<<<<<<< HEAD
  constructor(private router: Router) {}


=======
  constructor(private router: Router, private filmService: FilmService) {}

  ngOnInit(): void {
  this.filmService.getFilms().subscribe({
    next: (data) => {
      console.log('✅ Films chargés depuis l’API :', data);
      this.films = data;
      console.log('Films chargés depuis l’API :', data);
    },
    error: (err) => console.error('Erreur chargement films :', err)
  });
}
>>>>>>> 62891e6 (MAJ affiche+couleur+police+filtre)
// Filtres
  cinemaFiltre: string = '';
  genreFiltre: string = '';
  jourFiltre: string = '';

  // Valeurs uniques pour les <select>
  get cinemas(): string[] {
    return [...new Set(this.films.flatMap(f => f.cinemas))];
  }

  get genres(): string[] {
    return [...new Set(this.films.map(f => f.genre))];
  }

  // Films filtrés à afficher
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