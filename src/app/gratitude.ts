export interface GratitudeEntry {
    id: number;
    date: Date;
    entries: string[];
    mood: 'happy' | 'neutral' | 'sad';
    highlights?: string;
  }