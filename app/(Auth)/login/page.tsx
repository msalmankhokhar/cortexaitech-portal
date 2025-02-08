"use client";
import AuthForm from '@/components/AuthForm'
// import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Login() {

    // const params = useSearchParams();
    // const loginTypeParam = params?.get('type');
    // const loginType = (loginTypeParam === 'Employee' || loginTypeParam === 'Admin') ? loginTypeParam : null;

    // If URL doesn't have type query param, redirect to ask-login-type page
    // if (!loginType) return redirect('/ask-login-type');

    return (
        <>
            <div className="mb-7 sm:mb-10">
                <h2 className="font-semibold text-3xl text-nowrap dynamic-text mb-2 dark:text-white">Sign Into your Account</h2>
                <p className="text-secondary-700 dark:text-secondary-100">Use your email and password to login</p>
            </div>
            <AuthForm />
        </>
    )
}
