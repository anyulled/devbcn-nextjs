"use client";
import React, { useEffect, useRef } from "react";

interface CircleTextProps {
  text: string; // Define the type for the text prop
}

const CircleText: React.FC<CircleTextProps> = ({ text }) => {
  const circleRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

  useEffect(() => {
    if (circleRef.current) {
      const elements = circleRef.current.querySelectorAll<HTMLSpanElement>("span");
      elements.forEach((element, i) => {
        element.style.transform = `rotate(${i * 17}deg)`;
      });
    }
  }, [text]); // Dependency on text to reapply effect if text changes

  // Return the main container with span elements for each character
  return (
    <div className="circle rotateme" ref={circleRef}>
      {text.split("").map((char, i) => (
        <span key={i}>{char === " " ? "\u00A0" : char}</span>
      ))}
    </div>
  );
};

export default CircleText;
