import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        avatar?: string;
        adminAccess: boolean;
        dateJoined: Date;
        office: {
            _id: string;
            title: string;
        };
        department: {
            _id: string;
            title: string;
        };
        role: {
            _id: string;
            title: string;
        };
        status: string;
        timezone: string;
        gender: string;
        address: {
            _id: string;
            primary: string;
            country: string;
            state: string;
            city: string;
        };
        phone?: string;
    }

    interface Session {
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            avatar?: string;
            adminAccess: boolean;
            dateJoined: Date;
            office: {
                _id: string;
                title: string;
            };
            department: {
                _id: string;
                title: string;
            };
            role: {
                _id: string;
                title: string;
            };
            status: string;
            timezone: string;
            gender: string;
            address: {
                _id: string;
                primary: string;
                country: string;
                state: string;
                city: string;
            };
            phone?: string;
        } & DefaultSession['user']
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        avatar?: string;
        adminAccess: boolean;
        dateJoined: Date;
        office: {
            _id: string;
            title: string;
        };
        department: {
            _id: string;
            title: string;
        };
        role: {
            _id: string;
            title: string;
        };
        status: string;
        timezone: string;
        gender: string;
        address: {
            _id: string;
            primary: string;
            country: string;
            state: string;
            city: string;
        };
        phone?: string;
    }
}