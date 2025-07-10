import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
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

export class MonEspaceComponent implements OnInit {
  reservations: any[] = [];
  emailUtilisateur: string | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    // Récupérer l'email depuis le token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.emailUtilisateur = payload.email;
      } catch (e) {
        console.error('❌ Erreur décodage token', e);
      }
    }

    if (this.emailUtilisateur) {
      this.reservationService.getReservationsParEmail(this.emailUtilisateur).subscribe({
        next: (data: any[]) => {
          this.reservations = data;
        },
        error: (err: any) => {
          console.error('❌ Erreur récupération réservations', err);
        }
      });
    }
  }



  supprimerReservation(id: string) {
  if (confirm('Confirmer la suppression de cette réservation ?')) {
    this.reservationService.supprimerReservation(id).subscribe({
      next: () => {
        console.log(`✅ Réservation ${id} supprimée.`);        
        this.reservations = this.reservations.filter(r => r._id !== id);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la suppression :', err);
      }
    });
    }
  }

}