import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    // 👉 Simule un visiteur sans token
    localStorage.clear();  // ou localStorage.removeItem('token');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait contenir les liens du menu pour un visiteur', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const texte = compiled.textContent || '';

    expect(texte).toContain('Accueil');
    expect(texte).toContain('Films');
    expect(texte).toContain('Contact');
    expect(texte).toContain('Créer un compte');
    expect(texte).toContain('Se connecter');

    expect(texte).not.toContain('Réserver');
  });
});
