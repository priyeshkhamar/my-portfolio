type ClassValue = string | number | null | false | undefined;

/** Tiny classnames joiner — no dependency needed for this surface. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
