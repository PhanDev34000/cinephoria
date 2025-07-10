import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seance } from '../models/seance.model';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private apiUrl = 'http://localhost:3000/api/seances';

  constructor(private http: HttpClient) {}

  ajouterSeance(seance: Seance): Observable<Seance> {
  return this.http.post<Seance>(this.apiUrl, seance); 
  }

  supprimerSeance(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }


  // Rrécupérer toutes les séances
  getSeances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
