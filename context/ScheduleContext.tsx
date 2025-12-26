"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ScheduleContextType {
  savedSessionIds: string[];
  toggleSession: (sessionId: string) => void;
  isSaved: (sessionId: string) => boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [savedSessionIds, setSavedSessionIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("eventify_saved_sessions");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSavedSessionIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved sessions", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save to local storage on change, but only after initial load
    if (isLoaded) {
      localStorage.setItem("eventify_saved_sessions", JSON.stringify(savedSessionIds));
    }
  }, [savedSessionIds, isLoaded]);

  const toggleSession = (sessionId: string) => {
    setSavedSessionIds((prev) => {
      if (prev.includes(sessionId)) {
        return prev.filter((id) => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });
  };

  const isSaved = (sessionId: string) => savedSessionIds.includes(sessionId);

  return <ScheduleContext.Provider value={{ savedSessionIds, toggleSession, isSaved }}>{children}</ScheduleContext.Provider>;
}

export function useScheduleContext() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useScheduleContext must be used within a ScheduleProvider");
  }
  return context;
}
