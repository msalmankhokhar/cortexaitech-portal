import { Check, Edit, X } from 'lucide-react'

interface EditableInfoBoxProps {
    children: React.ReactNode;
    title: string;
    handleModechange: () => void;
    saveHandler: () => void;
    editMode: boolean;
}

export default function EditableInfoBox({ children, title, handleModechange, editMode, saveHandler }: EditableInfoBoxProps) {

    return (
        <div className="rounded-lg border dark:border-secondary-700 dark:text-white">
            <div className="p-5 flex items-center justify-between border-b dark:border-secondary-700">
                <h1 className="font-semibold">{title}</h1>
                <div className='flex items-center gap-4'>
                    {
                        editMode ? (
                            <>
                                <button onClick={() => saveHandler()}>
                                    <Check className="text-secondary-700 dark:text-secondary-400" size={24} strokeWidth={1.5} />
                                </button>
                                <button onClick={() => handleModechange()}>
                                    <X className="text-secondary-700 dark:text-secondary-400" size={24} strokeWidth={1.5} />
                                </button>
                            </>
                        ) : (
                            <button onClick={() => handleModechange()}>
                                <Edit className="text-secondary-700 dark:text-secondary-400" size={24} strokeWidth={1.5} />
                            </button>
                        )
                    }
                </div>
            </div>
            {children}
        </div>
    )
}
