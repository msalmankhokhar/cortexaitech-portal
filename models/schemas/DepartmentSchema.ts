import mongoose from 'mongoose';

export interface departmentDocument extends mongoose.Document {
  title: string;
  subDepartments: mongoose.Types.ObjectId[];
}

const departmentSchema = new mongoose.Schema<departmentDocument>({
  title: { type: String, required: true, unique: true },
  subDepartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, default: [] }]
});

export default departmentSchema;