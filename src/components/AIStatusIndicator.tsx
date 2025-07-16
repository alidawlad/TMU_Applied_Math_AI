"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings, 
  RefreshCw,
  Info,
  Zap,
  ZapOff
} from 'lucide-react';
import { aiService } from '@/lib/services/aiService';
import { getAIStatusAction } from '@/lib/actions';
import type { AnswerCheckingMode } from '@/lib/services/aiService';

type AIStatus = 'available' | 'unavailable' | 'error';

interface AIStatusData {
  status: AIStatus;
  message: string;
  details: {
    configured: boolean;
    apiKey?: string;
    error?: string;
  };
  lastCheck: Date;
}

interface AIStatusIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export function AIStatusIndicator({
  size = 'md',
  showDetails = false,
  className = ""
}: AIStatusIndicatorProps) {
  const [status, setStatus] = useState<AIStatusData>({
    status: 'unavailable',
    message: 'Checking AI status...',
    details: {
      configured: false,
      apiKey: undefined,
      error: 'Loading...'
    },
    lastCheck: new Date()
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refresh status using server action
  const refreshStatus = async () => {
    setIsLoading(true);
    try {
      const aiStatus = await getAIStatusAction();
      setStatus({
        status: aiStatus.available ? 'available' : 'unavailable',
        message: aiStatus.message,
        details: {
          configured: aiStatus.configured,
          apiKey: aiStatus.apiKeyHint || undefined,
          error: aiStatus.error || undefined
        },
        lastCheck: new Date()
      });
    } catch (error) {
      setStatus({
        status: 'error',
        message: 'Failed to check AI status',
        details: {
          configured: false,
          apiKey: undefined,
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        lastCheck: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and auto-refresh
  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status.status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'unavailable':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bot className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unavailable':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (size === 'sm' && !showDetails) {
    return (
      <Badge
        variant="outline"
        className={`${getStatusColor()} ${className}`}
      >
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <span className="text-xs">
            {status.status === 'available' ? 'AI' : 'Manual'}
          </span>
        </div>
      </Badge>
    );
  }

  return (
    <div className={className}>
      {/* Compact Status */}
      <div 
        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${getStatusColor()}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">
            {status.status === 'available' ? 'AI Available' : 
             status.status === 'unavailable' ? 'Manual Mode' : 'AI Error'}
          </span>
        </div>
        
        {showDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              refreshStatus();
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && showDetails && (
        <Card className="mt-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Status Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-medium">Status:</span>
                <div className="flex items-center gap-1 mt-1">
                  {getStatusIcon()}
                  <span className="capitalize">{status.status}</span>
                </div>
              </div>
              
              <div>
                <span className="font-medium">Configuration:</span>
                <div className="flex items-center gap-1 mt-1">
                  {status.details.configured ? (
                    <Zap className="h-3 w-3 text-green-600" />
                  ) : (
                    <ZapOff className="h-3 w-3 text-gray-400" />
                  )}
                  <span>{status.details.configured ? 'Configured' : 'Not configured'}</span>
                </div>
              </div>

              {status.details.apiKey && (
                <div className="col-span-2">
                  <span className="font-medium">API Key:</span>
                  <div className="font-mono text-xs mt-1 text-muted-foreground">
                    {status.details.apiKey}
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {status.details.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {status.details.error}
                </AlertDescription>
              </Alert>
            )}

            {/* Available Modes */}
            <div>
              <span className="text-xs font-medium">Available Modes:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {aiService.getAvailableModes().map((mode) => (
                  <Badge key={mode} variant="secondary" className="text-xs">
                    {mode.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Last Check */}
            {status.lastCheck && (
              <div className="text-xs text-muted-foreground">
                Last checked: {status.lastCheck.toLocaleTimeString()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshStatus}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Checking Mode Selector Component
interface CheckingModeSelectorProps {
  currentMode: AnswerCheckingMode;
  onModeChange: (mode: AnswerCheckingMode) => void;
  className?: string;
}

export function CheckingModeSelector({
  currentMode,
  onModeChange,
  className = ""
}: CheckingModeSelectorProps) {
  const availableModes = aiService.getAvailableModes();

  const getModeIcon = (mode: AnswerCheckingMode) => {
    switch (mode) {
      case 'ai':
        return <Bot className="h-4 w-4" />;
      case 'manual':
        return <Settings className="h-4 w-4" />;
      case 'reveal':
        return <Info className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getModeDescription = (mode: AnswerCheckingMode) => {
    return aiService.getModeDescription(mode);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="text-sm font-medium">Answer Checking Mode:</div>
      
      <div className="grid gap-2">
        {availableModes.map((mode) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
              currentMode === mode
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-2">
              {getModeIcon(mode)}
              <span className="font-medium capitalize">{mode}</span>
              {mode === 'ai' && aiService.isAvailable() && (
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {getModeDescription(mode)}
            </div>
          </button>
        ))}
      </div>

      {/* Current Mode Status */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Currently using <strong>{currentMode}</strong> mode. 
          {currentMode === 'ai' && !aiService.isAvailable() && 
            " AI is unavailable, falling back to manual mode."}
        </AlertDescription>
      </Alert>
    </div>
  );
}