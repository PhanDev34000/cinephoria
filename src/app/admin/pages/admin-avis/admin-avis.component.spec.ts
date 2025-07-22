import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAvisComponent } from './admin-avis.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmService } from '../../../services/film.service';
import { of } from 'rxjs';

describe('AdminAvisComponent', () => {
  let component: AdminAvisComponent;
  let fixture: ComponentFixture<AdminAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAvisComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: FilmService,
          useValue: { getAll: () => of([]) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
