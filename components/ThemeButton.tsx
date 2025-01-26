'use client';
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/Context/ThemeContext';

export default function ThemeButton({ absolute = false, position= 'top-10 right-10' }: {absolute?: boolean, position?: string}) {

    const { theme, setTheme } = useTheme();

    const toggleTheme = ()=>{
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-mode");
        if (currentTheme === "dark") {
            html.setAttribute("data-mode", "light")
            setTheme("light")
        }else{
            html.setAttribute("data-mode", "dark")
            setTheme("dark")
        }
    }

    return (
        <button type='button' className={`flex ${absolute && 'absolute z-1'} ${position}`} id='themeBtn' onClick={toggleTheme}>
            {
                theme === 'light' ? <Moon size={24} /> : <Sun size={24} color='white' />
            }
        </button>
    )
}
