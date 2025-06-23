"use client";

import { useState, useEffect } from 'react';

export function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
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

  return (
    <div className="flex items-center gap-2 text-sm text-foreground/80">
      <span>{formatDate(date)}</span>
      <span>{formatTime(date)}</span>
    </div>
  );
}
