import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employe } from '../../models/employe.model';
import { EmployesService } from '../../services/employes.service';

@Component({
  selector: 'app-admin-employes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-employes.component.html',
  styleUrls: ['./admin-employes.component.css']
})
export class AdminEmployesComponent implements OnInit {
  employes: Employe[] = [];
  employeEnCours: Partial<Employe> | null = null;

  constructor(private employesService: EmployesService) {}

  ngOnInit(): void {
    this.chargerEmployes();
  }

  chargerEmployes(): void {
  this.employesService.getEmployes().subscribe({
    next: (data) => {
      console.log('👥 Employés récupérés :', data); 
      this.employes = data;
    },
    error: (err) => console.error('Erreur chargement employés :', err)
  });
}

  ajouterEmploye(): void {
    if (!this.employeEnCours) return;

    const nouvelEmploye: Employe = {
      nom: this.employeEnCours?.nom || '',
      prenom: this.employeEnCours?.prenom || '',
      email: this.employeEnCours?.email || '',
      nomUtilisateur: this.employeEnCours?.nomUtilisateur || '',
      motDePasse: this.employeEnCours?.motDePasse || '',
      role: this.employeEnCours?.role || 'employe'
    };

    this.employesService.ajouterEmploye(nouvelEmploye).subscribe({
      next: (nouvelEmploye) => {
        this.employes.push(nouvelEmploye);
        this.resetForm();
        alert('✅ Employé ajouté');
      },
      error: (err) => {
        console.error('❌ Erreur ajout employé :', err);
        alert('❌ Erreur lors de l’ajout');
      }
    });
  }

  modifierEmploye(employe: Employe): void {    
    this.employeEnCours = { ...employe };
  }

  enregistrerModification(): void {    
    if (!this.employeEnCours || !this.employeEnCours._id) { console.warn('⛔ Aucune donnée employé en cours ou ID manquant.'); 
      return; };

    const employeModifie: Employe = {
      _id: this.employeEnCours._id!,
      nom: this.employeEnCours.nom || '',
      prenom: this.employeEnCours.prenom || '',
      email: this.employeEnCours.email || '',
      nomUtilisateur: this.employeEnCours.nomUtilisateur || '',
      motDePasse: this.employeEnCours.motDePasse || '',
      role: this.employeEnCours.role || 'employe'
    };

    this.employesService.modifierEmploye(employeModifie._id!, employeModifie).subscribe({
      next: (employeModifie) => {
        const index = this.employes.findIndex(e => e._id === employeModifie._id);
        if (index !== -1) this.employes[index] = employeModifie;
        this.resetForm();
        alert('✅ Employé modifié');
      },
      error: () => alert('❌ Erreur modification')
    });
  }

  supprimerEmploye(id: string): void {
    this.employesService.supprimerEmploye(id).subscribe({
      next: () => {
        this.employes = this.employes.filter(e => e._id !== id);
        alert('🗑️ Employé supprimé');
      },
      error: () => alert('❌ Erreur suppression')
    });
  }

  resetForm(): void {
    this.employeEnCours = {
      nom: '',
      prenom: '',
      email: '',
      nomUtilisateur: '',
      motDePasse: '',
      role: 'employe'
    };
  }
}
