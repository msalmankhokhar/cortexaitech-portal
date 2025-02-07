import React from 'react'

interface TableProps {
    headItems: string[];
    children?: React.ReactNode;
}

export function Table({ headItems, children }: TableProps) {
    return (
        <table>
            <thead className="bg-secondary-100 dark:bg-slate-900 rounded-lg text-sm">
                <tr className="px-5 [&>th:first-child]:pl-5 [&>th:last-child]:pr-5 [&>th:first-child]:rounded-l-lg [&>th:last-child]:rounded-r-lg">
                    {
                        headItems.map((item, index) => (
                            index > 0 ? (
                                <th key={index} className="py-3 text-secondary-800 dark:text-white text-left">{item}</th>
                            ) : (
                                <th key={index} className="py-3 text-secondary-800 dark:text-white text-left">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" />
                                        <span>{item}</span>
                                    </div>
                                </th>
                            )
                        ))
                    }
                </tr>
            </thead>

            {/* [&>tr>td:first-child]:pt-5 [&>tr>td:last-child]:pb-5 */}

            <tbody>
                {children}
            </tbody>
        </table>
    )
}
