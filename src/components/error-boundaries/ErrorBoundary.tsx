"use client";

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Error categories for better classification
export type ErrorCategory = 
  | 'render'
  | 'network'
  | 'storage'
  | 'auth'
  | 'validation'
  | 'math'
  | 'ai'
  | 'unknown';

// Enhanced error information
export interface EnhancedErrorInfo {
  error: Error;
  errorInfo: React.ErrorInfo;
  timestamp: Date;
  severity: ErrorSeverity;
  category: ErrorCategory;
  userId?: string;
  userAgent?: string;
  url?: string;
  componentStack?: string;
  errorBoundary?: string;
  context?: Record<string, any>;
}

// Error boundary configuration
export interface ErrorBoundaryConfig {
  name: string;
  level: 'root' | 'page' | 'component' | 'feature';
  fallbackComponent?: React.ComponentType<ErrorFallbackProps>;
  onError?: (errorInfo: EnhancedErrorInfo) => void;
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  showErrorDetails?: boolean;
  isolateErrors?: boolean;
  logErrors?: boolean;
  reportErrors?: boolean;
}

export interface ErrorFallbackProps {
  error: Error;
  errorInfo: EnhancedErrorInfo;
  resetError: () => void;
  retry: () => void;
  retryCount: number;
  maxRetries: number;
  config: ErrorBoundaryConfig;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorDetails: EnhancedErrorInfo | null;
  retryCount: number;
  isRetrying: boolean;
  lastRetryTime: Date | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  config: ErrorBoundaryConfig;
}

// Error classification utility
const classifyError = (error: Error): { severity: ErrorSeverity; category: ErrorCategory } => {
  const errorMessage = error.message.toLowerCase();
  const errorStack = error.stack?.toLowerCase() || '';
  
  // Categorize by error type
  let category: ErrorCategory = 'unknown';
  let severity: ErrorSeverity = 'medium';
  
  // Network errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || 
      errorMessage.includes('timeout') || errorMessage.includes('cors')) {
    category = 'network';
    severity = 'medium';
  }
  
  // Storage errors
  else if (errorMessage.includes('storage') || errorMessage.includes('quota') || 
           errorMessage.includes('localstorage') || errorMessage.includes('indexeddb')) {
    category = 'storage';
    severity = 'medium';
  }
  
  // Math rendering errors
  else if (errorMessage.includes('katex') || errorMessage.includes('math') || 
           errorMessage.includes('latex') || errorStack.includes('mathrenderer')) {
    category = 'math';
    severity = 'low';
  }
  
  // AI/API errors
  else if (errorMessage.includes('ai') || errorMessage.includes('genkit') || 
           errorMessage.includes('gemini') || errorStack.includes('actions')) {
    category = 'ai';
    severity = 'high';
  }
  
  // Authentication errors
  else if (errorMessage.includes('auth') || errorMessage.includes('permission') || 
           errorMessage.includes('unauthorized')) {
    category = 'auth';
    severity = 'high';
  }
  
  // Validation errors
  else if (errorMessage.includes('validation') || errorMessage.includes('invalid') || 
           errorMessage.includes('required')) {
    category = 'validation';
    severity = 'low';
  }
  
  // React rendering errors
  else if (errorStack.includes('react') || errorMessage.includes('render') || 
           errorMessage.includes('hydration')) {
    category = 'render';
    severity = 'high';
  }
  
  // Critical errors
  if (errorMessage.includes('chunk') || errorMessage.includes('loading') || 
      errorMessage.includes('module') || errorMessage.includes('script')) {
    severity = 'critical';
  }
  
  return { severity, category };
};

// Error logging utility
const logError = (errorDetails: EnhancedErrorInfo, config: ErrorBoundaryConfig) => {
  if (!config.logErrors) return;
  
  const logData = {
    timestamp: errorDetails.timestamp,
    boundary: config.name,
    level: config.level,
    severity: errorDetails.severity,
    category: errorDetails.category,
    message: errorDetails.error.message,
    stack: errorDetails.error.stack,
    componentStack: errorDetails.componentStack,
    url: errorDetails.url,
    userAgent: errorDetails.userAgent,
    context: errorDetails.context,
  };
  
  console.group(`🚨 Error Boundary: ${config.name}`);
  console.error('Error Details:', logData);
  console.error('Original Error:', errorDetails.error);
  console.error('Error Info:', errorDetails.errorInfo);
  console.groupEnd();
  
  // Store in localStorage for debugging
  try {
    const existingErrors = JSON.parse(localStorage.getItem('error_boundary_logs') || '[]');
    existingErrors.push(logData);
    
    // Keep only last 50 errors
    if (existingErrors.length > 50) {
      existingErrors.splice(0, existingErrors.length - 50);
    }
    
    localStorage.setItem('error_boundary_logs', JSON.stringify(existingErrors));
  } catch (storageError) {
    console.warn('Failed to store error log:', storageError);
  }
};

// Error reporting utility (can be extended to send to external services)
const reportError = (errorDetails: EnhancedErrorInfo, config: ErrorBoundaryConfig) => {
  if (!config.reportErrors) return;
  
  // In production, you would send this to your error reporting service
  // For now, we'll just log it
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Sentry, LogRocket, or custom service
    console.info('Error reported to monitoring service:', {
      boundary: config.name,
      error: errorDetails.error.message,
      severity: errorDetails.severity,
      category: errorDetails.category,
    });
  }
};

