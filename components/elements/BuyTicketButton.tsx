"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { trackTicketClick } from "@/lib/shared/analytics";

interface BuyTicketButtonProps {
  href?: string;
  className?: string;
  text?: string;
  target?: string;
  rel?: string;
  location?: string;
  year?: string;
  talkId?: string;
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
  talkId,
  children,
}) => {
  const pathname = usePathname();
  const segment = pathname?.split("/").find(Boolean);
  const yearFromPath = segment && /^\d{4}$/.test(segment) ? segment : new Date().getFullYear().toString();

  const handleClick = () => {
    trackTicketClick(location, year ?? yearFromPath, talkId);
  };

  return (
    <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
      <span className="demo">{text}</span>
      {children}
    </a>
  );
};

export default BuyTicketButton;
