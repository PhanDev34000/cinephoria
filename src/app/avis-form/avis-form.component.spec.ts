import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisFormComponent } from './avis-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AvisService } from '../services/avis.service';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film.model';

describe('AvisFormComponent', () => {
  let component: AvisFormComponent;
  let fixture: ComponentFixture<AvisFormComponent>;
  let mockAvisService: jasmine.SpyObj<AvisService>;
  let mockFilmService: jasmine.SpyObj<FilmService>;

  const fakeFilms: Film[] = [
    {
      _id: '1',
      titre: 'Film test',
      description: 'Un film de test',
      affiche: 'affiche.jpg',
      dateDebut: '2025-01-01',
      dateFin: '2025-01-15',
      ageMinimum: 10,
      coupDeCoeur: false,
      imageUrl: 'image.jpg',
      genre: 'Comédie',
      villes: ['Paris'],
      dateAjout: '2025-07-01',
      seances: []
    }
  ];

  beforeEach(async () => {
    mockAvisService = jasmine.createSpyObj('AvisService', ['envoyerAvis']);
    mockFilmService = jasmine.createSpyObj('FilmService', ['getFilms']);
    mockFilmService.getFilms.and.returnValue(of(fakeFilms));

    await TestBed.configureTestingModule({
      imports: [AvisFormComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AvisService, useValue: mockAvisService },
        { provide: FilmService, useValue: mockFilmService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films on init', () => {
    expect(component.films.length).toBeGreaterThan(0);
    expect(component.films[0].titre).toBe('Film test');
  });

  it('should submit the form if valid', () => {
    component.form.setValue({
      filmId: 1, 
      note: 4,
      commentaire: 'Très bon film'
    });

    mockAvisService.envoyerAvis.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockAvisService.envoyerAvis).toHaveBeenCalledWith({
      filmId: 1,
      note: 4,
      commentaire: 'Très bon film'
    });
  });
});
