import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private navigation: NavigationService) {
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
    console.log('SUBMIT: valid?', this.form.valid, this.form.value);

  this.form.markAllAsTouched();
console.log('Form valid?', this.form.valid);
  if (this.form.valid) {
    const userData = {
      ...this.form.value,
      role: 'utilisateur'
    };    

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

        this.navigation.navigateAndReload('/');

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

decodeToken(token: string): any {
  const payload = JSON.parse(atob(token.split('.')[1]));
return payload;
}


  get f() {
    return this.form.controls;
  }
}
