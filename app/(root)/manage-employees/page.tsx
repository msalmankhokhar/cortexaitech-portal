"use client";
import Button from "@/components/Button";
import FilterDropDown from "@/components/FilterDropDown";
import EmployeeTable from "@/components/root/Table/EmployeeTable";
import AddEmployeeSideModal from "@/components/SideModal/AddEmployeeSideModal";
import { departmentsArray, offices, rolesArray, statuses } from "@/Constants/enum";
import { useSideBarModal } from "@/Context/SideModalContext";
import { ChevronLeft, FileDown, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ManageEmployees() {

    const router = useRouter();
    const { setSideBarModalOpen } = useSideBarModal();

    const handleAddNewClick = () => {
        setSideBarModalOpen(true);
    }

    return (
        <>
            <main className="px-7 pb-5 bg-secondary-100 dark:bg-slate-900 flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center dark:text-white gap-3">
                        <button onClick={() => router.back()}>
                            <ChevronLeft size={18} />
                        </button>
                        <p className="text-xl font-bold">Manage Employees</p>
                    </div>
                    <div className="flex items-center dark:text-white gap-3">
                        <Button
                            variant="btn-hollow"
                            icon={<FileDown size={18} className="text-secondary-900 dark:text-white" />}
                        >Download</Button>
                        <Button
                            onClick={handleAddNewClick}
                            icon={<Plus size={18} className="text-white dark:text-secondary-800" />}
                        >Add New</Button>
                    </div>
                </div>

                <section className="flex flex-col gap-4 p-4 rounded-lg bg-white dark:bg-slate-800">

                    {/* Filters and search bar for employee table */}
                    <div className="flex gap-2">

                        {/* Search Bar */}
                        <div className="flex items-center gap-1 focus:ring-1 ring-primary-400 w-full max-w-[300px] min-w-[240px] px-3 text-sm border dark:border-slate-700 rounded-lg">
                            <input type="search" className="flex-1 py-2.5 bg-transparent outline-none" placeholder="Search Employee" />
                            <Search size={18} className="text-secondary-600 dark:text-secondary-300" />
                        </div>

                        {/* Office Filter */}
                        <FilterDropDown
                            defaultValue="All Offices"
                            options={offices}
                        />
                        <FilterDropDown
                            defaultValue="All Departments"
                            options={departmentsArray}
                        />
                        <FilterDropDown
                            defaultValue="All Roles"
                            options={rolesArray}
                        />
                        <FilterDropDown
                            defaultValue="All Statuses"
                            options={statuses}
                        />

                    </div>

                    <EmployeeTable />
                </section>

                <AddEmployeeSideModal />

            </main>

        </>
    );
}