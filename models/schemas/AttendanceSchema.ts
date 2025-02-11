import mongoose from 'mongoose';
// import { maxWorkHoursPerDay } from '@/Constants/data';

const maxWorkHoursPerDay = 8;

interface attendanceDocument extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId;
    dateCreated: Date;
    checkIn: Date;
    checkOut?: Date;
}

const attendanceSchema = new mongoose.Schema<attendanceDocument>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    dateCreated: { type: Date, required: true, unique: false, default: Date.now },
    checkIn: { type: Date, required: true, unique: false, default: Date.now },
    checkOut: { type: Date, required: false, unique: false },
});

// Middleware to auto-checkout after maxWorkHours

const maxWorkTimeMs = maxWorkHoursPerDay * 60 * 60 * 1000; // Convert hours to ms

attendanceSchema.pre('save', function (next) {
    if (!this.checkOut) {
        const checkInTime = new Date(this.checkIn);
        const now = new Date();
        if (now.getTime() - checkInTime.getTime() >= maxWorkTimeMs) {
            this.checkOut = now;
        }
    }
    next();
});

export default attendanceSchema;