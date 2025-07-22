import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { Router } from '@angular/router';

describe('ResetPasswordComponent (US11)', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait invalider le formulaire si vide', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('devrait invalider le formulaire si le mot de passe est trop faible', () => {
    component.form.setValue({ newPassword: 'abc123' });
    expect(component.form.valid).toBeFalse();
  });

  it('devrait valider le formulaire si le mot de passe est conforme', () => {
    component.form.setValue({ newPassword: 'Abcd123!' });
    expect(component.form.valid).toBeTrue();
  });

  it('devrait afficher un message de succès après soumission valide', () => {
    component.form.setValue({ newPassword: 'Abcd123!' });
    component.onSubmit();
    expect(component.message).toContain('mot de passe a bien été mis à jour');
  });
});
