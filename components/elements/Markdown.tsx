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

interface LineProcessingState {
  elements: React.ReactNode[];
  currentList: { type: "ul" | "ol"; items: string[] } | null;
  currentParagraph: string[];
}

const createHeading = (line: string, elementIndex: number): React.ReactElement => {
  const level = line.match(/^#+/)?.[0].length || 1;
  const text = line.replace(/^#+\s*/, "");
  const HeadingTag = `h${Math.min(level, 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const headingClass = level === 1 ? "text-2xl font-bold mb-4" : level === 2 ? "text-xl font-bold mb-3" : "text-lg font-semibold mb-2";

  return (
    <HeadingTag key={`h-${elementIndex}`} className={headingClass}>
      {parseInline(text)}
    </HeadingTag>
  );
};

const flushParagraph = (state: LineProcessingState): LineProcessingState => {
  if (state.currentParagraph.length === 0) return state;

  const text = state.currentParagraph.join(" ");
  const newElement = (
    <p key={`p-${state.elements.length}`} className="mb-3">
      {parseInline(text)}
    </p>
  );

  return {
    elements: [...state.elements, newElement],
    currentList: state.currentList,
    currentParagraph: [],
  };
};

const flushList = (state: LineProcessingState): LineProcessingState => {
  if (!state.currentList) return state;

  const ListTag = state.currentList.type;
  const newElement = (
    <ListTag key={`list-${state.elements.length}`} className="mb-3 ml-6 list-disc">
      {state.currentList.items.map((item, idx) => (
        <li key={idx} className="mb-1">
          {parseInline(item)}
        </li>
      ))}
    </ListTag>
  );

  return {
    elements: [...state.elements, newElement],
    currentList: null,
    currentParagraph: state.currentParagraph,
  };
};

const handleEmptyLine = (state: LineProcessingState): LineProcessingState => {
  const afterParagraph = flushParagraph(state);
  return flushList(afterParagraph);
};

const handleHeading = (state: LineProcessingState, line: string): LineProcessingState => {
  const afterParagraph = flushParagraph(state);
  const afterList = flushList(afterParagraph);
  const heading = createHeading(line, afterList.elements.length);

  return {
    elements: [...afterList.elements, heading],
    currentList: null,
    currentParagraph: [],
  };
};

const handleUnorderedList = (state: LineProcessingState, line: string): LineProcessingState => {
  const item = line.replace(/^[-*]\s/, "");
  const afterParagraph = flushParagraph(state);

  const currentList = afterParagraph.currentList?.type === "ul" ? afterParagraph.currentList : { type: "ul" as const, items: [] };

  const afterList = afterParagraph.currentList?.type === "ul" ? afterParagraph : flushList(afterParagraph);

  return {
    elements: afterList.elements,
    currentList: { type: "ul", items: [...currentList.items, item] },
    currentParagraph: [],
  };
};

const handleOrderedList = (state: LineProcessingState, line: string): LineProcessingState => {
  const item = line.replace(/^\d+\.\s/, "");
  const afterParagraph = flushParagraph(state);

  const currentList = afterParagraph.currentList?.type === "ol" ? afterParagraph.currentList : { type: "ol" as const, items: [] };

  const afterList = afterParagraph.currentList?.type === "ol" ? afterParagraph : flushList(afterParagraph);

  return {
    elements: afterList.elements,
    currentList: { type: "ol", items: [...currentList.items, item] },
    currentParagraph: [],
  };
};

const handleParagraph = (state: LineProcessingState, line: string): LineProcessingState => {
  const afterList = flushList(state);

  return {
    elements: afterList.elements,
    currentList: null,
    currentParagraph: [...afterList.currentParagraph, line],
  };
};

const processLine = (state: LineProcessingState, line: string): LineProcessingState => {
  const trimmed = line.trim();

  if (!trimmed) {
    return handleEmptyLine(state);
  }

  if (trimmed.startsWith("#")) {
    return handleHeading(state, trimmed);
  }

  if (trimmed.match(/^[-*]\s/)) {
    return handleUnorderedList(state, trimmed);
  }

  if (trimmed.match(/^\d+\.\s/)) {
    return handleOrderedList(state, trimmed);
  }

  return handleParagraph(state, trimmed);
};

const processLines = (lines: string[]): React.ReactNode[] => {
  const initialState: LineProcessingState = {
    elements: [],
    currentList: null,
    currentParagraph: [],
  };

  const finalState = lines.reduce((state, line) => processLine(state, line), initialState);
  const afterParagraph = flushParagraph(finalState);
  const afterList = flushList(afterParagraph);

  return afterList.elements;
};

/**
 * Parse and render Markdown content as React elements
 */
export function Markdown({ content, className = "" }: MarkdownProps): React.ReactElement {
  const lines = content.split("\n");
  const elements = processLines(lines);

  return <div className={className}>{elements}</div>;
}

interface MatchResult {
  index: number;
  length: number;
  element: React.ReactNode;
}

const createBoldElement = (text: string, key: number): React.ReactElement => (
  <strong key={`bold-${key}`} className="font-semibold">
    {text}
  </strong>
);

const createItalicElement = (text: string, key: number): React.ReactElement => (
  <em key={`italic-${key}`} className="italic">
    {text}
  </em>
);

const createLinkElement = (linkText: string, url: string, key: number): React.ReactElement => (
  <a key={`link-${key}`} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
    {linkText}
  </a>
);

const findNextMatch = (text: string, key: number): MatchResult | null => {
  const boldMatch = text.match(/\*\*(.+?)\*\*/);
  const italicMatch = text.match(/\*(.+?)\*/);
  const linkMatch = text.match(/\[(.+?)\]\((.+?)\)/);

  const matches: Array<{ index: number; length: number; element: React.ReactNode }> = [];

  if (boldMatch?.index !== undefined) {
    matches.push({
      index: boldMatch.index,
      length: boldMatch[0].length,
      element: createBoldElement(boldMatch[1], key),
    });
  }

  if (italicMatch?.index !== undefined) {
    matches.push({
      index: italicMatch.index,
      length: italicMatch[0].length,
      element: createItalicElement(italicMatch[1], key),
    });
  }

  if (linkMatch?.index !== undefined) {
    matches.push({
      index: linkMatch.index,
      length: linkMatch[0].length,
      element: createLinkElement(linkMatch[1], linkMatch[2], key),
    });
  }

  if (matches.length === 0) return null;

  return matches.reduce((earliest, current) => (current.index < earliest.index ? current : earliest));
};

const processInlineText = (remaining: string, parts: React.ReactNode[], key: number): React.ReactNode[] => {
  if (!remaining) return parts;

  const match = findNextMatch(remaining, key);

  if (!match) {
    return [...parts, remaining];
  }

  const newParts = match.index > 0 ? [...parts, remaining.slice(0, match.index), match.element] : [...parts, match.element];

  const newRemaining = remaining.slice(match.index + match.length);

  return processInlineText(newRemaining, newParts, key + 1);
};

/**
 * Parse inline Markdown (bold, italic, links)
 */
function parseInline(text: string): React.ReactNode[] {
  return processInlineText(text, [], 0);
}
