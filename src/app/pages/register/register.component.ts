import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        ]
      ],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      nomUtilisateur: ['', Validators.required]
    });
  }

  onSubmit(): void {
  this.form.markAllAsTouched();

  if (this.form.valid) {
    const userData = {
      ...this.form.value,
      role: 'utilisateur'
    };

    console.log('📤 Données envoyées :', userData);

    this.http.post('http://localhost:3000/api/utilisateurs', userData).subscribe({
      next: (res: any) => {
        console.log('✅ Utilisateur créé :', res);
        alert(`Un email de confirmation a été envoyé à : ${res.email}`);

        // Stocker token + utilisateur s'ils sont renvoyés
        if (res.token && res.utilisateur) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('utilisateur', JSON.stringify(res.utilisateur));
        }

        this.form.reset();

        // Rediriger + forcer mise à jour du header
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('❌ Erreur lors de la création :', err);
        alert("Erreur lors de la création du compte.");
      }
    });
  } else {
    console.log('❌ Formulaire invalide');
  }
}


  get f() {
    return this.form.controls;
  }
}
