"use client";

import React from 'react';
import { ErrorBoundary, ErrorFallbackProps, EnhancedErrorInfo } from './ErrorBoundary';
import { AlertTriangle, RefreshCw, Calculator, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Math-specific error fallback component
const MathErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  retry,
  retryCount,
  maxRetries,
  config
}) => {
  const [showRawExpression, setShowRawExpression] = useState(false);
  const canRetry = config.enableRetry && retryCount < maxRetries;
  
  // Extract math expression from error context if available
  const mathExpression = errorInfo?.context?.mathExpression || 
                         errorInfo?.context?.expression || 
                         'Unknown expression';

  const getErrorGuidance = () => {
    const errorMsg = error.message.toLowerCase();
    
    if (errorMsg.includes('katex') || errorMsg.includes('latex')) {
      return {
        title: 'LaTeX Rendering Error',
        description: 'The mathematical expression contains invalid LaTeX syntax.',
        suggestions: [
          'Check for unmatched braces { }',
          'Ensure proper LaTeX command syntax',
          'Verify all mathematical symbols are properly formatted',
        ]
      };
    }
    
    if (errorMsg.includes('parse') || errorMsg.includes('syntax')) {
      return {
        title: 'Math Expression Parsing Error',
        description: 'The mathematical expression could not be parsed correctly.',
        suggestions: [
          'Check for missing or extra parentheses',
          'Ensure proper mathematical notation',
          'Verify all variables and operators are valid',
        ]
      };
    }
    
    if (errorMsg.includes('undefined') || errorMsg.includes('null')) {
      return {
        title: 'Missing Math Expression',
        description: 'The mathematical expression is missing or undefined.',
        suggestions: [
          'The expression may not have loaded properly',
          'Try refreshing the page',
          'Check your network connection',
        ]
      };
    }
    
    return {
      title: 'Math Rendering Error',
      description: 'An unexpected error occurred while rendering the mathematical expression.',
      suggestions: [
        'Try refreshing the page',
        'The expression may contain unsupported notation',
        'Report this issue if it persists',
      ]
    };
  };

  const errorGuidance = getErrorGuidance();

  return (
    <div className="math-error-boundary border-2 border-dashed border-orange-300 bg-orange-50/50 rounded-lg p-4 my-2">
      <div className="space-y-3">
        {/* Error header */}
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <span className="font-medium text-orange-800">{errorGuidance.title}</span>
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            Math Error
          </Badge>
        </div>

        {/* Error description */}
        <p className="text-sm text-orange-700">
          {errorGuidance.description}
        </p>

        {/* Math expression display */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Expression:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRawExpression(!showRawExpression)}
              className="h-6 px-2 text-xs"
            >
              {showRawExpression ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              {showRawExpression ? 'Hide' : 'Show'} Raw
            </Button>
          </div>
          
          <div className="bg-orange-100 p-2 rounded text-sm font-mono border border-orange-200">
            {showRawExpression ? mathExpression : 
             mathExpression.length > 100 ? `${mathExpression.substring(0, 100)}...` : mathExpression}
          </div>
        </div>

        {/* Error suggestions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-orange-800">Possible solutions:</p>
          <ul className="text-sm text-orange-700 space-y-1">
            {errorGuidance.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          {canRetry && (
            <Button onClick={retry} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Render
            </Button>
          )}
          
          <Button onClick={resetError} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Retry status */}
        {config.enableRetry && (
          <div className="text-xs text-orange-600">
            {canRetry ? (
              <>Retry attempts: {retryCount} of {maxRetries}</>
            ) : (
              <>Maximum retry attempts reached</>
            )}
          </div>
        )}

        {/* Development details */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-xs">
            <summary className="cursor-pointer font-medium text-orange-800">
              Technical Details
            </summary>
            <pre className="mt-2 bg-orange-100 p-2 rounded text-xs overflow-auto border border-orange-200">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

// Math Error Boundary Component
interface MathErrorBoundaryProps {
  children: React.ReactNode;
  mathExpression?: string;
  fallbackText?: string;
}

export const MathErrorBoundary: React.FC<MathErrorBoundaryProps> = ({ 
  children, 
  mathExpression,
  fallbackText = "Mathematical expression failed to render"
}) => {
  return (
    <ErrorBoundary
      config={{
        name: 'MathErrorBoundary',
        level: 'feature',
        fallbackComponent: MathErrorFallback,
        enableRetry: true,
        maxRetries: 2,
        retryDelay: 500,
        showErrorDetails: process.env.NODE_ENV === 'development',
        isolateErrors: true,
        logErrors: true,
        reportErrors: false, // Math errors are usually not critical
        onError: (errorInfo) => {
          console.warn('🔢 MATH ERROR BOUNDARY:', errorInfo);
          
          // Add math-specific context
          if (errorInfo.context) {
            errorInfo.context.mathExpression = mathExpression;
            errorInfo.context.fallbackText = fallbackText;
          }
        },
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

// Simple inline math error fallback
export const InlineMathErrorFallback: React.FC<{ 
  expression: string; 
  error?: Error;
}> = ({ expression, error }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <span 
      className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm border border-orange-200"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      title={error ? `Math Error: ${error.message}` : 'Math rendering failed'}
    >
      <AlertTriangle className="h-3 w-3" />
      <span className="font-mono text-xs">
        {expression.length > 20 ? `${expression.substring(0, 20)}...` : expression}
      </span>
    </span>
  );
};

export default MathErrorBoundary;