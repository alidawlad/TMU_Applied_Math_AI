'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo, useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
}

const combinedPattern = /(\$\$[^$]+\$\$|\\\[[^\]]+\\\]|(?<!\w)\$[^$\d][^$]*\$(?!\w)|\\\([^\)]+\\\)|\*\*([^*]+)\*\*)/g;
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
    const rendered = katex.renderToString(expression, {
      throwOnError: false,
      displayMode: isBlock,
      output: 'html',
    });
    mathCache.set(cacheKey, rendered);
    clearOldCacheEntries();
    return rendered;
  } catch (error) {
    console.error('KaTeX rendering error:', error);
    // Add title for better UX
    const fallback = `<span class="math-error" style="color: #dc2626; font-family: monospace;" title="Math rendering error">${expression}</span>`;
    mathCache.set(cacheKey, fallback);
    return fallback;
  }
};

const processText = (text: string): string => {
  if (!text) return '';
  return text.split(combinedPattern).map((part) => {
    if (!part) return '';
    if (part.match(combinedPattern)) {
      if ((part.startsWith('$$') && part.endsWith('$$')) || (part.startsWith('\\[') && part.endsWith('\\]'))) {
        const expression = part.substring(2, part.length - 2);
        return renderMathExpression(expression, true);
      }
      if ((part.startsWith('$') && part.endsWith('$')) || (part.startsWith('\\(') && part.endsWith('\\)'))) {
        const expression = part.substring(part.startsWith('$') ? 1 : 2, part.length - (part.endsWith('$') ? 1 : 2));
        return renderMathExpression(expression, false);
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return `<strong>${part.substring(2, part.length - 2)}</strong>`;
      }
    }
    return part;
  }).join('');
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
      // For server-side rendering, return the text with basic HTML processing
      // This prevents hydration mismatch while showing readable content
      return { 
        __html: text
          .replace(/\$\$([^$]+)\$\$/g, '<em>$1</em>')
          .replace(/\\\[([^\]]+)\\\]/g, '<em>$1</em>')
          .replace(/\$([^$]+)\$/g, '<em>$1</em>')
          .replace(/\\\(([^\)]+)\\\)/g, '<em>$1</em>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      };
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