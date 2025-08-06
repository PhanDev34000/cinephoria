import { Routes } from '@angular/router';
import { MesSeancesComponent } from './pages/mes-seances/mes-seances.component';
import { LoginComponent } from './login/login.component';
import { QrBilletComponent } from './pages/qr-billet/qr-billet.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mes-seances', loadComponent: () => import('./pages/mes-seances/mes-seances.component').then(m => m.MesSeancesComponent) },
  { path: 'qr-billet',loadComponent: () => import('./pages/qr-billet/qr-billet.component').then(m => m.QrBilletComponent)}
];
