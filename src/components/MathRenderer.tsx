'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo } from 'react';

interface MathRendererProps {
  text: string;
}

const cleanMathString = (str: string, len: number) => {
  return str.substring(len, str.length - len);
};

// This regex handles both $...$ and \(...\) for inline math,
// and $$...$$ or \[...\] for block math. It avoids matching
// escaped delimiters like \\$
const mathRegex = /(\\\(.*?\\\)|(?<!\\)\$.+?(?<!\\)\$|\\\[.+?\\]|(?<!\\)\$\$.+?(?<!\\)\$\$)/g;

const renderToString = (text: string) => {
  const parts = text.split(mathRegex);

  return parts
    .map((part, index) => {
      if (index % 2 === 1) { // It's a math part
        let isBlock = false;
        let math = part;

        if ((math.startsWith('$$') && math.endsWith('$$')) || (math.startsWith('\\[') && math.endsWith('\\]'))) {
          isBlock = true;
          math = cleanMathString(math, 2);
        } else if (math.startsWith('$') && math.endsWith('$')) {
          math = cleanMathString(math, 1);
        } else if (math.startsWith('\\(') && math.endsWith('\\)')) {
          math = cleanMathString(math, 2);
        }

        try {
          return katex.renderToString(math, {
            throwOnError: false,
            displayMode: isBlock,
            output: 'html',
          });
        } catch (e) {
          console.error("KaTeX parsing error:", e, "on part:", part);
          return `<span class="text-red-500">${part}</span>`;
        }
      }
      return part; // It's a regular text part
    })
    .join('');
};

export function MathRenderer({ text }: MathRendererProps) {
  const renderedHtml = useMemo(() => {
    if (typeof window === 'undefined') {
      // SSR: Return a simplified version for SSR to avoid hydration errors
      return { __html: text.replace(/\$|\\\(|\\\)|\\\[|\\\]|\\cdot/g, '') };
    }
    return { __html: renderToString(text) };
  }, [text]);

  if (!text) {
    return null;
  }
  
  return <span dangerouslySetInnerHTML={renderedHtml} />;
}
