import { Schema, model } from 'mongoose';
import { IBooking } from '../interfaces/booking-interface'; // Update this path accordingly

// Define the Mongoose schema for bookings
const bookingSchema = new Schema<IBooking>(
    {
        eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        totalTickets: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        softDelete: { type: Boolean, default: false },
        // Additional fields from the associated user
        name: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// Define the Mongoose model for bookings
const BookingModel = model<IBooking>('Booking', bookingSchema);

export default BookingModel;
