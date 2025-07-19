import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SallesService } from '../../services/salles.service';
import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film.service';
import { AvisService } from '../../services/avis.service';
import { SeanceService } from '../../services/seance.service';
import { Seance } from '../../models/seance.model';

interface Avis {
  _id: string;
  filmId: string;
  utilisateurId: string;
  commentaire: string;
  note: number;
  valide: boolean;
  date: string;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  toutesLesSeances: Seance[] = [];
  filmActif: Film | null = null;
  filmAvisVisible: { [filmId: string]: boolean } = {};

  // Filtres
  cinemaFiltre: string = '';
  genreFiltre: string = '';
  jourFiltre: string = '';

  // Avis stockés par film
  avisParFilm: { [filmId: string]: Avis[] } = {};

  constructor(
    private router: Router,
    private filmService: FilmService,
    private avisService: AvisService,
    private seanceService: SeanceService,
    private sallesService: SallesService
  ) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
        this.chargerTousLesAvis();
        this.chargerSeancesEtVilles();
        this.films.forEach(film => {
        this.avisService.getMoyenneNote(film._id!).subscribe({
  next: (moyenne) => {    
    film.note = Math.round(moyenne * 10) / 10; ;
  },
  error: (err) => {
    console.error(`❌ Erreur moyenne ${film.titre}`, err);
    film.note = 0;
    }});
  });
  },      
      error: (err) => console.error('Erreur chargement films :', err)
    });
  }

  chargerSeancesEtVilles(): void {
    this.seanceService.getSeances().subscribe({
      next: (seances) => {
        this.toutesLesSeances = seances;

    this.films.forEach(film => {
      film.seances = seances.filter(s => s.filmId === film._id);
    });


        // Charger les salles pour relier salleId → ville
        this.sallesService.getSalles().subscribe({
          next: (salles) => {
            this.films.forEach(film => {
              const villes = seances
                .filter(s => s.filmId === film._id)
                .map(s => {
                  const salle = salles.find(sa => sa._id === s.salleId);
                  return salle?.ville?.trim(); // on récupère la ville via la salle
                })
                .filter((v): v is string => !!v); // on garde uniquement les valeurs non nulles

              film.villes = [...new Set(villes)];
            });
          },
          error: (err) => console.error('❌ Erreur chargement salles', err)
        });
      },
      error: (err) => console.error('❌ Erreur chargement séances', err)
    });
  }


  chargerTousLesAvis(): void {
    this.films.forEach((film) => {
      this.avisService.getAvisValidésParFilm(film._id!).subscribe({
        next: (avis) => {
          this.avisParFilm[film._id!] = avis;
        },
        error: (err) => {
          console.error(`Erreur chargement avis du film ${film._id} :`, err);
        }
      });
    });
  }

  getAvisPourFilm(film: Film): Avis[] {
    const id = film._id;
    return id && this.avisParFilm[id] ? this.avisParFilm[id] : [];
  }

  get genres(): string[] {
    return [...new Set(this.films.map(f => f.genre))];
  }

  get filmsFiltres(): Film[] {
    return this.films.filter(film => {
      const correspondGenre = this.genreFiltre ? film.genre === this.genreFiltre : true;

      const correspondJour = this.jourFiltre
        ? (() => {
            const jour = new Date(this.jourFiltre);
            jour.setHours(0, 0, 0, 0);

            const debut = new Date(film.dateDebut);
            const fin = new Date(film.dateFin);
            debut.setHours(0, 0, 0, 0);
            fin.setHours(0, 0, 0, 0);

            return jour >= debut && jour <= fin;
          })()
        : true;

      return correspondGenre && correspondJour;
    });
  }

  get cinemas(): string[] {
  return [...new Set(this.films.flatMap(f => f.villes || []))];
}


  toggleSeances(film: Film): void {
    this.filmActif = this.filmActif === film ? null : film;
  }

  allerReservation(film: Film, seance: any): void {
    this.router.navigate(['/reservation'], {
      queryParams: {
        filmId: film._id,
        cinema: seance.ville, 
        jour: seance.jour,
        heure: seance.debut,
        qualite: seance.qualite
      }
    });
  }

  toggleAvis(film: Film): void {
    const id = film._id!;
    this.filmAvisVisible[id] = !this.filmAvisVisible[id];

    if (this.filmAvisVisible[id] && !this.avisParFilm[id]) {
      this.avisService.getAvisValidésParFilm(id).subscribe({
        next: (avis) => {
          this.avisParFilm[id] = avis;
        },
        error: (err) => {
          console.error(`Erreur chargement avis du film ${id} :`, err);
        }
      });
    }
  }
}
