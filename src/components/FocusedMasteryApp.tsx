"use client";

import { useState, useMemo, useEffect } from "react";
import { lectures } from "@/lib/data";
import { AppHeader } from "./AppHeader";
import { ProblemSidebar } from "./ProblemSidebar";
import { ProblemDisplay } from "./ProblemDisplay";
import { Skeleton } from "./ui/skeleton";
import { DrawingCanvas } from "./DrawingCanvas";
import { DrawingToolbar } from "./DrawingToolbar";

export function FocusedMasteryApp() {
  const [isClient, setIsClient] = useState(false);
  
  // State management
  const [currentLectureId, setCurrentLectureId] = useState(lectures[0].id);
  const [currentModuleId, setCurrentModuleId] = useState(lectures[0].modules[0].id);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [isDrawingModeActive, setIsDrawingModeActive] = useState(false);

  // Effects
  useEffect(() => {
    setIsClient(true);
  }, []);

  // State change handlers
  const handleLectureChange = (lectureId: string) => {
    const newLecture = lectures.find(l => l.id === lectureId)!;
    setCurrentLectureId(lectureId);
    setCurrentModuleId(newLecture.modules[0].id);
    setCurrentProblemIndex(0);
  };

  const handleModuleChange = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentProblemIndex(0);
  };

  const handleProblemChange = (problemIndex: number) => {
    setCurrentProblemIndex(problemIndex);
  };

  const toggleDrawingMode = () => {
    setIsDrawingModeActive(prev => !prev);
  }

  // Memoized derived state
  const currentLecture = useMemo(() => lectures.find(l => l.id === currentLectureId)!, [currentLectureId]);
  const currentModule = useMemo(() => currentLecture.modules.find(m => m.id === currentModuleId)!, [currentLecture, currentModuleId]);
  const currentProblem = useMemo(() => currentModule.problems[currentProblemIndex], [currentModule, currentProblemIndex]);

  if (!isClient || !currentLecture || !currentModule || !currentProblem) {
    return (
        <div className="flex h-screen w-full">
            <div className="w-64 flex-shrink-0 border-r bg-background p-4 space-y-4">
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
        />
      </main>
    </div>
  );
}
