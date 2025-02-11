import React, { useEffect, useState } from 'react'
import { Table } from '..';
import EmployeeTableRow from './EmployeeTableRow';
import { getEmployees } from '@/lib/actions/user.actions';
import { User } from 'next-auth';
import { usePageLoading } from '@/Context/LoadingContext';
import TablePager from '../TablePager';

export default function EmployeeTable() {
    const headItems = ["Employee Name", "Job Title", "Department", "Office", "Status"];
    const [employees, setEmployees] = useState([]);
    const [noEmployees, setNoEmployees] = useState(true);
    const errorPlaceholder = 'Error Placeholder';
    const [error, setError] = useState(errorPlaceholder);
    const { setPageLoading } = usePageLoading();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        async function fetchEmployees() {
            setPageLoading(true);
            const employeesResponse = await getEmployees(currentPage, ITEMS_PER_PAGE);
            console.log('number of employees got', employeesResponse.employees.length);
            if (employeesResponse.success) {
                setEmployees(employeesResponse.employees);
                setTotalPages(employeesResponse.totalPages);
                if (employeesResponse.employees.length === 0) {
                    setError(employeesResponse.message);
                    console.log(employeesResponse);
                    setNoEmployees(true);
                } else {
                    setNoEmployees(false);
                }
            } else {
                setError(employeesResponse.message);
                setNoEmployees(true);
            }
            setPageLoading(false);
        }
        fetchEmployees();
    }, [currentPage, setPageLoading])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
        <Table headItems={headItems}>
            {
                employees.length > 0 ? (
                    employees.map((employee: User) => {
                        const jobTitle = employee.role?.title;
                        return (
                            <EmployeeTableRow
                                key={employee._id}
                                employee={{
                                    _id: employee._id!,
                                    firstName: employee.firstName!,
                                    lastName: employee.lastName!,
                                    email: employee.email!,
                                    jobTitle: jobTitle!,
                                    department: employee.department!.title!,
                                    office: employee.office!.title!,
                                    status: employee.status!,
                                    avatar: employee.avatar
                                }}
                                />
                            )
                        })
                ) : (
                    noEmployees && (
                        <tr className={error === errorPlaceholder ?'opacity-0' : ''}>
                            <td colSpan={5}><p className='w-full font-bold text-red-500 text-sm py-3 text-center'>{error}</p></td>
                        </tr>
                    )
                )
            }
        </Table>
        {!noEmployees && (
            <TablePager 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )}
        </>
    )
}
