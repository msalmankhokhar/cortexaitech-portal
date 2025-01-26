import React from 'react'
import Image from 'next/image'

interface LogoProps {
    className?: string;
    center?: boolean;
}

export default function Logo({className, center}: LogoProps) {
    return (
        <div className={`flex items-center gap-[8px] ${className} ${center ? 'justify-center' : ''}`}>
            <Image
                alt='Cortex AI Tech icon'
                src={'/logos/icon-only-logo.svg'}
                width={35}
                height={35}
            />
            <Image
                alt='Cortex AI Tech logo text'
                src={'/logos/text-only-logo-full-black.png'}
                width={135}
                height={30}
                className='mt-1.5'
            />
        </div>
    )
}
