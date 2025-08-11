import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';

describe('RegisterComponent POST', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;
  let navigationSpy: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    navigationSpy = jasmine.createSpyObj('NavigationService', ['navigateAndReload']);
    TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
      providers: [
        { provide: NavigationService, useValue: navigationSpy },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(window, 'alert');
  });

  function makeValidForm(component: RegisterComponent) {
    component.form.controls['prenom'].setValue('Test');
    component.form.controls['nom'].setValue('User');
    component.form.controls['nomUtilisateur'].setValue('testuser');
    component.form.controls['email'].setValue('testuser@example.com');
    component.form.controls['motDePasse'].setValue('Test123!');
  }

  it('doit POSTer à /api/utilisateurs si form valide', () => {
    fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.componentInstance;

    makeValidForm(component);
    fixture.detectChanges();

    // Vérif avant submit (debug)
    expect(component.form.valid).toBeTrue();

    component.onSubmit();

    // *** ICI ON VA MATCHER SUR UNE FONCTION POUR ÊTRE SÛR ***
    const req = httpMock.match((req) => req.url.includes('/api/utilisateurs'))[0];
    expect(req).toBeTruthy();
    expect(req.request.method).toBe('POST');

    req.flush({
      email: 'testuser@example.com',
      token: 'token.test.jwt',
      utilisateur: { nom: 'User', prenom: 'Test', email: 'testuser@example.com' }
    });

    expect(window.alert).toHaveBeenCalled();
    expect(navigationSpy.navigateAndReload).toHaveBeenCalledWith('/');
  });
});
