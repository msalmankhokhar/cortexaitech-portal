import React from 'react'
import { ChevronRight, User, UserCog } from "lucide-react";
import Link from 'next/link';

export default function AskLoginType() {
    return (
        <>
            <div className="mb-10">
                <h2 className="font-semibold dark:text-white text-3xl">Welcome Back</h2>
                <p className="text-secondary-700 dark:text-secondary-100">Please choose a login type</p>
            </div>

            <div className="flex flex-col gap-3">
                
                <Link href={'/login?type=Employee'} className="px-5 py-4 rounded-lg bg-secondary-1000 dark:bg-slate-700 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <User size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Employee</h3>
                            <p className="">Login as employee</p>
                        </div>
                    </div>
                    <ChevronRight size={30} />
                </Link>

                <Link href={'/login?type=Admin'} className="px-5 py-4 rounded-lg border border-secondary-300 bg-secondary-100 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <UserCog size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Admin</h3>
                            <p>Login as admin</p>
                        </div>
                    </div>
                    <ChevronRight className='peer' size={30} />
                </Link>

            </div>
        </>
    )
}
