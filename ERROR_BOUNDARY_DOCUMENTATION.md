# Error Boundary System Documentation

## Overview

The TMU Applied Math Mastery AI application now includes a comprehensive error boundary system that provides graceful error handling and improves application stability. This system implements a hierarchical approach to error handling with specialized boundaries for different types of errors.

## Error Boundary Hierarchy

### 1. Root Error Boundary (`RootErrorBoundary`)
- **Location**: `src/app/layout.tsx`
- **Purpose**: Catches critical application-level errors that would otherwise crash the entire application
- **Features**:
  - Comprehensive recovery options (reload, clear storage, go home)
  - Error reporting for production monitoring
  - Critical error detection and handling
  - User-friendly error messages with contact information

### 2. Page Error Boundaries (`PageErrorBoundary`)
- **Location**: Applied to all main pages (`/`, `/practice`, `/study`, `/study-plan`)
- **Purpose**: Handles page-specific errors while maintaining navigation
- **Features**:
  - Page-specific error messages
  - Navigation suggestions to other pages
  - Error categorization (network, storage, AI, etc.)
  - Retry mechanisms for recoverable errors

### 3. Feature Error Boundaries
- **Math Error Boundary** (`MathErrorBoundary`)
  - Handles LaTeX rendering errors
  - Provides fallback mathematical notation
  - Shows raw expressions for debugging
  - Suggests solutions for common math errors

- **AI Error Boundary** (`AIErrorBoundary`)
  - Handles AI service failures
  - Provides offline mode capabilities
  - Intelligent retry with exponential backoff
  - Service status indicators

### 4. Component Error Boundaries (`ComponentErrorBoundary`)
- **Purpose**: Isolates component-level failures
- **Features**:
  - Prevents single component failures from affecting the entire page
  - Simple retry mechanisms
  - Developer-friendly error information

## Error Classification System

### Error Severity Levels
- **Low**: Minor issues that don't significantly impact functionality
- **Medium**: Noticeable issues that affect user experience
- **High**: Serious issues that prevent core functionality
- **Critical**: Application-breaking errors

### Error Categories
- **Network**: Connection issues, timeouts, API failures
- **Storage**: LocalStorage, IndexedDB, or data persistence issues
- **Math**: LaTeX rendering, mathematical notation errors
- **AI**: AI service failures, quota exceeded, authentication issues
- **Auth**: User authentication and authorization problems
- **Validation**: Input validation and data format errors
- **Render**: React rendering and component lifecycle errors
- **Unknown**: Uncategorized errors

## Error Recovery Mechanisms

### Retry Strategies
1. **Exponential Backoff**: Increasing delays between retry attempts
2. **Circuit Breaker**: Prevents repeated failures by temporarily disabling retries
3. **Conditional Retry**: Only retries based on error type and conditions
4. **Manual Retry**: User-initiated retry with progress indication

### Recovery Options
- **Automatic Retry**: For transient errors (network, AI service)
- **Manual Reset**: User can reset the error state
- **Page Reload**: For rendering or hydration errors
- **Clear Storage**: For storage-related issues
- **Navigation**: Redirect to working pages

## Error Logging and Monitoring

### Client-Side Logging
- **Console Logging**: Detailed error information in development
- **LocalStorage**: Error logs stored for debugging (last 50 errors)
- **Error Context**: Captures user actions, component state, and environment info

### Production Monitoring
- **Error Reporting**: Structured error data sent to monitoring services
- **Performance Metrics**: Error frequency and recovery success rates
- **User Feedback**: Error report generation with user context

## Implementation Details

### Core Components

#### 1. `ErrorBoundary` (Base Component)
```typescript
// Usage
<ErrorBoundary config={errorBoundaryConfig}>
  <YourComponent />
</ErrorBoundary>
```

#### 2. Enhanced Error Handling in Actions
```typescript
// Example from actions.ts
export async function checkAnswerAction({
  studentAnswer,
  expectedAnswer,
}: CheckAnswerArgs) {
  // Input validation
  if (!studentAnswer?.trim() || !expectedAnswer?.trim()) {
    const validationError = new ValidationError(...);
    return { error: validationError.userMessage };
  }

  try {
    // Retry logic with exponential backoff
    const result = await ErrorRecovery.withRetry(
      () => evaluateMathEquivalence({ studentAnswer, expectedAnswer }),
      { maxRetries: 3, baseDelay: 1000 }
    );
    return result;
  } catch (error) {
    // Comprehensive error handling
    ErrorMonitor.logError(error);
    return { error: error.userMessage };
  }
}
```

