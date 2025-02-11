import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export const config = {
    mongoUri: process.env.MONGO_DB_URI,
    environment: process.env.NODE_ENV
};
