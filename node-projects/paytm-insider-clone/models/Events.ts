import { Schema, model, Document } from 'mongoose';
import { IEvent, EventCategory, EventLanguage } from '../interfaces/events-interface';
const eventSchema = new Schema<IEvent & Document>(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    date: { type: Date, required: true },
    language: { type: String, enum: Object.values(EventLanguage), required: true },
    duration: { type: Number, required: true },
    venue: { type: String, required: true },
    price: { type: Number, required: true },
    ageGroup: { type: String, required: true },
    eventMode: { type: String, required: true },
    eventTime: { type: String, required: true },
    category: { type: String, enum: Object.values(EventCategory), required: true },
    createdAt: { type: Date, default: Date.now },
    softDelete: { type: Boolean, default: false },
    artists: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Define the Mongoose model for events
const EventModel = model<IEvent & Document>('Event', eventSchema);

export default EventModel;
