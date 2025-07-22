import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSeancesComponent } from './admin-seances.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminSeancesComponent', () => {
  let component: AdminSeancesComponent;
  let fixture: ComponentFixture<AdminSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  // ✅ Pour simuler HttpClient
        AdminSeancesComponent     // ✅ Composant standalone
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
