import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SallesService } from '../../services/salles.service';
import { Salle } from '../../models/salle.model';

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
  salles: Salle[] = [];

  constructor(
    private reservationService: ReservationService,
    private sallesService: SallesService
  ) {}

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
      // Étape 1 : charger les salles
      this.sallesService.getSalles().subscribe({
        next: (salles) => {
          this.salles = salles;

          // Étape 2 : charger les réservations
          this.reservationService.getReservationsParEmail(this.emailUtilisateur!).subscribe({
            next: (data: any[]) => {
              // Ajouter nomSalle à chaque réservation
              this.reservations = data.map(res => {
                const salleTrouvee = this.salles.find(s => s._id === res.seance.salleId);
                return {
                  ...res,
                  seance: {
                    ...res.seance,
                    nomSalle: salleTrouvee?.nom || 'Inconnue'
                  }
                };
              });
            },
            error: (err: any) => {
              console.error('❌ Erreur récupération réservations', err);
            }
          });
        },
        error: (err) => {
          console.error('❌ Erreur chargement salles', err);
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
