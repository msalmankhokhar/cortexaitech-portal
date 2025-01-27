"use client";

interface FloatingInputProps {
    placeholder: string;
    name: string;
    type: 'text' | 'email' | 'password';
    required?: boolean;
}

export default function FloatingInput({ placeholder, name, type, required = false }: FloatingInputProps) {
    return (
        <div className="relative">
            <input
                required={required}
                className="dark:bg-inherit dark:text-white w-full peer border border-secondary-400 dark:border-secondary-700 rounded-md px-5 py-3 focus:outline-none focus:border-none focus:ring-2 focus:ring-primary-400"
                type={type}
                name={name}
                id={name}
                placeholder=""
            />
            <label
                htmlFor={name}
                className="mt-1 bg-white dark:bg-slate-900 px-1 absolute left-5 top-5 text-gray-500 dark:text-white transition-position duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary-400 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs"
            >
                {placeholder}
            </label>

        </div>
    );
}
