"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, Target, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Enhanced Progress Component with animations
const EnhancedProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    size?: "sm" | "md" | "lg";
    animated?: boolean;
    showPercentage?: boolean;
    variant?: "default" | "success" | "warning" | "info";
    gradient?: boolean;
    ariaLabel?: string;
  }
>(({ className, value, size = "md", animated = true, showPercentage = false, variant = "default", gradient = false, ariaLabel, ...props }, ref) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  
  React.useEffect(() => {
    if (animated) {
      const duration = 800;
      const startTime = Date.now();
      const startValue = displayValue;
      const endValue = value || 0;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const currentValue = startValue + (endValue - startValue) * easeOutCubic(progress);
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setDisplayValue(value || 0);
    }
  }, [value, animated, displayValue]);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variantClasses = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const backgroundClasses = {
    default: "bg-secondary",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    info: "bg-blue-100",
  };

  const indicatorClass = gradient 
    ? "bg-gradient-to-r from-primary to-primary/80" 
    : variantClasses[variant];

  return (
    <div className="space-y-1">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          sizeClasses[size],
          backgroundClasses[variant],
          className
        )}
        aria-label={ariaLabel || `Progress: ${Math.round(displayValue)}%`}
        aria-valuenow={displayValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out",
            indicatorClass
          )}
          style={{ transform: `translateX(-${100 - displayValue}%)` }}
        />
        {variant === "success" && displayValue === 100 && (
          <div className="absolute inset-0 bg-green-500 animate-pulse" />
        )}
      </ProgressPrimitive.Root>
      {showPercentage && (
        <div className="text-xs text-muted-foreground text-right" aria-live="polite">
          {Math.round(displayValue)}%
        </div>
      )}
    </div>
  );
});

EnhancedProgress.displayName = "EnhancedProgress";

// Progress Card Component for consistent layout
interface ProgressCardProps {
  title: string;
  description?: string;
  value: number;
  max: number;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  isComplete?: boolean;
  className?: string;
  ariaLabel?: string;
}

const ProgressCard = React.forwardRef<
  HTMLDivElement,
  ProgressCardProps
>(({ 
  title, 
  description, 
  value, 
  max, 
  icon, 
  variant = "default", 
  size = "md", 
  showBadge = true, 
  isComplete = false,
  className,
  ariaLabel 
}, ref) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const completionVariant = isComplete ? "success" : variant;

  return (
    <div 
      ref={ref} 
      className={cn("space-y-2", className)}
      role="progressbar"
      aria-label={ariaLabel || `${title}: ${value} of ${max} completed`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
          {isComplete && (
            <CheckCircle2 className="h-4 w-4 text-green-600" aria-label="Completed" />
          )}
        </div>
        {showBadge && (
          <Badge variant={isComplete ? "default" : "secondary"} className="text-xs">
            {value}/{max}
          </Badge>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <EnhancedProgress
        value={percentage}
        size={size}
        variant={completionVariant}
        animated={true}
        showPercentage={true}
        gradient={isComplete}
        ariaLabel={`${title} progress: ${Math.round(percentage)}%`}
      />
    </div>
  );
});

ProgressCard.displayName = "ProgressCard";

// Progress Ring Component for circular progress
interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
  variant?: "default" | "success" | "warning" | "info";
}

const ProgressRing = React.forwardRef<
  SVGSVGElement,
  ProgressRingProps
>(({ 
  value, 
  max, 
  size = 60, 
  strokeWidth = 6, 
  className, 
  showText = true, 
  variant = "default" 
}, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  const colors = {
    default: "stroke-primary",
    success: "stroke-green-500",
    warning: "stroke-yellow-500",
    info: "stroke-blue-500",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        ref={ref}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out", colors[variant])}
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium">
            {Math.round(animatedValue)}%
          </span>
        </div>
      )}
    </div>
  );
});

ProgressRing.displayName = "ProgressRing";

// Progress Stats Component for displaying multiple stats
interface ProgressStatsProps {
  stats: Array<{
    label: string;
    value: number;
    icon?: React.ReactNode;
    color?: string;
  }>;
  layout?: "horizontal" | "vertical";
  className?: string;
}

const ProgressStats = React.forwardRef<
  HTMLDivElement,
  ProgressStatsProps
>(({ stats, layout = "horizontal", className }, ref) => {
  const layoutClasses = {
    horizontal: "flex flex-row gap-6",
    vertical: "flex flex-col gap-3",
  };

  return (
    <div ref={ref} className={cn(layoutClasses[layout], className)}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          {stat.icon && (
            <div className={cn("p-1 rounded-full", stat.color || "bg-primary/10")}>
              {stat.icon}
            </div>
          )}
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

ProgressStats.displayName = "ProgressStats";

// Progress Indicator with status icons
interface ProgressIndicatorProps {
  status: "not-started" | "in-progress" | "completed";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  ariaLabel?: string;
}

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(({ status, size = "md", animated = true, className, ariaLabel }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const getIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className={cn(sizeClasses[size], "text-green-600")} />;
      case "in-progress":
        return <Clock className={cn(sizeClasses[size], "text-blue-600", animated && "animate-pulse")} />;
      case "not-started":
      default:
        return <Circle className={cn(sizeClasses[size], "text-muted-foreground")} />;
    }
  };

  return (
    <div 
      ref={ref} 
      className={cn("flex items-center justify-center", className)}
      role="status"
      aria-label={ariaLabel || `Status: ${status.replace('-', ' ')}`}
    >
      {getIcon()}
    </div>
  );
});

ProgressIndicator.displayName = "ProgressIndicator";

// Progress Breadcrumb Component
interface ProgressBreadcrumbItem {
  id: string;
  title: string;
  status: "not-started" | "in-progress" | "completed";
  progress?: number;
}

interface ProgressBreadcrumbProps {
  items: ProgressBreadcrumbItem[];
  currentIndex: number;
  onItemClick?: (index: number) => void;
  className?: string;
}

const ProgressBreadcrumb = React.forwardRef<
  HTMLDivElement,
  ProgressBreadcrumbProps
>(({ items, currentIndex, onItemClick, className }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
              index === currentIndex ? "bg-primary/10 text-primary" : "text-muted-foreground",
              onItemClick && "cursor-pointer hover:bg-muted",
              item.status === "completed" && "text-green-600"
            )}
            onClick={() => onItemClick?.(index)}
          >
            <ProgressIndicator status={item.status} size="sm" />
            <span className="text-sm font-medium">{item.title}</span>
            {item.progress !== undefined && (
              <Badge variant="outline" className="text-xs">
                {Math.round(item.progress)}%
              </Badge>
            )}
          </div>
          {index < items.length - 1 && (
            <div className="text-muted-foreground/50">→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

ProgressBreadcrumb.displayName = "ProgressBreadcrumb";

export {
  EnhancedProgress,
  ProgressCard,
  ProgressRing,
  ProgressStats,
  ProgressIndicator,
  ProgressBreadcrumb,
};