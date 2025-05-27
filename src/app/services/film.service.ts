import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';
import { FILMS } from '../data/films.data';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'http://localhost:3000/api/films'; // URL du backend

  constructor(private http: HttpClient) {}

 getFilms(): Observable<Film[]> {
  return of(FILMS); // ← RxJS of() pour simuler une requête
}


  //addFilm(film: Film): Observable<Film> {
    //return this.http.post<Film>(this.apiUrl, film);
  }

  // Ajouter updateFilm et deleteFilm plus tard

