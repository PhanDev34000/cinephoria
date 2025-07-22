import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationComponent } from './administration.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdministrationComponent (US8)', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdministrationComponent,
        RouterTestingModule   // ✅ pour que les routerLink ne causent pas d’erreurs
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher les 5 liens de navigation', () => {
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(5);
  });

  it('devrait contenir le lien vers la gestion des films', () => {
    const link = compiled.querySelector('a[routerLink="/admin/films"]');
    expect(link).toBeTruthy();
  });

  it('devrait contenir le lien vers la gestion des séances', () => {
    const link = compiled.querySelector('a[routerLink="/admin/seances"]');
    expect(link).toBeTruthy();
  });

  it('devrait contenir le lien vers la gestion des salles', () => {
    const link = compiled.querySelector('a[routerLink="/admin/salles"]');
    expect(link).toBeTruthy();
  });

  it('devrait contenir le lien vers la gestion des employés', () => {
    const link = compiled.querySelector('a[routerLink="/admin/employes"]');
    expect(link).toBeTruthy();
  });

  it('devrait contenir le lien vers les statistiques', () => {
    const link = compiled.querySelector('a[routerLink="/admin/stats"]');
    expect(link).toBeTruthy();
  });
});
