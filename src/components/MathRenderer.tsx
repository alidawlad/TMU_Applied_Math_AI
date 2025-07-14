'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo, useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
}

// Improved regex for better math parsing
const MATH_PATTERNS = {
  blockMath: /\$\$([^$]+)\$\$/g,
  inlineMath: /\$([^$]+)\$/g,
  blockBrackets: /\\\[([^\]]+)\\\]/g,
  inlineBrackets: /\\\(([^\)]+)\\\)/g
};

// Cache for rendered math expressions
const mathCache = new Map<string, string>();

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
    return rendered;
  } catch (error) {
    console.error('KaTeX rendering error:', error);
    const fallback = `<span class="math-error" style="color: #dc2626; font-family: monospace;">${expression}</span>`;
    mathCache.set(cacheKey, fallback);
    return fallback;
  }
};

const createPlaceholder = (expression: string, isBlock: boolean): string => {
  const className = isBlock ? 'math-placeholder-block' : 'math-placeholder-inline';
  return `<span class="${className}" style="font-family: monospace; opacity: 0.7;">${expression}</span>`;
};

const processText = (text: string, isClient: boolean): string => {
  if (!text) return '';

  let result = text;
  
  // Process block math first ($$...$$ and \[...\])
  result = result.replace(MATH_PATTERNS.blockMath, (match, expression) => {
    return isClient 
      ? renderMathExpression(expression, true)
      : createPlaceholder(expression, true);
  });

  result = result.replace(MATH_PATTERNS.blockBrackets, (match, expression) => {
    return isClient 
      ? renderMathExpression(expression, true)
      : createPlaceholder(expression, true);
  });

  // Process inline math ($...$ and \(...\))
  result = result.replace(MATH_PATTERNS.inlineMath, (match, expression) => {
    return isClient 
      ? renderMathExpression(expression, false)
      : createPlaceholder(expression, false);
  });

  result = result.replace(MATH_PATTERNS.inlineBrackets, (match, expression) => {
    return isClient 
      ? renderMathExpression(expression, false)
      : createPlaceholder(expression, false);
  });

  return result;
};

export function MathRenderer({ text }: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderedHtml = useMemo(() => {
    const processedText = processText(text, isClient);
    return { __html: processedText };
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
}