#### 3. Progress Tracking Error Handling
```typescript
// Example from useProgress.ts
const updateContentProgress = useCallback((
  contentId: string,
  contentType: ContentType,
  updates: ProgressUpdate
) => {
  try {
    // Validation and processing
    progressService.updateContentProgress(contentId, contentType, updates);
  } catch (error) {
    const storageError = new StorageError(...);
    ErrorMonitor.logError(storageError);
  }
}, []);
```

## Configuration Options

### Error Boundary Configuration
```typescript
interface ErrorBoundaryConfig {
  name: string;
  level: 'root' | 'page' | 'component' | 'feature';
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  showErrorDetails: boolean;
  isolateErrors: boolean;
  logErrors: boolean;
  reportErrors: boolean;
  onError?: (errorInfo: EnhancedErrorInfo) => void;
}
```

### Common Configurations
```typescript
// Component-level boundary
const componentConfig = {
  enableRetry: true,
  maxRetries: 2,
  retryDelay: 1000,
  isolateErrors: true,
  logErrors: true,
  reportErrors: false,
};

// AI feature boundary
const aiConfig = {
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 2000,
  isolateErrors: true,
  logErrors: true,
  reportErrors: true,
};
```

## User Experience Considerations

### Error Messages
- **User-Friendly**: Clear, non-technical language
- **Actionable**: Specific steps users can take
- **Contextual**: Relevant to the current task or page
- **Reassuring**: Minimize user anxiety about errors

### Visual Design
- **Color Coding**: Different colors for different severity levels
- **Icons**: Visual indicators for error types
- **Progress Indicators**: Show retry progress and status
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Recovery UX
- **Multiple Options**: Various ways to recover from errors
- **Clear CTAs**: Obvious action buttons
- **Progress Preservation**: Maintain user progress when possible
- **Feedback**: Confirm when recovery actions are successful

## Testing and Debugging

### Development Tools
- **Error Boundary Logs**: Detailed console output in development
- **Error History**: LocalStorage maintains error history
- **Component Stack**: React component hierarchy at error time
- **Context Information**: User state and actions leading to error

### Production Monitoring
- **Error Rates**: Track error frequency by type and severity
- **Recovery Success**: Monitor how often users successfully recover
- **Performance Impact**: Measure error boundary overhead
- **User Reports**: Collect user feedback on error experiences

## Best Practices

### Implementation
1. **Wrap Critical Components**: Always wrap components that may fail
2. **Appropriate Granularity**: Use the right level of error boundary
3. **Provide Context**: Include relevant information in error boundaries
4. **Test Error Scenarios**: Regularly test error conditions
5. **Monitor Production**: Track real-world error patterns

### Error Handling
1. **Fail Gracefully**: Provide meaningful fallbacks
2. **Log Comprehensively**: Capture sufficient debugging information
3. **Retry Intelligently**: Only retry when it makes sense
4. **Communicate Clearly**: Use user-friendly error messages
5. **Preserve State**: Maintain user progress when possible

## Maintenance and Updates

### Regular Tasks
- **Review Error Logs**: Weekly review of error patterns
- **Update Error Messages**: Improve based on user feedback
- **Adjust Retry Logic**: Optimize based on success rates
- **Performance Monitoring**: Ensure error boundaries don't impact performance

### Future Enhancements
- **Error Boundary Context**: React context for error boundary state
- **Advanced Analytics**: Machine learning for error prediction
- **User Feedback Integration**: In-app error reporting
- **Automated Recovery**: Smart recovery based on error patterns

## Conclusion

The error boundary system provides comprehensive error handling that:
- Prevents application crashes
- Provides excellent user experience during errors
- Enables efficient debugging and monitoring
- Supports graceful degradation of functionality
- Maintains application stability in production

This system ensures that the TMU Applied Math Mastery AI application remains stable and usable even when errors occur, providing users with a professional and reliable learning experience.