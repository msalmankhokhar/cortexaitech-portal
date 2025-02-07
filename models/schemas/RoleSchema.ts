import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, unique: false },
});

export default roleSchema;