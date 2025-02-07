import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getEmployeeById } from '@/lib/actions/user.actions';

export default function useEmployee(employeeId: string) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeDocument | null>(null);

  useEffect(() => {
    async function fetchEmployee() {
      if (!employeeId || status !== 'authenticated') return;
      
      // Only fetch if we don't already have the employee data
      if (!employee) {
        setLoading(true);
        try {
          if (session?.user?.adminAccess === false && session.user._id === employeeId) {
            setEmployee(session.user);
          } else {
            const response = await getEmployeeById(employeeId);
            if (response.success) {
              setEmployee(response.employee);
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchEmployee();
  }, [employeeId, session, status, employee]);

  return { employee, loading, status, session };
}