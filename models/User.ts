import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true, unique: false },
  dateJoined: { type: Date, required: true, default: Date.now },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
});

export default mongoose.models?.User || mongoose.model('User', userSchema);