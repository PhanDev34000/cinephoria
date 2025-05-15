import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  erreur: string = '';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    
    // Simulation des utilisateurs
    const utilisateurs = [
      { email: 'user@cinephoria.fr', password: 'User123!', role: 'utilisateur' },
      { email: 'employe@cinephoria.fr', password: 'Employe123!', role: 'employe' },
      { email: 'admin@cinephoria.fr', password: 'Admin123!', role: 'admin' }
    ];

    const user = utilisateurs.find(
      u => u.email === email && u.password === password
    );

   if (user) {
     localStorage.setItem('utilisateur', JSON.stringify(user));

   if (localStorage.getItem('resetRequired') === 'true') {
      localStorage.removeItem('resetRequired');
      this.router.navigate(['/reset-password']);
    } else {
      const redirect = this.route.snapshot.queryParamMap.get('redirectTo');
      this.router.navigate([redirect || '/']);
    }
    } else {
      this.erreur = 'Identifiants incorrects.';
    }
  }

  get f() {
    return this.form.controls;
  }
}
