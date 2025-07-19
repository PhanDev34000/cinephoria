import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const utilisateurStr = localStorage.getItem('utilisateur');
    if (!utilisateurStr) {
      this.router.navigate(['/login']);
      return false;
    }

    const utilisateur = JSON.parse(utilisateurStr);
    if (utilisateur.role === 'admin') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
