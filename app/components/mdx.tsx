import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { ArrowIcon } from "./arrow-icon";
import remarkGfm from "remark-gfm";

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

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

const headingStyles = {
  1: "text-4xl md:text-5xl font-semibold tracking-tight mt-10 mb-6",
  2: "text-3xl md:text-4xl font-semibold tracking-tight mt-8 mb-5",
  3: "text-2xl md:text-3xl font-semibold tracking-tight mt-6 mb-4",
  4: "text-lg md:text-xl font-semibold tracking-tight mt-5 mb-3",
  5: "text-base md:text-lg font-semibold tracking-tight mt-4 mb-2.5",
  6: "text-[0.98rem] md:text-base font-semibold tracking-tight mt-4 mb-2",
};

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
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

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: Paragraph,
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  ul: UnorderedList,
  li: ListItem,
  del: Strikethrough,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...(props.options || {}),
        mdxOptions: {
          ...(props.options?.mdxOptions || {}),
          remarkPlugins: [
            ...(props.options?.mdxOptions?.remarkPlugins || []),
            remarkGfm,
          ],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
