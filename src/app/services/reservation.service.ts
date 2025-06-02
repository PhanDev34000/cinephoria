import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  ajouterReservation(reservation: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, reservation);
  }

  supprimerReservation(id: string) {
  return this.http.delete(`http://localhost:3000/api/reservations/${id}`);
  }


}
