"use client";

import { useState, useEffect, useCallback } from 'react';

export interface ExampleProgress {
  exampleId: string;
  revealedStepIndex: number;
  completedAt?: Date;
  timeSpent: number;
  questionsAsked: number;
  lastAccessedAt: Date;
}

export interface MasteryData {
  examples: Record<string, ExampleProgress>;
  overallCompletion: number;
  streakDays: number;
  totalTimeSpent: number;
  lastStudyDate: Date;
}

const STORAGE_KEY = 'fm-mastery-data';

export function useProgressTracking() {
  const [masteryData, setMasteryData] = useState<MasteryData>({
    examples: {},
    overallCompletion: 0,
    streakDays: 0,
    totalTimeSpent: 0,
    lastStudyDate: new Date()
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Convert date strings back to Date objects
        if (parsed.lastStudyDate) {
          parsed.lastStudyDate = new Date(parsed.lastStudyDate);
        }
        Object.values(parsed.examples || {}).forEach((example: any) => {
          if (example.completedAt) {
            example.completedAt = new Date(example.completedAt);
          }
          if (example.lastAccessedAt) {
            example.lastAccessedAt = new Date(example.lastAccessedAt);
          }
        });
        setMasteryData(parsed);
      } catch (error) {
        console.error('Failed to load progress data:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever masteryData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(masteryData));
    }
  }, [masteryData, isLoaded]);

  const updateExampleProgress = useCallback((
    exampleId: string, 
    updates: Partial<ExampleProgress>
  ) => {
    setMasteryData(prev => {
      const existingProgress = prev.examples[exampleId] || {
        exampleId,
        revealedStepIndex: 0,
        timeSpent: 0,
        questionsAsked: 0,
        lastAccessedAt: new Date()
      };

      const updatedProgress = {
        ...existingProgress,
        ...updates,
        lastAccessedAt: new Date()
      };

      const newExamples = {
        ...prev.examples,
        [exampleId]: updatedProgress
      };

      // Calculate overall completion
      const completedExamples = Object.values(newExamples).filter(ex => ex.completedAt).length;
      const totalExamples = Object.keys(newExamples).length;
      const overallCompletion = totalExamples > 0 ? (completedExamples / totalExamples) * 100 : 0;

      // Calculate total time spent
      const totalTimeSpent = Object.values(newExamples).reduce((sum, ex) => sum + ex.timeSpent, 0);

      // Update streak days
      const today = new Date();
      const lastStudy = prev.lastStudyDate;
      const daysDiff = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
      
      let streakDays = prev.streakDays;
      if (daysDiff === 0) {
        // Same day, maintain streak
        streakDays = prev.streakDays;
      } else if (daysDiff === 1) {
        // Next day, increment streak
        streakDays = prev.streakDays + 1;
      } else if (daysDiff > 1) {
        // Missed days, reset streak
        streakDays = 1;
      }

      return {
        examples: newExamples,
        overallCompletion,
        streakDays,
        totalTimeSpent,
        lastStudyDate: today
      };
    });
  }, []);

  const getExampleProgress = useCallback((exampleId: string): ExampleProgress | null => {
    return masteryData.examples[exampleId] || null;
  }, [masteryData.examples]);

  const markExampleComplete = useCallback((exampleId: string, totalSteps: number) => {
    updateExampleProgress(exampleId, {
      revealedStepIndex: totalSteps - 1,
      completedAt: new Date()
    });
  }, [updateExampleProgress]);

  const incrementQuestionCount = useCallback((exampleId: string) => {
    const current = masteryData.examples[exampleId];
    if (current) {
      updateExampleProgress(exampleId, {
        questionsAsked: current.questionsAsked + 1
      });
    }
  }, [masteryData.examples, updateExampleProgress]);

  const updateTimeSpent = useCallback((exampleId: string, additionalTime: number) => {
    const current = masteryData.examples[exampleId];
    if (current) {
      updateExampleProgress(exampleId, {
        timeSpent: current.timeSpent + additionalTime
      });
    }
  }, [masteryData.examples, updateExampleProgress]);

  const resetProgress = useCallback(() => {
    setMasteryData({
      examples: {},
      overallCompletion: 0,
      streakDays: 0,
      totalTimeSpent: 0,
      lastStudyDate: new Date()
    });
  }, []);

  return {
    masteryData,
    isLoaded,
    updateExampleProgress,
    getExampleProgress,
    markExampleComplete,
    incrementQuestionCount,
    updateTimeSpent,
    resetProgress
  };
}