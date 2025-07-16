'use client';

import React, { useMemo, ReactNode } from 'react';
import { MathRenderer } from './MathRenderer';
import { InlineMathInput } from './InlineMathInput';
import { cn } from '@/lib/utils';

interface MathRendererWithBlanksProps {
  text: string;
  blankValues?: Record<string, string>;
  onBlankChange?: (blankId: string, value: string) => void;
  className?: string;
  containerType?: 'auto' | 'inline' | 'display';
  enableOverflowScroll?: boolean;
  disabled?: boolean;
  isMobile?: boolean;
  instructionText?: string;
}

// Regular expression to match placeholder tokens like {blank1}, {blank2}, etc.
const blankPattern = /\{(blank\d+)\}/g;

export function MathRendererWithBlanks({
  text,
  blankValues = {},
  onBlankChange,
  className,
  containerType = 'auto',
  enableOverflowScroll = true,
  disabled = false,
  isMobile = false,
  instructionText,
}: MathRendererWithBlanksProps) {
  
  // Parse the text to identify blanks and create segments
  const segments = useMemo(() => {
    const parts: Array<{ type: 'text' | 'blank'; content: string; id?: string }> = [];
    let lastIndex = 0;
    let match;
    
    // Reset regex to start from beginning
    blankPattern.lastIndex = 0;
    
    while ((match = blankPattern.exec(text)) !== null) {
      // Add text before the blank
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }
      
      // Add the blank
      parts.push({
        type: 'blank',
        content: match[0], // The full match like {blank1}
        id: match[1] // Just the ID like 'blank1'
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }
    
    return parts;
  }, [text]);

  // Check if the text contains any blanks
  const hasBlanks = segments.some(segment => segment.type === 'blank');
  
  // If no blanks, use the regular MathRenderer
  if (!hasBlanks) {
    return (
      <MathRenderer
        text={text}
        className={className}
        containerType={containerType}
        enableOverflowScroll={enableOverflowScroll}
      />
    );
  }

  // Render segments with blanks
  const renderSegments = (): ReactNode[] => {
    return segments.map((segment, index) => {
      if (segment.type === 'text') {
        // For text segments, use MathRenderer but inline
        return (
          <MathRenderer
            key={index}
            text={segment.content}
            containerType="inline"
            enableOverflowScroll={false}
            className="inline-math-segment"
          />
        );
      } else if (segment.type === 'blank' && segment.id) {
        // For blank segments, render the InlineMathInput
        return (
          <InlineMathInput
            key={index}
            id={segment.id}
            value={blankValues[segment.id] || ''}
            onChange={(value) => onBlankChange?.(segment.id!, value)}
            disabled={disabled}
            isMobile={isMobile}
            className="inline-math-blank"
          />
        );
      }
      return null;
    });
  };

  return (
    <div className={cn(
      "math-renderer-with-blanks",
      containerType === 'display' && "text-center",
      className
    )}>
      {/* Instruction text */}
      {instructionText && (
        <div className={cn(
          "text-sm text-blue-700 font-medium mb-2",
          isMobile && "text-xs"
        )}>
          {instructionText}
        </div>
      )}
      
      {/* Main content with blanks */}
      <div className={cn(
        "inline-flex items-center flex-wrap gap-1",
        containerType === 'display' && "justify-center",
        isMobile && "gap-0.5"
      )}>
        {renderSegments()}
      </div>
      
      {/* Mathematical expression styling */}
      <style jsx global>{`
        .math-renderer-with-blanks {
          font-family: 'KaTeX_Main', 'Times New Roman', serif;
          line-height: 1.4;
        }
        
        .math-renderer-with-blanks .inline-math-segment {
          display: inline-block;
          vertical-align: baseline;
        }
        
        .math-renderer-with-blanks .inline-math-blank {
          vertical-align: baseline;
          margin: 0 1px;
        }
        
        .math-renderer-with-blanks .katex {
          font-size: inherit;
        }
        
        .math-renderer-with-blanks .katex .base {
          display: inline-block;
          vertical-align: baseline;
        }
        
        @media (max-width: 768px) {
          .math-renderer-with-blanks {
            font-size: 0.9em;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to extract blank IDs from text
export function extractBlankIds(text: string): string[] {
  const blanks: string[] = [];
  let match;
  
  // Reset regex to start from beginning
  blankPattern.lastIndex = 0;
  
  while ((match = blankPattern.exec(text)) !== null) {
    blanks.push(match[1]); // Extract the blank ID
  }
  
  return blanks;
}

// Helper function to create blank positions from text
export function createBlankPositions(text: string, solutions: Record<string, string>): Array<{ id: string; placeholder: string; solution: string }> {
  const blankIds = extractBlankIds(text);
  
  return blankIds.map(id => ({
    id,
    placeholder: id,
    solution: solutions[id] || ''
  }));
}