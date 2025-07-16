"use client";

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, RefreshCw, Home, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";

interface PracticePageErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
  showGitHubReporting: boolean;
}

interface PracticePageErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error: Error; retry: () => void}>;
}

export class PracticePageErrorBoundary extends React.Component<
  PracticePageErrorBoundaryProps,
  PracticePageErrorBoundaryState
> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: PracticePageErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      showGitHubReporting: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<PracticePageErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check if this is the specific "Cannot access before initialization" error
    const isInitializationError = error.message.includes("Cannot access") && 
                                 error.message.includes("before initialization");
    
    console.error('🚨 Practice Page Error Boundary:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      isInitializationError
    });

    this.setState({
      error,
      errorInfo,
      showGitHubReporting: isInitializationError || this.state.retryCount >= 2
    });

    // Report to monitoring service if available
    if (typeof window !== 'undefined' && (window as any).reportError) {
      (window as any).reportError(error);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
      showGitHubReporting: prevState.retryCount >= 1 // Show after first retry
    }));
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      showGitHubReporting: false
    });
  };

  createGitHubIssueUrl = () => {
    const { error, errorInfo } = this.state;
    if (!error) return '';

    const title = `Practice Page Error: ${error.message.slice(0, 50)}...`;
    const body = `
## Error Report

**Error Message:** ${error.message}

**Error Type:** ${error.name}

**Browser:** ${navigator.userAgent}

**URL:** ${window.location.href}

**Timestamp:** ${new Date().toISOString()}

**Stack Trace:**
\`\`\`
${error.stack || 'No stack trace available'}
\`\`\`

**Component Stack:**
\`\`\`
${errorInfo?.componentStack || 'No component stack available'}
\`\`\`

**Additional Context:**
- Retry attempts: ${this.state.retryCount}
- This appears to be related to the "Cannot access before initialization" issue

**Steps to Reproduce:**
1. Navigate to practice page
2. Error occurs during page load

---
*This issue was automatically generated from the Practice Page Error Boundary*
    `.trim();

    const params = new URLSearchParams({
      title,
      body,
      labels: 'bug,practice-page,initialization-error'
    });

    return `https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI/issues/new?${params.toString()}`;
  };

  render() {
    if (this.state.hasError) {
      const { error, retryCount, showGitHubReporting } = this.state;
      
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={error!} retry={this.handleRetry} />;
      }

      return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-16 h-16 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-xl text-destructive">Practice Page Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>An unexpected error occurred while loading this page.</AlertTitle>
                <AlertDescription className="mt-2">
                  <div className="font-mono text-sm bg-destructive/5 p-2 rounded border">
                    <strong>Error:</strong> {error?.message || 'Unknown error'}
                  </div>
                </AlertDescription>
              </Alert>

              {retryCount > 0 && (
                <div className="text-sm text-muted-foreground text-center">
                  Retry attempts: {retryCount} of 3
                </div>
              )}

              <div className="flex flex-col gap-3">
                {retryCount < 3 && (
                  <Button onClick={this.handleRetry} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                )}
                
                <Button variant="outline" onClick={this.handleReset} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Continue with:</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Go to Home
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href="/study-plan">
                      <FileText className="mr-2 h-4 w-4" />
                      Study Plan
                    </Link>
                  </Button>
                </div>
              </div>

              {showGitHubReporting && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Help us fix this issue by reporting it:
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(this.createGitHubIssueUrl(), '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Report Issue on GitHub
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}