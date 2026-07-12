import type { ComponentType } from "react";
import {
  SiReact,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiLaravel,
  SiApple,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiGithub,
  SiGit,
  SiPostman,
  SiNpm,
  SiNextdotjs,
  SiTailwindcss,
  SiAngular,
  SiDotnet,
  SiThreedotjs,
  SiFramer,
} from "react-icons/si";
import { Webhook, Database, FileCode2, Sparkles } from "lucide-react";

type IconType = ComponentType<{ className?: string }>;

/**
 * Fuzzy tech-name → logo lookup. Matched by substring on the lowercased
 * label so "React.js", "React 19" and "REST API Integration" all resolve
 * sensibly. Returns null for concept/practice labels that have no logo —
 * callers render those chips without an icon.
 */
const MATCHERS: [string, IconType][] = [
  ["react", SiReact],
  ["redux", SiRedux],
  ["next", SiNextdotjs],
  ["node", SiNodedotjs],
  ["express", SiExpress],
  ["mongodb", SiMongodb],
  ["mysql", SiMysql],
  ["laravel", SiLaravel],
  ["ios", SiApple],
  ["typescript", SiTypescript],
  ["javascript", SiJavascript],
  ["html", SiHtml5],
  ["css3", SiCss],
  ["tailwind", SiTailwindcss],
  ["angular", SiAngular],
  [".net", SiDotnet],
  ["three", SiThreedotjs],
  ["motion", SiFramer],
  ["github", SiGithub],
  ["git", SiGit],
  ["postman", SiPostman],
  ["npm", SiNpm],
  ["ai-assisted", Sparkles],
  ["rest", Webhook],
  ["api contract", Webhook],
  ["endpoint", Webhook],
  ["sql", Database],
  ["canvas", FileCode2],
];

export function getTechIcon(name: string): IconType | null {
  const n = name.toLowerCase();
  for (const [key, Icon] of MATCHERS) {
    if (n.includes(key)) return Icon;
  }
  return null;
}

/** Chip-sized icon + label. Renders just the label when no logo matches. */
export function TechLabel({
  name,
  iconClassName = "h-3.5 w-3.5 shrink-0 opacity-80",
}: {
  name: string;
  iconClassName?: string;
}) {
  const Icon = getTechIcon(name);
  return (
    <span className="inline-flex items-center gap-1.5">
      {Icon && <Icon className={iconClassName} />}
      {name}
    </span>
  );
}
