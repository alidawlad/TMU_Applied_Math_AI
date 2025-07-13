'use client';

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
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
  
  if (!isClient) {
    // Render plain text on the server to avoid mismatch
    return <>{text.replace(/\$/g, '')}</>;
  }

  // Regex to find content between single dollar signs (non-greedy)
  // It will match $math content$ but not stand-alone $ signs for currency.
  const regex = /\$(.*?)\$/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        // Matched math content will be at odd indices
        if (index % 2 === 1) {
          try {
            return <InlineMath key={index} math={part} />;
          } catch (e) {
            console.error("KaTeX parsing error:", e);
            // Fallback for invalid math
            return <React.Fragment key={index}>${part}$</React.Fragment>;
          }
        }
        // Regular text parts will be at even indices
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
