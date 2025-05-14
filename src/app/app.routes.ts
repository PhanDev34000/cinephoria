import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { FilmsComponent } from './pages/films/films.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ContactComponent } from './pages/contact/contact.component';




export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/accueil/accueil.component').then(m => m.AccueilComponent)
  },
  {
    path: 'films',
    loadComponent: () =>
      import('./pages/films/films.component').then(m => m.FilmsComponent)
  },
  {
    path: 'reservation',
    loadComponent: () =>
      import('./pages/reservation/reservation.component').then(m => m.ReservationComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'mon-espace',
    loadComponent: () =>
      import('./pages/mon-espace/mon-espace.component').then(m => m.MonEspaceComponent)
  },
  {
    path: 'administration',
    loadComponent: () =>
      import('./pages/administration/administration.component').then(m => m.AdministrationComponent)
  }
];

