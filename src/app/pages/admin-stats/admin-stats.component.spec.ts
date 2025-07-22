import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminStatsComponent } from './admin-stats.component';
import { StatsService } from '../../services/stats.service';
import { of } from 'rxjs';

describe('AdminStatsComponent', () => {
  let component: AdminStatsComponent;
  let fixture: ComponentFixture<AdminStatsComponent>;
  let statsServiceSpy: jasmine.SpyObj<StatsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StatsService', ['getStats']);

    await TestBed.configureTestingModule({
      imports: [AdminStatsComponent],
      providers: [{ provide: StatsService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStatsComponent);
    component = fixture.componentInstance;
    statsServiceSpy = TestBed.inject(StatsService) as jasmine.SpyObj<StatsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stats on init', () => {
    const fakeStats = { nbCinemas: 5, nbSalles: 10 };
    statsServiceSpy.getStats.and.returnValue(of(fakeStats));

    fixture.detectChanges(); // déclenche ngOnInit

    expect(statsServiceSpy.getStats).toHaveBeenCalled();
    expect(component.stats).toEqual(fakeStats);
  });
});
