"use client";

import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

export function DateTime() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial date on client-side to avoid hydration mismatch
    setDate(new Date());
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!date) {
    // Render a placeholder on the server and during initial client render
    return (
        <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[70px]" />
        </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-foreground/80">
      <span>{formatDate(date)}</span>
      <span>{formatTime(date)}</span>
    </div>
  );
}
