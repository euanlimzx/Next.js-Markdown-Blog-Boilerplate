import { slugify } from "app/lib/slugify";

export type TocItem = {
  depth: number;
  text: string;
  slug: string;
};

function stripAtxClosingHashes(line: string) {
  return line.replace(/\s+#+\s*$/, "").trim();
}

function headingLineToPlainTitle(line: string) {
  let t = stripAtxClosingHashes(line.replace(/^#{1,6}\s+/, ""));
  t = t.replace(/\*\*([^*]+)\*\*/g, "$1");
  t = t.replace(/__([^_]+)__/g, "$1");
  t = t.replace(/\*([^*]+)\*/g, "$1");
  t = t.replace(/_([^_]+)_/g, "$1");
  t = t.replace(/`([^`]+)`/g, "$1");
  return t.trim();
}

function assignUniqueSlug(titleForSlug: string, used: Map<string, number>) {
  const base = slugify(titleForSlug) || "section";
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  if (n === 0) return base;
  return `${base}-${n}`;
}

/**
 * Extract headings from MD/MDX source for a table of contents.
 * Skips ATX-style headings inside fenced code blocks (```).
 */
export function getTocFromMdx(source: string): TocItem[] {
  const lines = source.split(/\r?\n/);
  const items: TocItem[] = [];
  let inFence = false;
  const usedSlugs = new Map<string, number>();

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (!match) continue;

    const depth = match[1].length;
    const rawTitle = match[2];
    const lineForTitle = `${match[1]} ${rawTitle}`;
    const text = headingLineToPlainTitle(lineForTitle);
    if (!text) continue;

    const slug = assignUniqueSlug(text, usedSlugs);
    items.push({ depth, text, slug });
  }

  return items;
}
