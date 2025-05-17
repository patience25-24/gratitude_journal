import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GratitudeEntry } from '../gratitude';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <h2>Entry for {{ selectedDate | date:'longDate' }}</h2>
      <form [formGroup]="entryForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Gratitude Entries (comma-separated)</mat-label>
          <input matInput formControlName="entries" placeholder="What are you grateful for?">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Mood</mat-label>
          <mat-select formControlName="mood">
            <mat-option value="happy">Happy</mat-option>
            <mat-option value="neutral">Neutral</mat-option>
            <mat-option value="sad">Sad</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Highlights</mat-label>
          <textarea matInput formControlName="highlights" placeholder="Any special moments?"></textarea>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="entryForm.invalid">Save Entry</button>
      </form>
      <div *ngIf="currentEntry">
        <h3>Saved Entry</h3>
        <p><strong>Entries:</strong> {{ currentEntry.entries.join(', ') }}</p>
        <p><strong>Mood:</strong> {{ currentEntry.mood }}</p>
        <p *ngIf="currentEntry.highlights"><strong>Highlights:</strong> {{ currentEntry.highlights }}</p>
      </div>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px auto;
      padding: 20px;
      max-width: 600px;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
    button {
      margin-top: 10px;
    }
  `]
})
export class DailyEntryComponent {
  @Input() selectedDate: Date = new Date();
  @Output() entrySaved = new EventEmitter<GratitudeEntry>();
  entryForm: FormGroup;
  currentEntry: GratitudeEntry | null = null;

  constructor(private fb: FormBuilder) {
    this.entryForm = this.fb.group({
      entries: ['', Validators.required],
      mood: ['happy', Validators.required],
      highlights: ['']
    });
  }

  ngOnChanges() {
    this.currentEntry = null;
  }

  onSubmit() {
    const formValue = this.entryForm.value;
    const entry: GratitudeEntry = {
      id: Date.now(),
      date: this.selectedDate,
      entries: formValue.entries.split(',').map((e: string) => e.trim()),
      mood: formValue.mood,
      highlights: formValue.highlights || undefined
    };
    this.currentEntry = entry;
    this.entrySaved.emit(entry);
    this.entryForm.reset({ mood: 'happy' });
  }
}