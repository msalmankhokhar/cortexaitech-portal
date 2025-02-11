'use client';
import EmployeeProvider from '@/Context/EmployeeContext';
import { useParams } from 'next/navigation';

export default function EmployeeProfileLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const employeeId = params.id as string;
    
    return (
        <EmployeeProvider 
            key={employeeId} // Add key prop to force re-render when ID changes
            employeeId={employeeId}
        >
            {children}
        </EmployeeProvider>
    );
}