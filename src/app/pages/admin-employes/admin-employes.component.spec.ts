import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployesComponent } from './admin-employes.component';

describe('AdminEmployesComponent', () => {
  let component: AdminEmployesComponent;
  let fixture: ComponentFixture<AdminEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
