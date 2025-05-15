import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CINEMAS } from '../../data/cinema.data';
import { FILMS } from '../../data/films.data';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  cinemas = CINEMAS;
  films = FILMS;

  selectedCinema: string = '';
  selectedFilmId: number | null = null;

  get filmSelectionne(): Film | null {
    return this.films.find(f => f.id === this.selectedFilmId) || null;
  }

  afficherSeances(): boolean {
    return !!(this.selectedCinema && this.filmSelectionne);
  }

 get seancesFiltrees(): any[] {
  const result = this.filmSelectionne?.seances?.filter(s => s.cinema === this.selectedCinema) || [];
  console.log('🎯 Séances filtrées :', result);
  return result;
  }

  seanceSelectionnee: any = null;
  nbPlaces: number = 0;


  selectionnerSeance(seance: any): void {
    this.seanceSelectionnee = seance;
  }

 validerReservation() {
  if (!localStorage.getItem('utilisateur')) {
    alert("Vous devez être connecté pour réserver.");
    window.location.href = '/login?redirectTo=/reservation';
    return;
  }

  if (this.nbPlaces > this.seanceSelectionnee.placesDisponibles) {
    alert(`❌ Il ne reste que ${this.seanceSelectionnee.placesDisponibles} places pour cette séance.`);
    return;
  }

  // Récupération des réservations existantes
  const commandes = JSON.parse(localStorage.getItem('commandes') || '[]');

  const nouvelleCommande = {
    utilisateur: JSON.parse(localStorage.getItem('utilisateur') || '{}'),
    film: this.filmSelectionne?.titre,
    cinema: this.selectedCinema,
    seance: this.seanceSelectionnee,
    places: this.nbPlaces,
    total: this.nbPlaces * this.seanceSelectionnee.prix,
    date: new Date().toISOString()
  };

  commandes.push(nouvelleCommande);
  localStorage.setItem('commandes', JSON.stringify(commandes));

  // Mise à jour des places restantes (optionnel en local)
  this.seanceSelectionnee.placesDisponibles -= this.nbPlaces;

  alert('🎉 Réservation enregistrée avec succès !');
  this.nbPlaces = 0;
  this.seanceSelectionnee = null;
}


}
