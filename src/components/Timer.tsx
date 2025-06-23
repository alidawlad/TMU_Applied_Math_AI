"use client";
import { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

export function Timer({ resetKey }: { resetKey: any }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resetKey]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm font-mono bg-black/20 text-primary-foreground px-2 py-1 rounded-md">
      <TimerIcon className="h-4 w-4 text-primary-foreground/80" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}
