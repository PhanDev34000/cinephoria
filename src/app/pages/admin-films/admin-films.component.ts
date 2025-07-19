import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-films',
  templateUrl: './admin-films.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./admin-films.component.css']
})
export class AdminFilmsComponent implements OnInit {
  films: Film[] = [];
  filmEnCours: Partial<Film> | null = null;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.chargerFilms();
  }

  chargerFilms(): void {
    this.filmService.getFilms().subscribe({
      next: (films) => this.films = films,
      error: (err) => console.error('Erreur chargement films :', err)
    });
  }

  ajouterFilm(): void {
    const film: Film = {
      ...this.filmEnCours,
      titre: this.filmEnCours?.titre || '',
      description: this.filmEnCours?.description || '',
      imageUrl: this.filmEnCours?.imageUrl || '',
      ageMinimum: this.filmEnCours?.ageMinimum || 0,
      genre: this.filmEnCours?.genre || '',
      note: this.filmEnCours?.note || 0,
      coupDeCoeur: false,
      affiche: '',
      dateDebut: '',
      dateFin: '',
      villes: [],
      seances: []
    };

    this.filmService.ajouterFilm(film).subscribe({
      next: (f) => {
        this.films.push(f);
        this.filmEnCours = null;
        alert('✅ Film ajouté');
      },
      error: (err) => {
        console.error('Erreur ajout film :', err);
        alert('❌ Erreur ajout film');
      }
    });
  }

  modifierFilm(id: string): void {
    const film = this.films.find(f => f._id === id);
    if (film) {
      this.filmEnCours = { ...film };
    }
  }

  enregistrerModification(): void {
    if (!this.filmEnCours || !this.filmEnCours._id) return;

    this.filmService.modifierFilm(this.filmEnCours._id, this.filmEnCours).subscribe({
      next: (filmMaj) => {
        const index = this.films.findIndex(f => f._id === filmMaj._id);
        if (index !== -1) this.films[index] = filmMaj;
        this.filmEnCours = null;
        alert('✅ Film modifié');
      },
      error: (err) => {
        console.error('Erreur modif film :', err);
        alert('❌ Erreur modification film');
      }
    });
  }

  supprimerFilm(id: string): void {
    this.filmService.supprimerFilm(id).subscribe({
      next: () => {
        this.films = this.films.filter(f => f._id !== id);
        alert('🗑️ Film supprimé');
      },
      error: (err) => {
        console.error('Erreur suppression :', err);
        alert('❌ Erreur suppression');
      }
    });
  }
}
