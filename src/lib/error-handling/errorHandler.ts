/**
 * Centralized error handling system for the application
 * Provides consistent error handling, logging, and recovery mechanisms
 */

import { ErrorCategory, ErrorSeverity } from '@/components/error-boundaries/ErrorBoundary';

// Enhanced error class with more context
export class AppError extends Error {
  public readonly category: ErrorCategory;
  public readonly severity: ErrorSeverity;
  public readonly timestamp: Date;
  public readonly context: Record<string, any>;
  public readonly isRetryable: boolean;
  public readonly userMessage: string;
  public readonly originalError?: Error;

  constructor(
    message: string,
    category: ErrorCategory = 'unknown',
    severity: ErrorSeverity = 'medium',
    context: Record<string, any> = {},
    isRetryable: boolean = true,
    userMessage?: string,
    originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    this.category = category;
    this.severity = severity;
    this.timestamp = new Date();
    this.context = context;
    this.isRetryable = isRetryable;
    this.userMessage = userMessage || this.getDefaultUserMessage();
    this.originalError = originalError;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  private getDefaultUserMessage(): string {
    switch (this.category) {
      case 'network':
        return 'Network connection issue. Please check your internet connection and try again.';
      case 'storage':
        return 'Data storage issue. Your progress may not be saved properly.';
      case 'auth':
        return 'Authentication issue. Please refresh the page and try again.';
      case 'validation':
        return 'Invalid input. Please check your data and try again.';
      case 'math':
        return 'Math rendering issue. The expression may contain invalid notation.';
      case 'ai':
        return 'AI service is temporarily unavailable. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      category: this.category,
      severity: this.severity,
      timestamp: this.timestamp,
      context: this.context,
      isRetryable: this.isRetryable,
      userMessage: this.userMessage,
      stack: this.stack,
      originalError: this.originalError?.message,
    };
  }
}

// Specific error classes for different types of errors
export class NetworkError extends AppError {
  constructor(message: string, context: Record<string, any> = {}, originalError?: Error) {
    super(
      message,
      'network',
      'medium',
      context,
      true,
      'Network connection issue. Please check your internet connection and try again.',
      originalError
    );
  }
}

export class AIError extends AppError {
  constructor(message: string, context: Record<string, any> = {}, originalError?: Error) {
    super(
      message,
      'ai',
      'high',
      context,
      true,
      'AI service is temporarily unavailable. Please try again later.',
      originalError
    );
  }
}

export class MathError extends AppError {
  constructor(message: string, context: Record<string, any> = {}, originalError?: Error) {
    super(
      message,
      'math',
      'low',
      context,
      true,
      'Math rendering issue. The expression may contain invalid notation.',
      originalError
    );
  }
}

export class StorageError extends AppError {
  constructor(message: string, context: Record<string, any> = {}, originalError?: Error) {
    super(
      message,
      'storage',
      'medium',
      context,
      false,
      'Data storage issue. Your progress may not be saved properly.',
      originalError
    );
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context: Record<string, any> = {}, originalError?: Error) {
    super(
      message,
      'validation',
      'low',
      context,
      false,
      'Invalid input. Please check your data and try again.',
      originalError
    );
  }
}

// Error recovery strategies
export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryCondition?: (error: Error) => boolean;
}

