import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FilmsComponent } from './films.component';
import { FilmService } from '../../services/film.service';
import { SeanceService } from '../../services/seance.service';
import { AvisService } from '../../services/avis.service';
import { SallesService } from '../../services/salles.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Film } from '../../models/film.model';
import { Seance } from '../../models/seance.model';
import { Salle } from '../../models/salle.model';

describe('FilmsComponent (US5)', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let mockFilmService: jasmine.SpyObj<FilmService>;
  let mockAvisService: jasmine.SpyObj<AvisService>;
  let mockSeanceService: jasmine.SpyObj<SeanceService>;
  let mockSallesService: jasmine.SpyObj<SallesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const fakeFilms: Film[] = [
    {
      _id: '1',
      titre: 'Le Grand Film',
      description: 'Un film incroyable',
      dateDebut: '2025-07-01',
      dateFin: '2025-07-31',
      ageMinimum: 12,
      coupDeCoeur: true,
      note: 4.5,
      imageUrl: 'affiche.jpg',
      affiche: 'affiche.jpg',
      genre: 'Action',
      villes: ['Paris'],
      seances: []
    }
  ];

  const fakeSeances: Seance[] = [
  {
    _id: 's1',
    filmId: '1',
    salleId: 'salle1',
    jour: '2025-07-20',
    debut: '14:00',
    fin: '16:00',
    qualite: '4K',
    prix: 10,
    cinema: 'Paris',
    placesDisponibles: 50
  }
];



  const fakeSalles: Salle[] = [
    {
      _id: 'salle1',
      ville: 'Paris',
      nom: 'Salle Alpha',
      capacite: 100,
      qualiteProjection: '4K'
    }
  ];

  const fakeAvis = [
    {
      _id: 'a1',
      filmId: '1',
      utilisateurId: 'u1',
      commentaire: 'Super film !',
      note: 5,
      valide: true,
      date: '2025-07-20'
    }
  ];

  beforeEach(async () => {
    mockFilmService = jasmine.createSpyObj('FilmService', ['getFilms', 'getAll', 'ajouterFilm', 'modifierFilm', 'supprimerFilm', 'getMoyenneNote']);
    mockAvisService = jasmine.createSpyObj('AvisService', ['getAvisValidésParFilm', 'getMoyenneNote']);
    mockSeanceService = jasmine.createSpyObj('SeanceService', ['getSeances']);
    mockSallesService = jasmine.createSpyObj('SallesService', ['getSalles']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FilmsComponent],
      providers: [
        { provide: FilmService, useValue: mockFilmService },
        { provide: AvisService, useValue: mockAvisService },
        { provide: SeanceService, useValue: mockSeanceService },
        { provide: SallesService, useValue: mockSallesService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;

    mockFilmService.getFilms.and.returnValue(of(fakeFilms));
    mockAvisService.getAvisValidésParFilm.and.returnValue(of(fakeAvis));
    mockAvisService.getMoyenneNote.and.returnValue(of(4.5));
    mockSeanceService.getSeances.and.returnValue(of(fakeSeances));
    mockSallesService.getSalles.and.returnValue(of(fakeSalles));
  });

  it('devrait charger les films, séances, villes et avis au démarrage', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.films.length).toBe(1);
    expect(component.films[0].titre).toBe('Le Grand Film');
    expect(component.films[0].seances!.length).toBe(1);
    expect(component.films[0].villes).toContain('Paris');
    expect(component.avisParFilm['1'].length).toBe(1);
    expect(component.films[0].note).toBe(4.5);
  }));

  it('devrait filtrer les films par genre', () => {
    component.films = fakeFilms;
    component.genreFiltre = 'Action';
    expect(component.filmsFiltres.length).toBe(1);

    component.genreFiltre = 'Comédie';
    expect(component.filmsFiltres.length).toBe(0);
  });

  it('devrait filtrer les films par jour', () => {
    component.films = fakeFilms;
    component.jourFiltre = '2025-07-20';
    expect(component.filmsFiltres.length).toBe(1);

    component.jourFiltre = '2025-08-01';
    expect(component.filmsFiltres.length).toBe(0);
  });

  it('devrait retourner tous les cinémas disponibles', () => {
    component.films = fakeFilms;
    expect(component.cinemas).toContain('Paris');
  });

  it('devrait rediriger vers la réservation avec les bons queryParams', () => {
    const seance = fakeSeances[0];
    const film = fakeFilms[0];
    component.allerReservation(film, { ...seance, ville: 'Paris' });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/reservation'], {
      queryParams: {
        filmId: '1',
        cinema: 'Paris',
        jour: '2025-07-20',
        heure: '14:00',
        qualite: '4K'
      }
    });
  });

  it('devrait afficher/masquer les avis pour un film', fakeAsync(() => {
    component.toggleAvis(fakeFilms[0]);
    tick();
    expect(component.filmAvisVisible['1']).toBeTrue();
    expect(component.avisParFilm['1'].length).toBe(1);

    component.toggleAvis(fakeFilms[0]);
    expect(component.filmAvisVisible['1']).toBeFalse();
  }));


  


});
