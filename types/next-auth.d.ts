import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        name?: string;
        email?: string;
        password?: string;
        avatar?: string;
        dateJoined?: Date;
        admin?: boolean;
        role?: {
            primary: string,
            secondary: string;
        };
    }

    interface Session {
        user: {
            _id?: string;
            name?: string;
            email?: string;
            password?: string;
            avatar?: string;
            dateJoined?: Date;
            admin?: boolean;
            role?: {
                primary: string,
                secondary: string;
            }
        } & DefaultSession['user']
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        name?: string;
        email?: string;
        password?: string;
        avatar?: string;
        dateJoined?: Date;
        admin?: boolean;
        role?: {
            primary: string,
            secondary: string;
        };
    }
}