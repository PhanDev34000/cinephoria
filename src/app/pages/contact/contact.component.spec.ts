import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';

describe('ContactComponent (US12)', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('ne devrait pas envoyer si titre ou description est vide', () => {
    spyOn(window, 'alert');
    component.titre = '';
    component.description = '';
    component.envoyerMessage();
    expect(window.alert).toHaveBeenCalledWith('Le titre et la description sont obligatoires.');
  });

  it('devrait envoyer un message si titre et description sont remplis', () => {
    spyOn(window, 'alert');
    spyOn(console, 'log');
    component.nomUtilisateur = 'Jean';
    component.titre = 'Problème';
    component.description = 'La séance a été annulée.';
    
    component.envoyerMessage();

    expect(console.log).toHaveBeenCalledWith(
      '📬 Message envoyé à contact@cinephoria.fr :',
      jasmine.objectContaining({
        nom: 'Jean',
        titre: 'Problème',
        description: 'La séance a été annulée.'
      })
    );

    expect(window.alert).toHaveBeenCalledWith('Message envoyé ! (simulation) ✅');
    expect(component.nomUtilisateur).toBe('');
    expect(component.titre).toBe('');
    expect(component.description).toBe('');
  });
});
