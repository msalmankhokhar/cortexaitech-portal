import countryNames from '@/Constants/countries';
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  primary: { type: String, required: true, unique: true },
  country: { type: String, required: true, unique: false, enum: countryNames },
  state: { type: String, required: true, unique: false },
  city: { type: String, required: true, unique: false },
});

export default addressSchema;