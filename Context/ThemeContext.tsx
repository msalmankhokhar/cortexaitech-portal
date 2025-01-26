'use client';
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const defaultTheme = 'dark';

export const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
    setTheme: () => {}
});

export default function ThemeProvider({ children }: {children: React.ReactNode}) {
    
    const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);

    useEffect(() => {
        const localStorageTheme = localStorage.getItem('theme');
        if (localStorageTheme) {
            setTheme(localStorageTheme as 'light' | 'dark');
        } else {
            const html = document.documentElement;
            html.setAttribute("data-mode", defaultTheme);
        }
    }, []);

    const contextValue = { theme, setTheme };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);