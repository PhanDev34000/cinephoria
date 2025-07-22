import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// ✅ Chemins corrigés selon ta structure :
import './app/app.component.spec.ts';
import './app/pages/reservation/reservation.component.spec.ts';
import './app/pages/register/register.component.spec.ts';
import './app/pages/films/films.component.spec.ts';
import './app/pages/login/login.component.spec.ts';
import './app/pages/mon-espace/mon-espace.component.spec.ts';
import './app/pages/contact/contact.component.spec.ts';
import './app/pages/accueil/accueil.component.spec.ts';
import './app/pages/administration/administration.component.spec.ts';
import './app/pages/admin-stats/admin-stats.component.spec.ts';
import './app/pages/admin-seances/admin-seances.component.spec.ts';
import './app/pages/admin-salles/admin-salles.component.spec.ts';
import './app/pages/admin-employes/admin-employes.component.spec.ts';
import './app/pages/employe-dashboard/employe-dashboard.component.spec.ts';
import './app/pages/forgot-password/forgot-password.component.spec.ts';
import './app/pages/reset-password/reset-password.component.spec.ts';
import './app/admin/pages/admin-avis/admin-avis.component.spec.ts';
import './app/avis-form/avis-form.component.spec.ts';
import './app/components/header/header.component.spec.ts';
import './app/components/footer/footer.component.spec.ts';
import './app/guards/admin.guard.spec.ts';
import './app/guards/auth-utilisateur.guard.spec.ts';
import './app/guards/role.guard.spec.ts';
