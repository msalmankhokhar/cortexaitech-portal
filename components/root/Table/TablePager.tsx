import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface TablePagerProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function TablePager({ currentPage, totalPages, onPageChange }: TablePagerProps) {
    // const showEllipsis = totalPages > 5;
    
    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, 'ellipsis', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
    };

    return (
        <div className='flex w-full justify-between items-center gap-5'>
            <div className="flex gap-3">
                <button 
                    className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800 disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={18} className="dark:text-white" />
                </button>
                <div className="flex gap-3">
                    {getPageNumbers().map((page, index) => (
                        page === 'ellipsis' ? (
                            <div key={`ellipsis-${index}`} className="font-bold">
                                <span className="dark:text-white text-sm">...</span>
                            </div>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800 ${
                                    currentPage === page ? 'border-primary-400 dark:border-primary-400' : ''
                                }`}
                            >
                                <span className="dark:text-white text-sm">{page}</span>
                            </button>
                        )
                    ))}
                </div>
                <button 
                    className="px-3 py-1.5 border rounded-lg dark:border-secondary-700 bg-white dark:bg-slate-800 disabled:opacity-50"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={18} className="dark:text-white" />
                </button>
            </div>
            <p className="text-xs text-secondary-600 dark:text-secondary-300">Page {currentPage} of {totalPages}</p>
        </div>
    )
}
