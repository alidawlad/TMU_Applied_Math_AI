"use client";

import React from 'react';
import { ErrorBoundary, ErrorFallbackProps, EnhancedErrorInfo } from './ErrorBoundary';
import { AlertTriangle, RefreshCw, Settings, Component } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Component-level error fallback
const ComponentErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  retry,
  retryCount,
  maxRetries,
  config
}) => {
  const canRetry = config.enableRetry && retryCount < maxRetries;
  const componentName = config.name.replace('ErrorBoundary', '');

  return (
    <div className="component-error-boundary border border-red-200 bg-red-50/50 rounded-lg p-4 my-2">
      <div className="space-y-3">
        {/* Error header */}
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <span className="font-medium text-red-800">
            {componentName} Component Error
          </span>
        </div>

        {/* Error message */}
        <Alert variant="destructive">
          <Component className="h-4 w-4" />
          <AlertDescription>
            The {componentName} component encountered an error and couldn't render properly.
          </AlertDescription>
        </Alert>

        {/* Simple error details */}
        <div className="text-sm text-red-700 bg-red-100 p-2 rounded border border-red-200">
          <strong>Error:</strong> {error.message}
        </div>

        {/* Recovery actions */}
        <div className="flex gap-2 pt-2">
          {canRetry && (
            <Button onClick={retry} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
          
          <Button onClick={resetError} variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Retry status */}
        {config.enableRetry && (
          <div className="text-xs text-red-600">
            {canRetry ? (
              <>Retry attempts: {retryCount} of {maxRetries}</>
            ) : (
              <>Component failed to load after {maxRetries} attempts</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Component Error Boundary
interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  componentName: string;
  fallbackMessage?: string;
}

export const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({ 
  children, 
  componentName,
  fallbackMessage = "Component failed to load"
}) => {
  return (
    <ErrorBoundary
      config={{
        name: `${componentName}ErrorBoundary`,
        level: 'component',
        fallbackComponent: ComponentErrorFallback,
        enableRetry: true,
        maxRetries: 2,
        retryDelay: 1000,
        showErrorDetails: process.env.NODE_ENV === 'development',
        isolateErrors: true,
        logErrors: true,
        reportErrors: false, // Component errors are usually not critical
        onError: (errorInfo) => {
          console.warn(`🔧 COMPONENT ERROR BOUNDARY (${componentName}):`, errorInfo);
        },
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ComponentErrorBoundary;