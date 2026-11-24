"use client";
import React from "react";
import { trackTicketClick } from "@/lib/shared/analytics";
import { getEditionConfig, getEditionYearFromPathname } from "@/config/editions";
import { useEditionActionAvailability } from "@/hooks/useEditionActionAvailability";
import { usePathname } from "next/navigation";

interface BuyTicketButtonProps {
  href?: string;
  className?: string;
  text?: string;
  target?: string;
  rel?: string;
  location?: string;
  year?: string;
  respectSaleWindow?: boolean;
  children?: React.ReactNode;
}

const BuyTicketButton: React.FC<BuyTicketButtonProps> = ({
  href,
  className = "vl-btn8",
  text = "Buy Ticket Now",
  target = "_blank",
  rel = "noopener noreferrer",
  location = "generic_button",
  year,
  respectSaleWindow = false,
  children,
}) => {
  const pathname = usePathname();
  const config = getEditionConfig(year ?? getEditionYearFromPathname(pathname));
  const ticketHref = href ?? config.tickets.url;
  const { showTickets } = useEditionActionAvailability(config, respectSaleWindow);

  if (respectSaleWindow && !showTickets) return null;

  const handleClick = () => {
    trackTicketClick(location, config.edition);
  };

  return (
    <a href={ticketHref} className={className} target={target} rel={rel} onClick={handleClick}>
      <span className="demo">{text}</span>
      {children}
    </a>
  );
};

export default BuyTicketButton;
