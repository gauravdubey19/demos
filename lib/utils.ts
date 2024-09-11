import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replaceHyphensWithSpaces = (text: string): string => {
  return text.replace(/-/g, " ");
};

export const generateSlug = (name: string): string => {
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
  return slug;
};

export const reverseSlug = (slug: string): string => {
  const name = slug
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return name;
};

export const calculateDiscount = (price: number, oldPrice: number): number => {
  // if (oldPrice <= 0) {
  //   throw new Error("Old price must be greater than zero.");
  // }
  // if (price > oldPrice) {
  //   throw new Error("Current price cannot be greater than the old price.");
  // }
  const discountPercentage = ((oldPrice - price) / oldPrice) * 100;

  return parseFloat(discountPercentage.toFixed(0));
};
