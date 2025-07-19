import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  this.form.markAllAsTouched();

  if (this.form.valid) {
    this.http.post('http://localhost:3000/api/utilisateurs/login', this.form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('utilisateur', JSON.stringify(res.utilisateur));

        // ✅ Affiche le message avant redirection
        this.message = 'Connexion réussie. Redirection en cours...';

        // ✅ Attend un peu pour laisser le temps au message d’apparaître
        setTimeout(() => {
          window.location.href = '/';  // ✅ Recharge la page (donc HeaderComponent)
        }, 1500);
      },
      error: (err) => {
        console.error('❌ Échec de connexion :', err);
        this.message = 'Email ou mot de passe incorrect.';
      }
    });
  }
}


  get f() {
    return this.form.controls;
  }

  goToReset(): void {
  this.router.navigate(['/forgot-password']);
}

}
