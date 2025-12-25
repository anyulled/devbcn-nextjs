/**
 * Simple Markdown renderer
 *
 * Converts Markdown text to React elements with proper styling.
 * Supports: headings, paragraphs, lists, bold, italic, links.
 */

import React from "react";

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Parse and render Markdown content as React elements
 */
export function Markdown({ content, className = "" }: MarkdownProps): React.ReactElement {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      elements.push(
        <p key={`p-${elements.length}`} className="mb-3">
          {parseInline(text)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      const ListTag = currentList.type;
      elements.push(
        <ListTag key={`list-${elements.length}`} className="mb-3 ml-6 list-disc">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="mb-1">
              {parseInline(item)}
            </li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    // Heading
    if (trimmed.startsWith("#")) {
      flushParagraph();
      flushList();
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      const text = trimmed.replace(/^#+\s*/, "");
      const HeadingTag = `h${Math.min(level, 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      const headingClass = level === 1 ? "text-2xl font-bold mb-4" : level === 2 ? "text-xl font-bold mb-3" : "text-lg font-semibold mb-2";
      elements.push(
        <HeadingTag key={`h-${elements.length}`} className={headingClass}>
          {parseInline(text)}
        </HeadingTag>
      );
      continue;
    }

    // Unordered list
    if (trimmed.match(/^[-*]\s/)) {
      flushParagraph();
      const item = trimmed.replace(/^[-*]\s/, "");
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(item);
      continue;
    }

    // Ordered list
    if (trimmed.match(/^\d+\.\s/)) {
      flushParagraph();
      const item = trimmed.replace(/^\d+\.\s/, "");
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(item);
      continue;
    }

    // Regular paragraph
    flushList();
    currentParagraph.push(trimmed);
  }

  // Flush any remaining content
  flushParagraph();
  flushList();

  return <div className={className}>{elements}</div>;
}

/**
 * Parse inline Markdown (bold, italic, links)
 */
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    // Bold with **
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(
        <strong key={`bold-${key++}`} className="font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Italic with *
    const italicMatch = remaining.match(/\*(.+?)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(remaining.slice(0, italicMatch.index));
      }
      parts.push(
        <em key={`italic-${key++}`} className="italic">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // Links [text](url)
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);
    if (linkMatch && linkMatch.index !== undefined) {
      if (linkMatch.index > 0) {
        parts.push(remaining.slice(0, linkMatch.index));
      }
      parts.push(
        <a key={`link-${key++}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch.index + linkMatch[0].length);
      continue;
    }

    // No more special formatting
    parts.push(remaining);
    break;
  }

  return parts;
}
