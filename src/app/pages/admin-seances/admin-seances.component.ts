import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Film } from '../../models/film.model';
import { FILMS } from '../../data/films.data';

@Component({
  selector: 'app-admin-seances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-seances.component.html',
  styleUrls: ['./admin-seances.component.css']
})
export class AdminSeancesComponent {
  films: Film[] = FILMS;
  filmSelectionne: Film | null = null;
  nouvelleSeance: any = {};
  seanceEnCours: any = null;
  
  

  ajouterSeance() {
    if (!this.filmSelectionne) return;

    const seanceAvecId = {
      ...this.nouvelleSeance,
      id: Date.now(),
      prix: Number(this.nouvelleSeance.prix),
      placesDisponibles: Number(this.nouvelleSeance.placesDisponibles)
    };
console.log('filmSelectionne.seances est un tableau ?', Array.isArray(this.filmSelectionne?.seances));
    this.filmSelectionne.seances.push(seanceAvecId);
    alert('Séance ajoutée ✅');
    this.nouvelleSeance = {};

    this.seanceEnCours = {
  id: 0,
  jour: '',
  debut: '',
  fin: '',
  qualite: '',
  prix: 0,
  cinema: '',
  placesDisponibles: 0
};

  }

  supprimerSeance(seanceId: number) {
    if (!this.filmSelectionne) return;
    this.filmSelectionne.seances = this.filmSelectionne.seances.filter(s => s.id !== seanceId);
    alert('Séance supprimée ❌');
  }
  modifierSeance(seance: any) {
  this.seanceEnCours = { ...seance };
  }
  enregistrerModification() {
  if (!this.filmSelectionne) return;

  const index = this.filmSelectionne.seances.findIndex(s => s.id === this.seanceEnCours.id);
  if (index !== -1) {
    this.filmSelectionne.seances[index] = {
      ...this.seanceEnCours,
      prix: Number(this.seanceEnCours.prix),
      placesDisponibles: Number(this.seanceEnCours.placesDisponibles)
    };
    alert('📝 Séance modifiée avec succès');
   
    this.seanceEnCours = null;

  }
  }


}
