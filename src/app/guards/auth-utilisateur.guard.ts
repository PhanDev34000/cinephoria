import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authUtilisateurGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/se-connecter']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    if (role === 'utilisateur') {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  } catch (err) {
    console.error('❌ Erreur token', err);
    router.navigate(['/']);
    return false;
  }
};
