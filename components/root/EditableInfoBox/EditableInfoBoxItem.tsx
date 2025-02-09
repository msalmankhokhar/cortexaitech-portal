import FormDropDown from '@/components/form/FormDropDown';
import Input from '@/components/form/Input';
import React from 'react'

type inputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';

interface EditableInfoBoxItemProps {
    title: string;
    value: string;
    editMode: boolean;
    multipleInputs?: {name: string; value: string; title: string, placeholder: string; type: inputType;}[];
    name: string;
    placeholder: string;
    type: inputType;
}
interface EditableInfoBoxDropDownProps {
    title: string;
    name: string;
    value: string;
    editMode: boolean;
    options: string[];
    onSelect?: (value: string) => void;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
}

export default function EditableInfoBoxItem({name, type, multipleInputs, value, title, editMode=false}: EditableInfoBoxItemProps) {
    if (!editMode) {
        return (
            <div className="flex gap-5 items-center text-sm">
                <h3 className="text-secondary-700 dark:text-secondary-400">{title}</h3>
                <p className="font-medium">{value}</p>
            </div>
        )
    } else {
        if (multipleInputs && multipleInputs.length > 1) {
            return (
                <div className="flex gap-5 items-center text-sm">
                    {
                        multipleInputs.map((input, index) => (
                            <Input required key={index} value={input.value} label={input.title} name={input.name} placeholder={input.placeholder} type={input.type}></Input>
                        ))
                    }
                </div>
            )
            
        } else {
            return (
                <Input required value={value} label={title} name={name} placeholder='placeholder' type={type}></Input>
            )
        }
    }
}

export function EditableInfoBoxDropDown({name, value, options, title, editMode=false}: EditableInfoBoxDropDownProps) {
    if (!editMode) {
        return (
            <div className="flex gap-5 items-center text-sm">
                <h3 className="text-secondary-700 dark:text-secondary-400">{title}</h3>
                <p className="font-medium">{value}</p>
            </div>
        )
    } else {
        return (
            <FormDropDown required options={options} defaultValue={value} value={value} label={title} name={name}></FormDropDown>
        )
    }
}
