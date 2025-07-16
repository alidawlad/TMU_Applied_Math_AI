"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InlineMathInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isMobile?: boolean;
  className?: string;
}

export function InlineMathInput({
  id,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  isMobile = false,
  className,
}: InlineMathInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-resize the input based on content
  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      const minWidth = 60; // Minimum width for usability
      const maxWidth = isMobile ? 120 : 200; // Max width to prevent overflow
      
      // Create a temporary element to measure text width
      const temp = document.createElement('span');
      temp.style.visibility = 'hidden';
      temp.style.position = 'absolute';
      temp.style.whiteSpace = 'pre';
      temp.style.font = window.getComputedStyle(input).font;
      temp.textContent = value || placeholder;
      document.body.appendChild(temp);
      
      const textWidth = temp.offsetWidth;
      document.body.removeChild(temp);
      
      // Set width with padding
      const newWidth = Math.max(minWidth, Math.min(maxWidth, textWidth + 20));
      input.style.width = `${newWidth}px`;
    }
  }, [value, placeholder, isMobile]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        // Base styling to match the blue box from the reference image
        "inline-block bg-blue-50 border-2 border-blue-200 rounded-md px-2 py-1",
        "text-center font-medium text-blue-900 placeholder-blue-400",
        "transition-all duration-200 outline-none",
        
        // Focus states
        isFocused && "ring-2 ring-blue-300/50 border-blue-300 bg-blue-100",
        
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",
        
        // Mobile adjustments
        isMobile ? "text-sm min-h-[36px]" : "text-base min-h-[32px]",
        
        // Prevent zoom on iOS
        isMobile && "text-[16px]",
        
        // Custom className
        className
      )}
      style={{
        fontSize: isMobile ? '16px' : undefined, // Prevents iOS zoom
      }}
      // Mobile-specific attributes
      inputMode="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
    />
  );
}