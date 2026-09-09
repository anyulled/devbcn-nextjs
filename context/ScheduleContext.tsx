"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";
import type { DailySchedule } from "@/hooks/useSchedule";
import { scheduleFavoriteSessionNotifications } from "@/lib/session-notifications";

interface ScheduleContextType {
  savedSessionIds: string[];
  toggleSession: (sessionId: string) => void;
  isSaved: (sessionId: string) => boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

interface ScheduleProviderProps {
  readonly children: ReactNode;
  readonly schedule?: DailySchedule[];
}

export function ScheduleProvider({ children, schedule = [] }: ScheduleProviderProps) {
  const [savedSessionIds, setSavedSessionIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("eventify_saved_sessions");
    if (saved) {
      try {
        setSavedSessionIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved sessions", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("eventify_saved_sessions", JSON.stringify(savedSessionIds));
    }
  }, [savedSessionIds, isLoaded]);

  useEffect(() => {
    return scheduleFavoriteSessionNotifications(schedule, savedSessionIds, typeof Notification === "undefined" ? undefined : Notification);
  }, [schedule, savedSessionIds]);

  const requestNotificationPermission = useCallback(() => {
    if (typeof Notification === "undefined" || Notification.permission !== "default") {
      return;
    }

    Notification.requestPermission().catch((error: unknown) => {
      console.error("Failed to request notification permission", error);
    });
  }, []);

  const toggleSession = useCallback(
    (sessionId: string) => {
      setSavedSessionIds((prev) => {
        if (prev.includes(sessionId)) {
          return prev.filter((id) => id !== sessionId);
        }

        requestNotificationPermission();
        return [...prev, sessionId];
      });
    },
    [requestNotificationPermission]
  );

  const isSaved = useCallback((sessionId: string) => savedSessionIds.includes(sessionId), [savedSessionIds]);

  const contextValue = useMemo(() => ({ savedSessionIds, toggleSession, isSaved }), [savedSessionIds, toggleSession, isSaved]);

  return <ScheduleContext.Provider value={contextValue}>{children}</ScheduleContext.Provider>;
}

export function useScheduleContext() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useScheduleContext must be used within a ScheduleProvider");
  }
  return context;
}
