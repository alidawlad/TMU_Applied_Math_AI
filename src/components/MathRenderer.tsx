'use client';

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import React from 'react';

interface MathRendererProps {
  text: string;
}

export function MathRenderer({ text }: MathRendererProps) {
  if (!text) {
    return null;
  }
  
  const parts = text.split('$');

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          try {
            return <InlineMath key={index} math={part} />;
          } catch (e) {
            console.error("KaTeX parsing error:", e);
            return <React.Fragment key={index}>${part}$</React.Fragment>;
          }
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
