import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function shuffleVariants<T extends { productId: string }>(variants: T[]): T[] {
  // Group by productId
  const groups = new Map<string, T[]>();
  for (const variant of variants) {
    if (!groups.has(variant.productId)) groups.set(variant.productId, []);
    groups.get(variant.productId)!.push(variant);
  }

  // Convert to array of [productId, variants[]]
  const grouped = Array.from(groups.values());

  // Shuffle the group order
  const shuffledGroups = grouped.sort(() => Math.random() - 0.5);

  const result: T[] = [];
  // Distribute items round-robin style
  let added = true;
  while (added) {
    added = false;
    for (const group of shuffledGroups) {
      if (group.length > 0) {
        result.push(group.shift()!);
        added = true;
      }
    }
  }

  return result;
}