import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrBilletComponent } from './qr-billet.component';
import { ActivatedRoute } from '@angular/router';

describe('QrBilletComponent', () => {
  let component: QrBilletComponent;
  let fixture: ComponentFixture<QrBilletComponent>;

  beforeEach(async () => {    
    spyOnProperty(window, 'history').and.returnValue({
        state: {
            reservation: {
                film: { titre: 'Inception' },
                seance: {
                    _id: 'abc123',
                    jour: '2025-08-07',
                    debut: '18:00',
                    fin: '20:30'
                },
                nbPlaces: 2
            }
        },
        length: 0,
        scrollRestoration: 'auto',
        back: function (): void {
            throw new Error('Function not implemented.');
        },
        forward: function (): void {
            throw new Error('Function not implemented.');
        },
        go: function (delta?: number): void {
            throw new Error('Function not implemented.');
        },
        pushState: function (data: any, unused: string, url?: string | URL | null): void {
            throw new Error('Function not implemented.');
        },
        replaceState: function (data: any, unused: string, url?: string | URL | null): void {
            throw new Error('Function not implemented.');
        }
    });

    await TestBed.configureTestingModule({
      imports: [QrBilletComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QrBilletComponent);
    component = fixture.componentInstance;

    component.ngOnInit(); 
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait avoir la réservation correctement définie', () => {
    expect(component.reservation).toBeDefined();
    expect(component.reservation.film.titre).toBe('Inception');
  });

  it('devrait générer un QR code avec le bon identifiant de séance', () => {
    expect(component.data).toBe('cinephoria:seance:abc123');
  });
});
