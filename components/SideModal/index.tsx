'use client';

import React from 'react'
import { useSideBarModal } from "@/Context/SideModalContext";
import { AnimatePresence, motion } from 'framer-motion';

export default function SideModal({children}: {children: React.ReactNode}) {

    const {sideBarModalOpen} = useSideBarModal();

    return (
        <AnimatePresence>
            {sideBarModalOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        // add class bg-black/20 to make the background darker
                        className="h-screen w-screen fixed top-0 right-0 z-[110]"
                    />
                    <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.2 }}
                        className="z-[120] shadow-lg shadow-secondary-300 overflow-y-auto dark:shadow-transparent min-w-[600px] max-w-lg h-full fixed top-0 bottom-0 right-0"
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
