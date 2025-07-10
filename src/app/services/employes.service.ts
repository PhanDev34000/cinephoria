import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  private apiUrl = 'http://localhost:3000/api/utilisateurs/employes';

  constructor(private http: HttpClient) {}

  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  ajouterEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(this.apiUrl, employe);
  }

  modifierEmploye(id: string, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/${id}`, employe);
  }

  supprimerEmploye(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
