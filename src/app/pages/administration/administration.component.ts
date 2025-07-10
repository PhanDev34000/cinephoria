import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-administration',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
  const user = JSON.parse(localStorage.getItem('utilisateur') || '{}');
 // if (user.role !== 'admin')  {
  //  alert('⛔ Accès réservé à l’administrateur.');
  //  this.router.navigate(['/']);
// }

  }}

