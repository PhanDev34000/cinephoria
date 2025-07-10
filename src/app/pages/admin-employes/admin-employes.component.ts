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
  employeEnCours: Employe = { nom: '', prenom: '', email: '', nomUtilisateur: '', motDePasse: '', role: 'employe'};
  //nouvelEmploye = { nom: '', prenom: '', email: '', nomUtilisateur: '', motDePasse: '', role: 'employe'};

  constructor(private employesService: EmployesService) {}

  ngOnInit(): void {
    this.chargerEmployes();
  }

  chargerEmployes(): void {
    this.employesService.getEmployes().subscribe({
      next: (data) => this.employes = data,
      error: (err) => console.error('Erreur chargement employés :', err)
    });
  }

  ajouterEmploye(): void {
    this.employesService.ajouterEmploye(this.employeEnCours).subscribe({
      next: (data) => {
        this.employes.push(data);
        this.employeEnCours = { nom: '', prenom: '', email: '', nomUtilisateur: '', motDePasse: '', role: 'employe'};
        alert('Employé ajouté ✅');
      },
      error: (err) => {
        console.error('Erreur ajout :', err);
        alert('Erreur ajout employé');
      }
    });
  }

  modifierEmploye(employe: Employe): void {
    this.employeEnCours = { ...employe };
  }

  enregistrerModification(): void {
    if (!this.employeEnCours._id) return;

    this.employesService.modifierEmploye(this.employeEnCours._id, this.employeEnCours).subscribe({
      next: () => {
        const index = this.employes.findIndex(e => e._id === this.employeEnCours._id);
        if (index !== -1) this.employes[index] = { ...this.employeEnCours };
        this.employeEnCours = { nom: '', prenom: '', email: '', nomUtilisateur: '', motDePasse: '', role: 'employe'};
        alert('Employé modifié ✅');
      },
      error: () => alert('Erreur modification')
    });
  }

  supprimerEmploye(id: string): void {
    this.employesService.supprimerEmploye(id).subscribe({
      next: () => {
        this.employes = this.employes.filter(e => e._id !== id);
        alert('Employé supprimé ❌');
      },
      error: () => alert('Erreur suppression')
    });
  }
}
