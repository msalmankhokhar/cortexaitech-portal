import { NextResponse } from "next/server";

export function handleAPIError(error: unknown, message: string) {
    console.error(error);
    const json = { 
        success: false, 
        error: (error instanceof Error) ? error.message : String(error),
        message,
    };
    return NextResponse.json(json, { status: 500 })
}