import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "@/lib/db";
import { User } from "@/models";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
                loginType: { label: "Login Type", type: "text" }
            },

            async authorize(credentials) {
                try {
                    await connectDb(); // connected to database
                    console.log(`Got email ${credentials?.email}`);
                    const user = await User.findOne({ email: credentials?.email }).populate('role').populate('department').populate('office').populate('address');
                    if (user) {
                        // User exists, so now check if he gave correct password
                        if (user.password === credentials?.password) {
                            return user
                        } else {
                            // Password is wrong, handle what to do here
                            throw new Error('Passowrd is wrong. Click on forgot password to reset it or try again');
                        }
                    } else {
                        // User does not exists
                        throw new Error('Email not registered.');
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw new Error('An unexpected error occurred');
                }
            }
        })
    ],
    pages: {
        // signIn: '/login?type=Employee',
        signIn: '/ask-login-type',
        
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    _id: token._id?.toString(),
                    firstName: token.firstName,
                    lastName: token.lastName,
                    email: token.email,
                    phone: token.phone,
                    gender: token.gender,
                    password: token.password,
                    avatar: token.avatar,
                    dateJoined: token.dateJoined,
                    adminAccess: token.adminAccess,
                    status: token.status,
                    role: token.role,
                    department: token.department,
                    office: token.office,
                    timezone: token.timezone,
                    address: token.address,
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    _id: user._id?.toString(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender,
                    password: user.password,
                    avatar: user.avatar,
                    dateJoined: user.dateJoined,
                    adminAccess: user.adminAccess,
                    status: user.status,
                    role: user.role,
                    department: user.department,
                    office: user.office,
                    timezone: user.timezone,
                    address: user.address,
                };
            }
            return token;
        }
    }
}