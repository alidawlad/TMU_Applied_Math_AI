"use client";

import React from 'react';
import { ErrorBoundary, ErrorFallbackProps, EnhancedErrorInfo } from './ErrorBoundary';
import { AlertTriangle, RefreshCw, Home, Bug, HelpCircle } from 'lucide-react';
import { OpenSourceFooter } from '@/components/OpenSourceFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Root-level error fallback with comprehensive recovery options
const RootErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  retry,
  retryCount,
  maxRetries,
  config
}) => {
  const isCriticalError = errorInfo?.severity === 'critical';
  const canRetry = config.enableRetry && retryCount < maxRetries && !isCriticalError;

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleClearStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Failed to clear storage:', error);
      window.location.reload();
    }
  };

  const handleReportIssue = () => {
    const errorReport = {
      error: error.message,
      stack: error.stack,
      timestamp: errorInfo?.timestamp,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    const mailtoUrl = `mailto:support@focusedmastery.com?subject=Application Error Report&body=${encodeURIComponent(
      `Please describe what you were doing when this error occurred:\n\n` +
      `Error Details:\n${JSON.stringify(errorReport, null, 2)}`
    )}`;
    
    window.open(mailtoUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Main error card */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">
              {isCriticalError ? 'Critical Application Error' : 'Application Error'}
            </CardTitle>
            <CardDescription className="text-red-600">
              {isCriticalError 
                ? 'A critical error has occurred and the application cannot continue normally.'
                : 'The application encountered an unexpected error. We apologize for the inconvenience.'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error details */}
            <Alert variant="destructive">
              <Bug className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {error.message || 'An unexpected error occurred'}
                {errorInfo?.category && (
                  <span className="block mt-1 text-sm">
                    <strong>Type:</strong> {errorInfo.category} error
                  </span>
                )}
              </AlertDescription>
            </Alert>

            {/* Retry information */}
            {config.enableRetry && (
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                {canRetry ? (
                  <>
                    <strong>Retry Status:</strong> {retryCount} of {maxRetries} attempts used
                  </>
                ) : isCriticalError ? (
                  <>
                    <strong>Status:</strong> Critical error - automatic retry disabled
                  </>
                ) : (
                  <>
                    <strong>Status:</strong> Maximum retry attempts ({maxRetries}) reached
                  </>
                )}
              </div>
            )}

            {/* Recovery options */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-gray-700">Recovery Options:</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {canRetry && (
                  <Button onClick={retry} variant="default" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button onClick={handleReload} variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload Page
                </Button>
                
                <Button onClick={handleGoHome} variant="outline" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home
                </Button>
                
                <Button onClick={handleClearStorage} variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Data & Reload
                </Button>
              </div>
              
              <Button onClick={handleReportIssue} variant="ghost" className="w-full">
                <HelpCircle className="h-4 w-4 mr-2" />
                Report This Issue
              </Button>
            </div>

            {/* Additional help text */}
            <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
              <strong>Need help?</strong> If the error persists, try:
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Refreshing the page or restarting your browser</li>
                <li>Checking your internet connection</li>
                <li>Clearing your browser cache and cookies</li>
                <li>Trying a different browser or device</li>
              </ul>
            </div>

            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-sm">
                <summary className="cursor-pointer font-medium mb-2">Technical Details (Development)</summary>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto whitespace-pre-wrap">
                  <strong>Error Message:</strong> {error.message}
                  {'\n\n'}<strong>Stack Trace:</strong>
                  {'\n'}{error.stack}
                  {errorInfo?.componentStack && (
                    <>
                      {'\n\n'}<strong>Component Stack:</strong>
                      {'\n'}{errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>

        {/* Issue Reporting */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Bug className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">Help Us Improve</h3>
              <p className="text-sm text-blue-700 mb-4">
                This is an open source project. Your feedback helps make it better for everyone.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <a
                  href="https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Bug className="h-4 w-4" />
                  Report This Issue on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Branding footer */}
        <OpenSourceFooter variant="error" showButtons={false} />
      </div>
    </div>
  );
};

// Root Error Boundary Component
interface RootErrorBoundaryProps {
  children: React.ReactNode;
}

export const RootErrorBoundary: React.FC<RootErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary
      config={{
        name: 'RootErrorBoundary',
        level: 'root',
        fallbackComponent: RootErrorFallback,
        enableRetry: true,
        maxRetries: 2,
        retryDelay: 2000,
        showErrorDetails: process.env.NODE_ENV === 'development',
        isolateErrors: false, // Root boundary should not isolate errors
        logErrors: true,
        reportErrors: true,
        onError: (errorInfo) => {
          // Custom logging for root-level errors
          console.error('🚨 ROOT ERROR BOUNDARY TRIGGERED:', errorInfo);
          
          // In production, you might want to send this to a monitoring service
          if (process.env.NODE_ENV === 'production') {
            // Example: Send to error tracking service
            // trackError('root_error_boundary', errorInfo);
          }
        },
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;