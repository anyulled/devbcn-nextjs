"use client";
import React from "react";
import { trackTicketClick } from "@/lib/shared/analytics";

interface BuyTicketButtonProps {
  href?: string;
  className?: string;
  text?: string;
  target?: string;
  rel?: string;
  location?: string;
  year?: string;
  children?: React.ReactNode;
}

const BuyTicketButton: React.FC<BuyTicketButtonProps> = ({
  href = "https://tickets.devbcn.com/event/devbcn-2026",
  className = "vl-btn8",
  text = "Buy Ticket Now",
  target = "_blank",
  rel = "noopener noreferrer",
  location = "generic_button",
  year,
  children,
}) => {
  const handleClick = () => {
    const segment = typeof window === "undefined" ? undefined : window.location.pathname.split("/").find(Boolean);
    const yearFromPath = segment && /^\d{4}$/.test(segment) ? segment : new Date().getFullYear().toString();
    trackTicketClick(location, year ?? yearFromPath);
  };

  return (
    <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
      <span className="demo">{text}</span>
      {children}
    </a>
  );
};

export default BuyTicketButton;
