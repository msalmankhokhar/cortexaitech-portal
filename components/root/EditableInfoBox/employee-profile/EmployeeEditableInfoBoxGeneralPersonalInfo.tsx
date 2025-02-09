import React, { useRef, useState } from 'react'
import EditableInfoBox from '..'
import EditableInfoBoxItem, { EditableInfoBoxDropDown } from '../EditableInfoBoxItem';
import { genders } from '@/Constants/enum';
import countryNames from '@/Constants/countries';
import { usePageLoading } from '@/Context/LoadingContext';
import { updateEmployeePersonalInfo } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

interface EmployeeEditableInfoBoxProps {
    employee: EmployeeDocument;
}

export default function EmployeeEditableInfoBoxGeneralPersonalInfo({ employee }: EmployeeEditableInfoBoxProps) {

    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const {setPageLoading} = usePageLoading();
    const router = useRouter();

    async function saveHandler() {
        setPageLoading(true);
        // setEditMode(false);
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        const updateData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            nationality: data.nationality,
            gender: data.gender,
            phone: data.phone,
        };
        console.log(updateData);
        const response = await updateEmployeePersonalInfo(employee._id, data);
        console.log(response);
        if (response.success) {
            console.log('Employee updated successfully');
            setPageLoading(false);
            location.reload();
            router.refresh();
        } else {
            console.log('Error updating employee');
            setPageLoading(false);
            setError(response.message);
        }
    }

    return (
        <EditableInfoBox saveHandler={async()=> {await saveHandler()}} editMode={editMode} title='Personal Information' handleModechange={() => setEditMode(!editMode)}>

            <p className="flex items-center justify-center text-red-500 dark:text-red-400">
                {error ? error : ''}
            </p>

            <form ref={formRef} className="p-5 flex flex-col flex-wrap max-h-[700px] gap-5">

                {/* OLD CONTENT */}
                
                {/* <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Full Name</h3>
                    <p className="font-medium">{`${employee?.firstName} ${employee?.lastName}`}</p>
                </div>
                <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Nationality</h3>
                    <p className="font-medium">{employee?.address.country}</p>
                </div>
                <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Email Address</h3>
                    <p className="font-medium">{employee?.email}</p>
                </div>
                <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Gender</h3>
                    <p className="font-medium">{employee?.gender}</p>
                </div>
                <div className="flex gap-5 items-center text-sm">
                    <h3 className="text-secondary-700 dark:text-secondary-400">Phone</h3>
                    <p className="font-medium">{employee?.phone}</p>
                </div> */}

                <EditableInfoBoxItem name='fullName' type='text' placeholder='Full Name' title='Full Name' value={`${employee?.firstName} ${employee?.lastName}`} editMode={editMode}
                    multipleInputs={[
                        { name: 'firstName', title: 'First Name', value: employee?.firstName, placeholder: 'First Name', type: 'text' },
                        { name: 'lastName', title: 'Last Name', value: employee?.lastName, placeholder: 'Last Name', type: 'text' },
                    ]}
                />
                <EditableInfoBoxDropDown name='nationality' title='Nationality' value={employee?.address.country} editMode={editMode} options={countryNames} />
                <EditableInfoBoxItem type='email' name='email' placeholder='Email' title='Email Address' value={employee?.email} editMode={editMode} />
                <EditableInfoBoxDropDown name='gender' title='Gender' value={employee.gender} editMode={editMode} options={genders} />
                <EditableInfoBoxItem type='tel' placeholder='Mobile number' name='phone' title='Phone' value={employee.phone!} editMode={editMode} />

            </form>
        </EditableInfoBox>
    )
}
