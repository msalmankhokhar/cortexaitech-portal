import mongoose from 'mongoose';

export interface officeDocument extends mongoose.Document {
  title: string;
}

const officeSchema = new mongoose.Schema<officeDocument>({
  title: { type: String, required: true, unique: true },
});

export default officeSchema;