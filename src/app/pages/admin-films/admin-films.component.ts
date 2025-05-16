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
  filmEnCours: any = null;

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

 modifierFilm(id: number) {
  const film = this.films.find(f => f.id === id);
  if (film) {
    this.filmEnCours = { ...film };
  }
}

  enregistrerModification() {
  const index = this.films.findIndex(f => f.id === this.filmEnCours.id);
  if (index !== -1) {
    this.films[index] = {
      ...this.filmEnCours,
      ageMinimum: Number(this.filmEnCours.ageMinimum),
      note: Number(this.filmEnCours.note)
    };
    alert('🎬 Film modifié');
    this.filmEnCours = null;
  }
}


}
