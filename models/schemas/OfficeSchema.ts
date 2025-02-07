import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

export default officeSchema;