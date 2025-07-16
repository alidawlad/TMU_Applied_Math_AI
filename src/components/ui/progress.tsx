"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  animated?: boolean;
  showGlow?: boolean;
  variant?: "default" | "success" | "warning" | "error";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, animated = true, showGlow = false, variant = "default", ...props }, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  
  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(value || 0);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value || 0);
    }
  }, [value, animated]);

  const variantClasses = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  const backgroundClasses = {
    default: "bg-secondary",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    error: "bg-red-100",
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        backgroundClasses[variant],
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out",
          variantClasses[variant],
          showGlow && "shadow-lg shadow-primary/20",
          value === 100 && variant === "success" && "animate-pulse"
        )}
        style={{ transform: `translateX(-${100 - animatedValue}%)` }}
      />
      {/* Shimmer effect for loading state */}
      {animated && animatedValue > 0 && animatedValue < 100 && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      )}
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
