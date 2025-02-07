import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  subDepartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, default: [] }]
});

export default departmentSchema;