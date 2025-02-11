import Avatar from '@/components/Avatar'
import { getAvatarUrl } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import EmployeeStatus from '../../EmployeeStatus';
import { employeeStatusType } from '@/Constants/enum';

interface employeeType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string | null | undefined;
    jobTitle: string;
    status: string;
    department: string;
    office: string;
}

interface EmployeeTableRowProps {
    employee?: employeeType;
}

const defaultEmployee: employeeType = {
    _id: '_id',
    firstName: 'Hammad',
    lastName: 'Ali',
    email: 'Hammad@cortextaitech.pk',
    jobTitle: 'Software Engineer',
    status: 'Active',
    department: 'Engineering',
    office: 'Lahore',
    avatar: null
}

export default function EmployeeTableRow({employee= defaultEmployee}: EmployeeTableRowProps) {

    const {firstName, lastName, email, jobTitle, status, department, office} = employee
    // console.log(employee);

    return (
        <tr className="px-5 [&>td:first-child]:pl-5 [&>td:last-child]:pr-5 text-sm">
            <td className="py-3 text-secondary-800 text-left flex gap-3 align-middle">
                <input type="checkbox" />
                <Link href={`/employee-profile/${employee._id}`} className="flex items-center gap-2">
                    {
                        <Avatar size={30} src={employee?.avatar ? employee.avatar : getAvatarUrl(`${employee?.firstName} ${employee?.lastName}`)} />
                    }
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold dark:text-white">{`${firstName} ${lastName}`}</p>
                        <p className="text-xs text-secondary-500">{email}</p>
                    </div>
                </Link>
            </td>
            <td className="py-3 text-secondary-800 text-left text-sm font-semibold align-middle">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold dark:text-white">{jobTitle}</p>
                </div>
            </td>
            <td className="py-3 text-secondary-800 text-left text-sm font-semibold align-middle">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold dark:text-white">{department}</p>
                </div>
            </td>
            <td className="py-3 text-secondary-800 text-left text-sm font-semibold align-middle">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold dark:text-white">{office}</p>
                </div>
            </td>
            <td className="py-3 text-secondary-800 text-left text-sm font-semibold align-middle">
                <EmployeeStatus value={status as employeeStatusType} />
            </td>
        </tr>
    )
}
