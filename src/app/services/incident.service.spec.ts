import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IncidentService, Incident } from './incident.service';

describe('IncidentService', () => {
  let service: IncidentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidentService]
    });
    service = TestBed.inject(IncidentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('doit envoyer une requête POST pour ajouter un incident', () => {
    const incident: Incident = {
      salleId: 'salle123',
      type: 'Siège',
      description: 'Siège cassé rangée B'
    };

    service.ajouterIncident(incident).subscribe((res) => {
      expect(res).toEqual(incident);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/incidents');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(incident);
    req.flush(incident);
  });

  it('doit envoyer une requête GET pour récupérer tous les incidents', () => {
    const mockIncidents: Incident[] = [
      { salleId: 's1', type: 'Projecteur', description: 'Problème d’image' },
      { salleId: 's2', type: 'Éclairage', description: 'Lumière défaillante' }
    ];

    service.getTousLesIncidents().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(mockIncidents);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/incidents');
    expect(req.request.method).toBe('GET');
    req.flush(mockIncidents);
  });

  it('doit envoyer une requête DELETE pour supprimer un incident', () => {
    const incidentId = 'abc123';

    service.supprimerIncident(incidentId).subscribe((res) => {
      expect(res).toEqual({ message: 'Supprimé' });
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/incidents/${incidentId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Supprimé' });
  });
});
