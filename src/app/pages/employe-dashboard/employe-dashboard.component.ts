import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminIncidentsComponent } from '../../components/admin-incidents/admin-incidents.component';

@Component({
  selector: 'app-employe-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminIncidentsComponent],
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent {

 afficherIncidents = false;

}
