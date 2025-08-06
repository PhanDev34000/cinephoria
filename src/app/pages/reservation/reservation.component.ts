import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models/film.model';
import { Seance } from '../../models/seance.model';
import { ReservationService } from '../../services/reservation.service';
import { FilmService } from '../../services/film.service';
import { SeanceService } from '../../services/seance.service';
import { SallesService } from '../../services/salles.service';
import { Salle } from '../../models/salle.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  villes: string[] = [];
  salles: Salle[] = [];
  films: Film[] = [];
  toutesLesSeances: Seance[] = [];
  seancesFiltrees: Seance[] = [];
  cinemas: string[] = [];
  selectedVille: string = '';
  selectedFilmId: string | null = null;
  seanceSelectionnee: Seance | null = null;
  nbPlaces: number = 1;
  filmsFiltres: Film[] = [];
  filmSelectionne: Film | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private filmService: FilmService,
    private sallesService: SallesService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
  // Charger toutes les salles
  this.sallesService.getSalles().subscribe({
    next: (salles) => {
      this.salles = salles;

      const villesSet = new Set(salles.map(s => s.ville.trim()));
      this.cinemas = Array.from(villesSet);
    },
    error: (err) => console.error('❌ Erreur chargement salles', err)
  });

  // Charger les films
  this.filmService.getFilms().subscribe({
    next: (films) => {
      this.films = films;
      this.traiterQueryParams();
    },
    error: (err) => console.error('❌ Erreur chargement films', err)
  });

  // Charger les séances
  this.seanceService.getSeances().subscribe({
    next: (seances) => {
      this.toutesLesSeances = seances;
      this.filtrerFilmsParVille();
    },
    error: (err) => console.error('❌ Erreur chargement séances', err)
  });
}


  private traiterQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const filmId = params['filmId'];
      const ville = params['cinema'];
      const jour = params['jour'];
      const heure = params['heure'];
      const qualite = params['qualite'];

      if (filmId && ville) {
        this.selectedFilmId = filmId;
        this.selectedVille = ville;

        const film = this.films.find(f => f._id === filmId);
        if (film) {
          this.filmSelectionne = film;

          const seance = this.toutesLesSeances.find(s =>
            s.filmId === filmId &&
            this.getVilleBySalleId(s.salleId) === ville &&
            s.jour === jour &&
            s.debut === heure &&
            s.qualite === qualite
          );

          this.seanceSelectionnee = seance || null;
        }
      }
    });
  }

  afficherSeances(): boolean {
    this.filmSelectionne = this.films.find(f => f._id === this.selectedFilmId);

    if (!this.filmSelectionne || !this.selectedVille) {
      this.seancesFiltrees = [];
      return false;
    }

    this.seancesFiltrees = this.toutesLesSeances.filter(s =>
      s.filmId === this.filmSelectionne!._id &&
      this.getVilleBySalleId(s.salleId) === this.selectedVille
    );
    return this.seancesFiltrees.length > 0;
  }

  getVilleBySalleId(salleId: string): string {
    const salle = this.salles.find(s => s._id === salleId);
    return salle ? salle.ville.trim() : '';
  }

  selectionnerSeance(seance: Seance): void {
  if (!seance._id && (seance as any).id) {
    seance._id = (seance as any).id; // compatibilité si le champ est mal nommé
  }
  this.seanceSelectionnee = seance;
}


  validerReservation(): void {
    
    const film = this.films.find(f => f._id === this.selectedFilmId);
    const seance = this.seanceSelectionnee;

    if (!film || !seance|| !seance._id) {
      console.warn('Film ou séance invalide, réservation annulée');      
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const utilisateurEmail = payload.email || 'inconnu@cinephoria.fr';


    const reservation = {
      utilisateur: utilisateurEmail,
      film: {
        _id: film._id,
        titre: film.titre,
        imageUrl: film.imageUrl
      },
      seance: {
        _id: seance._id,
        jour: seance.jour,
        debut: seance.debut,
        fin: seance.fin,
        qualite: seance.qualite,
        cinema: this.selectedVille,
        prix: seance.prix,
        salleId: seance.salleId
      },
      nbPlaces: this.nbPlaces
    };

    this.reservationService.ajouterReservation(reservation).subscribe({
      next: () => {
        this.router.navigate(['/mon-espace']);
      },
      error: (err) => {
        console.error('❌ Erreur API réservation :', err);
      }
    });
  }

  filtrerFilmsParVille(): void {
    if (!this.selectedVille || !this.toutesLesSeances.length) {
      this.filmsFiltres = [];
      return;
    }

    const seancesDansVille = this.toutesLesSeances.filter(s => {
      const salle = this.salles.find(salle => salle._id === s.salleId);
      return salle?.ville.trim().toLowerCase() === this.selectedVille.trim().toLowerCase();
    });

    const filmIds = [...new Set(seancesDansVille.map(s => s.filmId))];

    this.filmsFiltres = this.films.filter((f: Film) => f._id && filmIds.includes(f._id));
  }

}
