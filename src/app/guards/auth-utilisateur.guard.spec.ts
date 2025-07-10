import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authUtilisateurGuard } from './auth-utilisateur.guard';

describe('authUtilisateurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authUtilisateurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
