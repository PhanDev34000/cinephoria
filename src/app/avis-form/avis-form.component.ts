import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvisService } from '../services/avis.service';
import { FilmService } from '../services/film.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avis-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './avis-form.component.html',
  styleUrls: ['./avis-form.component.css']
})
export class AvisFormComponent implements OnInit {
  form: FormGroup;
  films: any[] = [];

  constructor(
    private fb: FormBuilder,
    private avisService: AvisService,
    private filmsService: FilmService 
  ) {
    this.form = this.fb.group({
      filmId: [null, Validators.required], 
      note: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      commentaire: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.filmsService.getFilms().subscribe({
      next: (films) => this.films = films, // 👈 "films" à la place de "data"
      error: (err) => console.error('❌ Erreur lors du chargement des films :', err)
    });
  }

  onSubmit() {
    if (this.form.valid) {
       console.log('📤 Données envoyées :', this.form.value);
      this.avisService.envoyerAvis(this.form.value).subscribe({
        next: (res) => {
          console.log('✅ Avis envoyé :', res);
          alert('Avis envoyé avec succès !');
        },
        error: (err) => {
          console.error('❌ Erreur lors de l’envoi :', err);
          alert('Erreur : êtes-vous connecté ?');
        }
      });
    }
  }
  get f() {
    return this.form.controls;
  }

}
