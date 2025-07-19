import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { authRoleGuard } from './guards/role.guard';
import { authUtilisateurGuard } from './guards/auth-utilisateur.guard';
import { employeGuard } from './guards/role.guard';

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
    canActivate: [authUtilisateurGuard],
    loadComponent: () =>
      import('./pages/mon-espace/mon-espace.component').then(m => m.MonEspaceComponent)
  },
  {
  path: 'administration',
  canActivate: [AdminGuard],
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
  path: 'admin/films',
  loadComponent: () =>
    import('./pages/admin-films/admin-films.component').then(m => m.AdminFilmsComponent)
  },
  {
  path: 'admin/seances',
  loadComponent: () =>
    import('./pages/admin-seances/admin-seances.component').then(m => m.AdminSeancesComponent)
  },
  {
  path: 'admin/salles',
  loadComponent: () =>
    import('./pages/admin-salles/admin-salles.component').then(m => m.AdminSallesComponent) 
  },
  {
  path: 'laisser-avis',
  loadComponent: () =>
    import('./avis-form/avis-form.component').then(m => m.AvisFormComponent),
  canActivate: [authUtilisateurGuard] 
  },
  {
  path: 'admin-avis',
  canActivate: [authRoleGuard],
  loadComponent: () =>
    import('./admin/pages/admin-avis/admin-avis.component').then(m => m.AdminAvisComponent)
},

  {
  path: 'admin/employes',
  canActivate: [AdminGuard],
  loadComponent: () => import('./pages/admin-employes/admin-employes.component').then(m => m.AdminEmployesComponent),
  },
  {
  path: 'admin/stats',
  canActivate: [AdminGuard],
  loadComponent: () => import('./pages/admin-stats/admin-stats.component').then(m => m.AdminStatsComponent),
  },
  {
    path: 'employe-dashboard',
    loadComponent: () => import('./pages/employe-dashboard/employe-dashboard.component').then(m => m.EmployeDashboardComponent),
    canActivate: [employeGuard]
  }
];

