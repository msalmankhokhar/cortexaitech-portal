import React from "react";

interface inputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';
  name: string;
  placeholder: string;
  required?: boolean;
  label?: string;
  className?: string;
  divClassName?: string;
}

export default function Input({ type, name, placeholder, required = false, className, divClassName }: inputProps) {
  return (
    <>
      <div className={divClassName}>
        <input
          required={required}
          className={`w-full bg-white dark:bg-slate-800 dark:text-white rounded-lg outline-none focus:ring-1 ring-primary px-4 py-3 border dark:border-slate-700 ${className}`}
          placeholder={`${placeholder} ${required ? '*' : ''}`}
          type={type}
          name={name}
        />
      </div>
    </>
  )
}
