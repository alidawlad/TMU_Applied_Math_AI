/**
 * Error Boundary Components
 * Comprehensive error handling system for the TMU Applied Math Mastery AI application
 */

import React from 'react';

// Core error boundary
export { ErrorBoundary, createErrorBoundary } from './ErrorBoundary';
export type { ErrorFallbackProps, ErrorBoundaryConfig } from './ErrorBoundary';

// Specialized error boundaries
export { RootErrorBoundary } from './RootErrorBoundary';
export { PageErrorBoundary } from './PageErrorBoundary';
export { ComponentErrorBoundary } from './ComponentErrorBoundary';
export { MathErrorBoundary, InlineMathErrorFallback } from './MathErrorBoundary';
export { AIErrorBoundary, InlineAIErrorFallback } from './AIErrorBoundary';

// Convenience exports for common configurations
// export { createErrorBoundary as withErrorBoundary };

// Common error boundary configurations
export const commonErrorBoundaryConfigs = {
  component: {
    name: 'ComponentErrorBoundary',
    level: 'component' as const,
    enableRetry: true,
    maxRetries: 2,
    retryDelay: 1000,
    isolateErrors: true,
    logErrors: true,
    reportErrors: false,
  },
  
  feature: {
    name: 'FeatureErrorBoundary',
    level: 'feature' as const,
    enableRetry: true,
    maxRetries: 3,
    retryDelay: 1500,
    isolateErrors: true,
    logErrors: true,
    reportErrors: true,
  },
  
  math: {
    name: 'MathErrorBoundary',
    level: 'feature' as const,
    enableRetry: true,
    maxRetries: 2,
    retryDelay: 500,
    isolateErrors: true,
    logErrors: true,
    reportErrors: false,
  },
  
  ai: {
    name: 'AIErrorBoundary',
    level: 'feature' as const,
    enableRetry: true,
    maxRetries: 3,
    retryDelay: 2000,
    isolateErrors: true,
    logErrors: true,
    reportErrors: true,
  },
};

// HOC for wrapping components with error boundaries
export function withComponentErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  const { ComponentErrorBoundary } = require('./ComponentErrorBoundary');
  
  return function WrappedComponent(props: P) {
    return React.createElement(
      ComponentErrorBoundary,
      { componentName },
      React.createElement(Component, props)
    );
  };
}

// Hook for error boundary context (future enhancement)
export function useErrorBoundary() {
  return {
    captureError: (error: Error, errorInfo?: any) => {
      // This would trigger the nearest error boundary
      // Implementation would depend on error boundary context
      throw error;
    },
    
    clearError: () => {
      // This would reset the error boundary state
      // Implementation would depend on error boundary context
      console.log('Error boundary cleared');
    },
  };
}