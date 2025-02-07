import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models';
import connectDb from '@/lib/db';
import path from 'path';
import fs from 'fs/promises';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp'
];

type RouteParams = {
    params: {
        id: string
    }
}

export async function POST(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const formData = await request.formData();
        const file = formData.get('avatar') as File;
        const { id } = params;
        
        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'File size too large. Maximum size is 5MB' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Allowed types are JPEG, PNG, and WebP' },
                { status: 400 }
            );
        }

        // Create avatars directory if it doesn't exist
        const publicDir = path.join(process.cwd(), 'public');
        const avatarsDir = path.join(publicDir, 'avatars');
        await fs.mkdir(avatarsDir, { recursive: true });

        // Get file extension
        const fileExt = file.type.split('/')[1];
        const fileName = `${id}.${fileExt}`;
        const filePath = path.join(avatarsDir, fileName);

        // Convert File to Buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        // Update user's avatar in database
        await connectDb();
        const avatarUrl = `/avatars/${fileName}`;
        await User.findByIdAndUpdate(id, { avatar: avatarUrl });

        return NextResponse.json({
            success: true,
            avatarUrl,
            message: 'Avatar uploaded successfully'
        });

    } catch (error) {
        console.error('Error uploading avatar:', error);
        return NextResponse.json(
            { error: 'Failed to upload avatar' },
            { status: 500 }
        );
    }
}
