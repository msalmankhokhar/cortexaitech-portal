'use client';
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/Context/ThemeContext';

interface ThemeButtonProps {
    absolute?: boolean,
    position?: string,
    size?: number
}

export default function ThemeButton({ absolute = false, position= 'top-10 right-10', size=24 }: ThemeButtonProps) {

    const { theme, setTheme } = useTheme();

    const toggleTheme = ()=>{
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-mode");
        if (currentTheme === "dark") {
            html.setAttribute("data-mode", "light")
            setTheme("light")
            localStorage.setItem('theme', 'light');
        }else{
            html.setAttribute("data-mode", "dark");
            setTheme("dark");
            localStorage.setItem('theme', 'dark');
        }
    }

    return (
        <button type='button' className={`flex ${absolute && 'absolute z-1'} ${position}`} id='themeBtn' onClick={toggleTheme}>
            {
                theme === 'light' ? <Moon size={size} /> : <Sun size={size} color='white' />
            }
        </button>
    )
}
