"use client";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { PageSpinner } from "@/components/Spinner";
import { getAvatarUrl } from "@/lib/utils";
import { ChevronDown, ChevronLeft, Globe, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import EmployeeProfileLoading from "./loading";
import { useEmployeeContext } from "@/Context/EmployeeContext";
import EmployeeStatus from "@/components/root/EmployeeStatus";
import { employeeStatusType } from "@/Constants/enum";

export default function EmployeeProfileLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { employee, loading, status, isAdmin, isOwnProfile } = useEmployeeContext();

    // Wait for session loading
    if (status === 'loading') {
        return <PageSpinner />;
    }

    if (loading) {
        return <EmployeeProfileLoading />;
    }

    // Only redirect if we're certain there's no session
    if (status === 'unauthenticated') {
        router.replace('/ask-login-type');
        return null;
    }

    return (
        <>
            <main className="px-7 pb-5 bg-secondary-100 dark:bg-slate-900 flex flex-col relative">
                <div className="flex py-7 items-center dark:text-white gap-3">
                    <button onClick={() => router.back()}>
                        <ChevronLeft size={18} />
                    </button>
                    <p className="text-xl font-bold">{(isAdmin && !isOwnProfile) ? 'Employee Detail' : `Welcome, ${employee?.firstName}`}</p>
                </div>
                <section className="flex gap-7">
                    <aside className="min-w-[260px] bg-white dark:bg-slate-800 rounded-lg px-5 self-start">

                        <div className="py-5 flex flex-col items-center border-b dark:border-secondary-700 dark:text-white">
                            <Avatar onUploadSuccess={() => location.reload()} userId={employee?._id} editable={true} src={employee?.avatar ? employee.avatar : getAvatarUrl(`${employee?.firstName} ${employee?.lastName}`)} />
                            <div className="flex items-center flex-col mt-3">
                                <h1 className="text-lg font-semibold">{`${employee?.firstName} ${employee?.lastName}`}</h1>
                                <p className="text-sm text-secondary-700 dark:text-secondary-300">{employee!.role.title}</p>
                                <div className="mt-3">
                                    <EmployeeStatus value={employee!.status as employeeStatusType} />
                                </div>
                            </div>
                        </div>

                        <div className="py-5 flex flex-col border-b dark:border-secondary-700 gap-4 text-sm text-secondary-700 dark:text-secondary-200">
                            <div className="flex gap-3 items-center">
                                <Mail size={18} strokeWidth={1.5} />
                                <p>{employee?.email}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Phone size={18} strokeWidth={1.5} />
                                <p>{employee?.phone}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Globe size={18} strokeWidth={1.5} />
                                <p>{employee?.timezone}</p>
                            </div>
                        </div>

                        <div className="py-5 flex flex-col dark:border-secondary-700 dark:text-white gap-3">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-secondary-700 dark:text-secondary-400 text-xs">Department</h2>
                                <p className="text-sm font-medium">{employee?.department.title}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-secondary-700 dark:text-secondary-400 text-xs">Primary Role</h2>
                                <p className="text-sm font-medium">{employee?.role.title}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-secondary-700 dark:text-secondary-400 text-xs">Office</h2>
                                <p className="text-sm font-medium">{employee?.office.title}</p>
                            </div>
                            <Button variant="btn-primary" iconPositionVariant="btn-icon-right" icon={<ChevronDown size={18} />}>Actions</Button>
                        </div>

                    </aside>

                    <aside className="bg-white dark:bg-slate-800 rounded-lg p-5 w-full">
                        <div className="flex text-sm dark:text-white font-semibold border-b dark:border-secondary-700">
                            <button className="px-5 border-b-2 border-primary-400">General</button>
                            <button className="px-5 py-2">Job</button>
                            <button className="px-5 py-2">Payroll</button>
                            <button className="px-5 py-2">Documents</button>
                            <button className="px-5 py-2">Settings</button>
                        </div>
                        <div className="py-5 flex flex-col gap-5">

                            {children}

                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}