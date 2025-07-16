'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import React, { useMemo, useState, useEffect } from 'react';
import { MathErrorBoundary } from '@/components/error-boundaries/MathErrorBoundary';

interface MathRendererProps {
  text: string;
  className?: string;
  containerType?: 'auto' | 'inline' | 'display';
  enableOverflowScroll?: boolean;
  onError?: (error: Error, expression: string) => void;
}

// Simplified and reliable regex pattern for math detection
const combinedPattern = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^$\n]+\$|\\\([^)]*\\\)|\*\*[^*]+\*\*)/g;

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

const renderMathExpression = (expression: string, isBlock: boolean, onError?: (error: Error, expression: string) => void): string => {
  const cacheKey = `${expression}-${isBlock}`;
  if (mathCache.has(cacheKey)) {
    return mathCache.get(cacheKey)!;
  }
  
  try {
    // Clean up the expression - remove extra whitespace and normalize
    const cleanExpression = expression.trim()
      .replace(/\s+/g, ' ') // Normalize multiple spaces
      .replace(/\\\s+/g, '\\'); // Remove spaces after backslashes
    
    // Enhanced validation
    if (!cleanExpression) {
      throw new Error('Empty math expression');
    }
    
    // Check for common problematic patterns
    const problematicPatterns = [
      /\\[a-zA-Z]+\{[^}]*$/,  // Unclosed braces
      /\{[^}]*$/,              // Unclosed braces
      /\\\\\s*$/,            // Trailing backslashes
    ];
    
    for (const pattern of problematicPatterns) {
      if (pattern.test(cleanExpression)) {
        throw new Error('Malformed LaTeX expression detected');
      }
    }
    
    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Rendering LaTeX:', cleanExpression, 'isBlock:', isBlock);
    }
    
    const rendered = katex.renderToString(cleanExpression, {
      throwOnError: false,
      displayMode: isBlock,
      output: 'html',
      strict: false, // Allow more flexible parsing
      trust: false, // Security measure
      macros: {
        // Add common macros for better compatibility
        '\\RR': '\\mathbb{R}',
        '\\NN': '\\mathbb{N}',
        '\\ZZ': '\\mathbb{Z}',
        '\\QQ': '\\mathbb{Q}',
        '\\CC': '\\mathbb{C}',
      },
    });
    
    mathCache.set(cacheKey, rendered);
    clearOldCacheEntries();
    return rendered;
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    
    // Enhanced error logging with more context
    if (process.env.NODE_ENV === 'development') {
      console.group('🔬 Math Rendering Error');
      console.warn('Expression:', expression);
      console.warn('Clean expression:', expression.trim());
      console.warn('Is block:', isBlock);
      console.warn('Error:', errorObj.message);
      console.warn('Stack:', errorObj.stack);
      console.groupEnd();
    }
    
    // Call error callback if provided
    if (onError) {
      onError(errorObj, expression);
    }
    
    // Enhanced fallback rendering with better mathematical notation handling
    const safeFallback = expression
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)') // Fractions
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)') // Square roots
      .replace(/\\sum/g, '∑') // Summation
      .replace(/\\int/g, '∫') // Integral
      .replace(/\\infty/g, '∞') // Infinity
      .replace(/\\pm/g, '±') // Plus-minus
      .replace(/\\cdot/g, '·') // Multiplication dot
      .replace(/\\times/g, '×') // Multiplication cross
      .replace(/\\div/g, '÷') // Division
      .replace(/\\leq/g, '≤') // Less than or equal
      .replace(/\\geq/g, '≥') // Greater than or equal
      .replace(/\\neq/g, '≠') // Not equal
      .replace(/\\approx/g, '≈') // Approximately equal
      .replace(/\\alpha/g, 'α') // Greek letters
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\pi/g, 'π')
      .replace(/\\sigma/g, 'σ')
      .replace(/\\tau/g, 'τ')
      .replace(/\\phi/g, 'φ')
      .replace(/\\omega/g, 'ω')
      .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>') // Subscripts
      .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>') // Superscripts
      .replace(/\{([^}]+)\}/g, '$1') // Remove remaining braces
      .replace(/\\{/g, '{') // Escaped braces
      .replace(/\\}/g, '}') // Escaped braces
      .replace(/\\,/g, ' ') // Thin space
      .replace(/\\\s/g, ' ') // Regular space
      .replace(/\\\\\s*/g, '\n') // Line breaks
      .replace(/\\[a-zA-Z]+/g, (match) => {
        // Handle remaining LaTeX commands
        return match.replace(/\\/g, '').toUpperCase();
      });
    
    const fallbackHtml = isBlock 
      ? `<div class="math-error" title="Math rendering error: ${errorObj.message}\nOriginal: ${expression}">${safeFallback}</div>`
      : `<span class="math-fallback" title="Math rendering fallback: ${errorObj.message}\nOriginal: ${expression}">${safeFallback}</span>`;
    
    mathCache.set(cacheKey, fallbackHtml);
    return fallbackHtml;
  }
};

