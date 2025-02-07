'use client';
import { createContext, useContext, useState } from "react";

interface sideBarContextType {
    sideBarOpen: boolean;
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultValue = true;

export const SideBarContext = createContext<sideBarContextType>({
    sideBarOpen: defaultValue,
    setSideBarOpen: () => {}
});

export default function SideBarProvider({ children }: {children: React.ReactNode}) {
    
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(defaultValue);
    const contextValue = { sideBarOpen, setSideBarOpen };

    return (
        <SideBarContext.Provider value={contextValue}>
            {children}
        </SideBarContext.Provider>
    )
}

export const useSideBar = ()=> useContext(SideBarContext);