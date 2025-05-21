import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';


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
  note: number | null = null;
  commentaire: string = '';
  notesPossibles: number[] = [1, 2, 3, 4, 5];


  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
  const utilisateurStr = localStorage.getItem('utilisateur');
  if (!utilisateurStr) {
    alert('⚠️ Vous devez être connecté pour voir vos réservations.');
    return;
  }

  const utilisateur = JSON.parse(utilisateurStr);
  const email = utilisateur.email;

  console.log('📧 Email utilisé pour la recherche :', email);


  this.reservationService.getReservationsParEmail(utilisateur.email).subscribe({
    next: (data) => {
      this.reservations = data;
      console.log('📩 Réservations récupérées :', data);
    },
    error: () => {
      alert('❌ Erreur lors du chargement des réservations');
    }
  });
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

  

  supprimerReservation(id: string): void {
    if (confirm('❌ Confirmer la suppression de cette réservation ?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r._id !== id);
          alert('🗑️ Réservation supprimée');
        },
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }

  soumettreAvis(): void {
  const utilisateurStr = localStorage.getItem('utilisateur');
  if (!utilisateurStr) {
    alert('❌ Connectez-vous pour laisser un avis.');
    return;
  }

  const utilisateur = JSON.parse(utilisateurStr);

  const avis = {
    titreFilm: this.filmANoter.titre,
    note: this.note,
    commentaire: this.commentaire,
    email: utilisateur.email
  };

  this.reservationService.envoyerAvis(avis).subscribe({
    next: () => {
      alert('✅ Avis envoyé !');
      this.filmANoter = null;
      this.note = 1;
      this.commentaire = '';
    },
    error: () => alert('Erreur lors de l’envoi de l’avis.')
  });
}



}