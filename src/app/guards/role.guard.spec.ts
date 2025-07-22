import { TestBed } from '@angular/core/testing';
import { authRoleGuard } from './role.guard';
import { Router } from '@angular/router';

describe('authRoleGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should be defined', () => {
    expect(authRoleGuard).toBeTruthy();
  });
});
