"use client";

import { useState, useMemo, useEffect } from "react";
import { lectures } from "@/lib/data";
import { AppHeader } from "./AppHeader";
import { ProblemSidebar } from "./ProblemSidebar";
import { ProblemDisplay } from "./ProblemDisplay";
import { Skeleton } from "./ui/skeleton";
import { DrawingCanvas } from "./DrawingCanvas";
import { DrawingToolbar } from "./DrawingToolbar";
import { Logo } from "@/components/icons";
import { useSearchParams, useRouter } from 'next/navigation'
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MathRenderer } from "./MathRenderer";


export function FocusedMasteryApp() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter();
  const problemIdFromUrl = searchParams.get('problem');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { initialLectureId, initialModuleId, initialProblemIndex } = useMemo(() => {
    if (problemIdFromUrl) {
      for (const lecture of lectures) {
        for (const module of lecture.modules) {
          const problemIndex = module.problems.findIndex(p => p.id === problemIdFromUrl);
          if (problemIndex !== -1) {
            return {
              initialLectureId: lecture.id,
              initialModuleId: module.id,
              initialProblemIndex: problemIndex
            };
          }
        }
      }
    }
    // Default to the first problem of the first module of the first lecture
    return {
      initialLectureId: lectures.length > 0 ? lectures[0].id : '',
      initialModuleId: lectures.length > 0 && lectures[0].modules.length > 0 ? lectures[0].modules[0].id : '',
      initialProblemIndex: 0
    };
  }, [problemIdFromUrl]);

  if (lectures.length === 0) {
    return (
      <div className="flex flex-col h-screen font-sans bg-muted/30">
        <header className="flex-shrink-0">
          <div className="bg-background border-b px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="h-8 w-8 text-primary hidden md:block" />
              <h1 className="text-lg font-semibold font-headline">Applied Mathematics for Business</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-background rounded-lg shadow-md">
            <h2 className="text-2xl font-bold font-headline">Ready for new content!</h2>
            <p className="text-muted-foreground mt-2">
              All lectures have been cleared. Please provide the new curriculum.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // State management
  const [currentLectureId, setCurrentLectureId] = useState(initialLectureId);
  const [currentModuleId, setCurrentModuleId] = useState(initialModuleId);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(initialProblemIndex);
  const [isDrawingModeActive, setIsDrawingModeActive] = useState(false);

  // Effect to handle direct navigation
  useEffect(() => {
    setCurrentLectureId(initialLectureId);
    setCurrentModuleId(initialModuleId);
    setCurrentProblemIndex(initialProblemIndex);
  }, [initialLectureId, initialModuleId, initialProblemIndex]);


  // State change handlers
  const handleLectureChange = (lectureId: string) => {
    const newLecture = lectures.find(l => l.id === lectureId)!;
    const newModule = newLecture.modules[0];
    const newProblem = newModule.problems[0];
    setCurrentLectureId(lectureId);
    setCurrentModuleId(newModule.id);
    setCurrentProblemIndex(0);
    router.push(`/practice?problem=${newProblem.id}`, { scroll: false });
  };

  const handleModuleChange = (moduleId: string) => {
    const lecture = lectures.find(l => l.id === currentLectureId)!;
    const newModule = lecture.modules.find(m => m.id === moduleId)!;
    const newProblem = newModule.problems[0];
    setCurrentModuleId(moduleId);
    setCurrentProblemIndex(0);
    router.push(`/practice?problem=${newProblem.id}`, { scroll: false });
  };

  const handleProblemChange = (problemIndex: number) => {
    const lecture = lectures.find(l => l.id === currentLectureId)!;
    const module = lecture.modules.find(m => m.id === currentModuleId)!;
    const newProblem = module.problems[problemIndex];
    setCurrentProblemIndex(problemIndex);
    router.push(`/practice?problem=${newProblem.id}`, { scroll: false });
  };
  
  const handleNextProblem = () => {
    const lecture = lectures.find(l => l.id === currentLectureId)!;
    const module = lecture.modules.find(m => m.id === currentModuleId)!;
    
    // If current problem is an example, find the first practice problem in the same skill set
    if (currentProblem?.type === 'lead-example') {
        const firstPracticeProblemIndex = module.problems.findIndex(p => p.type === 'practice' && p.skill === currentProblem.skill);
        if(firstPracticeProblemIndex !== -1) {
            handleProblemChange(firstPracticeProblemIndex);
            return;
        }
    }
    
    // Otherwise, or if no specific practice problem found, go to the next problem in the list
    const nextProblemIndex = currentProblemIndex + 1;
    if (nextProblemIndex < module.problems.length) {
      handleProblemChange(nextProblemIndex);
    } else {
      // Handle case where it's the last problem of the module
      // Maybe go to next module or show a completion message. For now, just stay.
    }
  };


  const toggleDrawingMode = () => {
    setIsDrawingModeActive(prev => !prev);
  }

  // Memoized derived state
  const currentLecture = useMemo(() => lectures.find(l => l.id === currentLectureId), [currentLectureId]);
  const currentModule = useMemo(() => currentLecture?.modules.find(m => m.id === currentModuleId), [currentLecture, currentModuleId]);
  const currentProblem = useMemo(() => currentModule?.problems[currentProblemIndex], [currentModule, currentProblemIndex]);

  if (!isClient || !currentLecture || !currentModule || !currentProblem) {
    return (
        <div className="flex h-screen w-full bg-background">
            <div className="w-80 flex-shrink-0 border-r bg-background/50 p-4 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-24 mt-4" />
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
            <div className="flex-1 p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-8" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans">
      {isDrawingModeActive && <DrawingCanvas />}
      {isDrawingModeActive && <DrawingToolbar onClose={toggleDrawingMode} />}

      <AppHeader 
        lecture={currentLecture}
        problem={currentProblem}
        problemIndex={currentProblemIndex}
        totalProblems={currentModule.problems.length}
        onToggleDrawingMode={toggleDrawingMode}
        isDrawingModeActive={isDrawingModeActive}
      />
      <main className={`flex-1 flex overflow-hidden ${isDrawingModeActive ? 'pointer-events-none' : ''}`}>
        <ProblemSidebar 
          currentLectureId={currentLectureId}
          onLectureChange={handleLectureChange}
          currentModuleId={currentModuleId}
          onModuleChange={handleModuleChange}
          currentProblemIndex={currentProblemIndex}
          onProblemChange={handleProblemChange}
        />
        <ProblemDisplay 
            key={currentProblem.id}
            module={currentModule}
            problem={currentProblem}
            onNextProblem={handleNextProblem}
          />
      </main>
    </div>
  );
}
