"use client";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { PageSpinner } from "@/components/Spinner";
import { getAvatarUrl } from "@/lib/utils";
import { ChevronDown, ChevronLeft, Edit, Globe, Mail, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import EmployeeProfileLoading from "./loading";
import useEmployee from "@/hooks/useEmployee";

export default function EmployeeProfile() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id as string;
  const { employee, loading, status, session } = useEmployee(employeeId);

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
          <p className="text-xl font-bold">{(session?.user?.adminAccess && employee._id !== session?.user._id) ? 'Employee Detail' : `Welcome, ${employee?.firstName}`}</p>
        </div>
        <section className="flex gap-7">
          <aside className="min-w-[260px] bg-white dark:bg-slate-800 rounded-lg px-5 self-start">

            <div className="py-5 flex flex-col items-center border-b dark:border-secondary-700 dark:text-white">
              <Avatar onUploadSuccess={ ()=>location.reload() } userId={employee?._id} editable={true} src={employee?.avatar ? employee.avatar : getAvatarUrl(`${employee?.firstName} ${employee?.lastName}`)} />
              <div className="flex items-center flex-col mt-3">
                <h1 className="text-lg font-semibold">{`${employee?.firstName} ${employee?.lastName}`}</h1>
                <p className="text-sm text-secondary-700 dark:text-secondary-300">{employee!.role.title}</p>
                <div className="bg-green-500/10 font-bold mt-3 rounded py-1.5 px-3 text-xs text-green-500">{employee!.status}</div>
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

              <div className="rounded-lg border dark:border-secondary-700 dark:text-white">
                <div className="p-5 flex items-center justify-between border-b dark:border-secondary-700">
                  <h1 className="font-semibold">Personal Information</h1>
                  <button>
                    <Edit className="text-secondary-700 dark:text-secondary-400" size={24} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-wrap max-h-[250px] gap-5">
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Full Name</h3>
                    <p className="font-medium">{`${employee?.firstName} ${employee?.lastName}`}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Nationality</h3>
                    <p className="font-medium">{employee?.address.country}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Email Address</h3>
                    <p className="font-medium">{employee?.email}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Gender</h3>
                    <p className="font-medium">{employee?.gender}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Phone</h3>
                    <p className="font-medium">{employee?.phone}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border dark:border-secondary-700 dark:text-white">
                <div className="p-5 flex items-center justify-between border-b dark:border-secondary-700">
                  <h1 className="font-semibold">Address</h1>
                  <button>
                    <Edit className="text-secondary-700 dark:text-secondary-400" size={24} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-wrap max-h-[250px] gap-5">
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Primary</h3>
                    <p className="font-medium">{employee?.address.primary}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Country</h3>
                    <p className="font-medium">{employee?.address.country}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">State/Province</h3>
                    <p className="font-medium">{employee?.address.state}</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">City</h3>
                    <p className="font-medium">{employee?.address.city}</p>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </section>
      </main>
    </>
  );
}