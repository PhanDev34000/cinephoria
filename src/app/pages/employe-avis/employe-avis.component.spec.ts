import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAvisComponent } from './employe-avis.component';

describe('EmployeAvisComponent', () => {
  let component: EmployeAvisComponent;
  let fixture: ComponentFixture<EmployeAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeAvisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
