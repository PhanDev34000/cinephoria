import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        ]
      ],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      pseudo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('✅ Compte créé :', this.form.value);
      // Simulation de l'envoi d'email
      setTimeout(() => {
        alert(`Un email de confirmation a été envoyé à : ${this.form.value.email}`);
      }, 1000);

      
      this.form.reset();
    } else {
      console.log('❌ Formulaire invalide');
    }
  }

  get f() {
    return this.form.controls;
  }
}
