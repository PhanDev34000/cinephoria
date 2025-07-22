import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonEspaceComponent } from './mon-espace.component';
import { ReservationService } from '../../services/reservation.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('MonEspaceComponent (US10)', () => {
  let component: MonEspaceComponent;
  let fixture: ComponentFixture<MonEspaceComponent>;
  let mockReservationService: jasmine.SpyObj<ReservationService>;

  const fakeReservations = [
    {
      _id: 'abc123',
      nbPlaces: 2,
      film: { titre: 'Inception', imageUrl: 'inception.jpg' },
      seance: {
        jour: '2025-07-21',
        debut: '20:00',
        qualite: 'IMAX',
        cinema: 'Cinéphoria Paris',
        prix: 10
      }
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ReservationService', ['getReservationsParEmail', 'supprimerReservation']);

    await TestBed.configureTestingModule({
      imports: [MonEspaceComponent],
      providers: [{ provide: ReservationService, useValue: spy }]
    }).compileComponents();

    mockReservationService = TestBed.inject(ReservationService) as jasmine.SpyObj<ReservationService>;
    mockReservationService.getReservationsParEmail.and.returnValue(of(fakeReservations));

    // Simuler localStorage avec un token valide
    const fakeToken = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) + '.' +
                      btoa(JSON.stringify({ email: 'test@mail.com' })) + '.' +
                      btoa('signature');
    spyOn(localStorage, 'getItem').and.callFake((key: string) => key === 'token' ? fakeToken : null);

    fixture = TestBed.createComponent(MonEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // appel ngOnInit
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait appeler getReservationsParEmail avec l\'email extrait du token', () => {
    expect(mockReservationService.getReservationsParEmail).toHaveBeenCalledWith('test@mail.com');
    expect(component.reservations.length).toBe(1);
  });

  it('devrait afficher les infos de réservation dans le DOM', () => {
    const titre = fixture.nativeElement.querySelector('.card-title')?.textContent;
    expect(titre).toContain('Inception');
  });

  it('devrait appeler supprimerReservation quand on clique sur le bouton', () => {
    spyOn(window, 'confirm').and.returnValue(true); // simule le "OK" de l'utilisateur
    mockReservationService.supprimerReservation.and.returnValue(of({}));

    const bouton = fixture.debugElement.query(By.css('button')).nativeElement;
    bouton.click();

    expect(mockReservationService.supprimerReservation).toHaveBeenCalledWith('abc123');
  });
});
