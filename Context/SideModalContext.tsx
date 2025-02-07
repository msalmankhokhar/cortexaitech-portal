'use client';
import { createContext, useContext, useState } from "react";

interface sideBarModalContextType {
    sideBarModalOpen: boolean;
    setSideBarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultValue = false;

export const SideBarModalContext = createContext<sideBarModalContextType>({
    sideBarModalOpen: defaultValue,
    setSideBarModalOpen: () => {}
});

export default function SideBarModalProvider({ children }: {children: React.ReactNode}) {
    
    const [sideBarModalOpen, setSideBarModalOpen] = useState<boolean>(defaultValue);
    const contextValue = { sideBarModalOpen, setSideBarModalOpen };

    return (
        <SideBarModalContext.Provider value={contextValue}>
            {children}
        </SideBarModalContext.Provider>
    )
}

export const useSideBarModal = ()=> useContext(SideBarModalContext);