import React from 'react'
import { ChevronRight, User, UserCog } from "lucide-react";

export default function AskLoginType() {
    return (
        <>
            <div className="mb-10">
                <h2 className="font-bold text-3xl">Welcome Back</h2>
                <p className="text-secondary-700">Please choose a login type</p>
            </div>

            <div className="flex flex-col gap-2">
                
                <div className="p-5 rounded-lg bg-secondary-1000 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <User size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Employee</h3>
                            <p className="">Login as employee</p>
                        </div>
                    </div>
                    <ChevronRight size={30} />
                </div>

                <div className="p-5 rounded-lg border border-secondary-300 bg-secondary-100 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <UserCog size={35} />
                        <div>
                            <h3 className="font-semibold text-lg">Admin</h3>
                            <p>Access the admin portal</p>
                        </div>
                    </div>
                    <ChevronRight size={30} />
                </div>

            </div>
        </>
    )
}
