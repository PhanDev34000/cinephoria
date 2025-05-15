import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilmSimple } from '../../models/film-simple.model';
import { FILMS_SIMPLE } from '../../data/film-simple.data';




@Component({
  selector: 'app-accueil',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

})
export class AccueilComponent {
  filmsDuDernierMercredi: FilmSimple[] = [];

  ngOnInit(): void {
    const dernierMercredi = this.getDernierMercredi();
    this.filmsDuDernierMercredi = FILMS_SIMPLE.filter(
      (film: FilmSimple) => film.dateAjout === dernierMercredi
    );
  }

  getDernierMercredi(): string {
    const today = new Date();
    const day = today.getDay();
    const diff = (day >= 3) ? day - 3 : 7 + day - 3;
    const mercredi = new Date(today);
    mercredi.setDate(today.getDate() - diff);
    return mercredi.toISOString().split('T')[0]; // format 'YYYY-MM-DD'
  }
}