// Default error fallback component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  retry,
  retryCount,
  maxRetries,
  config
}) => {
  const canRetry = config.enableRetry && retryCount < maxRetries;
  const severityColor = {
    low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    medium: 'bg-orange-100 text-orange-800 border-orange-300',
    high: 'bg-red-100 text-red-800 border-red-300',
    critical: 'bg-red-200 text-red-900 border-red-500'
  }[errorInfo?.severity || 'medium'];
  
  const categoryIcon = {
    render: <Bug className="h-4 w-4" />,
    network: <RefreshCw className="h-4 w-4" />,
    storage: <AlertTriangle className="h-4 w-4" />,
    auth: <User className="h-4 w-4" />,
    validation: <AlertTriangle className="h-4 w-4" />,
    math: <AlertTriangle className="h-4 w-4" />,
    ai: <AlertTriangle className="h-4 w-4" />,
    unknown: <AlertTriangle className="h-4 w-4" />
  }[errorInfo?.category || 'unknown'];
  
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <CardTitle className="text-lg">Something went wrong</CardTitle>
          <Badge variant="outline" className={severityColor}>
            {errorInfo?.severity || 'medium'} severity
          </Badge>
        </div>
        <CardDescription>
          An error occurred in the {config.name} component. We're working to resolve this issue.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Error category and timing */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {categoryIcon}
            <span>{errorInfo?.category || 'Unknown'} error</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{errorInfo?.timestamp.toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Error message */}
        <Alert variant="destructive">
          <AlertDescription>
            {error.message || 'An unexpected error occurred'}
          </AlertDescription>
        </Alert>
        
        {/* Retry information */}
        {config.enableRetry && (
          <div className="text-sm text-muted-foreground">
            {canRetry ? (
              <>Retry attempts: {retryCount} of {maxRetries}</>
            ) : (
              <>Maximum retry attempts ({maxRetries}) reached</>
            )}
          </div>
        )}
        
        {/* Error details (development only) */}
        {config.showErrorDetails && process.env.NODE_ENV === 'development' && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2 pt-4">
          {canRetry && (
            <Button onClick={retry} variant="default" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          
          <Button onClick={resetError} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button onClick={() => window.location.href = '/'} variant="outline" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeout: NodeJS.Timeout | null = null;
  
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null,
      retryCount: 0,
      isRetrying: false,
      lastRetryTime: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { config } = this.props;
    const { severity, category } = classifyError(error);
    
    const errorDetails: EnhancedErrorInfo = {
      error,
      errorInfo,
      timestamp: new Date(),
      severity,
      category,
      userId: this.getUserId(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      componentStack: errorInfo.componentStack || undefined,
      errorBoundary: config.name,
      context: this.getErrorContext(),
    };

    this.setState({
      errorInfo,
      errorDetails,
    });

    // Log error
    logError(errorDetails, config);
    
    // Report error
    reportError(errorDetails, config);
    
    // Call custom error handler
    if (config.onError) {
      try {
        config.onError(errorDetails);
      } catch (handlerError) {
        console.error('Error in custom error handler:', handlerError);
      }
    }
  }

  private getUserId(): string | undefined {
    // Try to get user ID from various sources
    try {
      return localStorage.getItem('anonymous_user_id') || undefined;
    } catch {
      return undefined;
    }
  }

  private getErrorContext(): Record<string, any> {
    const { config } = this.props;
    
    return {
      boundaryLevel: config.level,
      boundaryName: config.name,
      retryCount: this.state.retryCount,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      // Add any additional context specific to the boundary
    };
  }

  private resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null,
      retryCount: 0,
      isRetrying: false,
      lastRetryTime: null,
    });
  };

  private retry = () => {
    const { config } = this.props;
    
    if (!config.enableRetry || this.state.retryCount >= (config.maxRetries || 3)) {
      return;
    }

    this.setState({
      isRetrying: true,
      lastRetryTime: new Date(),
    });

    const retryDelay = config.retryDelay || 1000;
    
    this.retryTimeout = setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        errorDetails: null,
        retryCount: prevState.retryCount + 1,
        isRetrying: false,
      }));
    }, retryDelay);
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    const { children, config } = this.props;
    const { hasError, error, errorDetails, retryCount, isRetrying } = this.state;

    if (hasError && error && errorDetails) {
      const FallbackComponent = config.fallbackComponent || DefaultErrorFallback;
      
      return (
        <div className="error-boundary-container p-4">
          {isRetrying ? (
            <div className="flex items-center justify-center p-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>Retrying...</span>
            </div>
          ) : (
            <FallbackComponent
              error={error}
              errorInfo={errorDetails}
              resetError={this.resetError}
              retry={this.retry}
              retryCount={retryCount}
              maxRetries={config.maxRetries || 3}
              config={config}
            />
          )}
        </div>
      );
    }

    return children;
  }
}

// Convenience wrapper for common error boundary configurations
export const createErrorBoundary = (config: Partial<ErrorBoundaryConfig> = {}) => {
  const defaultConfig: ErrorBoundaryConfig = {
    name: 'GenericErrorBoundary',
    level: 'component',
    enableRetry: true,
    maxRetries: 3,
    retryDelay: 1000,
    showErrorDetails: process.env.NODE_ENV === 'development',
    isolateErrors: true,
    logErrors: true,
    reportErrors: process.env.NODE_ENV === 'production',
    ...config,
  };

  return ({ children }: { children: ReactNode }) => (
    <ErrorBoundary config={defaultConfig}>
      {children}
    </ErrorBoundary>
  );
};

// Export the main ErrorBoundary component
export default ErrorBoundary;