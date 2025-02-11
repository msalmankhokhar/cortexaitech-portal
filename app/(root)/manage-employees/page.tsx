"use client";
import Button from "@/components/Button";
import EmployeeTable from "@/components/root/Table/EmployeeTable";
import AddEmployeeSideModal from "@/components/SideModal/AddEmployeeSideModal";
import { useSideBarModal } from "@/Context/SideModalContext";
import { ChevronLeft, FileDown, Plus } from "lucide-react";
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
                <div className="flex items-center justify-between py-7">
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

                <section className="flex flex-col p-4 rounded-lg bg-white dark:bg-slate-800">
                    <EmployeeTable />
                </section>

                <AddEmployeeSideModal />

            </main>

        </>
    );
}