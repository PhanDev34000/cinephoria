import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Composants à tester
import { AccueilComponent } from '../pages/accueil/accueil.component';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { ReservationComponent } from '../pages/reservation/reservation.component';
import { MonEspaceComponent } from '../pages/mon-espace/mon-espace.component';

describe('Parcours visiteur – simulation complète', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'accueil', component: AccueilComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'login', component: LoginComponent },
          { path: 'reservation', component: ReservationComponent },
          { path: 'mon-espace', component: MonEspaceComponent },
        ]),
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('devrait permettre à un visiteur de parcourir toutes les étapes clés', fakeAsync(() => {
    // Accueil
    router.navigate(['accueil']);
    tick();
    expect(location.path()).toBe('/accueil');

    // Inscription
    router.navigate(['register']);
    tick();
    expect(location.path()).toBe('/register');

    const registerFixture = TestBed.createComponent(RegisterComponent);
    const registerComponent = registerFixture.componentInstance;
    registerComponent.form.setValue({
      email: 'test@example.com',
      password: 'Test@1234',
      prenom: 'Jean',
      nom: 'Dupont',
      pseudo: 'jdupont'
    });
    expect(registerComponent.form.valid).toBeTrue();

    // Connexion
    router.navigate(['login']);
    tick();
    expect(location.path()).toBe('/login');

    const loginFixture = TestBed.createComponent(LoginComponent);
    const loginComponent = loginFixture.componentInstance;
    loginComponent.form.setValue({
      email: 'test@example.com',
      password: 'Test@1234'
    });
    expect(loginComponent.form.valid).toBeTrue();

    // Réservation
    router.navigate(['reservation']);
    tick();
    expect(location.path()).toBe('/reservation');

    const resFixture = TestBed.createComponent(ReservationComponent);
    const resComponent = resFixture.componentInstance;
    resComponent.cinemas = ['Toulouse'];
    resComponent.films = [
      {
        id: 1,
        titre: 'Film Test',
        description: '...',
        ageMinimum: 10,
        coupDeCoeur: false,
        note: 4,
        imageUrl: '',
        genre: 'Action',
        cinemas: ['Toulouse'],
        seances: [
          {
            id: 1,
            jour: '2025-05-19',
            debut: '18:00',
            fin: '20:00',
            qualite: '4K',
            prix: 10,
            cinema: 'Toulouse',
            placesDisponibles: 50
          }
        ]
      }
    ];
    resComponent.selectedCinema = 'Toulouse';
    resComponent.selectedFilmId = 1;
    resComponent.seanceSelectionnee = resComponent.films[0].seances[0];
    resComponent.seanceSelectionnee = resComponent.seancesFiltrees[0];
    resComponent.nbPlaces = 2;

    resComponent.validerReservation();
    expect(resComponent.nbPlaces).toBe(2);

    // Mon espace
    router.navigate(['mon-espace']);
    tick();
    expect(location.path()).toBe('/mon-espace');

    const monEspaceFixture = TestBed.createComponent(MonEspaceComponent);
    const monEspaceComponent = monEspaceFixture.componentInstance;
    monEspaceComponent.reservations = [
      {
        film: resComponent.films[0],
        seance: resComponent.seanceSelectionnee,
        nbPlaces: 2
      }
    ];
    monEspaceComponent.filmANoter = monEspaceComponent.reservations[0];
    monEspaceComponent.note = 5;
    monEspaceComponent.commentaire = 'Très bon film';
    monEspaceComponent.utilisateur = { email: 'test@example.com' } as any;

    monEspaceComponent.soumettreAvis();
    expect(monEspaceComponent.filmANoter).toBeNull(); // Réinitialisé après envoi
  }));
});
