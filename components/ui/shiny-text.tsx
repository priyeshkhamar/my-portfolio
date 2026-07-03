import { cn } from "@/lib/utils";

/** ShinyText (React Bits "Shiny Text") — a light sweep travels across the text. */
export function ShinyText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <span className={cn("shiny-text", className)}>{text}</span>;
}
