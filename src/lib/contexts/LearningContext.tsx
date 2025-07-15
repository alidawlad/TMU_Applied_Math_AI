"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import type { Lecture, ModuleContent, Example, Problem } from '@/lib/types';
import { lectures } from '@/lib/content';

// Unified learning context types
export interface NavigationContext {
  previousPath?: string;
  previousContent?: {
    type: 'example' | 'problem';
    id: string;
    moduleId: string;
    lectureId: string;
  };
  studySequence?: string[]; // Array of content IDs in order
  currentSequenceIndex?: number;
}

export interface LearningSession {
  sessionId: string;
  startTime: Date;
  currentContent: {
    type: 'example' | 'problem';
    id: string;
    title: string;
  } | null;
  navigationContext: NavigationContext;
  completedContent: string[];
}

interface LearningContextType {
  // Current session state
  session: LearningSession | null;
  
  // Content lookup functions
  findContentById: (id: string, type: 'example' | 'problem') => {
    content: Example | Problem;
    module: ModuleContent;
    lecture: Lecture;
  } | null;
  
  // Navigation functions
  navigateToContent: (id: string, type: 'example' | 'problem', context?: Partial<NavigationContext>) => void;
  navigateBack: () => void;
  navigateNext: () => void;
  
  // Progress functions
  markContentComplete: (id: string, type: 'example' | 'problem') => void;
  getContentProgress: (id: string, type: 'example' | 'problem') => number; // 0-100
  
  // Session management
  startSession: (initialContent?: { id: string; type: 'example' | 'problem' }) => void;
  endSession: () => void;
  trackContentAccess: (id: string, type: 'example' | 'problem') => void;
  
  // Context preservation
  preserveContext: (context: Partial<NavigationContext>) => void;
  restoreContext: () => NavigationContext | null;
}

const LearningContext = createContext<LearningContextType | null>(null);

const STORAGE_KEY = 'fm-learning-session';

function LearningProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<LearningSession | null>(null);

  // Initialize session from localStorage or URL
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        parsed.startTime = new Date(parsed.startTime);
        setSession(parsed);
      } catch (error) {
        console.error('Failed to restore learning session:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }, [session]);

  // Content lookup function
  const findContentById = (id: string, type: 'example' | 'problem') => {
    for (const lecture of lectures) {
      for (const module of lecture.modules) {
        if (type === 'example') {
          const example = module.examples.find(e => e.id === id);
          if (example) {
            return { content: example, module, lecture };
          }
        } else {
          const problem = module.problems.find(p => p.id === id);
          if (problem) {
            return { content: problem, module, lecture };
          }
        }
      }
    }
    return null;
  };

  // Navigation functions
  const navigateToContent = (id: string, type: 'example' | 'problem', context?: Partial<NavigationContext>) => {
    const contentData = findContentById(id, type);
    if (!contentData) return;

    // Update session with new content
    setSession(prev => {
      const newSession: LearningSession = {
        sessionId: prev?.sessionId || `session-${Date.now()}`,
        startTime: prev?.startTime || new Date(),
        currentContent: {
          type,
          id,
          title: contentData.content.title
        },
        navigationContext: {
          ...prev?.navigationContext,
          ...context,
          previousPath: window.location.pathname + window.location.search,
        },
        completedContent: prev?.completedContent || []
      };
      return newSession;
    });

    // Navigate with context preservation
    const url = type === 'example' 
      ? `/study?example=${id}` 
      : `/practice?problem=${id}`;
    
    router.push(url);
  };

  const navigateBack = () => {
    const previousPath = session?.navigationContext.previousPath;
    if (previousPath) {
      router.push(previousPath);
    } else {
      router.push('/study-plan');
    }
  };

  const navigateNext = () => {
    if (!session?.navigationContext.studySequence || session.navigationContext.currentSequenceIndex === undefined) {
      return;
    }

    const { studySequence, currentSequenceIndex } = session.navigationContext;
    const nextIndex = currentSequenceIndex + 1;
    
    if (nextIndex < studySequence.length) {
      const nextId = studySequence[nextIndex];
      // Determine type based on ID pattern or lookup
      const isExample = nextId.startsWith('W10-E');
      navigateToContent(nextId, isExample ? 'example' : 'problem', {
        currentSequenceIndex: nextIndex
      });
    }
  };

  // Progress functions
  const markContentComplete = (id: string, type: 'example' | 'problem') => {
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        completedContent: [...new Set([...prev.completedContent, id])]
      };
    });
  };

  const getContentProgress = (id: string, type: 'example' | 'problem'): number => {
    if (!session) return 0;
    return session.completedContent.includes(id) ? 100 : 0;
  };

  // Session management
  const startSession = (initialContent?: { id: string; type: 'example' | 'problem' }) => {
    const newSession: LearningSession = {
      sessionId: `session-${Date.now()}`,
      startTime: new Date(),
      currentContent: initialContent ? {
        type: initialContent.type,
        id: initialContent.id,
        title: findContentById(initialContent.id, initialContent.type)?.content.title || initialContent.id
      } : null,
      navigationContext: {},
      completedContent: []
    };
    setSession(newSession);
  };

  const endSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  };

  const trackContentAccess = (id: string, type: 'example' | 'problem') => {
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentContent: {
          type,
          id,
          title: findContentById(id, type)?.content.title || id
        }
      };
    });
  };

  // Context preservation
  const preserveContext = useCallback((context: Partial<NavigationContext>) => {
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        navigationContext: {
          ...prev.navigationContext,
          ...context
        }
      };
    });
  }, []);

  const restoreContext = useCallback((): NavigationContext | null => {
    return session?.navigationContext || null;
  }, [session]);

  const contextValue: LearningContextType = {
    session,
    findContentById,
    navigateToContent,
    navigateBack,
    navigateNext,
    markContentComplete,
    getContentProgress,
    startSession,
    endSession,
    trackContentAccess,
    preserveContext,
    restoreContext
  };

  return (
    <LearningContext.Provider value={contextValue}>
      {children}
    </LearningContext.Provider>
  );
}

export function LearningProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearningProviderInner>{children}</LearningProviderInner>
    </Suspense>
  );
}

export function useLearningContext() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearningContext must be used within a LearningProvider');
  }
  return context;
}