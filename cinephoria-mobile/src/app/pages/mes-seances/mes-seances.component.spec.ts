import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MesSeancesComponent } from './mes-seances.component';

describe('MesSeancesComponent', () => {
  let component: MesSeancesComponent;
  let fixture: ComponentFixture<MesSeancesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MesSeancesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MesSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
