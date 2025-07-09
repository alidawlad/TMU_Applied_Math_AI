"use client";
import { useState, useEffect, useRef } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

export function Timer({ resetKey }: { resetKey: any }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  useEffect(() => {
    // Reset state when the problem changes (via resetKey)
    setSeconds(0);
    setIsRunning(false);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    
    // Using document to communicate across components without lifting state
    document.addEventListener('startTimer', handleStart);
    document.addEventListener('stopTimer', handleStop);

    const interval = setInterval(() => {
      if (isRunningRef.current) {
        setSeconds(s => s + 1);
      }
    }, 1000);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('startTimer', handleStart);
      document.removeEventListener('stopTimer', handleStop);
    };
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
