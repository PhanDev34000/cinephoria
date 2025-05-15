import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  confirmation: string = '';
  erreur: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    const { email } = this.form.value;

    // Liste simulée d'utilisateurs
    const utilisateurs = [
      'user@cinephoria.fr',
      'employe@cinephoria.fr',
      'admin@cinephoria.fr'
    ];

    const existe = utilisateurs.includes(email);

    if (existe) {
      const motTemporaire = this.genererMotDePasse();
      localStorage.setItem('resetRequired', 'true');
      this.confirmation = `Un nouveau mot de passe temporaire a été envoyé à ${email} : ${motTemporaire}`;
      this.erreur = '';      
    } else {
      this.erreur = 'Adresse inconnue.';
      this.confirmation = '';
    }
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
