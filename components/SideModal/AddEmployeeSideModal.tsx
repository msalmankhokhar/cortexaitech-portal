'use client';
import React, { useState } from 'react'
import FormDropDown from '../form/FormDropDown'
import Button from '../Button';
import SideModal from '.';
import { useSideBarModal } from '@/Context/SideModalContext';
import { usePageLoading } from '@/Context/LoadingContext';
import { addEmployee } from '@/lib/actions/user.actions';
import { generateStrongPassword } from '@/lib/utils';
import Input from '../form/Input';
import countryNames from '@/Constants/countries';
import timezones from '@/Constants/timezones';
import { departmentsArray, getRolesByDepartment, offices } from '@/Constants/enum';
import { useSession } from 'next-auth/react';

export default function AddEmployeeSideModal() {

    const { setPageLoading } = usePageLoading();
    const { data: session } = useSession();

    const defaultErrorMsg = 'Default Error';
    const [error, setError] = useState('');
    const defaultDepartmentDropdownValue = 'Select Department';
    const [departmentDropdownValue, setDepartmentDropdownValue] = useState(defaultDepartmentDropdownValue);

    const { setSideBarModalOpen } = useSideBarModal();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPageLoading(true);
        const formDataObject = new FormData(event.currentTarget as HTMLFormElement);
        const formData = Object.fromEntries(formDataObject.entries());
        // console.log(formData);
        // validating formDropDowns
        if (formData.primaryRole === '' && formData.secondaryRole === '') {
            setError('Please select a role');
            setPageLoading(false);
            return;
        }

        setError('');

        // Do something with the data
        const password = generateStrongPassword();
        const data : signupFormData = {
            firstName: formData.firstName as string,
            lastName: formData.lastName as string,
            email: formData.email as string,
            phone: formData.phone as string,
            password,
            timezone: formData.timezone as string,
            gender: formData.gender as string,
            office: formData.office as string,
            department: {
                title: formData.department as string,
            },
            role: {
                title: formData.role as string,
            },
            address: {
                primary: formData.address_primary as string,
                country: formData.address_country as string,
                state: formData.address_state as string,
                city: formData.address_city as string,
            },
            adminAccess: false,
        }
        console.log(data);
        const response = await addEmployee(data, session?.user?.email as string);
        if(response.success){
            setSideBarModalOpen(false);
            location.reload();
        } else {
            setError(response.message);
        }
        setPageLoading(false);
    }

    return (
        <SideModal>
            <form onSubmit={handleSubmit} className="bg-secondary-100 min-h-full dark:bg-slate-900 border-l dark:border-secondary-900 px-6 py-7">
                <h1 className="font-bold text-xl dark:text-white text-center"> Register New Employee</h1>
                <div className="flex flex-col gap-4 text-sm">
                    <p className={`${error === defaultErrorMsg && ''} text-red-500 font-semibold text-sm`}>{error}</p>  {/* Error message */}

                    <h2 className="text-secondary-800 dark:text-secondary-300 font-semibold text-base">Basic</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        <Input type="text" name="firstName" placeholder="First Name" required />
                        <Input type="text" name="lastName" placeholder="Last Name" required />
                        <Input type="email" name="email" placeholder="Email" required />
                        <Input type="tel" name="phone" placeholder="Mobile Number" />
                        <FormDropDown
                            options={['Male', 'Female']}
                            defaultValue="Select Gender"
                            name='gender'
                            required
                        />
                        <FormDropDown
                            options={timezones}
                            defaultValue="Select Timezone"
                            name='timezone'
                            required
                        />
                        <FormDropDown
                            options={offices}
                            defaultValue="Select Office"
                            name='office'
                        />
                    </div>

                    <h2 className="text-secondary-800 dark:text-secondary-300 font-semibold text-base">Role</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        <FormDropDown
                            options={departmentsArray}
                            defaultValue="Select Department"
                            name='department'
                            required
                            value={departmentDropdownValue}
                            onChange={ (value) => setDepartmentDropdownValue(value) }
                        />
                        {
                            departmentDropdownValue !== defaultDepartmentDropdownValue && (
                                <FormDropDown
                                    options={getRolesByDepartment(departmentDropdownValue)}
                                    defaultValue="Select Role"
                                    name='role'
                                    required
                                />
                            )
                        }
                    </div>

                    <h2 className="text-secondary-800 dark:text-secondary-300 font-semibold text-base">Address</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        <Input type="text" name="address_primary" divClassName='col-span-2' placeholder="Current Address" required />
                        <FormDropDown
                            options={countryNames}
                            defaultValue="Select Country"
                            name='address_country'
                            required
                        />
                        <Input type="text" name="address_state" placeholder="State / Province" required />
                        <Input type="text" name="address_city" placeholder="City" required />
                    </div>

                </div>
                <div className="mt-5 flex items-center gap-2">
                    <Button variant="btn-hollow" onClick={() => setSideBarModalOpen(false)}>Cancel</Button>
                    <Button type='submit' className="flex-1">Create</Button>
                </div>
            </form>
        </SideModal>
    )
}
