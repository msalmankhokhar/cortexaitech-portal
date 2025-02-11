import { Check, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

interface FilterDropDownProps {
    defaultValue: string;
    options: string[];
}

export default function FilterDropDown({ defaultValue, options }: FilterDropDownProps) {

    const [open, setOpen] = useState(false);

    return (
        <div className="py-2.5 px-3 relative dark:text-white w-full max-w-[300px] text-sm border dark:border-slate-700 rounded-lg">
            <button onBlur={() => setOpen(false)} onClick={() => setOpen(!open)} className="flex w-full text-left items-center gap-3 justify-between">
                <span className="flex-1">{defaultValue}</span>
                <ChevronDown size={18} className="text-secondary-600 dark:text-secondary-300 tx-sm" />
            </button>
            {
                open && (
                    <div className="flex min-w-[200px] max-h-[250px] overflow-y-auto gap-2 flex-col bg-white dark:bg-slate-900 p-2 rounded-lg absolute right-0 left-0 border dark:border-slate-700 top-[50px]">
                        <button className="flex w-full text-left py-3 px-3 rounded-lg hover:bg-secondary-100 hover:dark:bg-slate-800 filterOptionSelected items-center gap-3 justify-between">
                            <span className="flex-1">{defaultValue}</span>
                            {/* If selected, showing this check icon */}
                            <Check size={18} className="text-green-600 dark:text-green-500" strokeWidth={2} />
                        </button>
                        {
                            options.map(option => {
                                return (
                                    <button key={option} className="flex w-full text-left py-3 px-3 rounded-lg hover:bg-secondary-100 hover:dark:bg-slate-800 items-center gap-3 justify-between">
                                        <span className="flex-1">{option}</span>
                                    </button>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
