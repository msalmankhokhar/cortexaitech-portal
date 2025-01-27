import { roles } from '@/Constants';
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    primary: { type: String, required: true, enum: roles.primary },
    secondary: { type: String, required: true, enum: roles.secondary },
});

export default mongoose.models?.Role || mongoose.model('Role', roleSchema);