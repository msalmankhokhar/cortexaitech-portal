
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
                className="w-full peer border border-secondary-400 rounded-md px-5 py-2.5 focus:outline-none focus:border-none focus:ring-2 focus:ring-primary-400"
                type={type}
                name={name}
                id={name}
                placeholder=" "
            />
            <label
                htmlFor={name}
                className="mt-0.5 bg-white px-1 absolute left-5 top-5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary-400"
            >
                {placeholder}
            </label>
        </div>
    );
}
