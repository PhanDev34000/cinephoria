import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avis } from '../../models/avis.model';
import { AVIS } from '../../data/avis.data';

@Component({
  selector: 'app-employe-avis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employe-avis.component.html',
  styleUrls: ['./employe-avis.component.css']
})
export class EmployeAvisComponent {
  avis: Avis[] = [...AVIS];

  validerAvis(id: number) {
    const a = this.avis.find(a => a.id === id);
    if (a) {
      a.valide = true;
      alert('✅ Avis validé');
    }
  }

  supprimerAvis(id: number) {
    this.avis = this.avis.filter(a => a.id !== id);
    alert('🗑️ Avis supprimé');
  }
}
