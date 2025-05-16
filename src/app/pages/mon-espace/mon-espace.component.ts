import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mon-espace',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.css']
})

export class MonEspaceComponent {
  utilisateur: any = null;
  reservations: any[] = [];
  filmANoter: any = null;
  note: number = 5;
  commentaire: string = '';

  ngOnInit(): void {
    const userStr = localStorage.getItem('utilisateur');
    if (userStr) {
      this.utilisateur = JSON.parse(userStr);
      this.chargerReservations();
    }
  }

  chargerReservations(): void {
    const allReservationsStr = localStorage.getItem('reservations');
    if (allReservationsStr) {
      const allReservations = JSON.parse(allReservationsStr);
      this.reservations = allReservations.filter(
        (r: any) => r.utilisateur === this.utilisateur.email
      );
    }
  }

  estExpiree(dateJour: string): boolean {
    return new Date(dateJour) < new Date();
  }

  soumettreAvis(): void {
  const nouvelAvis = {
    filmId: this.filmANoter.film.id,
    utilisateur: this.utilisateur.email,
    note: this.note,
    commentaire: this.commentaire,
    valide: false // par défaut, pas encore validé
  };

  const avisStr = localStorage.getItem('avis');
  const avis = avisStr ? JSON.parse(avisStr) : [];

  avis.push(nouvelAvis);
  localStorage.setItem('avis', JSON.stringify(avis));

  alert('✅ Votre avis a bien été soumis. Il sera validé par un employé.');
  this.filmANoter = null;
  this.note = 5;
  this.commentaire = '';
}

}