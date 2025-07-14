'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo, useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
}

const combinedPattern = /(\$\$[^$]+\$\$|\\\[[^\]]+\\\]|\$[^$]+\$|\\\([^\)]+\\\)|\*\*([^*]+)\*\*)/g;
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
    return `<span class="math-error" style="color: #dc2626; font-family: monospace;">${expression}</span>`;
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

export function MathRenderer({ text }: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderedHtml = useMemo(() => {
    // Only process the text if we are on the client
    return isClient ? { __html: processText(text) } : { __html: '' };
  }, [text, isClient]);

  if (!text || !isClient) {
    // Render nothing on the server or during the initial client render
    return null;
  }
  
  return (
    <span 
      dangerouslySetInnerHTML={renderedHtml} 
      className="math-renderer"
    />
  );
}