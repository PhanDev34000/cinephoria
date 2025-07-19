import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FilmService } from '../../../services/film.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-admin-avis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-avis.component.html',
  styleUrls: ['./admin-avis.component.css']
})
export class AdminAvisComponent implements OnInit {
  avisNonValides: any[] = [];
  message: string = '';
  films: any[] = [];

  constructor(private http: HttpClient, private filmService: FilmService) {}

  ngOnInit(): void {
  this.filmService.getAll().subscribe({
    next: (films) => this.films = films,
    error: (err) => console.error('❌ Erreur chargement films :', err)
  });

  this.chargerAvis();
}


 chargerAvis(): void {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.get<any[]>('http://localhost:3000/api/avis/non-valides', { headers }).subscribe({
  next: (data) => {
    console.log('📦 Avis non validés reçus :', data); 
    this.avisNonValides = data;
  },
  error: (err) => {
    console.error('❌ Erreur chargement des avis :', err);
  }
});

}



  validerAvis(id: string): void {
    this.http.put(`http://localhost:3000/api/avis/${id}/valider`, {}).subscribe({
      next: () => {
        this.message = '✅ Avis validé';
        this.chargerAvis(); 
      },
      error: (err) => {
        console.error('❌ Erreur validation :', err);
        this.message = 'Erreur lors de la validation';
      }
    });
  }

  supprimerAvis(id: string): void {
    if (!confirm('Supprimer cet avis ?')) return;

    this.http.delete(`http://localhost:3000/api/avis/${id}`).subscribe({
      next: () => {
        this.message = '🗑️ Avis supprimé';
        this.chargerAvis(); },
      error: (err) => {
        console.error('❌ Erreur suppression :', err);
        this.message = 'Erreur lors de la suppression';
      }
    });
  }

  getTitreFilm(id: string): string {
  const film = this.films.find(f => f._id === id);
  return film ? film.titre : id;
  }

}
