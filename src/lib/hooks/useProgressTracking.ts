"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

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
  
  // Use ref for stable access to mastery data
  const masteryDataRef = useRef(masteryData);
  
  // Update ref when masteryData changes
  useEffect(() => {
    masteryDataRef.current = masteryData;
  }, [masteryData]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Convert date strings back to Date objects
        if (parsed.lastStudyDate) {
          const date = new Date(parsed.lastStudyDate);
          parsed.lastStudyDate = isNaN(date.getTime()) ? new Date() : date;
        }
        Object.values(parsed.examples || {}).forEach((example: any) => {
          if (example.completedAt) {
            const completedDate = new Date(example.completedAt);
            example.completedAt = isNaN(completedDate.getTime()) ? undefined : completedDate;
          }
          if (example.lastAccessedAt) {
            const accessedDate = new Date(example.lastAccessedAt);
            example.lastAccessedAt = isNaN(accessedDate.getTime()) ? new Date() : accessedDate;
          }
        });
        setMasteryData(parsed);
      } catch (error) {
        console.error('Failed to load progress data:', error);
        // Reset to default state on parsing failure
        setMasteryData({
          examples: {},
          overallCompletion: 0,
          streakDays: 0,
          totalTimeSpent: 0,
          lastStudyDate: new Date()
        });
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

      // Update streak days - use calendar dates to avoid timezone issues
      const today = new Date();
      const lastStudy = prev.lastStudyDate;
      
      // Normalize to local date only (ignore time)
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const lastStudyDate = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
      
      const daysDiff = Math.floor((todayDate.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24));
      
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
    return masteryDataRef.current.examples[exampleId] || null;
  }, []);

  const markExampleComplete = useCallback((exampleId: string, totalSteps: number) => {
    updateExampleProgress(exampleId, {
      revealedStepIndex: totalSteps - 1,
      completedAt: new Date()
    });
  }, [updateExampleProgress]);

  const incrementQuestionCount = useCallback((exampleId: string) => {
    const current = masteryDataRef.current.examples[exampleId];
    if (current) {
      updateExampleProgress(exampleId, {
        questionsAsked: current.questionsAsked + 1
      });
    }
  }, [updateExampleProgress]);

  const updateTimeSpent = useCallback((exampleId: string, additionalTime: number) => {
    const current = masteryDataRef.current.examples[exampleId];
    if (current) {
      updateExampleProgress(exampleId, {
        timeSpent: current.timeSpent + additionalTime
      });
    }
  }, [updateExampleProgress]);

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