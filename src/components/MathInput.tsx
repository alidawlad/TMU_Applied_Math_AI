"use client";

import 'katex/dist/katex.min.css';
import { MathRenderer } from "./MathRenderer";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isMobile?: boolean;
}

export function MathInput({
  value,
  onChange,
  placeholder,
  disabled,
  isMobile = false,
}: MathInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  return (
    <div className={cn(
      "grid",
      isMobile ? "gap-3" : "gap-4"
    )}>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsTouched(true);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "transition-all duration-200",
          isMobile ? "text-base h-12" : "text-lg h-10", // Larger height for mobile
          isMobile && "rounded-lg", // More rounded on mobile
          isFocused && "ring-2 ring-primary/20", // Enhanced focus state
          disabled && "opacity-50 cursor-not-allowed"
        )}
        disabled={disabled}
        // Mobile specific attributes
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        // Prevent zoom on iOS
        style={{
          fontSize: isMobile ? '16px' : undefined, // Prevents iOS zoom
        }}
      />
      {value && (
        <Card className={cn(
          "bg-muted/50 transition-all duration-200",
          isMobile && "border-2",
          isFocused && "border-primary/20"
        )}>
          <CardContent className={cn(
            isMobile ? "p-3" : "p-4"
          )}>
            <p className={cn(
              "text-muted-foreground mb-2",
              isMobile ? "text-xs" : "text-sm"
            )}>Preview:</p>
            <div className={cn(
              "flex justify-center items-center text-xl",
              isMobile ? "min-h-[35px]" : "min-h-[40px]"
            )}>
              <MathRenderer 
                text={`$$${value}$$`} 
                enableOverflowScroll={true}
                className={cn(
                  "max-w-full",
                  isMobile && "text-lg" // Slightly smaller on mobile
                )}
              />
            </div>
            {isMobile && value.length > 20 && (
              <div className="mt-2 text-xs text-muted-foreground text-center">
                💡 Swipe to scroll long expressions
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
