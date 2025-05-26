import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSallesComponent } from './admin-salles.component';

describe('AdminSallesComponent', () => {
  let component: AdminSallesComponent;
  let fixture: ComponentFixture<AdminSallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
