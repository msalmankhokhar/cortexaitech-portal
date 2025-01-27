import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                try {
                    await connectDb(); // connected to database
                    console.log(`Got email ${credentials?.email}`);
                    const user = await User.findOne({ email: credentials?.email });
                    if (user) {
                        // User exists, so now check if he gave correct password
                        if (user.password === credentials?.password) {
                            return user
                        } else {
                            // Password is wrong, handle what to do here
                            throw new Error('Password is Wrong. Click forgot password to reset or try again');
                        }
                    } else {
                        // User does not exists
                        throw new Error('Email is not registered');
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
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token?._id?.toString();
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.password = token.password;
                session.user.avatar = token.avatar;
                session.user.dateJoined = token.dateJoined;
                session.user.admin = token.admin;
                session.user.role = token.role;
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user?._id?.toString();
                token.name = user.name;
                token.email = user.email;
                token.password = user.password;
                token.avatar = user.avatar;
                token.dateJoined = user.dateJoined;
                token.admin = user.admin;
                token.role = user.role;
            }
            return token
        }
    }
}