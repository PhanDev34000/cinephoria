import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminIncidentsComponent } from './admin-incidents.component';

describe('AdminIncidentsComponent', () => {
  let component: AdminIncidentsComponent;
  let fixture: ComponentFixture<AdminIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIncidentsComponent, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
