'use client';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import React, { useState, useEffect } from 'react';

interface MathRendererProps {
  text: string;
  inline?: boolean;
}

export function MathRenderer({ text, inline = true }: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!text) {
    return null;
  }

  // A more robust regex to handle both $...$ and \(...\) for inline math
  const inlineRegex = /(\\\(.*?\\\)|(?<!\\)\$.*?(?<!\\)\$)/g;
  
  // Regex for block math using $$...$$ or \[...\]
  const blockRegex = /(\\\[.*?\\]|(?<!\\)\$\$.*?(?<!\\)\$\$)/g;

  const renderMath = (mathString: string) => {
    // Trim delimiters
    let cleanMath = mathString;
    if (cleanMath.startsWith('$') && cleanMath.endsWith('$')) {
        cleanMath = cleanMath.substring(1, cleanMath.length - 1);
        if (cleanMath.startsWith('$') && cleanMath.endsWith('$')) {
            cleanMath = cleanMath.substring(1, cleanMath.length - 1);
            return <BlockMath math={cleanMath} errorColor={"#ef4444"} />;
        }
        return <InlineMath math={cleanMath} errorColor={"#ef4444"} />;
    }
    if (cleanMath.startsWith('\\(') && cleanMath.endsWith('\\)')) {
      cleanMath = cleanMath.substring(2, cleanMath.length - 2);
      return <InlineMath math={cleanMath} errorColor={"#ef4444"} />;
    }
    if (cleanMath.startsWith('\\[') && cleanMath.endsWith('\\]')) {
      cleanMath = cleanMath.substring(2, cleanMath.length - 2);
      return <BlockMath math={cleanMath} errorColor={"#ef4444"} />;
    }
    return <InlineMath math={cleanMath} errorColor={"#ef4444"} />;
  };
  
  const regex = inline ? inlineRegex : blockRegex;
  const parts = text.split(regex);
  
  if (!isClient) {
    return <>{text.replace(/\$|\\\(|\\\)|\\\[|\\\]/g, '')}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // Matched math content
          try {
            return <span key={index}>{renderMath(part)}</span>;
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