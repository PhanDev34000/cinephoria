import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSallesComponent } from './admin-salles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminSallesComponent', () => {
  let component: AdminSallesComponent;
  let fixture: ComponentFixture<AdminSallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  // ✅ pour injecter HttpClient sans erreur
        AdminSallesComponent      // ✅ composant standalone
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
