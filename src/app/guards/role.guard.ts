import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authRoleGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/se-connecter']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    if (role === 'employe' || role === 'admin') {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  } catch (err) {
    console.error('❌ Erreur lors du décodage du token :', err);
    router.navigate(['/']);
    return false;
  }

  
};

export const employeGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/se-connecter']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    if (role === 'employe') {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  } catch (err) {
    console.error('❌ Erreur lors du décodage du token :', err);
    router.navigate(['/']);
    return false;
  }
};
