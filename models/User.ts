import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  avatar: { type: String, required: false, unique: false },
  admin: { type: Boolean, required: true, unique: false, default: false },
  dateJoined: { type: Date, required: true, default: Date.now },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: false },
});

export default mongoose.models?.User || mongoose.model('User', userSchema);