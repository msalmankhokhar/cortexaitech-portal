import mongoose from 'mongoose';
import { genders, statuses } from '../../scripts/seed-constants/enums';
import { timezones } from '../../scripts/seed-constants';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  avatar: { type: String, required: false, unique: false },
  adminAccess: { type: Boolean, required: true, unique: false, default: false },
  dateJoined: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },

  // Employee details
  office: { type: mongoose.Schema.Types.ObjectId, ref: 'Office', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, unique: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true, unique: false },
  status: { type: String, required: true, unique: false, enum: statuses, default: 'Active' },
  timezone: { type: String, required: true, unique: false, enum: timezones },

  // Personal Information
  gender: { type: String, required: true, unique: false, enum: genders },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true, unique: true },
  phone: { type: String, required: false, unique: true },
});

export default userSchema;