"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";

interface ScheduleContextType {
  savedSessionIds: string[];
  toggleSession: (sessionId: string) => void;
  isSaved: (sessionId: string) => boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { readonly children: ReactNode }) {
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

  const toggleSession = useCallback((sessionId: string) => {
    setSavedSessionIds((prev) => {
      if (prev.includes(sessionId)) {
        return prev.filter((id) => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });
  }, []);

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
