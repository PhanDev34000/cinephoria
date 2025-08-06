import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService, Incident } from '../../services/incident.service';
import { SallesService } from '../../services/salles.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-incidents',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './admin-incidents.component.html',
  styleUrls: ['./admin-incidents.component.css']
})
export class AdminIncidentsComponent implements OnInit {
  incidentForm!: FormGroup;
  salles: any[] = [];
  incidents: Incident[] = [];

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private sallesService: SallesService 
  ) {}

  ngOnInit(): void {
    this.incidentForm = this.fb.group({
      salleId: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.chargerSalles();
    this.chargerIncidents();
  }

  chargerSalles() {
    this.sallesService.getSalles().subscribe(data => {
      this.salles = data;
    });
  }

  chargerIncidents() {
    this.incidentService.getTousLesIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      this.incidentService.ajouterIncident(this.incidentForm.value).subscribe(() => {
        this.incidentForm.reset();
        this.chargerIncidents();
      });
    }
  }

  supprimerIncident(id: string) {
    this.incidentService.supprimerIncident(id).subscribe(() => {
      this.chargerIncidents();
    });
  }

  getNomSalle(salle: any): string {
    if (typeof salle === 'string') {
      return salle;
    }
    return salle.nom;
  }
}
