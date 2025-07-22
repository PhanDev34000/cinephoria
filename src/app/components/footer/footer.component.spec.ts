import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher l’adresse du cinéma', () => {
    const element = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(element.textContent).toContain('14 rue Rondelet');
  });

  it('devrait afficher le numéro de GSM', () => {
    const element = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(element.textContent).toContain('+33 6 00 00 00 00');
  });

  it('devrait afficher les horaires', () => {
    const element = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(element.textContent).toContain('10h à 23h');
  });
});
