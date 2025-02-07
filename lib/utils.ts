import { NextResponse } from "next/server";

export function handleAPIError(error: unknown, message: string) {
  console.error(error);
  const json = {
    success: false,
    error: error instanceof Error ? error.message : String(error),
    message,
  };
  return NextResponse.json(json, { status: 500 });
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export function splitName(fullName: string): {
  firstName: string;
  lastName: string | null;
} {
  const [firstName, ...lastNameParts] = fullName.trim().split(" ");
  const lastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : null;
  return { firstName, lastName };
}

export function getAvatarUrl(name: string): string {
  const { firstName, lastName } = splitName(name);
  return `https://ui-avatars.com/api/?background=random&name=${firstName}${
    lastName && `+${lastName}`
  }&size=200`;
}

export function generateStrongPassword(): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const password = Array.from(crypto.getRandomValues(new Uint8Array(10)))
    .map((byte) => chars[byte % chars.length])
    .join("");
  return password;
}

export function getJobTitle(role: {
  primary: string;
  secondary?: string;
}): string {
  return role.secondary ? `${role.primary} - ${role.secondary}` : role.primary;
}

export function getLocalTime(date: Date, timezone: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return `Invalid Timezone String ${timezone}`;
  }
}

export function getTimeDuration(checkIn: string, checkOut: string): string {
  const checkInTime = new Date(checkIn);
  const checkOutTime = new Date(checkOut);
  
  // Get difference in milliseconds
  const diffInMs = checkOutTime.getTime() - checkInTime.getTime();
  
  // Convert to hours and minutes
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}