import { Document, Types } from 'mongoose';
import { IUser } from '../interfaces/user-interface'; // Update this path accordingly
import { IEvent } from '../interfaces/events-interface'; // Update this path accordingly

export interface IBooking extends Document {
    eventId: Types.ObjectId | IEvent;
    userId: Types.ObjectId | IUser;
    totalTickets: number;
    totalAmount: number;
    createdAt: Date;
    softDelete?: boolean;
    name: string;
    mobile: string;
}
