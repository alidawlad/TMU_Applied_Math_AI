"use client";

import React from 'react';
import { ErrorBoundary, ErrorFallbackProps, EnhancedErrorInfo } from './ErrorBoundary';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

// Page-level error fallback with navigation options
const PageErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  retry,
  retryCount,
  maxRetries,
  config
}) => {
  const canRetry = config.enableRetry && retryCount < maxRetries;
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const getPageTitle = () => {
    if (currentPath.includes('/practice')) return 'Practice Page';
    if (currentPath.includes('/study-plan')) return 'Study Plan';
    if (currentPath.includes('/study')) return 'Study Mode';
    return 'Page';
  };

  const getRecoveryMessage = () => {
    if (errorInfo?.category === 'network') {
      return 'This appears to be a network-related issue. Please check your internet connection and try again.';
    }
    if (errorInfo?.category === 'storage') {
      return 'There was an issue with data storage. Your progress may not be saved properly.';
    }
    if (errorInfo?.category === 'ai') {
      return 'The AI service is temporarily unavailable. Some features may not work as expected.';
    }
    return 'An unexpected error occurred while loading this page.';
  };

  const getNavigationSuggestions = () => {
    const suggestions = [
      { href: '/', label: 'Go to Home', icon: Home },
      { href: '/study-plan', label: 'Study Plan', icon: BookOpen },
    ];

    if (currentPath !== '/practice') {
      suggestions.push({ href: '/practice', label: 'Practice Mode', icon: BookOpen });
    }

    return suggestions;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Main error card */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-orange-800">
              {getPageTitle()} Error
            </CardTitle>
            <CardDescription className="text-orange-600">
              {getRecoveryMessage()}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Error details */}
            <Alert variant="destructive">
              <AlertDescription>
                <strong>Error:</strong> {error.message || 'An unexpected error occurred'}
              </AlertDescription>
            </Alert>

            {/* Retry information */}
            {config.enableRetry && (
              <div className="text-sm text-muted-foreground">
                {canRetry ? (
                  <>Retry attempts: {retryCount} of {maxRetries}</>
                ) : (
                  <>Maximum retry attempts reached</>
                )}
              </div>
            )}

            {/* Quick actions */}
            <div className="space-y-3">
              <div className="flex gap-2">
                {canRetry && (
                  <Button onClick={retry} variant="default" size="sm" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button onClick={resetError} variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Navigation options */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Continue with:</p>
                <div className="grid grid-cols-1 gap-2">
                  {getNavigationSuggestions().map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={suggestion.href}>
                        <suggestion.icon className="h-4 w-4 mr-2" />
                        {suggestion.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Help text based on error category */}
            {errorInfo?.category === 'network' && (
              <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                <strong>Network Issue:</strong> Please check your internet connection and try refreshing the page.
              </div>
            )}

            {errorInfo?.category === 'storage' && (
              <div className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <strong>Storage Issue:</strong> Your progress may not be saved. Consider clearing your browser cache if the issue persists.
              </div>
            )}

            {errorInfo?.category === 'ai' && (
              <div className="text-sm text-muted-foreground bg-purple-50 p-3 rounded-lg border border-purple-200">
                <strong>AI Service Issue:</strong> The AI-powered features may be temporarily unavailable. You can still access content without AI assistance.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

// Page Error Boundary Component
interface PageErrorBoundaryProps {
  children: React.ReactNode;
  pageName?: string;
}

export const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({ 
  children, 
  pageName = 'Page' 
}) => {
  return (
    <ErrorBoundary
      config={{
        name: `${pageName}ErrorBoundary`,
        level: 'page',
        fallbackComponent: PageErrorFallback,
        enableRetry: true,
        maxRetries: 3,
        retryDelay: 1500,
        showErrorDetails: process.env.NODE_ENV === 'development',
        isolateErrors: true,
        logErrors: true,
        reportErrors: true,
        onError: (errorInfo) => {
          console.error(`🚨 PAGE ERROR BOUNDARY (${pageName}):`, errorInfo);
        },
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;