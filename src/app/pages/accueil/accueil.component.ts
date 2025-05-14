import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FILMS } from '../../data/films.data';
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

  ngOnInit(): void {
    const dernierMercredi = this.getDernierMercredi();
    this.filmsDuDernierMercredi = FILMS.filter(film => film.dateAjout === dernierMercredi);
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