import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replaceHyphensWithSpaces = (text: string): string => {
  return text.replace(/-/g, " ");
};
