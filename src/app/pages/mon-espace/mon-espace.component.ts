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

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur') || '{}');

    if (utilisateur.email) {
      this.reservationService.getReservations().subscribe({
        next: (data) => {
          this.reservations = data.filter(r => r.utilisateur === utilisateur.email);
          console.log('✅ Réservations récupérées :', this.reservations);
        },
        error: (err) => console.error('❌ Erreur récupération réservations :', err)
      });
    }
  }

  supprimerReservation(id: string) {
  if (confirm('Confirmer la suppression de cette réservation ?')) {
    this.reservationService.supprimerReservation(id).subscribe({
      next: () => {
        console.log(`✅ Réservation ${id} supprimée.`);
        // Met à jour la liste localement
        this.reservations = this.reservations.filter(r => r._id !== id);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la suppression :', err);
      }
    });
    }
  }

}