import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent (US7)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,              // ✅ Composant standalone importé ici
        ReactiveFormsModule,
        HttpClientTestingModule      // ✅ Nécessaire car le composant utilise HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait invalider le formulaire si les champs sont vides', () => {
    component.form.setValue({ email: '', password: '' });
    expect(component.form.invalid).toBeTrue();
  });

  it('devrait valider le formulaire si les champs sont remplis correctement', () => {
    component.form.setValue({ email: 'test@example.com', password: '123456' });
    expect(component.form.valid).toBeTrue();
  });
});
