
'use client';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import React, { useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
}

export function MathRenderer({ text }: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!text) {
    return null;
  }

  // Regex to handle both $...$ and \(...\) for inline math, and $$...$$ or \[...\] for block math
  const mathRegex = /(\\\(.*?\\\)|(?<!\\)\$.*?(?<!\\)\$|\\\[.*?\\]|(?<!\\)\$\$.*?(?<!\\)\$\$)/g;

  const renderMath = (mathString: string, key: number) => {
    let cleanMath = mathString;
    // Check for block math delimiters first
    if (cleanMath.startsWith('$$') && cleanMath.endsWith('$$')) {
      cleanMath = clean_math_string(cleanMath, 2);
      return <BlockMath key={key} math={cleanMath} errorColor={"#ef4444"} />;
    }
    if (cleanMath.startsWith('\\[') && cleanMath.endsWith('\\]')) {
      cleanMath = clean_math_string(cleanMath, 2);
      return <BlockMath key={key} math={cleanMath} errorColor={"#ef4444"} />;
    }
    // Check for inline math delimiters
    if (cleanMath.startsWith('$') && cleanMath.endsWith('$')) {
      cleanMath = clean_math_string(cleanMath, 1);
      return <InlineMath key={key} math={cleanMath} errorColor={"#ef4444"} />;
    }
    if (cleanMath.startsWith('\\(') && cleanMath.endsWith('\\)')) {
      cleanMath = clean_math_string(cleanMath, 2);
      return <InlineMath key={key} math={cleanMath} errorColor={"#ef4444"} />;
    }
    // Fallback for identified but improperly delimited strings
    return <span key={key}>{mathString}</span>;
  };

  const clean_math_string = (str: string, len: number) => {
    return str.substring(len, str.length - len);
  }

  const parts = text.split(mathRegex);
  
  if (!isClient) {
    // Return a simplified version for SSR to avoid hydration errors
    return <>{text.replace(/\$|\\\(|\\\)|\\\[|\\\]|\\cdot/g, '')}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // Matched math content
          try {
            return renderMath(part, index);
          } catch (e) {
            console.error("KaTeX parsing error:", e, "on part:", part);
            return <span key={index} className="text-red-500">{part}</span>;
          }
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

    