import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReservationsService } from '../../services/reservations.service';
import { SallesService } from '../../services/salles.service';
import { Salle } from '../../models/salle.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-mes-seances',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './mes-seances.component.html'
})
export class MesSeancesComponent implements OnInit {
  reservations: any[] = [];
  salles: Salle[] = [];

  constructor(
    private reservationsService: ReservationsService,
    private sallesService: SallesService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Aucun token trouvé');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.email;
    
    // Charger d’abord les salles
    this.sallesService.getSalles().subscribe({
      next: (salles) => {
        this.salles = salles;

        // Ensuite charger les réservations à venir
        this.reservationsService.getReservationsAVenir(email).subscribe({
          next: (reservations) => {          
            this.reservations = reservations.map(r => {
              const salle = this.salles.find(s => s._id === r.seance.salleId);
              // Génération de sièges aléatoires
              const sieges = this.genererSieges(r.nbPlaces)
              return {
                ...r,
                seance: {
                   _id: r.seance._id || r.seanceId || r.id || 'inconnu',
                  ...r.seance,
                  nomSalle: salle?.nom || 'Inconnue',
                  sieges: sieges
                }
              };
            });
          },
          error: (err) => console.error('❌ Erreur récupération réservations :', err)
        });
      },
      error: (err) => console.error('❌ Erreur chargement salles :', err)
    });
  }

  private genererSieges(nb: number): number[] {
    const sieges: Set<number> = new Set();

    while (sieges.size < nb) {
      const num = Math.floor(Math.random() * 49) + 1; // entre 1 et 49
      sieges.add(num);
    }

    return Array.from(sieges);
  }

}
