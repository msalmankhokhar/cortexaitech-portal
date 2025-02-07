'use client';
import React from 'react'
import Image from 'next/image'
import { useTheme } from '@/Context/ThemeContext';

interface logoSizeType {
    icon?: number;
    text?: number;
};

interface LogoProps {
    className?: string;
    center?: boolean;
    size?: logoSizeType;
    sizeMultiplier?: number;
}

export const LogoIcon = ({size=35}: {size?: number}) => {
    return (
        <Image
            alt='Cortex AI Tech icon'
            src={'/logos/icon-only-logo.svg'}
            width={size}
            height={size}
        />
    )
}

const defaultSize = {
    icon: 35,
    text: 135
}

export default function Logo({className, center, sizeMultiplier=1, size=defaultSize}: LogoProps) {
    const { theme } = useTheme();
    return (
        <div className={`flex items-center gap-[8px] ${className} ${center ? 'justify-center' : ''}`}>
            <Image
                alt='Cortex AI Tech icon'
                src={'/logos/icon-only-logo.svg'}
                width={size.icon ? (size.icon * sizeMultiplier) : (defaultSize.icon * sizeMultiplier)}
                height={size.icon ? (size.icon * sizeMultiplier) : (defaultSize.icon * sizeMultiplier)}
            />
            <Image
                alt='Cortex AI Tech logo text'
                src={`/logos/text-only-logo-full-${theme === 'light' ? 'black' : 'white'}.png`}
                width={size.text ? (size.text * sizeMultiplier) : (defaultSize.text * sizeMultiplier)}
                height={35}
                className='mt-1.5 h-auto'
            />
        </div>
    )
}
