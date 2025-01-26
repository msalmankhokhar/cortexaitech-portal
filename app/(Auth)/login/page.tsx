import AuthForm from '@/components/AuthForm'
import React from 'react'

export default function Login() {
    return (
        <>
            <div className="mb-10">
                <h2 className="font-bold text-3xl mb-2">Sign In</h2>
                <p className="text-secondary-700">Use your email and password to login</p>
            </div>
            <AuthForm />
        </>
    )
}
