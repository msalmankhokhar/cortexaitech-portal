import React from 'react'

interface ButtonProps {
    children?: React.ReactNode;
    variant?: 'btn-primary' | 'btn-primary-white' | 'btn-primary-white-text-secondary' | 'btn-hollow' | 'btn-hollow-colored';
    icon?: React.ReactNode;
    widthFull?: boolean;
    type?: 'submit' | 'button';
}

export default function Button({variant='btn-primary', icon, children, widthFull=false, type='button'}: ButtonProps) {
    return (
        <>
            <button type={type} className={`btn ${variant} ${icon && 'btn-icon'} ${widthFull && 'w-full'}`}>
                {icon && icon}
                <span>{children}</span>
            </button>
        </>
    )
}
