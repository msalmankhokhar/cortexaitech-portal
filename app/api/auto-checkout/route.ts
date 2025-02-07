import { NextResponse } from 'next/server';
import { Attendance } from '@/models';

export async function POST() {
  try {
    const now = new Date();
    const eightHoursAgo = new Date(now.getTime() - (8 * 60 * 60 * 1000));
    
    // Find and update all records with no checkOut and old checkIn
    await Attendance.updateMany(
      { 
        checkOut: { $exists: false },
        checkIn: { $lte: eightHoursAgo }
      },
      { 
        $set: { checkOut: now }
      }
    );
    
    return NextResponse.json({ message: 'Auto-checkout completed' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process auto-checkout' },
      { status: 500 }
    );
  }
}

// Optional: Add this if you want to handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}