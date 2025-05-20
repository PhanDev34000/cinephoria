import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Salle } from '../../models/salle.model';
import { SALLES } from '../../data/salles.data';

@Component({
  selector: 'app-admin-salles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-salles.component.html',
  styleUrls: ['./admin-salles.component.css']
})

export class AdminSallesComponent {
  salleEnCours: Salle | null = {
  id: 0,
  nom: '',
  capacite: 0,
  qualite: ''
};

  salles: Salle[] = [...SALLES]; // copie locale
  nouvelleSalle: Salle = {
    id: 0,
    nom: '',
    capacite: 0,
    qualite: ''
  };

  ajouterSalle(): void {
    const salle = { ...this.nouvelleSalle, id: Date.now() };
    this.salles.push(salle);
    this.nouvelleSalle = { id: 0, nom: '', capacite: 0, qualite: '' };
    alert('Salle ajoutée ✅');

    this.salleEnCours = {
      id: 0,
      nom: '',
      capacite: 0,
      qualite: ''
  };

  }

  supprimerSalle(id: number): void {
    this.salles = this.salles.filter(s => s.id !== id);
    alert('Salle supprimée ❌');
  }

 modifierSalle(id: number) {
  const salle = this.salles.find(s => s.id === id);
  if (salle) {
    this.salleEnCours = { ...salle };
  }
}

  enregistrerModification() {
  if (this.salleEnCours) {
  const index = this.salles.findIndex(s => s.id === this.salleEnCours!.id);
  if (index !== -1) {
    this.salles[index] = {
      ...this.salleEnCours,
      capacite: Number(this.salleEnCours.capacite)
    };
    alert('🏟️ Salle modifiée');
    this.salleEnCours = null;
  }
}

  }


}
