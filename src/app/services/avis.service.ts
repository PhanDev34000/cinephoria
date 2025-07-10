import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AvisService {
  private apiUrl = 'http://localhost:3000/api/avis';

  constructor(private http: HttpClient) {}

  envoyerAvis(avis: { filmId: number; note: number; commentaire: string }) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, avis);
  }

  getAvisValidésParFilm(filmId: string) {
  return this.http.get<any[]>(`${this.apiUrl}/public?filmId=${filmId}&valide=true`);
  }

}
