'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo, useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
}

// Simplified and reliable regex pattern for math detection
const combinedPattern = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^$\n]+\$|\\\([^)]*\\\)|\*\*[^*]+\*\*)/g;

// Enhanced caching with LRU-like behavior
const MAX_CACHE_SIZE = 1000;
const mathCache = new Map<string, string>();

// Clear cache when it gets too large to prevent memory issues
const clearOldCacheEntries = () => {
  if (mathCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(mathCache.entries());
    const keepEntries = entries.slice(-Math.floor(MAX_CACHE_SIZE * 0.75));
    mathCache.clear();
    keepEntries.forEach(([key, value]) => mathCache.set(key, value));
  }
};

const renderMathExpression = (expression: string, isBlock: boolean): string => {
  const cacheKey = `${expression}-${isBlock}`;
  if (mathCache.has(cacheKey)) {
    return mathCache.get(cacheKey)!;
  }
  
  try {
    // Clean up the expression - remove extra whitespace
    const cleanExpression = expression.trim();
    
    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Rendering LaTeX:', cleanExpression, 'isBlock:', isBlock);
    }
    
    const rendered = katex.renderToString(cleanExpression, {
      throwOnError: false,
      displayMode: isBlock,
      output: 'html',
      strict: false, // Allow more flexible parsing
    });
    
    mathCache.set(cacheKey, rendered);
    clearOldCacheEntries();
    return rendered;
  } catch (error) {
    console.error('KaTeX rendering error for expression:', expression, 'Error:', error);
    
    // Better fallback that preserves mathematical meaning
    const safeFallback = expression
      .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
      .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
      .replace(/\{([^}]+)\}/g, '$1'); // Remove curly braces for subscripts/superscripts
    
    const fallback = `<span class="math-fallback" style="font-style: italic;" title="Math rendering fallback: ${expression}">${safeFallback}</span>`;
    mathCache.set(cacheKey, fallback);
    return fallback;
  }
};

const processText = (text: string): string => {
  if (!text) return '';
  
  // Use replace instead of split to maintain text integrity
  return text.replace(combinedPattern, (match) => {
    try {
      // Handle display math (block)
      if ((match.startsWith('$$') && match.endsWith('$$')) || 
          (match.startsWith('\\[') && match.endsWith('\\]'))) {
        const expression = match.startsWith('$$') 
          ? match.slice(2, -2) 
          : match.slice(2, -2);
        return renderMathExpression(expression, true);
      }
      
      // Handle inline math
      if ((match.startsWith('$') && match.endsWith('$')) || 
          (match.startsWith('\\(') && match.endsWith('\\)'))) {
        const expression = match.startsWith('$') 
          ? match.slice(1, -1) 
          : match.slice(2, -2);
        return renderMathExpression(expression, false);
      }
      
      // Handle bold text
      if (match.startsWith('**') && match.endsWith('**')) {
        return `<strong>${match.slice(2, -2)}</strong>`;
      }
      
      // If no match found, return original text
      return match;
    } catch (error) {
      console.error('Error processing math expression:', match, error);
      return match; // Return original text on error
    }
  });
};

// Memoized component to prevent unnecessary re-renders
export const MathRenderer = React.memo(function MathRenderer({ text }: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderedHtml = useMemo(() => {
    // Always process the text to prevent hydration mismatch
    // On server/initial render, show processed text without KaTeX rendering
    if (!isClient) {
      // Enhanced server-side rendering with better math fallback
      const processedText = text
        // Handle display math blocks
        .replace(/\$\$([\s\S]*?)\$\$/g, (_, content) => {
          const processed = content
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1')
            .replace(/\\\\/g, '<br>'); // Handle line breaks in align environments
          return `<div style="text-align: center; font-style: italic; margin: 1em 0;">${processed}</div>`;
        })
        // Handle display math with \[ \]
        .replace(/\\\[([\s\S]*?)\\\]/g, (_, content) => {
          const processed = content
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1')
            .replace(/\\\\/g, '<br>');
          return `<div style="text-align: center; font-style: italic; margin: 1em 0;">${processed}</div>`;
        })
        // Handle inline math
        .replace(/\$([^$\n]+)\$/g, (_, content) => {
          const processed = content
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1');
          return `<span style="font-style: italic;">${processed}</span>`;
        })
        // Handle inline math with \( \)
        .replace(/\\\(([^)]*)\\\)/g, (_, content) => {
          const processed = content
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1');
          return `<span style="font-style: italic;">${processed}</span>`;
        })
        // Handle bold text
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
      return { __html: processedText };
    }
    return { __html: processText(text) };
  }, [text, isClient]);

  if (!text) {
    return null;
  }
  
  return (
    <span 
      dangerouslySetInnerHTML={renderedHtml} 
      className="math-renderer"
    />
  );
});