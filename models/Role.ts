import { roles } from '@/Constants';
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    title: { type: String, required: true, enum: roles }
});

export default mongoose.models?.Role || mongoose.model('Role', roleSchema);