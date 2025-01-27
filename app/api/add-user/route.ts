import { handleAPIError } from "@/lib/utils";
import Role from "@/models/Role";
import User from "@/models/User";
import connectDb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDb();
    const upcommingData : signupFormData = await req.json();
    const { email, name, password, role, admin } = upcommingData;

    try {
        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const json = { success: false, message: 'User already exists' };
            return NextResponse.json(json, { status: 400 });
        }

        // Creating new user
        const user = new User({ email, name, password, admin });

        // Setting role for this user
        if (role) {
            const existingRole = await Role.findOne({ primary: role.primary, secondary: role.secondary });
            if (existingRole) {
                user.role = existingRole;
            } else {
                const newRole = new Role({ primary: role.primary, secondary: role.secondary });
                await newRole.save();
                user.role = newRole;
            }
        }

        // Saving user to database
        const userData = await user.save();
        const json = { success: true, message: 'User created successfully', user: userData };
        return NextResponse.json(json, { status: 200 });

    } catch (error: unknown) {
        return handleAPIError(error, 'Error creating user');
    }
}