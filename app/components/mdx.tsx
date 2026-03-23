import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { ArrowIcon } from "./arrow-icon";
import remarkGfm from "remark-gfm";
import { slugify } from "app/lib/slugify";

function extractPlainText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractPlainText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props.children != null) return extractPlainText(props.children);
  }
  return "";
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-400 border-b border-neutral-800"
    >
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index} className="border-b border-neutral-900 last:border-0">
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="px-3 py-2 text-sm text-neutral-200 align-top"
        >
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <table className="my-8 w-full border-collapse rounded-lg bg-black-custom/20 ring-1 ring-neutral-900">
      <thead className="bg-neutral-900/60">{/* headers */}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  const linkContent = (
    <span className="inline font-semibold link-underline text-black-custom dark:text-white-custom hover:text-neutral-800 dark:hover:text-white-custom hover:cursor-pointer transition-colors">
      {props.children}
      <ArrowIcon size={10} className="inline ml-0.5 align-baseline" />
    </span>
  );

  if (href.includes("#")) {
    return <a href={href}>{linkContent}</a>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {linkContent}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {linkContent}
    </a>
  );
}

function RoundedImage(props) {
  return (
    <Image
      alt={props.alt}
      className="rounded-lg border border-neutral-800"
      {...props}
    />
  );
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  const className = [
    "rounded-md bg-neutral-900/80 px-1.5 py-0.5 text-[0.82rem] leading-relaxed text-neutral-100 border border-neutral-800",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className: _ignored, ...rest } = props;

  return (
    <code
      className={className}
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...rest}
    />
  );
}

const headingStyles = {
  1: "text-4xl md:text-5xl font-semibold tracking-tight mt-10 mb-6",
  2: "text-3xl md:text-4xl font-semibold tracking-tight mt-8 mb-5",
  3: "text-2xl md:text-3xl font-semibold tracking-tight mt-6 mb-4",
  4: "text-lg md:text-xl font-semibold tracking-tight mt-5 mb-3",
  5: "text-base md:text-lg font-semibold tracking-tight mt-4 mb-2.5",
  6: "text-[0.98rem] md:text-base font-semibold tracking-tight mt-4 mb-2",
};

function createHeading(level, takeSlug?: () => string | undefined) {
  const Heading = ({ children }) => {
    const preset = takeSlug?.();
    const slug =
      preset != null && preset !== ""
        ? preset
        : slugify(extractPlainText(children));
    const headingClass =
      headingStyles[level] ||
      "text-[0.98rem] md:text-base font-semibold tracking-tight mt-4 mb-2";
    return React.createElement(
      `h${level}`,
      { id: slug, className: headingClass },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function UnorderedList({ children }) {
  return <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>;
}

function ListItem({ children }) {
  return <li className="leading-relaxed">{children}</li>;
}

function Paragraph({ children }) {
  return <p className="my-3 text-[0.98rem] leading-relaxed">{children}</p>;
}

function Strikethrough({ children }) {
  return <del className="line-through">{children}</del>;
}

const baseComponents = {
  p: Paragraph,
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  ul: UnorderedList,
  li: ListItem,
  del: Strikethrough,
};

function buildHeadingComponents(takeSlug?: () => string | undefined) {
  return {
    h1: createHeading(1, takeSlug),
    h2: createHeading(2, takeSlug),
    h3: createHeading(3, takeSlug),
    h4: createHeading(4, takeSlug),
    h5: createHeading(5, takeSlug),
    h6: createHeading(6, takeSlug),
  };
}

const defaultHeadingComponents = buildHeadingComponents();

export type CustomMDXProps = MDXRemoteProps & { headingSlugs?: string[] };

export function CustomMDX(props: CustomMDXProps) {
  const { headingSlugs, options, components: extraComponents, ...rest } =
    props;
  let slugIndex = 0;
  const takeSlug = headingSlugs
    ? () => headingSlugs[slugIndex++]
    : undefined;

  const headingComponents = takeSlug
    ? buildHeadingComponents(takeSlug)
    : defaultHeadingComponents;

  return (
    <MDXRemote
      {...rest}
      options={{
        ...(options || {}),
        mdxOptions: {
          ...(options?.mdxOptions || {}),
          remarkPlugins: [
            ...(options?.mdxOptions?.remarkPlugins || []),
            remarkGfm,
          ],
        },
      }}
      components={{
        ...headingComponents,
        ...baseComponents,
        ...(extraComponents || {}),
      }}
    />
  );
}
