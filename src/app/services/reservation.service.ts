import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) {}

  ajouterReservation(reservation: any): Observable<any> {
    return this.http.post(this.apiUrl, reservation);
  }

  getReservations(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/reservations');
  }

  getReservationsByUser(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  supprimerReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getReservationsParEmail(email: string) {
  return this.http.get<any[]>(`http://localhost:3000/api/reservations?email=${email}`);
}
getReservationsAVenir(email: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/utilisateur/${email}`);
}

}
