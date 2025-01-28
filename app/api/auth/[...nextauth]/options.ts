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
                            throw new Error('Mama tera password wrong hai');
                        }
                    } else {
                        // User does not exists
                        throw new Error('Apka email registered nhi hai');
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
        signIn: '/login?type=Employee',
        
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
                    name: token.name,
                    email: token.email,
                    password: token.password,
                    avatar: token.avatar,
                    dateJoined: token.dateJoined,
                    admin: token.admin,
                    role: token.role
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    _id: user._id?.toString(),
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    avatar: user.avatar,
                    dateJoined: user.dateJoined,
                    admin: user.admin,
                    role: user.role
                };
            }
            return token;
        }
    }
}