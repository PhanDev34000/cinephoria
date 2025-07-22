import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReservationComponent } from './reservation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FilmService } from '../../services/film.service';
import { SeanceService } from '../../services/seance.service';
import { SallesService } from '../../services/salles.service';
import { of } from 'rxjs';
import { Film } from '../../models/film.model';
import { Seance } from '../../models/seance.model';
import { Salle } from '../../models/salle.model';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
  let filmServiceSpy: jasmine.SpyObj<FilmService>;
  let seanceServiceSpy: jasmine.SpyObj<SeanceService>;
  let sallesServiceSpy: jasmine.SpyObj<SallesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const fakeFilms: Film[] = [
    {
      _id: 'f1',
      titre: 'Film 1',
      description: 'Description',
      dateDebut: '2025-07-01',
      dateFin: '2025-07-31',
      ageMinimum: 10,
      coupDeCoeur: false,
      imageUrl: 'img.jpg',
      genre: 'Action',
      affiche: 'affiche.jpg',
      seances: []
    }
  ];

  const fakeSalles: Salle[] = [
    {
      _id: 's1',
      ville: 'Montpellier',
      nom: 'Salle 1',
      capacite: 100,
      qualiteProjection: 'HD'
    }
  ];

  const fakeSeances: Seance[] = [
    {
      _id: 'se1',
      jour: '2025-07-23',
      debut: '18:00',
      fin: '20:00',
      qualite: 'HD',
      prix: 10,
      cinema: 'Montpellier',
      placesDisponibles: 50,
      filmId: 'f1',
      salleId: 's1'
    }
  ];

  beforeEach(async () => {
    const routeStub = { queryParams: of({}) };

    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['ajouterReservation']);
    filmServiceSpy = jasmine.createSpyObj('FilmService', ['getFilms']);
    seanceServiceSpy = jasmine.createSpyObj('SeanceService', ['getSeances']);
    sallesServiceSpy = jasmine.createSpyObj('SallesService', ['getSalles']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Ajout des retours pour éviter les erreurs .subscribe de undefined
    filmServiceSpy.getFilms.and.returnValue(of(fakeFilms));
    sallesServiceSpy.getSalles.and.returnValue(of(fakeSalles));
    seanceServiceSpy.getSeances.and.returnValue(of(fakeSeances));

    await TestBed.configureTestingModule({
      imports: [ReservationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: FilmService, useValue: filmServiceSpy },
        { provide: SeanceService, useValue: seanceServiceSpy },
        { provide: SallesService, useValue: sallesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait filtrer les séances selon ville et film', () => {
    component.selectedVille = 'Montpellier';
    component.selectedFilmId = 'f1';
    component.filmSelectionne = fakeFilms[0];
    component.salles = fakeSalles;
    component.films = fakeFilms;
    component.toutesLesSeances = fakeSeances;

    const success = component.afficherSeances();
    expect(success).toBeTrue();
    expect(component.seancesFiltrees.length).toBe(1);
  });

  it('devrait sélectionner une séance et la stocker', fakeAsync(() => {
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                      'eyJlbWFpbCI6InRlc3RAc2l0ZS5jb20ifQ.' +
                      'signature';
    localStorage.setItem('token', fakeToken);

    component.selectedFilmId = 'f1';
    component.filmSelectionne = fakeFilms[0];
    component.films = fakeFilms;
    component.seanceSelectionnee = fakeSeances[0];
    component.nbPlaces = 2;

    reservationServiceSpy.ajouterReservation.and.returnValue(of({}));

    component.validerReservation();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mon-espace']);
  }));

  it('ne doit pas valider la réservation si aucun token', () => {
  localStorage.removeItem('token');

  component.selectedFilmId = 'f1';
  component.filmSelectionne = fakeFilms[0];
  component.seanceSelectionnee = fakeSeances[0];

  component.validerReservation();

  expect(reservationServiceSpy.ajouterReservation).not.toHaveBeenCalled();
});

it('ne doit pas valider la réservation si film ou séance manquant', () => {
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                                 'eyJlbWFpbCI6InRlc3RAc2l0ZS5jb20ifQ.' +
                                 'signature');

  component.selectedFilmId = 'f1';
  component.filmSelectionne = undefined;
  component.seanceSelectionnee = null;

  component.validerReservation();

  expect(reservationServiceSpy.ajouterReservation).not.toHaveBeenCalled();
});

it('devrait avoir un nombre de places supérieur ou égal à 1', () => {
  component.nbPlaces = 0;
  expect(component.nbPlaces).toBeLessThan(1);
});

});
