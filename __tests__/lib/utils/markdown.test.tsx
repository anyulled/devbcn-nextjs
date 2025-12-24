import { Markdown } from "@/lib/utils/markdown";
import { render } from "@testing-library/react";

describe("Markdown", () => {
  it("should render paragraphs correctly", () => {
    const { container } = render(<Markdown content="This is a paragraph." />);
    const paragraph = container.querySelector("p");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("This is a paragraph.");
  });

  it("should render multiple paragraphs", () => {
    const content = `First paragraph.

Second paragraph.`;
    const { container } = render(<Markdown content={content} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent("First paragraph.");
    expect(paragraphs[1]).toHaveTextContent("Second paragraph.");
  });

  it("should render unordered lists", () => {
    const content = `- Item 1
- Item 2
- Item 3`;
    const { container } = render(<Markdown content={content} />);
    const list = container.querySelector("ul");
    const items = container.querySelectorAll("li");
    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Item 1");
    expect(items[1]).toHaveTextContent("Item 2");
    expect(items[2]).toHaveTextContent("Item 3");
  });

  it("should render ordered lists", () => {
    const content = `1. First item
2. Second item
3. Third item`;
    const { container } = render(<Markdown content={content} />);
    const list = container.querySelector("ol");
    const items = container.querySelectorAll("li");
    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(3);
  });

  it("should render bold text", () => {
    const { container } = render(<Markdown content="This is **bold** text." />);
    const strong = container.querySelector("strong");
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent("bold");
  });

  it("should render italic text", () => {
    const { container } = render(<Markdown content="This is *italic* text." />);
    const em = container.querySelector("em");
    expect(em).toBeInTheDocument();
    expect(em).toHaveTextContent("italic");
  });

  it("should render links", () => {
    const { container } = render(<Markdown content="Visit [Google](https://google.com) for more." />);
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Google");
    expect(link).toHaveAttribute("href", "https://google.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render headings", () => {
    const content = `# Heading 1
## Heading 2
### Heading 3`;
    const { container } = render(<Markdown content={content} />);
    expect(container.querySelector("h1")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();
    expect(container.querySelector("h3")).toBeInTheDocument();
    expect(container.querySelector("h1")).toHaveTextContent("Heading 1");
  });

  it("should handle mixed content", () => {
    const content = `## Job Title

This is a **description** with *italic* text and a [link](https://example.com).

**Requirements:**

- Requirement 1
- Requirement 2`;
    const { container } = render(<Markdown content={content} />);
    expect(container.querySelector("h2")).toHaveTextContent("Job Title");
    expect(container.querySelector("strong")).toBeInTheDocument();
    expect(container.querySelector("em")).toBeInTheDocument();
    expect(container.querySelector("a")).toBeInTheDocument();
    expect(container.querySelector("ul")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<Markdown content="Test" className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should handle italic text at the beginning of a line", () => {
    const { container } = render(<Markdown content="*italic* at start" />);
    const em = container.querySelector("em");
    expect(em).toBeInTheDocument();
    expect(em).toHaveTextContent("italic");
  });

  it("should handle links at the beginning of a line", () => {
    const { container } = render(<Markdown content="[Link](https://example.com) at start" />);
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("should handle multiple formatting in the same line", () => {
    const { container } = render(<Markdown content="**bold** and *italic* and [link](https://example.com)" />);
    expect(container.querySelector("strong")).toHaveTextContent("bold");
    expect(container.querySelector("em")).toHaveTextContent("italic");
    expect(container.querySelector("a")).toHaveTextContent("link");
  });

  it("should handle headings with more than 6 hash marks", () => {
    const { container } = render(<Markdown content="####### Deep heading" />);
    const heading = container.querySelector("h6");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Deep heading");
  });

  it("should handle empty lines between list items", () => {
    const content = `- Item 1

- Item 2`;
    const { container } = render(<Markdown content={content} />);
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2); // Empty line creates two separate lists
  });
});
