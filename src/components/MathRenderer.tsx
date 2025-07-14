'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo } from 'react';

interface MathRendererProps {
  text: string;
}

// This regex handles both $...$ and \(...\) for inline math,
// and $$...$$ or \[...\] for block math. It avoids matching
// an escaped dollar sign like \\$.
const mathRegex = /(\\\(.*?\\\)|(?<!\\)\$.+?(?<!\\)\$|\\\[.+?\\]|(?<!\\)\$\$.+?(?<!\\)\$\$)/g;

const renderToString = (text: string) => {
  try {
    const parts = text.split(mathRegex);

    return parts
      .map((part, index) => {
        if (!part) return '';
        // Every odd-indexed part is a math expression
        if (index % 2 === 1) {
          let isBlock = false;
          let math = part;

          // Determine if it's block or inline and remove delimiters
          if (math.startsWith('$$') && math.endsWith('$$')) {
            isBlock = true;
            math = math.substring(2, math.length - 2);
          } else if (math.startsWith('\\[') && math.endsWith('\\]')) {
            isBlock = true;
            math = math.substring(2, math.length - 2);
          } else if (math.startsWith('$') && math.endsWith('$')) {
            math = math.substring(1, math.length - 1);
          } else if (math.startsWith('\\(') && math.endsWith('\\)')) {
            math = math.substring(2, math.length - 2);
          }

          // Render with KaTeX
          return katex.renderToString(math, {
            throwOnError: false,
            displayMode: isBlock,
            output: 'html',
          });
        }
        // It's a regular text part, un-escape any `\$` sequences
        return part.replace(/\\\$/g, '$');
      })
      .join('');
  } catch (e) {
      console.error("KaTeX rendering error:", e);
      // Fallback to show the original text with an error style
      return `<span style="color: red;">${text}</span>`;
  }
};

export function MathRenderer({ text }: MathRendererProps) {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const renderedHtml = useMemo(() => {
    if (!isClient) {
      // For server-side rendering and initial client render,
      // return a simplified version to avoid hydration mismatch.
      // A simple replace is safe here before client-side KaTeX takes over.
      const simplifiedText = text.replace(/\$|\\\(|\\\)|\\\[|\\\]|\\cdot|\\mathbb|\\to|\\in|\\/g, '');
      return { __html: simplifiedText };
    }
    // On the client, render the full KaTeX output
    return { __html: renderToString(text) };
  }, [text, isClient]);

  if (!text) {
    return null;
  }
  
  return <span dangerouslySetInnerHTML={renderedHtml} />;
}
