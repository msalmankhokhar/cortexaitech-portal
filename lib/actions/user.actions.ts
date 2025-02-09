"use server";
import { Address, User } from "@/models";
import connectDb from "../db";
import { parseStringify } from "../utils";
import { Resend } from "resend";
import { newEmployeeEmailTemplate, newEmployeeAdminNotificationEmailTemplate } from "@/Constants";
import { UpdateQuery } from "mongoose";

export interface EmployeeResponse {
    success: boolean;
    employee: EmployeeDocument | null;
    message: string;
    error: string | null;
}
export interface AddressResponse {
    success: boolean;
    address: AddressDocument | null;
    message: string;
    error: string | null;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addEmployee(employeeData: signupFormData, adminEmail: string) {
    console.log('Adding employee', employeeData);
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/add-user`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(employeeData),
        });
        const json = await response.json();
        if (json.success) {
            console.log('sending notification emails for new employee account');

            // Sending email notification to admin
            await resend.emails.send({
                from: 'Cortex-AI-Tech HR Dashboard <hr@cortexaitech-portal.salmanmalik.pro>',
                to: adminEmail,
                subject: 'New Employee Account Created',
                html: newEmployeeAdminNotificationEmailTemplate(json.user)
            });

            // Sending email notification to new employee
            await resend.emails.send({
                from: 'Cortex-AI-Tech HR Dashboard <hr@cortexaitech-portal.salmanmalik.pro>',
                to: json.user.email,
                subject: 'Your New Employee Account Created',
                html: newEmployeeEmailTemplate(
                    json.user.firstName,
                    json.user.email,
                    employeeData.password
                )
            });
            console.log('Successfully sent notification emails for new employee account');
        }
        console.log(json);
        return json;
    } catch {
        return {
            success: false,
            message: 'Error adding employee',
        }
    }
}

export async function getEmployees(): Promise<{ success: boolean, employees: never[], message: string }> {
    console.log('Getting users');
    try {
        await connectDb();
        const users = await User.find().populate('department').populate('role').populate('office').lean();
        const response = parseStringify(users);
        console.log(response);
        return {
            success: true,
            employees: response,
            message: response.length > 0 ? 'Employees fetched successfully' : 'No employees found',
        }
    } catch (error) {
        const response = {
            success: false,
            employees: [],
            message: 'Error fetching employees',
        }
        console.log(response);
        console.log(error);
        return response
    }
}

export async function getEmployeeById(id: string): Promise<EmployeeResponse> {
    console.log('Getting employee by id', id);
    try {
        connectDb();
        const employee = await User.findById(id).populate('department').populate('role').populate('office').populate('address').lean();
        if (!employee) {
            const response = {
                success: false,
                employee: null,
                message: 'Employee not found',
                error: null,
            }
            return response;
        }
        const response = {
            success: true,
            employee: parseStringify(employee),
            message: 'Employee fetched successfully',
            error: null,
        }
        return response;
    } catch(error: unknown) {
        console.log(error);
        const response = {
            success: false,
            employee: null,
            message: 'Error fetching employee',
            error: 'Error fetching employee',
        }
        return response;
    }
}

export async function updateEmployeePersonalInfo(id: string, data: UpdateQuery<EmployeeDocument>): Promise<EmployeeResponse> {
    console.log('Updating employee', id, data);
    try {
        await connectDb();
        const employee = await User.findByIdAndUpdate(id, data, { new: true }).populate('department').populate('role').populate('office').populate('address').lean();
        if (!employee) {
            return {
                success: false,
                employee: null,
                message: 'Employee not found',
                error: null,
            }
        }
        return {
            success: true,
            employee: parseStringify(employee),
            message: 'Employee updated successfully',
            error: null,
        }
    } catch (error: unknown) {
        console.log(error);
        return {
            success: false,
            employee: null,
            message: 'Error updating employee',
            error: 'Error updating employee',
        }
        
    }
}

export async function updateEmployeeAddress(id: string, data: UpdateQuery<AddressDocument>): Promise<AddressResponse> {
    console.log('Updating address for employee', id, data);
    try {
        await connectDb();
        
        // Find employee and populate address
        const employee = await User.findById(id).populate('address');
        if (!employee) {
            return {
                success: false,
                address: null,
                message: 'Employee not found',
                error: 'Employee not found',
            }
        }

        // Update address document
        const updatedAddress = await Address.findByIdAndUpdate(
            employee.address._id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return {
                success: false,
                address: null,
                message: 'Address not found',
                error: 'Address not found',
            }
        }

        // Ensure the address is properly linked to the employee
        await User.findByIdAndUpdate(
            id,
            { $set: { address: updatedAddress._id } },
            { new: true }
        );

        return {
            success: true,
            address: parseStringify(updatedAddress),
            message: 'Address updated successfully',
            error: null,
        }
    } catch (error: unknown) {
        console.error('Error updating address:', error);
        return {
            success: false,
            address: null,
            message: 'Error updating address',
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}