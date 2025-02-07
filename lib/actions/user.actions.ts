"use server";
import { User } from "@/models";
import connectDb from "../db";
import { parseStringify } from "../utils";
import { Resend } from "resend";
import { newEmployeeEmailTemplate, newEmployeeAdminNotificationEmailTemplate } from "@/Constants";

export interface EmployeeResponse {
    success: boolean;
    employee: EmployeeDocument | null;
    message: string;
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
    const employee = await User.findById(id).populate('department').populate('role').populate('office').populate('address').lean();

    if (!employee) {
        return {
            success: false,
            employee: null,
            message: 'Employee not found',
        }
    }

    return {
        success: true,
        employee: parseStringify(employee),
        message: 'Employee fetched successfully',
    }
}