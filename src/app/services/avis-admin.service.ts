import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvisAdminService {
  private apiUrl = 'http://localhost:3000/api/avis';

  constructor(private http: HttpClient) {}

  getAvisNonValidés(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?valide=false`);
  }

  validerAvis(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/valider`, {});
  }
}
