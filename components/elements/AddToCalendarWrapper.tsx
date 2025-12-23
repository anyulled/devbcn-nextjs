"use client";

import { AddToCalendarButton } from "add-to-calendar-button-react";

interface AddToCalendarWrapperProps {
  name: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
}

export default function AddToCalendarWrapper({ name, description, startDate, startTime, endDate, endTime, location }: AddToCalendarWrapperProps) {
  if (!startDate || !endDate) {
    return null;
  }

  return (
    <AddToCalendarButton
      name={name}
      description={description?.substring(0, 500) || ""}
      startDate={startDate}
      startTime={startTime}
      endDate={endDate}
      endTime={endTime}
      timeZone="Europe/Madrid"
      location={location || "DevBcn Conference"}
      options={["Google", "Apple", "iCal", "Outlook.com"]}
      buttonStyle="round"
      lightMode="bodyScheme"
      size="4"
    />
  );
}
