import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseURL = () => {
    return "http://localhost:3000"
}


import { randomBytes } from 'crypto';

export function generateSecureToken() {
  return randomBytes(20).toString('hex'); 
}


