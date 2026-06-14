import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  if (dateStr === "Present") return "Present";
  const [month, year] = dateStr.split(" ");
  return `${month} ${year}`;
}
