import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  nomUtilisateur: string = '';
  titre: string = '';
  description: string = '';
  email: string = '';

  envoyerMessage() {
    if (!this.titre.trim() || !this.description.trim()) {
      alert('Le titre et la description sont obligatoires.');
      return;
    }

    const message = {
      nom: this.nomUtilisateur || '(Anonyme)',
      titre: this.titre,
      description: this.description,
      date: new Date().toISOString()
    };

    console.log('📬 Message envoyé à contact@cinephoria.fr :', message);
    alert('Message envoyé ! (simulation) ✅');

    this.nomUtilisateur = '';
    this.titre = '';
    this.description = '';
  }
}
