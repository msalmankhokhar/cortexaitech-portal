'use client';
import { createContext, useContext } from 'react';
import useEmployee from '@/hooks/useEmployee';
import { Session } from 'next-auth';

interface EmployeeContextType {
  employee: EmployeeDocument | null;
  loading: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  session: Session | null; // Replace with proper session type
  isAdmin: boolean | undefined;
  isOwnProfile: boolean;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export default function EmployeeProvider({ children, employeeId }: { children: React.ReactNode; employeeId: string }) {
  const employeeData = useEmployee(employeeId);

  return (
    <EmployeeContext.Provider value={employeeData}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within a EmployeeProvider');
  }
  return context;
}