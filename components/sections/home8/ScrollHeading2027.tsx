import type { CSSProperties } from "react";

export default function ScrollHeading2027({ id, children }: Readonly<{ id: string; children: string }>) {
  return (
    <h2 id={id} className="home-2027__scroll-heading">
      {children.split(" ").map((word, index) => (
        <span key={index} style={{ "--word-offset": `${Math.min(index * 1.8, 12)}%` } as CSSProperties}>
          {index > 0 ? " " : ""}
          {word}
        </span>
      ))}
    </h2>
  );
}
