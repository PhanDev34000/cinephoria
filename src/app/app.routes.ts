import { Routes } from '@angular/router';


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
  },
  {
  path: 'register',
  loadComponent: () =>
    import('./pages/register/register.component').then((m) => m.RegisterComponent)
  },
  {
  path: 'login',
  loadComponent: () =>
    import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
  path: 'forgot-password',
  loadComponent: () =>
    import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
  path: 'reset-password',
  loadComponent: () =>
    import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
  path: 'admin-films',
  loadComponent: () =>
    import('./pages/admin-films/admin-films.component').then(m => m.AdminFilmsComponent)
  },
  {
  path: 'admin-seances',
  loadComponent: () =>
    import('./pages/admin-seances/admin-seances.component').then(m => m.AdminSeancesComponent)
  },
  {
  path: 'admin-salles',
  loadComponent: () =>
    import('./pages/admin-salles/admin-salles.component').then(m => m.AdminSallesComponent) 
  },
   {
  path: 'intranet-avis',
  loadComponent: () =>
    import('./pages/employe-avis/employe-avis.component').then(m => m.EmployeAvisComponent) 
  }
  



];

