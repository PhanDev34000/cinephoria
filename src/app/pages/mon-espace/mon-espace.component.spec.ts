import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonEspaceComponent } from './mon-espace.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReservationService } from '../../services/reservation.service';
import { SallesService } from '../../services/salles.service';
import { of, throwError } from 'rxjs';

describe('MonEspaceComponent (US10)', () => {
  let component: MonEspaceComponent;
  let fixture: ComponentFixture<MonEspaceComponent>;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
  let sallesServiceSpy: jasmine.SpyObj<SallesService>;

  // Crée un JWT factice dont le payload contient un email
  function fakeJwt(email = 'test@example.com') {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ email }));
    return `${header}.${payload}.signature`;
  }

  beforeEach(async () => {
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['getReservationsParEmail', 'supprimerReservation']);
    sallesServiceSpy = jasmine.createSpyObj('SallesService', ['getSalles']);
    await TestBed.configureTestingModule({
      imports: [
        MonEspaceComponent, // Standalone
        HttpClientTestingModule
      ],
      providers: [
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: SallesService, useValue: sallesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonEspaceComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('devrait appeler getReservationsParEmail avec l\'email extrait du token', () => {
    // Mock du localStorage pour simuler la présence d’un token
    spyOn(localStorage, 'getItem').and.returnValue(fakeJwt('test@example.com'));

    // Mock des données de salles et réservations
    sallesServiceSpy.getSalles.and.returnValue(of([
  {
    _id: 'salle1',
    nom: 'Salle 1',
    ville: 'Paris',
    capacite: 100,
    qualiteProjection: 'HD'
  }
]));
    reservationServiceSpy.getReservationsParEmail.and.returnValue(of([
      { _id: 'res1', seance: { salleId: 'salle1' } }
    ]));

    component.ngOnInit();

    expect(sallesServiceSpy.getSalles).toHaveBeenCalled();
    expect(reservationServiceSpy.getReservationsParEmail).toHaveBeenCalledWith('test@example.com');
    // Vérifie que le nomSalle a bien été ajouté
    expect(component.reservations.length).toBe(1);
    expect(component.reservations[0].seance.nomSalle).toBe('Salle 1');
  });

  it('devrait gérer les erreurs lors du chargement des réservations', () => {
    spyOn(localStorage, 'getItem').and.returnValue(fakeJwt('test@example.com'));
    sallesServiceSpy.getSalles.and.returnValue(of([
  {
    _id: 'salle1',
    nom: 'Salle 1',
    ville: 'Paris',
    capacite: 100,
    qualiteProjection: 'HD'
  }
]));
    reservationServiceSpy.getReservationsParEmail.and.returnValue(throwError(() => 'Erreur test'));
    const consoleSpy = spyOn(console, 'error');

    component.ngOnInit();

    // On attend une erreur provenant de la récupération des réservations
    expect(consoleSpy).toHaveBeenCalledWith('❌ Erreur récupération réservations', 'Erreur test');
  });

  it('devrait gérer les erreurs lors du chargement des salles', () => {
    spyOn(localStorage, 'getItem').and.returnValue(fakeJwt('test@example.com'));
    sallesServiceSpy.getSalles.and.returnValue(throwError(() => 'Erreur salle'));
    const consoleSpy = spyOn(console, 'error');

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('❌ Erreur chargement salles', 'Erreur salle');
  });
});
