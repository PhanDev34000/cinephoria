import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FILMS } from '../../data/films.data';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-admin-films',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-films.component.html',
  styleUrls: ['./admin-films.component.css']
})
export class AdminFilmsComponent {
  films: Film[] = FILMS;
  nouveauFilm: Partial<Film> = {};

  ajouterFilm() {
    const nouveau = {
      ...this.nouveauFilm,
      id: Date.now(), // id unique simulé
      seances: [],
      cinemas: [],
      note: 0,
      coupDeCoeur: false
    } as Film;

    this.films.push(nouveau);
    this.nouveauFilm = {};
    alert('🎬 Film ajouté (simulation)');
  }

  supprimerFilm(id: number) {
    this.films = this.films.filter(f => f.id !== id);
    alert('🗑️ Film supprimé (simulation)');
  }
}