const processText = (text: string, onError?: (error: Error, expression: string) => void): string => {
  if (!text) return '';
  
  // Use replace instead of split to maintain text integrity
  return text.replace(combinedPattern, (match) => {
    try {
      // Handle display math (block)
      if ((match.startsWith('$$') && match.endsWith('$$')) || 
          (match.startsWith('\\[') && match.endsWith('\\]'))) {
        const expression = match.startsWith('$$') 
          ? match.slice(2, -2) 
          : match.slice(2, -2);
        return renderMathExpression(expression, true, onError);
      }
      
      // Handle inline math
      if ((match.startsWith('$') && match.endsWith('$')) || 
          (match.startsWith('\\(') && match.endsWith('\\)'))) {
        const expression = match.startsWith('$') 
          ? match.slice(1, -1) 
          : match.slice(2, -2);
        return renderMathExpression(expression, false, onError);
      }
      
      // Handle bold text
      if (match.startsWith('**') && match.endsWith('**')) {
        return `<strong>${match.slice(2, -2)}</strong>`;
      }
      
      // If no match found, return original text
      return match;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Error processing math expression:', match, errorObj);
      }
      
      if (onError) {
        onError(errorObj, match);
      }
      
      return match; // Return original text on error
    }
  });
};

// Memoized component to prevent unnecessary re-renders
export const MathRenderer = React.memo(function MathRenderer({ 
  text, 
  className = '', 
  containerType = 'auto',
  enableOverflowScroll = true,
  onError 
}: MathRendererProps) {
  const [isClient, setIsClient] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [hasLongExpressions, setHasLongExpressions] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Enhanced error handler with state tracking
  const handleError = useMemo(() => {
    return (error: Error, expression: string) => {
      setErrorCount(prev => prev + 1);
      
      if (process.env.NODE_ENV === 'development') {
        console.group('🚨 MathRenderer Error');
        console.warn('Component props:', { text, className, containerType, enableOverflowScroll });
        console.warn('Expression:', expression);
        console.warn('Error:', error.message);
        console.warn('Error count:', errorCount + 1);
        console.groupEnd();
      }
      
      // Call user-provided error handler
      if (onError) {
        onError(error, expression);
      }
    };
  }, [text, className, containerType, enableOverflowScroll, onError, errorCount]);

  // Check for long expressions that might need scrolling
  useEffect(() => {
    if (isClient && enableOverflowScroll) {
      const hasLong = /\$\$[\s\S]{50,}\$\$|\\\[[\s\S]{50,}\\\]|\$[^$\n]{30,}\$/.test(text);
      setHasLongExpressions(hasLong);
    }
  }, [text, isClient, enableOverflowScroll]);

  const renderedHtml = useMemo(() => {
    // Always process the text to prevent hydration mismatch
    // On server/initial render, show processed text without KaTeX rendering
    if (!isClient) {
      // Enhanced server-side rendering with better math fallback
      const processedText = text
        // Handle display math blocks
        .replace(/\$\$([\s\S]*?)\$\$/g, (_, content) => {
          const processed = content
            .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
            .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
            .replace(/\\sum/g, '∑')
            .replace(/\\int/g, '∫')
            .replace(/\\infty/g, '∞')
            .replace(/\\pi/g, 'π')
            .replace(/\\alpha/g, 'α')
            .replace(/\\beta/g, 'β')
            .replace(/\\gamma/g, 'γ')
            .replace(/\\delta/g, 'δ')
            .replace(/\\theta/g, 'θ')
            .replace(/\\lambda/g, 'λ')
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1')
            .replace(/\\\\/g, '<br>'); // Handle line breaks in align environments
          return `<div class="math-container-display"><div style="text-align: center; font-style: italic; margin: var(--math-spacing-display) 0; font-size: var(--math-font-size-display);">${processed}</div></div>`;
        })
        // Handle display math with \[ \]
        .replace(/\\\[([\s\S]*?)\\\]/g, (_, content) => {
          const processed = content
            .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
            .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
            .replace(/\\sum/g, '∑')
            .replace(/\\int/g, '∫')
            .replace(/\\infty/g, '∞')
            .replace(/\\pi/g, 'π')
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1')
            .replace(/\\\\/g, '<br>');
          return `<div class="math-container-display"><div style="text-align: center; font-style: italic; margin: var(--math-spacing-display) 0; font-size: var(--math-font-size-display);">${processed}</div></div>`;
        })
        // Handle inline math
        .replace(/\$([^$\n]+)\$/g, (_, content) => {
          const processed = content
            .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
            .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
            .replace(/\\pi/g, 'π')
            .replace(/\\alpha/g, 'α')
            .replace(/\\beta/g, 'β')
            .replace(/\\gamma/g, 'γ')
            .replace(/\\delta/g, 'δ')
            .replace(/\\theta/g, 'θ')
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1');
          return `<span class="math-container-inline"><span style="font-style: italic; font-size: var(--math-font-size-inline);">${processed}</span></span>`;
        })
        // Handle inline math with \( \)
        .replace(/\\\(([^)]*)\\\)/g, (_, content) => {
          const processed = content
            .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
            .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
            .replace(/\\pi/g, 'π')
            .replace(/_(\{[^}]+\}|\w)/g, '<sub>$1</sub>')
            .replace(/\^(\{[^}]+\}|\w)/g, '<sup>$1</sup>')
            .replace(/\{([^}]+)\}/g, '$1');
          return `<span class="math-container-inline"><span style="font-style: italic; font-size: var(--math-font-size-inline);">${processed}</span></span>`;
        })
        // Handle bold text
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
      return { __html: processedText };
    }
    
    // Client-side rendering with full KaTeX support
    return { __html: processText(text, handleError) };
  }, [text, isClient, handleError]);

  // Determine container classes based on props and content analysis
  const getContainerClasses = () => {
    const baseClasses = ['math-renderer'];
    
    if (className) {
      baseClasses.push(className);
    }
    
    if (enableOverflowScroll) {
      baseClasses.push('math-overflow-enabled');
    }
    
    if (hasLongExpressions) {
      baseClasses.push('math-has-long-expressions');
    }
    
    if (errorCount > 0) {
      baseClasses.push('math-has-errors');
    }
    
    return baseClasses.join(' ');
  };

  if (!text) {
    return null;
  }
  
  // Wrap in appropriate container based on containerType
  const containerClass = containerType === 'auto' 
    ? 'math-container' 
    : `math-container-${containerType}`;
  
  return (
    <MathErrorBoundary 
      mathExpression={text}
      fallbackText={text}
    >
      <span 
        className={`${containerClass} ${getContainerClasses()}`}
        dangerouslySetInnerHTML={renderedHtml}
        role="img"
        aria-label={`Mathematical expression: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`}
        {...(errorCount > 0 && { 'data-error-count': errorCount })}
        {...(hasLongExpressions && { 'data-has-long-expressions': 'true' })}
      />
    </MathErrorBoundary>
  );
});