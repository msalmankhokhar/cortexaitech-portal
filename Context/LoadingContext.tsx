'use client';
import { createContext, useContext, useState } from "react";

interface pageLoadingContextType {
    pageLoading: boolean;
    setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultValue = false;

export const pageLoadingContext = createContext<pageLoadingContextType>({
    pageLoading: defaultValue,
    setPageLoading: () => {}
});

export default function PageLoadingProvider({ children }: {children: React.ReactNode}) {
    
    const [pageLoading, setPageLoading] = useState<boolean>(defaultValue);
    const contextValue = { pageLoading, setPageLoading };

    return (
        <pageLoadingContext.Provider value={contextValue}>
            {children}
        </pageLoadingContext.Provider>
    )
}

export const usePageLoading = ()=> useContext(pageLoadingContext);