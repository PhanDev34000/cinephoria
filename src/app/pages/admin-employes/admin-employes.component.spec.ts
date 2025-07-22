import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEmployesComponent } from './admin-employes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminEmployesComponent', () => {
  let component: AdminEmployesComponent;
  let fixture: ComponentFixture<AdminEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  
        AdminEmployesComponent    
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
