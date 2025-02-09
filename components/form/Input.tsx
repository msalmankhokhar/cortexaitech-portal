import React, { useState } from "react";

interface inputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';
  name: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  label?: string;
  className?: string;
  divClassName?: string;
}

export default function Input({ type, name, placeholder, required = false, className, divClassName, value, label }: inputProps) {

  const [valueState, setValueState] = useState<string | undefined>(value);
  const inputId = `${name}-input`;
  return (
    <>
      <div className={`flex flex-col gap-2 ${divClassName}`}>
        {
          label && <label htmlFor={inputId} className="text-xs text-secondary-700 dark:text-secondary-400">{label}</label>
        }
        <input
          required={required}
          className={`w-full bg-white dark:bg-slate-800 dark:text-white rounded-lg outline-none text-sm focus:ring-1 ring-primary px-4 py-2 border dark:border-slate-700 ${className}`}
          placeholder={`${placeholder} ${required ? '*' : ''}`}
          type={type}
          name={name}
          value={valueState}
          id={inputId}
          onChange={(event) => setValueState(event.target.value)}
        />
      </div>
    </>
  )
}
