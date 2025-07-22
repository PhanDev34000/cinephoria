import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeDashboardComponent } from './employe-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeDashboardComponent (US9)', () => {
  let component: EmployeDashboardComponent;
  let fixture: ComponentFixture<EmployeDashboardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeDashboardComponent,
        RouterTestingModule // ✅ simulate les routerLink
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher les 3 liens de gestion', () => {
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(3);
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
});
