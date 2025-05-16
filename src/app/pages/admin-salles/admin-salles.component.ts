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
  }

  supprimerSalle(id: number): void {
    this.salles = this.salles.filter(s => s.id !== id);
    alert('Salle supprimée ❌');
  }
}
