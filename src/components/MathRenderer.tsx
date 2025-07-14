'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo, useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
}

// Regex to find math expressions or Markdown bold
const combinedPattern = /(\$\$[^$]+\$\$|\\\[[^\]]+\\\]|\$[^$]+\$|\\\([^\)]+\\\)|\*\*([^*]+)\*\*)/g;

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

const processTextWithMarkdown = (text: string, isClient: boolean): string => {
  if (!text) return '';

  const parts = text.split(combinedPattern);
  
  return parts.map((part, index) => {
    if (!part) return '';
    
    // Check if the part is a math or bold expression
    if (part.match(combinedPattern)) {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const expression = part.substring(2, part.length - 2);
        return isClient ? renderMathExpression(expression, true) : `<span class="math-placeholder-block">${expression}</span>`;
      }
      if (part.startsWith('\\[') && part.endsWith('\\]')) {
        const expression = part.substring(2, part.length - 2);
        return isClient ? renderMathExpression(expression, true) : `<span class="math-placeholder-block">${expression}</span>`;
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        const expression = part.substring(1, part.length - 1);
        return isClient ? renderMathExpression(expression, false) : `<span class="math-placeholder-inline">${expression}</span>`;
      }
      if (part.startsWith('\\(') && part.endsWith('\\)')) {
        const expression = part.substring(2, part.length - 2);
        return isClient ? renderMathExpression(expression, false) : `<span class="math-placeholder-inline">${expression}</span>`;
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.substring(2, part.length - 2);
        return `<strong>${content}</strong>`;
      }
    }
    
    // It's a regular text part
    return part;
  }).join('');
};

export function MathRenderer({ text }: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderedHtml = useMemo(() => {
    const processedText = processTextWithMarkdown(text, isClient);
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
