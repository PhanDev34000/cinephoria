import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Incident {
  _id?: string;
  salleId: string | { _id: string; nom: string };
  type: string;
  description: string;
  dateDeclaration?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'http://localhost:3000/api/incidents';

  constructor(private http: HttpClient) {}

  ajouterIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }

  getTousLesIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl);
  }

  getIncidentsParSalle(salleId: string): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/par-salle?salleId=${salleId}`);
  }

  supprimerIncident(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
