import { Types } from 'mongoose';

// Define an enum for event categories
export enum EventCategory {
  Workshops = 'Workshops',
  ComedyShow = 'Comedy Show',
  MusicShows = 'Music Shows',
  Meetup = 'Meetup',
  Exhibition = 'Exhibition',
  Kids = 'Kids',
  Spirituality = 'Spirituality',
  OnlineStreaming = 'Online Streaming',
}

// Define an enum for event languages
export enum EventLanguage {
  English = 'English',
  Hindi = 'Hindi',
  Bengali = 'Bengali',
  Punjabi = 'Punjabi',
  Telugu = 'Telugu',
  Hinglish = 'Hinglish',
}

// Define the event interface
export interface IEvent {
  name: string;
  about: string;
  date: Date;
  language: EventLanguage;
  duration: number;
  venue: string;
  price: number;
  ageGroup: string;
  eventMode: string;
  eventTime: string;
  
  category: EventCategory;
  createdAt: Date;
  softDelete?: boolean;
  artists: string[];
}
