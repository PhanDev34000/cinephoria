import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { FilmsComponent } from './pages/films/films.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'contact', component: ContactComponent },
];
