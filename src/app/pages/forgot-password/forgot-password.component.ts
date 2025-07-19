import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  confirmation: string = '';
  erreur: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
  const { email } = this.form.value;

  this.http.post('http://localhost:3000/api/utilisateurs/check-email', { email })
    .subscribe({
      next: () => {
        const motTemporaire = this.genererMotDePasse();

        // Appel pour mettre à jour le mot de passe
        this.http.put('http://localhost:3000/api/utilisateurs/reset-password', {
          email,
          newPassword: motTemporaire
        }).subscribe({
          next: () => {
            this.confirmation = `Un nouveau mot de passe temporaire a été envoyé à ${email} : ${motTemporaire}`;
            this.erreur = '';
          },
          error: () => {
            this.erreur = "Erreur lors de la mise à jour du mot de passe.";
            this.confirmation = '';
          }
        });
      },
      error: () => {
        this.erreur = 'Adresse inconnue.';
        this.confirmation = '';
      }
    });
  }



  genererMotDePasse(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  get f() {
    return this.form.controls;
  }
}
