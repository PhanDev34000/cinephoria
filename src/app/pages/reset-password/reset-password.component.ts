import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('🟢 Nouveau mot de passe :', this.form.value.newPassword);
      this.message = 'Votre mot de passe a bien été mis à jour !';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }

  get f() {
    return this.form.controls;
  }
}
