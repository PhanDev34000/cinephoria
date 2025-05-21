import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) {}

  envoyerReservation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getReservationsParEmail(email: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/${email}`);
  }

  deleteReservation(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }

  envoyerAvis(avis: any) {
  return this.http.post('http://localhost:3000/api/avis', avis);
}


}
