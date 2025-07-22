import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilComponent } from './accueil.component';
import { of } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { AvisService } from '../../services/avis.service';
import { Film } from '../../models/film.model';

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;
  let mockFilmService: jasmine.SpyObj<FilmService>;
  let mockAvisService: jasmine.SpyObj<AvisService>;

  beforeEach(async () => {
    mockFilmService = jasmine.createSpyObj('FilmService', ['getFilms']);
    mockAvisService = jasmine.createSpyObj('AvisService', ['getMoyenneNote']);

    await TestBed.configureTestingModule({
      imports: [AccueilComponent],
      providers: [
        { provide: FilmService, useValue: mockFilmService },
        { provide: AvisService, useValue: mockAvisService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait filtrer les films du dernier mercredi', () => {
    const dernierMercredi = component.getDernierMercredi();

    const mockFilms: Film[] = [
      {
        _id: '1',
        titre: 'Film A',
        description: '...',
        dateDebut: '2025-01-01',
        dateFin: '2025-01-31',
        ageMinimum: 12,
        coupDeCoeur: false,
        imageUrl: '',
        genre: 'Action',
        seances: [{
          jour: dernierMercredi,
          debut: '',
          fin: '',
          qualite: '',
          prix: 0,
          cinema: '',
          placesDisponibles: 0,
          filmId: '',
          salleId: ''
        }],
        affiche: ''
      },
      {
        _id: '2',
        titre: 'Film B',
        description: '...',
        dateDebut: '2025-01-01',
        dateFin: '2025-01-31',
        ageMinimum: 12,
        coupDeCoeur: false,
        imageUrl: '',
        genre: 'Comédie',
        seances: [{
          jour: '2025-01-01',
          debut: '',
          fin: '',
          qualite: '',
          prix: 0,
          cinema: '',
          placesDisponibles: 0,
          filmId: '',
          salleId: ''
        }], // Pas le bon mercredi
        affiche: ''
      }
    ];

    mockFilmService.getFilms.and.returnValue(of(mockFilms));
    mockAvisService.getMoyenneNote.and.returnValue(of(4)); // peu importe ici

    fixture.detectChanges(); // Appelle ngOnInit()

    expect(component.filmsDuDernierMercredi.length).toBe(1);
    expect(component.filmsDuDernierMercredi[0].titre).toBe('Film A');
  });
});
