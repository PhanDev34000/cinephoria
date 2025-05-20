import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationComponent } from './administration.component';
import { ActivatedRoute } from '@angular/router';

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationComponent],
      providers: [
    { provide: ActivatedRoute, useValue: {} }
]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
