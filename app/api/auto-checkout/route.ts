import type { NextApiRequest, NextApiResponse } from 'next';
import { Attendance } from '@/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
      
      res.status(200).json({ message: 'Auto-checkout completed' });
    } catch {
      res.status(500).json({ error: 'Failed to process auto-checkout' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}