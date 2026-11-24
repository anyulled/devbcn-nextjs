"use client";

import { getTicketSaleWindow } from "@/config/editions";
import type { EditionConfig } from "@/config/editions/types";
import { useEffect, useState } from "react";

const MAX_TIMEOUT = 2_147_483_647;

export function useEditionActionAvailability(config: EditionConfig, enabled = true) {
  const [now, setNow] = useState<number | null>(null);
  const { startDate: ticketStart, endDate: ticketEnd } = getTicketSaleWindow(config);

  useEffect(() => {
    if (!enabled) return;

    const boundaries = [config.cfp.startDay.getTime(), config.cfp.endDay.getTime() + 1, ticketStart.getTime(), ticketEnd.getTime() + 1];
    const timer: { current?: ReturnType<typeof setTimeout> } = {};
    const update = () => {
      const current = Date.now();
      setNow(current);
      const next = boundaries.filter((boundary) => boundary > current).sort((a, b) => a - b)[0];
      if (next !== undefined) timer.current = setTimeout(update, Math.min(next - current, MAX_TIMEOUT));
    };
    update();
    return () => clearTimeout(timer.current);
  }, [enabled, config.cfp.startDay, config.cfp.endDay, ticketStart, ticketEnd]);

  return {
    isInitialized: now !== null,
    isBeforeTicketSale: now !== null && now < ticketStart.getTime(),
    showTickets: now !== null && now >= ticketStart.getTime() && now <= ticketEnd.getTime(),
    showCfp: now !== null && now >= config.cfp.startDay.getTime() && now <= config.cfp.endDay.getTime(),
  };
}
