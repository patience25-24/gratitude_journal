import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEntryComponent } from './daily-entry.component';

describe('DailyEntryComponent', () => {
  let component: DailyEntryComponent;
  let fixture: ComponentFixture<DailyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
