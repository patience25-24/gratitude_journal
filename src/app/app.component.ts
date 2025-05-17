import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { GratitudeEntry } from './gratitude';
import { CalendarComponent } from './calendar/calendar.component';
import { DailyEntryComponent } from './daily-entry/daily-entry.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CalendarComponent,
    DailyEntryComponent
  ],
  template: `
    <div class="container">
      <h1>Gratitude Journal</h1>
      <app-calendar 
        [entries]="entries" 
        [selectedDate]="selectedDate"
        (dateSelected)="onDateSelected($event)">
      </app-calendar>
      <app-daily-entry 
        [selectedDate]="selectedDate" 
        (entrySaved)="saveEntry($event)">
      </app-daily-entry>
      <div class="entries-history" *ngIf="entries.length > 0">
        <h2>Recent Entries</h2>
        <mat-card *ngFor="let entry of entries.slice().reverse()">
          <h3>{{ entry.date | date:'longDate' }}</h3>
          <p><strong>Entries:</strong> {{ entry.entries.join(', ') }}</p>
          <p><strong>Mood:</strong> {{ entry.mood }}</p>
          <p *ngIf="entry.highlights"><strong>Highlights:</strong> {{ entry.highlights }}</p>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #3f51b5;
    }
    .entries-history {
      margin-top: 30px;
    }
    .entries-history mat-card {
      margin: 10px 0;
      text-align: left;
      padding: 15px;
    }
    .entries-history h3 {
      color: #3f51b5;
      margin-top: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  selectedDate: Date = new Date();
  entries: GratitudeEntry[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  saveEntry(entry: GratitudeEntry) {
    const existingIndex = this.entries.findIndex(e => 
      e.date.toDateString() === entry.date.toDateString()
    );
    if (existingIndex >= 0) {
      this.entries[existingIndex] = entry;
    } else {
      this.entries.push(entry);
    }
    // Sauvegarder dans le localStorage seulement si on est dans le navigateur
    if (this.isBrowser) {
      localStorage.setItem('gratitudeEntries', JSON.stringify(this.entries));
    }
  }

  ngOnInit() {
    // Charger les entrées depuis le localStorage seulement si on est dans le navigateur
    if (this.isBrowser) {
      const savedEntries = localStorage.getItem('gratitudeEntries');
      if (savedEntries) {
        this.entries = JSON.parse(savedEntries).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
      }
    }
  }
}