import { employeeStatusType } from '@/Constants/enum';
import React from 'react'

interface EmployeeStatusProps {
    value: employeeStatusType;
}

export default function EmployeeStatus({value}: EmployeeStatusProps) {
    return (
        <span
            className={`${
                value === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            } rounded-md text-xs font-bold px-4 py-1.5`}>
            {value}
        </span>
    )
}
