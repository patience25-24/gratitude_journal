import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GratitudeEntry } from '../gratitude';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <mat-card>
      <mat-calendar
        [selected]="selectedDate"
        (selectedChange)="onDateChange($event)"
        [dateClass]="dateClass()"
      ></mat-calendar>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px auto;
      max-width: 400px;
    }
    .has-entry {
      background-color: #e8f0fe;
    }
  `]
})
export class CalendarComponent {
  @Input() entries: GratitudeEntry[] = [];
  @Input() selectedDate: Date = new Date();
  @Output() dateSelected = new EventEmitter<Date>();

  onDateChange(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.dateSelected.emit(date);
    }
  }

  dateClass(): MatCalendarCellClassFunction<Date> {
    return (date: Date): string => {
      const hasEntry = this.entries.some(entry => 
        entry.date.toDateString() === date.toDateString()
      );
      return hasEntry ? 'has-entry' : '';
    };
  }
}