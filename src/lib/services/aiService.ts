"use client";

// Import AI functions conditionally to avoid server-side imports in client code
import type { Problem, Step } from '@/lib/types';

// AI Service Configuration
export interface AIServiceConfig {
  enabled: boolean;
  fallbackMode: AnswerCheckingMode;
  retryAttempts: number;
  timeout: number;
}

// Answer checking modes
export type AnswerCheckingMode = 'ai' | 'manual' | 'reveal';

// Answer checking result
export interface AnswerCheckResult {
  isCorrect: boolean;
  feedback?: string;
  mode: AnswerCheckingMode;
  aiUsed: boolean;
  error?: string;
}

// Manual answer comparison
export interface ManualCheckOptions {
  showSolution: boolean;
  caseSensitive: boolean;
  ignoreWhitespace: boolean;
}

// AI Service Class
class AIService {
  private config: AIServiceConfig;
  private lastAvailabilityCheck: Date | null = null;
  private availabilityCache: boolean | null = null;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  constructor() {
    this.config = {
      enabled: true,
      fallbackMode: 'manual',
      retryAttempts: 3,
      timeout: 10000,
    };
  }

  // Check if AI is currently available
  isAvailable(): boolean {
    // On client side, assume AI is not available
    if (typeof window !== 'undefined') {
      return false;
    }
    
    const now = new Date();
    
    // Use cache if recent
    if (this.lastAvailabilityCheck && 
        this.availabilityCache !== null &&
        (now.getTime() - this.lastAvailabilityCheck.getTime()) < this.CACHE_DURATION) {
      return this.availabilityCache;
    }

    // Dynamic import for server-side only
    try {
      // This will be handled by server actions
      this.availabilityCache = false; // Default to false for now
      this.lastAvailabilityCheck = now;
    } catch (error) {
      this.availabilityCache = false;
      this.lastAvailabilityCheck = now;
    }
    
    return this.availabilityCache;
  }

  // Get AI status with detailed information
  getStatus() {
    // Default status for client-side
    const defaultStatus = {
      status: 'unavailable' as const,
      message: 'AI status checked server-side'
    };
    
    const defaultConfig = {
      configured: false,
      available: false,
      lastCheck: new Date(),
      error: 'AI status determined server-side'
    };
    
    return {
      ...defaultStatus,
      config: this.config,
      lastCheck: this.lastAvailabilityCheck,
      details: {
        configured: defaultConfig.configured,
        apiKey: undefined,
        error: defaultConfig.error
      }
    };
  }

  // Update AI service configuration
  updateConfig(newConfig: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Manual answer comparison utility
  compareAnswersManually(
    studentAnswer: string, 
    expectedAnswer: string, 
    options: ManualCheckOptions = {
      showSolution: false,
      caseSensitive: false,
      ignoreWhitespace: true
    }
  ): AnswerCheckResult {
    let student = studentAnswer;
    let expected = expectedAnswer;

    // Apply comparison options
    if (!options.caseSensitive) {
      student = student.toLowerCase();
      expected = expected.toLowerCase();
    }

    if (options.ignoreWhitespace) {
      student = student.replace(/\s+/g, '');
      expected = expected.replace(/\s+/g, '');
    }

    const isCorrect = student === expected;

    return {
      isCorrect,
      feedback: isCorrect ? 
        "Correct!" : 
        options.showSolution ? 
          `Incorrect. The correct answer is: ${expectedAnswer}` :
          "Incorrect. Try again or reveal the answer for help.",
      mode: 'manual',
      aiUsed: false
    };
  }

  // Advanced manual comparison with mathematical equivalence checking
  compareAnswersAdvanced(
    studentAnswer: string, 
    expectedAnswer: string
  ): AnswerCheckResult {
    // Basic string comparison first
    const basicResult = this.compareAnswersManually(studentAnswer, expectedAnswer);
    if (basicResult.isCorrect) {
      return basicResult;
    }

    // Try mathematical equivalence patterns
    const mathEquivalencePatterns = [
      // Remove spaces and compare
      { 
        student: studentAnswer.replace(/\s+/g, ''), 
        expected: expectedAnswer.replace(/\s+/g, '') 
      },
      // Normalize multiplication symbols
      { 
        student: studentAnswer.replace(/×/g, '*').replace(/·/g, '*'), 
        expected: expectedAnswer.replace(/×/g, '*').replace(/·/g, '*') 
      },
      // Normalize fractions
      { 
        student: studentAnswer.replace(/\//g, '÷'), 
        expected: expectedAnswer.replace(/\//g, '÷') 
      },
      // Remove parentheses for simple cases
      { 
        student: studentAnswer.replace(/[()]/g, ''), 
        expected: expectedAnswer.replace(/[()]/g, '') 
      }
    ];

    for (const pattern of mathEquivalencePatterns) {
      if (pattern.student.toLowerCase() === pattern.expected.toLowerCase()) {
        return {
          isCorrect: true,
          feedback: "Mathematically correct! (Different notation but equivalent)",
          mode: 'manual',
          aiUsed: false
        };
      }
    }

    return {
      isCorrect: false,
      feedback: "Incorrect. The answer doesn't match the expected solution.",
      mode: 'manual',
      aiUsed: false
    };
  }

  // Create answer reveal result
  createRevealResult(expectedAnswer: string): AnswerCheckResult {
    return {
      isCorrect: true, // Always mark as correct when revealing
      feedback: `Answer revealed: ${expectedAnswer}`,
      mode: 'reveal',
      aiUsed: false
    };
  }

  // Get fallback checking mode when AI is unavailable
  getFallbackMode(): AnswerCheckingMode {
    return this.config.fallbackMode;
  }

  // Check if manual mode should show solutions
  shouldShowSolution(mode: AnswerCheckingMode): boolean {
    return mode === 'reveal' || (mode === 'manual' && !this.isAvailable());
  }

  // Get user-friendly mode description
  getModeDescription(mode: AnswerCheckingMode): string {
    switch (mode) {
      case 'ai':
        return 'AI-powered mathematical equivalence checking';
      case 'manual':
        return 'Manual comparison with pattern matching';
      case 'reveal':
        return 'Show answer immediately';
      default:
        return 'Unknown checking mode';
    }
  }

  // Get available checking modes based on current state
  getAvailableModes(): AnswerCheckingMode[] {
    const modes: AnswerCheckingMode[] = ['manual', 'reveal'];
    
    if (this.isAvailable() && this.config.enabled) {
      modes.unshift('ai');
    }
    
    return modes;
  }

  // Check if a mode is currently available
  isModeAvailable(mode: AnswerCheckingMode): boolean {
    return this.getAvailableModes().includes(mode);
  }
}

// Export singleton instance
export const aiService = new AIService();

// Utility functions
export function getAvailableCheckingModes(): AnswerCheckingMode[] {
  return aiService.getAvailableModes();
}

export function checkAnswerWithMode(
  studentAnswer: string,
  expectedAnswer: string,
  mode: AnswerCheckingMode
): AnswerCheckResult {
  switch (mode) {
    case 'manual':
      return aiService.compareAnswersAdvanced(studentAnswer, expectedAnswer);
    case 'reveal':
      return aiService.createRevealResult(expectedAnswer);
    case 'ai':
      // AI checking will be handled by the existing actions
      throw new Error('AI checking should use the existing action system');
    default:
      throw new Error(`Unknown checking mode: ${mode}`);
  }
}

export function getAIServiceStatus() {
  return aiService.getStatus();
}