import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../models/salle.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SallesService {
  private apiUrl = 'http://localhost:3000/api/salles';

  constructor(private http: HttpClient) {}

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>('http://localhost:3000/api/salles');
  }

  ajouterSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }

  supprimerSalle(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  modifierSalle(id: string, salle: Salle) {
  return this.http.put<Salle>(`${this.apiUrl}/${id}`, salle);
  }
  getCinemas(): Observable<string[]> {
    return this.http.get<Salle[]>('http://localhost:3000/api/salles').pipe( // ou '/api/salles' si proxy
      map((salles) => {
        const villes = salles.map(s => s.ville?.trim()).filter((v, i, arr) => v && arr.indexOf(v) === i);
        console.log('📍 Villes disponibles :', villes);
        return villes;
      })
    );
  }




}
