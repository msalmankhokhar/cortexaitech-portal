import { handleAPIError } from "@/lib/utils";
import { Role } from "@/models";
import { User } from "@/models";
import { Department } from "@/models";
import { Address } from "@/models";
import connectDb from "@/lib/db";
import { NextResponse } from "next/server";
import { Office } from "@/models";

export async function POST(req: Request) {
    await connectDb();
    const upcommingData : signupFormData = await req.json();
    const {
        // User details
        firstName, 
        lastName, 
        email, 
        password,
        phone,
        adminAccess,
        // Employee details
        role,
        department,
        office,
        timezone,
        // Personal Information
        gender,
        address
    } = upcommingData;

    try {
        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const json = { success: false, message: 'User already exists' };
            return NextResponse.json(json, { status: 400 });
        }

        // Creating new employee
        const user = new User({ firstName, lastName, email, password, phone, adminAccess, timezone, gender});

        // Setting department for this employee
        const existingDepartment = await Department.findOne({ title: department.title });
        if (existingDepartment) {
            // department already exists
            user.department = existingDepartment;
        } else {
            const newDepartment = new Department({ title: department.title });
            await newDepartment.save();
            user.department = newDepartment;
        }

        // Setting role for this employee
        const existingRole = await Role.findOne({ title: role.title });
        if (existingRole) {
            // role already exists
            user.role = existingRole;
        } else {
            const newRole = new Role({ title: role.title });
            newRole.department = user.department;
            await newRole.save();
            user.role = newRole;
        }

        // Setting Office for this employee
        const existingOffice = await Office.findOne({ title: office });
        if (existingOffice) {
            // office already exists
            user.office = existingOffice;
        } else {
            const newOffice = new Office({ title: office });
            await newOffice.save();
            user.office = newOffice;
        }

        // Setting address for this employee
        const newAddress = new Address(address);
        await newAddress.save();
        user.address = newAddress;

        // Saving user to database
        const userData = await user.save();

        const json = { success: true, message: 'User created successfully', user: userData };
        return NextResponse.json(json, { status: 200 });

    } catch (error: unknown) {
        return handleAPIError(error, 'Error creating user');
    }
}