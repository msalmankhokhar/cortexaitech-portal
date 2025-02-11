import mongoose from 'mongoose';

export interface roleDocument extends mongoose.Document {
  title: string;
  department: mongoose.Types.ObjectId;
}

const roleSchema = new mongoose.Schema<roleDocument>({
  title: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, unique: false },
});

export default roleSchema;