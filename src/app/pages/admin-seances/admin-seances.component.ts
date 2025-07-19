import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Film } from '../../models/film.model';
import { SeanceService } from '../../services/seance.service';
import { Seance } from '../../models/seance.model';
import { FilmService } from '../../services/film.service';
import { SallesService } from '../../services/salles.service';
import { Salle } from '../../models/salle.model';


@Component({
  selector: 'app-admin-seances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-seances.component.html',
  styleUrls: ['./admin-seances.component.css']
})
export class AdminSeancesComponent implements OnInit {
  films: Film[] = [];
  filmSelectionne: (Film & { seances: Seance[] }) | null = null;
  seances: Seance[] = [];
  salles: Salle[] = [];

 // nouvelleSeance: any = {};
  seanceEnCours: any = {
  id: 0,
  jour: '',
  debut: '',
  fin: '',
  qualite: '',
  prix: null,
  salleId: '',
  placesDisponibles: null
};  

constructor(private seanceService: SeanceService, private filmService: FilmService,  private salleService: SallesService) { }

ngOnInit(): void {
  this.filmService.getFilms().subscribe({
    next: (data) => {
      this.films = data;
      console.log('🎬 Films chargés dans admin-seances :', this.films);
    },
    error: (err) => console.error('❌ Erreur chargement films', err)
  });

  this.salleService.getSalles().subscribe({
    next: (data) => {
      this.salles = data;
      console.log('📍 Salles chargées dans admin-seances :', this.salles);
    },
    error: (err) => console.error('❌ Erreur chargement salles', err)
  });
}

  ajouterSeance() {
  if (!this.filmSelectionne || !this.seanceEnCours) return;

  const seanceAvecFilm = {
    ...this.seanceEnCours,
    filmId: this.filmSelectionne._id, 
    prix: Number(this.seanceEnCours.prix),
    placesDisponibles: Number(this.seanceEnCours.placesDisponibles)
  };

  this.seanceService.ajouterSeance(seanceAvecFilm).subscribe({
    next: (savedSeance) => {
      console.log('✅ Séance enregistrée côté serveur :', savedSeance);      
      this.seanceService.getSeances().subscribe({
      next: (seances) => {
        const seancesDuFilm = seances.filter(s => s.filmId === this.filmSelectionne!._id);
        this.filmSelectionne!.seances = seancesDuFilm;
        this.seances = seancesDuFilm;
      },
      error: (err) => {
        console.error('❌ Erreur lors du rafraîchissement des séances', err);
      }
  });

      alert('Séance ajoutée ✅');
      this.resetForm();
    },
    error: (err) => {
      console.error('❌ Erreur API :', err);
      alert('Erreur lors de l’enregistrement');
    }
  });
}

resetForm() {
  this.seanceEnCours = {
    id: 0,
    jour: '',
    debut: '',
    fin: '',
    qualite: '',
    prix: null,
    cinema: '',
    placesDisponibles: null
  };
}
 supprimerSeance(seanceId: string): void {
  if (!confirm('Supprimer cette séance ?')) return;

  this.seanceService.supprimerSeance(seanceId).subscribe({
    next: () => {
      // Mise à jour locale après suppression côté serveur
      if (this.filmSelectionne) {
        this.filmSelectionne.seances = this.filmSelectionne.seances.filter(s => s._id !== seanceId);
      }
      this.seances = this.seances.filter(s => s._id !== seanceId);
      alert('✅ Séance supprimée');
    },
    error: (err) => {
      console.error('❌ Erreur suppression séance', err);
      alert('Erreur lors de la suppression');
    }
  });
}


  modifierSeance(seance: any) {
  this.seanceEnCours = { ...seance };
  }

  enregistrerModification() {
  if (!this.filmSelectionne) return;

  const index = this.filmSelectionne.seances.findIndex(s => s._id === this.seanceEnCours.id);
  if (index !== -1) {
    this.filmSelectionne.seances[index] = {
      ...this.seanceEnCours,
      prix: Number(this.seanceEnCours.prix),
      placesDisponibles: Number(this.seanceEnCours.placesDisponibles)
    };
    alert('📝 Séance modifiée avec succès');   
    this.seanceEnCours = null;
  }
  }

  chargerSeancesFilm(filmId: string): void {
  this.seanceService.getSeances().subscribe({
    next: (seances) => {
      this.seances = seances.filter(s => s.filmId === filmId);
    },
    error: (err) => {
      console.error('Erreur chargement séances :', err);
    }
  });
  }

  onFilmSelect(film: Film): void {
  this.filmSelectionne = { ...film, seances: film.seances || [] };
  this.seanceEnCours = {
    jour: '',
    debut: '',
    fin: '',
    qualite: '',
    prix: null,
    cinema: '',
    placesDisponibles: null,
    filmId: film._id!
  };
  this.chargerSeancesFilm(film._id!); }

  getNomSalle(salleId: string): string {
  const salle = this.salles.find(s => s._id === salleId);
  return salle ? salle.nom : 'Salle inconnue';
}

}