export class ErrorRecovery {
  private static readonly DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2,
    retryCondition: (error) => error instanceof AppError && error.isRetryable,
  };

  static async withRetry<T>(
    operation: () => Promise<T>,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const finalConfig = { ...this.DEFAULT_RETRY_CONFIG, ...config };
    let lastError: Error;

    for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Check if we should retry
        if (
          attempt === finalConfig.maxRetries ||
          (finalConfig.retryCondition && !finalConfig.retryCondition(lastError))
        ) {
          throw lastError;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          finalConfig.baseDelay * Math.pow(finalConfig.backoffFactor, attempt),
          finalConfig.maxDelay
        );

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  static async withCircuitBreaker<T>(
    operation: () => Promise<T>,
    windowSize: number = 60000, // 1 minute
    failureThreshold: number = 5,
    resetTimeout: number = 30000 // 30 seconds
  ): Promise<T> {
    const now = Date.now();
    const windowKey = `circuit_breaker_${Math.floor(now / windowSize)}`;
    
    try {
      // Check if circuit breaker is open
      const failures = this.getStoredFailures(windowKey);
      if (failures >= failureThreshold) {
        const lastFailure = this.getLastFailureTime(windowKey);
        if (lastFailure && (now - lastFailure) < resetTimeout) {
          throw new AppError(
            'Service temporarily unavailable due to repeated failures',
            'network',
            'high',
            { circuitBreakerOpen: true, failures, resetTimeout }
          );
        } else {
          // Reset circuit breaker
          this.resetCircuitBreaker(windowKey);
        }
      }

      const result = await operation();
      
      // Reset on success
      this.resetCircuitBreaker(windowKey);
      return result;
    } catch (error) {
      // Record failure
      this.recordFailure(windowKey);
      throw error;
    }
  }

  private static getStoredFailures(key: string): number {
    try {
      return parseInt(localStorage.getItem(`${key}_failures`) || '0', 10);
    } catch {
      return 0;
    }
  }

  private static getLastFailureTime(key: string): number | null {
    try {
      const time = localStorage.getItem(`${key}_last_failure`);
      return time ? parseInt(time, 10) : null;
    } catch {
      return null;
    }
  }

  private static recordFailure(key: string): void {
    try {
      const failures = this.getStoredFailures(key) + 1;
      localStorage.setItem(`${key}_failures`, failures.toString());
      localStorage.setItem(`${key}_last_failure`, Date.now().toString());
    } catch {
      // Ignore storage errors
    }
  }

  private static resetCircuitBreaker(key: string): void {
    try {
      localStorage.removeItem(`${key}_failures`);
      localStorage.removeItem(`${key}_last_failure`);
    } catch {
      // Ignore storage errors
    }
  }
}

// Error logging and monitoring
export class ErrorMonitor {
  private static readonly MAX_STORED_ERRORS = 100;
  private static readonly STORAGE_KEY = 'app_error_logs';

  static logError(error: Error, context?: Record<string, any>): void {
    const errorLog = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      name: error.name,
      category: error instanceof AppError ? error.category : 'unknown',
      severity: error instanceof AppError ? error.severity : 'medium',
      context: {
        ...context,
        ...(error instanceof AppError ? error.context : {}),
      },
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    };

    // Log to console
    console.error('Error logged:', errorLog);

    // Store in localStorage for debugging
    this.storeErrorLog(errorLog);

    // Report to external service (if configured)
    this.reportError(errorLog);
  }

  private static storeErrorLog(errorLog: any): void {
    try {
      const existingLogs = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      existingLogs.push(errorLog);

      // Keep only the most recent errors
      if (existingLogs.length > this.MAX_STORED_ERRORS) {
        existingLogs.splice(0, existingLogs.length - this.MAX_STORED_ERRORS);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingLogs));
    } catch {
      // Ignore storage errors
    }
  }

  private static reportError(errorLog: any): void {
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, or custom service
      // This would be implemented based on your monitoring service
      console.info('Error reported to monitoring service:', errorLog);
    }
  }

  static getErrorLogs(): any[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  static clearErrorLogs(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }
}

// Utility functions for error handling
export const errorHandler = {
  // Handle async operations with error boundary
  async handleAsync<T>(
    operation: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError(
        error instanceof Error ? error.message : String(error),
        'unknown',
        'medium',
        context,
        true,
        undefined,
        error instanceof Error ? error : undefined
      );

      ErrorMonitor.logError(appError, context);
      throw appError;
    }
  },

  // Handle sync operations with error boundary
  handleSync<T>(operation: () => T, context?: Record<string, any>): T | null {
    try {
      return operation();
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError(
        error instanceof Error ? error.message : String(error),
        'unknown',
        'medium',
        context,
        true,
        undefined,
        error instanceof Error ? error : undefined
      );

      ErrorMonitor.logError(appError, context);
      throw appError;
    }
  },

  // Create error from fetch response
  createNetworkError(response: Response, context?: Record<string, any>): NetworkError {
    return new NetworkError(
      `Network request failed: ${response.status} ${response.statusText}`,
      {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        ...context,
      }
    );
  },

  // Create error from unknown error
  createFromUnknown(error: unknown, context?: Record<string, any>): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(error.message, 'unknown', 'medium', context, true, undefined, error);
    }

    return new AppError(String(error), 'unknown', 'medium', context);
  },
};

export default errorHandler;