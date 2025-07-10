import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Salle } from '../../models/salle.model';
import { SallesService } from '../../services/salles.service';

@Component({
  selector: 'app-admin-salles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-salles.component.html',
  styleUrls: ['./admin-salles.component.css']
})
export class AdminSallesComponent {
  salleEnCours: any = {
    _id: null,
    nom: '',
    ville: '',
    capacite: '',
    qualiteProjection: ''
  };

  salles: Salle[] = [];

  constructor(private sallesService: SallesService) {}

  ngOnInit(): void {
    this.sallesService.getSalles().subscribe({
      next: (data) => {
        this.salles = data;
      },
      error: (err) => {
        console.error('Erreur chargement des salles :', err);
      }
    });
  }

  ajouterSalle(): void {
    const salle = {
      nom: this.salleEnCours.nom,
      ville: this.salleEnCours.ville,
      capacite: Number(this.salleEnCours.capacite),
      qualiteProjection: this.salleEnCours.qualiteProjection
    };

    this.sallesService.ajouterSalle(salle).subscribe({
      next: (savedSalle) => {
        console.log('✅ Salle enregistrée :', savedSalle);
        this.salles.push(savedSalle);
        alert('Salle ajoutée ✅');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Erreur API :', err);
        alert('Erreur lors de l’enregistrement');
      }
    });
  }

  modifierSalle(salle: Salle): void {
    this.salleEnCours = { ...salle };
  }

  enregistrerModification(): void {
  if (!this.salleEnCours || !this.salleEnCours._id) return;

  const salleModifiee: Salle = {
    _id: this.salleEnCours._id,
    nom: this.salleEnCours.nom,
    ville: this.salleEnCours.ville,
    capacite: Number(this.salleEnCours.capacite),
    qualiteProjection: this.salleEnCours.qualite
  };

  this.sallesService.modifierSalle(salleModifiee._id!, salleModifiee).subscribe({
    next: (updatedSalle) => {
      const index = this.salles.findIndex(s => s._id === updatedSalle._id);
      if (index !== -1) this.salles[index] = updatedSalle;

      alert('🏟️ Salle modifiée dans la base de données ✅');
      this.resetForm();
    },
    error: (err) => {
      console.error('❌ Erreur mise à jour salle :', err);
      alert('Erreur lors de la modification');
    }
  });
}


  supprimerSalle(id: string): void {
  this.sallesService.supprimerSalle(id).subscribe({
    next: () => {
      this.salles = this.salles.filter(s => s._id !== id);
      alert('Salle supprimée ✅');
    },
    error: (err) => {
      console.error('❌ Erreur suppression :', err);
      alert("Erreur lors de la suppression");
    }
  });
}


  resetForm(): void {
    this.salleEnCours = {
      _id: null,
      nom: '',
      ville: '',
      capacite: '',
      qualiteProjection: ''
    };
  }
}
