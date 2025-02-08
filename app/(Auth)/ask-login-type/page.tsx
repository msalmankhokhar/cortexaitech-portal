import React from 'react'
import { ChevronRight, User } from "lucide-react";
import Link from 'next/link';

export default function AskLoginType() {
    return (
        <>
            <div className="mb-10">
                <h2 className="font-semibold dark:text-white text-3xl">Welcome Back</h2>
                <p className="text-secondary-700 dark:text-secondary-100">Please choose a login type</p>
            </div>

            <div className="flex flex-col gap-3">
                
                <Link href={`/login?callbackUrl=${process.env.NEXTAUTH_URL}`} className="px-5 py-4 mb-5 rounded-lg bg-secondary-1000 dark:bg-slate-700 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <User size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Sign In</h3>
                            <p className="">Login to your account</p>
                        </div>
                    </div>
                    <ChevronRight size={30} />
                </Link>

                {
                    // Admin login and Employee login is disabled for now by SALMAN because no need for two separate options
                }

                {/* <Link href={`/login?type=Employee&callbackUrl=${process.env.NEXTAUTH_URL}`} className="px-5 py-4 mb-5 rounded-lg bg-secondary-1000 dark:bg-slate-700 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <User size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Employee</h3>
                            <p className="">Login as employee</p>
                        </div>
                    </div>
                    <ChevronRight size={30} />
                </Link> */}

                {/* <Link href={`/login?type=Admin&callbackUrl=${process.env.NEXTAUTH_URL}`} className="px-5 py-4 rounded-lg border border-secondary-300 bg-secondary-100 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <UserCog size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Admin</h3>
                            <p>Login as admin</p>
                        </div>
                    </div>
                    <ChevronRight className='peer' size={30} />
                </Link> */}

            </div>
        </>
    )
}
