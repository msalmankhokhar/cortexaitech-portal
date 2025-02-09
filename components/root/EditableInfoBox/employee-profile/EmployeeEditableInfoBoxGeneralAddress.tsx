import React, { useRef, useState } from 'react'
import EditableInfoBox from '..'
import EditableInfoBoxItem, { EditableInfoBoxDropDown } from '../EditableInfoBoxItem';
import countryNames from '@/Constants/countries';
import { updateEmployeeAddress } from '@/lib/actions/user.actions';
import { usePageLoading } from '@/Context/LoadingContext';
import { useRouter } from 'next/navigation';

interface EmployeeEditableInfoBoxProps {
    employee: EmployeeDocument;
}

export default function EmployeeEditableInfoBoxGeneralAddress({ employee }: EmployeeEditableInfoBoxProps) {

    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { setPageLoading } = usePageLoading();
    const router = useRouter();

    async function saveHandler() {
        // setEditMode(false);
        if (!formRef.current) return;
        setPageLoading(true);
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        const updateData = {
            primary: data.address_primary,
            country: data.address_country,
            state: data.address_state,
            city: data.address_city,
        };
        console.log(updateData);
        const response = await updateEmployeeAddress(employee._id, updateData);
        console.log(response);
        if (response.success) {
            console.log('Employee updated successfully');
            router.refresh();
            location.reload();
        } else {
            console.log('Error updating employee');
            setError(response.message);
        }
        setPageLoading(false);
    }

    return (
        <EditableInfoBox saveHandler={saveHandler} editMode={editMode} title='Personal Information' handleModechange={() => setEditMode(!editMode)}>

            <p className="flex items-center justify-center text-red-500 dark:text-red-400">
                {error ? error : ''}
            </p>

            <form ref={formRef} className="p-5 flex flex-col flex-wrap max-h-[300px] gap-5">

                <EditableInfoBoxItem placeholder='Complete address' name='address_primary' type='text' title='Address' value={employee?.address.primary} editMode={editMode} />
                <EditableInfoBoxDropDown name='address_country' title='Country' value={employee.address.country} editMode={editMode} options={countryNames} />
                <EditableInfoBoxItem type='text' name='address_state' placeholder='State / Province' title='State' value={employee?.address.state} editMode={editMode} />
                <EditableInfoBoxItem type='text' name='address_city' placeholder='City' title='City' value={employee?.address.city} editMode={editMode} />

            </form>
        </EditableInfoBox>
    )
}
