import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { FilmSimple } from '../../models/film-simple.model';
//import { FILMS_SIMPLE } from '../../data/film-simple.data';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film.model';


@Component({
  selector: 'app-accueil',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

})

export class AccueilComponent {
  filmsDuDernierMercredi: Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    const dernierMercredi = this.getDernierMercredi();

    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.filmsDuDernierMercredi = films.filter((film: any) => {
          // Film.dateAjout doit être formaté en 'YYYY-MM-DD'
          const dateAjout = film.dateAjout?.split('T')[0];
          return dateAjout === dernierMercredi;
        });
        console.log('🎬 Films du mercredi :', this.filmsDuDernierMercredi);
      },
      error: (err) => {
        console.error('❌ Erreur chargement des films', err);
      }
    });
  }

  getDernierMercredi(): string {
    const today = new Date();
    const day = today.getDay();
    const diff = (day >= 3) ? day - 3 : 7 + day - 3;
    const mercredi = new Date(today);
    mercredi.setDate(today.getDate() - diff);
    return mercredi.toISOString().split('T')[0];
  }
}
