import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string | null = null;
  isLoggedIn = false;

  ngOnInit(): void {
   
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.role = payload.role;
        this.isLoggedIn = true;
      } catch (e) {
        console.error('❌ Erreur décodage token', e);
        this.role = null;
        this.isLoggedIn = false;
      }
    }
  }

estAdmin(): boolean {
  const utilisateurStr = localStorage.getItem('utilisateur');
  if (!utilisateurStr) return false;

  const utilisateur = JSON.parse(utilisateurStr);
  return utilisateur.email === 'admin@cinephoria.fr';  // ou l'email que tu utilises pour l'admin
}

 logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('utilisateur');
  this.role = null;
  this.isLoggedIn = false;
  window.location.href = '/'; // ou utilise le Router si tu préfères
}




}
