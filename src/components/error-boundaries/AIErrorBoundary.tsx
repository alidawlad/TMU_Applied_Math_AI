"use client";

import React from 'react';
import { ErrorBoundary, ErrorFallbackProps, EnhancedErrorInfo } from './ErrorBoundary';
import { AlertTriangle, RefreshCw, Brain, Zap, WifiOff, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

// AI-specific error fallback component
const AIErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  retry,
  retryCount,
  maxRetries,
  config
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryProgress, setRetryProgress] = useState(0);
  const canRetry = config.enableRetry && retryCount < maxRetries;
  
  // Mock retry progress for better UX
  useEffect(() => {
    if (isRetrying) {
      const interval = setInterval(() => {
        setRetryProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRetrying(false);
            return 0;
          }
          return prev + 10;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isRetrying]);

  const getAIErrorInfo = () => {
    const errorMsg = error.message.toLowerCase();
    
    if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorMsg.includes('timeout')) {
      return {
        title: 'AI Service Connection Error',
        description: 'Unable to connect to the AI service. This may be due to network issues or service unavailability.',
        icon: WifiOff,
        color: 'text-red-600',
        suggestions: [
          'Check your internet connection',
          'The AI service may be temporarily unavailable',
          'Try again in a few moments',
        ],
        canWorkOffline: true,
      };
    }
    
    if (errorMsg.includes('quota') || errorMsg.includes('limit') || errorMsg.includes('rate')) {
      return {
        title: 'AI Service Quota Exceeded',
        description: 'The AI service has reached its usage limit. Please try again later.',
        icon: Clock,
        color: 'text-orange-600',
        suggestions: [
          'Wait a few minutes before trying again',
          'The service will be available again soon',
          'You can continue using the app without AI assistance',
        ],
        canWorkOffline: true,
      };
    }
    
    if (errorMsg.includes('auth') || errorMsg.includes('unauthorized') || errorMsg.includes('permission')) {
      return {
        title: 'AI Service Authentication Error',
        description: 'There was an issue authenticating with the AI service.',
        icon: Brain,
        color: 'text-purple-600',
        suggestions: [
          'This is likely a temporary issue',
          'Try refreshing the page',
          'Contact support if the issue persists',
        ],
        canWorkOffline: true,
      };
    }
    
    return {
      title: 'AI Service Error',
      description: 'An unexpected error occurred while processing your request with the AI service.',
      icon: Zap,
      color: 'text-blue-600',
      suggestions: [
        'Try your request again',
        'The AI service may be experiencing issues',
        'You can continue using the app without AI assistance',
      ],
      canWorkOffline: true,
    };
  };

  const aiErrorInfo = getAIErrorInfo();
  const IconComponent = aiErrorInfo.icon;

  const handleRetryWithProgress = async () => {
    setIsRetrying(true);
    setRetryProgress(0);
    
    // Simulate progress while retrying
    const progressInterval = setInterval(() => {
      setRetryProgress(prev => Math.min(prev + 20, 90));
    }, 200);
    
    // Wait a bit then retry
    setTimeout(() => {
      clearInterval(progressInterval);
      setRetryProgress(100);
      setTimeout(() => {
        setIsRetrying(false);
        setRetryProgress(0);
        retry();
      }, 300);
    }, 1000);
  };

  return (
    <div className="ai-error-boundary border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg p-4 my-2">
      <div className="space-y-4">
        {/* Error header */}
        <div className="flex items-center gap-2">
          <IconComponent className={`h-5 w-5 ${aiErrorInfo.color}`} />
          <span className="font-medium text-blue-800">{aiErrorInfo.title}</span>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            AI Error
          </Badge>
        </div>

        {/* Error description */}
        <p className="text-sm text-blue-700">
          {aiErrorInfo.description}
        </p>

        {/* Retry progress */}
        {isRetrying && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 animate-pulse text-blue-600" />
              <span className="text-sm text-blue-700">Retrying AI request...</span>
            </div>
            <Progress value={retryProgress} className="h-2" />
          </div>
        )}

        {/* Error suggestions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-blue-800">What you can do:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            {aiErrorInfo.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Offline mode notice */}
        {aiErrorInfo.canWorkOffline && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              <strong>Good news:</strong> You can continue using the app without AI features. 
              Your progress will be saved and AI features will work again once the service is restored.
            </AlertDescription>
          </Alert>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          {canRetry && !isRetrying && (
            <Button onClick={handleRetryWithProgress} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry AI Request
            </Button>
          )}
          
          <Button onClick={resetError} variant="outline" size="sm" disabled={isRetrying}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Continue Without AI
          </Button>
        </div>

        {/* Retry status */}
        {config.enableRetry && (
          <div className="text-xs text-blue-600">
            {canRetry ? (
              <>AI retry attempts: {retryCount} of {maxRetries}</>
            ) : (
              <>Maximum AI retry attempts reached - continuing without AI</>
            )}
          </div>
        )}

        {/* Service status hint */}
        <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded border border-blue-200">
          <strong>Service Status:</strong> AI features are temporarily unavailable. 
          All other app features continue to work normally.
        </div>

        {/* Development details */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-xs">
            <summary className="cursor-pointer font-medium text-blue-800">
              AI Error Details
            </summary>
            <pre className="mt-2 bg-blue-100 p-2 rounded text-xs overflow-auto border border-blue-200">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

// AI Error Boundary Component
interface AIErrorBoundaryProps {
  children: React.ReactNode;
  operation?: string;
  fallbackMessage?: string;
}

export const AIErrorBoundary: React.FC<AIErrorBoundaryProps> = ({ 
  children, 
  operation = "AI request",
  fallbackMessage = "AI service is temporarily unavailable"
}) => {
  return (
    <ErrorBoundary
      config={{
        name: 'AIErrorBoundary',
        level: 'feature',
        fallbackComponent: AIErrorFallback,
        enableRetry: true,
        maxRetries: 3,
        retryDelay: 2000, // Longer delay for AI requests
        showErrorDetails: process.env.NODE_ENV === 'development',
        isolateErrors: true,
        logErrors: true,
        reportErrors: true, // AI errors should be reported
        onError: (errorInfo) => {
          console.warn('🤖 AI ERROR BOUNDARY:', errorInfo);
          
          // Add AI-specific context
          if (errorInfo.context) {
            errorInfo.context.aiOperation = operation;
            errorInfo.context.fallbackMessage = fallbackMessage;
          }
        },
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

// Simple AI error fallback for inline use
export const InlineAIErrorFallback: React.FC<{ 
  operation: string; 
  error?: Error;
  onRetry?: () => void;
}> = ({ operation, error, onRetry }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm border border-blue-200">
      <AlertTriangle className="h-4 w-4" />
      <span>AI {operation} failed</span>
      {onRetry && (
        <Button onClick={onRetry} variant="ghost" size="sm" className="h-6 px-2">
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default AIErrorBoundary;