import mongoose from 'mongoose';
import departmentSchema from './schemas/DepartmentSchema';
import roleSchema from './schemas/RoleSchema';
import officeSchema from './schemas/OfficeSchema';
import addressSchema from './schemas/AddressSchema';
import userSchema from './schemas/UserSchema';
import attendanceSchema from './schemas/AttendanceSchema';

// Delete existing models
delete mongoose.models.Department;
delete mongoose.models.Role;
delete mongoose.models.Office;
delete mongoose.models.Address;
delete mongoose.models.User;
delete mongoose.models.Attendance;

// Register models in correct order
export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
export const Office = mongoose.models.Office || mongoose.model('Office', officeSchema);
export const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);