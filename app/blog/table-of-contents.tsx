import type { TocItem } from "app/blog/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose mb-10 rounded-lg border border-neutral-200 bg-neutral-50/80 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/40"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
        On this page
      </p>
      <ul className="space-y-1.5 text-sm">
        {items.map((item, index) => (
          <li
            key={`${item.slug}-${index}`}
            className="leading-snug"
            style={{ paddingLeft: `${Math.max(0, item.depth - 2) * 0.75}rem` }}
          >
            <a
              href={`#${item.slug}`}
              className="text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white link-underline font-medium"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
