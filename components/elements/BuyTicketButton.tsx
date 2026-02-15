import React from "react";

interface BuyTicketButtonProps {
  href?: string;
  className?: string;
  text?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

const BuyTicketButton: React.FC<BuyTicketButtonProps> = ({
  href = "https://tickets.devbcn.com/event/devbcn-2026",
  className = "vl-btn8",
  text = "Buy Ticket Now",
  target = "_blank",
  rel = "noopener noreferrer",
  children,
}) => {
  return (
    <a href={href} className={className} target={target} rel={rel}>
      <span className="demo">{text}</span>
      {children}
    </a>
  );
};

export default BuyTicketButton;
