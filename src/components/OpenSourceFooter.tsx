"use client";

import { Button } from "@/components/ui/button";
import { GitBranch, Bug, ExternalLink, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpenSourceFooterProps {
  variant?: 'default' | 'minimal' | 'error';
  className?: string;
  showButtons?: boolean;
}

export function OpenSourceFooter({ 
  variant = 'default', 
  className = "",
  showButtons = true 
}: OpenSourceFooterProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn("text-center text-xs text-muted-foreground py-4", className)}>
        <p>
          Open Source AI Learning Platform • Developed by{" "}
          <span className="font-medium">Ali Houssein</span> • MIT License
        </p>
        <p className="mt-1">
          <a 
            href="https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View Source Code
          </a>
        </p>
      </div>
    );
  }

  if (variant === 'error') {
    return (
      <div className={cn("text-center text-sm text-gray-500", className)}>
        <p>CQMS110 - Applied Mathematics for Business</p>
        <p className="mt-1">
          Open Source AI-Powered Learning Platform • Developed by{" "}
          <span className="font-medium">Ali Houssein</span> • MIT License
        </p>
        <p className="text-xs mt-1">
          <a 
            href="https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Source Code
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={cn("text-center py-8", className)}>
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border max-w-2xl mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-semibold font-headline text-primary">
              Open Source AI-Powered Integrated Learning Platform
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">
            This platform is open source under the MIT License, developed by{" "}
            <span className="font-medium text-primary">Ali Houssein</span>
          </p>
        </div>
        
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GitBranch className="h-4 w-4" />
                View Source Code
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI/issues/new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Bug className="h-4 w-4" />
                Report Issue
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p>© 2025 Ali Houssein • Licensed under MIT • Toronto Metropolitan University</p>
        </div>
      </div>
    </div>
  );
}