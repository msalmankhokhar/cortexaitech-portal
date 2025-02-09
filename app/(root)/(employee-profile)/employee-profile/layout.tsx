'use client';
import EmployeeProvider from '@/Context/EmployeeContext';
import { useParams } from 'next/navigation';

export default function EmployeeProfileLayout({ children }: { children: React.ReactNode }) {
    
    const params = useParams();
    const employeeId = params.id as string;
    return (
        <EmployeeProvider employeeId={employeeId}>
            {children}
        </EmployeeProvider>
    );

}