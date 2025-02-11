import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface AvatarProps {
    size?: number;
    src?: string;
    editable?: boolean;
    onUploadSuccess?: (newImageUrl: string) => void;
    userId?: string;
}

const defaultProps: AvatarProps = {
    size: 120,
    src: '/img/root/avatars/man.jpg',
}

export default function Avatar({
    size = defaultProps.size!,
    src = '/img/root/avatars/man.jpg',
    editable = false,
    onUploadSuccess,
    userId
}: AvatarProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const timestampRef = useRef(Date.now());
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        if (editable) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return; 

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`/api/upload-avatar/${userId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            
            // Update timestamp ref instead of state
            timestampRef.current = Date.now();
            router.refresh();
            onUploadSuccess?.(data.url);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Only add timestamp to src URL on client-side
    const imageSrc = mounted ? `${src}?t=${timestampRef.current}` : src;

    return (
        <>
            <div
                className={`flex items-center justify-center rounded-full overflow-hidden relative ${editable ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={handleClick}
                style={{ width: size, height: size }}
            >
                <Image
                    priority
                    alt='avatar'
                    src={imageSrc}
                    fill
                    style={{objectFit: 'cover', objectPosition: 'center'}}
                    className={`${isLoading ? 'opacity-50' : ''}`}
                />
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </>
    )
}
