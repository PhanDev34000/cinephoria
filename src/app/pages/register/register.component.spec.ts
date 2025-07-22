import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('RegisterComponent (US6) – validations simples', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, CommonModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait rendre le formulaire invalide si le mot de passe est trop faible', () => {
    component.form.setValue({
      email: 'test@example.com',
      motDePasse: 'abc', // ❌ trop court et pas de majuscule, chiffre, etc.
      prenom: 'John',
      nom: 'Doe',
      nomUtilisateur: 'johndoe'
    });

    expect(component.form.valid).toBeFalse();
    expect(component.form.get('motDePasse')?.errors).toBeTruthy();
  });

  it('devrait rendre le formulaire invalide si le champ email est vide', () => {
    component.form.setValue({
      email: '',
      motDePasse: 'Azerty123!',
      prenom: 'John',
      nom: 'Doe',
      nomUtilisateur: 'johndoe'
    });

    expect(component.form.valid).toBeFalse();
    expect(component.form.get('email')?.errors).toBeTruthy();
  });

  it('devrait rendre le formulaire invalide si le champ nomUtilisateur est vide', () => {
    component.form.setValue({
      email: 'test@example.com',
      motDePasse: 'Azerty123!',
      prenom: 'John',
      nom: 'Doe',
      nomUtilisateur: '' // ❌
    });

    expect(component.form.valid).toBeFalse();
    expect(component.form.get('nomUtilisateur')?.errors).toBeTruthy();
  });

  it('devrait rendre le formulaire valide avec des données correctes', () => {
    component.form.setValue({
      email: 'test@example.com',
      motDePasse: 'Azerty123!',
      prenom: 'John',
      nom: 'Doe',
      nomUtilisateur: 'johndoe'
    });

    expect(component.form.valid).toBeTrue();
  });
});
