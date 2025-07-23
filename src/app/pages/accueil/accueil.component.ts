import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film.service';
import { AvisService } from '../../services/avis.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
  })

export class AccueilComponent {
  filmsDuDernierMercredi: Film[] = [];
  filmsAAffiche: Film[] = [];

  constructor(private filmService: FilmService, private avisService: AvisService) {}

  ngOnInit(): void {
  const dernierMercredi = this.getDernierMercredi();

  this.filmService.getFilms().subscribe({
    next: (films: Film[]) => {
      // Tous les films à l'affiche (aucun filtrage)
      this.filmsAAffiche = films;       

      // Films du dernier mercredi (filtrés)
      this.filmsDuDernierMercredi = films.filter((film: Film) =>
        film.seances?.some((seance) => seance.jour === dernierMercredi)
      );

       // Pour chaque film, on récupère la note moyenne
      films.forEach(film => {
        this.avisService.getMoyenneNote(film._id!).subscribe({
          next: moyenne => film.note = Math.round(moyenne * 10) / 10,
          error: err => console.error(`❌ Erreur moyenne film ${film.titre}`, err)
        });
      });
    },
    error: (err: any) => {
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
