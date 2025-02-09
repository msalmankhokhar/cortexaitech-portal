import { ChevronDown } from 'lucide-react';
import React from 'react'

interface FormDropDownProps {
    options: string[];
    defaultValue?: string;
    name: string;
    onSelect?: (value: string) => void;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
    value?: string;
    label?: string;
}

export default function FormDropDown({ options, label, defaultValue, onSelect, name, required = false, className, value, onChange }: FormDropDownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string>(defaultValue || options[0]);

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        onChange?.(option);
        onSelect?.(option);
    };
    const inputId = `${name}-input`;

    return (
        <div className={`flex flex-col gap-2`}>
            {
                label && <label htmlFor={inputId} className="text-xs text-secondary-700 dark:text-secondary-400">{label}</label>
            }
            <div className={`border relative bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-1 ring-primary-400 dark:border-slate-700 ${className}`}>
                <input
                    type="hidden"
                    name={name}
                    value={value ? value : (selected != defaultValue ? selected : '')}
                    required={required}
                />
                <button
                    type="button"
                    className="dark:text-white text-sm px-4 py-2 w-full text-left flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                    id={inputId}
                >
                    <span>{selected}</span>
                    <span>
                        <ChevronDown size={18} />
                    </span>
                </button>

                {isOpen && (
                    <ul className="z-[130] max-h-[200px] overflow-y-auto absolute bg-white dark:bg-secondary-1000 -left-1 -right-1 mx-auto mt-1 rounded-lg shadow-lg">
                        {options.map((option) => (
                            <li
                                key={option}
                                className="px-4 py-2 text-sm dark:text-white hover:bg-gray-100 dark:hover:bg-secondary-900 cursor-pointer"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
};